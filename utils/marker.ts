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
          <stop offset="0%" stop-color="transparent" />
          <stop offset="100%" stop-color="#000" />
        </linearGradient>
        <filter id="blur">
           <feGaussianBlur stdDeviation="1" />
        </filter>
      </defs>
      <polygon transform="rotate(60 12 24) translate(-10.5 -1.7) skewX(19) " filter="url(#blur)" opacity="0.8" points="12,24 20,12 4,12" fill="url(#shadow)" />
      <path 
        id="marker-body"
        fill="${fillColor}" 
        stroke="#ccc" 
        stroke-opacity="0.2"
        stroke-width="0.5"
        d="M12 12T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"
      />
      <text
        x="12" y="10"
        text-anchor="middle"
        alignment-baseline="central"
        fill="${textColor}"
        font-size="6"
      >
        ${text}
        </text>
    </svg>`,
    className: "",
    iconSize: [size * 1.5, size],
    iconAnchor: [size/2, size],
  }
}

export {
  getPointMarkerOptions
}
