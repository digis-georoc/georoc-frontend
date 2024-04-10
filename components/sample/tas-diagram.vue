<script setup lang="ts">
import * as d3 from "d3"
import type {ScaleContinuousNumeric, ScaleLinear} from "d3-scale";

const props = defineProps<{
  data?: string,
}>()

const minX = 35
const maxX = 80
const maxY = 16



const margin = {top: 10, right: 30, bottom: 60, left: 60},
    width = 760 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

let svg = null
let x = null
let y = null


function render() {
  svg = d3.select("#tas")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")")

  x = d3.scaleLinear()
    .domain([minX, maxX])
    .range([ 0, width ])

  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .append("text")
    .attr("fill", "#222")
    .attr("font-size", 12)
    .attr("transform",`translate(${width/2 - 10}, ${margin.bottom -20})`)
    .text("SiO2 wt%")

   y = d3.scaleLinear()
    .domain([0, maxY])
    .range([ height, 0 ])

  svg.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#222")
    .attr("font-size", 12)
    .attr("transform",`translate(-${margin.left - 20}, ${height/2 - 20}) rotate(-90)`)
    .text("Na2O + K2O wt%")

  drawLine([45, 1, 45, 5])
  drawLine([45, 5, 52, 5])
  drawLine([52, 5, 69, 8])
  drawLine([76.5, 1, 69, 8])
  drawLine([69, 8, 69, 13])
  drawLine([45, 5, 61.32, 13.7])
  drawLine([52, 1, 52, 5])
  drawLine([57, 1, 57, 5.9])
  drawLine([63, 1, 63, 6.9])
  drawLine([52, 5, 49.4, 7.3])
  drawLine([57, 5.9, 53.05, 9.25])
  drawLine([63, 6.9, 57.6, 11.7])
  drawLine([41, 3, 45, 3])
  drawLine([41, 1, 41, 3])
  drawLine([41, 1, 41, 7], {dashed: true })
  drawLine([41, 7, 45, 9.4], {dashed: true })
  drawLine([45, 9.4, 52.5, 14])
  drawLine([49.4, 7.3, 45, 9.4])
  drawLine([53, 9.3, 48.4, 11.5])
  drawLine([57.6, 11.7, 50.3, 15])

  addAreaText('Basalt', [48.5, 2])
  addAreaText('Basaltic\n andesite', [54.8, 2.7])
  addAreaText('Andesite', [60, 3.5])
  addAreaText('Dacite', [67.5, 4.2])
  addAreaText('Rhyolite', [72, 7])
  addAreaText('Trachy- \n basalt', [48.8, 5.9])
  addAreaText('Basaltic \n trachy- \n andesite', [53, 7])
  addAreaText('Trachy- \n andesite', [57.8, 8.2])
  addAreaText('Trachydacite', [65, 9])
  addAreaText('Trachyte', [62.5, 11.5])
  addAreaText('Picro- \n basalt', [43, 2])
  addAreaText('Basanite \n (Ol > 10%)', [44, 6])
  addAreaText('Tephrite \n (Ol < 10%)', [43.5, 7.2])
  addAreaText('Phono- \n tephrite', [48.5, 9.5])
  addAreaText('Tephri- \n phonolite', [52.5, 11.5])
  addAreaText('Phonolite', [57, 14])
  addAreaText('Foidite', [42, 12])

}

function drawLine([x1, y1, x2, y2], options = { dashed: false }) {
  const { dashed } = options
  const line =
  d3.create('svg:path')
    .attr("fill", "none")
    .attr("stroke", "#cfcfcf")
    .attr("stroke-width", 1.5)
    .attr("d", d3.line()([[x(x1), y(y1)], [x(x2), y(y2)]]))

  if (dashed) line.attr('stroke-dasharray', '5,5')
  svg.append(() => line.node())
}

function addAreaText(text: string, [xPos, yPos]: number[]) {

  const fontSize = 10
  const lineHeight = 1.45
  const lines = text.split("\n");

  const textEl = d3
      .create('svg:g')

  lines.forEach((line, i) => {
    textEl.append('text')
      .attr('text-anchor', 'middle')
      .attr("font-size", fontSize)
      .attr("fill", '#999')
      .text(line)
      .attr("x", x(xPos))
      .attr("y", y(yPos) + i * lineHeight * fontSize )
  })
  svg.append(() => textEl.node())
}

onMounted(() => {
  render()
})
</script>

<template>
  <div id="tas"></div>
</template>

<style scoped>

</style>
