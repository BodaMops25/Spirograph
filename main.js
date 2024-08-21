'use strict'

const cnvs = document.querySelector('#cnvs'),
      ctx = cnvs.getContext('2d')

cnvs.width = innerWidth
cnvs.height = innerHeight

cnvs.style.width = innerWidth
cnvs.style.height = innerHeight

function Spirograph({
  r = 70,
  d = 35,
  R = 20,
  angle = 0,
  saturation = 100,
  lightness = 50,
  alpha = 0.2,
  colorType = 1,
  step = 1,
  fps = 60,
  scale = 1,
  context
}) {

  this.scale = scale
  this.r = r * this.scale
  this.d = d * this.scale
  this.R = R * this.scale
  this.angle = angle
  this.x = 0
  this.y = 0
  this.saturation = saturation
  this.lightness = lightness
  this.alpha = alpha
  this.hsla = `hsla(${this.angle}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
  this.colorType = colorType
  this.step = step
  this.fps = fps
  this.ctx = context

  this.calcCoords = () => {

    const radiusDelta = this.R - this.r,
          angleRadians = this.angle / 180 * Math.PI

    this.x = radiusDelta * Math.cos(angleRadians) + this.d * Math.cos((radiusDelta / this.r) * angleRadians)
    this.y = radiusDelta * Math.sin(angleRadians) + this.d * Math.sin((radiusDelta / this.r) * angleRadians)

    this.angle += this.step
  }

  this.render = () => {
    this.ctx.beginPath()
    this.ctx.arc(this.x + cnvs.width / 2, this.y + cnvs.height / 2, 5, 0, Math.PI * 2)
    this.ctx.fillStyle = this.hsla
    this.ctx.fill()

    if(this.colorType == 1) this.hsla = `hsla(${this.angle}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
    else if(this.colorType == 2) this.hsla = this.hsla
  }

  this.clear = () => ctx.clearRect(0, 0, cnvs.width, cnvs.height)
}

const spirograph = new Spirograph({context: ctx, fps: 120, step: 1, scale: 2})

let spirographRenderLoop;

function runSpirographAnimation() {

  if(spirographRenderLoop !== undefined) clearInterval(spirographRenderLoop)

  spirographRenderLoop = setInterval(() => {
    spirograph.calcCoords()
    spirograph.render()

  }, 1000 / spirograph.fps)
}

runSpirographAnimation()

const settingsContainer = document.querySelector('.settings-container'),
      tab_btn = document.querySelector('#tab-btn'),
      clear_btn = document.querySelector('#clear-btn'),
      spirographSpeed_inpt = document.querySelector('#spirographSpeed'),
      scale_inpt = document.querySelector('#scale'),
      radiusR_inpt = document.querySelector('#radiusR'),
      radius_inpt = document.querySelector('#radius'),
      distanceR_inpt = document.querySelector('#distanceR'),
      distance_inpt = document.querySelector('#distance'),
      RadiusR_inpt = document.querySelector('#RadiusR'),
      Radius_inpt = document.querySelector('#Radius'),
      spirographStepR_inpt = document.querySelector('#spirographStepR'),
      spirographStep_inpt = document.querySelector('#spirographStep'),
      spirographColor_inpt = document.querySelector('#spirographColor')

tab_btn.onclick = () => {
  if(settingsContainer.style.display === 'none') {
    settingsContainer.style.display = 'flex'
  } else {
    settingsContainer.style.display = 'none'
  }
}
clear_btn.onclick = spirograph.clear

spirographSpeed_inpt.onchange = (e) => {  
  spirograph.fps = +e.target.value
  runSpirographAnimation()
}

radiusR_inpt.oninput = (e) => {  

  const value = +e.target.value * spirograph.scale

  spirograph.r = value
  radius_inpt.value = value
}

radius_inpt.onchange = (e) => {  

  const value = +e.target.value * spirograph.scale

  spirograph.r = value
  radiusR_inpt.value = value
}

distanceR_inpt.oninput = (e) => {  

  const value = +e.target.value * spirograph.scale

  spirograph.d = value
  distance_inpt.value = value
}

distance_inpt.onchange = (e) => {  

  const value = +e.target.value * spirograph.scale

  spirograph.d = value
  distanceR_inpt.value = value
}

RadiusR_inpt.oninput = (e) => {  

  const value = +e.target.value * spirograph.scale

  spirograph.R = value
  Radius_inpt.value = value
}

Radius_inpt.onchange = (e) => {  

  const value = +e.target.value * spirograph.scale

  spirograph.R = value
  RadiusR_inpt.value = value
}

spirographStepR_inpt.oninput = (e) => {  

  const value = +e.target.value / 5

  spirograph.step = value
  spirographStep_inpt.value = value
}

spirographStep_inpt.onchange = (e) => {  

  const value = +e.target.value

  spirograph.step = value
  spirographStepR_inpt.value = value
}

spirographColor_inpt.onchange = (e) => {  

  spirograph.hsla = e.target.value
  spirograph.colorType = 2
}