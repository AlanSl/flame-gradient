'use strict'

const browserify = require('browserify')
const opn = require('opn')
const path = require('path')
const pump = require('pump')
const streamTemplate = require('stream-template')
const fs = require('fs')

// This creates a HTML file containing the requested number of gradient lines
const slices = process.argv[2] || 1000

const browsf = browserify({
  'debug': true
}).add(path.join(__dirname, 'in-browser.js'))

const script = browsf.bundle()

const tempFilename = 'tempFlameGradient.html'

const html = streamTemplate`
<!DOCTYPE html>
<meta charset="utf8">
<meta name="viewport" content="width=device-width">
<title>Flame gradient preview</title>
<style>
  span {
    height: 200px;
    width: ${'' + (100 / slices)}%;
    display: inline-block;
  }

</style>
<body><br /></body>
<script>window.slices = ${'' + slices}; ${script}</script>
`

pump(
  html,
  fs.createWriteStream(tempFilename),
  () => {
    opn(`file:///${path.resolve(tempFilename)}`, { wait: false }).then(() => {
      console.log(`Opening then deleting ${tempFilename}...`)
      // With wait === true, entire browser must close before .then()
      // Without wait, .then() happens before file has finished opening
      // setTimeout here is an ugly hack... but this is only a test script
      setTimeout(() => {
        fs.unlink(tempFilename, (err) => {
          if (err) {
            console.err(err)
            throw err
          }
          console.log(`...Deleted ${tempFilename}.`)
        })
      }, 1000)
    })
  }
)
