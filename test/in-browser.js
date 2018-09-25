'use strict'

const generate = require('../generate.js')

generate(window.slices || 1000, (rgb) => {
  const span = document.createElement('span')
  span.style = `background-color: ${rgb};`
  document.body.appendChild(span)
})
