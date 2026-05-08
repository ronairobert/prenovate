import { useEffect, useState } from 'react'
import { NavLink, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { useTheme } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Booking from './pages/Booking'
import Blog from './pages/Blog'
import Payment from './pages/Payment'

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const { darkMode, toggle } = useTheme()
  const handleNavClick = () => setMenuOpen(false)
  const hideFooter = location.pathname === '/fizetes'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 6)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <NavLink to="/" className="brand" aria-label="Prenovate Consulting">
          <div className="brand-logo">
            <span className="brand-top">
              <span className="brand-pre">PRE</span>
              <span className="brand-novate">NOVATE</span>
            </span>
            <span className="brand-sub">CONSULTING</span>
          </div>
        </NavLink>
        <nav className="site-nav">
          <NavLink to="/" end>
            Főoldal
          </NavLink>
          <NavLink to="/idopont">Időpontfoglalás</NavLink>
          <NavLink to="/blog">Blog</NavLink>
        </nav>
        <button type="button" onClick={toggle} className="theme-toggle">
          {darkMode ? '☀' : '☾'}
        </button>
        <NavLink className="btn small" to="/idopont">
          Időpontot foglalok
        </NavLink>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? ' open' : ''}`}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div
          id="mobile-menu"
          className={`mobile-menu${menuOpen ? ' open' : ''}`}
        >
          <NavLink to="/" end onClick={handleNavClick}>
            Főoldal
          </NavLink>
          <NavLink to="/idopont" onClick={handleNavClick}>
            Időpontfoglalás
          </NavLink>
          <NavLink to="/blog" onClick={handleNavClick}>
            Blog
          </NavLink>
          <NavLink className="btn primary" to="/idopont" onClick={handleNavClick}>
            Időpontot foglalok
          </NavLink>
        </div>
      </header>

      <main className="site-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/idopont" element={<Booking />} />
          <Route path="/idopontfoglalas" element={<Booking />} />
          <Route path="/blog" element={<Blog />} />
          <Route
            path="/fizetes"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      {!hideFooter && (
        <footer className="site-footer">
          <div>
            <p className="footer-title">Készen áll a felújításra?</p>
            <p className="footer-text">
              Kérdezzen bátran, és segítünk a következő lépésben.
            </p>
          </div>
          <NavLink className="btn" to="/idopont">
            Időpontot foglalok
          </NavLink>
        </footer>
      )}
    </div>
  )
}

export default App
