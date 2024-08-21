'use strict'

function getNode(node) {
  return document.querySelector(node)
}

const cnvs = getNode('canvas'),
inrWth = window.innerWidth,
inrHht = window.innerHeight

cnvs.width = inrWth
cnvs.height = inrHht
cnvs.style.width = inrWth
cnvs.style.height = inrHht

const ctx = cnvs.getContext('2d')

function CreateSpirograph(r, d, R, calcCoords, calcFillStyle, A = 0, saturation = 100, lightness = 50, alpha = 0.2, colorType = 1, step = 1, speedInterval = 1, scale = 2) {
    this.scale = scale,
    this.r = r * this.scale,
    this.d = d * this.scale,
    this.R = R * this.scale,
    this.A = A,
    this.x = null,
    this.y = null,
    this.saturation = saturation,
    this.lightness = lightness,
    this.alpha = alpha,
    this.hsla = `hsla(${this.A}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`,
    this.colorType = colorType,
    this.step = step,
    this.speedInterval = speedInterval,
    this.calcCoords = calcCoords,
    this.calcFillStyle = calcFillStyle
}

function calcCoords() {
  this.x = (this.R - this.r) * Math.cos(this.A * Math.PI / 180) + this.d * Math.cos(((this.R - this.r) / this.r) * this.A * Math.PI / 180)
  this.y = (this.R - this.r) * Math.sin(this.A * Math.PI / 180) + this.d * Math.sin(((this.R - this.r) / this.r) * this.A * Math.PI / 180)
  this.A += this.step
}

function calcFillStyle() {
  ctx.beginPath()
  ctx.arc(spirograph.x + inrWth / 2, spirograph.y + inrHht / 2, 5, Math.PI * 2, false)
  ctx.fillStyle = this.hsla
  ctx.fill()

  if(this.colorType == 1) this.hsla = `hsla(${this.A}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
  else if(this.colorType == 2) this.hsla = this.hsla
}

const spirograph = new CreateSpirograph(70, 35, 20, calcCoords, calcFillStyle)

let isInterval = false, spirographAnim

function funSpirographAnim() {

  isInterval ? clearInterval(spirographAnim) : {}

  spirographAnim = setInterval(() => {
    isInterval = true
    spirograph.calcCoords()
    spirograph.calcFillStyle()

  }, spirograph.speedInterval)

  if(spirograph.speedInterval <= 0) clearInterval(spirographAnim)
}

funSpirographAnim()
