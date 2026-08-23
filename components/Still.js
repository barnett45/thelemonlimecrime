/**
 * Cinematic stills, drawn rather than sourced, so the grid never depends on
 * an image host. Each frame is a flat-vector composition in the film's palette.
 */

const TONES = {
  lime: { sky: ['#0f1a0b', '#050803'], key: '#39ff14', fill: '#040603', haze: 'rgba(57,255,20,.34)' },
  lemon: { sky: ['#1a1a06', '#060602'], key: '#f2ff00', fill: '#050502', haze: 'rgba(242,255,0,.3)' },
  dusk: { sky: ['#0a1116', '#040604'], key: '#8bff5a', fill: '#03050a', haze: 'rgba(120,255,90,.24)' },
}

function Frame({ tone, id, children }) {
  const t = TONES[tone] || TONES.lime
  return (
    <svg viewBox="0 0 600 420" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.sky[0]} />
          <stop offset="1" stopColor={t.sky[1]} />
        </linearGradient>
        <radialGradient id={`glow-${id}`}>
          <stop offset="0" stopColor={t.haze} />
          <stop offset="1" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id={`blur-${id}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="18" />
        </filter>
      </defs>
      <rect width="600" height="420" fill={`url(#sky-${id})`} />
      {children(t, id)}
    </svg>
  )
}

const SCENES = {
  tycoon: (t, id) => (
    <>
      <circle cx="420" cy="150" r="200" fill={`url(#glow-${id})`} />
      <path d="M60 420c26-104 128-140 240-140s214 36 240 140z" fill={t.fill} />
      <ellipse cx="300" cy="212" rx="66" ry="80" fill={t.fill} />
      <path d="M234 214c-6-58 26-98 66-98s72 40 66 98" fill="none" stroke={t.key} strokeWidth="4" opacity=".8" />
      <path d="M366 240c30 16 44 44 44 44" stroke={t.key} strokeWidth="3" opacity=".5" fill="none" />
      <rect x="318" y="252" width="58" height="9" rx="4" fill="#2a2f22" />
      <circle cx="380" cy="256" r="7" fill={t.key} />
      <path d="M386 246c18-30 6-58 22-84" stroke="rgba(220,240,210,.28)" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M262 300l38 42 38-42" fill="none" stroke={t.key} strokeWidth="3" opacity=".55" />
    </>
  ),
  detective: (t, id) => (
    <>
      <circle cx="180" cy="120" r="190" fill={`url(#glow-${id})`} />
      <path d="M74 420c30-96 126-132 226-132s196 36 226 132z" fill={t.fill} />
      <ellipse cx="300" cy="224" rx="58" ry="70" fill={t.fill} />
      <path d="M186 190h228c-8-16-40-24-114-24s-106 8-114 24z" fill={t.fill} />
      <path d="M238 168c4-40 22-58 62-58s58 18 62 58z" fill={t.fill} />
      <path d="M186 190h228" stroke={t.key} strokeWidth="3.5" opacity=".85" />
      <path d="M250 250c-4 22 10 34 10 34" stroke={t.key} strokeWidth="3" fill="none" opacity=".5" />
      <rect x="286" y="300" width="12" height="120" fill={t.key} opacity=".18" />
      <path d="M120 420c0-60 20-96 20-96" stroke={t.key} strokeWidth="2" opacity=".35" fill="none" />
    </>
  ),
  street: (t, id) => (
    <>
      <rect y="250" width="600" height="170" fill="#04060a" />
      <path
        d="M0 250V150h48v-40h30v40h44v-70h40v70h58v-26h38v26h64v-52h40v52h72v-34h46v34h64v-58h34v58h22v100z"
        fill={t.fill}
      />
      <g fill={t.key} opacity=".7">
        <rect x="60" y="128" width="6" height="9" />
        <rect x="176" y="102" width="6" height="9" />
        <rect x="352" y="118" width="6" height="9" />
        <rect x="486" y="130" width="6" height="9" />
      </g>
      <ellipse cx="300" cy="300" rx="200" ry="70" fill={`url(#glow-${id})`} />
      <path d="M244 300h112l24 44H220z" fill="#0a0d08" />
      <circle cx="252" cy="344" r="15" fill="#0d1109" />
      <circle cx="352" cy="344" r="15" fill="#0d1109" />
      <path d="M232 292h136l-10-34h-116z" fill={t.key} opacity=".22" />
      <circle cx="238" cy="308" r="9" fill="#fffbe0" />
      <path d="M238 308l-190 60 190 26z" fill={t.key} opacity=".16" filter={`url(#blur-${id})`} />
      <g stroke={t.key} strokeWidth="2" opacity=".2">
        <path d="M0 384h600M0 402h600" />
      </g>
    </>
  ),
  parlor: (t, id) => (
    <>
      <path d="M300 0v96" stroke="#2b3126" strokeWidth="4" />
      <path d="M300 96l-96 82h192z" fill="#171b14" />
      <ellipse cx="300" cy="188" rx="34" ry="12" fill={t.key} opacity=".9" />
      <path d="M300 190l-176 230h352z" fill={`url(#glow-${id})`} opacity=".8" />
      <rect x="120" y="330" width="360" height="10" rx="4" fill="#0b0e08" />
      <ellipse cx="196" cy="292" rx="42" ry="50" fill={t.fill} />
      <path d="M136 330c8-40 32-56 60-56s52 16 60 56z" fill={t.fill} />
      <ellipse cx="410" cy="286" rx="38" ry="46" fill={t.fill} />
      <path d="M356 330c6-38 28-52 54-52s48 14 54 52z" fill={t.fill} />
      <path d="M238 292c14 6 22 4 30 0" stroke={t.key} strokeWidth="3" fill="none" opacity=".6" />
      <rect x="272" y="312" width="56" height="18" rx="3" fill="#0e120b" stroke={t.key} strokeWidth="2" opacity=".8" />
    </>
  ),
  chase: (t, id) => (
    <>
      <g stroke={t.key} opacity=".22" strokeWidth="3">
        {[40, 96, 150, 210, 268, 322, 378].map((y) => (
          <path key={y} d={`M0 ${y}h${180 + (y % 90) * 3}`} />
        ))}
      </g>
      <ellipse cx="330" cy="300" rx="230" ry="90" fill={`url(#glow-${id})`} />
      <path d="M212 306c0-44 22-74 62-84l150-6c34 12 50 44 50 90z" fill={t.fill} />
      <path d="M232 218h228" stroke={t.fill} strokeWidth="14" strokeLinecap="round" />
      <circle cx="262" cy="318" r="30" fill="#080b06" />
      <circle cx="430" cy="318" r="34" fill="#080b06" />
      <circle cx="262" cy="318" r="12" fill={t.key} opacity=".5" />
      <circle cx="430" cy="318" r="13" fill={t.key} opacity=".5" />
      <path d="M478 268l104-16-104 30z" fill={t.key} opacity=".5" />
      <path d="M196 262l-160 22 160 6z" fill="#fffbe0" opacity=".35" filter={`url(#blur-${id})`} />
    </>
  ),
  market: (t, id) => (
    <>
      <ellipse cx="300" cy="240" rx="280" ry="140" fill={`url(#glow-${id})`} opacity=".7" />
      <path d="M0 300l84-46 86 46 84-46 86 46 84-46 86 46v120H0z" fill={t.fill} />
      <path d="M0 254l84-46 86 46 84-46 86 46 84-46 86 46" fill="none" stroke={t.key} strokeWidth="3" opacity=".55" />
      <g fill={t.key}>
        {[54, 138, 222, 306, 390, 474, 558].map((x, i) => (
          <g key={x}>
            <path d={`M${x} 196v${28 + (i % 3) * 8}`} stroke={t.key} strokeWidth="1.5" opacity=".4" />
            <circle cx={x} cy={228 + (i % 3) * 8} r="6" opacity=".9" />
          </g>
        ))}
      </g>
      <path d="M180 420c0-44 18-64 52-64s52 20 52 64z" fill="#04060a" />
      <path d="M340 420c0-38 14-54 44-54s44 16 44 54z" fill="#04060a" />
    </>
  ),
  wheel: (t, id) => (
    <>
      <circle cx="300" cy="220" r="220" fill={`url(#glow-${id})`} opacity=".65" />
      <circle cx="300" cy="230" r="160" fill="#0a0d08" />
      <circle cx="300" cy="230" r="112" fill="#12160f" />
      <circle cx="300" cy="230" r="70" fill="#1a2015" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line
          key={a}
          x1="300"
          y1="230"
          x2={300 + Math.cos((a * Math.PI) / 180) * 104}
          y2={230 + Math.sin((a * Math.PI) / 180) * 104}
          stroke="#39412f"
          strokeWidth="12"
          strokeLinecap="round"
        />
      ))}
      <circle cx="300" cy="230" r="22" fill={t.key} />
      <path d="M140 230a160 160 0 0 1 90-144" stroke={t.key} strokeWidth="7" fill="none" strokeLinecap="round" opacity=".85" />
      <rect y="392" width="600" height="28" fill="#04060a" />
    </>
  ),
  ledger: (t, id) => (
    <>
      <rect width="600" height="420" fill="#060903" />
      <ellipse cx="300" cy="210" rx="240" ry="150" fill={`url(#glow-${id})`} opacity=".5" />
      <g transform="rotate(-7 300 210)">
        <rect x="150" y="90" width="300" height="240" rx="4" fill="#e9eedd" opacity=".9" />
        <g stroke="#1c2116" strokeWidth="4" opacity=".5">
          {[130, 158, 186, 214, 242, 270].map((y) => (
            <path key={y} d={`M180 ${y}h${120 + ((y * 7) % 130)}`} />
          ))}
        </g>
        <rect x="180" y="290" width="118" height="18" fill={t.key} opacity=".85" />
      </g>
      <path d="M60 420c20-70 74-104 150-104" stroke={t.fill} strokeWidth="70" fill="none" />
    </>
  ),
  rooftop: (t, id) => (
    <>
      <circle cx="470" cy="110" r="56" fill="#e6f2d8" opacity=".85" />
      <circle cx="470" cy="110" r="120" fill={`url(#glow-${id})`} />
      <path d="M0 330h600v90H0z" fill={t.fill} />
      <path d="M0 330l120-14 96 14 140-22 128 22 116-10" fill="none" stroke={t.key} strokeWidth="3" opacity=".5" />
      <ellipse cx="214" cy="300" rx="26" ry="34" fill={t.fill} />
      <path d="M172 330c4-32 18-46 42-46s38 14 42 46z" fill={t.fill} />
      <path d="M256 300l70-16" stroke={t.key} strokeWidth="4" opacity=".7" />
      <g stroke={t.key} strokeWidth="2" opacity=".25">
        <path d="M0 250h600" />
      </g>
    </>
  ),
}

export default function Still({ scene, tone = 'lime', id }) {
  const draw = SCENES[scene] || SCENES.street
  return <Frame tone={tone} id={id}>{draw}</Frame>
}
