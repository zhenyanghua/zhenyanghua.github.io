import { kmpSearch } from '../../public/utils/string';

describe('kmpSearch', () => {
    it('it should return the starting 0-based index of the matched pattern', () => {
        expect(kmpSearch('aba', 'ababa')).toEqual([0, 2])
        expect(kmpSearch('abac', 'ababac')).toEqual([2])
        expect(kmpSearch('aba', 'cababa')).toEqual([1, 3])
        expect(kmpSearch('ababc', 'cababa')).toEqual([])
        expect(kmpSearch('', 'ab')).toEqual([])
    })
})