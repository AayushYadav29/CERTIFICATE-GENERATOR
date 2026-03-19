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
  <path d="M30,88 Q60,100 90,88" fill="none" stroke="#0d9488" stroke-width="1.5"/>
  <path d="M40,25 Q60,15 80,25" fill="none" stroke="#0d9488" stroke-width="1"/>
</svg>`)}`;

const SIGNATURE_FALLBACK = `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 70">
  <path d="M15,50 Q35,15 55,40 Q65,52 85,22 Q95,8 108,35 Q118,54 138,28 Q150,14 168,38 Q178,52 200,32" fill="none" stroke="#0a4f47" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M80,50 Q100,42 115,50" fill="none" stroke="#0a4f47" stroke-width="1.2" stroke-linecap="round"/>
  <line x1="15" y1="58" x2="205" y2="58" stroke="#0d9488" stroke-width="0.5" opacity="0.4"/>
</svg>`)}`;

// ─── SVG Decorative Components ───────────────────────────────────────────────

const CornerOrnament = ({ flip = false, flipY = false }: { flip?: boolean; flipY?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 160 160"
    width="140"
    height="140"
    style={{
      position: 'absolute',
      ...(flip && flipY ? { bottom: 0, right: 0, transform: 'scale(-1,-1)' } :
        flip ? { top: 0, right: 0, transform: 'scaleX(-1)' } :
        flipY ? { bottom: 0, left: 0, transform: 'scaleY(-1)' } :
        { top: 0, left: 0 }),
      opacity: 0.82,
      pointerEvents: 'none',
    }}
  >
    {/* Main corner curves */}
    <path d="M8,100 Q8,8 100,8" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M14,100 Q14,14 100,14" fill="none" stroke="#14b8a6" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="4,3"/>
    <path d="M20,100 Q20,20 100,20" fill="none" stroke="#5eead4" strokeWidth="0.6" strokeLinecap="round"/>

    {/* Corner flower cluster */}
    <g transform="translate(28,28)">
      {/* Large flower */}
      <g opacity="0.9">
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#0d9488" opacity="0.7"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#14b8a6" opacity="0.3" transform="rotate(45,0,0)"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#0d9488" opacity="0.5" transform="rotate(90,0,0)"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#14b8a6" opacity="0.4" transform="rotate(135,0,0)"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#0d9488" opacity="0.6" transform="rotate(180,0,0)"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#14b8a6" opacity="0.3" transform="rotate(225,0,0)"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#0d9488" opacity="0.5" transform="rotate(270,0,0)"/>
        <ellipse cx="0" cy="-13" rx="4.5" ry="8" fill="#14b8a6" opacity="0.4" transform="rotate(315,0,0)"/>
        <circle r="6" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.2"/>
        <circle r="3" fill="#0d9488"/>
      </g>
    </g>

    {/* Small flower 1 */}
    <g transform="translate(55,22)">
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(0,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(60,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(120,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(180,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(240,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(300,0,0)"/>
      <circle r="4" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1"/>
      <circle r="2" fill="#0d9488" opacity="0.8"/>
    </g>

    {/* Small flower 2 */}
    <g transform="translate(22,55)">
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(30,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(90,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(150,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(210,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(270,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(330,0,0)"/>
      <circle r="4" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1"/>
      <circle r="2" fill="#0d9488" opacity="0.8"/>
    </g>

    {/* Leaf stem from big flower to outer lines */}
    <path d="M37,37 Q60,55 80,40" fill="none" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M42,48 Q50,38 62,33 Q52,40 44,50Z" fill="#0d9488" opacity="0.22"/>
    <path d="M55,45 Q63,35 75,32 Q64,38 56,47Z" fill="#14b8a6" opacity="0.18"/>

    <path d="M37,37 Q55,60 40,80" fill="none" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M42,52 Q33,60 32,72 Q36,62 45,55Z" fill="#0d9488" opacity="0.22"/>
    <path d="M40,65 Q31,72 30,82 Q34,73 42,67Z" fill="#14b8a6" opacity="0.18"/>

    {/* Mini dot accents */}
    <circle cx="72" cy="26" r="2.5" fill="#5eead4" opacity="0.5"/>
    <circle cx="26" cy="72" r="2.5" fill="#5eead4" opacity="0.5"/>
    <circle cx="85" cy="18" r="1.8" fill="#0d9488" opacity="0.4"/>
    <circle cx="18" cy="85" r="1.8" fill="#0d9488" opacity="0.4"/>
  </svg>
);

const SideVine = ({ side }: { side: 'left' | 'right' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 700"
    width="32"
    height="860"
    style={{
      position: 'absolute',
      [side]: '22px',
      top: '130px',
      opacity: 0.28,
      pointerEvents: 'none',
      ...(side === 'right' ? { transform: 'scaleX(-1)' } : {}),
    }}
  >
    {/* Main vine stem */}
    <path
      d="M20,0 Q8,70 20,140 Q32,210 20,280 Q8,350 20,420 Q32,490 20,560 Q8,630 20,700"
      fill="none" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"
    />
    {/* Leaves */}
    {[60, 120, 190, 250, 320, 380, 450, 510, 580, 640].map((y, i) => {
      const left = i % 2 === 0;
      const cx = left ? 8 : 32;
      const rot = left ? -35 : 35;
      return (
        <g key={y} transform={`translate(${cx},${y}) rotate(${rot})`}>
          <ellipse rx="7" ry="16" fill="#0d9488" opacity="0.6"/>
          <line x1="0" y1="-16" x2="0" y2="16" stroke="#14b8a6" strokeWidth="0.7"/>
        </g>
      );
    })}
    {/* Flowers */}
    {[100, 250, 400, 550].map((y, i) => (
      <g key={`f${y}`} transform={`translate(${i % 2 === 0 ? 10 : 30},${y})`}>
        <circle r="6" fill="#14b8a6" opacity="0.5"/>
        <circle r="3" fill="#0d9488" opacity="0.7"/>
        <circle r="1.5" fill="#f0fdfa" opacity="0.8"/>
      </g>
    ))}
  </svg>
);

const FloralBanner = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 160" width="100%" height="auto" style={{ display: 'block', marginBottom: '-8px' }}>
    {/* ── Left branch ── */}
    <path d="M15,130 Q80,105 150,80 Q210,60 270,52 Q310,47 345,50"
      fill="none" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round"/>
    {/* Left large leaves */}
    <path d="M60,115 Q80,88 105,78 Q82,95 65,118Z" fill="#0d9488" opacity="0.35"/>
    <path d="M105,97 Q125,72 148,62 Q126,77 108,100Z" fill="#14b8a6" opacity="0.3"/>
    <path d="M150,82 Q168,60 190,52 Q168,67 153,85Z" fill="#0d9488" opacity="0.3"/>
    <path d="M198,68 Q214,50 232,44 Q214,57 200,71Z" fill="#14b8a6" opacity="0.25"/>
    <path d="M244,58 Q258,43 272,38 Q258,50 246,61Z" fill="#0d9488" opacity="0.22"/>
    <path d="M290,52 Q300,40 312,36 Q300,48 291,55Z" fill="#14b8a6" opacity="0.2"/>

    {/* Left under-branch leaves */}
    <path d="M70,118 Q58,100 48,92 Q60,102 74,120Z" fill="#14b8a6" opacity="0.22"/>
    <path d="M120,100 Q108,85 100,78 Q110,87 124,102Z" fill="#0d9488" opacity="0.18"/>
    <path d="M170,84 Q160,70 152,64 Q162,72 174,87Z" fill="#14b8a6" opacity="0.18"/>

    {/* Left large flower */}
    <g transform="translate(38,122)">
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.55"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(45,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.5" transform="rotate(90,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(135,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.5" transform="rotate(180,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(225,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.5" transform="rotate(270,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(315,0,0)"/>
      <circle r="7" fill="white" stroke="#0d9488" strokeWidth="1.4"/>
      <circle r="3.5" fill="#0d9488"/>
    </g>
    {/* Left mid flowers */}
    <g transform="translate(120,82)">
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#0d9488" opacity="0.55" transform="rotate(0,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#14b8a6" opacity="0.4" transform="rotate(60,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#0d9488" opacity="0.5" transform="rotate(120,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#14b8a6" opacity="0.4" transform="rotate(180,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#0d9488" opacity="0.5" transform="rotate(240,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#14b8a6" opacity="0.4" transform="rotate(300,0,0)"/>
      <circle r="5" fill="white" stroke="#0d9488" strokeWidth="1"/>
      <circle r="2.5" fill="#0d9488"/>
    </g>
    <g transform="translate(195,62)">
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(0,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(72,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(144,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(216,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(288,0,0)"/>
      <circle r="4.5" fill="white" stroke="#0d9488" strokeWidth="0.8"/>
      <circle r="2" fill="#14b8a6"/>
    </g>
    <g transform="translate(270,50)">
      <circle cx="0" cy="-7" r="3" fill="#0d9488" opacity="0.4"/>
      <circle cx="7" cy="0" r="3" fill="#14b8a6" opacity="0.4"/>
      <circle cx="0" cy="7" r="3" fill="#0d9488" opacity="0.4"/>
      <circle cx="-7" cy="0" r="3" fill="#14b8a6" opacity="0.4"/>
      <circle r="3.5" fill="white" stroke="#0d9488" strokeWidth="0.8"/>
      <circle r="1.5" fill="#0d9488"/>
    </g>

    {/* Left small tree */}
    <g transform="translate(10,140)">
      <line x1="0" y1="0" x2="0" y2="-32" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/>
      <line x1="0" y1="-12" x2="-12" y2="-22" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="0" y1="-20" x2="10" y2="-28" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cy="-40" rx="14" ry="20" fill="#0d9488" opacity="0.35"/>
      <ellipse cx="-12" cy="-24" rx="8" ry="12" fill="#14b8a6" opacity="0.3"/>
      <ellipse cx="10" cy="-30" rx="8" ry="11" fill="#0d9488" opacity="0.3"/>
    </g>

    {/* ── Right branch (mirror) ── */}
    <path d="M705,130 Q640,105 570,80 Q510,60 450,52 Q410,47 375,50"
      fill="none" stroke="#0d9488" strokeWidth="2.2" strokeLinecap="round"/>
    <path d="M660,115 Q640,88 615,78 Q638,95 655,118Z" fill="#0d9488" opacity="0.35"/>
    <path d="M615,97 Q595,72 572,62 Q594,77 612,100Z" fill="#14b8a6" opacity="0.3"/>
    <path d="M570,82 Q552,60 530,52 Q552,67 567,85Z" fill="#0d9488" opacity="0.3"/>
    <path d="M522,68 Q506,50 488,44 Q506,57 520,71Z" fill="#14b8a6" opacity="0.25"/>
    <path d="M476,58 Q462,43 448,38 Q462,50 474,61Z" fill="#0d9488" opacity="0.22"/>
    <path d="M430,52 Q420,40 408,36 Q420,48 429,55Z" fill="#14b8a6" opacity="0.2"/>
    <path d="M650,118 Q662,100 672,92 Q660,102 646,120Z" fill="#14b8a6" opacity="0.22"/>
    <path d="M600,100 Q612,85 620,78 Q610,87 596,102Z" fill="#0d9488" opacity="0.18"/>
    <path d="M550,84 Q560,70 568,64 Q558,72 546,87Z" fill="#14b8a6" opacity="0.18"/>

    {/* Right large flower */}
    <g transform="translate(682,122)">
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.55"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(45,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.5" transform="rotate(90,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(135,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.5" transform="rotate(180,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(225,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#0d9488" opacity="0.5" transform="rotate(270,0,0)"/>
      <ellipse cx="0" cy="-12" rx="5" ry="9" fill="#14b8a6" opacity="0.4" transform="rotate(315,0,0)"/>
      <circle r="7" fill="white" stroke="#0d9488" strokeWidth="1.4"/>
      <circle r="3.5" fill="#0d9488"/>
    </g>
    <g transform="translate(600,82)">
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#0d9488" opacity="0.55" transform="rotate(0,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#14b8a6" opacity="0.4" transform="rotate(60,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#0d9488" opacity="0.5" transform="rotate(120,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#14b8a6" opacity="0.4" transform="rotate(180,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#0d9488" opacity="0.5" transform="rotate(240,0,0)"/>
      <ellipse cx="0" cy="-8" rx="3.5" ry="6.5" fill="#14b8a6" opacity="0.4" transform="rotate(300,0,0)"/>
      <circle r="5" fill="white" stroke="#0d9488" strokeWidth="1"/>
      <circle r="2.5" fill="#0d9488"/>
    </g>
    <g transform="translate(525,62)">
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(0,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(72,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(144,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#0d9488" opacity="0.5" transform="rotate(216,0,0)"/>
      <ellipse cx="0" cy="-7" rx="3" ry="5.5" fill="#14b8a6" opacity="0.6" transform="rotate(288,0,0)"/>
      <circle r="4.5" fill="white" stroke="#0d9488" strokeWidth="0.8"/>
      <circle r="2" fill="#14b8a6"/>
    </g>
    <g transform="translate(450,50)">
      <circle cx="0" cy="-7" r="3" fill="#0d9488" opacity="0.4"/>
      <circle cx="7" cy="0" r="3" fill="#14b8a6" opacity="0.4"/>
      <circle cx="0" cy="7" r="3" fill="#0d9488" opacity="0.4"/>
      <circle cx="-7" cy="0" r="3" fill="#14b8a6" opacity="0.4"/>
      <circle r="3.5" fill="white" stroke="#0d9488" strokeWidth="0.8"/>
      <circle r="1.5" fill="#0d9488"/>
    </g>

    {/* Right small tree */}
    <g transform="translate(710,140)">
      <line x1="0" y1="0" x2="0" y2="-32" stroke="#0d9488" strokeWidth="2" strokeLinecap="round"/>
      <line x1="0" y1="-12" x2="12" y2="-22" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round"/>
      <line x1="0" y1="-20" x2="-10" y2="-28" stroke="#0d9488" strokeWidth="1.2" strokeLinecap="round"/>
      <ellipse cy="-40" rx="14" ry="20" fill="#0d9488" opacity="0.35"/>
      <ellipse cx="12" cy="-24" rx="8" ry="12" fill="#14b8a6" opacity="0.3"/>
      <ellipse cx="-10" cy="-30" rx="8" ry="11" fill="#0d9488" opacity="0.3"/>
    </g>

    {/* ── Center crown-like motif ── */}
    <g transform="translate(360,30)">
      {/* Center large flower */}
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#0d9488" opacity="0.5"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#14b8a6" opacity="0.35" transform="rotate(45,0,0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#0d9488" opacity="0.45" transform="rotate(90,0,0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#14b8a6" opacity="0.35" transform="rotate(135,0,0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#0d9488" opacity="0.5" transform="rotate(180,0,0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#14b8a6" opacity="0.35" transform="rotate(225,0,0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#0d9488" opacity="0.45" transform="rotate(270,0,0)"/>
      <ellipse cx="0" cy="-16" rx="6" ry="11" fill="#14b8a6" opacity="0.35" transform="rotate(315,0,0)"/>
      <circle r="9" fill="white" stroke="#0d9488" strokeWidth="1.5"/>
      <circle r="4.5" fill="#0d9488"/>
      <circle r="2" fill="white"/>
      {/* Small side flowers */}
      <g transform="translate(-30,18)">
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#14b8a6" opacity="0.5" transform="rotate(0,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#0d9488" opacity="0.4" transform="rotate(72,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#14b8a6" opacity="0.5" transform="rotate(144,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#0d9488" opacity="0.4" transform="rotate(216,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#14b8a6" opacity="0.5" transform="rotate(288,0,0)"/>
        <circle r="4" fill="white" stroke="#0d9488" strokeWidth="0.8"/>
        <circle r="2" fill="#0d9488"/>
      </g>
      <g transform="translate(30,18)">
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#14b8a6" opacity="0.5" transform="rotate(0,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#0d9488" opacity="0.4" transform="rotate(72,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#14b8a6" opacity="0.5" transform="rotate(144,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#0d9488" opacity="0.4" transform="rotate(216,0,0)"/>
        <ellipse cx="0" cy="-7" rx="3" ry="5" fill="#14b8a6" opacity="0.5" transform="rotate(288,0,0)"/>
        <circle r="4" fill="white" stroke="#0d9488" strokeWidth="0.8"/>
        <circle r="2" fill="#0d9488"/>
      </g>
      {/* Center leaf stems */}
      <path d="M-40,28 Q-25,20 0,18 Q25,20 40,28" fill="none" stroke="#0d9488" strokeWidth="1" strokeLinecap="round"/>
    </g>

    {/* ── Decorative dots row ── */}
    {[100, 140, 180, 220, 260, 300, 340, 380, 420, 460, 500, 540, 580, 620].map((x, i) => (
      <circle key={i} cx={x} cy={148} r={i % 3 === 0 ? 2.5 : 1.5} fill="#0d9488" opacity="0.3"/>
    ))}
  </svg>
);

const WatermarkMandala = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
    width="500"
    height="500"
    style={{
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      opacity: 0.028,
      pointerEvents: 'none',
    }}
  >
    {[0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340].map((a) => (
      <ellipse key={a} cx="250" cy="110" rx="22" ry="65" fill="#0d9488" transform={`rotate(${a},250,250)`}/>
    ))}
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a) => (
      <ellipse key={`b${a}`} cx="250" cy="160" rx="14" ry="40" fill="#0d9488" transform={`rotate(${a},250,250)`}/>
    ))}
    <circle cx="250" cy="250" r="200" fill="none" stroke="#0d9488" strokeWidth="1.5"/>
    <circle cx="250" cy="250" r="165" fill="none" stroke="#0d9488" strokeWidth="0.8"/>
    <circle cx="250" cy="250" r="130" fill="none" stroke="#0d9488" strokeWidth="1.2"/>
    <circle cx="250" cy="250" r="50" fill="#0d9488"/>
    <circle cx="250" cy="250" r="28" fill="none" stroke="white" strokeWidth="3"/>
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
          background: 'linear-gradient(160deg, #fafffd 0%, #f0fdfa 30%, #fafffd 60%, #f5fffe 100%)',
          overflow: 'hidden',
          boxSizing: 'border-box',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        {/* ── Gold + Teal Multi-layer Borders ── */}
        <div style={{ position:'absolute', top:'0px', left:'0px', right:'0px', bottom:'0px', border:'6px solid #0d9488', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'8px', left:'8px', right:'8px', bottom:'8px', border:'1.5px solid #14b8a6', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'13px', left:'13px', right:'13px', bottom:'13px', border:'0.5px solid #5eead4', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'16px', left:'16px', right:'16px', bottom:'16px', border:'2px solid #0d9488', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', top:'20px', left:'20px', right:'20px', bottom:'20px', border:'0.5px solid #99f6e4', pointerEvents:'none' }}/>

        {/* ── Corner Ornaments ── */}
        <CornerOrnament />
        <CornerOrnament flip />
        <CornerOrnament flipY />
        <CornerOrnament flip flipY />

        {/* ── Side Vine Decorations ── */}
        <SideVine side="left" />
        <SideVine side="right" />

        {/* ── Background Watermark ── */}
        <WatermarkMandala />

        {/* ── Subtle teal background radial glow ── */}
        <div style={{
          position:'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents:'none',
          background:'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(13,148,136,0.04) 0%, transparent 70%)'
        }}/>

        {/* ════ MAIN CONTENT ════ */}
        <div style={{
          position:'relative', zIndex:2, padding:'32px 56px 24px 56px',
          height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column'
        }}>

          {/* ── HEADER ── */}
          <div style={{ display:'flex', alignItems:'center', gap:'16px', marginBottom:'2px' }}>
            <div style={{ flexShrink:0, width:'90px', height:'90px' }}>
              <img
                src="/logo.png"
                alt="Board Logo"
                style={{ width:'90px', height:'90px', objectFit:'contain' }}
                crossOrigin="anonymous"
                onError={(e) => { (e.target as HTMLImageElement).src = LOGO_FALLBACK; }}
              />
            </div>
            <div style={{ flex:1, textAlign:'center', paddingRight:'90px' }}>
              <div style={{
                fontSize:'17px',
                fontWeight:'700',
                color:'#0d9488',
                margin:'0 0 3px 0',
                lineHeight:'1.4',
                letterSpacing:'1px',
                fontFamily:"'Cinzel', serif",
                textTransform:'uppercase',
              }}>
                M. S. Board Of Secondary And
              </div>
              <div style={{
                fontSize:'17px',
                fontWeight:'700',
                color:'#0d9488',
                margin:'0 0 4px 0',
                lineHeight:'1.4',
                letterSpacing:'1px',
                fontFamily:"'Cinzel', serif",
                textTransform:'uppercase',
              }}>
                Higher Secondary Education
              </div>
              <div style={{
                fontSize:'13.5px',
                fontWeight:'500',
                color:'#115e59',
                margin:0,
                lineHeight:'1.5',
                letterSpacing:'0.5px',
                fontFamily:"'Cormorant Garamond', serif",
                fontStyle:'italic',
              }}>
                Mumbai Divisional Board, Vashi, Navi Mumbai‑400 703.
              </div>
            </div>
          </div>

          {/* ── TOP DIVIDER ── */}
          <div style={{ position:'relative', margin:'8px 0 4px 0', height:'12px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ position:'absolute', left:0, right:0, height:'1.5px', background:'linear-gradient(90deg, transparent 0%, #0d9488 15%, #14b8a6 50%, #0d9488 85%, transparent 100%)' }}/>
            <div style={{ position:'relative', zIndex:1, display:'flex', gap:'6px', alignItems:'center' }}>
              {[-3,-2,-1,0,1,2,3].map(i => (
                <div key={i} style={{ width: i === 0 ? '7px' : Math.abs(i) === 1 ? '5px' : '4px', height: i === 0 ? '7px' : Math.abs(i) === 1 ? '5px' : '4px', borderRadius:'50%', background:'#0d9488', opacity: 1 - Math.abs(i)*0.12 }}/>
              ))}
            </div>
          </div>

          {/* ── CERTIFICATE OF APPRECIATION SECTION ── */}
          <div style={{ textAlign:'center', position:'relative', margin:'4px 0 8px 0' }}>
            {/* Floral banner */}
            <div style={{ opacity:0.75 }}>
              <FloralBanner />
            </div>

            {/* Main title */}
            <div style={{ marginTop: '-2px', marginBottom:'4px' }}>
              <div style={{
                fontSize:'11px',
                letterSpacing:'8px',
                color:'#14b8a6',
                fontFamily:"'Cinzel', serif",
                textTransform:'uppercase',
                marginBottom:'3px',
                opacity:0.85,
              }}>
                ✦ &nbsp; This is to certify that &nbsp; ✦
              </div>
              <h2 style={{
                fontSize:'33px',
                fontWeight:'900',
                color:'#0d9488',
                letterSpacing:'4px',
                margin:'0',
                textTransform:'uppercase',
                fontFamily:"'Cinzel Decorative', serif",
                textShadow:'none',
                lineHeight:'1.15',
              }}>
                Certificate
              </h2>
              <h2 style={{
                fontSize:'22px',
                fontWeight:'700',
                color:'#086056',
                letterSpacing:'9px',
                margin:'0 0 2px 0',
                textTransform:'uppercase',
                fontFamily:"'Cinzel', serif",
              }}>
                of Appreciation
              </h2>
            </div>

            {/* Ornamental rule */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' }}>
              <div style={{ width:'100px', height:'1px', background:'linear-gradient(90deg,transparent,#0d9488)' }}/>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" style={{ display: 'block' }}>
                <path d="M14,2 Q18,10 18,14 Q18,18 14,26 Q10,18 10,14 Q10,10 14,2Z" fill="#0d9488" opacity="0.4"/>
                <path d="M2,14 Q10,10 14,10 Q18,10 26,14 Q18,18 14,18 Q10,18 2,14Z" fill="#0d9488" opacity="0.35"/>
                <circle cx="14" cy="14" r="4" fill="#0d9488" opacity="0.7"/>
                <circle cx="14" cy="14" r="2" fill="#f0fdfa"/>
              </svg>
              <div style={{ width:'100px', height:'1px', background:'linear-gradient(90deg,#0d9488,transparent)' }}/>
            </div>
          </div>

          {/* ── PHOTO + NAME BLOCK ── */}
          <div style={{ textAlign:'center', margin:'6px 0 4px 0' }}>
            {/* Photo frame with ornamental border */}
            <div style={{ display:'inline-block', position:'relative' }}>
              {/* Outer decorative ring */}
              <div style={{
                position:'absolute', top:'-8px', left:'-8px', right:'-8px', bottom:'-8px',
                border:'2px solid #0d9488',
                borderRadius:'8px',
                opacity:0.5,
              }}/>
              <div style={{
                position:'absolute', top:'-4px', left:'-4px', right:'-4px', bottom:'-4px',
                border:'1px solid #14b8a6',
                borderRadius:'6px',
                opacity:0.6,
              }}/>
              {/* Corner pins */}
              {[
                { top: '-10px', left: '-10px' },
                { top: '-10px', right: '-10px' },
                { bottom: '-10px', left: '-10px' },
                { bottom: '-10px', right: '-10px' }
              ].map((pos,i) => (
                <div key={i} style={{
                  position:'absolute', width:'10px', height:'10px',
                  borderRadius:'50%', background:'#0d9488',
                  boxShadow:'0 0 0 2px #f0fdfa, 0 0 0 3.5px #0d9488',
                  ...pos,
                }}/>
              ))}
              <div style={{
                width:'130px',
                height:'160px',
                border:'3px solid #0d9488',
                borderRadius:'4px',
                overflow:'hidden',
                background:'#f0fdfa',
                boxShadow:'0 6px 24px rgba(13,148,136,0.25), inset 0 0 0 1px rgba(20,184,166,0.3)',
              }}>
                <img
                  src={staffPhoto}
                  alt="Staff Photo"
                  style={{ width:'100%', height:'100%', objectFit:'cover' }}
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>

          {/* ── STAFF NAME ── */}
          <div style={{ textAlign:'center', margin:'12px 0 6px 0' }}>
            {/* Presented To label */}
            <div style={{
              fontSize:'11px',
              letterSpacing:'5px',
              color:'#14b8a6',
              fontFamily:"'Cinzel', serif",
              textTransform:'uppercase',
              marginBottom:'4px',
              opacity:0.9,
            }}>
              Presented To
            </div>
            <div style={{ display:'inline-block', position:'relative', padding:'2px 36px 8px 36px' }}>
              {/* left leaf */}
              <svg xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', left:'2px', top:'50%', transform:'translateY(-60%)', width:'24px', height:'24px', opacity:0.5 }} viewBox="0 0 30 30">
                <path d="M28,15 Q18,5 5,10 Q18,10 26,18Z" fill="#0d9488"/>
                <path d="M5,10 Q15,14 26,18" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
              </svg>
              {/* right leaf */}
              <svg xmlns="http://www.w3.org/2000/svg" style={{ position:'absolute', right:'2px', top:'50%', transform:'translateY(-60%) scaleX(-1)', width:'24px', height:'24px', opacity:0.5 }} viewBox="0 0 30 30">
                <path d="M28,15 Q18,5 5,10 Q18,10 26,18Z" fill="#0d9488"/>
                <path d="M5,10 Q15,14 26,18" fill="none" stroke="#14b8a6" strokeWidth="0.8"/>
              </svg>
              <p style={{
                fontSize:'28px',
                fontWeight:'700',
                color:'#0a4f47',
                margin:0,
                letterSpacing:'2px',
                fontFamily:"'Playfair Display', serif",
                fontStyle:'italic',
                textShadow:'0 2px 8px rgba(13,148,136,0.15)',
              }}>
                {staffName}
              </p>
              <div style={{
                width:'100%', height:'1.5px',
                background:'linear-gradient(90deg, transparent, #0d9488 20%, #14b8a6 50%, #0d9488 80%, transparent)',
                marginTop:'4px',
              }}/>
            </div>
          </div>

          {/* ── BODY TEXT ── */}
          <div style={{
            margin:'8px 28px 0 28px',
            padding:'14px 22px',
            background:'linear-gradient(135deg, rgba(13,148,136,0.04) 0%, rgba(240,253,250,0.8) 50%, rgba(13,148,136,0.04) 100%)',
            borderLeft:'3px solid #0d9488',
            borderRight:'3px solid #0d9488',
            borderRadius:'4px',
            position:'relative',
          }}>
            {/* Decorative quote marks */}
            <div style={{
              position:'absolute', top:'-12px', left:'18px',
              fontSize:'60px', lineHeight:1, color:'#0d9488', opacity:0.12,
              fontFamily:'Georgia, serif', fontWeight:'bold',
            }}>"</div>
            <div style={{
              position:'absolute', bottom:'-28px', right:'18px',
              fontSize:'60px', lineHeight:1, color:'#0d9488', opacity:0.12,
              fontFamily:'Georgia, serif', fontWeight:'bold',
            }}>"</div>
            <p style={{
              fontSize:'14.5px',
              lineHeight:'2.0',
              color:'#1a2e2b',
              margin:0,
              textAlign:'justify',
              textIndent:'40px',
              fontFamily:"'Cormorant Garamond', serif",
              fontWeight:'500',
              letterSpacing:'0.3px',
            }}>
              This certificate is presented in recognition of your valuable contribution and dedicated efforts in the successful conduct of the Secondary School Certificate Examination, February‑March 2026, organized by the Maharashtra State Board of Secondary and Higher Secondary Education. Your diligence, discipline, and commitment are highly commendable.
            </p>
          </div>

          {/* ── BOTTOM DIVIDER ── */}
          <div style={{ position:'relative', margin:'auto 0 4px 0', paddingTop:'14px', height:'14px', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ position:'absolute', left:0, right:0, height:'1px', background:'linear-gradient(90deg, transparent 0%, #0d9488 15%, #14b8a6 50%, #0d9488 85%, transparent 100%)' }}/>
            <div style={{ position:'relative', zIndex:1, display:'flex', gap:'5px', alignItems:'center' }}>
              {[-2,-1,0,1,2].map(i => (
                <div key={i} style={{ width: i === 0 ? '6px' : '4px', height: i === 0 ? '6px' : '4px', borderRadius:'50%', background:'#0d9488', opacity: 1 - Math.abs(i)*0.2 }}/>
              ))}
            </div>
          </div>

          {/* ── BOTTOM SECTION ── */}
          <div style={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'flex-end',
            paddingBottom:'10px',
            marginTop:'6px',
          }}>
            {/* Date */}
            <div style={{ textAlign:'left' }}>
              <div style={{
                fontSize:'10px',
                letterSpacing:'4px',
                color:'#14b8a6',
                fontFamily:"'Cinzel', serif",
                textTransform:'uppercase',
                marginBottom:'4px',
                opacity:0.85,
              }}>
                Date
              </div>
              <div style={{
                fontSize:'15px',
                color:'#0a4f47',
                fontWeight:'600',
                fontFamily:"'Playfair Display', serif",
                paddingBottom:'3px',
                borderBottom:'2px solid #0d9488',
                letterSpacing:'0.5px',
                minWidth:'120px',
              }}>
                {date}
              </div>
            </div>

            {/* Center seal-like motif */}
            <div style={{ textAlign:'center', opacity:0.6 }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" viewBox="0 0 60 60">
                {[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (
                  <ellipse key={a} cx="30" cy="10" rx="4" ry="10" fill="#0d9488" transform={`rotate(${a},30,30)`} opacity="0.6"/>
                ))}
                <circle cx="30" cy="30" r="16" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.5"/>
                <circle cx="30" cy="30" r="10" fill="#0d9488" opacity="0.8"/>
                <circle cx="30" cy="30" r="5" fill="#f0fdfa"/>
              </svg>
            </div>

            {/* Signature block */}
            <div style={{ textAlign:'center', minWidth:'220px' }}>
              <img
                src="/signature.png"
                alt="Signature"
                style={{ height:'52px', objectFit:'contain', display:'block', margin:'0 auto 4px auto' }}
                crossOrigin="anonymous"
                onError={(e) => { (e.target as HTMLImageElement).src = SIGNATURE_FALLBACK; }}
              />
              <div style={{ width:'220px', height:'1.5px', background:'linear-gradient(90deg, transparent, #0d9488, transparent)', margin:'0 auto 5px auto' }}/>
              <div style={{
                fontSize:'10px',
                letterSpacing:'4px',
                color:'#14b8a6',
                fontFamily:"'Cinzel', serif",
                textTransform:'uppercase',
                marginBottom:'3px',
                opacity:0.85,
              }}>
                Chief Conductor
              </div>
              <div style={{
                fontSize:'15.5px',
                color:'#0a4f47',
                fontWeight:'700',
                fontFamily:"'Playfair Display', serif",
                margin:'0 0 3px 0',
                letterSpacing:'0.3px',
              }}>
                Mr. Dinesh Dayaram Yadav
              </div>
              <div style={{
                fontSize:'12px',
                color:'#374151',
                fontFamily:"'Cormorant Garamond', serif",
                fontWeight:'500',
                margin:'0 0 2px 0',
                letterSpacing:'0.3px',
              }}>
                Centre No 6118
              </div>
              <div style={{
                fontSize:'11.5px',
                color:'#4b5563',
                fontFamily:"'Cormorant Garamond', serif",
                fontWeight:'500',
                margin:0,
                letterSpacing:'0.2px',
              }}>
                St. Agrasen High School Kalwa East Thane 400605
              </div>
            </div>
          </div>

        </div>{/* end main content */}
      </div>
    );
  }
);

Certificate.displayName = 'Certificate';
export default Certificate;
