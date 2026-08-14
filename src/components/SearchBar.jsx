import { useState, useRef, useEffect } from "react";
import { CATEGORIES } from "../data/locations";
import { calculateDistance, formatDistance } from "../utils/geoUtils";

export default function SearchBar({
  locations,
  selectedCategory,
  onSelectCategory,
  onSelectLocation,
  userLocation,
}) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const searchContainerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter locations based on query and selected category
  const filteredLocations = locations.filter((loc) => {
    const matchesCategory =
      !selectedCategory || loc.categoryId === selectedCategory;

    if (!matchesCategory) return false;

    if (!query.trim()) return selectedCategory ? true : false;

    const q = query.toLowerCase().trim();
    const matchesName = loc.name.toLowerCase().includes(q);
    const matchesCategoryName = loc.category.toLowerCase().includes(q);
    const matchesDescription = loc.description.toLowerCase().includes(q);
    const matchesAliases = loc.aliases?.some((alias) =>
      alias.toLowerCase().includes(q)
    );

    return matchesName || matchesCategoryName || matchesDescription || matchesAliases;
  });

  const handleSelect = (loc) => {
    onSelectLocation(loc);
    setIsOpen(false);
    setQuery("");
  };

  const handleCategoryClick = (catId) => {
    if (selectedCategory === catId) {
      onSelectCategory(null);
    } else {
      onSelectCategory(catId);
      setIsOpen(true);
    }
  };

  const categoryList = Object.values(CATEGORIES);

  return (
    <div className="search-wrapper" ref={searchContainerRef}>
      <div className="search-bar-container">
        <div className="search-input-box">
          <div className="search-prefix">
            <span className="search-pulse-dot"></span>
            <span className="search-terminal-tag">SEARCH</span>
          </div>

          <input
            type="text"
            className="search-input"
            placeholder="Search campus nodes (e.g. Library, CCC, SAC, Cafe, BH1)..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
          />

          {query && (
            <button
              className="clear-query-btn"
              onClick={() => setQuery("")}
              title="Clear query"
            >
              ✕
            </button>
          )}

          <div className="search-node-count">
            {locations.length} NODES
          </div>
        </div>

        {/* Futuristic Category Filter Pills */}
        <div className="category-pills">
          <button
            className={`category-pill ${!selectedCategory ? "active" : ""}`}
            onClick={() => {
              onSelectCategory(null);
            }}
          >
            <span className="pill-dot"></span>
            <span>ALL NODES</span>
          </button>

          {categoryList.map((cat) => (
            <button
              key={cat.id}
              className={`category-pill ${selectedCategory === cat.id ? "active" : ""
                }`}
              onClick={() => handleCategoryClick(cat.id)}
              style={{
                "--cat-accent": cat.color || "#38bdf8",
              }}
            >
              <span className="pill-icon">{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cyber Search & Filter Dropdown Results */}
      {isOpen && (
        <div className="search-dropdown">
          <div className="dropdown-hud-header">
            <span className="hud-label">GEOSPATIAL DIRECTORY MATCHES</span>
            <span className="hud-count">
              {filteredLocations.length} RESULT{filteredLocations.length === 1 ? "" : "S"}
            </span>
          </div>

          {filteredLocations.length === 0 ? (
            <div className="search-no-results">
              <div className="no-result-icon">⚠️</div>
              <p>NO CAMPUS NODE MATCHING &ldquo;{query}&rdquo;</p>
              <small>Verify spelling or select a category filter</small>
            </div>
          ) : (
            <ul className="search-results-list">
              {filteredLocations.map((loc) => {
                const catInfo = CATEGORIES[loc.categoryId?.toUpperCase()] || {
                  icon: "📍",
                  color: "#64748b",
                };

                let distanceText = null;
                if (userLocation && loc.latitude != null) {
                  const dist = calculateDistance(
                    userLocation[0],
                    userLocation[1],
                    loc.latitude,
                    loc.longitude
                  );
                  distanceText = formatDistance(dist);
                }

                return (
                  <li
                    key={loc.id}
                    className="search-result-item"
                    onClick={() => handleSelect(loc)}
                  >
                    <div
                      className="result-icon-box"
                      style={{ "--node-color": catInfo.color }}
                    >
                      <span>{catInfo.icon}</span>
                    </div>

                    <div className="result-info">
                      <div className="result-header-row">
                        <span className="result-name">{loc.name}</span>
                        <span className="result-coord-tag">
                          {loc.latitude.toFixed(4)}°N, {loc.longitude.toFixed(4)}°E
                        </span>
                      </div>
                      <p className="result-desc">{loc.description}</p>
                    </div>

                    {distanceText ? (
                      <div className="result-distance-badge">
                        <span className="dist-icon">⚡</span>
                        <span>{distanceText}</span>
                      </div>
                    ) : (
                      <span className="result-category-chip">{loc.category}</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
