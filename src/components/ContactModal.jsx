import React, { useState, useEffect } from "react";
import "./ContactModal.css";

export default function ContactModal({ isOpen, onClose }) {
  const [suggestionText, setSuggestionText] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [submittedStatus, setSubmittedStatus] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else if (type === "phone") {
        setCopiedPhone(true);
        setTimeout(() => setCopiedPhone(false), 2000);
      }
    });
  };

  const handleSendWhatsApp = (e) => {
    e.preventDefault();
    if (!suggestionText.trim()) return;

    const signature = visitorName.trim() ? ` — from ${visitorName.trim()}` : "";
    const fullMessage = `Hey Alvis! Here's a suggestion for the NIT Silchar Campus Portal:\n\n"${suggestionText.trim()}"${signature}`;
    const whatsappUrl = `https://wa.me/916002495526?text=${encodeURIComponent(fullMessage)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmittedStatus("whatsapp");
    setTimeout(() => {
      setSuggestionText("");
      setVisitorName("");
      setSubmittedStatus(null);
    }, 3500);
  };

  const handleSendEmail = (e) => {
    e.preventDefault();
    if (!suggestionText.trim()) return;

    const signature = visitorName.trim() ? ` — from ${visitorName.trim()}` : "";
    const subject = "NIT Silchar Portal Suggestion";
    const body = `${suggestionText.trim()}${signature}`;

    // 1. Copy to clipboard for guaranteed access
    try {
      navigator.clipboard.writeText(`To: code.alvis@gmail.com\nSubject: ${subject}\n\n${body}`);
    } catch (err) {}

    // 2. Open Gmail in a new tab (always works in browser)
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=code.alvis@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");

    // 3. Also trigger mailto as companion/fallback
    try {
      const mailtoUrl = `mailto:code.alvis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      const link = document.createElement("a");
      link.href = mailtoUrl;
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {}

    setSubmittedStatus("email");
  };

  return (
    <div className="contact-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div 
        className="contact-modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient decorations */}
        <div className="contact-glow-top" aria-hidden="true"></div>
        <div className="contact-glow-bottom" aria-hidden="true"></div>

        {/* Modal Header */}
        <div className="contact-modal-header">
          <div className="contact-header-badge">
            <span className="contact-status-dot"></span>
            <span>GET IN TOUCH & FEEDBACK</span>
          </div>
          <button 
            className="contact-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="contact-modal-body">
          {/* Alvis Khan Profile & Contact Card */}
          <div className="contact-profile-box">
            <div className="profile-identity">
              <div className="profile-avatar">
                <span className="avatar-initials">AK</span>
                <span className="avatar-ring"></span>
              </div>
              <div className="profile-details">
                <div className="profile-name-row">
                  <h3 className="profile-name">Alvis Khan</h3>
                  <span className="profile-branch-badge">B.Tech (CSE'27)</span>
                </div>
                <p className="profile-subtitle">National Institute of Technology Silchar</p>
                <div className="profile-tag">
                  <span>Drop your ideas and suggestions</span>
                </div>
              </div>
            </div>

            {/* Quick Contact Action Chips */}
            <div className="contact-channels-grid">
              {/* WhatsApp */}
              <a 
                href="https://wa.me/916002495526" 
                target="_blank" 
                rel="noopener noreferrer"
                className="channel-card channel-whatsapp"
                title="Chat on WhatsApp"
              >
                <div className="channel-icon-wrap icon-wa">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-label">WhatsApp</span>
                  <span className="channel-value">+91 6002495526</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/lvis.khn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="channel-card channel-instagram"
                title="Follow or DM on Instagram"
              >
                <div className="channel-icon-wrap icon-ig">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </div>
                <div className="channel-info">
                  <span className="channel-label">Instagram</span>
                  <span className="channel-value">@lvis.khn</span>
                </div>
                <span className="channel-arrow">↗</span>
              </a>

              {/* Email Card with direct Gmail Compose, Mail app and Copy */}
              <div className="channel-card channel-email-interactive">
                <div 
                  className="channel-email-main"
                  onClick={() => {
                    handleCopy("code.alvis@gmail.com", "email");
                    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=code.alvis@gmail.com", "_blank", "noopener,noreferrer");
                  }}
                  role="button"
                  tabIndex={0}
                  title="Click to open in Gmail & copy email"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCopy("code.alvis@gmail.com", "email");
                      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=code.alvis@gmail.com", "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <div className="channel-icon-wrap icon-mail">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                  </div>
                  <div className="channel-info">
                    <span className="channel-label">Email</span>
                    <span className="channel-value">code.alvis@gmail.com</span>
                  </div>
                </div>

                <div className="channel-email-btn-group">
                  <button 
                    type="button" 
                    className="channel-sub-btn btn-open-gmail"
                    onClick={() => {
                      handleCopy("code.alvis@gmail.com", "email");
                      window.open("https://mail.google.com/mail/?view=cm&fs=1&to=code.alvis@gmail.com", "_blank", "noopener,noreferrer");
                    }}
                    title="Open compose in Gmail"
                  >
                    <span>Gmail ↗</span>
                  </button>
                  <a 
                    href="mailto:code.alvis@gmail.com" 
                    className="channel-sub-btn btn-open-app"
                    title="Open default Mail app"
                    onClick={() => handleCopy("code.alvis@gmail.com", "email")}
                  >
                    <span>Mail App</span>
                  </a>
                  <button 
                    type="button" 
                    className={`channel-sub-btn btn-copy ${copiedEmail ? "copied" : ""}`}
                    onClick={() => handleCopy("code.alvis@gmail.com", "email")}
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Visitor Suggestion Box Section */}
          <div className="suggestion-box-section">
            <div className="suggestion-box-header">
              <div className="sugg-badge">
                <span>💡 YOUR IDEAS & SUGGESTIONS</span>
              </div>
              <h4 className="suggestion-title">Help Improve the Campus Portal</h4>
              <p className="suggestion-desc">
                Found an unlisted spot, a shortcut path, or have an idea to make life easier for students? Share your suggestion directly!
              </p>
            </div>

            {submittedStatus ? (
              <div className="suggestion-success-banner">
                <span className="success-icon">{submittedStatus === "whatsapp" ? "🎉" : "✉️"}</span>
                <div className="success-body">
                  <strong>
                    {submittedStatus === "whatsapp" ? "Opening WhatsApp..." : "Opening Email Client..."}
                  </strong>
                  <p>
                    {submittedStatus === "whatsapp" 
                      ? "Opening WhatsApp chat with Alvis..."
                      : "Opened Gmail compose in a new tab. Your message was also copied to your clipboard!"}
                  </p>
                  {submittedStatus === "email" && (
                    <div className="email-fallback-row">
                      <a 
                        href={`https://mail.google.com/mail/?view=cm&fs=1&to=code.alvis@gmail.com&su=NIT%20Silchar%20Portal%20Suggestion&body=${encodeURIComponent(suggestionText)}`}
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="fallback-btn fallback-gmail"
                      >
                        Open Gmail ↗
                      </a>
                      <a 
                        href={`mailto:code.alvis@gmail.com?subject=NIT%20Silchar%20Portal%20Suggestion&body=${encodeURIComponent(suggestionText)}`}
                        className="fallback-btn fallback-mail"
                      >
                        Default Mail App
                      </a>
                      <button 
                        type="button"
                        className="fallback-btn fallback-copy"
                        onClick={() => {
                          navigator.clipboard.writeText(suggestionText);
                          setCopiedEmail(true);
                          setTimeout(() => setCopiedEmail(false), 2000);
                        }}
                      >
                        {copiedEmail ? "✓ Message Copied" : "Copy Message"}
                      </button>
                    </div>
                  )}
                  <button 
                    type="button" 
                    className="btn-new-suggestion"
                    onClick={() => {
                      setSuggestionText("");
                      setVisitorName("");
                      setSubmittedStatus(null);
                    }}
                  >
                    + Write another suggestion
                  </button>
                </div>
              </div>
            ) : (
              <form className="suggestion-form" onSubmit={handleSendWhatsApp}>
                <div className="form-group">
                  <label htmlFor="visitor-suggestion" className="form-label">
                    Suggestion / Feedback <span className="req-star">*</span>
                  </label>
                  <textarea
                    id="visitor-suggestion"
                    rows="3"
                    className="suggestion-textarea"
                    value={suggestionText}
                    onChange={(e) => setSuggestionText(e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="visitor-name" className="form-label">
                    Your Name or Batch <span className="opt-tag">(Optional)</span>
                  </label>
                  <input
                    id="visitor-name"
                    type="text"
                    className="suggestion-input"
                    value={visitorName}
                    onChange={(e) => setVisitorName(e.target.value)}
                  />
                </div>

                <div className="suggestion-actions">
                  <button
                    type="submit"
                    className="btn-send-whatsapp"
                    disabled={!suggestionText.trim()}
                  >
                    <span className="btn-icon">💬</span>
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    className="btn-send-email"
                    disabled={!suggestionText.trim()}
                    onClick={handleSendEmail}
                  >
                    <span className="btn-icon">✉️</span>
                    <span>Send via Email</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="contact-modal-footer">
          <span>Crafted with passion for the NIT Silchar community</span>
        </div>
      </div>
    </div>
  );
}
