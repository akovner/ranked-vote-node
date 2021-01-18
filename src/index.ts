function widest_path(d: number[][]): number[][] {
    let c = d.length;
    let p: number[][] = [];

    for (let x = 0; x < c; x++) {
        p.push([]);
        for (let y = 0; y < c; y++) {
            p[x].push(0);
        }
    }

    for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
            if (i != j) {
                if (d[i][j] > d[j][i]) {
                    p[i][j] = d[i][j];
                } else {
                    p[i][j] = 0;
                }
            }
        }
    }

    for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
            if (i != j) {
                for (let k = 0; k < c; k++) {
                    if (i != k && j != k) {
                        p[j][k] = Math.max(p[j][k], Math.min(p[j][i], p[i][k]));
                    }
                }
            }
        }
    }

    return p;
}

function schulze_order(p: number[][]) {
    const c = p.length;
    // The who_wins function is designed for descending order,
    // hence the subtraction looks backwards
    let who_wins = function(a: number, b: number): number {
        return p[b][a] - p[a][b];
    }

    let out: number[] = [];
    for (let i = 0; i < c; i++) {
        out.push(i);
    }

    out.sort(who_wins);
    console.log(p);
    console.log(out);
    return out;
}

function schulze_score(p: number[][], o: number[]): number[] {
    const c = p.length;
    let last_beat = p[o[c-1]][o[c-2]];
    let total = last_beat;
    const out = [last_beat];

    for (let i = c-2; i > -1; i--) {
        last_beat = p[o[i]][o[i+1]] - p[o[i+1]][o[i]] + last_beat;
        out.unshift(last_beat);
        total += last_beat;
    }

    for (let i = 0; i < c; i++) {
        out[i] = out[i] / total;
    }

    return out;
}

class Condorcet {
    head2head: number[][];
    beatpath: number[][];
    order: number[];
    score: number[];

    constructor(head2head: number[][]) {
        this.head2head = head2head;
        this.beatpath = widest_path(head2head);
        this.order = schulze_order(this.beatpath);
        this.score = schulze_score(this.beatpath, this.order);
    }
}

export { Condorcet };

// 1# Input: d[i,j], the number of voters who prefer candidate i to candidate j.
// 2# Output: p[i,j], the strength of the strongest path from candidate i to candidate j.
// 3
// 4for i from 1 to C
// 5    for j from 1 to C
// 6        if (i ≠ j) then
// 7            if (d[i,j] > d[j,i]) then
// 8                p[i,j] := d[i,j]
// 9            else
// 10                p[i,j] := 0
// 11
// 12for i from 1 to C
// 13    for j from 1 to C
// 14        if (i ≠ j) then
// 15            for k from 1 to C
// 16                if (i ≠ k and j ≠ k) then
// 17                    p[j,k] := max (p[j,k], min (p[j,i], p[i,k]))