import React from "react";
import "./LandingPage.css";

export default function LandingPage({ onNavigateToCampus, onNavigateToFreshers, onOpenContact }) {
  return (
    <div className="landing-container">
      {/* Ambient background glow effects */}
      <div className="landing-glow landing-glow-1" aria-hidden="true"></div>
      <div className="landing-glow landing-glow-2" aria-hidden="true"></div>
      <div className="landing-grid-pattern" aria-hidden="true"></div>

      {/* Top Telemetry / Status Bar */}
      <header className="landing-header">
        <div className="landing-brand">
          <div className="landing-emblem">
            <span>NIT</span>
          </div>
          <div className="landing-brand-text">
            <span className="landing-brand-title">NATIONAL INSTITUTE OF TECHNOLOGY SILCHAR</span>
            <span className="landing-brand-sub">CAMPUS COMPANION</span>
          </div>
        </div>

        <div className="landing-header-right">
          <div className="landing-sys-badge">
            <span className="landing-live-dot"></span>
            <span className="landing-sys-text">PORTAL ONLINE // BATCH 2026–30</span>
          </div>
          {onOpenContact && (
            <button 
              className="landing-contact-pill-btn" 
              onClick={onOpenContact}
              title="Suggestions & Connect with Alvis Khan"
            >
              <span className="pill-sparkle">💬</span>
              <span className="pill-text">SUGGESTIONS</span>
            </button>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="landing-main">
        <div className="landing-hero">
          <div className="landing-welcome-pill">
            <span className="welcome-heart">❤️</span>
            <span className="welcome-text">Welcome, Batch 2026–30!</span>
          </div>

          <h1 className="landing-title">
            NIT SILCHAR
          </h1>

          <p className="landing-subtitle">
            Your Campus. Your Guide. One Place.
          </p>

          <p className="landing-tagline">
            The all-in-one companion for NIT Silchar students. Navigate every corner of campus with real-time GPS and unlock curated 1st-year survival guides, drive links, and essential contacts.
          </p>
        </div>

        {/* Two Equal Primary Option Cards */}
        <div className="landing-cards-grid">
          {/* Option 1: Freshers Guide */}
          <div 
            className="landing-card card-freshers" 
            onClick={onNavigateToFreshers}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigateToFreshers(); }}
          >
            <div className="card-ambient-glow" aria-hidden="true"></div>

            <div className="card-top-row">
              <div className="card-icon-box icon-freshers">
                <span className="card-icon">🎓</span>
              </div>
              <div className="card-badge badge-freshers">
                <span className="card-badge-dot"></span>
                <span>BATCH 2026–30</span>
              </div>
            </div>

            <div className="card-content">
              <h2 className="card-heading">FRESHERS GUIDE</h2>
              <p className="card-desc">
                Everything you need to thrive at NIT Silchar from Day 1. Curated academic resources, important emergency contacts, senior hacks, and club directories.
              </p>

              <ul className="card-features">
                <li>
                  <span className="feat-icon">📚</span>
                  <span>1st Year Google Drive links, lecture notes & PYQs</span>
                </li>
                <li>
                  <span className="feat-icon">☎️</span>
                  <span>Emergency helplines, security, medical & auto contacts</span>
                </li>
                <li>
                  <span className="feat-icon">💡</span>
                  <span>Mess food, laundry, campus hacks & senior advice</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button 
                className="card-cta-btn btn-freshers"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToFreshers();
                }}
              >
                <span>EXPLORE FRESHERS GUIDE</span>
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>

          {/* Option 2: Campus Navigation */}
          <div 
            className="landing-card card-campus" 
            onClick={onNavigateToCampus}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onNavigateToCampus(); }}
          >
            <div className="card-ambient-glow" aria-hidden="true"></div>
            
            <div className="card-top-row">
              <div className="card-icon-box icon-campus">
                <span className="card-icon">🗺️</span>
              </div>
              <div className="card-badge badge-campus">
                <span className="card-badge-dot"></span>
                <span>LIVE GPS & MAPS</span>
              </div>
            </div>

            <div className="card-content">
              <h2 className="card-heading">CAMPUS NAVIGATION</h2>
              <p className="card-desc">
                Interactive high-precision spatial map of NIT Silchar. Locate hostels, departments, SAC, sports complexes, food joints, and find optimized walking paths.
              </p>

              <ul className="card-features">
                <li>
                  <span className="feat-icon">📍</span>
                  <span>Find verified campus locations & department buildings</span>
                </li>
                <li>
                  <span className="feat-icon">🚶</span>
                  <span>Get turn-by-turn walking routes & live distance metrics</span>
                </li>
                <li>
                  <span className="feat-icon">🛰️</span>
                  <span>Interactive 3D GPS, compass rotation & satellite view</span>
                </li>
              </ul>
            </div>

            <div className="card-footer">
              <button 
                className="card-cta-btn btn-campus"
                onClick={(e) => {
                  e.stopPropagation();
                  onNavigateToCampus();
                }}
              >
                <span>EXPLORE CAMPUS</span>
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Insights / Telemetry Strip */}
        <div className="landing-telemetry-strip">
          <div className="telem-stat">
            <span className="stat-label">CAMPUS NODES</span>
            <span className="stat-val">50+ VERIFIED</span>
          </div>
          <div className="telem-sep"></div>
          <div className="telem-stat">
            <span className="stat-label">ORIENTATION</span>
            <span className="stat-val">BATCH 2026–30 READY</span>
          </div>
          <div className="telem-sep"></div>
          <div className="telem-stat">
            <span className="stat-label">ACCESS</span>
            <span className="stat-val">INSTANT & FREE</span>
          </div>
        </div>
      </main>

      {/* Interactive Footer & Connect Section */}
      <footer className="landing-footer">
        <div className="footer-connect-banner">
          <div className="connect-prompt">
            <span className="connect-icon">💡</span>
            <div className="connect-texts">
              <span className="connect-title">Have suggestions, feedback, or ideas?</span>
              <span className="connect-subtitle">Help improve the campus guide, suggest missing locations, or report any inaccurate info!</span>
            </div>
          </div>
          <div className="connect-actions">
            {onOpenContact && (
              <button 
                className="footer-connect-btn"
                onClick={onOpenContact}
                title="Open Suggestion & Contact Box"
              >
                <span>Contact me</span>
                <span className="btn-arrow">→</span>
              </button>
            )}
            <div className="footer-social-shortcuts">
              <a 
                href="https://wa.me/916002495526" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-shortcut-chip chip-wa"
                title="Chat on WhatsApp (+91 6002495526)"
              >
                <span>💬 WhatsApp</span>
              </a>
              <a 
                href="https://instagram.com/lvis.khn" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="footer-shortcut-chip chip-ig"
                title="Instagram @lvis.khn"
              >
                <span>📸 @lvis.khn</span>
              </a>
              <a 
                href="https://mail.google.com/mail/?view=cm&fs=1&to=code.alvis@gmail.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="footer-shortcut-chip chip-mail"
                title="Send Email via Gmail (code.alvis@gmail.com)"
                onClick={() => {
                  try {
                    navigator.clipboard.writeText("code.alvis@gmail.com");
                  } catch (err) {}
                }}
              >
                <span>✉️ Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-inner">
          <div className="footer-left">
            <span>National Institute of Technology Silchar (NITS)</span>
            <span className="footer-dot">•</span>
            <span>Assam, India 788010</span>
          </div>
          <div className="footer-right">
            <span>Crafted with ❤️ for NITSians</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
