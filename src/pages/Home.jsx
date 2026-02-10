import './Home.css'
import MonacoEditor from "../components/MonacoEditor.jsx";

export default function Home() {
    return (
        <div className="home-container">
            <div className="home-content">
                <div className="home-left">
                    <h1>I'm David Adler, </h1>
                    <p>
                        A Software Developer by trade. <br/>
                        A Designer by hobby. <br/>
                        A Lifelong Learner to fill the time.
                    </p>
                </div>

                <div className="home-right">
                    <div className="rounded-box">
                        <h1>Hello World!</h1>
                        <h4>...or as I've also said</h4>
                        <MonacoEditor />
                    </div>
                </div>
            </div>
        </div>
    )
}