import { Link, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import githubIconBlack from '../assets/GitHub_Invertocat_Black.svg'
import githubIconWhite from '../assets/GitHub_Invertocat_White.svg'
import linkedInIconBlack from '../assets/linkedin-svgrepo-com.svg'
import linkedInIconWhite from '../assets/linkedin-svgrepo-com-white.svg'
import './Navbar.css'

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)

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

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container">
                <NavLink to="/"
                         className={({ isActive }) =>
                             `navbar-logo ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                         }
                >
                    My Work
                </NavLink>

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink
                            to="/blog"
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
                            to="/style-guide"
                            className={({ isActive }) =>
                                `navbar-link ${isActive ? 'active' : ''} ${isScrolled ? 'scrolled' : ''}`
                            }
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-menu">
                    <li className="" style={{paddingTop: '5px'}}>
                        <a href="https://www.linkedin.com/in/david-adler-a30b3424a/" target="_blank" rel="noopener noreferrer">
                            <img height={30} src={isScrolled ? linkedInIconWhite : linkedInIconBlack} alt="LinkedIn" className="navbar-icon" />
                        </a>
                    </li>
                    <li className="" style={{paddingTop: '10px'}}>
                        <a href="https://github.com/dadler83" target="_blank" rel="noopener noreferrer">
                            <img height={20} src={isScrolled ? githubIconWhite : githubIconBlack} alt="Github" className="navbar-icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}