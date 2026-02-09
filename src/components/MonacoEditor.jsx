import { useState, useRef } from 'react'
import Editor from '@monaco-editor/react'
import './MonacoEditor.css'

export default function MonacoEditor() {
    const [code, setCode] = useState('')
    const [language, setLanguage] = useState('javascript')
    const [theme, setTheme] = useState('vs-dark')
    const [cursorPosition, setCursorPosition] = useState({ lineNumber: 1, column: 1 })
    const [isTyping, setIsTyping] = useState(false)
    const editorRef = useRef(null)
    const typingIntervalRef = useRef(null)

    const sampleCode = '// Start coding here...\n\nfunction hello() {\n  console.log("Hello, World!");\n}\n\nhello();'

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor

        // Set initial cursor position
        editor.setPosition({ lineNumber: 1, column: 1 })

        // Optional: Listen to cursor position changes (for debugging)
        editor.onDidChangeCursorPosition((e) => {
            setCursorPosition({
                lineNumber: e.position.lineNumber,
                column: e.position.column
            })
        })

        // Prevent mouse interactions
        editor.onMouseDown((e) => {
            e.event.preventDefault()
            e.event.stopPropagation()
        })

        editor.onMouseUp((e) => {
            e.event.preventDefault()
            e.event.stopPropagation()
        })

        // Start the type and delete cycle
        typeAndDeleteCycle();
    }

    function handleEditorChange(value) {
        setCode(value)
    }

    // Typewriter animation - types text character by character
    function typeText(text, speed = 50, onComplete) {
        if (isTyping) {
            stopTyping()
            return
        }

        setIsTyping(true)
        setCode('')

        let index = 0
        let currentCode = ''

        typingIntervalRef.current = setInterval(() => {
            if (index < text.length) {
                const char = text[index]
                currentCode += char

                setCode(currentCode)

                // Update cursor after state update
                setTimeout(() => {
                    moveCursorToEnd()
                }, 0)

                index++
            } else {
                stopTyping()
                // Call the completion callback if provided
                if (onComplete) {
                    onComplete()
                }
            }
        }, speed)
    }

    // Delete animation - deletes text character by character
    function deleteText(text, speed = 50, onComplete) {
        if (isTyping) {
            stopTyping()
            return
        }

        setIsTyping(true)

        let currentCode = text
        let index = text.length - 1

        typingIntervalRef.current = setInterval(() => {
            if (index >= 0) {
                currentCode = currentCode.slice(0, -1)

                setCode(currentCode)

                // Update cursor after state update
                setTimeout(() => {
                    moveCursorToEnd()
                }, 0)

                index--
            } else {
                stopTyping()
                // Call the completion callback if provided
                if (onComplete) {
                    onComplete()
                }
            }
        }, speed)
    }

    function stopTyping() {
        if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current)
            typingIntervalRef.current = null
        }
        setIsTyping(false)
    }

    // Type and then delete with a pause in between
    function typeAndDeleteCycle() {
        // Type the text
        typeText(sampleCode, 10, () => {
            // Wait 2 seconds after typing completes
            setTimeout(() => {
                // Then delete the text
                deleteText(sampleCode, 10, () => {
                    // Wait 1 second after deleting completes
                    setTimeout(() => {
                        // Start the cycle again
                        typeAndDeleteCycle()
                    }, 1000)
                })
            }, 2000)
        })
    }

    // Type custom text (fast)
    function typeFast() {
        typeText(sampleCode, 10) // 10ms per character
    }

    // Type custom text (slow)
    function deleteFast() {
        deleteText(code, 10) // 10ms per character
    }

    // Move cursor to specific line and column
    function moveCursor(lineNumber, column) {
        if (editorRef.current) {
            editorRef.current.setPosition({ lineNumber, column })
            editorRef.current.revealLineInCenter(lineNumber)
            editorRef.current.focus()
        }
    }

    // Move cursor to start of file
    function moveCursorToStart() {
        moveCursor(1, 1)
    }

    // Move cursor to end of file
    function moveCursorToEnd() {
        if (editorRef.current) {
            const model = editorRef.current.getModel()
            if (model) {
                const lineCount = model.getLineCount()
                const lastLineLength = model.getLineLength(lineCount)
                moveCursor(lineCount, lastLineLength + 1)
            }
        }
    }

    function getFileExtension(lang) {
        const extensions = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            java: 'java',
            csharp: 'cs',
            cpp: 'cpp',
            html: 'html',
            css: 'css',
            json: 'json',
            xml: 'xml',
            markdown: 'md',
            sql: 'sql',
            go: 'go',
            rust: 'rs',
            php: 'php'
        }
        return extensions[lang] || 'txt'
    }

    return (
        <div className="monaco-container">
            <div className="editor-wrapper no-interaction">
                <Editor
                    height="600px"
                    language={language}
                    theme={theme}
                    value={code}
                    onChange={handleEditorChange}
                    onMount={handleEditorDidMount}
                    options={{
                        readOnly: true,
                        minimap: { enabled: false },
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                        scrollBeyondLastLine: false,
                        lineNumbers: 'on',
                        renderWhitespace: 'selection',
                        tabSize: 2,
                        scrollbar: {
                            vertical: 'hidden',
                            horizontal: 'hidden',
                            verticalScrollbarSize: 0,
                            horizontalScrollbarSize: 0,
                            useShadows: false,
                        },
                        cursorStyle: 'line',
                        cursorBlinking: 'blink',
                        domReadOnly: true,
                        contextmenu: false,
                        quickSuggestions: false,
                        parameterHints: { enabled: false },
                        suggestOnTriggerCharacters: false,
                        acceptSuggestionOnEnter: 'off',
                        tabCompletion: 'off',
                        wordBasedSuggestions: false,
                        selectionHighlight: false,
                        occurrencesHighlight: false,
                        links: false,
                        hover: { enabled: false },
                    }}
                />
            </div>
        </div>
    )
}