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
                        {/*<div className="info-item">*/}
                        {/*    <span className="info-label">Location:</span>*/}
                        {/*    <span className="info-value">Your Location</span>*/}
                        {/*</div>*/}
                        {/*<div className="info-item">*/}
                        {/*    <span className="info-label">Email:</span>*/}
                        {/*    <span className="info-value">your.email@example.com</span>*/}
                        {/*</div>*/}
                        {/*<div className="info-item">*/}
                        {/*    <span className="info-label">Status:</span>*/}
                        {/*    <span className="info-value">Available for opportunities</span>*/}
                        {/*</div>*/}
                        {/*<div className="info-item">*/}
                        {/*    <span className="info-label">Interests:</span>*/}
                        {/*    <span className="info-value">Web Dev, Research, AI</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    )
}