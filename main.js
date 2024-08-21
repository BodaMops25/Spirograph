'use strict'

import {Spirograph} from "./functions.js"

const cnvs = document.querySelector('#cnvs'),
      ctx = cnvs.getContext('2d')

cnvs.width = innerWidth
cnvs.height = innerHeight

cnvs.style.width = innerWidth
cnvs.style.height = innerHeight

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