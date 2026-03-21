import { forwardRef } from 'react';

interface CertificateProps {
  staffName: string;
  staffPhoto: string;
  date: string;
}

const LOGO_FALLBACK = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
  <circle cx="60" cy="60" r="55" fill="#f0fdfa" stroke="#0d9488" stroke-width="3"/>
  <circle cx="60" cy="60" r="46" fill="none" stroke="#14b8a6" stroke-width="1.5"/>
  <circle cx="60" cy="60" r="38" fill="none" stroke="#0d9488" stroke-width="0.8"/>
  <text x="60" y="42" text-anchor="middle" font-size="11" fill="#0d9488" font-family="serif" font-weight="bold">M.S.</text>
  <text x="60" y="56" text-anchor="middle" font-size="8" fill="#0d9488" font-family="serif">BOARD</text>
  <text x="60" y="68" text-anchor="middle" font-size="6.5" fill="#115e59" font-family="serif">SSC &amp; HSC</text>
  <text x="60" y="80" text-anchor="middle" font-size="5.5" fill="#0d9488" font-family="serif">MAHARASHTRA</text>
</svg>`)}`;

const SIGNATURE_FALLBACK = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70">
  <path d="M15,50 Q35,15 55,40 Q65,52 85,22 Q95,8 108,35 Q118,54 138,28 Q150,14 168,38 Q178,52 200,32" fill="none" stroke="#0a4f47" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M80,50 Q100,42 115,50" fill="none" stroke="#0a4f47" stroke-width="1.2" stroke-linecap="round"/>
</svg>`)}`;

// ─── Bottom Corner SVGs as Data URIs (better html2canvas support) ───
const CORNER_BL_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 135" width="135" height="135">
  <circle cx="30" cy="105" r="18" fill="#faf8f0" stroke="#c9a227" stroke-width="1.5"/>
  <circle cx="30" cy="105" r="14" fill="none" stroke="#0d9488" stroke-width="1"/>
  <circle cx="30" cy="105" r="10" fill="none" stroke="#c9a227" stroke-width="0.5"/>
  <circle cx="30" cy="93" r="4" fill="#0d9488"/>
  <circle cx="38" cy="97" r="3" fill="#14b8a6"/>
  <circle cx="42" cy="105" r="4" fill="#0d9488"/>
  <circle cx="38" cy="113" r="3" fill="#14b8a6"/>
  <circle cx="30" cy="117" r="4" fill="#0d9488"/>
  <circle cx="22" cy="113" r="3" fill="#14b8a6"/>
  <circle cx="18" cy="105" r="4" fill="#0d9488"/>
  <circle cx="22" cy="97" r="3" fill="#14b8a6"/>
  <circle cx="30" cy="105" r="5" fill="#c9a227"/>
  <circle cx="30" cy="105" r="3" fill="#faf8f0"/>
  <circle cx="30" cy="105" r="1.5" fill="#0d9488"/>
</svg>`)}`;

const CORNER_BR_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 135" width="135" height="135">
  <circle cx="105" cy="105" r="18" fill="#faf8f0" stroke="#c9a227" stroke-width="1.5"/>
  <circle cx="105" cy="105" r="14" fill="none" stroke="#0d9488" stroke-width="1"/>
  <circle cx="105" cy="105" r="10" fill="none" stroke="#c9a227" stroke-width="0.5"/>
  <circle cx="105" cy="93" r="4" fill="#0d9488"/>
  <circle cx="113" cy="97" r="3" fill="#14b8a6"/>
  <circle cx="117" cy="105" r="4" fill="#0d9488"/>
  <circle cx="113" cy="113" r="3" fill="#14b8a6"/>
  <circle cx="105" cy="117" r="4" fill="#0d9488"/>
  <circle cx="97" cy="113" r="3" fill="#14b8a6"/>
  <circle cx="93" cy="105" r="4" fill="#0d9488"/>
  <circle cx="97" cy="97" r="3" fill="#14b8a6"/>
  <circle cx="105" cy="105" r="5" fill="#c9a227"/>
  <circle cx="105" cy="105" r="3" fill="#faf8f0"/>
  <circle cx="105" cy="105" r="1.5" fill="#0d9488"/>
</svg>`)}`;

