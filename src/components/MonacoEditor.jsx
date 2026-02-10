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

    const helloWorlds = [
        {
            'code': 'public class HelloWorld {\n' +
                '    public static void main(String[] args) {\n' +
                '        System.out.println("Hello, World!");\n' +
                '    }\n' +
                '}',
            'lang': 'java',
            'label': 'Java'
        },
        {
            'code': 'function hello() {\n  console.log("Hello, World!");\n}\n\nhello();',
            'lang': 'javascript',
            'label': 'JavaScript'
        },
        {
            'code': 'if __name__ == \'__main__\':\n\tprint("Hello, World!")\n',
            'lang': 'python',
            'label': 'Python'
        },
        {
            'code': 'main :: IO ()\n' +
                'main = putStrLn "Hello, World!"',
            'lang': 'haskell',
            'label': 'Haskell'
        },
        {
            'code': '#include <iostream>\n' +
                '\n' +
                'int main() {\n' +
                '    std::cout << "Hello, World!" << std::endl;\n' +
                '    return 0;\n' +
                '}',
            'lang': 'cpp',
            'label': 'C++'
        },
        {
            'code': '#include <stdio.h>\n' +
                '\n' +
                'int main() {\n' +
                '    printf("Hello, World!\\n");\n' +
                '    return 0;\n' +
                '}',
            'lang': 'c',
            'label': 'C'
        },
        {
            'code': 'using System;\n' +
                '\n' +
                'class HelloWorld\n' +
                '{\n' +
                '    static void Main()\n' +
                '    {\n' +
                '        Console.WriteLine("Hello, World!");\n' +
                '    }\n' +
                '}',
            'lang': 'cs',
            'label': 'C#'
        }
    ]

    // Color mapping for each language
    const languageColors = {
        'java': '#f89820',
        'javascript': '#f7df1e',
        'python': '#3776ab',
        'haskell': '#5e5086',
        'cpp': '#00599c',
        'c': '#555555',
        'cs': '#239120'
    }

    // Function to get a random code sample
    function getRandomCodeSample() {
        const randomIndex = Math.floor(Math.random() * helloWorlds.length);
        setLanguage(helloWorlds[randomIndex]['lang']);
        return helloWorlds[randomIndex];
    }

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
        // Get a random code sample
        const randomSample = getRandomCodeSample()

        // Type the text
        typeText(randomSample.code, 10, () => {
            // Wait 2 seconds after typing completes
            setTimeout(() => {
                // Then delete the text
                deleteText(randomSample.code, 10, () => {
                    // Wait 1 second after deleting completes
                    setTimeout(() => {
                        // Start the cycle again with a new random code
                        typeAndDeleteCycle()
                    }, 1000)
                })
            }, 2000)
        })
    }

    // Move cursor to specific line and column
    function moveCursor(lineNumber, column) {
        if (editorRef.current) {
            editorRef.current.setPosition({ lineNumber, column })
            editorRef.current.revealLineInCenter(lineNumber)
            editorRef.current.focus()
        }
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

    // Get current language label
    function getLanguageLabel() {
        const currentLang = helloWorlds.find(hw => hw.lang === language);
        return currentLang ? currentLang.label : language;
    }

    return (
        <div className="monaco-container">
            <div
                className="language-wrapper"
                style={{
                    borderColor: languageColors[language] || '#ccc',
                    boxShadow: `0 0 20px ${languageColors[language]}40`
                }}
            >
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
                <div
                    className="language-label"
                    style={{
                        "backgroundColor": languageColors[language] || '#ccc'
                    }}
                >
                    {getLanguageLabel()}
                </div>
            </div>
        </div>
    )
}