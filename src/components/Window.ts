export default class Window {
  name: string
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

  get total () {
    return this.materialUsage * this.fabric.price
  }
}
