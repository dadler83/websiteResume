import { Link, NavLink } from 'react-router-dom'
import githubIcon from '../assets/GitHub_Invertocat_Black.svg'
import linkedInIcon from '../assets/linkedin-svgrepo-com.svg'
import './Navbar.css'

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <NavLink to="/"
                      className={({ isActive }) =>
                          isActive ? 'navbar-logo active' : 'navbar-logo'
                      }
                >
                    My Work
                </NavLink>

                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <NavLink
                            to="/myLearning"
                            className={({ isActive }) =>
                                isActive ? 'navbar-link active' : 'navbar-link'
                            }
                        >
                            My Learning
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                isActive ? 'navbar-link active' : 'navbar-link'
                            }
                        >
                            About
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/research"
                            className={({ isActive }) =>
                                isActive ? 'navbar-link active' : 'navbar-link'
                            }
                        >
                            Research
                        </NavLink>
                    </li>
                    <li className="navbar-item">
                        <NavLink
                            to="/contact"
                            className={({ isActive }) =>
                                isActive ? 'navbar-link active' : 'navbar-link'
                            }
                        >
                            Contact
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-menu">
                    <li className="" style={{paddingTop: '5px'}}>
                        <a href="https://www.linkedin.com/in/david-adler-a30b3424a/" target="_blank" rel="noopener noreferrer">
                            <img height={30} src={linkedInIcon} alt="LinkedIn" className="navbar-icon" />
                        </a>
                    </li>
                    <li className="" style={{paddingTop: '10px'}}>
                        <a href="https://github.com/dadler83" target="_blank" rel="noopener noreferrer">
                            <img height={20} src={githubIcon} alt="Github" className="navbar-icon" />
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    )
}