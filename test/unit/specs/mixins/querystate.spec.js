import { normalizeEntry } from '@/mixins/querystate'

describe('normalizeEntry', () => {
  it('normalizes entries', () => {
    const entry = { path: 'foo', def: 23 }
    expect(normalizeEntry(entry)).toEqual({ path: ['foo'], def: 23 })
  })
})
