import type {DivIconOptions} from "leaflet";
import {theme} from "#tailwind-config";


function getPointMarkerOptions({
  fillColor = '#000',
  text = '',
  textColor = '#fff',
  strokeColor = '#000'
}: {fillColor?: string , size?: number, text?: string, textColor?: string, strokeColor?: string}): DivIconOptions {
  const width = 38;
  const height = 29;

  return {
    html:   `
      <div class="p-[2px] rounded-md w-[40px] relative flex justify-center font-black whitespace-no-wrap leading-tight text-[13px] border shadow-lg"
        style="color:${textColor};background:${fillColor};border-color:${strokeColor}"
      >
        <div class="w-2 h-2 z-0 border-r border-b rotate-45 absolute bottom-[-4px] left-1/2 -translate-x-1/2" style="background:${fillColor};"></div>
        <span style="background:${fillColor};border-bottom-color:${strokeColor};border-right-color:${strokeColor}">${text}</span>
      </div>`,
    className: "",
    iconSize: [width, height],
    iconAnchor: [width/2, height],
  }
}

export {
  getPointMarkerOptions
}
