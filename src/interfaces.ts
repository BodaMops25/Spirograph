export type calcSpirographCoords = {
    r?: number,
    R?: number,
    d?: number,
    angle?: number
}

export type SpirographInputs = {
    r?: number,
    d?: number,
    R?: number,
    angle?: number,
    saturation?: number,
    lightness?: number,
    alpha?: number,
    colorType?: number,
    step?: number,
    fps?: number,
    scale?: number,
    cnvs: HTMLCanvasElement
}