// Top-right corner as data URI (same issue with right: 0 positioning)
const CORNER_TR_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 135 135" width="135" height="135">
  <path d="M5,5 C75,5 130,60 130,130" fill="none" stroke="#0d9488" stroke-width="3"/>
  <path d="M10,10 C73,10 125,62 125,125" fill="none" stroke="#c9a227" stroke-width="1.5"/>
  <path d="M15,15 C70,15 120,65 120,120" fill="none" stroke="#0d9488" stroke-width="2"/>
  <path d="M20,20 C67,20 115,68 115,115" fill="none" stroke="#c9a227" stroke-width="0.8"/>
  <path d="M25,25 C65,25 110,70 110,110" fill="none" stroke="#14b8a6" stroke-width="1"/>
  <circle cx="93" cy="42" r="28" fill="#faf8f0" stroke="#c9a227" stroke-width="2"/>
  <circle cx="93" cy="42" r="23" fill="none" stroke="#0d9488" stroke-width="1.5"/>
  <circle cx="93" cy="42" r="18" fill="none" stroke="#c9a227" stroke-width="0.8"/>
  <circle cx="93" cy="27" r="6" fill="#0d9488"/>
  <circle cx="104" cy="31" r="5" fill="#14b8a6"/>
  <circle cx="108" cy="42" r="6" fill="#0d9488"/>
  <circle cx="104" cy="53" r="5" fill="#14b8a6"/>
  <circle cx="93" cy="57" r="6" fill="#0d9488"/>
  <circle cx="82" cy="53" r="5" fill="#14b8a6"/>
  <circle cx="78" cy="42" r="6" fill="#0d9488"/>
  <circle cx="82" cy="31" r="5" fill="#14b8a6"/>
  <circle cx="93" cy="42" r="9" fill="#c9a227"/>
  <circle cx="93" cy="42" r="6" fill="#faf8f0"/>
  <circle cx="93" cy="42" r="3" fill="#0d9488"/>
  <path d="M67,18 L40,8" stroke="#0d9488" stroke-width="1.5" stroke-linecap="round"/>
  <path d="M117,68 L127,95" stroke="#0d9488" stroke-width="1.5" stroke-linecap="round"/>
  <circle cx="37" cy="7" r="4" fill="#c9a227"/>
  <circle cx="128" cy="98" r="4" fill="#c9a227"/>
  <circle cx="55" cy="13" r="2" fill="#0d9488"/>
  <circle cx="122" cy="80" r="2" fill="#0d9488"/>
</svg>`)}`;

// Side decoration as data URI for better html2canvas support
const SIDE_DECORATION_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 600" width="25" height="600">
  <line x1="15" y1="0" x2="15" y2="600" stroke="#0d9488" stroke-width="1.5" stroke-opacity="0.3"/>
  <circle cx="15" cy="25" r="4" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="25" r="2" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="75" r="3" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="75" r="1.5" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="75" r="6" fill="#14b8a6" fill-opacity="0.4"/><circle cx="15" cy="75" r="3.5" fill="#0d9488" fill-opacity="0.5"/><circle cx="15" cy="75" r="1.5" fill="#c9a227"/>
  <circle cx="15" cy="125" r="4" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="125" r="2" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="175" r="3" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="175" r="1.5" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="225" r="4" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="225" r="2" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="225" r="6" fill="#14b8a6" fill-opacity="0.4"/><circle cx="15" cy="225" r="3.5" fill="#0d9488" fill-opacity="0.5"/><circle cx="15" cy="225" r="1.5" fill="#c9a227"/>
  <circle cx="15" cy="275" r="3" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="275" r="1.5" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="325" r="4" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="325" r="2" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="375" r="3" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="375" r="1.5" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="375" r="6" fill="#14b8a6" fill-opacity="0.4"/><circle cx="15" cy="375" r="3.5" fill="#0d9488" fill-opacity="0.5"/><circle cx="15" cy="375" r="1.5" fill="#c9a227"/>
  <circle cx="15" cy="425" r="4" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="425" r="2" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="475" r="3" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="475" r="1.5" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="525" r="4" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="525" r="2" fill="#c9a227" fill-opacity="0.5"/>
  <circle cx="15" cy="525" r="6" fill="#14b8a6" fill-opacity="0.4"/><circle cx="15" cy="525" r="3.5" fill="#0d9488" fill-opacity="0.5"/><circle cx="15" cy="525" r="1.5" fill="#c9a227"/>
  <circle cx="15" cy="575" r="3" fill="#0d9488" fill-opacity="0.35"/><circle cx="15" cy="575" r="1.5" fill="#c9a227" fill-opacity="0.5"/>
</svg>`)}`;

// Watermark seal as data URI
const WATERMARK_SVG = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 350" width="350" height="350">
  <circle cx="175" cy="175" r="160" fill="none" stroke="#0d9488" stroke-width="2"/>
  <circle cx="175" cy="175" r="140" fill="none" stroke="#0d9488" stroke-width="1.5"/>
  <circle cx="175" cy="175" r="120" fill="none" stroke="#0d9488" stroke-width="1"/>
  <circle cx="175" cy="175" r="100" fill="none" stroke="#0d9488" stroke-width="1.5"/>
  <circle cx="175" cy="175" r="80" fill="none" stroke="#0d9488" stroke-width="1"/>
  <circle cx="175" cy="175" r="60" fill="none" stroke="#0d9488" stroke-width="1.5"/>
  <circle cx="175" cy="175" r="40" fill="#0d9488"/>
  <circle cx="175" cy="175" r="22" fill="none" stroke="#faf8f0" stroke-width="3"/>
  <circle cx="325" cy="175" r="8" fill="#0d9488"/>
  <circle cx="304.9" cy="87.5" r="8" fill="#0d9488"/>
  <circle cx="245.49" cy="26.68" r="8" fill="#0d9488"/>
  <circle cx="175" cy="25" r="8" fill="#0d9488"/>
  <circle cx="104.5" cy="26.68" r="8" fill="#0d9488"/>
  <circle cx="45.1" cy="87.5" r="8" fill="#0d9488"/>
  <circle cx="25" cy="175" r="8" fill="#0d9488"/>
  <circle cx="45.1" cy="262.5" r="8" fill="#0d9488"/>
  <circle cx="104.5" cy="323.32" r="8" fill="#0d9488"/>
  <circle cx="175" cy="325" r="8" fill="#0d9488"/>
  <circle cx="245.49" cy="323.32" r="8" fill="#0d9488"/>
  <circle cx="304.9" cy="262.5" r="8" fill="#0d9488"/>
