// Crewmate SVG component with Among Us style
export default function Crewmate({ color = '#00CFCF', size = 80, label = '', onClick, glowColor }) {
  const glow = glowColor || color;

  return (
    <div
      className="crewmate-btn"
      onClick={onClick}
      title={label}
      style={{ color: color }}
    >
      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ filter: `drop-shadow(0 0 6px ${glow}44)`, transition: 'filter 0.2s ease' }}
      >
        {/* Body */}
        <ellipse cx="50" cy="80" rx="32" ry="28" fill={color} />
        {/* Head */}
        <ellipse cx="50" cy="42" rx="28" ry="26" fill={color} />
        {/* Visor */}
        <ellipse cx="52" cy="38" rx="18" ry="14" fill="#7FE7FF" opacity="0.9" />
        <ellipse cx="56" cy="34" rx="6" ry="4" fill="white" opacity="0.6" />
        {/* Backpack */}
        <rect x="74" y="54" width="16" height="24" rx="6" fill={color} />
        <rect x="76" y="58" width="12" height="4" rx="2" fill="rgba(0,0,0,0.3)" />
        <rect x="76" y="64" width="12" height="4" rx="2" fill="rgba(0,0,0,0.3)" />
        {/* Legs */}
        <ellipse cx="38" cy="106" rx="11" ry="8" fill={color} />
        <ellipse cx="62" cy="106" rx="11" ry="8" fill={color} />
        {/* Shadow */}
        <ellipse cx="50" cy="112" rx="28" ry="4" fill="rgba(0,0,0,0.3)" />
        {/* Shine */}
        <ellipse cx="44" cy="74" rx="6" ry="4" fill="rgba(255,255,255,0.15)" />
      </svg>
      {label && (
        <span
          className="crewmate-label pixel-text"
          style={{ color: color, fontSize: '8px', textAlign: 'center', maxWidth: '90px' }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
