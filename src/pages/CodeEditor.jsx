import MonacoEditor from '../components/MonacoEditor'
import './CodeEditor.css'

export default function CodeEditor() {
    return (
        <div className="code-editor-page">
            <div className="editor-header">
                <h1>Code Editor</h1>
                <p>Write, edit, and test your code in multiple languages</p>
            </div>

            <MonacoEditor />
        </div>
    )
}