</svg>`)}`;

// ─── Premium Art Deco Style Corner (No transforms - html2canvas compatible) ───
const ArtDecoCorner = ({ position }: { position: 'tl' | 'tr' | 'bl' | 'br' }) => {
  // For corners with right/bottom positioning, use img elements for better html2canvas support
  if (position === 'bl') {
    return (
      <img
        src={CORNER_BL_SVG}
        alt=""
        width="135"
        height="135"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    );
  }

  if (position === 'br') {
    return (
      <img
        src={CORNER_BR_SVG}
        alt=""
        width="135"
        height="135"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    );
  }

  if (position === 'tr') {
    return (
      <img
        src={CORNER_TR_SVG}
        alt=""
        width="135"
        height="135"
        crossOrigin="anonymous"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          pointerEvents: 'none',
          zIndex: 10,
        }}
      />
    );
  }

  // Top-left corner uses inline SVG (positioned at top: 0, left: 0 - works fine)
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 135 135"
      width="135"
      height="135"
      data-corner={position}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        overflow: 'visible',
        zIndex: 10,
      }}
    >
      <g>
        {/* Outer decorative curves */}
        <path d="M5,130 C5,60 60,5 130,5" fill="none" stroke="#0d9488" strokeWidth="3"/>
        <path d="M10,125 C10,62 62,10 125,10" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
        <path d="M15,120 C15,65 65,15 120,15" fill="none" stroke="#0d9488" strokeWidth="2"/>
        <path d="M20,115 C20,68 68,20 115,20" fill="none" stroke="#c9a227" strokeWidth="0.8"/>
        <path d="M25,110 C25,70 70,25 110,25" fill="none" stroke="#14b8a6" strokeWidth="1"/>

        {/* Corner medallion */}
        <circle cx="42" cy="42" r="28" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
        <circle cx="42" cy="42" r="23" fill="none" stroke="#0d9488" strokeWidth="1.5"/>
        <circle cx="42" cy="42" r="18" fill="none" stroke="#c9a227" strokeWidth="0.8"/>

        {/* 8-petal flower using ONLY circles - NO transforms */}
        <circle cx="42" cy="27" r="6" fill="#0d9488"/>
        <circle cx="53" cy="31" r="5" fill="#14b8a6"/>
        <circle cx="57" cy="42" r="6" fill="#0d9488"/>
        <circle cx="53" cy="53" r="5" fill="#14b8a6"/>
        <circle cx="42" cy="57" r="6" fill="#0d9488"/>
        <circle cx="31" cy="53" r="5" fill="#14b8a6"/>
        <circle cx="27" cy="42" r="6" fill="#0d9488"/>
        <circle cx="31" cy="31" r="5" fill="#14b8a6"/>

        {/* Center jewel */}
        <circle cx="42" cy="42" r="9" fill="#c9a227"/>
        <circle cx="42" cy="42" r="6" fill="#faf8f0"/>
        <circle cx="42" cy="42" r="3" fill="#0d9488"/>

        {/* Decorative spurs */}
        <path d="M68,18 L95,8" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M18,68 L8,95" stroke="#0d9488" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="98" cy="7" r="4" fill="#c9a227"/>
        <circle cx="7" cy="98" r="4" fill="#c9a227"/>
        <circle cx="80" cy="13" r="2" fill="#0d9488"/>
        <circle cx="13" cy="80" r="2" fill="#0d9488"/>
      </g>
    </svg>
  );
};

