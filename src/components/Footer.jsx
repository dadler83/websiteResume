import './Footer.css'
import {NavLink} from "react-router-dom";

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>David Adler</h3>
                    <p>Software Developer | Designer | Learner</p>
                </div>

                <div className="footer-section">
                    <h4>Connect</h4>
                    <div className="footer-links">
                        <a href="https://github.com/dadler83" target="_blank" rel="noopener noreferrer">
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/david-adler-a30b3424a/" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a href="mailto:david.adler@highqtechnologies.com">
                            Email
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <div className="footer-links">
                        <NavLink to={"/"}>Home</NavLink>
                        <NavLink to={"/about"}>About</NavLink>
                        <NavLink to={"/my-learning"}>Projects</NavLink>
                        <NavLink to={"/cv"}>Contact</NavLink>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} David Adler. All rights reserved.</p>
            </div>
        </footer>
    )
}