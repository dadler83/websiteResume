import './Footer.css'

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
                        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                            LinkedIn
                        </a>
                        <a href="mailto:your.email@example.com">
                            Email
                        </a>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Quick Links</h4>
                    <div className="footer-links">
                        <a href="/">Home</a>
                        <a href="/about">About</a>
                        <a href="/projects">Projects</a>
                        <a href="/contact">Contact</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {currentYear} David Adler. All rights reserved.</p>
            </div>
        </footer>
    )
}