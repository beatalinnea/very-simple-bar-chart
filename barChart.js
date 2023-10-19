/**
 * The the main class for the BarChart module.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.1.0
 */

import { CanvasDrawer } from './canvasDrawer.js'

/**
 * Representing the Bar Chart module for visualizing data.
 * This class provides functionality to create and display a bar chart on an HTML canvas element.
 */
export class BarChart {
  #canvas

  // The CanvasDrawer will be responsible for editing the canvas.
  #canvasDrawer

  // Where the users sent in data will be collected.
  #dataEntries = []

  // The users chosen headline for their bar chart.
  #headline

  /**
   * Constructor for canvas class. Possible to set width and height of the canvas.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element to be used.
   * @param {number} width - the width of the canvas - default 400.
   * @param {number} height - the height of the canvas - default 300.
   */
  constructor (canvas, width, height) {
    this.#validateCanvas(canvas)
    this.#canvasDrawer = new CanvasDrawer(canvas)
    this.#setSizeAndBackground(width || 400, height || 300)
  }

  #validateCanvas (arg) {
    if (!(arg instanceof HTMLCanvasElement)) {
      throw new Error('The argument must be a HTMLCanvasElement')
    }
    this.#canvas = arg
  }

  /**
   * Add values to the BarChart. Input data can be in the formats:
   * [{x: 'value', y: 'value'}, {x: 'value', y: 'value'}] or [x, x, x, ...] or:
   * [x, x, x, ...] where this would give x value 3 for y.
   *
   * @param {any[]} data - The array of data to be added to the BarChart.
   */
  addValues (data) {
    if (this.#hasData()) {
      this.#clearData()
    }
    // Check data is in the format: [{x: 'value', y: 'value'}, {x: 'value', y: 'value'}]
    if (data.length > 0 && typeof data[0] === 'object' && 'x' in data[0] && 'y' in data[0]) {
      this.#dataEntries = data
    } else {
      this.#convertToDataEntries(data)
    }
    this.#renderData()
  }

  /**
   * This method will change the size for the BarChart and re-render it.
   *
   * @param {number} width - the new width of the BarChart.
   * @param {number} height - the new height of the BarChart.
   */
  changeSize (width, height) {
    this.#setSizeAndBackground(width, height)
    this.#renderData()
  }

  /**
   * This method will change background color for the BarChart and re-render it.
   *
   * @param {string} color - the new background color of the BarChart.
   */
  changeBackgroundColor (color) {
    this.#canvasDrawer.setBackgroundColor(color)
    this.#renderData()
  }

  /**
   * Will add a chosen headline to the BarChart.
   *
   * @param {string} text - The text to be viewed within the BarChart.
   */
  addHeadline (text) {
    if (typeof text !== 'string') {
      throw new Error('The argument must be a string')
    }
    if (this.#headline) {
      this.clearHeadline()
    }
    this.#headline = text
    this.#canvasDrawer.addLeftHeadline(this.#headline)
  }

  /**
   * Will remove the headline from the BarChart.
   */
  clearHeadline () {
    this.#headline = null
    this.#renderData()
  }

  /**
   * Returns the total amount of votes (y values) for the BarChart.
   *
   * @returns {number} - the total amount of votes.
   */
  getAmountOfVotes () {
    return this.#dataEntries.reduce((total, point) => total + point.y, 0)
  }

  #convertToDataEntries (values) {
    for (const value of values) {
      const existingEntry = this.#dataEntries.find((entry) => entry.x === value)
      if (existingEntry) {
        existingEntry.y++
      } else {
        this.#dataEntries.push({ x: value, y: 1 })
      }
    }
  }

  #renderData () {
    if (this.#hasData()) {
      this.#sortDataEntries()
      this.#renderBars()
      this.#addBackgroundLines()
      this.#canvasDrawer.addRightHeadline(`Total: ${this.getAmountOfVotes()}`)
    }
    if (this.#headline) {
      this.addHeadline(this.#headline)
    }
  }

  #hasData () {
    return this.#dataEntries.length > 0
  }

  #sortDataEntries () {
    this.#dataEntries.sort((a, b) => a.x - b.x)
  }

  #renderBars () {
    const maxValue = this.#getMostAmountOfVotes()
    let barBasePoint = this.#calculateBarBasePoint()

    for (const data of this.#dataEntries) {
      const barHeightPoint = this.#calculateBarHeightPoint(data, maxValue)
      this.#canvasDrawer.drawBar(barBasePoint, barHeightPoint)
      this.#canvasDrawer.addBarText(data.x, barBasePoint)
      barBasePoint += this.#calculateDistanceBetweenBars()
    }
  }

  #calculateBarBasePoint () {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  #calculateBarHeightPoint (dataPoint, maxValue) {
    const onePartOfHeight = this.#canvas.height / (maxValue + 1)
    return this.#canvas.height - (dataPoint.y * onePartOfHeight)
  }

  #calculateDistanceBetweenBars () {
    return this.#canvas.width / (this.#dataEntries.length + 1)
  }

  #addBackgroundLines () {
    const maxVotes = this.#getMostAmountOfVotes()
    const onePartOfHeight = this.#canvas.height / (maxVotes + 1)

    for (let i = 0; i < maxVotes; i++) {
      const lineHeight = onePartOfHeight * (i + 1)
      this.#canvasDrawer.drawHorizontalLine(lineHeight)
      this.#canvasDrawer.addAxisValue(lineHeight, maxVotes - i)
    }
  }

  #getMostAmountOfVotes () {
    if (this.#dataEntries.length === 0) {
      throw new Error('There is no data to be shown')
    }
    let mostVotes = this.#dataEntries[0].y
    for (const entry of this.#dataEntries) {
      if (entry.y > mostVotes) {
        mostVotes = entry.y
      }
    }
    return mostVotes
  }

  #setSizeAndBackground (width, height) {
    this.#canvas.height = height
    this.#canvas.width = width
    this.#canvasDrawer.drawBackground()
  }

  #clearData () {
    this.#dataEntries = []
    this.clearHeadline()
    this.#canvasDrawer.clearCanvas()
  }
}
