import { mkFabric } from '@/components/Window'

describe('mkFabric', () => {
  it('constructs a fabric object', () => {
    const input = {
      name: 'BoLove',
      price: 26,
      designName: 'P%s',
      designNo: 'TH305-%02d',
      designs: {
        '1':  {color: 'brown'},
        '18': {color: 'blue'}
      }
    }
    const expected = {
      name: 'BoLove',
      price: 26,
      designs: {
        '1':  {no: 'TH305-01', name: 'P1',  color: 'brown'},
        '18': {no: 'TH305-18', name: 'P18', color: 'blue'}
      }
    }
    expect(mkFabric(input)).toEqual(expected)
  })
})
