/**
 * The vehicle. Every panel is its own <g> so the whole thing can be blown
 * apart and pulled back together by a single custom property, --boom (0 → 1).
 * --burn (0 → 1) brings up the afterburners for the getaway sequence.
 */

const BODY = `
  M 218 448
  C 214 388 236 336 286 308
  C 312 293 344 288 372 290
  C 392 316 404 344 408 374
  L 700 374
  C 736 370 768 348 792 312
  C 806 292 828 290 842 306
  C 862 330 872 392 864 438
  C 858 474 838 494 800 496
  L 296 496
  C 250 494 222 480 218 448 Z
`

/* part → how far it drifts when the exploded view opens up */
const drift = (x, y) => ({
  transform: `translate(calc(var(--boom, 0) * ${x}px), calc(var(--boom, 0) * ${y}px))`,
})

function Wheel({ cx, cy, r }) {
  const spokes = [0, 72, 144, 216, 288]
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill="#111410" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#20261c" strokeWidth="2" />
      <circle cx={cx} cy={cy} r={r * 0.72} fill="#191e16" />
      <circle cx={cx} cy={cy} r={r * 0.56} fill="#252c20" />
      {spokes.map((a) => (
        <line
          key={a}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos((a * Math.PI) / 180) * r * 0.54}
          y2={cy + Math.sin((a * Math.PI) / 180) * r * 0.54}
          stroke="#3d4735"
          strokeWidth="7"
          strokeLinecap="round"
        />
      ))}
      <circle cx={cx} cy={cy} r={r * 0.16} fill="#c9d6bb" />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx} ${cy - r}`}
        fill="none"
        stroke="rgba(57,255,20,.5)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  )
}

export default function TukTuk({
  className = '',
  style,
  boost = false,
  /* tight crop for the hero, full box when the afterburners need the room */
  viewBox = '0 0 1040 700',
  title = 'Yellow tuk-tuk',
}) {
  return (
    <svg
      className={className}
      style={style}
      viewBox={viewBox}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="paint" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffe95c" />
          <stop offset="0.42" stopColor="#ffcf0a" />
          <stop offset="1" stopColor="#c98f00" />
        </linearGradient>
        <linearGradient id="roof" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3128" />
          <stop offset="1" stopColor="#0a0c09" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="rgba(214,255,208,.34)" />
          <stop offset="1" stopColor="rgba(60,90,60,.1)" />
        </linearGradient>
        <linearGradient id="cabin" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#050705" />
          <stop offset="1" stopColor="#161b13" />
        </linearGradient>
        <radialGradient id="lamp">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#fff7b0" />
          <stop offset="0.7" stopColor="#ffd400" />
          <stop offset="1" stopColor="rgba(255,212,0,0)" />
        </radialGradient>
        <radialGradient id="pool">
          <stop offset="0" stopColor="rgba(57,255,20,.34)" />
          <stop offset="1" stopColor="rgba(57,255,20,0)" />
        </radialGradient>
        <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f7ffe8" />
          <stop offset="0.22" stopColor="#c6ff5e" />
          <stop offset="0.55" stopColor="#39ff14" />
          <stop offset="1" stopColor="rgba(20,180,10,0)" />
        </linearGradient>
        <filter id="soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
        <filter id="softer" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="34" />
        </filter>
      </defs>

      {/* ground bounce + contact shadow */}
      <ellipse cx="530" cy="566" rx="330" ry="26" fill="url(#pool)" />
      <ellipse cx="530" cy="558" rx="252" ry="15" fill="rgba(0,0,0,.62)" filter="url(#soft)" />

      {/* ---- afterburners ---- */}
      <g style={{ opacity: 'var(--burn, 0)' }} aria-hidden="true">
        {[688, 782].map((x, i) => (
          <g key={x}>
            <path
              d={`M ${x - 26} 486 L ${x + 26} 486 L ${x + 17} 534 L ${x - 17} 534 Z`}
              fill="#20261c"
              stroke="#39ff14"
              strokeWidth="2"
              opacity=".8"
            />
            <path
              d={`M ${x - 17} 530
                  C ${x - 30} 594 ${x - 12} 646 ${x} ${700 + i * 0}
                  C ${x + 12} 646 ${x + 30} 594 ${x + 17} 530 Z`}
              fill="url(#flame)"
              style={{
                transformOrigin: `${x}px 530px`,
                transform: 'scaleY(calc(0.35 + var(--burn, 0) * 0.9))',
              }}
            />
            <path
              d={`M ${x - 7} 532 C ${x - 12} 580 ${x - 4} 610 ${x} 646
                  C ${x + 4} 610 ${x + 12} 580 ${x + 7} 532 Z`}
              fill="#f9ffe9"
              opacity=".85"
            />
          </g>
        ))}
        <ellipse cx="735" cy="600" rx="190" ry="90" fill="rgba(57,255,20,.28)" filter="url(#softer)" />
      </g>

      {/* ---- wheels ---- */}
      <g style={drift(-186, 74)}>
        <Wheel cx={258} cy={480} r={74} />
      </g>
      <g style={drift(168, 96)}>
        <Wheel cx={748} cy={466} r={86} />
      </g>

      {/* front fork */}
      <g style={drift(-128, 96)}>
        <path d="M 244 396 L 272 392 L 278 474 L 254 476 Z" fill="#2b3126" />
        <circle cx="266" cy="480" r="12" fill="#3d4735" />
      </g>

      {/* ---- main shell ---- */}
      <g style={drift(0, 0)}>
        <path d={BODY} fill="url(#paint)" />
        {/* lower shade + sill pinstripe */}
        <path
          d="M 232 470 C 300 492 700 500 856 452 L 852 470 C 828 492 792 498 750 498 L 296 496 C 262 494 240 486 232 470 Z"
          fill="rgba(90,58,0,.34)"
        />
        <path
          d="M 410 374 L 700 374"
          stroke="rgba(242,255,0,.85)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* specular streak */}
        <path
          d="M 268 322 C 316 300 356 296 380 300 L 372 316 C 340 310 306 316 276 336 Z"
          fill="rgba(255,255,255,.42)"
        />
        {/* toxic rim light along the leading edge */}
        <path
          d="M 218 448 C 214 388 236 336 286 308 C 312 293 344 288 372 290"
          fill="none"
          stroke="rgba(57,255,20,.75)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <text
          x="436"
          y="452"
          fontFamily="Goldman, sans-serif"
          fontSize="25"
          letterSpacing="3.5"
          fill="rgba(70,45,0,.42)"
        >
          LEMON—LIME EXPRESS
        </text>
        <path
          d="M 644 466 A 104 104 0 0 1 852 466"
          fill="none"
          stroke="rgba(40,26,0,.5)"
          strokeWidth="10"
        />
      </g>

      {/* cabin void */}
      <g style={drift(0, 0)}>
        <path d="M 430 252 L 814 240 L 806 368 L 436 372 Z" fill="url(#cabin)" />
        <path d="M 430 252 L 814 240 L 812 262 L 432 274 Z" fill="rgba(0,0,0,.7)" />
      </g>

      {/* bench + grab rail */}
      <g style={drift(52, 128)}>
        <path d="M 566 372 L 566 306 Q 566 292 582 292 L 782 288 Q 796 288 796 302 L 796 372 Z" fill="#1c221a" />
        <path d="M 566 316 L 796 310" stroke="rgba(242,255,0,.28)" strokeWidth="4" />
        <rect x="470" y="296" width="26" height="78" rx="8" fill="#1c221a" />
      </g>
      <g style={drift(20, -104)}>
        <path d="M 452 268 L 800 258" stroke="#4a5540" strokeWidth="8" strokeLinecap="round" />
      </g>

      {/* ---- roof ---- */}
      <g style={drift(0, -212)}>
        <path d="M 382 296 L 402 294 L 414 210 L 394 210 Z" fill="#171b15" />
        <path d="M 802 322 L 824 312 L 832 210 L 812 210 Z" fill="#171b15" />
        <path
          d="M 348 224 C 430 188 700 178 870 204 L 874 238 C 700 210 430 218 352 256 Z"
          fill="url(#roof)"
        />
        <path
          d="M 350 240 C 430 204 700 194 872 220"
          fill="none"
          stroke="rgba(242,255,0,.5)"
          strokeWidth="3"
        />
      </g>

      {/* windshield */}
      <g style={drift(-72, -118)}>
        <path d="M 386 212 L 418 208 L 434 292 L 404 294 Z" fill="url(#glass)" />
        <path d="M 396 216 L 406 214 L 420 288 L 410 290 Z" fill="rgba(255,255,255,.2)" />
      </g>

      {/* headlamp + cowl furniture */}
      <g style={drift(-224, -18)}>
        <circle cx="266" cy="344" r="42" fill="url(#lamp)" opacity=".55" filter="url(#soft)" />
        <circle cx="266" cy="344" r="27" fill="url(#lamp)" />
        <circle cx="266" cy="344" r="27" fill="none" stroke="#3c4434" strokeWidth="4" />
        <circle cx="257" cy="336" r="7" fill="#fffdf0" />
      </g>
      <g style={drift(-176, -142)}>
        <path d="M 244 266 L 312 292" stroke="#2f3629" strokeWidth="11" strokeLinecap="round" />
        <circle cx="240" cy="264" r="9" fill="#454f3b" />
      </g>

      {/* front fender */}
      <g style={drift(-138, -52)}>
        <path
          d="M 169 456 A 92 92 0 0 1 349 464"
          fill="none"
          stroke="url(#paint)"
          strokeWidth="21"
          strokeLinecap="round"
        />
        <path
          d="M 172 462 A 92 92 0 0 1 344 470"
          fill="none"
          stroke="rgba(90,58,0,.4)"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>

      {/* tail light, plate, exhaust */}
      <g style={drift(196, -26)}>
        <rect x="856" y="368" width="13" height="30" rx="6" fill="#39ff14" />
        <rect x="856" y="368" width="13" height="30" rx="6" fill="#39ff14" filter="url(#soft)" />
      </g>
      <g style={drift(178, 34)}>
        <rect x="792" y="438" width="66" height="27" rx="5" fill="#eef2e4" />
        <text x="825" y="457" textAnchor="middle" fontFamily="Goldman, sans-serif" fontSize="15" fill="#12150f">
          LMN 013
        </text>
      </g>
      <g style={drift(158, 44)}>
        <rect x="852" y="470" width="30" height="12" rx="6" fill="#2b3126" />
      </g>
    </svg>
  )
}
