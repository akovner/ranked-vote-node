function widest_path(d: number[][]) {
    let c = d.length;
    let p: number[][];
    p = [];

    for (let i = 0; i < c; i++) {
        p.push([]);
        for (let j = 0; j < c; j++) {
            if (i != j) {
                if (d[i][j] > d[j][i]) {
                    p[i].push(d[i][j]);
                } else {
                    p[i].push(0)
                }
            }
        }
    }

    for (let i = 0; i < c; i++) {
        for (let j = 0; j < c; j++) {
            if (i != j) {
                for (let k = 0; k < c; k++) {
                    if (i != k && j != k) {
                        p[j][k] = Math.max(p[j][k], Math.max(p[j][i], p[i][k]));
                    }
                }
            }
        }
    }
}

export { widest_path };

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