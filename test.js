'use strict'

const { test } = require('tap')
const flameGradient = require('./index.js')

test('Standard rgb', (t) => {
  t.equals(flameGradient(0), 'rgb(14, 0, 0)')
  t.equals(flameGradient(0.2), 'rgb(109, 21, 0)')
  t.equals(flameGradient(0.4), 'rgb(220, 77, 0)')
  t.equals(flameGradient(0.6), 'rgb(255, 150, 1)')
  t.equals(flameGradient(0.8), 'rgb(255, 215, 97)')
  t.equals(flameGradient(1), 'rgb(255, 252, 232)')
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
  t.equals(flameGradient(0, 0.1), 'rgba(14, 0, 0, 0.1)')
  t.equals(flameGradient(0.4, 0.2), 'rgba(220, 77, 0, 0.2)')
  t.equals(flameGradient(0.6, 0.3), 'rgba(255, 150, 1, 0.3)')
  t.equals(flameGradient(1, 0.4), 'rgba(255, 252, 232, 0.4)')

  t.equals(flameGradient(-0.1, 0.5), 'rgba(0, 0, 0, 0.5)')
  t.equals(flameGradient(1.1, 0.6), 'rgba(255, 255, 255, 0.6)')
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
