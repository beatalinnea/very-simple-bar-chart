/**
 * The the main and only class for the BarChart module.
 *
 * @author Beata Eriksson <be222gr@student.lnu.se>
 * @version 1.1.0
 */

/**
 * Class for BarChart.
 */
export class BarChart {
  // The canvas element for the BarChart to be showed within
  #canvas

  // Array of Y values - amount of votes for each X value
  #yCollection = []

  // Array of X values - contains each unique value
  #xCollection = []

  // The headline - to be showed next to the polls.
  #headline

  // amounf of votes - to be showed next to the polls.
  #amountOfVotes

  // background color - default set to white.
  #backgroundColor = '#ffffff'

  /**
   * Constructor for canvas class.
   *
   * @param {HTMLCanvasElement} canvas - the canvas element
   * @param {number} width - the width of the canvas
   * @param {number} height - the height of the canvas
   */
  constructor (canvas, width, height) {
    this.#checkIfCanvas(canvas)
    this.#canvas = canvas
    this.context = canvas.getContext('2d')

    if (width && height) {
      this.#createBase(width, height)
    } else {
      this.#createBase(400, 300)
    }
  }

  /**
   * Check if the argument is a HTMLCanvasElement.
   *
   * @param {any} arg - The argument sent in when creating a new instance of the class.
   * @throws {Error} - The argument must be a HTMLCanvasElement.
   */
  #checkIfCanvas (arg) {
    if (!(arg instanceof HTMLCanvasElement)) {
      throw new Error('The argument must be a HTMLCanvasElement')
    }
  }

  /**
   * Will create the base for the BarChart to be showed within. If no height and width is set - default values will be used.
   *
   * @param {number} width - The width of the BarChart.
   * @param {number} height - The height of the BarChart.
   */
  #createBase (width, height) {
    this.#canvas.height = height
    this.#canvas.width = width
    this.#addBackground()
  }

  /**
   * Will add a background to the BarChart. If no color is set - default color will be used.
   */
  #addBackground () {
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, this.#canvas.height)
    this.#addFrame()
  }

  /**
   * Change the background color of the BarChart.
   *
   * @param {string} color - The color to be used as background.
   */
  changeBackgroundColor (color) {
    this.#backgroundColor = color
    this.#addBackground()
    this.#addExistingValues()
  }

  /**
   * Resize the BarChart.
   *
   * @param {number} width - The new width of the BarChart.
   * @param {number} height - The new height of the BarChart.
   */
  resize (width, height) {
    this.#createBase(width, height)
    this.#addExistingValues()
  }

  /**
   * Checks if there is any data or settings in the BarChart. If so - it will add the existing values.
   */
  #addExistingValues () {
    if (this.#hasData()) {
      this.#buildBars()
      this.#addBackgroundCounter()
    }
    if (this.#headline) {
      this.addHeadline(this.#headline)
    }
    if (this.#amountOfVotes) {
      this.addTotalVotes()
    }
  }

  /**
   * Add a frame to the BarChart.
   */
  #addFrame () {
    this.context.lineWidth = 5
    this.context.strokeRect(0, 0, this.#canvas.width, this.#canvas.height)
  }

  /**
   * Checks if there is any data in the BarChart.
   *
   * @returns {boolean} - true if there is data, false if not.
   */
  #hasData () {
    if (this.#xCollection.length > 0) {
      return true
    } else {
      return false
    }
  }

  /**
   * Add values to the BarChart.
   *
   * @param {any[]} data - The array of data to be added to the BarChart.
   */
  addValues (data) {
    if (!Array.isArray(data)) {
      throw new Error('The argument must be an array')
    }
    const sorted = this.#sortArray(data)
    if (this.#hasData()) {
      this.#xCollection = []
      this.#yCollection = []
      this.#createBase(this.#canvas.width, this.#canvas.height)
    }
    for (let i = 0; i < sorted.length; i++) {
      // NOTE: this would preferabbly be moved to a separate method.
      if (this.#xCollection.includes(sorted[i])) {
        const index = this.#xCollection.indexOf(sorted[i])
        this.#yCollection[index] = this.#yCollection[index] + 1
      } else {
        this.#xCollection.push(sorted[i])
        this.#yCollection.push(1)
      }
    }
    this.#buildBars()
    this.#addBackgroundCounter()
  }

  /**
   * Sort the array of values.
   *
   * @param {any[]} array - The array of values to be sorted.
   * @returns {any[]} - The sorted array.
   */
  #sortArray (array) {
    return Array.from(array)
      .sort((a, b) => {
        return a - b
      })
  }

  /**
   * Builds the bars for the BarChart.
   */
  #buildBars () {
    // divide with + 1 to keep marginal to the sides
    let barBasePoint = this.#canvas.width / (this.#xCollection.length + 1)
    const distanceBetweenBars = barBasePoint
    const maxValue = this.#checkMostVotes()

    // divide with + 1 to keep marginal to the top.
    const onePartOfHeight = this.#canvas.height / (maxValue + 1)

    for (let i = 0; i < this.#xCollection.length; i++) {
      const barHeightPoint = this.#canvas.height - (this.#yCollection[i] * onePartOfHeight)
      this.#drawOneBar(barBasePoint, barHeightPoint)

      // NOTE: adding text should be moved to a separate method.
      this.context.fillStyle = '#000000'
      this.context.font = '15px serif'
      this.context.fillText(`${this.#xCollection[i]}`, barBasePoint + 5, barHeightPoint - 5)
      barBasePoint = barBasePoint + distanceBetweenBars
    }
  }

  /**
   * Draw one bar.
   *
   * @param {number} base - The base point of the bar.
   * @param {number} top - The top point of the bar.
   */
  #drawOneBar (base, top) {
    this.context.beginPath()
    this.context.moveTo(base, this.#canvas.height)
    this.context.lineTo(base, top)
    this.context.closePath()
    this.context.stroke()
  }

  /**
   * Adds horisontal lines to the BarChart background to show the amount of votes for each poll.
   */
  #addBackgroundCounter () {
    const max = this.#checkMostVotes()
    this.context.lineWidth = 0.2
    const onePartOfHeight = this.#canvas.height / (max + 1)
    for (let i = 0; i < max; i++) {
      this.context.beginPath()
      this.context.moveTo(0, onePartOfHeight * (i + 1))
      this.context.lineTo(this.#canvas.width, onePartOfHeight * (i + 1))
      this.context.closePath()
      this.context.stroke()

      this.context.fillStyle = '#000000'
      this.context.font = '15px serif'
      this.context.fillText(`${max - i}`, 5, (onePartOfHeight * (i + 1) - 3))
    }
  }

  /**
   * Checks which poll has the most votes.
   *
   * @returns {number} - The number of votes for the poll with most votes.
   */
  #checkMostVotes () {
    let mostVotes = 0
    for (let i = 0; i < this.#yCollection.length; i++) {
      if (this.#yCollection[i] > mostVotes) {
        mostVotes = this.#yCollection[i]
      }
    }
    return mostVotes
  }

  /**
   * Views a headline to the BarChart.
   *
   * @param {string} text - The text to be used as headline.
   */
  addHeadline (text) {
    if (typeof text !== 'string') {
      throw new Error('The argument must be a string')
    }
    if (this.#headline) {
      this.#clearHeadline()
    }
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`${text}`, 15, 20)
    this.#headline = text
  }

  /**
   * Views the total amount of votes on the BarChart.
   */
  addTotalVotes () {
    const numberOfVotes = this.getAmountOfVotes()
    this.context.fillStyle = '#000000'
    this.context.font = '15px serif'
    this.context.fillText(`Votes: ${numberOfVotes}`, this.#canvas.width - 80, 20)
    this.#amountOfVotes = numberOfVotes
  }

  /**
   * Get the total amount of votes.
   *
   * @returns {number} - The total amount of votes.
   */
  getAmountOfVotes () {
    let voteCount = 0
    for (let i = 0; i < this.#yCollection.length; i++) {
      voteCount = voteCount + this.#yCollection[i]
    }
    return voteCount
  }

  /**
   * Clears the headline.
   */
  #clearHeadline () {
    this.#headline = null
    this.context.clearRect(0, 0, this.#canvas.width, 30)
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, 30)
    this.#addFrame()
  }

  /**
   * Removes the headline and/or the total amount of votes.
   */
  removeHeadline () {
    this.context.clearRect(0, 0, this.#canvas.width, 30)
    this.#headline = null
    this.#amountOfVotes = null
    this.context.fillStyle = this.#backgroundColor
    this.context.fillRect(0, 0, this.#canvas.width, 30)
    this.#addFrame()
  }
}