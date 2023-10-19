/**
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.1.0
 */

/**
 * Class that provides functions for drawing on, adding text to and editing a canvas element.
 */
export class CanvasDrawer {
  #canvas
  #context

  #backgroundColor = '#ffffff'
  #drawColor = '#000000'
  #margin = 5
  #font = '14px Arial'

  constructor (canvas) {
    this.#validateCanvas(canvas)
    this.#context = canvas.getContext('2d')
  }

  #validateCanvas (arg) {
    if (!(arg instanceof HTMLCanvasElement)) {
      throw new Error('The argument must be a HTMLCanvasElement')
    }
    this.#canvas = arg
  }

  setDrawColor (color) {
    if (!/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)) {
      throw new Error('Invalid color format. Use a valid hexadecimal color code (e.g., "#FF0000").')
    }
    this.#drawColor = color
  }

  setBackgroundColor (color) {
    this.#backgroundColor = color
    this.drawBackground(this.#backgroundColor)
  }

  drawBackground () {
    this.#context.fillStyle = this.#backgroundColor
    this.#context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#drawFrame()
  }

  #drawFrame () {
    this.#context.lineWidth = 5
    this.#context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  drawBar (base, top) {
    // If the bar is too small, give it some height.
    if (top === this.#canvas.height) {
      top -= this.#margin
    }
    this.#context.beginPath()
    this.#context.moveTo(base, this.#canvas.height)
    this.#context.lineTo(base, top)
    this.#context.closePath()
    this.#context.stroke()
  }

  drawHorizontalLine (y) {
    this.#context.strokeStyle = this.#drawColor
    this.#context.lineWidth = 0.2
    this.#context.beginPath()
    this.#context.moveTo(0, y)
    this.#context.lineTo(this.#canvas.width, y)
    this.#context.closePath()
    this.#context.stroke()
  }

  addAxisValue (height, valueText) {
    this.#context.lineWidth = 0.2
    this.#context.fillStyle = this.#drawColor
    this.#context.fillText(`${valueText}`, this.#margin, (height - 5))
  }

  addBarText (text, barBasePoint) {
    this.#context.fillStyle = this.#drawColor
    const textWidth = this.#context.measureText(text).width
    const xPosition = barBasePoint - textWidth - this.#margin
    const yPosition = this.#canvas.height - this.#margin

    this.drawText(text, xPosition, yPosition)
  }

  addLeftHeadline (text) {
    const x = this.#canvas.width - 80
    const y = 20
    this.drawText(`${text}`, x, y)
  }

  addRightHeadline (text) {
    const x = 15
    const y = 20
    this.drawText(`${text}`, x, y)
  }

  drawText (text, x, y) {
    this.#context.fillStyle = this.#drawColor
    this.#context.font = this.#font
    this.#context.fillText(text, x, y)
  }

  clearCanvas () {
    this.#context.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.drawBackground(this.#backgroundColor)
  }
}