// ─── Elegant Guilloche Border Pattern ───
const GuillocheBorder = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 794 1123"
    width="794"
    height="1123"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    }}
  >
    {/* Multi-layer borders */}
    <rect x="4" y="4" width="786" height="1115" fill="none" stroke="#0d9488" strokeWidth="4"/>
    <rect x="10" y="10" width="774" height="1103" fill="none" stroke="#c9a227" strokeWidth="1.5"/>
    <rect x="14" y="14" width="766" height="1095" fill="none" stroke="#0d9488" strokeWidth="1"/>
    <rect x="18" y="18" width="758" height="1087" fill="none" stroke="#c9a227" strokeWidth="2"/>
    <rect x="23" y="23" width="748" height="1077" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
    <rect x="27" y="27" width="740" height="1069" fill="none" stroke="#c9a227" strokeWidth="0.5"/>

    {/* Top center ornament */}
    <g>
      <ellipse cx="397" cy="32" rx="55" ry="14" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
      <ellipse cx="397" cy="32" rx="40" ry="9" fill="none" stroke="#0d9488" strokeWidth="1"/>
      <circle cx="397" cy="32" r="5" fill="#c9a227"/>
      <circle cx="355" cy="32" r="3" fill="#0d9488"/>
      <circle cx="439" cy="32" r="3" fill="#0d9488"/>
      <circle cx="330" cy="32" r="2" fill="#c9a227"/>
      <circle cx="464" cy="32" r="2" fill="#c9a227"/>
    </g>

    {/* Bottom center ornament */}
    <g>
      <ellipse cx="397" cy="1091" rx="55" ry="14" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
      <ellipse cx="397" cy="1091" rx="40" ry="9" fill="none" stroke="#0d9488" strokeWidth="1"/>
      <circle cx="397" cy="1091" r="5" fill="#c9a227"/>
      <circle cx="355" cy="1091" r="3" fill="#0d9488"/>
      <circle cx="439" cy="1091" r="3" fill="#0d9488"/>
      <circle cx="330" cy="1091" r="2" fill="#c9a227"/>
      <circle cx="464" cy="1091" r="2" fill="#c9a227"/>
    </g>

    {/* Left center ornament */}
    <g>
      <ellipse cx="32" cy="561" rx="14" ry="45" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
      <ellipse cx="32" cy="561" rx="9" ry="32" fill="none" stroke="#0d9488" strokeWidth="1"/>
      <circle cx="32" cy="561" r="5" fill="#c9a227"/>
      <circle cx="32" cy="525" r="2.5" fill="#0d9488"/>
      <circle cx="32" cy="597" r="2.5" fill="#0d9488"/>
    </g>

    {/* Right center ornament */}
    <g>
      <ellipse cx="762" cy="561" rx="14" ry="45" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
      <ellipse cx="762" cy="561" rx="9" ry="32" fill="none" stroke="#0d9488" strokeWidth="1"/>
      <circle cx="762" cy="561" r="5" fill="#c9a227"/>
      <circle cx="762" cy="525" r="2.5" fill="#0d9488"/>
      <circle cx="762" cy="597" r="2.5" fill="#0d9488"/>
    </g>

    {/* Decorative corner dots */}
    <circle cx="150" cy="32" r="2" fill="#0d9488"/>
    <circle cx="200" cy="32" r="1.5" fill="#c9a227"/>
    <circle cx="250" cy="32" r="2" fill="#0d9488"/>
    <circle cx="544" cy="32" r="2" fill="#0d9488"/>
    <circle cx="594" cy="32" r="1.5" fill="#c9a227"/>
    <circle cx="644" cy="32" r="2" fill="#0d9488"/>

    <circle cx="150" cy="1091" r="2" fill="#0d9488"/>
    <circle cx="200" cy="1091" r="1.5" fill="#c9a227"/>
    <circle cx="250" cy="1091" r="2" fill="#0d9488"/>
    <circle cx="544" cy="1091" r="2" fill="#0d9488"/>
    <circle cx="594" cy="1091" r="1.5" fill="#c9a227"/>
    <circle cx="644" cy="1091" r="2" fill="#0d9488"/>
  </svg>
);

// ─── Simple Side Decoration (using img for html2canvas compatibility) ───
const SimpleSideDecoration = ({ side }: { side: 'left' | 'right' }) => (
  <img
    src={SIDE_DECORATION_SVG}
    alt=""
    width="25"
    height="600"
    crossOrigin="anonymous"
    style={{
      position: 'absolute',
      [side]: '35px',
      top: '260px',
      pointerEvents: 'none',
    }}
  />
);

