## voxel-pp ##

**Deprecated**

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

**`postprocessor(game)`**

Enable post processing.

**`postprocessor(game).use(fragmentShader)`**

Add a shader pass using the `fragmentShader` string. Includes
`sampler2D tDiffuse` (the screen texture) and `vec2 vUv` (the current pixel)
by default.

**`postprocessor(game).use(options)`**

Same as above, but takes an object instead with the following properties,
all optional:

* `fragmentShader`
* `vertexShader`
* `uniforms`

**`postprocessor(game).addPass(pass)`**

Equivalent to `EffectComposer.addPass` - the following pass types are exposed
with each instance of `voxel-pp`:

* `postprocessor(game).ShaderPass`
* `postprocessor(game).RenderPass`
* `postprocessor(game).MaskPass`
* `postprocessor(game).ClearMaskPass`

This method also returns the pass instead of the `voxel-pp` instance, so you
can play around with it directly.

**`postprocessor(game).addPass(type, params, ...)`**

To keep things clean, you can pass the string name of the pass
(e.g. `ShaderPass` or `MaskPass`) as the first argument, and the parameters
as the rest:

`postprocessor(game).addPass('MaskPass', scene, camera)`

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
