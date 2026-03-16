import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import NotFound from './pages/NotFound'
import CodeEditor from './pages/CodeEditor'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import './App.css'

function App() {
    return (
        <div className="app-wrapper">
            <Navbar />

            <main style={{ paddingTop: '80px', padding: '80px 2rem 2rem 2rem' }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/editor" element={<CodeEditor />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </main>

            <Footer/>
        </div>
    )
}

export default App