// ─── Royal Floral Header Banner ───
const RoyalFloralBanner = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 90" width="100%" height="80" style={{ display: 'block' }}>
    {/* Left flourish */}
    <path d="M30,60 Q100,45 170,38 Q230,32 280,32 Q310,32 325,35"
      fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M30,60 Q100,50 170,44 Q230,38 280,38 Q310,38 325,40"
      fill="none" stroke="#c9a227" strokeWidth="1" strokeLinecap="round"/>

    {/* Left main flower */}
    <g>
      <circle cx="50" cy="55" r="14" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
      <ellipse cx="50" cy="43" rx="5" ry="8" fill="#0d9488"/>
      <ellipse cx="62" cy="55" rx="8" ry="5" fill="#0d9488"/>
      <ellipse cx="50" cy="67" rx="5" ry="8" fill="#0d9488"/>
      <ellipse cx="38" cy="55" rx="8" ry="5" fill="#0d9488"/>
      <circle cx="50" cy="55" r="6" fill="#c9a227"/>
      <circle cx="50" cy="55" r="3" fill="#faf8f0"/>
    </g>

    {/* Left medium flowers */}
    <g>
      <circle cx="110" cy="45" r="10" fill="#faf8f0" stroke="#0d9488" strokeWidth="1.5"/>
      <ellipse cx="110" cy="37" rx="3.5" ry="6" fill="#14b8a6"/>
      <ellipse cx="118" cy="45" rx="6" ry="3.5" fill="#14b8a6"/>
      <ellipse cx="110" cy="53" rx="3.5" ry="6" fill="#14b8a6"/>
      <ellipse cx="102" cy="45" rx="6" ry="3.5" fill="#14b8a6"/>
      <circle cx="110" cy="45" r="4" fill="#0d9488"/>
      <circle cx="110" cy="45" r="2" fill="#c9a227"/>
    </g>

    <g>
      <circle cx="170" cy="38" r="8" fill="#faf8f0" stroke="#0d9488" strokeWidth="1"/>
      <circle cx="170" cy="38" r="4" fill="#14b8a6"/>
      <circle cx="170" cy="38" r="2" fill="#c9a227"/>
    </g>

    <g>
      <circle cx="230" cy="34" r="6" fill="#faf8f0" stroke="#0d9488" strokeWidth="0.8"/>
      <circle cx="230" cy="34" r="3" fill="#0d9488"/>
      <circle cx="230" cy="34" r="1.5" fill="#c9a227"/>
    </g>

    {/* Left leaves */}
    <path d="M75,52 Q88,42 100,40" fill="none" stroke="#0d9488" strokeWidth="1"/>
    <path d="M80,48 Q85,40 92,38 Q86,43 82,50Z" fill="#0d9488" fillOpacity="0.5"/>
    <path d="M130,42 Q145,35 155,34" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
    <path d="M135,40 Q142,33 150,32 Q143,36 136,42Z" fill="#14b8a6" fillOpacity="0.4"/>

    {/* Center crown medallion */}
    <g>
      <circle cx="325" cy="22" r="20" fill="#faf8f0" stroke="#c9a227" strokeWidth="2.5"/>
      <circle cx="325" cy="22" r="15" fill="none" stroke="#0d9488" strokeWidth="1.5"/>

      {/* Central star flower - using circles only, no transforms */}
      <circle cx="325" cy="8" r="5" fill="#0d9488"/>
      <circle cx="339" cy="22" r="5" fill="#0d9488"/>
      <circle cx="325" cy="36" r="5" fill="#0d9488"/>
      <circle cx="311" cy="22" r="5" fill="#0d9488"/>
      <circle cx="335" cy="12" r="4" fill="#14b8a6"/>
      <circle cx="335" cy="32" r="4" fill="#14b8a6"/>
      <circle cx="315" cy="32" r="4" fill="#14b8a6"/>
      <circle cx="315" cy="12" r="4" fill="#14b8a6"/>

      <circle cx="325" cy="22" r="7" fill="#c9a227"/>
      <circle cx="325" cy="22" r="4" fill="#faf8f0"/>
      <circle cx="325" cy="22" r="2" fill="#0d9488"/>
    </g>

    {/* Side petite flowers */}
    <circle cx="290" cy="38" r="5" fill="#faf8f0" stroke="#0d9488" strokeWidth="0.8"/>
    <circle cx="290" cy="38" r="2.5" fill="#14b8a6"/>
    <circle cx="360" cy="38" r="5" fill="#faf8f0" stroke="#0d9488" strokeWidth="0.8"/>
    <circle cx="360" cy="38" r="2.5" fill="#14b8a6"/>

    {/* Connecting garland */}
    <path d="M265,38 Q280,30 290,35" fill="none" stroke="#c9a227" strokeWidth="0.8"/>
    <path d="M360,35 Q370,30 385,38" fill="none" stroke="#c9a227" strokeWidth="0.8"/>

    {/* Right flourish (mirror) */}
    <path d="M620,60 Q550,45 480,38 Q420,32 370,32 Q340,32 325,35"
      fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M620,60 Q550,50 480,44 Q420,38 370,38 Q340,38 325,40"
      fill="none" stroke="#c9a227" strokeWidth="1" strokeLinecap="round"/>

    {/* Right main flower */}
    <g>
      <circle cx="600" cy="55" r="14" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
      <ellipse cx="600" cy="43" rx="5" ry="8" fill="#0d9488"/>
      <ellipse cx="612" cy="55" rx="8" ry="5" fill="#0d9488"/>
      <ellipse cx="600" cy="67" rx="5" ry="8" fill="#0d9488"/>
      <ellipse cx="588" cy="55" rx="8" ry="5" fill="#0d9488"/>
      <circle cx="600" cy="55" r="6" fill="#c9a227"/>
      <circle cx="600" cy="55" r="3" fill="#faf8f0"/>
    </g>

    {/* Right medium flowers */}
    <g>
      <circle cx="540" cy="45" r="10" fill="#faf8f0" stroke="#0d9488" strokeWidth="1.5"/>
      <ellipse cx="540" cy="37" rx="3.5" ry="6" fill="#14b8a6"/>
      <ellipse cx="548" cy="45" rx="6" ry="3.5" fill="#14b8a6"/>
      <ellipse cx="540" cy="53" rx="3.5" ry="6" fill="#14b8a6"/>
      <ellipse cx="532" cy="45" rx="6" ry="3.5" fill="#14b8a6"/>
      <circle cx="540" cy="45" r="4" fill="#0d9488"/>
      <circle cx="540" cy="45" r="2" fill="#c9a227"/>
    </g>

    <g>
      <circle cx="480" cy="38" r="8" fill="#faf8f0" stroke="#0d9488" strokeWidth="1"/>
      <circle cx="480" cy="38" r="4" fill="#14b8a6"/>
      <circle cx="480" cy="38" r="2" fill="#c9a227"/>
    </g>

    <g>
      <circle cx="420" cy="34" r="6" fill="#faf8f0" stroke="#0d9488" strokeWidth="0.8"/>
      <circle cx="420" cy="34" r="3" fill="#0d9488"/>
      <circle cx="420" cy="34" r="1.5" fill="#c9a227"/>
    </g>

    {/* Right leaves */}
    <path d="M575,52 Q562,42 550,40" fill="none" stroke="#0d9488" strokeWidth="1"/>
    <path d="M570,48 Q565,40 558,38 Q564,43 568,50Z" fill="#0d9488" fillOpacity="0.5"/>
    <path d="M520,42 Q505,35 495,34" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
    <path d="M515,40 Q508,33 500,32 Q507,36 514,42Z" fill="#14b8a6" fillOpacity="0.4"/>
  </svg>
);

