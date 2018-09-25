'use strict'

const flameGradient = require('./index.js')

function generate (slices, func = null, alpha = undefined) {
  // Start at 0.0, end at 1.0; n = slices not n = slices + 1
  const rgb0 = flameGradient(0, alpha)
  slices--

  // Fill an array with rgb values, or execute func for each gradient slice
  const arr = func ? null : [ rgb0 ]
  if (func) func(rgb0)

  for (let i = 1; i <= slices; i++) {
    const rgb = flameGradient(i / slices, alpha)
    func ? func(rgb) : arr.push(rgb)
  }
  return arr
}

module.exports = generate
