import { useState } from 'react'
import './Contact.css'

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    })
    const [submitted, setSubmitted] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // Mock submission — no data is actually sent
        setSubmitted(true)
    }

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h1>Contact</h1>
                <p>Have a question or want to work together? Send me a message!</p>
            </div>

            <div className="contact-content">
                <div className="contact-info">
                    <div className="contact-info-item">
                        <span className="contact-info-icon">📍</span>
                        <div>
                            <h3>Location</h3>
                            <p>United States</p>
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-info-icon">📧</span>
                        <div>
                            <h3>Email</h3>
                            <p><a href="mailto:contact@example.com">contact@example.com</a></p>
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-info-icon">💼</span>
                        <div>
                            <h3>LinkedIn</h3>
                            <p><a href="https://linkedin.com/in/david-adler" target="_blank" rel="noopener noreferrer">linkedin.com/in/david-adler</a></p>
                        </div>
                    </div>
                    <div className="contact-info-item">
                        <span className="contact-info-icon">🐙</span>
                        <div>
                            <h3>GitHub</h3>
                            <p><a href="https://github.com/dadler83" target="_blank" rel="noopener noreferrer">github.com/dadler83</a></p>
                        </div>
                    </div>
                </div>

                <div className="contact-form-wrapper">
                    {submitted ? (
                        <div className="success-message">
                            <span>✅</span>
                            <span>Thanks for reaching out! I'll get back to you soon.</span>
                        </div>
                    ) : (
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="Your name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="your@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="subject">Subject</label>
                                <select
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a subject…</option>
                                    <option value="job">Job Opportunity</option>
                                    <option value="collaboration">Collaboration</option>
                                    <option value="question">General Question</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Write your message here…"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-btn">Send Message</button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
