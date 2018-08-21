export default class Window {
  name: string
  fixation = {key: 'track', price: 15, mounting: 'ceiling'}
  width = 240
  drop = 230
  fabric = {key: 'custom', design: 'custom', price: 26}
  heading = 'deepPleat'
  ratio = 2

  constructor (name: string) {
    this.name = name
  }

  get materialUsage () {
    return this.width * this.ratio / 100
  }

  get fixationTotal () {
    return this.width / 100 * this.fixation.price
  }

  get curtainsTotal () {
    return this.materialUsage * this.fabric.price
  }

  get total () {
    return this.fixationTotal + this.curtainsTotal
  }
}
