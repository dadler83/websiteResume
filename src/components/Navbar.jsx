import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import githubIconBlack from '../assets/GitHub_Invertocat_Black.svg'
import githubIconWhite from '../assets/GitHub_Invertocat_White.svg'
import linkedInIconBlack from '../assets/linkedin-svgrepo-com.svg'
import linkedInIconWhite from '../assets/linkedin-svgrepo-com-white.svg'
import './Navbar.css'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            // Change this value to adjust when the effect triggers (in pixels)
            const scrollThreshold = 40;

            if (window.scrollY > scrollThreshold) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        // Add scroll event listener
        window.addEventListener('scroll', handleScroll)

        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        const prev = document.body.style.overflow
        document.body.style.overflow = isMenuOpen ? 'hidden' : prev
        return () => { document.body.style.overflow = prev }
    }, [isMenuOpen])

    const closeMenu = () => setIsMenuOpen(false)

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
                <div className="navbar-container">
                    <NavLink to="/"
                             onClick={closeMenu}
                             className={({ isActive }) =>
                                 `navbar-logo ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                             }
                    >
                        My Work
                    </NavLink>

                    {/* Desktop nav links */}
                    <ul className="navbar-menu desktop-menu">
                        <li className="navbar-item">
                            <NavLink
                                to="/my-learning"
                                className={({ isActive }) =>
                                    `navbar-link ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                                }
                            >
                                My Learning
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    `navbar-link ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                                }
                            >
                                About
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink
                                to="/research"
                                className={({ isActive }) =>
                                    `navbar-link ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                                }
                            >
                                Research
                            </NavLink>
                        </li>
                        <li className="navbar-item">
                            <NavLink
                                to="/cv"
                                className={({ isActive }) =>
                                    `navbar-link ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                                }
                            >
                                CV
                            </NavLink>
                        </li>
                    </ul>

                    {/* Desktop social icons */}
                    <ul className="navbar-menu desktop-menu">
                        <li style={{paddingTop: '5px'}}>
                            <a href="https://www.linkedin.com/in/david-adler-a30b3424a/" target="_blank" rel="noopener noreferrer">
                                <img height={30} src={isScrolled ? linkedInIconWhite : linkedInIconBlack} alt="LinkedIn" className="navbar-icon" />
                            </a>
                        </li>
                        <li style={{paddingTop: '10px'}}>
                            <a href="https://github.com/dadler83" target="_blank" rel="noopener noreferrer">
                                <img height={20} src={isScrolled ? githubIconWhite : githubIconBlack} alt="Github" className="navbar-icon" />
                            </a>
                        </li>
                    </ul>

                    {/* Hamburger button — mobile only */}
                    <button
                        className={`hamburger ${isScrolled ? 'scrolled' : ''}`}
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                </div>
            </nav>

            {/* Full-screen mobile overlay */}
            <div className={`mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
                <button className="overlay-close" onClick={closeMenu} aria-label="Close menu">
                    ✕
                </button>
                <nav className="overlay-nav">
                    <NavLink to="/" className="overlay-link" onClick={closeMenu}>My Work</NavLink>
                    <NavLink to="/my-learning" className="overlay-link" onClick={closeMenu}>My Learning</NavLink>
                    <NavLink to="/about" className="overlay-link" onClick={closeMenu}>About</NavLink>
                    <NavLink to="/research" className="overlay-link" onClick={closeMenu}>Research</NavLink>
                    <NavLink to="/cv" className="overlay-link" onClick={closeMenu}>CV</NavLink>

                    <div className="overlay-social">
                        <a href="https://www.linkedin.com/in/david-adler-a30b3424a/" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                            <img height={32} src={linkedInIconWhite} alt="LinkedIn" />
                        </a>
                        <a href="https://github.com/dadler83" target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
                            <img height={24} src={githubIconWhite} alt="Github" />
                        </a>
                    </div>
                </nav>
            </div>
        </>
    )
}