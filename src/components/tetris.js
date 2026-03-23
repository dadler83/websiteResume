// p5.js Tetris Implementation
// Author: ChatGPT
// Fully self-contained, no external assets required


const tetrisSketch = (p) => {
    const COLS = 10;
    const ROWS = 20;
    const BLOCK_SIZE = 30;
    const SPACING = 2;
    const SIDEBAR_WIDTH = 150;

    let board = [];
    let currentPiece;
    let nextPieceType; // Store the next piece type
    let holdPieceType = null; // Store the held piece type
    let canHold = true; // Track if hold is available (reset on piece lock)
    let dropCounter = 0;
    let dropInterval = 500; // ms
    let fastDropInterval = 50; // ms - faster drop when holding down
    let lastTime = 0;
    let gameOver = false;
    let gameStarted = false; // Track if game has started
    let fastDrop = false; // Track if down key is held
    let canvasFocused = false; // Track if canvas has focus
    let restartButton; // Restart button
    let startButton; // Start button

// Score and line tracking
    let linesCleared = 0;
    let score = 0;

// Lock delay system
    let lockCounter = 0;
    let lockDelay = 500; // ms delay before piece locks when at bottom
    let pieceAtBottom = false;
    let lockDelayActive = false;

// Piece bag for pseudo-random generation
    let pieceBag = [];

//     TODO: in react, the initial rotation buffers aren't functioning
//     TODO: focus canvas so it stays 'started' after clicking play?
// Input delay counters for continuous key press
    let moveCounter = 0;
    let rotateCounter = 0;
    let hardDropCounter = 0;
    const moveDelay = 60; // ms between moves when held
    const rotateDelay = 100; // ms between rotations when held
    const hardDropDelay = 200; // ms between hard drops when held
    const initialMoveDelay = 300; // ms initial delay before continuous movement
    const initialRotateDelay = 1000; // ms initial delay before continuous rotation

// Track if keys were just pressed
    let moveInitial = false;
    let rotateInitial = false;

// Line clear delay
    let lineClearPaused = false;
    let lineClearCounter = 0;
    const lineClearDelay = 700; // ms delay after clearing lines (increased for more overlap)
    let pendingLinesClear = false; // Flag to indicate lines should be cleared after pause
    let clearedRows = []; // Track which rows are being cleared for animation

// Tetromino shapes
    const SHAPES = [
        [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], // I
        [[1, 1], [1, 1]], // O
        [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T
        [[1, 0, 0], [1, 1, 1], [0, 0, 0]], // J
        [[0, 0, 1], [1, 1, 1], [0, 0, 0]], // L
        [[0, 1, 1], [1, 1, 0], [0, 0, 0]], // S
        [[1, 1, 0], [0, 1, 1], [0, 0, 0]]  // Z
    ];

    const COLORS = [
        '#00f0f0', '#f0f000', '#a000f0',
        '#0000f0', '#f0a000', '#00f000', '#f00000'
    ];

// SRS Wall Kick Data
// Offset data for JLSTZ pieces
    const WALL_KICK_OFFSETS_JLSTZ = {
        '0->1': [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        '1->0':             [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        '1->2':       [[0, 0], [1, 0], [1, -1], [0, 2], [1, 2]],
        '2->1':      [[0, 0], [-1, 0], [-1, 1], [0, -2], [-1, -2]],
        '2->3':      [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]],
        '3->2':     [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        '3->0':     [[0, 0], [-1, 0], [-1, -1], [0, 2], [-1, 2]],
        '0->3':       [[0, 0], [1, 0], [1, 1], [0, -2], [1, -2]]
    };

// Offset data for I piece
    const WALL_KICK_OFFSETS_I = {
        '0->1': [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
        '1->0':        [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
        '1->2':        [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]],
        '2->1':     [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
        '2->3':             [[0, 0], [2, 0], [-1, 0], [2, 1], [-1, -2]],
        '3->2':        [[0, 0], [-2, 0], [1, 0], [-2, -1], [1, 2]],
        '3->0':       [[0, 0], [1, 0], [-2, 0], [1, -2], [-2, 1]],
        '0->3':     [[0, 0], [-1, 0], [2, 0], [-1, 2], [2, -1]]
    };

    p.setup = () => {
        let boardWidth = SPACING + COLS * (BLOCK_SIZE + SPACING);
        p.createCanvas(boardWidth + SIDEBAR_WIDTH, SPACING + ROWS * (BLOCK_SIZE + SPACING));
        p.noStroke();

        // Create start button
        startButton = p.createButton('START');
        startButton.   position(p.width / 2 - 60, p.height / 2 + 20);
        startButton.size(120, 40);
        startButton.style('font-size', '18px');
        startButton.   style('font-weight', 'bold');
        startButton.style('background-color', '#FF0000');
        startButton.style('color', 'white');
        startButton.   style('border', 'none');
        startButton.style('border-radius', '5px');
        startButton.   style('cursor', 'pointer');
        startButton.style('text-shadow', '-1px -1px 0 black,  \n' +
            '                 1px -1px 0 black,\n' +
            '                -1px  1px 0 black,\n' +
            '                 1px  1px 0 black');
        startButton.mousePressed(startGame);

        // Create restart button (initially hidden)
        restartButton = p.createButton('RESTART');
        restartButton.   position(boardWidth / 2 - 50, p.height / 2 + 100);
        restartButton.size(100, 40);
        restartButton.style('font-size', '16px');
        restartButton.    style('font-weight', 'bold');
        restartButton. style('background-color', '#4CAF50');
        restartButton.style('color', 'white');
        restartButton.    style('border', 'none');
        restartButton.style('border-radius', '5px');
        restartButton.   style('cursor', 'pointer');
        restartButton.style('text-shadow', '-1px -1px 0 black,  \n' +
            '                 1px -1px 0 black,\n' +
            '                -1px  1px 0 black,\n' +
            '                 1px  1px 0 black');
        restartButton.hide();
        restartButton.mousePressed(restartGame);

        initBoard();

        // Make canvas focusable
        let canvas = p.canvas;
        canvas.setAttribute('tabindex', '0');

        // Set up focus/blur event listeners on the canvas
        canvas.addEventListener('focus', handleFocus);
        canvas.addEventListener('blur', handleBlur);

        // Also focus on click
        canvas.addEventListener('click', () => {
            canvas.focus();
        });

        // Prevent game keys from scrolling the page while canvas is focused
        canvas.addEventListener('keydown', (e) => {
            const gameKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];
            if (gameKeys.includes(e.key)) {
                e.preventDefault();
            }
        });
    }

    function startGame() {
        gameStarted = true;
        startButton.hide();
        initGame();
        p.canvas.focus();
        canvasFocused = true;
    }

    function initGame() {
        initBoard();
        fillPieceBag();
        nextPieceType = getNextPieceType();
        spawnPiece();
        gameOver = false;
        score = 0;
        linesCleared = 0;
        holdPieceType = null;
        canHold = true;
        lastTime = p.millis();
        restartButton.hide();
    }

    function restartGame() {
        initGame();
        // let canvas = document.querySelector('canvas');
        // canvas.focus();
        canvasFocused = true;
    }

    function fillPieceBag() {
        // Create an array with indices 0-6 (one for each tetromino type)
        pieceBag = [0, 1, 2, 3, 4, 5, 6];

        // Shuffle the bag using Fisher-Yates algorithm
        for (let i = pieceBag.length - 1; i > 0; i--) {
            let j = p.floor(p.random(i + 1));
            [pieceBag[i], pieceBag[j]] = [pieceBag[j], pieceBag[i]];
        }
    }

    function getNextPieceType() {
        // If bag is empty, refill it
        if (pieceBag.length === 0) {
            fillPieceBag();
        }

        // Pop a piece type from the bag
        return pieceBag.pop();
    }

    function handleBlur() {
        console.log('blur')
        canvasFocused = false;
    }

    function handleFocus() {
        console.log('focus')
        canvasFocused = true;
        // Reset lastTime to prevent large delta jumps
        lastTime = p.millis();
    }

    p.draw = () => {
        p.background(0);

        // Show start screen if game hasn't started
        if (!  gameStarted) {
            p.textSize(48);
            p.textAlign(p.CENTER, p.CENTER);
            let letterSpacing = [30, 30, 30, 22, 20];
            let letterOrigin = -75;
            let colors = ["#FD4766", "#FD9715", "#FFCF24", "#55D53E", "#00D1EF", "#D328D0"];
            let letters = "TETRIS";
            p.stroke(255);
            for (let i = 0; i < colors.length; i++) {
                p.fill(colors[i]);
                p.text(letters[i],
                    p.width / 2 + letterOrigin +
                        letterSpacing.slice(0, i).reduce((prev, curr) => (prev + curr), 0),
                    p.height / 2 - 100);
            }
            p.noStroke();

            p.textSize(16);
            p.fill(200);
            p.text("Controls:", p.width / 2 - 5, p.height / 2 + 50);
            p.textSize(14);
            p.text("← → :  Move  |  ↑ : Rotate  |  ↓ :  Soft Drop", p.width / 2, p.height / 2 + 75);
            p.text("Space : Hard Drop  |  Z : Hold", p.width / 2, p.height / 2 + 95);
            return;
        }

        // Check if canvas is focused
        if (!                  canvasFocused) {
            // Draw current state but don't update game logic
            drawBoard();
            drawGhost(currentPiece);
            drawPiece(currentPiece);
            drawSidebar();

            // Display pause message
            p.fill(255, 255, 255, 200);
            p.textSize(24);
            p.textAlign(p.CENTER, p.CENTER);
            let boardWidth = SPACING + COLS * (BLOCK_SIZE + SPACING);
            p.text("PAUSED", boardWidth / 2, p.height / 2);
            p.textSize(16);
            p.text("Click to resume", boardWidth / 2, p.height / 2 + 30);
            return;
        }

        if (!                        gameOver) {
            let now = p.millis();
            let delta = now - lastTime;
            lastTime = now;

            // Handle line clear pause
            if (lineClearPaused) {
                lineClearCounter += delta;
                if (lineClearCounter >= lineClearDelay) {
                    lineClearPaused = false;
                    lineClearCounter = 0;
                    // Now actually clear the lines
                    if (pendingLinesClear) {
                        let numCleared = clearLines();
                        updateScore(numCleared);
                        pendingLinesClear = false;
                        clearedRows = [];
                        spawnPiece();
                    }
                }
                // During pause, draw with animation (no ghost or current piece)
                drawBoardWithAnimation();
                drawSidebar();
                return;
            }

            dropCounter += delta;
            moveCounter += delta;
            rotateCounter += delta;
            hardDropCounter += delta;

            // Check if piece would collide if moved down
            currentPiece.y++;
            pieceAtBottom = collides(currentPiece);
            currentPiece.y--;

            // Handle lock delay
            if (pieceAtBottom && !                   fastDrop) {
                // Piece is at bottom and not being soft/hard dropped
                if (!                    lockDelayActive) {
                    lockDelayActive = true;
                    lockCounter = 0;
                }
                lockCounter += delta;

                // Check if lock delay has expired
                if (lockCounter >= lockDelay) {
                    lockPiece();
                }
            } else {
                // Reset lock delay if piece is not at bottom or is being dropped
                lockDelayActive = false;
                lockCounter = 0;
            }

            // Use faster interval if down key is held
            let currentDropInterval = fastDrop ?             fastDropInterval :        dropInterval;

            if (dropCounter > currentDropInterval && !        lockDelayActive) {
                drop();
            }

            // Check if down arrow is currently pressed
            if (p.keyIsDown(p.DOWN_ARROW)) {
                fastDrop = true;
            } else {
                fastDrop = false;
            }

            // Handle continuous left/right movement
            let currentMoveDelay = moveInitial ?                             initialMoveDelay :                      moveDelay;
            if (p.keyIsDown(p.LEFT_ARROW) && moveCounter > currentMoveDelay) {
                currentPiece.             x--;
                if (collides(currentPiece)) currentPiece.x++;
                else resetLockDelay(); // Reset lock delay on successful move
                moveCounter = 0;
                moveInitial = false; // After first repeat, use shorter delay
            }

            if (p.keyIsDown(p.RIGHT_ARROW) && moveCounter > currentMoveDelay) {
                currentPiece.                    x++;
                if (collides(currentPiece)) currentPiece.x--;
                else resetLockDelay(); // Reset lock delay on successful move
                moveCounter = 0;
                moveInitial = false; // After first repeat, use shorter delay
            }

            // Reset move initial flag if neither arrow is pressed
            if (!                    p.keyIsDown(p.LEFT_ARROW) && !p.keyIsDown(p.RIGHT_ARROW)) {
                moveInitial = false;
            }

            // Handle continuous rotation
            let currentRotateDelay = rotateInitial ?                       initialRotateDelay :                    rotateDelay;
            if (p.keyIsDown(p.UP_ARROW) && rotateCounter > currentRotateDelay) {
                if (tryRotate(currentPiece, 1)) {
                    resetLockDelay();
                }
                rotateCounter = 0;
                rotateInitial = false; // After first repeat, use shorter delay
            }

            // Reset rotate initial flag if up arrow is not pressed
            if (!                            p.keyIsDown(p.    UP_ARROW)) {
                rotateInitial = false;
            }

            // Handle continuous hard drop
            if (p.keyIsDown(32) && hardDropCounter > hardDropDelay) { // 32 is spacebar keyCode
                hardDrop();
                hardDropCounter = 0;
            }
        }

        drawBoard();
        drawGhost(currentPiece); // Draw ghost before drawing the actual piece
        drawPiece(currentPiece);
        drawSidebar();

        if (gameOver) {
            p.fill(255, 0, 0);
            p.textSize(32);
            p.textAlign(p.CENTER, p.CENTER);
            let boardWidth = SPACING + COLS * (BLOCK_SIZE + SPACING);
            p.text("GAME OVER", boardWidth / 2, p.height / 2);

            // Show restart button
            if (restartButton.   elt.   style.display === 'none') {
                restartButton. show();
            }
        }
    }

    function holdPiece() {
        if (!        canHold) return; // Can't hold if already used this turn

        let currentType = currentPiece.type;

        if (holdPieceType === null) {
            // First time holding, store current and spawn next
            holdPieceType = currentType;
            spawnPiece();
        } else {
            // Swap current with held
            let temp = holdPieceType;
            holdPieceType = currentType;
            spawnPieceFromType(temp);
        }

        canHold = false; // Prevent holding again until next piece locks
    }

    function updateScore(numLines) {
        linesCleared += numLines;

        // Standard Tetris scoring system
        // 1 line = 100, 2 lines = 300, 3 lines = 500, 4 lines = 800
        let points = 0;
        switch(numLines) {
            case 1:
                points = 100;
                break;
            case 2:
                points = 300;
                break;
            case 3:
                points = 500;
                break;
            case 4:
                points = 800;
                break;
        }
        score += points;
    }

    function drawNextPiece() {
        let boardWidth = SPACING + COLS * (BLOCK_SIZE + SPACING);
        let sidebarX = boardWidth + 10;

        // Draw "NEXT" label
        p.fill(255);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(16);
        p.text("NEXT", sidebarX, 160);

        // Get the shape of the next piece
        let nextShape = SHAPES[nextPieceType];
        let nextColor = COLORS[nextPieceType];

        // Calculate preview block size (smaller than game blocks)
        let previewBlockSize = 15;
        let previewSpacing = 1;

        // Calculate centering offset
        let shapeWidth = nextShape[0].       length;
        let shapeHeight = nextShape.length;
        let previewWidth = shapeWidth * (previewBlockSize + previewSpacing);
        let previewHeight = shapeHeight * (previewBlockSize + previewSpacing);

        // Center the preview in the available space
        let previewX = sidebarX + (SIDEBAR_WIDTH - 20 - previewWidth) / 2;
        let previewY = 190;

        // Draw the next piece preview
        p.fill(nextColor);
        // noStroke();
        for (let y = 0; y < nextShape.length; y++) {
            for (let x = 0; x < nextShape[y].       length; x++) {
                if (nextShape[y][x]) {
                    p.rect(
                        previewX + x * (previewBlockSize + previewSpacing),
                        previewY + y * (previewBlockSize + previewSpacing),
                        previewBlockSize,
                        previewBlockSize
                    );
                }
            }
        }
    }

    function drawHoldPiece() {
        let boardWidth = SPACING + COLS * (BLOCK_SIZE + SPACING);
        let sidebarX = boardWidth + 10;

        // Draw "HOLD" label
        p.fill(255);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(16);
        p.text("HOLD", sidebarX, 280);

        // Only draw if there's a held piece
        if (holdPieceType !== null) {
            // Get the shape of the held piece
            let holdShape = SHAPES[holdPieceType];
            let holdColor = COLORS[holdPieceType];

            // Dim the color if hold is not available
            if (!        canHold) {
                let c = p.color(holdColor);
                holdColor = p.color(p.red(c) * 0.5, p. green(c) * 0.5, p.blue(c) * 0.5);
            }

            // Calculate preview block size (smaller than game blocks)
            let previewBlockSize = 15;
            let previewSpacing = 1;

            // Calculate centering offset
            let shapeWidth = holdShape[0].length;
            let shapeHeight = holdShape.length;
            let previewWidth = shapeWidth * (previewBlockSize + previewSpacing);
            let previewHeight = shapeHeight * (previewBlockSize + previewSpacing);

            // Center the preview in the available space
            let previewX = sidebarX + (SIDEBAR_WIDTH - 20 - previewWidth) / 2;
            let previewY = 310;

            // Draw the held piece preview
            p.fill(holdColor);
            // noStroke();
            for (let y = 0; y < holdShape.   length; y++) {
                for (let x = 0; x < holdShape[y].length; x++) {
                    if (holdShape[y][x]) {
                        p.rect(
                            previewX + x * (previewBlockSize + previewSpacing),
                            previewY + y * (previewBlockSize + previewSpacing),
                            previewBlockSize,
                            previewBlockSize
                        );
                    }
                }
            }
        }
    }

    function drawSidebar() {
        let boardWidth = SPACING + COLS * (BLOCK_SIZE + SPACING);
        let sidebarX = boardWidth + 10;

        p.fill(255);
        p.textAlign(p.LEFT, p.TOP);
        p.textSize(16);

        // Draw Score
        p.text("SCORE", sidebarX, 20);
        p.textSize(24);
        p.text(score, sidebarX, 45);

        // Draw Lines
        p.textSize(16);
        p.text("LINES", sidebarX, 90);
        p.textSize(24);
        p.text(linesCleared, sidebarX, 115);

        // Draw next piece preview
        drawNextPiece();

        // Draw hold piece preview
        drawHoldPiece();

        // draw separator
        p.stroke(255);
        p.line(sidebarX - 8, 0, sidebarX - 8, SPACING + ROWS * (BLOCK_SIZE + SPACING));
        // noStroke();
    }

    function resetLockDelay() {
        // Reset the lock delay timer when player moves/rotates piece
        if (lockDelayActive) {
            lockCounter = 0;
        }
    }

    function initBoard() {
        board = Array.                                      from({ length: ROWS }, () => Array(COLS).fill(null));
    }

    function spawnPiece() {
        let type = nextPieceType; // Use the pre-fetched next piece
        nextPieceType = getNextPieceType(); // Get the new next piece
        spawnPieceFromType(type);
    }

    function spawnPieceFromType(type) {
        // Determine spawn position based on piece type
        let spawnX;
        if (type === 0) { // I piece
            spawnX = 3; // Spawn I piece at column 3
        } else if (type === 1) { // O piece
            spawnX = 4; // Spawn O piece at column 4
        } else { // J, L, S, T, Z pieces
            spawnX = 3; // Spawn at column 3
        }

        currentPiece = {
            shape:                               SHAPES[type].                                      map(row => [...                                           row]),
            color:  COLORS[type],
            type:              type,             // Store piece type for SRS
            rotation:             0,             // Track rotation state (0, 1, 2, 3)
            x:            spawnX,
            y:                         0
        };
        if (collides(currentPiece)) {
            gameOver = true;
        }

        // Reset lock delay for new piece
        lockDelayActive = false;
        lockCounter = 0;
        pieceAtBottom = false;
    }

    function drop() {
        currentPiece.                     y++;
        if (collides(currentPiece)) {
            currentPiece.y--;
            // When dropping naturally and hitting bottom, immediately lock if fastDrop is on
            if (fastDrop) {
                lockPiece();
            }
        }
        dropCounter = 0;
    }

    function lockPiece() {
        merge(currentPiece);
        canHold = true; // Re-enable hold for next piece
        let completedRows = getCompleteLines();
        if (completedRows.                      length > 0) {
            // Pause the game briefly before clearing lines
            lineClearPaused = true;
            lineClearCounter = 0;
            pendingLinesClear = true;
            clearedRows = completedRows;
        } else {
            spawnPiece();
        }

        // Reset lock delay
        lockDelayActive = false;
        lockCounter = 0;
    }

    function hardDrop() {
        // Drop the piece all the way down instantly
        while (!                               collides(currentPiece)) {
            currentPiece.                                y++;
        }
        // Step back one position (the last valid position)
        currentPiece.y--;

        // Immediately lock piece (no lock delay for hard drop)
        lockPiece();
        dropCounter = 0;
    }

    p.keyPressed = () => {
        if (! gameStarted || gameOver || lineClearPaused || !                     canvasFocused) return;

        // Reset counters on initial key press for immediate response
        if (p.keyCode === p.LEFT_ARROW) {
            currentPiece.x--;
            if (collides(currentPiece)) currentPiece.x++;
            else resetLockDelay();
            moveCounter = 0;
            moveInitial = true; // Mark as initial press
        } else if (p.   keyCode === p.RIGHT_ARROW) {
            currentPiece.x++;
            if (collides(currentPiece)) currentPiece.x--;
            else resetLockDelay();
            moveCounter = 0;
            moveInitial = true; // Mark as initial press
        } else if (p.keyCode === p.UP_ARROW) {
            if (tryRotate(currentPiece, 1)) {
                resetLockDelay();
            }
            rotateCounter = 0;
            rotateInitial = true; // Mark as initial press
        } else if (p.key === ' ') {
            // Spacebar triggers hard drop
            hardDrop();
            hardDropCounter = 0;
        } else if (p.key === 'z' || p.key === 'Z') {
            // Z key triggers hold
            holdPiece();
        }
    }

    function tryRotate(piece, direction) {
        // direction: 1 for clockwise, -1 for counter-clockwise
        let oldRotation = piece.rotation;
        let newRotation = (oldRotation + direction + 4) % 4;

        // Get wall kick offsets based on piece type
        let kickTable;
        if (piece.type === 0) { // I piece
            kickTable = WALL_KICK_OFFSETS_I;
        } else if (piece.            type === 1) { // O piece - no rotation needed
            return false;
        } else { // J, L, S, T, Z pieces
            kickTable = WALL_KICK_OFFSETS_JLSTZ;
        }

        // Get the kick offset key
        let kickKey = `${oldRotation}->${newRotation}`;
        let kickOffsets = kickTable[kickKey];

        // Store original position
        let originalX = piece.        x;
        let originalY = piece.y;
        let originalShape = piece.shape.                   map(row => [...row]);

        // Rotate the piece
        rotatePieceShape(piece, direction > 0);
        piece.rotation = newRotation;

        // Try each kick offset
        for (let i = 0; i < kickOffsets.length; i++) {
            let [offsetX, offsetY] = kickOffsets[i];
            piece.x = originalX + offsetX;
            piece.y = originalY - offsetY; // Y is inverted in SRS

            if (!                  collides(piece)) {
                // Successful rotation!
                return true;
            }
        }

        // All kicks failed, revert rotation
        piece.shape = originalShape;
        piece.                  rotation = oldRotation;
        piece.x = originalX;
        piece.y = originalY;
        return false;
    }

    function rotatePieceShape(piece, clockwise = true) {
        let rotated = [];
        let rows = piece.shape.                      length;
        let cols = piece.                    shape[0].length;

        if (clockwise) {
            for (let y = 0; y < cols; y++) {
                rotated[y] = [];
                for (let x = 0; x < rows; x++) {
                    rotated[y][x] = piece.shape[rows - 1 - x][y];
                }
            }
        } else {
            for (let y = 0; y < cols; y++) {
                rotated[y] = [];
                for (let x = 0; x < rows; x++) {
                    rotated[y][x] = piece.shape[x][cols - 1 - y];
                }
            }
        }

        piece.shape = rotated;
    }

    function collides(piece) {
        for (let y = 0; y < piece.                      shape.                       length; y++) {
            for (let x = 0; x < piece.                    shape[y].                                   length; x++) {
                if (piece.shape[y][x]) {
                    let newX = piece.x + x;
                    let newY = piece.                                  y + y;
                    if (
                        newX < 0 || newX >= COLS ||
                        newY >= ROWS ||
                        (newY >= 0 && board[newY][newX])
                    ) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function merge(piece) {
        for (let y = 0; y < piece.                    shape.                     length; y++) {
            for (let x = 0; x < piece.                    shape[y].                                         length; x++) {
                if (piece.shape[y][x]) {
                    board[piece.                               y + y][piece.                     x + x] = piece.color;
                }
            }
        }
    }

    function getCompleteLines() {
        let completedRows = [];
        for (let y = 0; y < ROWS; y++) {
            if (board[y].                     every(cell => cell)) {
                completedRows.push(y);
            }
        }
        return completedRows;
    }

    function clearLines() {
        let numLinesCleared = 0;
        for (let y = ROWS - 1; y >= 0; y--) {
            if (board[y].                     every(cell => cell)) {
                board.                                       splice(y, 1);
                board.                   unshift(Array(COLS).fill(null));
                y++;
                numLinesCleared++;
            }
        }
        return numLinesCleared;
    }

    function getGhostPosition(piece) {
        // Create a copy of the piece to simulate dropping
        let ghostPiece = {
            shape:                    piece.                    shape,
            color:                    piece.                     color,
            x:                     piece.                    x,
            y:                   piece.                    y
        };

        // Drop the ghost piece until it collides
        while (!                       collides(ghostPiece)) {
            ghostPiece.                                 y++;
        }

        // Step back one position (the last valid position)
        ghostPiece.   y--;

        return ghostPiece;
    }

    function drawGhost(piece) {
        if (gameOver) return;

        let ghostPiece = getGhostPosition(piece);

        // Only draw ghost if it's below the current piece
        if (ghostPiece.                    y > piece.                    y) {
            // Parse the color and create a semi-transparent version
            let c = p.color(piece.color);
            p.fill(p.red(c), p.green(c), p.blue(c), 60); // 60 is the alpha (transparency)

            for (let y = 0; y < ghostPiece.shape.                    length; y++) {
                for (let x = 0; x < ghostPiece.shape[y].                    length; x++) {
                    if (ghostPiece.                    shape[y][x]) {
                        p.rect(
                            SPACING + (ghostPiece.x + x) * (BLOCK_SIZE + SPACING),
                            SPACING + (ghostPiece.                    y + y) * (BLOCK_SIZE + SPACING),
                            BLOCK_SIZE,
                            BLOCK_SIZE
                        );
                    }
                }
            }
        }
    }

    function drawBoard() {
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (board[y][x]) {
                    p.fill(board[y][x]);
                    p.rect(SPACING + x * (BLOCK_SIZE + SPACING), SPACING + y * (BLOCK_SIZE + SPACING), BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }

    function drawBoardWithAnimation() {
        // Calculate base animation progress (0 to 1)
        let baseProgress = lineClearCounter / lineClearDelay;

        // Animation parameters - extended overlap for 4 neighbors
        let animationDuration = 0.25; // Each block animates for 25% of total time
        let stepSize = 0.05; // Each block starts 5% later than the previous one

        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (board[y][x]) {
                    let blockColor = board[y][x];

                    // Check if this row is being cleared
                    if (clearedRows.includes(y)) {
                        // Calculate when this block should start and end
                        // x=0: 0% to 25%, x=1: 5% to 30%, x=2: 10% to 35%, x=3: 15% to 40%, x=4: 20% to 45%
                        // This creates overlap with 4 neighbors (2 before and 2 after)
                        let startProgress = x * stepSize;
                        let endProgress = startProgress + animationDuration;

                        // Calculate this block's individual progress (0 to 1)
                        let blockProgress = 0;
                        if (baseProgress < startProgress) {
                            // Animation hasn't started for this block yet
                            blockProgress = 0;
                        } else if (baseProgress > endProgress) {
                            // Animation is complete for this block
                            blockProgress = 1;
                        } else {
                            // Animation is in progress for this block
                            blockProgress = (baseProgress - startProgress) / animationDuration;
                        }

                        // Only draw if not fully disappeared
                        if (blockProgress < 1) {
                            // Animate this block
                            let c = p.color(blockColor);
                            let alpha = 255 * (1 - blockProgress); // Fade out
                            p.fill(p.red(c), p.green(c), p.blue(c), alpha);

                            // Scale factor:                                      grows from 1.                                 0 to 1.5
                            let scale = 1.0 + (blockProgress * 0.5);
                            let animatedSize = BLOCK_SIZE * scale;
                            let offset = (animatedSize - BLOCK_SIZE) / 2;

                            p.rect(
                                SPACING + x * (BLOCK_SIZE + SPACING) - offset,
                                SPACING + y * (BLOCK_SIZE + SPACING) - offset,
                                animatedSize,
                                animatedSize
                            );
                        }
                    } else {
                        // Draw normally
                        p.fill(blockColor);
                        p.rect(SPACING + x * (BLOCK_SIZE + SPACING), SPACING + y * (BLOCK_SIZE + SPACING), BLOCK_SIZE, BLOCK_SIZE);
                    }
                }
            }
        }
    }

    function drawPiece(piece) {
        p.fill(piece.color);
        for (let y = 0; y < piece.                    shape.                    length; y++) {
            for (let x = 0; x < piece.                    shape[y].                            length; x++) {
                if (piece.shape[y][x]) {
                    p.rect(SPACING + (piece.                    x + x) * (BLOCK_SIZE + SPACING), SPACING + (piece.y + y) * (BLOCK_SIZE + SPACING), BLOCK_SIZE, BLOCK_SIZE);
                }
            }
        }
    }
}

export { tetrisSketch };