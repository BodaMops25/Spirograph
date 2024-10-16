import {Spirograph} from "./functions"

const cnvs = document.querySelector<HTMLCanvasElement>('#cnvs'),
      ctx = cnvs?.getContext('2d')

if(!cnvs) throw new Error('No canvas')

cnvs.width = innerWidth
cnvs.height = innerHeight

cnvs.style.width = innerWidth.toString()
cnvs.style.height = innerHeight.toString()

const spirograph = new Spirograph({cnvs, fps: 120, step: 1, scale: 2})

let spirographRenderLoop: number;

function runSpirographAnimation() {

  if(spirographRenderLoop !== undefined) clearInterval(spirographRenderLoop)

  spirographRenderLoop = setInterval(() => {
    spirograph.calcCoords()
    spirograph.render()

  }, 1000 / spirograph.fps)
}

runSpirographAnimation()

const settingsContainer = document.querySelector<HTMLElement>('.settings-container'),
      tab_btn = document.querySelector<HTMLElement>('#tab-btn'),
      clear_btn = document.querySelector<HTMLElement>('#clear-btn'),
      spirographSpeed_inpt = document.querySelector<HTMLElement>('#spirographSpeed'),
      scale_inpt = document.querySelector<HTMLElement>('#scale'),
      radiusR_inpt = document.querySelector<HTMLInputElement>('#radiusR'),
      radius_inpt = document.querySelector<HTMLInputElement>('#radius'),
      distanceR_inpt = document.querySelector<HTMLInputElement>('#distanceR'),
      distance_inpt = document.querySelector<HTMLInputElement>('#distance'),
      RadiusR_inpt = document.querySelector<HTMLInputElement>('#RadiusR'),
      Radius_inpt = document.querySelector<HTMLInputElement>('#Radius'),
      spirographStepR_inpt = document.querySelector<HTMLInputElement>('#spirographStepR'),
      spirographStep_inpt = document.querySelector<HTMLInputElement>('#spirographStep'),
      spirographColor_inpt = document.querySelector<HTMLInputElement>('#spirographColor')



if(tab_btn) tab_btn.onclick = () => {
  if(settingsContainer?.style.display === 'none') {
    settingsContainer.style.display = 'flex'
  } else {
    settingsContainer && (settingsContainer.style.display = 'none')
  }
}
clear_btn && (clear_btn.onclick = spirograph.clear)

if(spirographSpeed_inpt) spirographSpeed_inpt.onchange = (e: any) => {  
  spirograph.fps = +e.target.value
  runSpirographAnimation()
}

function syncInputs(spinerHTMLInputElement: HTMLInputElement, inputHTMLInputElement: HTMLInputElement, spirographProp: 'r' | 'R' | 'd' | 'step') {

  spinerHTMLInputElement.addEventListener('input', event => {
    
    if(event.target instanceof HTMLInputElement) {
      const value = +event.target.value

      spirograph[spirographProp] = value * spirograph.scale
      inputHTMLInputElement.value = value.toString()
    }
  })

  inputHTMLInputElement.addEventListener('change', event => {
    
    if(event.target instanceof HTMLInputElement) {
      const value = +event.target.value

      spirograph[spirographProp] = value * spirograph.scale
      spinerHTMLInputElement.value = value.toString()
    }
  })
}

radiusR_inpt && radius_inpt && syncInputs(radiusR_inpt, radius_inpt, 'r')
distanceR_inpt && distance_inpt && syncInputs(distanceR_inpt, distance_inpt, 'd')
RadiusR_inpt && Radius_inpt && syncInputs(RadiusR_inpt, Radius_inpt, 'R')
spirographStepR_inpt && spirographStep_inpt && syncInputs(spirographStepR_inpt, spirographStep_inpt, 'step')

if(spirographColor_inpt) spirographColor_inpt.onchange = event => {  
  if(event.target instanceof HTMLInputElement) {

    spirograph.hsla = event.target.value
    spirograph.colorType = 2
  }
}