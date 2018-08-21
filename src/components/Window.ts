export default class Window {
  name: string
  fixation = {key: 'none', price: 0, mounting: 'ceiling'}
  width = 240
  drop = 230
  fabric = {key: 'custom', design: 'custom', price: 26}
  heading = 'doublePleat'
  ratio = 2
  remarks = ''

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
