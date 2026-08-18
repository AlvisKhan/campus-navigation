import { useEffect } from "react";
import {
  EMERGENCY_CONTACTS,
  TRANSPORT_CONTACTS,
  FOOD_AND_SERVICES,
  STUDENT_VENTURES,
  FIRST_YEAR_DRIVES,
  STUDY_PLATFORMS,
  STUDY_CATEGORIES,
  HACKATHON_PLATFORMS,
  HACKATHON_STEPS,
  CAMPUS_BASICS_HUBS,
  SENIOR_TIPS,
} from "../data/freshersData";
import "./FreshersGuide.css";

export default function FreshersGuide({ onNavigateToMap, onNavigateToHome, onSelectMapLocation }) {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLocate = (locationId) => {
    if (onSelectMapLocation) {
      onSelectMapLocation(locationId);
    } else if (onNavigateToMap) {
      onNavigateToMap();
    }
  };

  return (
    <div className="freshers-page">
      {/* Top Floating Cyber Navigation Bar */}
      <nav className="freshers-nav">
        <div className="freshers-nav-inner">
          <div className="nav-left-group">
            <button
              className="nav-home-btn"
              onClick={onNavigateToHome || (() => {})}
              title="Return to Main Portal Home"
            >
              <span className="btn-icon">⌂</span>
              <span className="btn-text">PORTAL</span>
            </button>
            <button
              className="nav-back-map-btn"
              onClick={onNavigateToMap}
              title="Return to Campus Navigation Map"
            >
              <span className="btn-icon">🗺️</span>
              <span className="btn-text">CAMPUS MAP</span>
            </button>
          </div>

          <div className="nav-title-group">
            <span className="nav-brand-tag">NIT SILCHAR</span>
            <span className="nav-page-label">FRESHERS COMPASS 2026</span>
          </div>

          <a
            href="#emergency-section"
            className="nav-emergency-quick"
            title="Jump to Emergency Numbers"
          >
            <span className="pulse-alert-dot"></span>
            <span>EMERGENCY</span>
          </a>
        </div>
      </nav>

      {/* Hero Welcome Banner */}
      <header className="freshers-hero">
        <div className="hero-cyber-grid"></div>
        <div className="hero-container">
          <div className="hero-badge-pill">
            <span className="badge-sparkle">🎓</span>
            <span>FRESHERS ONBOARDING PORTAL</span>
            <span className="badge-year">2026 EDITION</span>
          </div>

          <h1 className="hero-title">
            Welcome, <span className="hero-gradient-text">New Nitsians!</span>
          </h1>

          <p className="hero-subtitle">
            Your quick guide to campus life, academics, resources and everything you need to get started at NIT Silchar.
          </p>

          {/* Quick Jump Anchors */}
          <div className="hero-quick-actions">
            <a href="#emergency-section" className="hero-action-pill alert-pill">
              <span>🚑</span> Emergency Contacts
            </a>
            <a href="#network-section" className="hero-action-pill">
              <span>📶</span> Networks & Wi-Fi
            </a>
            <a href="#laundry-section" className="hero-action-pill">
              <span>🧺</span> Washing Machines
            </a>
            <a href="#campus-basics" className="hero-action-pill">
              <span>🏛️</span> Campus Basics
            </a>
            <a href="#guesthouse-section" className="hero-action-pill">
              <span>🏨</span> Guest House Booking
            </a>
            <a href="#campus-services" className="hero-action-pill">
              <span>🛺</span> Transit & Food
            </a>
            <a href="#study-resources" className="hero-action-pill">
              <span>💻</span> Study & Notes
            </a>
            <a href="#scholarships-section" className="hero-action-pill">
              <span>📜</span> Scholarships & Bonafide
            </a>
            <a href="#hackathons-section" className="hero-action-pill">
              <span>🚀</span> Hackathons
            </a>
            <a href="#senior-tips-section" className="hero-action-pill">
              <span>💡</span> Senior Tips
            </a>
          </div>
        </div>
      </header>

      <main className="freshers-content-wrapper">
        {/* ================= 1. HIGH PRIORITY EMERGENCY SECTION ================= */}
        <section id="emergency-section" className="guide-section emergency-highlight-section">
          <div className="section-hud-tag">
            <span className="hud-blinker red"></span>
            <span>CRITICAL CAMPUS TELEMETRY // 24/7 MEDICAL AID</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">🚑</span> Important Emergency Contacts
            </h2>
            <p className="section-desc">
              Instant medical response numbers. Tap directly to initiate a cellular call. Save these in your speed dial now.
            </p>
          </div>

          <div className="emergency-grid">
            {EMERGENCY_CONTACTS.map((item) => (
              <div key={item.id} className="emergency-card" style={{ "--card-accent": item.color }}>
                <div className="emergency-card-top">
                  <span className="emergency-icon">{item.icon}</span>
                  <span className="emergency-badge">{item.badge}</span>
                </div>
                <div className="emergency-card-body">
                  <h3 className="emergency-name">{item.name}</h3>
                  <p className="emergency-desc">{item.description}</p>
                </div>
                <a
                  href={`tel:${item.number}`}
                  className="emergency-call-btn"
                  title={`Call ${item.name} at ${item.displayNumber}`}
                >
                  <span className="call-icon">📞</span>
                  <span className="call-number">{item.displayNumber}</span>
                  <span className="call-cta">TAP TO CALL</span>
                </a>
              </div>
            ))}
          </div>

          <div className="health-centre-map-banner">
            <div className="health-banner-text">
              <strong>Need In-Person Medical Attention?</strong>
              <p>The NIT Health Centre provides 24/7 doctor consultations, emergency triage, and prescription medicines.</p>
            </div>
            <button
              className="guide-map-locate-btn"
              onClick={() => handleLocate("health-centre")}
            >
              <span>🏥</span> LOCATE HEALTH CENTRE ON MAP
            </button>
          </div>
        </section>

        {/* ================= 2. MOBILE NETWORKS & CAMPUS WI-FI (ABOVE CAMPUS BASICS) ================= */}
        <section id="network-section" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker cyan"></span>
            <span>CAMPUS CONNECTIVITY // CELLULAR TELECOM & WI-FI</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">📶</span> Mobile Networks & Wi-Fi on Campus
            </h2>
            <p className="section-desc">
              Ground-truth student network guide: Speed hotspots, hostel coverage reality, and campus Wi-Fi credentials.
            </p>
          </div>

          <div className="network-info-grid">
            {/* Airtel Card */}
            <div className="network-card airtel-theme">
              <div className="net-header">
                <span className="net-brand">AIRTEL</span>
                <span className="net-tag fast">Fast Across Most Areas</span>
              </div>
              <p className="net-desc">
                Fast and consistent connectivity across almost the entire campus for calling and daily internet usage.
              </p>
              <ul className="net-tips-list">
                <li>
                  <strong>Hostels True 5G:</strong> True 5G works reliably <em>only from 2nd floors and above</em> across all hostels. Ground & 1st floors usually fall back to 4G.
                </li>
                <li>
                  <strong>Sports & Cricket Grounds:</strong> Speed is decent / okayish outdoors.
                </li>
                <li>
                  <strong>Central Computer Center (CC):</strong> Signal keeps fluctuating inside CC labs, and data speed is noticeably slow.
                </li>
              </ul>
            </div>

            {/* Jio Card */}
            <div className="network-card jio-theme">
              <div className="net-header">
                <span className="net-brand">JIO</span>
                <span className="net-tag true-5g">True 5G in Select Zones</span>
              </div>
              <p className="net-desc">
                Blazing fast 5G speeds in central corridors, but high variation depending on campus coordinates.
              </p>
              <ul className="net-tips-list">
                <li>
                  <strong>T-Point to Main Gate:</strong> Very fast True 5G speeds throughout this main corridor.
                </li>
                <li>
                  <strong>Beyond T-Point:</strong> Network speed drops significantly / is very low.
                </li>
                <li>
                  <strong>Hostel 9 (BH9) to Food Court:</strong> Internet speed is okayish / usable.
                </li>
                <li>
                  <strong>Computer Center (CC) Labs:</strong> Jio works <em>very fast</em> inside CC labs (unlike Airtel).
                </li>
                <li>
                  <strong>Campus Grounds:</strong> Very slow on both grounds — often struggles to send WhatsApp messages.
                </li>
              </ul>
            </div>
          </div>

          {/* Campus & Library Wi-Fi Card */}
          <div className="wifi-passwords-card">
            <div className="wifi-card-header">
              <div className="wifi-title-group">
                <span className="wifi-icon">📡</span>
                <div>
                  <h3 className="wifi-title">Library & Campus Wi-Fi Passwords</h3>
                  <span className="wifi-subtitle">Central Library & departmental access points</span>
                </div>
              </div>
              <span className="wifi-badge">CAMPUS WI-FI</span>
            </div>

            <p className="wifi-desc">
              The Central Library and multiple academic zones have active Wi-Fi hotspots. These two common default passwords work on various campus networks:
            </p>

            <div className="wifi-keys-grid">
              <div className="wifi-key-item">
                <span className="key-label">COMMON PASSWORD 1</span>
                <div className="key-box">
                  <code className="key-value">abcde</code>
                  <button
                    className="copy-key-btn"
                    onClick={(e) => {
                      navigator.clipboard?.writeText("abcde");
                      const btn = e.currentTarget;
                      btn.innerText = "✓ COPIED";
                      setTimeout(() => { btn.innerText = "COPY"; }, 2000);
                    }}
                    title="Copy password to clipboard"
                  >
                    COPY
                  </button>
                </div>
              </div>

              <div className="wifi-key-item">
                <span className="key-label">COMMON PASSWORD 2</span>
                <div className="key-box">
                  <code className="key-value">nits@54321</code>
                  <button
                    className="copy-key-btn"
                    onClick={(e) => {
                      navigator.clipboard?.writeText("nits@54321");
                      const btn = e.currentTarget;
                      btn.innerText = "✓ COPIED";
                      setTimeout(() => { btn.innerText = "COPY"; }, 2000);
                    }}
                    title="Copy password to clipboard"
                  >
                    COPY
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Institute LAN & Gateway Authentication Guide */}
          <div className="lan-auth-card">
            <div className="lan-card-header">
              <div className="lan-title-group">
                <span className="lan-icon">🌐</span>
                <div>
                  <h3 className="lan-title">Institute LAN & Gateway Authentication (CCC)</h3>
                  <span className="lan-subtitle">Hostel LAN Ports, Computer Center & Academic Network Access</span>
                </div>
              </div>
              <span className="lan-badge">PORTAL: 10.10.10.1:8090</span>
            </div>

            <div className="lan-body">
              <p className="lan-instruction">
                When you connect your laptop or device to the institute network using a <strong>LAN Cable</strong> or <strong>Campus Wi-Fi</strong>, authentication is required through your browser:
              </p>

              <div className="lan-steps-list">
                <div className="lan-step-item">
                  <span className="step-badge-num">1</span>
                  <div className="step-text">
                    <strong>Automatic Captive Portal:</strong>
                    <p>Open any browser and try accessing any web page. The institute login portal will appear automatically.</p>
                  </div>
                </div>

                <div className="lan-step-item">
                  <span className="step-badge-num">2</span>
                  <div className="step-text">
                    <strong>Manual Login Gateway Link:</strong>
                    <p>If the captive portal does not load automatically, navigate directly to:</p>
                    <div className="gateway-link-box">
                      <code className="gateway-url">http://10.10.10.1:8090</code>
                      <div className="gateway-btn-group">
                        <a
                          href="http://10.10.10.1:8090"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gateway-open-btn"
                          title="Open Gateway in new tab (when connected to Campus Network)"
                        >
                          OPEN PORTAL ↗
                        </a>
                        <button
                          className="copy-key-btn"
                          onClick={(e) => {
                            navigator.clipboard?.writeText("http://10.10.10.1:8090");
                            const btn = e.currentTarget;
                            btn.innerText = "✓ COPIED";
                            setTimeout(() => { btn.innerText = "COPY"; }, 2000);
                          }}
                          title="Copy login URL"
                        >
                          COPY URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lan-step-item">
                  <span className="step-badge-num">3</span>
                  <div className="step-text">
                    <strong>CCC Login Credentials:</strong>
                    <p>
                      Enter your individual <strong>Username</strong> and <strong>Password</strong> provided officially by the <strong>Central Computer Center (CCC)</strong>. After successful validation, you can use any browser or application for uninterrupted internet access.
                    </p>
                  </div>
                </div>
              </div>

              {/* Troubleshooting, Complaint Forms & Internet Policy */}
              <div className="lan-support-grid">
                {/* LAN Issue Complaint Form */}
                <div className="lan-support-card complaint-card">
                  <div className="support-header">
                    <span className="supp-icon">🛠️</span>
                    <div>
                      <strong>LAN Issue / Fault Complaint:</strong>
                      <p>If you encounter port issues or connection faults, register your complaint here:</p>
                    </div>
                  </div>
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdUfRSZ4KJiLLsi06gBWCxCSXC4tu6q4M_Ss24bhzWI82dVXA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-action-btn complaint-btn"
                  >
                    <span>📝</span>
                    <span>LAN Issue Complaint Form</span>
                    <span className="ext-arrow">↗</span>
                  </a>
                </div>

                {/* Change Credentials Form */}
                <div className="lan-support-card complaint-card">
                  <div className="support-header">
                    <span className="supp-icon">🔑</span>
                    <div>
                      <strong>Change Credentials:</strong>
                      <p>If you need to reset or update internet login credentials, use this form:</p>
                    </div>
                  </div>
                  <a
                    href="https://forms.gle/oXXPhCrf1e9XhJWx7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-action-btn complaint-btn"
                  >
                    <span>📝</span>
                    <span>Request to Change User credentials for Internet Access</span>
                    <span className="ext-arrow">↗</span>
                  </a>
                </div>

                {/* Internet Policy */}
                <div className="lan-support-card policy-card">
                  <div className="support-header">
                    <span className="supp-icon">📜</span>
                    <div>
                      <strong>Institute's Internet Usage Policy:</strong>
                      <p>
                        All users are requested to familiarize themselves with the Institute&apos;s Internet Usage Policy, accessible here: <a href="http://ec.nits.ac.in/lan" target="_blank" rel="noopener noreferrer" className="policy-inline-link">http://ec.nits.ac.in/lan</a>
                      </p>
                    </div>
                  </div>
                  <a
                    href="http://ec.nits.ac.in/lan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="support-action-btn policy-btn"
                  >
                    <span>🏛️</span>
                    <span>http://ec.nits.ac.in/lan</span>
                    <span className="ext-arrow">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 3. HOSTEL WASHING MACHINES & LAUNDRY GUIDE ================= */}
        <section id="laundry-section" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker cyan"></span>
            <span>HOSTEL UTILITIES // IOT LAUNDRY AUTOMATION</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">🧺</span> Hostel Washing Machines & Laundry
            </h2>
            <p className="section-desc">
              How to operate IoT washing machines in hostels using the Laundry Crew app, plus hotspot bypass troubleshooting.
            </p>
          </div>

          <div className="laundry-grid">
            {/* Standard Operation Card (Connected to Wi-Fi) */}
            <div className="laundry-card connected-theme">
              <div className="laundry-card-header">
                <div className="laundry-title-group">
                  <span className="laundry-icon">📶</span>
                  <div>
                    <h3 className="laundry-card-title">If Machine is Connected to Wi-Fi</h3>
                    <span className="laundry-card-subtitle">Normal Operation via Laundry Crew App</span>
                  </div>
                </div>
                <span className="laundry-badge green">WI-FI ONLINE</span>
              </div>

              <div className="laundry-steps-list">
                <div className="laundry-step-item">
                  <span className="laundry-step-num">1</span>
                  <div className="laundry-step-content">
                    <strong>Download & Open Laundry Crew App:</strong>
                    <p>Get the official laundry application for your phone:</p>
                    <div className="app-store-btn-group">
                      <a
                        href="https://apps.apple.com/in/app/laundry-crew/id1529539729"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-download-btn apple-btn"
                        title="Download Laundry Crew on Apple App Store"
                      >
                        <span className="store-icon">🍏</span>
                        <div className="store-text">
                          <span className="store-small">Download on</span>
                          <span className="store-name">Apple App Store</span>
                        </div>
                        <span className="ext-arrow">↗</span>
                      </a>

                      <a
                        href="https://play.google.com/store/apps/details?id=com.lge.laundrymanager&pcampaignid=web_share"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="app-download-btn android-btn"
                        title="Download Laundry Crew on Google Play Store"
                      >
                        <span className="store-icon">🤖</span>
                        <div className="store-text">
                          <span className="store-small">Get it on</span>
                          <span className="store-name">Google Play</span>
                        </div>
                        <span className="ext-arrow">↗</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="laundry-step-item">
                  <span className="laundry-step-num">2</span>
                  <div className="laundry-step-content">
                    <strong>Scan Machine QR Code:</strong>
                    <p>Open the app and scan the QR code located on or near the washing machine you wish to use.</p>
                  </div>
                </div>

                <div className="laundry-step-item">
                  <span className="laundry-step-num">3</span>
                  <div className="laundry-step-content">
                    <strong>Select Settings & Pay:</strong>
                    <p>Select your desired wash cycle settings and proceed to digital payment to start the wash cycle.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Troubleshooting / Mobile Hotspot Card */}
            <div className="laundry-card hotspot-theme">
              <div className="laundry-card-header">
                <div className="laundry-title-group">
                  <span className="laundry-icon">⚡</span>
                  <div>
                    <h3 className="laundry-card-title">If Machine is Not Connected</h3>
                    <span className="laundry-card-subtitle">Mobile Hotspot Setup & Connection Fix</span>
                  </div>
                </div>
                <span className="laundry-badge amber">HOTSPOT BYPASS</span>
              </div>

              <p className="laundry-troubleshoot-intro">
                If the washing machine is offline or disconnected from Wi-Fi, follow these steps to connect it via your mobile hotspot:
              </p>

              <div className="hotspot-steps-list">
                <div className="hotspot-step-item">
                  <span className="h-step-badge">1</span>
                  <div className="h-step-info">
                    <strong>Take Hotspot Near Machine:</strong>
                    <p>Take your mobile phone close to the washing machines.</p>
                  </div>
                </div>

                <div className="hotspot-step-item">
                  <span className="h-step-badge">2</span>
                  <div className="h-step-info">
                    <strong>Rename Hotspot to:</strong>
                    <div className="hotspot-name-box">
                      <code className="hotspot-ssid">NITS</code>
                      <button
                        className="copy-key-btn"
                        onClick={(e) => {
                          navigator.clipboard?.writeText("NITS");
                          const btn = e.currentTarget;
                          btn.innerText = "✓ COPIED";
                          setTimeout(() => { btn.innerText = "COPY"; }, 2000);
                        }}
                        title="Copy Hotspot Name NITS"
                      >
                        COPY
                      </button>
                    </div>
                  </div>
                </div>

                <div className="hotspot-step-item">
                  <span className="h-step-badge">3</span>
                  <div className="h-step-info">
                    <strong>Keep it Passwordless:</strong>
                    <p>Set hotspot security to <strong className="highlight-text">Open / None (No Password)</strong>.</p>
                  </div>
                </div>

                <div className="hotspot-step-item">
                  <span className="h-step-badge">4</span>
                  <div className="h-step-info">
                    <strong>Power Cycle Machine:</strong>
                    <p>Switch the washing machine you want to use <strong>OFF</strong> and then turn it back <strong>ON</strong>. Wait for <strong>20–30 seconds</strong>.</p>
                  </div>
                </div>

                <div className="hotspot-step-item fallback-step">
                  <span className="h-step-badge">5</span>
                  <div className="h-step-info">
                    <strong>If it doesn&apos;t work, try renaming Hotspot to:</strong>
                    <div className="hotspot-name-box">
                      <code className="hotspot-ssid">NITS-WM</code>
                      <button
                        className="copy-key-btn"
                        onClick={(e) => {
                          navigator.clipboard?.writeText("NITS-WM");
                          const btn = e.currentTarget;
                          btn.innerText = "✓ COPIED";
                          setTimeout(() => { btn.innerText = "COPY"; }, 2000);
                        }}
                        title="Copy Hotspot Name NITS-WM"
                      >
                        COPY
                      </button>
                    </div>
                    <p className="fallback-note">Then toggle power (OFF & ON) again and wait 20–30s before trying.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 4. CAMPUS BASICS & KEY HUBS ================= */}
        <section id="campus-basics" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker"></span>
            <span>CAMPUS INFRASTRUCTURE & NAVIGATION DIRECTORY</span>
          </div>

          <div className="section-header-block">
            <div className="title-with-action">
              <div>
                <h2 className="section-title">
                  <span className="title-icon">🗺️</span> Campus Basics & Core Hubs
                </h2>
                <p className="section-desc">
                  Key academic, administrative, and student facilities across the 600+ acre NIT Silchar campus.
                </p>
              </div>
              <button
                className="guide-primary-action-btn"
                onClick={onNavigateToMap}
              >
                <span>🎯</span> EXPLORE INTERACTIVE MAP
              </button>
            </div>
          </div>

          <div className="campus-hubs-grid">
            {CAMPUS_BASICS_HUBS.map((hub) => (
              <div key={hub.id} className="campus-hub-card">
                <div className="hub-header">
                  <div className="hub-icon-wrapper">
                    <span>{hub.icon}</span>
                  </div>
                  <span className="hub-category-tag">{hub.category}</span>
                </div>
                <h3 className="hub-name">{hub.name}</h3>
                <p className="hub-desc">{hub.desc}</p>
                <button
                  className="hub-locate-btn"
                  onClick={() => handleLocate(hub.mapLocationId)}
                  title={`View ${hub.name} on Campus Map`}
                >
                  <span>📍</span> LOCATE ON MAP
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 3. CAMPUS TRANSPORT & BAHUBALI ================= */}
        <section id="campus-services" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker emerald"></span>
            <span>INTERNAL MOBILITY // BAHUBALI TRANSIT</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">🛺</span> Campus Transit & E-Rickshaws
            </h2>
            <p className="section-desc">
              Fast internal transit across campus corridors. Tap to call operators directly.
            </p>
          </div>

          <div className="contacts-dual-grid">
            {TRANSPORT_CONTACTS.map((t) => (
              <div key={t.id} className="contact-service-card" style={{ "--service-accent": t.color }}>
                <div className="contact-card-header">
                  <span className="contact-icon">{t.icon}</span>
                  <span className="contact-badge">{t.badge}</span>
                </div>
                <h3 className="contact-name">{t.name}</h3>
                <p className="contact-desc">{t.description}</p>
                <a
                  href={`tel:${t.number}`}
                  className="service-call-btn"
                  title={`Call ${t.name}`}
                >
                  <span>📞</span>
                  <strong>{t.displayNumber}</strong>
                  <span className="btn-subtext">CALL NOW</span>
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 4. FOOD, DINING & ESSENTIAL SERVICES ================= */}
        <section className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker amber"></span>
            <span>FOOD & ESSENTIAL SERVICES DIRECTORY</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">🍴</span> Nearby Food & Essential Services
            </h2>
            <p className="section-desc">
              Student-favorite dhabas, bakery, and campus grooming services with direct contact numbers.
            </p>
          </div>

          <div className="services-grid">
            {FOOD_AND_SERVICES.map((serv) => (
              <div key={serv.id} className="service-card" style={{ "--serv-accent": serv.color }}>
                <div className="service-card-top">
                  <span className="serv-icon">{serv.icon}</span>
                  <span className="serv-badge">{serv.badge}</span>
                </div>
                <h3 className="serv-name">{serv.name}</h3>
                <span className="serv-cat">{serv.category}</span>
                <p className="serv-desc">{serv.description}</p>

                <div className="serv-actions">
                  <a
                    href={`tel:${serv.number}`}
                    className="service-call-btn"
                    title={`Call ${serv.name}`}
                  >
                    <span>📞</span>
                    <strong>{serv.displayNumber}</strong>
                  </a>

                  {serv.mapLocationId && (
                    <button
                      className="serv-locate-btn"
                      onClick={() => handleLocate(serv.mapLocationId)}
                      title="Locate Market Complex on Map"
                    >
                      <span>📍</span> Map
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Student Innovation & 3D Printing Spotlight (Egnotus) */}
          {STUDENT_VENTURES.map((v) => (
            <div key={v.id} className="venture-spotlight-card">
              <div className="venture-top-row">
                <div className="venture-title-block">
                  <span className="venture-icon">{v.icon}</span>
                  <div>
                    <div className="venture-name-wrapper">
                      <h3 className="venture-name">{v.name}</h3>
                      <span className="venture-badge">{v.badge}</span>
                    </div>
                    <span className="venture-tagline">{v.tagline}</span>
                  </div>
                </div>

                <div className="venture-primary-links">
                  <a
                    href={v.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venture-btn web-btn"
                    title="Visit Official Website"
                  >
                    <span>🌐</span>
                    <span>{v.websiteDisplay}</span>
                    <span className="ext-arrow">↗</span>
                  </a>
                  <a
                    href={v.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="venture-btn insta-btn"
                    title="Open Instagram Profile"
                  >
                    <span>📸</span>
                    <span>{v.instagramHandle}</span>
                    <span className="ext-arrow">↗</span>
                  </a>
                </div>
              </div>

              <p className="venture-desc">{v.description}</p>

              <div className="venture-details-grid">
                <div className="v-detail-item">
                  <span className="v-label">SERVICE CAPABILITIES</span>
                  <div className="v-tags-wrap">
                    <span className="v-pill active">✓ Single Colour Models (Available Now)</span>
                    <span className="v-pill upcoming">⏳ Multi Colour Models (Coming Soon)</span>
                    <span className="v-pill">Any 3D / CAD Model</span>
                    <span className="v-pill tc">T&C Applied</span>
                  </div>
                </div>

                <div className="v-detail-item">
                  <span className="v-label">DIRECT INQUIRIES & ORDERS</span>
                  <div className="v-contact-actions">
                    <a
                      href={`tel:${v.number}`}
                      className="v-call-btn"
                      title={`Call ${v.contactPerson} at ${v.displayNumber}`}
                    >
                      <span>📞</span>
                      <span>{v.displayNumber} ({v.contactPerson})</span>
                    </a>
                    <a
                      href={`mailto:${v.email}`}
                      className="v-email-btn"
                      title={`Email ${v.email}`}
                    >
                      <span>✉️</span>
                      <span>{v.email}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="extensible-note-card">
            <div className="ext-icon">💡</div>
            <div className="ext-text">
              <strong>More Services & Auto-Rickshaw Contacts:</strong>
              <p>Additional auto-rickshaw drivers, night canteens, and local service contacts are regularly updated to assist campus students.</p>
            </div>
          </div>
        </section>

        {/* ================= 5. ACADEMIC & STUDY RESOURCES ================= */}
        <section id="study-resources" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker cyan"></span>
            <span>ACADEMIC REPOSITORY & STUDY ECOSYSTEM</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">📚</span> Study Materials & Academic Hubs
            </h2>
            <p className="section-desc">
              Curated UG first-year Google Drive study materials, lecture slides, question banks, and student-run academic portals.
            </p>
          </div>

          {/* UG First Year Dedicated Drive Folders */}
          <div className="first-year-drives-block">
            <div className="drive-section-badge">
              <span className="drive-glow-dot"></span>
              <span>UG FIRST YEAR // DIRECT ACADEMIC DRIVE VAULTS</span>
            </div>

            <div className="study-platforms-grid first-year-grid">
              {FIRST_YEAR_DRIVES.map((drive) => (
                <div
                  key={drive.id}
                  className="study-platform-card drive-card"
                  style={{ "--plat-accent": drive.accent }}
                >
                  <div className="platform-card-header">
                    <div className="platform-icon-box drive-icon-box">
                      <span>{drive.icon}</span>
                    </div>
                    <div className="platform-meta">
                      <span className="platform-type">{drive.type}</span>
                      <span className="platform-badge">{drive.badge}</span>
                    </div>
                  </div>

                  <h3 className="platform-name">{drive.name}</h3>
                  <p className="platform-desc">{drive.description}</p>

                  <div className="platform-tags">
                    {drive.tags.map((tag) => (
                      <span key={tag} className="plat-tag">#{tag}</span>
                    ))}
                  </div>

                  <a
                    href={drive.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="platform-visit-btn drive-btn"
                    title={`Open ${drive.name} in Google Drive`}
                  >
                    <span>📂</span>
                    <span>OPEN DRIVE FOLDER</span>
                    <span className="ext-arrow">↗</span>
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* External Platform Cards */}
          <div className="online-portals-wrapper">
            <h3 className="sub-section-title">Online Student Academic Platforms</h3>
            <div className="study-platforms-grid">
              {STUDY_PLATFORMS.map((portal) => (
              <div key={portal.id} className="study-platform-card" style={{ "--plat-accent": portal.accent }}>
                <div className="platform-card-header">
                  <div className="platform-icon-box">
                    <span>{portal.icon}</span>
                  </div>
                  <div className="platform-meta">
                    <span className="platform-type">{portal.type}</span>
                    <span className="platform-badge">{portal.badge}</span>
                  </div>
                </div>

                <h3 className="platform-name">{portal.name}</h3>
                <p className="platform-desc">{portal.description}</p>

                <div className="platform-tags">
                  {portal.tags.map((tag) => (
                    <span key={tag} className="plat-tag">#{tag}</span>
                  ))}
                </div>

                <a
                  href={portal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="platform-visit-btn"
                  title={`Visit ${portal.name} (Opens in new tab)`}
                >
                  <span>🌐</span>
                  <span>VISIT {portal.name.toUpperCase()}</span>
                  <span className="ext-arrow">↗</span>
                </a>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Resource Categories */}
          <div className="study-categories-box">
            <h3 className="sub-section-title">Essential Academic Focus Areas</h3>
            <div className="study-categories-grid">
              {STUDY_CATEGORIES.map((cat, idx) => (
                <div key={idx} className="study-cat-pill-card">
                  <span className="cat-icon">{cat.icon}</span>
                  <div className="cat-text">
                    <strong>{cat.title}</strong>
                    <p>{cat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 6. SCHOLARSHIPS & BONAFIDE CERTIFICATE ================= */}
        <section id="scholarships-section" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker violet"></span>
            <span>FINANCIAL AID & INSTITUTE CERTIFICATION</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">📜</span> Scholarships & Bonafide Guide
            </h2>
            <p className="section-desc">
              Step-by-step guidance for finding national/state scholarships and obtaining an official institute Bonafide certificate.
            </p>
          </div>

          <div className="scholarship-split-grid">
            {/* Scholarship Process */}
            <div className="guide-info-card">
              <div className="card-top-header">
                <span className="info-icon">🎓</span>
                <span className="info-badge">Scholarship Workflow</span>
              </div>
              <h3 className="info-card-title">Applying for Scholarships</h3>
              <ul className="guide-checklist">
                <li>
                  <strong>1. Discover Portals:</strong> Explore National Scholarship Portal (NSP), State portals (Assam, Bihar, UP, etc.), and corporate schemes.
                </li>
                <li>
                  <strong>2. Eligibility & Criteria:</strong> Check income slabs, caste/category requirements, CPI minimums, and domicile norms.
                </li>
                <li>
                  <strong>3. Prepare Document Bundle:</strong> Keep income certificates, caste certificates, admission letters, fee receipts, bank passbooks, and marksheets ready.
                </li>
                <li>
                  <strong>4. Portal Submission:</strong> Submit online applications early before server congestion and note your application reference ID.
                </li>
                <li>
                  <strong>5. Institute Verification:</strong> Submit hard copies / photocopies to the Scholarship Section for institutional verification.
                </li>
                <li>
                  <strong>6. Track Progress:</strong> Regularly track portal status and address defects or resubmissions promptly.
                </li>
              </ul>
              <div className="official-notice-disclaimer">
                <span className="disclaimer-icon">⚠️</span>
                <span>Scholarship dates and procedures are governed by respective authorities. Always check official NIT Silchar circulars and notice boards for verified updates.</span>
              </div>
            </div>

            {/* Bonafide Certificate Section */}
            <div className="guide-info-card highlight-border">
              <div className="card-top-header">
                <span className="info-icon">🏛️</span>
                <span className="info-badge highlight">Administrative Procedure</span>
              </div>
              <h3 className="info-card-title">Obtaining a Bonafide Certificate</h3>
              <p className="info-card-desc">
                A Bonafide Certificate verifies your active enrollment at NIT Silchar. It is often required for education loans, external scholarships, bus/train student concessions, and passport applications.
              </p>

              <div className="procedure-step-box">
                <div className="step-point">
                  <span className="step-num">📍</span>
                  <div className="step-content">
                    <strong>Where to Approach:</strong>
                    <p><strong>Scholarship Section / Academic Section</strong>, located inside the <strong>New Administrative Building</strong>.</p>
                  </div>
                </div>

                <div className="step-point">
                  <span className="step-num">📄</span>
                  <div className="step-content">
                    <strong>Documents to Carry:</strong>
                    <p>Student ID card / Institute Admission letter, current semester fee payment receipt, and the relevant application form format.</p>
                  </div>
                </div>

                <div className="step-point">
                  <span className="step-num">ℹ️</span>
                  <div className="step-content">
                    <strong>Verification:</strong>
                    <p>Always verify the current application format and signature workflow with the dealing staff at the Scholarship Section.</p>
                  </div>
                </div>
              </div>

              <button
                className="guide-map-locate-btn full-width"
                onClick={() => handleLocate("admin-building")}
              >
                <span>🏢</span> LOCATE ADMINISTRATIVE BUILDING ON MAP
              </button>
            </div>
          </div>
        </section>

        {/* ================= 9. GUEST HOUSE ROOM BOOKING ================= */}
        <section id="guesthouse-section" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker violet"></span>
            <span>INSTITUTE ACCOMMODATION // ERP PORTAL</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">🏨</span> Guest House Room Booking
            </h2>
            <p className="section-desc">
              Online guest room booking procedure for visiting parents, guardians, and official guests via the NIT Silchar ERP portal.
            </p>
          </div>

          <div className="guesthouse-card">
            <div className="guesthouse-card-header">
              <div className="gh-header-left">
                <span className="gh-icon">🏛️</span>
                <div>
                  <h3 className="gh-title">NIT Silchar Guest House Reservation</h3>
                  <span className="gh-sub">Conducted directly through the official ERP portal</span>
                </div>
              </div>
              <span className="gh-badge">ERP PORTAL</span>
            </div>

            <div className="guesthouse-body">
              <div className="guesthouse-steps-grid">
                <div className="gh-step-box">
                  <div className="gh-step-badge-num">1</div>
                  <div className="gh-step-content">
                    <h4>Go to ERP Portal Login</h4>
                    <p>Open the official NIT Silchar ERP portal login page:</p>
                    <div className="gh-link-container">
                      <code className="gh-url-code">https://erp.nits.ac.in/erp/login</code>
                      <div className="gh-btn-row">
                        <a
                          href="https://erp.nits.ac.in/erp/login"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="gh-open-portal-btn"
                          title="Open ERP Login Portal in new tab"
                        >
                          OPEN PORTAL ↗
                        </a>
                        <button
                          className="copy-key-btn"
                          onClick={(e) => {
                            navigator.clipboard?.writeText("https://erp.nits.ac.in/erp/login");
                            const btn = e.currentTarget;
                            btn.innerText = "✓ COPIED";
                            setTimeout(() => { btn.innerText = "COPY"; }, 2000);
                          }}
                          title="Copy ERP URL"
                        >
                          COPY
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gh-step-box">
                  <div className="gh-step-badge-num">2</div>
                  <div className="gh-step-content">
                    <h4>Locate Guest House Booking Card</h4>
                    <p>
                      Scroll down towards the bottom of the login page and find the card labeled:
                    </p>
                    <div className="gh-card-preview-box">
                      <span className="gh-card-icon">🏨</span>
                      <div className="gh-card-preview-text">
                        <strong>Guest House Room Booking</strong>
                        <span>For guests room booking</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="gh-step-box">
                  <div className="gh-step-badge-num">3</div>
                  <div className="gh-step-content">
                    <h4>Follow Booking Steps</h4>
                    <p>
                      Click the card, choose check-in & check-out dates, room type, number of guests, and submit your booking details following the on-screen instructions.
                    </p>
                  </div>
                </div>
              </div>

              {/* First Time User Alert Notice */}
              <div className="gh-alert-box">
                <span className="gh-alert-icon">⚠️</span>
                <div className="gh-alert-text">
                  <strong>First-Time Users Notice:</strong>
                  <p>
                    First-time users have to <strong>create an account</strong> on the ERP portal before booking a room. Keep your mobile number & email accessible for OTP registration.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="gh-actions-bar">
                <a
                  href="https://erp.nits.ac.in/erp/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gh-action-primary-btn"
                  title="Proceed to NIT Silchar ERP Portal"
                >
                  <span>🌐</span> OPEN ERP PORTAL ↗
                </a>
                <button
                  className="guide-map-locate-btn"
                  onClick={() => handleLocate("guest-house")}
                  title="Locate Guest House on Campus Map"
                >
                  <span>📍</span> LOCATE GUEST HOUSE ON MAP
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ================= 10. HACKATHONS & COMPETITIONS ================= */}
        <section id="hackathons-section" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker neon"></span>
            <span>DEVELOPER ECOSYSTEM & COMPETITIVE SPRINT</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">🚀</span> Hackathons & Competitions
            </h2>
            <p className="section-desc">
              Hackathons are the fastest way to learn technologies, build project portfolios, and win prizes.
            </p>
          </div>

          {/* Encouraging Fresher Tip Card */}
          <div className="fresher-empower-banner">
            <div className="empower-badge">🌟 SENIOR PRO-TIP FOR FRESHERS</div>
            <h3>You don&apos;t need to wait for 3rd or 4th year to start building!</h3>
            <p>
              Beginners often assume they need expert skills before joining a hackathon. In reality, hackathons are learning sprints! You can participate in freshman tracks, UI/UX design, ideation, documentation, and frontend development right from 1st semester.
            </p>
          </div>

          {/* Roadmap Steps */}
          <div className="hackathon-steps-wrapper">
            <h3 className="sub-section-title">5-Step Beginner Hackathon Roadmap</h3>
            <div className="hackathon-steps-grid">
              {HACKATHON_STEPS.map((st) => (
                <div key={st.step} className="hack-step-card">
                  <span className="hack-step-num">{st.step}</span>
                  <h4 className="hack-step-title">{st.title}</h4>
                  <p className="hack-step-desc">{st.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="hackathon-platforms-wrapper">
            <h3 className="sub-section-title">Top Platforms to Explore</h3>
            <div className="platforms-cards-grid">
              {HACKATHON_PLATFORMS.map((plat) => (
                <a
                  key={plat.name}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hack-plat-card"
                  title={`Open ${plat.name} in new tab`}
                >
                  <div className="plat-top">
                    <span className="plat-icon">{plat.icon}</span>
                    <span className="plat-badge">{plat.badge}</span>
                  </div>
                  <h4 className="plat-title">{plat.name}</h4>
                  <p className="plat-desc">{plat.desc}</p>
                  <span className="plat-link-cta">Explore Competitions ↗</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 9. "THINGS I WISH I KNEW" / SENIOR TIPS ================= */}
        <section id="senior-tips-section" className="guide-section">
          <div className="section-hud-tag">
            <span className="hud-blinker amber"></span>
            <span>STUDENT SURVIVAL MATRIX // SENIOR ADVICE</span>
          </div>

          <div className="section-header-block">
            <h2 className="section-title">
              <span className="title-icon">💡</span> &ldquo;Things I Wish I Knew&rdquo; — Senior Advice
            </h2>
            <p className="section-desc">
              Battle-tested tips and best practices shared by senior Nitsians to help you thrive from Day 1.
            </p>
          </div>

          <div className="senior-tips-grid">
            {SENIOR_TIPS.map((tip, idx) => (
              <div key={idx} className="senior-tip-card">
                <div className="tip-top-row">
                  <span className="tip-icon">{tip.icon}</span>
                  <span className="tip-badge">{tip.badge}</span>
                </div>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= 10. CAMPUS MAP INVITATION BANNER ================= */}
        <section className="map-invitation-banner">
          <div className="map-inv-glow"></div>
          <div className="map-inv-content">
            <span className="inv-badge">GEO-SPATIAL SYSTEM</span>
            <h2>Ready to Explore NIT Silchar?</h2>
            <p>
              Use our live interactive campus navigation map with live GPS tracking, 50+ verified locations, building routes, and walking directions.
            </p>
            <div className="inv-actions">
              <button className="inv-primary-btn" onClick={onNavigateToMap}>
                <span>🗺️</span> OPEN INTERACTIVE CAMPUS MAP
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="freshers-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <strong>NIT SILCHAR // CAMPUS NAVIGATION & FRESHERS COMPASS</strong>
            <p>Designed for incoming students. Keep learning, exploring, and coding.</p>
          </div>
          <button className="footer-back-top-btn" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            ↑ BACK TO TOP
          </button>
        </div>
      </footer>
    </div>
  );
}
