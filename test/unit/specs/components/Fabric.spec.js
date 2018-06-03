import { mkFabric } from '@/components/Fabric'

describe('mkFabric', () => {
  it('constructs a fabric object', () => {
    const input = {
      name: 'BoLove',
      price: 26,
      designNameTemplate: 'P%s',
      designNoTemplate: 'TH305-%02d',
      designs: {
        '1':  {color: 'brown'},
        '18': {color: 'blue'}
      }
    }
    const expected = {
      key: 'bolove',
      name: 'BoLove',
      price: 26,
      designs: {
        '1':  {name: 'P1',  value: {design: '1',  no: 'TH305-01', color: 'brown'}},
        '18': {name: 'P18', value: {design: '18', no: 'TH305-18', color: 'blue'}}
      }
    }
    expect(mkFabric('bolove', input)).toEqual(expected)
  })
})