// ─── Watermark Seal (using img for html2canvas compatibility) ───
const WatermarkSeal = () => (
  <img
    src={WATERMARK_SVG}
    alt=""
    width="350"
    height="350"
    crossOrigin="anonymous"
    style={{
      position: 'absolute',
      left: '222px',
      top: '387px',
      pointerEvents: 'none',
      opacity: 0.04,
    }}
  />
);

// ─── Elegant Divider ───
const ElegantDivider = ({ width = 500 }: { width?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} 24`} width={width} height="24" style={{ display: 'block' }}>
    {/* Main line */}
    <line x1="0" y1="12" x2={width} y2="12" stroke="#0d9488" strokeWidth="1" strokeOpacity="0.5"/>
    <line x1={width * 0.1} y1="12" x2={width * 0.9} y2="12" stroke="#c9a227" strokeWidth="0.5"/>

    {/* Center diamond ornament */}
    <g>
      <path d={`M${width/2},4 L${width/2 + 8},12 L${width/2},20 L${width/2 - 8},12 Z`} fill="#c9a227"/>
      <path d={`M${width/2},6 L${width/2 + 6},12 L${width/2},18 L${width/2 - 6},12 Z`} fill="#0d9488"/>
      <circle cx={width/2} cy="12" r="3" fill="#faf8f0"/>
      <circle cx={width/2} cy="12" r="1.5" fill="#c9a227"/>
    </g>

    {/* Side ornaments */}
    <circle cx={width * 0.25} cy="12" r="3" fill="#0d9488"/>
    <circle cx={width * 0.25} cy="12" r="1.5" fill="#c9a227"/>
    <circle cx={width * 0.75} cy="12" r="3" fill="#0d9488"/>
    <circle cx={width * 0.75} cy="12" r="1.5" fill="#c9a227"/>

    <circle cx={width * 0.15} cy="12" r="2" fill="#c9a227"/>
    <circle cx={width * 0.85} cy="12" r="2" fill="#c9a227"/>
  </svg>
);

// ─── Bottom Seal (no transforms) ───
const OfficialSeal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70 70" width="60" height="60" style={{ display: 'block' }}>
    {/* Outer dots arranged in a circle - no transforms */}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => {
      const rad = (angle * Math.PI) / 180;
      const cx = 35 + Math.cos(rad) * 26;
      const cy = 35 + Math.sin(rad) * 26;
      return (
        <circle key={i} cx={cx} cy={cy} r="5" fill="#c9a227" fillOpacity="0.7"/>
      );
    })}
    <circle cx="35" cy="35" r="20" fill="#faf8f0" stroke="#c9a227" strokeWidth="2"/>
    <circle cx="35" cy="35" r="15" fill="none" stroke="#0d9488" strokeWidth="1"/>
    <circle cx="35" cy="35" r="10" fill="#0d9488"/>
    <circle cx="35" cy="35" r="5" fill="#c9a227"/>
    <circle cx="35" cy="35" r="2" fill="#faf8f0"/>
  </svg>
);

// ─── Main Certificate Component ───────────────────────────────────────────────

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(
  ({ staffName, staffPhoto, date }, ref) => {
    return (
      <div
        ref={ref}
        id="certificate"
        style={{
          width: '794px',
          minHeight: '1123px',
          height: '1123px',
          position: 'relative',
          background: 'linear-gradient(180deg, #fdfcf8 0%, #faf8f0 30%, #fdfcf8 70%, #faf8f0 100%)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {/* Subtle background pattern */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'radial-gradient(ellipse at 50% 45%, rgba(13,148,136,0.04) 0%, transparent 50%)',
          pointerEvents: 'none',
        }}/>

        {/* Border Decorations */}
        <GuillocheBorder />

        {/* Corner Ornaments */}
        <ArtDecoCorner position="tl" />
        <ArtDecoCorner position="tr" />
        <ArtDecoCorner position="bl" />
        <ArtDecoCorner position="br" />

        {/* Side Decorations */}
        <SimpleSideDecoration side="left" />
        <SimpleSideDecoration side="right" />

        {/* Watermark */}
        <WatermarkSeal />

        {/* ════ MAIN CONTENT ════ */}
        <div style={{
          position: 'relative', zIndex: 2, padding: '38px 65px 28px 65px',
          height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column'
        }}>

          {/* ── HEADER ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '6px' }}>
            <div style={{ flexShrink: 0, width: '85px', height: '85px' }}>
              <img
                src="/logo.png"
                alt="Board Logo"
                style={{ width: '85px', height: '85px', objectFit: 'contain' }}
                crossOrigin="anonymous"
                onError={(e) => { (e.target as HTMLImageElement).src = LOGO_FALLBACK; }}
              />
            </div>
            <div style={{ flex: 1, textAlign: 'center', paddingRight: '48px' }}>
              <div style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#0d9488',
                margin: '0 0 2px 0',
                lineHeight: 1.35,
                letterSpacing: '1.5px',
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
              }}>
                Maharashtra State Board Of Secondary
              </div>
              <div style={{
                fontSize: '17px',
                fontWeight: 800,
                color: '#0d9488',
                margin: '0 0 4px 0',
                lineHeight: 1.35,
                letterSpacing: '1.5px',
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
              }}>
                and Higher Secondary Education
              </div>
              <div style={{
                fontSize: '13.5px',
                fontWeight: 600,
                color: '#115e59',
                margin: 0,
                lineHeight: 1.5,
                letterSpacing: '0.5px',
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
              }}>
                Mumbai Divisional Board, Vashi, Navi Mumbai‑400 703.
              </div>
            </div>
          </div>

          {/* ── TOP DIVIDER ── */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '6px 0' }}>
            <ElegantDivider width={580} />
          </div>

          {/* ── CERTIFICATE TITLE SECTION ── */}
          <div style={{ textAlign: 'center', position: 'relative', margin: '0 0 4px 0' }}>
            <RoyalFloralBanner />

            <div style={{ marginTop: '4px', marginBottom: '8px' }}>
              <div style={{
                fontSize: '11px',
                letterSpacing: '8px',
                color: '#c9a227',
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
                marginBottom: '5px',
              }}>
                ✦ &nbsp; This is to certify that &nbsp; ✦
              </div>
              <h2 style={{
                fontSize: '40px',
                fontWeight: 900,
                color: '#0d9488',
                letterSpacing: '7px',
                margin: '0',
                textTransform: 'uppercase',
                fontFamily: "'Cinzel Decorative', serif",
                lineHeight: 1.15,
              }}>
                Certificate
              </h2>
              <h2 style={{
                fontSize: '21px',
                fontWeight: 800,
                color: '#086056',
                letterSpacing: '14px',
                margin: '3px 0 0 0',
                textTransform: 'uppercase',
                fontFamily: "'Cinzel', serif",
              }}>
                of Appreciation
              </h2>
            </div>

            {/* Ornamental center piece */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
              <div style={{ width: '90px', height: '2px', background: 'linear-gradient(90deg, transparent, #c9a227)' }}/>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" style={{ display: 'block' }}>
                <path d="M16,2 L19,13 L16,11 L13,13 Z" fill="#c9a227"/>
                <path d="M16,30 L19,19 L16,21 L13,19 Z" fill="#c9a227"/>
                <path d="M2,16 L13,13 L11,16 L13,19 Z" fill="#c9a227"/>
                <path d="M30,16 L19,13 L21,16 L19,19 Z" fill="#c9a227"/>
                <circle cx="16" cy="16" r="6" fill="#0d9488"/>
                <circle cx="16" cy="16" r="3" fill="#faf8f0"/>
                <circle cx="16" cy="16" r="1.5" fill="#c9a227"/>
              </svg>
              <div style={{ width: '90px', height: '2px', background: 'linear-gradient(90deg, #c9a227, transparent)' }}/>
            </div>
          </div>

          {/* ── PHOTO FRAME ── */}
          <div style={{ textAlign: 'center', margin: '12px 0 8px 0' }}>
            <div style={{ display: 'inline-block', position: 'relative', padding: '14px' }}>
              {/* Decorative frame */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                border: '3px solid #c9a227',
                borderRadius: '6px',
              }}/>
              <div style={{
                position: 'absolute', top: '5px', left: '5px', right: '5px', bottom: '5px',
                border: '1.5px solid #0d9488',
                borderRadius: '4px',
              }}/>

              {/* Corner jewels */}
              {[
                { top: '-6px', left: '-6px' },
                { top: '-6px', right: '-6px' },
                { bottom: '-6px', left: '-6px' },
                { bottom: '-6px', right: '-6px' }
              ].map((pos, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  ...pos,
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="6" fill="#c9a227"/>
                    <circle cx="7" cy="7" r="4" fill="#faf8f0"/>
                    <circle cx="7" cy="7" r="2" fill="#0d9488"/>
                  </svg>
                </div>
              ))}

              <div style={{
                width: '120px',
                height: '150px',
                border: '2px solid #0d9488',
                borderRadius: '3px',
                overflow: 'hidden',
                background: '#faf8f0',
              }}>
                <img
                  src={staffPhoto}
                  alt="Staff Photo"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>

          {/* ── STAFF NAME ── */}
          <div style={{ textAlign: 'center', margin: '8px 0' }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '7px',
              color: '#c9a227',
              fontFamily: "'Cinzel', serif",
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              Presented To
            </div>
            <div style={{ display: 'inline-block', position: 'relative', padding: '4px 45px 12px 45px' }}>
              {/* Decorative leaves */}
              <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '6px', top: '50%', marginTop: '-8px', width: '30px', height: '18px' }} viewBox="0 0 40 25">
                <path d="M38,12 Q25,3 8,8 Q22,9 36,17Z" fill="#0d9488"/>
                <path d="M8,8 Q18,11 36,17" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '6px', top: '50%', marginTop: '-8px', width: '30px', height: '18px' }} viewBox="0 0 40 25">
                <path d="M2,12 Q15,3 32,8 Q18,9 4,17Z" fill="#0d9488"/>
                <path d="M32,8 Q22,11 4,17" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
              </svg>

              <p style={{
                fontSize: '29px',
                fontWeight: 800,
                color: '#0a4f47',
                margin: 0,
                letterSpacing: '2px',
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
              }}>
                {staffName}
              </p>
              <div style={{
                width: '100%', height: '2.5px',
                background: 'linear-gradient(90deg, transparent 0%, #c9a227 15%, #c9a227 85%, transparent 100%)',
                marginTop: '6px',
              }}/>
            </div>
          </div>

          {/* ── BODY TEXT with shiny teal highlight ── */}
          <div style={{
            margin: '6px 35px 0 35px',
            padding: '20px 28px',
            background: 'linear-gradient(135deg, #e6f7f5 0%, #f0fdf9 25%, #e6f7f5 50%, #f0fdf9 75%, #e6f7f5 100%)',
            borderLeft: '5px solid #0d9488',
            borderRight: '5px solid #0d9488',
            borderTop: '2px solid #14b8a6',
            borderBottom: '2px solid #14b8a6',
            borderRadius: '4px',
            position: 'relative',
            boxShadow: 'inset 0 0 20px rgba(13,148,136,0.08)',
          }}>
            {/* Teal accent corners */}
            <div style={{
              position: 'absolute', top: '-2px', left: '-2px',
              width: '20px', height: '20px',
              borderTop: '3px solid #0d9488',
              borderLeft: '3px solid #0d9488',
              borderRadius: '4px 0 0 0',
            }}/>
            <div style={{
              position: 'absolute', top: '-2px', right: '-2px',
              width: '20px', height: '20px',
              borderTop: '3px solid #0d9488',
              borderRight: '3px solid #0d9488',
              borderRadius: '0 4px 0 0',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-2px', left: '-2px',
              width: '20px', height: '20px',
              borderBottom: '3px solid #0d9488',
              borderLeft: '3px solid #0d9488',
              borderRadius: '0 0 0 4px',
            }}/>
            <div style={{
              position: 'absolute', bottom: '-2px', right: '-2px',
              width: '20px', height: '20px',
              borderBottom: '3px solid #0d9488',
              borderRight: '3px solid #0d9488',
              borderRadius: '0 0 4px 0',
            }}/>

            {/* Quote marks in teal */}
            <div style={{
              position: 'absolute', top: '-4px', left: '24px',
              fontSize: '48px', lineHeight: 1, color: '#0d9488',
              fontFamily: 'Georgia, serif', fontWeight: 'bold',
            }}>"</div>
            <div style={{
              position: 'absolute', bottom: '-16px', right: '24px',
              fontSize: '48px', lineHeight: 1, color: '#0d9488',
              fontFamily: 'Georgia, serif', fontWeight: 'bold',
            }}>"</div>

            <p style={{
              fontSize: '15.5px',
              lineHeight: 2,
              color: '#0a4f47',
              margin: 0,
              textAlign: 'justify',
              textIndent: '44px',
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 700,
              letterSpacing: '0.3px',
            }}>
              This certificate is presented in recognition of your valuable contribution and dedicated efforts in the successful conduct of the Secondary School Certificate Examination, February‑March 2026, organized by the Maharashtra State Board of Secondary and Higher Secondary Education. Your diligence, discipline, and commitment are highly commendable.
            </p>
          </div>

          {/* ── BOTTOM DIVIDER ── */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: 'auto 0 10px 0', paddingTop: '18px' }}>
            <ElegantDivider width={480} />
          </div>

          {/* ── BOTTOM SECTION ── */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            paddingBottom: '14px',
            marginTop: '6px',
          }}>
            {/* Date */}
            <div style={{ textAlign: 'left' }}>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '5px',
                color: '#c9a227',
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}>
                Date
              </div>
              <div style={{
                fontSize: '15px',
                color: '#0a4f47',
                fontWeight: 700,
                fontFamily: 'serif',
                paddingBottom: '4px',
                borderBottom: '2px solid #0d9488',
                letterSpacing: '0.5px',
                minWidth: '115px',
              }}>
                {date}
              </div>
            </div>

            {/* Center seal */}
            <div style={{ textAlign: 'center' }}>
              <OfficialSeal />
            </div>

            {/* Signature block */}
            <div style={{ textAlign: 'center', minWidth: '215px' }}>
              <img
                src="/signature.png"
                alt="Signature"
                style={{ height: '46px', objectFit: 'contain', display: 'block', margin: '0 auto 4px auto' }}
                crossOrigin="anonymous"
                onError={(e) => { (e.target as HTMLImageElement).src = SIGNATURE_FALLBACK; }}
              />
              <div style={{ width: '215px', height: '2px', background: 'linear-gradient(90deg, transparent, #c9a227, transparent)', margin: '0 auto 5px auto' }}/>
              <div style={{
                fontSize: '10px',
                fontWeight: 700,
                letterSpacing: '5px',
                color: '#c9a227',
                fontFamily: "'Cinzel', serif",
                textTransform: 'uppercase',
                marginBottom: '3px',
              }}>
                Chief Conductor
              </div>
              <div style={{
                fontSize: '16px',
                color: '#0a4f47',
                fontWeight: 800,
                fontFamily: "'Playfair Display', serif",
                margin: '0 0 3px 0',
                letterSpacing: '0.3px',
              }}>
                Mr. Dinesh Dayaram Yadav
              </div>
              <div style={{
                fontSize: '10px',
                color: '#1a2e2b',
                fontFamily: 'serif',
                fontWeight: 700,
                margin: '0 0 2px 0',
                letterSpacing: '0.4px',
              }}>
                Centre No 6118
              </div>
              <div style={{
                fontSize: '11.5px',
                color: '#1a2e2b',
                fontFamily: 'serif',
                fontWeight: 700,
                margin: 0,
                letterSpacing: '0.2px',
              }}>
                St. Agrasen High School Kalwa East Thane 400605
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';
export default Certificate;
