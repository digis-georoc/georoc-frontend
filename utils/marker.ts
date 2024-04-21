import type {DivIconOptions} from "leaflet";


function getPointMarkerOptions({
  fillColor = '#000',
  size = 48,
  text = '',
  textColor = '#fff'
}: {fillColor?: string , size?: number, text?: string, textColor?: string}): DivIconOptions {
  return {
    html:   `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
      <defs>
        <linearGradient id="shadow" x2="0%" y2="100%">
          <stop offset="10%" stop-color="transparent" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <filter id="blur">
           <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>
      <polygon filter="url(#blur)" opacity="0.5" points="12,24 24,20 8,14" fill="url(#shadow)" />
      <path 
        fill="${fillColor}" 
        stroke="#000" 
        stroke-opacity="0.2" 
        stroke-width="0.5" 
        transform="translate(0 2)" 
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5"
      />
      <text
        x="12" y="10"
        text-anchor="middle"
        dy="3"
        fill="${textColor}"
        font-weight="700"
        font-size="6"
      >
        ${text}
      </text>
      <circle 
        cx="12" 
        cy="11" 
        r="2.2" 
        fill="${text === '' ? '#ddd' : 'none'}"
        stroke="${text === '' ? '#000' : 'none'}" 
        stroke-opacity="0.2" 
        stroke-width="0.5" 
      />
    </svg>`,
    className: "",
    iconSize: [size * 1.5, size],
    iconAnchor: [size/2, size],
  }
}

export {
  getPointMarkerOptions
}
