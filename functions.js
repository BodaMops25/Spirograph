function calcSpirographCoords({ r, R, d, angle } = {}) {
  const radiusDelta = R - r,
        angleRadians = angle / 180 * Math.PI

  return {
    x: +(radiusDelta * Math.cos(angleRadians) + d * Math.cos((radiusDelta / r) * angleRadians)),
    y: +(radiusDelta * Math.sin(angleRadians) + d * Math.sin((radiusDelta / r) * angleRadians))
  }
}

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
} = {}) {

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

    const {x, y} = calcSpirographCoords({ r: this.r, R: this.R, d: this.d, angle: this.angle })

    this.x = x
    this.y = y
    this.angle += this.step
  }

  this.render = () => {
    this.ctx.beginPath()
    this.ctx.arc(this.x + cnvs.width / 2, this.y + cnvs.height / 2, 5, 0, Math.PI * 2)
    this.ctx.fillStyle = this.hsla
    this.ctx.fill()

    if (this.colorType == 1) this.hsla = `hsla(${this.angle}, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
    else if (this.colorType == 2) this.hsla = this.hsla
  }

  this.clear = () => ctx.clearRect(0, 0, cnvs.width, cnvs.height)
}

export {Spirograph, calcSpirographCoords}