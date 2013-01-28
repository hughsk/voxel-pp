var createGame = require('voxel-engine')
var voxel = require('voxel')
var skin = require('minecraft-skin')
var debris = require('voxel-debris')
var texturePath = 'textures/'

var game = window.game = createGame({
  generate: voxel.generator['Valley'],
  startingPosition: [185, 100, 0],
  texturePath: texturePath
})

// Load in the colour-shift shader
var composer = require('./')(game).use([
  "uniform sampler2D tDiffuse;",
  "uniform float amount;",
  "varying vec2 vUv;",
  "void main() {",
    "vec4 cga = texture2D(tDiffuse, vUv);",
    "vec3 original = cga.rgb;",
    "vec3 altered = vec3(cga.g * amount, cga.r * amount, cga.b + (cga.r * amount + cga.g * amount) / 4.);",
    "gl_FragColor = vec4(original + (altered - original) * amount, cga.a);",
  "}"
].join("\n"))

// Default to "disabled"
composer.passes[1].uniforms.amount = { type: 'f', value: 0 }
// Fade over time
game.on('tick', function() {
  composer.passes[1].uniforms.amount.value *= 0.99
})

// Every jump, bounce the colour shader back to
// full strength
game.controls.on('command', function(command, ok) {
  if (!ok || command !== 'wantsJump') return
  composer.passes[1].uniforms.amount.value = 1.5
})

game.appendTo('#container')

container.addEventListener('click', function() {
  game.requestPointerLock(container)
})

// rotate camera left so it points at the characters
game.controls.yawObject.rotation.y = 1.5

var maxogden = skin(game.THREE, 'maxogden.png').createPlayerObject()
maxogden.position.set(0, 62, 20)
game.scene.add(maxogden)

var substack = skin(game.THREE, 'substack.png').createPlayerObject()
substack.position.set(0, 62, -20)
game.scene.add(substack)

var currentMaterial = 1

var explode = debris(game, { power : 1.5, yield: 1 })

game.on('mousedown', function (pos) {
  if (erase) explode(pos)
  else game.createBlock(pos, currentMaterial)
})

var erase = true
window.addEventListener('keydown', function (ev) {
  if (ev.keyCode === 'X'.charCodeAt(0)) {
    erase = !erase
  }
})

function ctrlToggle (ev) { erase = !ev.ctrlKey }
window.addEventListener('keyup', ctrlToggle)
window.addEventListener('keydown', ctrlToggle)

module.exports = game
