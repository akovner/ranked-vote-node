import { widest_path, schulze_order } from '../src/index';
import { assert } from 'chai';

describe('Widest path tests', () => {
    it('Check Wikipedia example', () => {
        let input: number[][] = [
            [0, 20, 26, 30, 22],
            [25, 0, 16, 33, 18],
            [19, 29, 0, 17, 24],
            [15, 12, 28, 0, 14],
            [23, 27, 21, 31, 0]];

        let expected1: number[][] = [
            [0, 28, 28, 30, 24],
            [25, 0, 28, 33, 24],
            [25, 29, 0, 29, 24],
            [25, 28, 28, 0, 24],
            [25, 28, 28, 31, 0]];

        const actual1 = widest_path(input);
        assert.deepStrictEqual(actual1, expected1);
        
        const actual2 = schulze_order(input);
        const expected2 = [4, 0, 2, 1, 3];
        assert.deepStrictEqual(actual2, expected2);
    });
});