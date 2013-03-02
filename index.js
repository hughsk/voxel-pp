module.exports = function(game) {
  var THREE = game.THREE
    , EffectComposer = Composer.EffectComposer = require('three-effectcomposer')(THREE)
    , renderer = game.renderer || game.view.renderer
    , used = false
    , composer

  game.render = function render() {
    return used ? composer.composer.render() : renderer.render(game.scene, game.camera)
  };

  function Composer() {
    var composer = this.composer = new EffectComposer(renderer)
    composer.passes.push(new EffectComposer.RenderPass(game.scene, game.camera))

    this.passes = composer.passes
    this.updateRenderToScreen()
  };

  Composer.prototype.use = function(params) {
    params = params || {}
    if (typeof params === 'string') params = {
      fragmentShader: params
    }

    params.fragmentShader = params.fragmentShader || EffectComposer.CopyShader.fragmentShader
    params.vertexShader = params.vertexShader || EffectComposer.CopyShader.vertexShader
    params.uniforms = THREE.UniformsUtils.merge([ EffectComposer.CopyShader.uniforms, params.uniforms || {} ])

    this.passes.push(new EffectComposer.ShaderPass(params))
    this.updateRenderToScreen()

    return this
  };

  Composer.prototype.addPass = function(pass, params) {
    if (typeof pass === 'string') {
      pass = EffectComposer[pass].apply(this, [].slice.call(arguments, 1))
    }
    this.composer.addPass(pass)
    this.updateRenderToScreen()

    return pass
  };

  Composer.prototype.updateRenderToScreen = function() {
    used = this.passes.length > 1
    this.passes.slice(0, -1).forEach(function(pass) {
      pass.renderToScreen = false
    })
    this.passes.slice(-1).forEach(function(pass) {
      pass.renderToScreen = true
    })
  };

  Composer.prototype.EffectComposer = EffectComposer
  Composer.prototype.ClearMaskPass = EffectComposer.ClearMaskPass
  Composer.prototype.CopyShader = EffectComposer.CopyShader
  Composer.prototype.ShaderPass = EffectComposer.ShaderPass
  Composer.prototype.RenderPass = EffectComposer.RenderPass
  Composer.prototype.MaskPass = EffectComposer.MaskPass
  Composer.prototype.THREE = THREE

  composer = new Composer

  return composer
};
