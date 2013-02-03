## voxel-pp ##

GLSL post-processing module for Voxel.js! This is a wrapper for
[@alteredq](http://github.com/alteredq)'s `THREE.EffectComposer`, which allows
you to stack fragment shaders for nice effects such as Bloom, Blur, Mosaic
Filters and so on.

The [demo](http://hughsk.github.com/voxel-pp) is somewhat less graceful,
but you get the idea.

## Installation ##

``` bash
npm install voxel-pp
```

## Usage ##

**`composer(game)`**

Enable post processing.

**`composer(game).use(fragmentShader)`**

Add a shader pass using the `fragmentShader` string. Includes
`sampler2D tDiffuse` (the screen texture) and `vec2 vUv` (the current pixel)
by default.

**`composer(game).use(options)`**

Same as above, but takes an object instead with the following properties,
all optional:

* `fragmentShader`
* `vertexShader`
* `uniforms`

## Example ##

See [`demo.js`](http://github.com/hughsk/voxel-pp/blob/master/demo.js) for the
code used in the demo.

``` javascript
var game = require('voxel-engine')()
  , voxelpp = require('voxel-pp')

var postprocessor = voxelpp(game)

postprocessor
  .use(require('./some/fragment/shader.fs'))
  .use({
    fragmentShader: require('./another/fragment/shader.fs'),
    uniforms: {
      amount: { type: 'f', value: 1 }
    }
  })
```
