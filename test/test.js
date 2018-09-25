'use strict'

const { test } = require('tap')
const flameGradient = require('../index.js')
const generate = require('../generate.js')

const expected6 = [
  '14, 0, 0',
  '109, 21, 0',
  '220, 77, 0',
  '255, 150, 1',
  '255, 215, 97',
  '255, 252, 232'
]

test('Standard rgb', (t) => {
  t.equals(flameGradient(0), `rgb(${expected6[0]})`)
  t.equals(flameGradient(0.2), `rgb(${expected6[1]})`)
  t.equals(flameGradient(0.4), `rgb(${expected6[2]})`)
  t.equals(flameGradient(0.6), `rgb(${expected6[3]})`)
  t.equals(flameGradient(0.8), `rgb(${expected6[4]})`)
  t.equals(flameGradient(1), `rgb(${expected6[5]})`)
  t.end()
})

test('Out-of bounds rgb', (t) => {
  t.equals(flameGradient(-0.05), 'rgb(4, 0, 0)')
  t.equals(flameGradient(-0.1), 'rgb(0, 0, 0)')
  t.equals(flameGradient(-100), 'rgb(0, 0, 0)')

  t.equals(flameGradient(1.05), 'rgb(255, 255, 249)')
  t.equals(flameGradient(1.1), 'rgb(255, 255, 255)')
  t.equals(flameGradient(100), 'rgb(255, 255, 255)')
  t.end()
})

test('rgba', (t) => {
  t.equals(flameGradient(0, 0.1), `rgba(${expected6[0]}, 0.1)`)
  t.equals(flameGradient(0.4, 0.2), `rgba(${expected6[2]}, 0.2)`)
  t.equals(flameGradient(0.6, 0.3), `rgba(${expected6[3]}, 0.3)`)
  t.equals(flameGradient(1, 0.4), `rgba(${expected6[5]}, 0.4)`)

  t.equals(flameGradient(-0.1, 0.5), 'rgba(0, 0, 0, 0.5)')
  t.equals(flameGradient(1.1, 0.6), 'rgba(255, 255, 255, 0.6)')
  t.end()
})

test('generate', (t) => {
  t.same(generate(6), expected6.map((rgb) => `rgb(${rgb})`))
  t.same(generate(6, null, 0.5), expected6.map((rgb) => `rgba(${rgb}, 0.5)`))

  const arr = []
  generate(6, (rgb) => {
    const regex = /rgb\((.+)\)/
    const match = regex.exec(rgb)[1]
    arr.push(match)
  })
  t.same(arr, expected6)
  t.end()
})

test('Invalid input', (t) => {
  t.throws(() => {
    flameGradient(NaN)
  }, new Error('NaN passed to Flame Gradient, should be decimal number'))

  t.throws(() => {
    flameGradient('1,234%')
  }, new Error('Invalid type string, should be decimal number'))
  t.end()
})
