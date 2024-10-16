import {calcSpirographCoords, SpirographInputs} from './interfaces'

function calcSpirographCoords({r = 0, R = 0, d = 0, angle = 0}: calcSpirographCoords = {}) {
  const radiusDelta = R - r,
        angleRadians = angle / 180 * Math.PI

  return {
    x: radiusDelta * Math.cos(angleRadians) + d * Math.cos((radiusDelta / r) * angleRadians),
    y: radiusDelta * Math.sin(angleRadians) + d * Math.sin((radiusDelta / r) * angleRadians)
  }
}

class Spirograph {

  scale: number
  r: number
  d: number
  R: number
  angle: number
  x: number
  y: number
  saturation: number
  lightness: number
  alpha: number
  hsla: string
  colorType: number
  step: number
  fps: number
  cnvs: HTMLCanvasElement
  ctx: CanvasRenderingContext2D | null

  constructor({
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
    cnvs
  }: SpirographInputs) {
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
    this.cnvs = cnvs
    this.ctx = cnvs.getContext('2d')
  }

  calcCoords = () => {

    const {x, y} = calcSpirographCoords({r: this.r, R: this.R, d: this.d, angle: this.angle})

    this.x = x
    this.y = y
    this.angle += this.step
  }

  render = () => {
    if(this.ctx === null) return
    this.ctx.beginPath()
    this.ctx.arc(this.x + this.cnvs.width / 2, this.y + this.cnvs.height / 2, 5, 0, Math.PI * 2)
    this.ctx.fillStyle = this.hsla
    this.ctx.fill()

    if(this.colorType == 1) this.hsla = `hsla(${this.angle}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
    // else if(this.colorType == 2) this.hsla = this.hsla
  }

  clear = () => this.ctx?.clearRect(0, 0, this.cnvs.width, this.cnvs.height)
}

export {Spirograph, calcSpirographCoords}