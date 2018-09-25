'use strict'

const sinusoidalDecimal = require('sinusoidal-decimal')

function heatColor (decimal, opacity) {
  if (typeof decimal !== 'number') throw new Error(`Invalid type ${typeof decimal}, should be decimal number`)
  if (Number.isNaN(decimal)) throw new Error('NaN passed to Flame Gradient, should be decimal number')

  // Colour progresses through almost-black to red to orange to yellow to almost white.
  // Maximises vividness of colours, and also smoothness of increase in apparent
  // brightness, stable across colour vision deficiency (CVD) simulators.

  // Increases red, then green, then blue channel, but using overlapping sinusoidal curves
  // so the next channel is starting to accelerate as previous tapers off. For regular vision,
  // small additions near 0 or 255 make little visible difference (so colours remain vivid),
  // but in CVD, these small overlaps make a big difference to apparent smoothness.

  // Different rates partically reflect different relative luminosity
  // - green highest so widest range, then red, then blue narrowest.

  // Min <0 and max >1 so pure pure black and white are reserved for outside 0-1 range
  const red = Math.round(255 * sinusoidalDecimal(decimal, -0.1, 0.56, true))
  const green = Math.round(255 * sinusoidalDecimal(decimal, 0, 1.08, true))
  const blue = Math.round(255 * sinusoidalDecimal(decimal, 0.58, 1.1, true))

  const rgb = `${red}, ${green}, ${blue}`
  if (typeof opacity === 'undefined') return `rgb(${rgb})`
  return `rgba(${rgb}, ${opacity})`
}

module.exports = heatColor
