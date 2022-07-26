var vn = Object.defineProperty;
var Sn = (T, p, l) => p in T ? vn(T, p, {enumerable: !0, configurable: !0, writable: !0, value: l}) : T[p] = l;
var K = (T, p, l) => (Sn(T, typeof p != "symbol" ? p + "" : p, l), l);
var En = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};

function An(T) {
    return T && T.__esModule && Object.prototype.hasOwnProperty.call(T, "default") ? T.default : T
}

class Rn {
    constructor(p) {
        K(this, "_snapshotStorage");
        K(this, "_snapshotIds", new Map);
        this._snapshotStorage = p
    }

    serveSnapshot(p, l, k) {
        const z = this._snapshot(p.substring(9), l);
        if (!z) return new Response(null, {status: 404});
        const M = z.render();
        return this._snapshotIds.set(k, z), new Response(M.html, {status: 200, headers: {"Content-Type": "text/html"}})
    }

    serveSnapshotInfo(p, l) {
        const k = this._snapshot(p.substring(13), l);
        return this._respondWithJson(k ? {
            viewport: k.viewport(),
            url: k.snapshot().frameUrl
        } : {error: "No snapshot found"})
    }

    _snapshot(p, l) {
        const k = l.get("name");
        return this._snapshotStorage.snapshotByName(p.slice(1), k)
    }

    _respondWithJson(p) {
        return new Response(JSON.stringify(p), {
            status: 200,
            headers: {"Cache-Control": "public, max-age=31536000", "Content-Type": "application/json"}
        })
    }

    async serveResource(p, l) {
        const k = this._snapshotIds.get(l), z = Un(p), M = k == null ? void 0 : k.resourceByUrl(z);
        if (!M) return new Response(null, {status: 404});
        const W = M.response.content._sha1,
            D = W ? await this._snapshotStorage.resourceContent(W) || new Blob([]) : new Blob([]);
        let H = M.response.content.mimeType;
        /^text\/|^application\/(javascript|json)/.test(H) && !H.includes("charset") && (H = `${H}; charset=utf-8`);
        const j = new Headers;
        j.set("Content-Type", H);
        for (const {name: rt, value: bt} of M.response.headers) j.set(rt, bt);
        j.delete("Content-Encoding"), j.delete("Access-Control-Allow-Origin"), j.set("Access-Control-Allow-Origin", "*"), j.delete("Content-Length"), j.set("Content-Length", String(D.size)), j.set("Cache-Control", "public, max-age=31536000");
        const {status: Z} = M.response, dt = Z === 101 || Z === 204 || Z === 205 || Z === 304;
        return new Response(dt ? null : D, {headers: j, status: M.response.status, statusText: M.response.statusText})
    }
}

function Un(T) {
    try {
        const p = new URL(T);
        return p.hash = "", p.toString()
    } catch {
        return T
    }
}

var qt = {exports: {}};
(function (T, p) {
    (function (l, k) {
        k(p)
    })(En, function (l) {
        const W = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535],
            D = [96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 192, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 160, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 224, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 144, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 208, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 176, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 240, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 200, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 168, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 232, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 152, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 216, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 184, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 248, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 196, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 164, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 228, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 148, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 212, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 180, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 244, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 204, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 172, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 236, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 156, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 220, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 188, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 252, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 194, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 162, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 226, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 146, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 210, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 178, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 242, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 202, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 170, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 234, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 154, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 218, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 186, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 250, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 198, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 166, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 230, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 150, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 214, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 182, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 246, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 206, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 174, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 238, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 158, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 222, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 190, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 254, 96, 7, 256, 0, 8, 80, 0, 8, 16, 84, 8, 115, 82, 7, 31, 0, 8, 112, 0, 8, 48, 0, 9, 193, 80, 7, 10, 0, 8, 96, 0, 8, 32, 0, 9, 161, 0, 8, 0, 0, 8, 128, 0, 8, 64, 0, 9, 225, 80, 7, 6, 0, 8, 88, 0, 8, 24, 0, 9, 145, 83, 7, 59, 0, 8, 120, 0, 8, 56, 0, 9, 209, 81, 7, 17, 0, 8, 104, 0, 8, 40, 0, 9, 177, 0, 8, 8, 0, 8, 136, 0, 8, 72, 0, 9, 241, 80, 7, 4, 0, 8, 84, 0, 8, 20, 85, 8, 227, 83, 7, 43, 0, 8, 116, 0, 8, 52, 0, 9, 201, 81, 7, 13, 0, 8, 100, 0, 8, 36, 0, 9, 169, 0, 8, 4, 0, 8, 132, 0, 8, 68, 0, 9, 233, 80, 7, 8, 0, 8, 92, 0, 8, 28, 0, 9, 153, 84, 7, 83, 0, 8, 124, 0, 8, 60, 0, 9, 217, 82, 7, 23, 0, 8, 108, 0, 8, 44, 0, 9, 185, 0, 8, 12, 0, 8, 140, 0, 8, 76, 0, 9, 249, 80, 7, 3, 0, 8, 82, 0, 8, 18, 85, 8, 163, 83, 7, 35, 0, 8, 114, 0, 8, 50, 0, 9, 197, 81, 7, 11, 0, 8, 98, 0, 8, 34, 0, 9, 165, 0, 8, 2, 0, 8, 130, 0, 8, 66, 0, 9, 229, 80, 7, 7, 0, 8, 90, 0, 8, 26, 0, 9, 149, 84, 7, 67, 0, 8, 122, 0, 8, 58, 0, 9, 213, 82, 7, 19, 0, 8, 106, 0, 8, 42, 0, 9, 181, 0, 8, 10, 0, 8, 138, 0, 8, 74, 0, 9, 245, 80, 7, 5, 0, 8, 86, 0, 8, 22, 192, 8, 0, 83, 7, 51, 0, 8, 118, 0, 8, 54, 0, 9, 205, 81, 7, 15, 0, 8, 102, 0, 8, 38, 0, 9, 173, 0, 8, 6, 0, 8, 134, 0, 8, 70, 0, 9, 237, 80, 7, 9, 0, 8, 94, 0, 8, 30, 0, 9, 157, 84, 7, 99, 0, 8, 126, 0, 8, 62, 0, 9, 221, 82, 7, 27, 0, 8, 110, 0, 8, 46, 0, 9, 189, 0, 8, 14, 0, 8, 142, 0, 8, 78, 0, 9, 253, 96, 7, 256, 0, 8, 81, 0, 8, 17, 85, 8, 131, 82, 7, 31, 0, 8, 113, 0, 8, 49, 0, 9, 195, 80, 7, 10, 0, 8, 97, 0, 8, 33, 0, 9, 163, 0, 8, 1, 0, 8, 129, 0, 8, 65, 0, 9, 227, 80, 7, 6, 0, 8, 89, 0, 8, 25, 0, 9, 147, 83, 7, 59, 0, 8, 121, 0, 8, 57, 0, 9, 211, 81, 7, 17, 0, 8, 105, 0, 8, 41, 0, 9, 179, 0, 8, 9, 0, 8, 137, 0, 8, 73, 0, 9, 243, 80, 7, 4, 0, 8, 85, 0, 8, 21, 80, 8, 258, 83, 7, 43, 0, 8, 117, 0, 8, 53, 0, 9, 203, 81, 7, 13, 0, 8, 101, 0, 8, 37, 0, 9, 171, 0, 8, 5, 0, 8, 133, 0, 8, 69, 0, 9, 235, 80, 7, 8, 0, 8, 93, 0, 8, 29, 0, 9, 155, 84, 7, 83, 0, 8, 125, 0, 8, 61, 0, 9, 219, 82, 7, 23, 0, 8, 109, 0, 8, 45, 0, 9, 187, 0, 8, 13, 0, 8, 141, 0, 8, 77, 0, 9, 251, 80, 7, 3, 0, 8, 83, 0, 8, 19, 85, 8, 195, 83, 7, 35, 0, 8, 115, 0, 8, 51, 0, 9, 199, 81, 7, 11, 0, 8, 99, 0, 8, 35, 0, 9, 167, 0, 8, 3, 0, 8, 131, 0, 8, 67, 0, 9, 231, 80, 7, 7, 0, 8, 91, 0, 8, 27, 0, 9, 151, 84, 7, 67, 0, 8, 123, 0, 8, 59, 0, 9, 215, 82, 7, 19, 0, 8, 107, 0, 8, 43, 0, 9, 183, 0, 8, 11, 0, 8, 139, 0, 8, 75, 0, 9, 247, 80, 7, 5, 0, 8, 87, 0, 8, 23, 192, 8, 0, 83, 7, 51, 0, 8, 119, 0, 8, 55, 0, 9, 207, 81, 7, 15, 0, 8, 103, 0, 8, 39, 0, 9, 175, 0, 8, 7, 0, 8, 135, 0, 8, 71, 0, 9, 239, 80, 7, 9, 0, 8, 95, 0, 8, 31, 0, 9, 159, 84, 7, 99, 0, 8, 127, 0, 8, 63, 0, 9, 223, 82, 7, 27, 0, 8, 111, 0, 8, 47, 0, 9, 191, 0, 8, 15, 0, 8, 143, 0, 8, 79, 0, 9, 255],
            H = [80, 5, 1, 87, 5, 257, 83, 5, 17, 91, 5, 4097, 81, 5, 5, 89, 5, 1025, 85, 5, 65, 93, 5, 16385, 80, 5, 3, 88, 5, 513, 84, 5, 33, 92, 5, 8193, 82, 5, 9, 90, 5, 2049, 86, 5, 129, 192, 5, 24577, 80, 5, 2, 87, 5, 385, 83, 5, 25, 91, 5, 6145, 81, 5, 7, 89, 5, 1537, 85, 5, 97, 93, 5, 24577, 80, 5, 4, 88, 5, 769, 84, 5, 49, 92, 5, 12289, 82, 5, 13, 90, 5, 3073, 86, 5, 193, 192, 5, 24577],
            B = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
            j = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 112, 112],
            Z = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577],
            dt = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13],
            rt = 15;

        function bt() {
            let n, e, t, r, a, c;

            function d(m, g, v, U, N, L, s, f, i, o, u) {
                let w, S, x, b, h, y, C, R, A, E, F, O, V, I, q;
                E = 0, h = v;
                do t[m[g + E]]++, E++, h--; while (h !== 0);
                if (t[0] == v) return s[0] = -1, f[0] = 0, 0;
                for (R = f[0], y = 1; y <= rt && t[y] === 0; y++) ;
                for (C = y, R < y && (R = y), h = rt; h !== 0 && t[h] === 0; h--) ;
                for (x = h, R > h && (R = h), f[0] = R, I = 1 << y; y < h; y++, I <<= 1) if ((I -= t[y]) < 0) return -3;
                if ((I -= t[h]) < 0) return -3;
                for (t[h] += I, c[1] = y = 0, E = 1, V = 2; --h != 0;) c[V] = y += t[E], V++, E++;
                h = 0, E = 0;
                do (y = m[g + E]) !== 0 && (u[c[y]++] = h), E++; while (++h < v);
                for (v = c[x], c[0] = h = 0, E = 0, b = -1, O = -R, a[0] = 0, F = 0, q = 0; C <= x; C++) for (w = t[C]; w-- != 0;) {
                    for (; C > O + R;) {
                        if (b++, O += R, q = x - O, q = q > R ? R : q, (S = 1 << (y = C - O)) > w + 1 && (S -= w + 1, V = C, y < q)) for (; ++y < q && !((S <<= 1) <= t[++V]);) S -= t[V];
                        if (q = 1 << y, o[0] + q > 1440) return -3;
                        a[b] = F = o[0], o[0] += q, b !== 0 ? (c[b] = h, r[0] = y, r[1] = R, y = h >>> O - R, r[2] = F - a[b - 1] - y, i.set(r, 3 * (a[b - 1] + y))) : s[0] = F
                    }
                    for (r[1] = C - O, E >= v ? r[0] = 192 : u[E] < U ? (r[0] = u[E] < 256 ? 0 : 96, r[2] = u[E++]) : (r[0] = L[u[E] - U] + 16 + 64, r[2] = N[u[E++] - U]), S = 1 << C - O, y = h >>> O; y < q; y += S) i.set(r, 3 * (F + y));
                    for (y = 1 << C - 1; (h & y) != 0; y >>>= 1) h ^= y;
                    for (h ^= y, A = (1 << O) - 1; (h & A) != c[b];) b--, O -= R, A = (1 << O) - 1
                }
                return I !== 0 && x != 1 ? -5 : 0
            }

            function _(m) {
                let g;
                for (n || (n = [], e = [], t = new Int32Array(16), r = [], a = new Int32Array(rt), c = new Int32Array(16)), e.length < m && (e = []), g = 0; g < m; g++) e[g] = 0;
                for (g = 0; g < 16; g++) t[g] = 0;
                for (g = 0; g < 3; g++) r[g] = 0;
                a.set(t.subarray(0, rt), 0), c.set(t.subarray(0, 16), 0)
            }

            this.inflate_trees_bits = function (m, g, v, U, N) {
                let L;
                return _(19), n[0] = 0, L = d(m, 0, 19, 19, null, null, v, g, U, n, e), L == -3 ? N.msg = "oversubscribed dynamic bit lengths tree" : L != -5 && g[0] !== 0 || (N.msg = "incomplete dynamic bit lengths tree", L = -3), L
            }, this.inflate_trees_dynamic = function (m, g, v, U, N, L, s, f, i) {
                let o;
                return _(288), n[0] = 0, o = d(v, 0, m, 257, B, j, L, U, f, n, e), o != 0 || U[0] === 0 ? (o == -3 ? i.msg = "oversubscribed literal/length tree" : o != -4 && (i.msg = "incomplete literal/length tree", o = -3), o) : (_(288), o = d(v, m, g, 0, Z, dt, s, N, f, n, e), o != 0 || N[0] === 0 && m > 257 ? (o == -3 ? i.msg = "oversubscribed distance tree" : o == -5 ? (i.msg = "incomplete distance tree", o = -3) : o != -4 && (i.msg = "empty distance tree with lengths", o = -3), o) : 0)
            }
        }

        bt.inflate_trees_fixed = function (n, e, t, r) {
            return n[0] = 9, e[0] = 5, t[0] = D, r[0] = H, 0
        };

        function Ye() {
            const n = this;
            let e, t, r, a, c = 0, d = 0, _ = 0, m = 0, g = 0, v = 0, U = 0, N = 0, L = 0, s = 0;

            function f(i, o, u, w, S, x, b, h) {
                let y, C, R, A, E, F, O, V, I, q, ct, lt, P, wt, G, $;
                O = h.next_in_index, V = h.avail_in, E = b.bitb, F = b.bitk, I = b.write, q = I < b.read ? b.read - I - 1 : b.end - I, ct = W[i], lt = W[o];
                do {
                    for (; F < 20;) V--, E |= (255 & h.read_byte(O++)) << F, F += 8;
                    if (y = E & ct, C = u, R = w, $ = 3 * (R + y), (A = C[$]) !== 0) for (; ;) {
                        if (E >>= C[$ + 1], F -= C[$ + 1], (16 & A) != 0) {
                            for (A &= 15, P = C[$ + 2] + (E & W[A]), E >>= A, F -= A; F < 15;) V--, E |= (255 & h.read_byte(O++)) << F, F += 8;
                            for (y = E & lt, C = S, R = x, $ = 3 * (R + y), A = C[$]; ;) {
                                if (E >>= C[$ + 1], F -= C[$ + 1], (16 & A) != 0) {
                                    for (A &= 15; F < A;) V--, E |= (255 & h.read_byte(O++)) << F, F += 8;
                                    if (wt = C[$ + 2] + (E & W[A]), E >>= A, F -= A, q -= P, I >= wt) G = I - wt, I - G > 0 && 2 > I - G ? (b.window[I++] = b.window[G++], b.window[I++] = b.window[G++], P -= 2) : (b.window.set(b.window.subarray(G, G + 2), I), I += 2, G += 2, P -= 2); else {
                                        G = I - wt;
                                        do G += b.end; while (G < 0);
                                        if (A = b.end - G, P > A) {
                                            if (P -= A, I - G > 0 && A > I - G) do b.window[I++] = b.window[G++]; while (--A != 0); else b.window.set(b.window.subarray(G, G + A), I), I += A, G += A, A = 0;
                                            G = 0
                                        }
                                    }
                                    if (I - G > 0 && P > I - G) do b.window[I++] = b.window[G++]; while (--P != 0); else b.window.set(b.window.subarray(G, G + P), I), I += P, G += P, P = 0;
                                    break
                                }
                                if ((64 & A) != 0) return h.msg = "invalid distance code", P = h.avail_in - V, P = F >> 3 < P ? F >> 3 : P, V += P, O -= P, F -= P << 3, b.bitb = E, b.bitk = F, h.avail_in = V, h.total_in += O - h.next_in_index, h.next_in_index = O, b.write = I, -3;
                                y += C[$ + 2], y += E & W[A], $ = 3 * (R + y), A = C[$]
                            }
                            break
                        }
                        if ((64 & A) != 0) return (32 & A) != 0 ? (P = h.avail_in - V, P = F >> 3 < P ? F >> 3 : P, V += P, O -= P, F -= P << 3, b.bitb = E, b.bitk = F, h.avail_in = V, h.total_in += O - h.next_in_index, h.next_in_index = O, b.write = I, 1) : (h.msg = "invalid literal/length code", P = h.avail_in - V, P = F >> 3 < P ? F >> 3 : P, V += P, O -= P, F -= P << 3, b.bitb = E, b.bitk = F, h.avail_in = V, h.total_in += O - h.next_in_index, h.next_in_index = O, b.write = I, -3);
                        if (y += C[$ + 2], y += E & W[A], $ = 3 * (R + y), (A = C[$]) === 0) {
                            E >>= C[$ + 1], F -= C[$ + 1], b.window[I++] = C[$ + 2], q--;
                            break
                        }
                    } else E >>= C[$ + 1], F -= C[$ + 1], b.window[I++] = C[$ + 2], q--
                } while (q >= 258 && V >= 10);
                return P = h.avail_in - V, P = F >> 3 < P ? F >> 3 : P, V += P, O -= P, F -= P << 3, b.bitb = E, b.bitk = F, h.avail_in = V, h.total_in += O - h.next_in_index, h.next_in_index = O, b.write = I, 0
            }

            n.init = function (i, o, u, w, S, x) {
                e = 0, U = i, N = o, r = u, L = w, a = S, s = x, t = null
            }, n.proc = function (i, o, u) {
                let w, S, x, b, h, y, C, R = 0, A = 0, E = 0;
                for (E = o.next_in_index, b = o.avail_in, R = i.bitb, A = i.bitk, h = i.write, y = h < i.read ? i.read - h - 1 : i.end - h; ;) switch (e) {
                    case 0:
                        if (y >= 258 && b >= 10 && (i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, u = f(U, N, r, L, a, s, i, o), E = o.next_in_index, b = o.avail_in, R = i.bitb, A = i.bitk, h = i.write, y = h < i.read ? i.read - h - 1 : i.end - h, u != 0)) {
                            e = u == 1 ? 7 : 9;
                            break
                        }
                        _ = U, t = r, d = L, e = 1;
                    case 1:
                        for (w = _; A < w;) {
                            if (b === 0) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                            u = 0, b--, R |= (255 & o.read_byte(E++)) << A, A += 8
                        }
                        if (S = 3 * (d + (R & W[w])), R >>>= t[S + 1], A -= t[S + 1], x = t[S], x === 0) {
                            m = t[S + 2], e = 6;
                            break
                        }
                        if ((16 & x) != 0) {
                            g = 15 & x, c = t[S + 2], e = 2;
                            break
                        }
                        if ((64 & x) == 0) {
                            _ = x, d = S / 3 + t[S + 2];
                            break
                        }
                        if ((32 & x) != 0) {
                            e = 7;
                            break
                        }
                        return e = 9, o.msg = "invalid literal/length code", u = -3, i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                    case 2:
                        for (w = g; A < w;) {
                            if (b === 0) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                            u = 0, b--, R |= (255 & o.read_byte(E++)) << A, A += 8
                        }
                        c += R & W[w], R >>= w, A -= w, _ = N, t = a, d = s, e = 3;
                    case 3:
                        for (w = _; A < w;) {
                            if (b === 0) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                            u = 0, b--, R |= (255 & o.read_byte(E++)) << A, A += 8
                        }
                        if (S = 3 * (d + (R & W[w])), R >>= t[S + 1], A -= t[S + 1], x = t[S], (16 & x) != 0) {
                            g = 15 & x, v = t[S + 2], e = 4;
                            break
                        }
                        if ((64 & x) == 0) {
                            _ = x, d = S / 3 + t[S + 2];
                            break
                        }
                        return e = 9, o.msg = "invalid distance code", u = -3, i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                    case 4:
                        for (w = g; A < w;) {
                            if (b === 0) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                            u = 0, b--, R |= (255 & o.read_byte(E++)) << A, A += 8
                        }
                        v += R & W[w], R >>= w, A -= w, e = 5;
                    case 5:
                        for (C = h - v; C < 0;) C += i.end;
                        for (; c !== 0;) {
                            if (y === 0 && (h == i.end && i.read !== 0 && (h = 0, y = h < i.read ? i.read - h - 1 : i.end - h), y === 0 && (i.write = h, u = i.inflate_flush(o, u), h = i.write, y = h < i.read ? i.read - h - 1 : i.end - h, h == i.end && i.read !== 0 && (h = 0, y = h < i.read ? i.read - h - 1 : i.end - h), y === 0))) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                            i.window[h++] = i.window[C++], y--, C == i.end && (C = 0), c--
                        }
                        e = 0;
                        break;
                    case 6:
                        if (y === 0 && (h == i.end && i.read !== 0 && (h = 0, y = h < i.read ? i.read - h - 1 : i.end - h), y === 0 && (i.write = h, u = i.inflate_flush(o, u), h = i.write, y = h < i.read ? i.read - h - 1 : i.end - h, h == i.end && i.read !== 0 && (h = 0, y = h < i.read ? i.read - h - 1 : i.end - h), y === 0))) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                        u = 0, i.window[h++] = m, y--, e = 0;
                        break;
                    case 7:
                        if (A > 7 && (A -= 8, b++, E--), i.write = h, u = i.inflate_flush(o, u), h = i.write, y = h < i.read ? i.read - h - 1 : i.end - h, i.read != i.write) return i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                        e = 8;
                    case 8:
                        return u = 1, i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                    case 9:
                        return u = -3, i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u);
                    default:
                        return u = -2, i.bitb = R, i.bitk = A, o.avail_in = b, o.total_in += E - o.next_in_index, o.next_in_index = E, i.write = h, i.inflate_flush(o, u)
                }
            }, n.free = function () {
            }
        }

        const $t = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];

        function Xe(n, e) {
            const t = this;
            let r, a = 0, c = 0, d = 0, _ = 0;
            const m = [0], g = [0], v = new Ye;
            let U = 0, N = new Int32Array(4320);
            const L = new bt;
            t.bitk = 0, t.bitb = 0, t.window = new Uint8Array(e), t.end = e, t.read = 0, t.write = 0, t.reset = function (s, f) {
                f && (f[0] = 0), a == 6 && v.free(s), a = 0, t.bitk = 0, t.bitb = 0, t.read = t.write = 0
            }, t.reset(n, null), t.inflate_flush = function (s, f) {
                let i, o, u;
                return o = s.next_out_index, u = t.read, i = (u <= t.write ? t.write : t.end) - u, i > s.avail_out && (i = s.avail_out), i !== 0 && f == -5 && (f = 0), s.avail_out -= i, s.total_out += i, s.next_out.set(t.window.subarray(u, u + i), o), o += i, u += i, u == t.end && (u = 0, t.write == t.end && (t.write = 0), i = t.write - u, i > s.avail_out && (i = s.avail_out), i !== 0 && f == -5 && (f = 0), s.avail_out -= i, s.total_out += i, s.next_out.set(t.window.subarray(u, u + i), o), o += i, u += i), s.next_out_index = o, t.read = u, f
            }, t.proc = function (s, f) {
                let i, o, u, w, S, x, b, h;
                for (w = s.next_in_index, S = s.avail_in, o = t.bitb, u = t.bitk, x = t.write, b = x < t.read ? t.read - x - 1 : t.end - x; ;) {
                    let y, C, R, A, E, F, O, V;
                    switch (a) {
                        case 0:
                            for (; u < 3;) {
                                if (S === 0) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                f = 0, S--, o |= (255 & s.read_byte(w++)) << u, u += 8
                            }
                            switch (i = 7 & o, U = 1 & i, i >>> 1) {
                                case 0:
                                    o >>>= 3, u -= 3, i = 7 & u, o >>>= i, u -= i, a = 1;
                                    break;
                                case 1:
                                    y = [], C = [], R = [[]], A = [[]], bt.inflate_trees_fixed(y, C, R, A), v.init(y[0], C[0], R[0], 0, A[0], 0), o >>>= 3, u -= 3, a = 6;
                                    break;
                                case 2:
                                    o >>>= 3, u -= 3, a = 3;
                                    break;
                                case 3:
                                    return o >>>= 3, u -= 3, a = 9, s.msg = "invalid block type", f = -3, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f)
                            }
                            break;
                        case 1:
                            for (; u < 32;) {
                                if (S === 0) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                f = 0, S--, o |= (255 & s.read_byte(w++)) << u, u += 8
                            }
                            if ((~o >>> 16 & 65535) != (65535 & o)) return a = 9, s.msg = "invalid stored block lengths", f = -3, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                            c = 65535 & o, o = u = 0, a = c !== 0 ? 2 : U !== 0 ? 7 : 0;
                            break;
                        case 2:
                            if (S === 0 || b === 0 && (x == t.end && t.read !== 0 && (x = 0, b = x < t.read ? t.read - x - 1 : t.end - x), b === 0 && (t.write = x, f = t.inflate_flush(s, f), x = t.write, b = x < t.read ? t.read - x - 1 : t.end - x, x == t.end && t.read !== 0 && (x = 0, b = x < t.read ? t.read - x - 1 : t.end - x), b === 0))) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                            if (f = 0, i = c, i > S && (i = S), i > b && (i = b), t.window.set(s.read_buf(w, i), x), w += i, S -= i, x += i, b -= i, (c -= i) != 0) break;
                            a = U !== 0 ? 7 : 0;
                            break;
                        case 3:
                            for (; u < 14;) {
                                if (S === 0) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                f = 0, S--, o |= (255 & s.read_byte(w++)) << u, u += 8
                            }
                            if (d = i = 16383 & o, (31 & i) > 29 || (i >> 5 & 31) > 29) return a = 9, s.msg = "too many length or distance symbols", f = -3, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                            if (i = 258 + (31 & i) + (i >> 5 & 31), !r || r.length < i) r = []; else for (h = 0; h < i; h++) r[h] = 0;
                            o >>>= 14, u -= 14, _ = 0, a = 4;
                        case 4:
                            for (; _ < 4 + (d >>> 10);) {
                                for (; u < 3;) {
                                    if (S === 0) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                    f = 0, S--, o |= (255 & s.read_byte(w++)) << u, u += 8
                                }
                                r[$t[_++]] = 7 & o, o >>>= 3, u -= 3
                            }
                            for (; _ < 19;) r[$t[_++]] = 0;
                            if (m[0] = 7, i = L.inflate_trees_bits(r, m, g, N, s), i != 0) return (f = i) == -3 && (r = null, a = 9), t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                            _ = 0, a = 5;
                        case 5:
                            for (; i = d, !(_ >= 258 + (31 & i) + (i >> 5 & 31));) {
                                let I, q;
                                for (i = m[0]; u < i;) {
                                    if (S === 0) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                    f = 0, S--, o |= (255 & s.read_byte(w++)) << u, u += 8
                                }
                                if (i = N[3 * (g[0] + (o & W[i])) + 1], q = N[3 * (g[0] + (o & W[i])) + 2], q < 16) o >>>= i, u -= i, r[_++] = q; else {
                                    for (h = q == 18 ? 7 : q - 14, I = q == 18 ? 11 : 3; u < i + h;) {
                                        if (S === 0) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                        f = 0, S--, o |= (255 & s.read_byte(w++)) << u, u += 8
                                    }
                                    if (o >>>= i, u -= i, I += o & W[h], o >>>= h, u -= h, h = _, i = d, h + I > 258 + (31 & i) + (i >> 5 & 31) || q == 16 && h < 1) return r = null, a = 9, s.msg = "invalid bit length repeat", f = -3, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                                    q = q == 16 ? r[h - 1] : 0;
                                    do r[h++] = q; while (--I != 0);
                                    _ = h
                                }
                            }
                            if (g[0] = -1, E = [], F = [], O = [], V = [], E[0] = 9, F[0] = 6, i = d, i = L.inflate_trees_dynamic(257 + (31 & i), 1 + (i >> 5 & 31), r, E, F, O, V, N, s), i != 0) return i == -3 && (r = null, a = 9), f = i, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                            v.init(E[0], F[0], N, O[0], N, V[0]), a = 6;
                        case 6:
                            if (t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, (f = v.proc(t, s, f)) != 1) return t.inflate_flush(s, f);
                            if (f = 0, v.free(s), w = s.next_in_index, S = s.avail_in, o = t.bitb, u = t.bitk, x = t.write, b = x < t.read ? t.read - x - 1 : t.end - x, U === 0) {
                                a = 0;
                                break
                            }
                            a = 7;
                        case 7:
                            if (t.write = x, f = t.inflate_flush(s, f), x = t.write, b = x < t.read ? t.read - x - 1 : t.end - x, t.read != t.write) return t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                            a = 8;
                        case 8:
                            return f = 1, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                        case 9:
                            return f = -3, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f);
                        default:
                            return f = -2, t.bitb = o, t.bitk = u, s.avail_in = S, s.total_in += w - s.next_in_index, s.next_in_index = w, t.write = x, t.inflate_flush(s, f)
                    }
                }
            }, t.free = function (s) {
                t.reset(s, null), t.window = null, N = null
            }, t.set_dictionary = function (s, f, i) {
                t.window.set(s.subarray(f, f + i), 0), t.read = t.write = i
            }, t.sync_point = function () {
                return a == 1 ? 1 : 0
            }
        }

        const it = 13, Je = [0, 0, 255, 255];

        function tn() {
            const n = this;

            function e(t) {
                return t && t.istate ? (t.total_in = t.total_out = 0, t.msg = null, t.istate.mode = 7, t.istate.blocks.reset(t, null), 0) : -2
            }

            n.mode = 0, n.method = 0, n.was = [0], n.need = 0, n.marker = 0, n.wbits = 0, n.inflateEnd = function (t) {
                return n.blocks && n.blocks.free(t), n.blocks = null, 0
            }, n.inflateInit = function (t, r) {
                return t.msg = null, n.blocks = null, r < 8 || r > 15 ? (n.inflateEnd(t), -2) : (n.wbits = r, t.istate.blocks = new Xe(t, 1 << r), e(t), 0)
            }, n.inflate = function (t, r) {
                let a, c;
                if (!t || !t.istate || !t.next_in) return -2;
                const d = t.istate;
                for (r = r == 4 ? -5 : 0, a = -5; ;) switch (d.mode) {
                    case 0:
                        if (t.avail_in === 0) return a;
                        if (a = r, t.avail_in--, t.total_in++, (15 & (d.method = t.read_byte(t.next_in_index++))) != 8) {
                            d.mode = it, t.msg = "unknown compression method", d.marker = 5;
                            break
                        }
                        if (8 + (d.method >> 4) > d.wbits) {
                            d.mode = it, t.msg = "invalid window size", d.marker = 5;
                            break
                        }
                        d.mode = 1;
                    case 1:
                        if (t.avail_in === 0) return a;
                        if (a = r, t.avail_in--, t.total_in++, c = 255 & t.read_byte(t.next_in_index++), ((d.method << 8) + c) % 31 != 0) {
                            d.mode = it, t.msg = "incorrect header check", d.marker = 5;
                            break
                        }
                        if ((32 & c) == 0) {
                            d.mode = 7;
                            break
                        }
                        d.mode = 2;
                    case 2:
                        if (t.avail_in === 0) return a;
                        a = r, t.avail_in--, t.total_in++, d.need = (255 & t.read_byte(t.next_in_index++)) << 24 & 4278190080, d.mode = 3;
                    case 3:
                        if (t.avail_in === 0) return a;
                        a = r, t.avail_in--, t.total_in++, d.need += (255 & t.read_byte(t.next_in_index++)) << 16 & 16711680, d.mode = 4;
                    case 4:
                        if (t.avail_in === 0) return a;
                        a = r, t.avail_in--, t.total_in++, d.need += (255 & t.read_byte(t.next_in_index++)) << 8 & 65280, d.mode = 5;
                    case 5:
                        return t.avail_in === 0 ? a : (a = r, t.avail_in--, t.total_in++, d.need += 255 & t.read_byte(t.next_in_index++), d.mode = 6, 2);
                    case 6:
                        return d.mode = it, t.msg = "need dictionary", d.marker = 0, -2;
                    case 7:
                        if (a = d.blocks.proc(t, a), a == -3) {
                            d.mode = it, d.marker = 0;
                            break
                        }
                        if (a == 0 && (a = r), a != 1) return a;
                        a = r, d.blocks.reset(t, d.was), d.mode = 12;
                    case 12:
                        return 1;
                    case it:
                        return -3;
                    default:
                        return -2
                }
            }, n.inflateSetDictionary = function (t, r, a) {
                let c = 0, d = a;
                if (!t || !t.istate || t.istate.mode != 6) return -2;
                const _ = t.istate;
                return d >= 1 << _.wbits && (d = (1 << _.wbits) - 1, c = a - d), _.blocks.set_dictionary(r, c, d), _.mode = 7, 0
            }, n.inflateSync = function (t) {
                let r, a, c, d, _;
                if (!t || !t.istate) return -2;
                const m = t.istate;
                if (m.mode != it && (m.mode = it, m.marker = 0), (r = t.avail_in) === 0) return -5;
                for (a = t.next_in_index, c = m.marker; r !== 0 && c < 4;) t.read_byte(a) == Je[c] ? c++ : c = t.read_byte(a) !== 0 ? 0 : 4 - c, a++, r--;
                return t.total_in += a - t.next_in_index, t.next_in_index = a, t.avail_in = r, m.marker = c, c != 4 ? -3 : (d = t.total_in, _ = t.total_out, e(t), t.total_in = d, t.total_out = _, m.mode = 7, 0)
            }, n.inflateSyncPoint = function (t) {
                return t && t.istate && t.istate.blocks ? t.istate.blocks.sync_point() : -2
            }
        }

        function Kt() {
        }

        Kt.prototype = {
            inflateInit: function (n) {
                const e = this;
                return e.istate = new tn, n || (n = 15), e.istate.inflateInit(e, n)
            }, inflate: function (n) {
                const e = this;
                return e.istate ? e.istate.inflate(e, n) : -2
            }, inflateEnd: function () {
                const n = this;
                if (!n.istate) return -2;
                const e = n.istate.inflateEnd(n);
                return n.istate = null, e
            }, inflateSync: function () {
                const n = this;
                return n.istate ? n.istate.inflateSync(n) : -2
            }, inflateSetDictionary: function (n, e) {
                const t = this;
                return t.istate ? t.istate.inflateSetDictionary(t, n, e) : -2
            }, read_byte: function (n) {
                return this.next_in[n]
            }, read_buf: function (n, e) {
                return this.next_in.subarray(n, n + e)
            }
        };
        const en = {
            chunkSize: 524288,
            maxWorkers: typeof navigator != "undefined" && navigator.hardwareConcurrency || 2,
            terminateWorkerTimeout: 5e3,
            useWebWorkers: !0,
            workerScripts: void 0
        }, X = Object.assign({}, en);

        function Qt(n) {
            if (n.baseURL !== void 0 && (X.baseURL = n.baseURL), n.chunkSize !== void 0 && (X.chunkSize = n.chunkSize), n.maxWorkers !== void 0 && (X.maxWorkers = n.maxWorkers), n.terminateWorkerTimeout !== void 0 && (X.terminateWorkerTimeout = n.terminateWorkerTimeout), n.useWebWorkers !== void 0 && (X.useWebWorkers = n.useWebWorkers), n.Deflate !== void 0 && (X.Deflate = n.Deflate), n.Inflate !== void 0 && (X.Inflate = n.Inflate), n.workerScripts !== void 0) {
                if (n.workerScripts.deflate) {
                    if (!Array.isArray(n.workerScripts.deflate)) throw new Error("workerScripts.deflate must be an array");
                    X.workerScripts || (X.workerScripts = {}), X.workerScripts.deflate = n.workerScripts.deflate
                }
                if (n.workerScripts.inflate) {
                    if (!Array.isArray(n.workerScripts.inflate)) throw new Error("workerScripts.inflate must be an array");
                    X.workerScripts || (X.workerScripts = {}), X.workerScripts.inflate = n.workerScripts.inflate
                }
            }
        }

        const Zt = "Abort error";

        function Rt(n, e) {
            if (n && n.aborted) throw e.flush(), new Error(Zt)
        }

        async function Yt(n, e) {
            return e.length && await n.writeUint8Array(e), e.length
        }

        const Xt = "HTTP error ", Ut = "HTTP Range not supported", Tt = "text/plain", Ct = "GET", nn = "bytes";

        class Jt {
            constructor() {
                this.size = 0
            }

            init() {
                this.initialized = !0
            }
        }

        class st extends Jt {
        }

        class mt extends Jt {
            writeUint8Array(e) {
                this.size += e.length
            }
        }

        class te extends st {
            constructor(e) {
                super(), this.blob = e, this.size = e.size
            }

            async readUint8Array(e, t) {
                if (this.blob.arrayBuffer) return new Uint8Array(await this.blob.slice(e, e + t).arrayBuffer());
                {
                    const r = new FileReader;
                    return new Promise((a, c) => {
                        r.onload = d => a(new Uint8Array(d.target.result)), r.onerror = () => c(r.error), r.readAsArrayBuffer(this.blob.slice(e, e + t))
                    })
                }
            }
        }

        class rn extends st {
            constructor(e, t) {
                super(), this.url = e, this.preventHeadRequest = t.preventHeadRequest, this.useRangeHeader = t.useRangeHeader, this.forceRangeRequests = t.forceRangeRequests, this.options = Object.assign({}, t), delete this.options.preventHeadRequest, delete this.options.useRangeHeader, delete this.options.forceRangeRequests, delete this.options.useXHR
            }

            async init() {
                super.init(), await ee(this, Dt, ie)
            }

            async readUint8Array(e, t) {
                return ne(this, e, t, Dt, ie)
            }
        }

        class sn extends st {
            constructor(e, t) {
                super(), this.url = e, this.preventHeadRequest = t.preventHeadRequest, this.useRangeHeader = t.useRangeHeader, this.forceRangeRequests = t.forceRangeRequests, this.options = t
            }

            async init() {
                super.init(), await ee(this, zt, se)
            }

            async readUint8Array(e, t) {
                return ne(this, e, t, zt, se)
            }
        }

        async function ee(n, e, t) {
            if (function (r) {
                if (typeof document != "undefined") {
                    const a = document.createElement("a");
                    return a.href = r, a.protocol == "http:" || a.protocol == "https:"
                }
                return /^https?:\/\//i.test(r)
            }(n.url) && (n.useRangeHeader || n.forceRangeRequests)) {
                const r = await e(Ct, n, re(n));
                if (!n.forceRangeRequests && r.headers.get("Accept-Ranges") != nn) throw new Error(Ut);
                {
                    let a;
                    const c = r.headers.get("Content-Range");
                    if (c) {
                        const d = c.trim().split(/\s*\/\s*/);
                        if (d.length) {
                            const _ = d[1];
                            _ && _ != "*" && (a = Number(_))
                        }
                    }
                    a === void 0 ? await oe(n, e, t) : n.size = a
                }
            } else await oe(n, e, t)
        }

        async function ne(n, e, t, r, a) {
            if (n.useRangeHeader || n.forceRangeRequests) {
                const c = await r(Ct, n, re(n, e, t));
                if (c.status != 206) throw new Error(Ut);
                return new Uint8Array(await c.arrayBuffer())
            }
            return n.data || await a(n, n.options), new Uint8Array(n.data.subarray(e, e + t))
        }

        function re(n, e = 0, t = 1) {
            return Object.assign({}, Ft(n), {Range: "bytes=" + e + "-" + (e + t - 1)})
        }

        function Ft(n) {
            let e = n.options.headers;
            if (e) return Symbol.iterator in e ? Object.fromEntries(e) : e
        }

        async function ie(n) {
            await ae(n, Dt)
        }

        async function se(n) {
            await ae(n, zt)
        }

        async function ae(n, e) {
            const t = await e(Ct, n, Ft(n));
            n.data = new Uint8Array(await t.arrayBuffer()), n.size || (n.size = n.data.length)
        }

        async function oe(n, e, t) {
            if (n.preventHeadRequest) await t(n, n.options); else {
                const r = (await e("HEAD", n, Ft(n))).headers.get("Content-Length");
                r ? n.size = Number(r) : await t(n, n.options)
            }
        }

        async function Dt(n, {options: e, url: t}, r) {
            const a = await fetch(t, Object.assign({}, e, {method: n, headers: r}));
            if (a.status < 400) return a;
            throw new Error(Xt + (a.statusText || a.status))
        }

        function zt(n, {url: e}, t) {
            return new Promise((r, a) => {
                const c = new XMLHttpRequest;
                if (c.addEventListener("load", () => {
                    if (c.status < 400) {
                        const d = [];
                        c.getAllResponseHeaders().trim().split(/[\r\n]+/).forEach(_ => {
                            const m = _.trim().split(/\s*:\s*/);
                            m[0] = m[0].trim().replace(/^[a-z]|-[a-z]/g, g => g.toUpperCase()), d.push(m)
                        }), r({status: c.status, arrayBuffer: () => c.response, headers: new Map(d)})
                    } else a(new Error(Xt + (c.statusText || c.status)))
                }, !1), c.addEventListener("error", d => a(d.detail.error), !1), c.open(n, e), t) for (const d of Object.entries(t)) c.setRequestHeader(d[0], d[1]);
                c.responseType = "arraybuffer", c.send()
            })
        }

        class ce extends st {
            constructor(e, t = {}) {
                super(), this.url = e, t.useXHR ? this.reader = new sn(e, t) : this.reader = new rn(e, t)
            }

            set size(e) {
            }

            get size() {
                return this.reader.size
            }

            async init() {
                super.init(), await this.reader.init()
            }

            async readUint8Array(e, t) {
                return this.reader.readUint8Array(e, t)
            }
        }

        const vt = 4294967295, le = 33639248, de = 101075792, ue = [];
        for (let n = 0; n < 256; n++) {
            let e = n;
            for (let t = 0; t < 8; t++) 1 & e ? e = e >>> 1 ^ 3988292384 : e >>>= 1;
            ue[n] = e
        }

        class yt {
            constructor(e) {
                this.crc = e || -1
            }

            append(e) {
                let t = 0 | this.crc;
                for (let r = 0, a = 0 | e.length; r < a; r++) t = t >>> 8 ^ ue[255 & (t ^ e[r])];
                this.crc = t
            }

            get() {
                return ~this.crc
            }
        }

        const J = {
            concat(n, e) {
                if (n.length === 0 || e.length === 0) return n.concat(e);
                const t = n[n.length - 1], r = J.getPartial(t);
                return r === 32 ? n.concat(e) : J._shiftRight(e, r, 0 | t, n.slice(0, n.length - 1))
            },
            bitLength(n) {
                const e = n.length;
                if (e === 0) return 0;
                const t = n[e - 1];
                return 32 * (e - 1) + J.getPartial(t)
            },
            clamp(n, e) {
                if (32 * n.length < e) return n;
                const t = (n = n.slice(0, Math.ceil(e / 32))).length;
                return e &= 31, t > 0 && e && (n[t - 1] = J.partial(e, n[t - 1] & 2147483648 >> e - 1, 1)), n
            },
            partial: (n, e, t) => n === 32 ? e : (t ? 0 | e : e << 32 - n) + 1099511627776 * n,
            getPartial: n => Math.round(n / 1099511627776) || 32,
            _shiftRight(n, e, t, r) {
                for (r === void 0 && (r = []); e >= 32; e -= 32) r.push(t), t = 0;
                if (e === 0) return r.concat(n);
                for (let d = 0; d < n.length; d++) r.push(t | n[d] >>> e), t = n[d] << 32 - e;
                const a = n.length ? n[n.length - 1] : 0, c = J.getPartial(a);
                return r.push(J.partial(e + c & 31, e + c > 32 ? t : r.pop(), 1)), r
            }
        }, he = {
            bytes: {
                fromBits(n) {
                    const e = J.bitLength(n) / 8, t = new Uint8Array(e);
                    let r;
                    for (let a = 0; a < e; a++) (3 & a) == 0 && (r = n[a / 4]), t[a] = r >>> 24, r <<= 8;
                    return t
                }, toBits(n) {
                    const e = [];
                    let t, r = 0;
                    for (t = 0; t < n.length; t++) r = r << 8 | n[t], (3 & t) == 3 && (e.push(r), r = 0);
                    return 3 & t && e.push(J.partial(8 * (3 & t), r)), e
                }
            }
        }, fe = {
            sha1: function (n) {
                n ? (this._h = n._h.slice(0), this._buffer = n._buffer.slice(0), this._length = n._length) : this.reset()
            }
        };
        fe.sha1.prototype = {
            blockSize: 512,
            reset: function () {
                const n = this;
                return n._h = this._init.slice(0), n._buffer = [], n._length = 0, n
            },
            update: function (n) {
                const e = this;
                typeof n == "string" && (n = he.utf8String.toBits(n));
                const t = e._buffer = J.concat(e._buffer, n), r = e._length, a = e._length = r + J.bitLength(n);
                if (a > 9007199254740991) throw new Error("Cannot hash more than 2^53 - 1 bits");
                const c = new Uint32Array(t);
                let d = 0;
                for (let _ = e.blockSize + r - (e.blockSize + r & e.blockSize - 1); _ <= a; _ += e.blockSize) e._block(c.subarray(16 * d, 16 * (d + 1))), d += 1;
                return t.splice(0, 16 * d), e
            },
            finalize: function () {
                const n = this;
                let e = n._buffer;
                const t = n._h;
                e = J.concat(e, [J.partial(1, 1)]);
                for (let r = e.length + 2; 15 & r; r++) e.push(0);
                for (e.push(Math.floor(n._length / 4294967296)), e.push(0 | n._length); e.length;) n._block(e.splice(0, 16));
                return n.reset(), t
            },
            _init: [1732584193, 4023233417, 2562383102, 271733878, 3285377520],
            _key: [1518500249, 1859775393, 2400959708, 3395469782],
            _f: function (n, e, t, r) {
                return n <= 19 ? e & t | ~e & r : n <= 39 ? e ^ t ^ r : n <= 59 ? e & t | e & r | t & r : n <= 79 ? e ^ t ^ r : void 0
            },
            _S: function (n, e) {
                return e << n | e >>> 32 - n
            },
            _block: function (n) {
                const e = this, t = e._h, r = Array(80);
                for (let g = 0; g < 16; g++) r[g] = n[g];
                let a = t[0], c = t[1], d = t[2], _ = t[3], m = t[4];
                for (let g = 0; g <= 79; g++) {
                    g >= 16 && (r[g] = e._S(1, r[g - 3] ^ r[g - 8] ^ r[g - 14] ^ r[g - 16]));
                    const v = e._S(5, a) + e._f(g, c, d, _) + m + r[g] + e._key[Math.floor(g / 20)] | 0;
                    m = _, _ = d, d = e._S(30, c), c = a, a = v
                }
                t[0] = t[0] + a | 0, t[1] = t[1] + c | 0, t[2] = t[2] + d | 0, t[3] = t[3] + _ | 0, t[4] = t[4] + m | 0
            }
        };
        const an = {
                aes: class {
                    constructor(n) {
                        const e = this;
                        e._tables = [[[], [], [], [], []], [[], [], [], [], []]], e._tables[0][0][0] || e._precompute();
                        const t = e._tables[0][4], r = e._tables[1], a = n.length;
                        let c, d, _, m = 1;
                        if (a !== 4 && a !== 6 && a !== 8) throw new Error("invalid aes key size");
                        for (e._key = [d = n.slice(0), _ = []], c = a; c < 4 * a + 28; c++) {
                            let g = d[c - 1];
                            (c % a == 0 || a === 8 && c % a == 4) && (g = t[g >>> 24] << 24 ^ t[g >> 16 & 255] << 16 ^ t[g >> 8 & 255] << 8 ^ t[255 & g], c % a == 0 && (g = g << 8 ^ g >>> 24 ^ m << 24, m = m << 1 ^ 283 * (m >> 7))), d[c] = d[c - a] ^ g
                        }
                        for (let g = 0; c; g++, c--) {
                            const v = d[3 & g ? c : c - 4];
                            _[g] = c <= 4 || g < 4 ? v : r[0][t[v >>> 24]] ^ r[1][t[v >> 16 & 255]] ^ r[2][t[v >> 8 & 255]] ^ r[3][t[255 & v]]
                        }
                    }

                    encrypt(n) {
                        return this._crypt(n, 0)
                    }

                    decrypt(n) {
                        return this._crypt(n, 1)
                    }

                    _precompute() {
                        const n = this._tables[0], e = this._tables[1], t = n[4], r = e[4], a = [], c = [];
                        let d, _, m, g;
                        for (let v = 0; v < 256; v++) c[(a[v] = v << 1 ^ 283 * (v >> 7)) ^ v] = v;
                        for (let v = d = 0; !t[v]; v ^= _ || 1, d = c[d] || 1) {
                            let U = d ^ d << 1 ^ d << 2 ^ d << 3 ^ d << 4;
                            U = U >> 8 ^ 255 & U ^ 99, t[v] = U, r[U] = v, g = a[m = a[_ = a[v]]];
                            let N = 16843009 * g ^ 65537 * m ^ 257 * _ ^ 16843008 * v, L = 257 * a[U] ^ 16843008 * U;
                            for (let s = 0; s < 4; s++) n[s][v] = L = L << 24 ^ L >>> 8, e[s][U] = N = N << 24 ^ N >>> 8
                        }
                        for (let v = 0; v < 5; v++) n[v] = n[v].slice(0), e[v] = e[v].slice(0)
                    }

                    _crypt(n, e) {
                        if (n.length !== 4) throw new Error("invalid aes block size");
                        const t = this._key[e], r = t.length / 4 - 2, a = [0, 0, 0, 0], c = this._tables[e], d = c[0],
                            _ = c[1], m = c[2], g = c[3], v = c[4];
                        let U, N, L, s = n[0] ^ t[0], f = n[e ? 3 : 1] ^ t[1], i = n[2] ^ t[2], o = n[e ? 1 : 3] ^ t[3],
                            u = 4;
                        for (let w = 0; w < r; w++) U = d[s >>> 24] ^ _[f >> 16 & 255] ^ m[i >> 8 & 255] ^ g[255 & o] ^ t[u], N = d[f >>> 24] ^ _[i >> 16 & 255] ^ m[o >> 8 & 255] ^ g[255 & s] ^ t[u + 1], L = d[i >>> 24] ^ _[o >> 16 & 255] ^ m[s >> 8 & 255] ^ g[255 & f] ^ t[u + 2], o = d[o >>> 24] ^ _[s >> 16 & 255] ^ m[f >> 8 & 255] ^ g[255 & i] ^ t[u + 3], u += 4, s = U, f = N, i = L;
                        for (let w = 0; w < 4; w++) a[e ? 3 & -w : w] = v[s >>> 24] << 24 ^ v[f >> 16 & 255] << 16 ^ v[i >> 8 & 255] << 8 ^ v[255 & o] ^ t[u++], U = s, s = f, f = i, i = o, o = U;
                        return a
                    }
                }
            }, on = {
                ctrGladman: class {
                    constructor(n, e) {
                        this._prf = n, this._initIv = e, this._iv = e
                    }

                    reset() {
                        this._iv = this._initIv
                    }

                    update(n) {
                        return this.calculate(this._prf, n, this._iv)
                    }

                    incWord(n) {
                        if ((n >> 24 & 255) == 255) {
                            let e = n >> 16 & 255, t = n >> 8 & 255, r = 255 & n;
                            e === 255 ? (e = 0, t === 255 ? (t = 0, r === 255 ? r = 0 : ++r) : ++t) : ++e, n = 0, n += e << 16, n += t << 8, n += r
                        } else n += 1 << 24;
                        return n
                    }

                    incCounter(n) {
                        (n[0] = this.incWord(n[0])) === 0 && (n[1] = this.incWord(n[1]))
                    }

                    calculate(n, e, t) {
                        let r;
                        if (!(r = e.length)) return [];
                        const a = J.bitLength(e);
                        for (let c = 0; c < r; c += 4) {
                            this.incCounter(t);
                            const d = n.encrypt(t);
                            e[c] ^= d[0], e[c + 1] ^= d[1], e[c + 2] ^= d[2], e[c + 3] ^= d[3]
                        }
                        return J.clamp(e, a)
                    }
                }
            }, cn = {
                hmacSha1: class {
                    constructor(n) {
                        const e = this, t = e._hash = fe.sha1, r = [[], []], a = t.prototype.blockSize / 32;
                        e._baseHash = [new t, new t], n.length > a && (n = t.hash(n));
                        for (let c = 0; c < a; c++) r[0][c] = 909522486 ^ n[c], r[1][c] = 1549556828 ^ n[c];
                        e._baseHash[0].update(r[0]), e._baseHash[1].update(r[1]), e._resultHash = new t(e._baseHash[0])
                    }

                    reset() {
                        const n = this;
                        n._resultHash = new n._hash(n._baseHash[0]), n._updated = !1
                    }

                    update(n) {
                        this._updated = !0, this._resultHash.update(n)
                    }

                    digest() {
                        const n = this, e = n._resultHash.finalize(), t = new n._hash(n._baseHash[1]).update(e).finalize();
                        return n.reset(), t
                    }
                }
            }, It = "Invalid pasword", ft = 16, pe = {name: "PBKDF2"}, ln = Object.assign({hash: {name: "HMAC"}}, pe),
            dn = Object.assign({iterations: 1e3, hash: {name: "SHA-1"}}, pe), un = ["deriveBits"], xt = [8, 12, 16],
            kt = [16, 24, 32], at = 10, _e = [0, 0, 0, 0], nt = he.bytes, we = an.aes, ge = on.ctrGladman,
            be = cn.hmacSha1;

        class hn {
            constructor(e, t, r) {
                Object.assign(this, {password: e, signed: t, strength: r - 1, pendingInput: new Uint8Array(0)})
            }

            async append(e) {
                const t = this;
                if (t.password) {
                    const r = tt(e, 0, xt[t.strength] + 2);
                    await async function (a, c, d) {
                        await ye(a, d, tt(c, 0, xt[a.strength]));
                        const _ = tt(c, xt[a.strength]), m = a.keys.passwordVerification;
                        if (m[0] != _[0] || m[1] != _[1]) throw new Error(It)
                    }(t, r, t.password), t.password = null, t.aesCtrGladman = new ge(new we(t.keys.key), Array.from(_e)), t.hmac = new be(t.keys.authentication), e = tt(e, xt[t.strength] + 2)
                }
                return me(t, e, new Uint8Array(e.length - at - (e.length - at) % ft), 0, at, !0)
            }

            flush() {
                const e = this, t = e.pendingInput, r = tt(t, 0, t.length - at), a = tt(t, t.length - at);
                let c = new Uint8Array(0);
                if (r.length) {
                    const _ = nt.toBits(r);
                    e.hmac.update(_);
                    const m = e.aesCtrGladman.update(_);
                    c = nt.fromBits(m)
                }
                let d = !0;
                if (e.signed) {
                    const _ = tt(nt.fromBits(e.hmac.digest()), 0, at);
                    for (let m = 0; m < at; m++) _[m] != a[m] && (d = !1)
                }
                return {valid: d, data: c}
            }
        }

        class fn {
            constructor(e, t) {
                Object.assign(this, {password: e, strength: t - 1, pendingInput: new Uint8Array(0)})
            }

            async append(e) {
                const t = this;
                let r = new Uint8Array(0);
                t.password && (r = await async function (c, d) {
                    const _ = crypto.getRandomValues(new Uint8Array(xt[c.strength]));
                    return await ye(c, d, _), Mt(_, c.keys.passwordVerification)
                }(t, t.password), t.password = null, t.aesCtrGladman = new ge(new we(t.keys.key), Array.from(_e)), t.hmac = new be(t.keys.authentication));
                const a = new Uint8Array(r.length + e.length - e.length % ft);
                return a.set(r, 0), me(t, e, a, r.length, 0)
            }

            flush() {
                const e = this;
                let t = new Uint8Array(0);
                if (e.pendingInput.length) {
                    const a = e.aesCtrGladman.update(nt.toBits(e.pendingInput));
                    e.hmac.update(a), t = nt.fromBits(a)
                }
                const r = tt(nt.fromBits(e.hmac.digest()), 0, at);
                return {data: Mt(t, r), signature: r}
            }
        }

        function me(n, e, t, r, a, c) {
            const d = e.length - a;
            let _;
            for (n.pendingInput.length && (e = Mt(n.pendingInput, e), t = function (m, g) {
                if (g && g > m.length) {
                    const v = m;
                    (m = new Uint8Array(g)).set(v, 0)
                }
                return m
            }(t, d - d % ft)), _ = 0; _ <= d - ft; _ += ft) {
                const m = nt.toBits(tt(e, _, _ + ft));
                c && n.hmac.update(m);
                const g = n.aesCtrGladman.update(m);
                c || n.hmac.update(g), t.set(nt.fromBits(g), _ + r)
            }
            return n.pendingInput = tt(e, _), t
        }

        async function ye(n, e, t) {
            const r = function (_) {
                    if (typeof TextEncoder == "undefined") {
                        _ = unescape(encodeURIComponent(_));
                        const m = new Uint8Array(_.length);
                        for (let g = 0; g < m.length; g++) m[g] = _.charCodeAt(g);
                        return m
                    }
                    return new TextEncoder().encode(_)
                }(e), a = await crypto.subtle.importKey("raw", r, ln, !1, un),
                c = await crypto.subtle.deriveBits(Object.assign({salt: t}, dn), a, 8 * (2 * kt[n.strength] + 2)),
                d = new Uint8Array(c);
            n.keys = {
                key: nt.toBits(tt(d, 0, kt[n.strength])),
                authentication: nt.toBits(tt(d, kt[n.strength], 2 * kt[n.strength])),
                passwordVerification: tt(d, 2 * kt[n.strength])
            }
        }

        function Mt(n, e) {
            let t = n;
            return n.length + e.length && (t = new Uint8Array(n.length + e.length), t.set(n, 0), t.set(e, n.length)), t
        }

        function tt(n, e, t) {
            return n.subarray(e, t)
        }

        const St = 12;

        class pn {
            constructor(e, t) {
                Object.assign(this, {password: e, passwordVerification: t}), ve(this, e)
            }

            append(e) {
                const t = this;
                if (t.password) {
                    const r = xe(t, e.subarray(0, St));
                    if (t.password = null, r[11] != t.passwordVerification) throw new Error(It);
                    e = e.subarray(St)
                }
                return xe(t, e)
            }

            flush() {
                return {valid: !0, data: new Uint8Array(0)}
            }
        }

        class _n {
            constructor(e, t) {
                Object.assign(this, {password: e, passwordVerification: t}), ve(this, e)
            }

            append(e) {
                const t = this;
                let r, a;
                if (t.password) {
                    t.password = null;
                    const c = crypto.getRandomValues(new Uint8Array(St));
                    c[11] = t.passwordVerification, r = new Uint8Array(e.length + c.length), r.set(ke(t, c), 0), a = St
                } else r = new Uint8Array(e.length), a = 0;
                return r.set(ke(t, e), a), r
            }

            flush() {
                return {data: new Uint8Array(0)}
            }
        }

        function xe(n, e) {
            const t = new Uint8Array(e.length);
            for (let r = 0; r < e.length; r++) t[r] = Se(n) ^ e[r], Lt(n, t[r]);
            return t
        }

        function ke(n, e) {
            const t = new Uint8Array(e.length);
            for (let r = 0; r < e.length; r++) t[r] = Se(n) ^ e[r], Lt(n, e[r]);
            return t
        }

        function ve(n, e) {
            n.keys = [305419896, 591751049, 878082192], n.crcKey0 = new yt(n.keys[0]), n.crcKey2 = new yt(n.keys[2]);
            for (let t = 0; t < e.length; t++) Lt(n, e.charCodeAt(t))
        }

        function Lt(n, e) {
            n.crcKey0.append([e]), n.keys[0] = ~n.crcKey0.get(), n.keys[1] = Ae(n.keys[1] + Ee(n.keys[0])), n.keys[1] = Ae(Math.imul(n.keys[1], 134775813) + 1), n.crcKey2.append([n.keys[1] >>> 24]), n.keys[2] = ~n.crcKey2.get()
        }

        function Se(n) {
            const e = 2 | n.keys[2];
            return Ee(Math.imul(e, 1 ^ e) >>> 8)
        }

        function Ee(n) {
            return 255 & n
        }

        function Ae(n) {
            return 4294967295 & n
        }

        const Re = "inflate", Ot = "Invalid signature";

        class wn {
            constructor(e, {
                signature: t,
                password: r,
                signed: a,
                compressed: c,
                zipCrypto: d,
                passwordVerification: _,
                encryptionStrength: m
            }, {chunkSize: g}) {
                const v = Boolean(r);
                Object.assign(this, {
                    signature: t,
                    encrypted: v,
                    signed: a,
                    compressed: c,
                    inflate: c && new e({chunkSize: g}),
                    crc32: a && new yt,
                    zipCrypto: d,
                    decrypt: v && d ? new pn(r, _) : new hn(r, a, m)
                })
            }

            async append(e) {
                const t = this;
                return t.encrypted && e.length && (e = await t.decrypt.append(e)), t.compressed && e.length && (e = await t.inflate.append(e)), (!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e), e
            }

            async flush() {
                const e = this;
                let t, r = new Uint8Array(0);
                if (e.encrypted) {
                    const a = e.decrypt.flush();
                    if (!a.valid) throw new Error(Ot);
                    r = a.data
                }
                if ((!e.encrypted || e.zipCrypto) && e.signed) {
                    const a = new DataView(new Uint8Array(4).buffer);
                    if (t = e.crc32.get(), a.setUint32(0, t), e.signature != a.getUint32(0, !1)) throw new Error(Ot)
                }
                return e.compressed && (r = await e.inflate.append(r) || new Uint8Array(0), await e.inflate.flush()), {
                    data: r,
                    signature: t
                }
            }
        }

        class gn {
            constructor(e, {
                encrypted: t,
                signed: r,
                compressed: a,
                level: c,
                zipCrypto: d,
                password: _,
                passwordVerification: m,
                encryptionStrength: g
            }, {chunkSize: v}) {
                Object.assign(this, {
                    encrypted: t,
                    signed: r,
                    compressed: a,
                    deflate: a && new e({level: c || 5, chunkSize: v}),
                    crc32: r && new yt,
                    zipCrypto: d,
                    encrypt: t && d ? new _n(_, m) : new fn(_, g)
                })
            }

            async append(e) {
                const t = this;
                let r = e;
                return t.compressed && e.length && (r = await t.deflate.append(e)), t.encrypted && r.length && (r = await t.encrypt.append(r)), (!t.encrypted || t.zipCrypto) && t.signed && e.length && t.crc32.append(e), r
            }

            async flush() {
                const e = this;
                let t, r = new Uint8Array(0);
                if (e.compressed && (r = await e.deflate.flush() || new Uint8Array(0)), e.encrypted) {
                    r = await e.encrypt.append(r);
                    const a = e.encrypt.flush();
                    t = a.signature;
                    const c = new Uint8Array(r.length + a.data.length);
                    c.set(r, 0), c.set(a.data, r.length), r = c
                }
                return e.encrypted && !e.zipCrypto || !e.signed || (t = e.crc32.get()), {data: r, signature: t}
            }
        }

        const Ue = "init", Te = "append", Wt = "flush", bn = "message";
        let Ce = !0;
        var Bt = (n, e, t, r, a, c, d) => (Object.assign(n, {
            busy: !0,
            codecConstructor: e,
            options: Object.assign({}, t),
            scripts: d,
            terminate() {
                n.worker && !n.busy && (n.worker.terminate(), n.interface = null)
            },
            onTaskFinished() {
                n.busy = !1, a(n)
            }
        }), c ? function (_, m) {
            let g;
            const v = {type: "module"};
            if (!_.interface) {
                if (Ce) try {
                    _.worker = U({}, m.baseURL)
                } catch {
                    Ce = !1, _.worker = U(v, m.baseURL)
                } else _.worker = U(v, m.baseURL);
                _.worker.addEventListener(bn, s, !1), _.interface = {
                    append: f => N({type: Te, data: f}),
                    flush: () => N({type: Wt})
                }
            }
            return _.interface;

            function U(f, i) {
                let o;
                try {
                    o = new URL(_.scripts[0], i)
                } catch {
                    o = _.scripts[0]
                }
                return new Worker(o, f)
            }

            async function N(f) {
                if (!g) {
                    const i = _.options, o = _.scripts.slice(1);
                    await L({scripts: o, type: Ue, options: i, config: {chunkSize: m.chunkSize}})
                }
                return L(f)
            }

            function L(f) {
                const i = _.worker, o = new Promise((u, w) => g = {resolve: u, reject: w});
                try {
                    if (f.data) try {
                        f.data = f.data.buffer, i.postMessage(f, [f.data])
                    } catch {
                        i.postMessage(f)
                    } else i.postMessage(f)
                } catch (u) {
                    g.reject(u), g = null, _.onTaskFinished()
                }
                return o
            }

            function s(f) {
                const i = f.data;
                if (g) {
                    const o = i.error, u = i.type;
                    if (o) {
                        const w = new Error(o.message);
                        w.stack = o.stack, g.reject(w), g = null, _.onTaskFinished()
                    } else if (u == Ue || u == Wt || u == Te) {
                        const w = i.data;
                        u == Wt ? (g.resolve({
                            data: new Uint8Array(w),
                            signature: i.signature
                        }), g = null, _.onTaskFinished()) : g.resolve(w && new Uint8Array(w))
                    }
                }
            }
        }(n, r) : function (_, m) {
            const g = function (v, U, N) {
                return U.codecType.startsWith("deflate") ? new gn(v, U, N) : U.codecType.startsWith(Re) ? new wn(v, U, N) : void 0
            }(_.codecConstructor, _.options, m);
            return {
                async append(v) {
                    try {
                        return await g.append(v)
                    } catch (U) {
                        throw _.onTaskFinished(), U
                    }
                }, async flush() {
                    try {
                        return await g.flush()
                    } finally {
                        _.onTaskFinished()
                    }
                }
            }
        }(n, r));
        let ut = [], Nt = [];

        function Fe(n) {
            n.terminateTimeout && (clearTimeout(n.terminateTimeout), n.terminateTimeout = null)
        }

        const mn = "\0\u263A\u263B\u2665\u2666\u2663\u2660\u2022\u25D8\u25CB\u25D9\u2642\u2640\u266A\u266B\u263C\u25BA\u25C4\u2195\u203C\xB6\xA7\u25AC\u21A8\u2191\u2193\u2192\u2190\u221F\u2194\u25B2\u25BC !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~\u2302\xC7\xFC\xE9\xE2\xE4\xE0\xE5\xE7\xEA\xEB\xE8\xEF\xEE\xEC\xC4\xC5\xC9\xE6\xC6\xF4\xF6\xF2\xFB\xF9\xFF\xD6\xDC\xA2\xA3\xA5\u20A7\u0192\xE1\xED\xF3\xFA\xF1\xD1\xAA\xBA\xBF\u2310\xAC\xBD\xBC\xA1\xAB\xBB\u2591\u2592\u2593\u2502\u2524\u2561\u2562\u2556\u2555\u2563\u2551\u2557\u255D\u255C\u255B\u2510\u2514\u2534\u252C\u251C\u2500\u253C\u255E\u255F\u255A\u2554\u2569\u2566\u2560\u2550\u256C\u2567\u2568\u2564\u2565\u2559\u2558\u2552\u2553\u256B\u256A\u2518\u250C\u2588\u2584\u258C\u2590\u2580\u03B1\xDF\u0393\u03C0\u03A3\u03C3\xB5\u03C4\u03A6\u0398\u03A9\u03B4\u221E\u03C6\u03B5\u2229\u2261\xB1\u2265\u2264\u2320\u2321\xF7\u2248\xB0\u2219\xB7\u221A\u207F\xB2\u25A0 ".split("");

        async function Pt(n, e) {
            if (e && e.trim().toLowerCase() == "cp437") return (t => {
                let r = "";
                for (let a = 0; a < t.length; a++) r += mn[t[a]];
                return r
            })(n);
            if (typeof TextDecoder == "undefined") {
                const t = new FileReader;
                return new Promise((r, a) => {
                    t.onload = c => r(c.target.result), t.onerror = () => a(t.error), t.readAsText(new Blob([n]))
                })
            }
            return new TextDecoder(e).decode(n)
        }

        const yn = ["filename", "rawFilename", "directory", "encrypted", "compressedSize", "uncompressedSize", "lastModDate", "rawLastModDate", "comment", "rawComment", "signature", "extraField", "rawExtraField", "bitFlag", "extraFieldZip64", "extraFieldUnicodePath", "extraFieldUnicodeComment", "extraFieldAES", "filenameUTF8", "commentUTF8", "offset", "zip64", "compressionMethod", "extraFieldNTFS", "lastAccessDate", "creationDate", "extraFieldExtendedTimestamp", "version", "versionMadeBy", "msDosCompatible", "internalFileAttribute", "externalFileAttribute"];

        class De {
            constructor(e) {
                yn.forEach(t => this[t] = e[t])
            }
        }

        const Et = "File format is not recognized", ze = "End of central directory not found",
            Ie = "End of Zip64 central directory not found", Me = "End of Zip64 central directory locator not found",
            Le = "Central directory header not found", Oe = "Local file header not found",
            We = "Zip64 extra field not found", Be = "File contains encrypted entry",
            Ne = "Encryption method not supported", Ht = "Compression method not supported", Pe = "utf-8", He = "cp437",
            je = ["uncompressedSize", "compressedSize", "offset"];

        class xn {
            constructor(e, t, r) {
                Object.assign(this, {reader: e, config: t, options: r})
            }

            async getData(e, t, r = {}) {
                const a = this, {
                    reader: c,
                    offset: d,
                    extraFieldAES: _,
                    compressionMethod: m,
                    config: g,
                    bitFlag: v,
                    signature: U,
                    rawLastModDate: N,
                    compressedSize: L
                } = a, s = a.localDirectory = {};
                c.initialized || await c.init();
                let f = await ot(c, d, 30);
                const i = Y(f);
                let o = pt(a, r, "password");
                if (o = o && o.length && o, _ && _.originalCompressionMethod != 99) throw new Error(Ht);
                if (m != 0 && m != 8) throw new Error(Ht);
                if (Q(i, 0) != 67324752) throw new Error(Oe);
                qe(s, i, 4), f = await ot(c, d, 30 + s.filenameLength + s.extraFieldLength), s.rawExtraField = f.subarray(30 + s.filenameLength), await Ve(a, s, i, 4), t.lastAccessDate = s.lastAccessDate, t.creationDate = s.creationDate;
                const u = a.encrypted && s.encrypted, w = u && !_;
                if (u) {
                    if (!w && _.strength === void 0) throw new Error(Ne);
                    if (!o) throw new Error(Be)
                }
                const S = await function (h, y, C) {
                    const R = !(!y.compressed && !y.signed && !y.encrypted) && (y.useWebWorkers || y.useWebWorkers === void 0 && C.useWebWorkers),
                        A = R && C.workerScripts ? C.workerScripts[y.codecType] : [];
                    if (ut.length < C.maxWorkers) {
                        const F = {};
                        return ut.push(F), Bt(F, h, y, C, E, R, A)
                    }
                    {
                        const F = ut.find(O => !O.busy);
                        return F ? (Fe(F), Bt(F, h, y, C, E, R, A)) : new Promise(O => Nt.push({
                            resolve: O,
                            codecConstructor: h,
                            options: y,
                            webWorker: R,
                            scripts: A
                        }))
                    }

                    function E(F) {
                        if (Nt.length) {
                            const [{
                                resolve: O,
                                codecConstructor: V,
                                options: I,
                                webWorker: q,
                                scripts: ct
                            }] = Nt.splice(0, 1);
                            O(Bt(F, V, I, C, E, q, ct))
                        } else F.worker ? (Fe(F), Number.isFinite(C.terminateWorkerTimeout) && C.terminateWorkerTimeout >= 0 && (F.terminateTimeout = setTimeout(() => {
                            ut = ut.filter(O => O != F), F.terminate()
                        }, C.terminateWorkerTimeout))) : ut = ut.filter(O => O != F)
                    }
                }(g.Inflate, {
                    codecType: Re,
                    password: o,
                    zipCrypto: w,
                    encryptionStrength: _ && _.strength,
                    signed: pt(a, r, "checkSignature"),
                    passwordVerification: w && (v.dataDescriptor ? N >>> 8 & 255 : U >>> 24 & 255),
                    signature: U,
                    compressed: m != 0,
                    encrypted: u,
                    useWebWorkers: pt(a, r, "useWebWorkers")
                }, g);
                e.initialized || await e.init();
                const x = pt(a, r, "signal"), b = d + 30 + s.filenameLength + s.extraFieldLength;
                return await async function (h, y, C, R, A, E, F) {
                    const O = Math.max(E.chunkSize, 64);
                    return async function V(I = 0, q = 0) {
                        const ct = F.signal;
                        if (I < A) {
                            Rt(ct, h);
                            const lt = await y.readUint8Array(I + R, Math.min(O, A - I)), P = lt.length;
                            Rt(ct, h);
                            const wt = await h.append(lt);
                            if (Rt(ct, h), q += await Yt(C, wt), F.onprogress) try {
                                F.onprogress(I + P, A)
                            } catch {
                            }
                            return V(I + O, q)
                        }
                        {
                            const lt = await h.flush();
                            return q += await Yt(C, lt.data), {signature: lt.signature, length: q}
                        }
                    }()
                }(S, c, e, b, L, g, {onprogress: r.onprogress, signal: x}), e.getData()
            }
        }

        function qe(n, e, t) {
            const r = n.rawBitFlag = et(e, t + 2), a = (1 & r) == 1, c = Q(e, t + 6);
            Object.assign(n, {
                encrypted: a,
                version: et(e, t),
                bitFlag: {level: (6 & r) >> 1, dataDescriptor: (8 & r) == 8, languageEncodingFlag: (2048 & r) == 2048},
                rawLastModDate: c,
                lastModDate: kn(c),
                filenameLength: et(e, t + 22),
                extraFieldLength: et(e, t + 24)
            })
        }

        async function Ve(n, e, t, r) {
            const a = e.rawExtraField, c = e.extraField = new Map, d = Y(new Uint8Array(a));
            let _ = 0;
            try {
                for (; _ < a.length;) {
                    const f = et(d, _), i = et(d, _ + 2);
                    c.set(f, {type: f, data: a.slice(_ + 4, _ + 4 + i)}), _ += 4 + i
                }
            } catch {
            }
            const m = et(t, r + 4);
            e.signature = Q(t, r + 10), e.uncompressedSize = Q(t, r + 18), e.compressedSize = Q(t, r + 14);
            const g = c.get(1);
            g && (function (f, i) {
                i.zip64 = !0;
                const o = Y(f.data);
                f.values = [];
                for (let w = 0; w < Math.floor(f.data.length / 8); w++) f.values.push(At(o, 0 + 8 * w));
                const u = je.filter(w => i[w] == vt);
                for (let w = 0; w < u.length; w++) f[u[w]] = f.values[w];
                je.forEach(w => {
                    if (i[w] == vt) {
                        if (f[w] === void 0) throw new Error(We);
                        i[w] = f[w]
                    }
                })
            }(g, e), e.extraFieldZip64 = g);
            const v = c.get(28789);
            v && (await Ge(v, "filename", "rawFilename", e, n), e.extraFieldUnicodePath = v);
            const U = c.get(25461);
            U && (await Ge(U, "comment", "rawComment", e, n), e.extraFieldUnicodeComment = U);
            const N = c.get(39169);
            N ? (function (f, i, o) {
                const u = Y(f.data);
                f.vendorVersion = _t(u, 0), f.vendorId = _t(u, 2);
                const w = _t(u, 4);
                f.strength = w, f.originalCompressionMethod = o, i.compressionMethod = f.compressionMethod = et(u, 5)
            }(N, e, m), e.extraFieldAES = N) : e.compressionMethod = m;
            const L = c.get(10);
            L && (function (f, i) {
                const o = Y(f.data);
                let u, w = 4;
                try {
                    for (; w < f.data.length && !u;) {
                        const S = et(o, w), x = et(o, w + 2);
                        S == 1 && (u = f.data.slice(w + 4, w + 4 + x)), w += 4 + x
                    }
                } catch {
                }
                try {
                    if (u && u.length == 24) {
                        const S = Y(u), x = S.getBigUint64(0, !0), b = S.getBigUint64(8, !0),
                            h = S.getBigUint64(16, !0);
                        Object.assign(f, {rawLastModDate: x, rawLastAccessDate: b, rawCreationDate: h});
                        const y = jt(x), C = jt(b), R = {lastModDate: y, lastAccessDate: C, creationDate: jt(h)};
                        Object.assign(f, R), Object.assign(i, R)
                    }
                } catch {
                }
            }(L, e), e.extraFieldNTFS = L);
            const s = c.get(21589);
            s && (function (f, i) {
                const o = Y(f.data), u = _t(o, 0), w = [], S = [];
                (1 & u) == 1 && (w.push("lastModDate"), S.push("rawLastModDate")), (2 & u) == 2 && (w.push("lastAccessDate"), S.push("rawLastAccessDate")), (4 & u) == 4 && (w.push("creationDate"), S.push("rawCreationDate"));
                let x = 1;
                w.forEach((b, h) => {
                    if (f.data.length >= x + 4) {
                        const y = Q(o, x);
                        i[b] = f[b] = new Date(1e3 * y);
                        const C = S[h];
                        f[C] = y
                    }
                    x += 4
                })
            }(s, e), e.extraFieldExtendedTimestamp = s)
        }

        async function Ge(n, e, t, r, a) {
            const c = Y(n.data);
            n.version = _t(c, 0), n.signature = Q(c, 1);
            const d = new yt;
            d.append(a[t]);
            const _ = Y(new Uint8Array(4));
            _.setUint32(0, d.get(), !0), n[e] = await Pt(n.data.subarray(5)), n.valid = !a.bitFlag.languageEncodingFlag && n.signature == Q(_, 0), n.valid && (r[e] = n[e], r[e + "UTF8"] = !0)
        }

        function pt(n, e, t) {
            return e[t] === void 0 ? n.options[t] : e[t]
        }

        function kn(n) {
            const e = (4294901760 & n) >> 16, t = 65535 & n;
            try {
                return new Date(1980 + ((65024 & e) >> 9), ((480 & e) >> 5) - 1, 31 & e, (63488 & t) >> 11, (2016 & t) >> 5, 2 * (31 & t), 0)
            } catch {
            }
        }

        function jt(n) {
            return new Date(Number(n / BigInt(1e4) - BigInt(116444736e5)))
        }

        function _t(n, e) {
            return n.getUint8(e)
        }

        function et(n, e) {
            return n.getUint16(e, !0)
        }

        function Q(n, e) {
            return n.getUint32(e, !0)
        }

        function At(n, e) {
            return Number(n.getBigUint64(e, !0))
        }

        function Y(n) {
            return new DataView(n.buffer)
        }

        function ot(n, e, t) {
            return n.readUint8Array(e, t)
        }

        Qt({
            Inflate: function (n) {
                const e = new Kt, t = n && n.chunkSize ? Math.floor(2 * n.chunkSize) : 131072, r = new Uint8Array(t);
                let a = !1;
                e.inflateInit(), e.next_out = r, this.append = function (c, d) {
                    const _ = [];
                    let m, g, v = 0, U = 0, N = 0;
                    if (c.length !== 0) {
                        e.next_in_index = 0, e.next_in = c, e.avail_in = c.length;
                        do {
                            if (e.next_out_index = 0, e.avail_out = t, e.avail_in !== 0 || a || (e.next_in_index = 0, a = !0), m = e.inflate(0), a && m === -5) {
                                if (e.avail_in !== 0) throw new Error("inflating: bad input")
                            } else if (m !== 0 && m !== 1) throw new Error("inflating: " + e.msg);
                            if ((a || m === 1) && e.avail_in === c.length) throw new Error("inflating: bad input");
                            e.next_out_index && (e.next_out_index === t ? _.push(new Uint8Array(r)) : _.push(r.slice(0, e.next_out_index))), N += e.next_out_index, d && e.next_in_index > 0 && e.next_in_index != v && (d(e.next_in_index), v = e.next_in_index)
                        } while (e.avail_in > 0 || e.avail_out === 0);
                        return _.length > 1 ? (g = new Uint8Array(N), _.forEach(function (L) {
                            g.set(L, U), U += L.length
                        })) : g = _[0] || new Uint8Array(0), g
                    }
                }, this.flush = function () {
                    e.inflateEnd()
                }
            }
        }), l.BlobReader = te, l.BlobWriter = class extends mt {
            constructor(n) {
                super(), this.contentType = n, this.arrayBuffers = []
            }

            async writeUint8Array(n) {
                super.writeUint8Array(n), this.arrayBuffers.push(n.buffer)
            }

            getData() {
                return this.blob || (this.blob = new Blob(this.arrayBuffers, {type: this.contentType})), this.blob
            }
        }, l.Data64URIReader = class extends st {
            constructor(n) {
                super(), this.dataURI = n;
                let e = n.length;
                for (; n.charAt(e - 1) == "=";) e--;
                this.dataStart = n.indexOf(",") + 1, this.size = Math.floor(.75 * (e - this.dataStart))
            }

            async readUint8Array(n, e) {
                const t = new Uint8Array(e), r = 4 * Math.floor(n / 3),
                    a = atob(this.dataURI.substring(r + this.dataStart, 4 * Math.ceil((n + e) / 3) + this.dataStart)),
                    c = n - 3 * Math.floor(r / 4);
                for (let d = c; d < c + e; d++) t[d - c] = a.charCodeAt(d);
                return t
            }
        }, l.Data64URIWriter = class extends mt {
            constructor(n) {
                super(), this.data = "data:" + (n || "") + ";base64,", this.pending = []
            }

            async writeUint8Array(n) {
                super.writeUint8Array(n);
                let e = 0, t = this.pending;
                const r = this.pending.length;
                for (this.pending = "", e = 0; e < 3 * Math.floor((r + n.length) / 3) - r; e++) t += String.fromCharCode(n[e]);
                for (; e < n.length; e++) this.pending += String.fromCharCode(n[e]);
                t.length > 2 ? this.data += btoa(t) : this.pending = t
            }

            getData() {
                return this.data + btoa(this.pending)
            }
        }, l.ERR_ABORT = Zt, l.ERR_BAD_FORMAT = Et, l.ERR_CENTRAL_DIRECTORY_NOT_FOUND = Le, l.ERR_ENCRYPTED = Be, l.ERR_EOCDR_LOCATOR_ZIP64_NOT_FOUND = Me, l.ERR_EOCDR_NOT_FOUND = ze, l.ERR_EOCDR_ZIP64_NOT_FOUND = Ie, l.ERR_EXTRAFIELD_ZIP64_NOT_FOUND = We, l.ERR_HTTP_RANGE = Ut, l.ERR_INVALID_PASSWORD = It, l.ERR_INVALID_SIGNATURE = Ot, l.ERR_LOCAL_FILE_HEADER_NOT_FOUND = Oe, l.ERR_UNSUPPORTED_COMPRESSION = Ht, l.ERR_UNSUPPORTED_ENCRYPTION = Ne, l.HttpRangeReader = class extends ce {
            constructor(n, e = {}) {
                e.useRangeHeader = !0, super(n, e)
            }
        }, l.HttpReader = ce, l.Reader = st, l.TextReader = class extends st {
            constructor(n) {
                super(), this.blobReader = new te(new Blob([n], {type: Tt}))
            }

            async init() {
                super.init(), this.blobReader.init(), this.size = this.blobReader.size
            }

            async readUint8Array(n, e) {
                return this.blobReader.readUint8Array(n, e)
            }
        }, l.TextWriter = class extends mt {
            constructor(n) {
                super(), this.encoding = n, this.blob = new Blob([], {type: Tt})
            }

            async writeUint8Array(n) {
                super.writeUint8Array(n), this.blob = new Blob([this.blob, n.buffer], {type: Tt})
            }

            getData() {
                if (this.blob.text) return this.blob.text();
                {
                    const n = new FileReader;
                    return new Promise((e, t) => {
                        n.onload = r => e(r.target.result), n.onerror = () => t(n.error), n.readAsText(this.blob, this.encoding)
                    })
                }
            }
        }, l.Uint8ArrayReader = class extends st {
            constructor(n) {
                super(), this.array = n, this.size = n.length
            }

            async readUint8Array(n, e) {
                return this.array.slice(n, n + e)
            }
        }, l.Uint8ArrayWriter = class extends mt {
            constructor() {
                super(), this.array = new Uint8Array(0)
            }

            async writeUint8Array(n) {
                super.writeUint8Array(n);
                const e = this.array;
                this.array = new Uint8Array(e.length + n.length), this.array.set(e), this.array.set(n, e.length)
            }

            getData() {
                return this.array
            }
        }, l.Writer = mt, l.ZipReader = class {
            constructor(n, e = {}) {
                Object.assign(this, {reader: n, options: e, config: X})
            }

            async getEntries(n = {}) {
                const e = this, t = e.reader;
                if (t.initialized || await t.init(), t.size < 22) throw new Error(Et);
                const r = await async function (L, s, f, i, o) {
                    const u = new Uint8Array(4);
                    (function (x, b, h) {
                        x.setUint32(b, h, !0)
                    })(Y(u), 0, s);
                    const w = i + o;
                    return await S(i) || await S(Math.min(w, f));

                    async function S(x) {
                        const b = f - x, h = await ot(L, b, x);
                        for (let y = h.length - i; y >= 0; y--) if (h[y] == u[0] && h[y + 1] == u[1] && h[y + 2] == u[2] && h[y + 3] == u[3]) return {
                            offset: b + y,
                            buffer: h.slice(y, y + i).buffer
                        }
                    }
                }(t, 101010256, t.size, 22, 1048560);
                if (!r) throw new Error(ze);
                const a = Y(r);
                let c = Q(a, 12), d = Q(a, 16), _ = et(a, 8), m = 0;
                if (d == vt || c == vt || _ == 65535) {
                    const L = Y(await ot(t, r.offset - 20, 20));
                    if (Q(L, 0) != 117853008) throw new Error(Ie);
                    d = At(L, 8);
                    let s = await ot(t, d, 56), f = Y(s);
                    const i = r.offset - 20 - 56;
                    if (Q(f, 0) != de && d != i) {
                        const o = d;
                        d = i, m = d - o, s = await ot(t, d, 56), f = Y(s)
                    }
                    if (Q(f, 0) != de) throw new Error(Me);
                    _ = At(f, 32), c = At(f, 40), d -= c
                }
                if (d < 0 || d >= t.size) throw new Error(Et);
                let g = 0, v = await ot(t, d, c), U = Y(v);
                if (c) {
                    const L = r.offset - c;
                    if (Q(U, g) != le && d != L) {
                        const s = d;
                        d = L, m = d - s, v = await ot(t, d, c), U = Y(v)
                    }
                }
                if (d < 0 || d >= t.size) throw new Error(Et);
                const N = [];
                for (let L = 0; L < _; L++) {
                    const s = new xn(t, e.config, e.options);
                    if (Q(U, g) != le) throw new Error(Le);
                    qe(s, U, g + 6);
                    const f = Boolean(s.bitFlag.languageEncodingFlag), i = g + 46, o = i + s.filenameLength,
                        u = o + s.extraFieldLength, w = et(U, g + 4), S = (0 & w) == 0;
                    Object.assign(s, {
                        versionMadeBy: w,
                        msDosCompatible: S,
                        compressedSize: 0,
                        uncompressedSize: 0,
                        commentLength: et(U, g + 32),
                        directory: S && (16 & _t(U, g + 38)) == 16,
                        offset: Q(U, g + 42) + m,
                        internalFileAttribute: Q(U, g + 34),
                        externalFileAttribute: Q(U, g + 38),
                        rawFilename: v.subarray(i, o),
                        filenameUTF8: f,
                        commentUTF8: f,
                        rawExtraField: v.subarray(o, u)
                    });
                    const x = u + s.commentLength;
                    s.rawComment = v.subarray(u, x);
                    const b = pt(e, n, "filenameEncoding"),
                        h = pt(e, n, "commentEncoding"), [y, C] = await Promise.all([Pt(s.rawFilename, s.filenameUTF8 ? Pe : b || He), Pt(s.rawComment, s.commentUTF8 ? Pe : h || He)]);
                    s.filename = y, s.comment = C, !s.directory && s.filename.endsWith("/") && (s.directory = !0), await Ve(s, s, U, g + 6);
                    const R = new De(s);
                    if (R.getData = (A, E) => s.getData(A, R, E), N.push(R), g = x, n.onprogress) try {
                        n.onprogress(L + 1, _, new De(s))
                    } catch {
                    }
                }
                return N
            }

            async close() {
            }
        }, l.configure = Qt, l.getMimeType = function () {
            return "application/octet-stream"
        }, Object.defineProperty(l, "__esModule", {value: !0})
    })
})(qt, qt.exports);
var Tn = An(qt.exports);

function Cn() {
    return {
        traceUrl: "",
        startTime: Number.MAX_SAFE_INTEGER,
        endTime: 0,
        browserName: "",
        options: {deviceScaleFactor: 1, isMobile: !1, viewport: {width: 1280, height: 800}},
        pages: [],
        resources: [],
        actions: [],
        events: [],
        objects: {},
        hasSource: !1
    }
}

var $e;
(T => {
    function p(l) {
        for (const k of l.splice(0)) k.dispose()
    }

    T.disposeAll = p
})($e || ($e = {}));

class Fn {
    constructor() {
        K(this, "event");
        K(this, "_deliveryQueue");
        K(this, "_listeners", new Set);
        this.event = (p, l) => {
            this._listeners.add(p);
            let k = !1;
            const z = this, M = {
                dispose() {
                    k || (k = !0, z._listeners.delete(p))
                }
            };
            return l && l.push(M), M
        }
    }

    fire(p) {
        const l = !this._deliveryQueue;
        this._deliveryQueue || (this._deliveryQueue = []);
        for (const k of this._listeners) this._deliveryQueue.push({listener: k, event: p});
        if (!!l) {
            for (let k = 0; k < this._deliveryQueue.length; k++) {
                const {listener: z, event: M} = this._deliveryQueue[k];
                z.call(null, M)
            }
            this._deliveryQueue = void 0
        }
    }

    dispose() {
        this._listeners.clear(), this._deliveryQueue && (this._deliveryQueue = [])
    }
}

class Dn {
    constructor(p, l, k) {
        K(this, "_snapshots");
        K(this, "_index");
        K(this, "snapshotName");
        K(this, "_resources");
        K(this, "_snapshot");
        this._resources = p, this._snapshots = l, this._index = k, this._snapshot = l[k], this.snapshotName = l[k].snapshotName
    }

    snapshot() {
        return this._snapshots[this._index]
    }

    viewport() {
        return this._snapshots[this._index].viewport
    }

    render() {
        const p = (M, W, D) => {
            if (typeof M == "string") {
                const H = Mn(M);
                return D === "STYLE" || D === "style" ? Bn(H) : H
            }
            if (!M._string) if (Array.isArray(M[0])) {
                const H = W - M[0][0];
                if (H >= 0 && H <= W) {
                    const B = Ln(this._snapshots[H]), j = M[0][1];
                    j >= 0 && j < B.length && (M._string = p(B[j], H, D))
                }
            } else if (typeof M[0] == "string") {
                const H = [];
                H.push("<", M[0]);
                const B = M[0] === "IFRAME" || M[0] === "FRAME";
                for (const [j, Z] of Object.entries(M[1] || {})) {
                    const dt = B && j.toLowerCase() === "src" ? "__playwright_src__" : j,
                        rt = j.toLowerCase() === "href" || j.toLowerCase() === "src" ? Vt(Z) : Z;
                    H.push(" ", dt, '="', In(rt), '"')
                }
                H.push(">");
                for (let j = 2; j < M.length; j++) H.push(p(M[j], W, M[0]));
                zn.has(M[0]) || H.push("</", M[0], ">"), M._string = H.join("")
            } else M._string = "";
            return M._string
        }, l = this._snapshot;
        let k = p(l.html, this._index, void 0);
        return k ? (k = (l.doctype ? `<!DOCTYPE ${l.doctype}>` : "") + ["<style>*,*::before,*::after { visibility: hidden }</style>", `<style>*[__playwright_target__="${this.snapshotName}"] { background-color: #6fa8dc7f; }</style>`, `<script>${On()}<\/script>`].join("") + k, {
            html: k,
            pageId: l.pageId,
            frameId: l.frameId,
            index: this._index
        }) : {html: "", pageId: l.pageId, frameId: l.frameId, index: this._index}
    }

    resourceByUrl(p) {
        const l = this._snapshot;
        let k;
        for (const z of this._resources) {
            if (typeof z._monotonicTime == "number" && z._monotonicTime >= l.timestamp) break;
            if (z._frameref === l.frameId && z.request.url === p) {
                k = z;
                break
            }
        }
        if (!k) for (const z of this._resources) {
            if (typeof z._monotonicTime == "number" && z._monotonicTime >= l.timestamp) break;
            if (z.request.url === p) return z
        }
        if (k) {
            for (const z of l.resourceOverrides) if (p === z.url && z.sha1) {
                k = {...k, response: {...k.response, content: {...k.response.content, _sha1: z.sha1}}};
                break
            }
        }
        return k
    }
}

const zn = new Set(["AREA", "BASE", "BR", "COL", "COMMAND", "EMBED", "HR", "IMG", "INPUT", "KEYGEN", "LINK", "MENUITEM", "META", "PARAM", "SOURCE", "TRACK", "WBR"]),
    Qe = {"&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"};

function In(T) {
    return T.replace(/[&<>"']/ug, p => Qe[p])
}

function Mn(T) {
    return T.replace(/[&<]/ug, p => Qe[p])
}

function Ln(T) {
    if (!T._nodes) {
        const p = [], l = k => {
            if (typeof k == "string") p.push(k); else if (typeof k[0] == "string") {
                for (let z = 2; z < k.length; z++) l(k[z]);
                p.push(k)
            }
        };
        l(T.html), T._nodes = p
    }
    return T._nodes
}

function On() {
    function T() {
        const p = [], l = [], k = W => {
            for (const D of W.querySelectorAll("[__playwright_scroll_top_]")) p.push(D);
            for (const D of W.querySelectorAll("[__playwright_scroll_left_]")) l.push(D);
            for (const D of W.querySelectorAll("[__playwright_value_]")) D.value = D.getAttribute("__playwright_value_"), D.removeAttribute("__playwright_value_");
            for (const D of W.querySelectorAll("[__playwright_checked_]")) D.checked = D.getAttribute("__playwright_checked_") === "true", D.removeAttribute("__playwright_checked_");
            for (const D of W.querySelectorAll("[__playwright_selected_]")) D.selected = D.getAttribute("__playwright_selected_") === "true", D.removeAttribute("__playwright_selected_");
            for (const D of W.querySelectorAll("iframe, frame")) {
                const H = D.getAttribute("__playwright_src__");
                if (!H) D.setAttribute("src", 'data:text/html,<body style="background: #ddd"></body>'); else {
                    const B = new URL(window.location.href);
                    B.searchParams.delete("pointX"), B.searchParams.delete("pointY");
                    const j = B.pathname.lastIndexOf("/snapshot/");
                    j !== -1 && (B.pathname = B.pathname.substring(0, j + 1)), B.pathname += H.substring(1), D.setAttribute("src", B.toString())
                }
            }
            for (const D of W.querySelectorAll("template[__playwright_shadow_root_]")) {
                const H = D, B = H.parentElement.attachShadow({mode: "open"});
                B.appendChild(H.content), H.remove(), k(B)
            }
            if ("adoptedStyleSheets" in W) {
                const D = [...W.adoptedStyleSheets];
                for (const H of W.querySelectorAll("template[__playwright_style_sheet_]")) {
                    const B = H, j = new CSSStyleSheet;
                    j.replaceSync(B.getAttribute("__playwright_style_sheet_")), D.push(j)
                }
                W.adoptedStyleSheets = D
            }
        }, z = () => {
            window.removeEventListener("load", z);
            for (const B of p) B.scrollTop = +B.getAttribute("__playwright_scroll_top_"), B.removeAttribute("__playwright_scroll_top_");
            for (const B of l) B.scrollLeft = +B.getAttribute("__playwright_scroll_left_"), B.removeAttribute("__playwright_scroll_left_");
            const W = new URL(window.location.href).searchParams, D = W.get("pointX"), H = W.get("pointY");
            if (D) {
                const B = document.createElement("x-pw-pointer");
                B.style.position = "fixed", B.style.backgroundColor = "red", B.style.width = "20px", B.style.height = "20px", B.style.borderRadius = "10px", B.style.margin = "-10px 0 0 -10px", B.style.zIndex = "2147483647", B.style.left = D + "px", B.style.top = H + "px", document.documentElement.appendChild(B)
            }
            document.styleSheets[0].disabled = !0
        }, M = () => k(document);
        window.addEventListener("load", z), window.addEventListener("DOMContentLoaded", M)
    }

    return `
(${T.toString()})()`
}

const Ze = ["about:", "blob:", "data:", "file:", "ftp:", "http:", "https:", "mailto:", "sftp:", "ws:", "wss:"],
    Ke = "http://playwright.bloburl/#";

function Vt(T) {
    T.startsWith(Ke) && (T = T.substring(Ke.length));
    try {
        const p = new URL(T);
        if (p.protocol === "javascript:" || p.protocol === "vbscript:") return "javascript:void(0)";
        if (!(p.protocol === "blob:") && Ze.includes(p.protocol)) return T;
        const k = "pw-" + p.protocol.slice(0, p.protocol.length - 1);
        return p.protocol = "https:", p.hostname = p.hostname ? `${k}--${p.hostname}` : k, p.toString()
    } catch {
        return T
    }
}

const Wn = /url\(['"]?([\w-]+:)\/\//ig;

function Bn(T) {
    return T.replace(Wn, (p, l) => !(l === "blob:") && Ze.includes(l) ? p : p.replace(l + "//", `https://pw-${l.slice(0, -1)}--`))
}

class Nn {
    constructor() {
        K(this, "_resources", []);
        K(this, "_frameSnapshots", new Map);
        K(this, "_didSnapshot", new Fn);
        K(this, "onSnapshotEvent", this._didSnapshot.event)
    }

    clear() {
        this._resources = [], this._frameSnapshots.clear()
    }

    addResource(p) {
        p.request.url = Vt(p.request.url), this._resources.push(p)
    }

    addFrameSnapshot(p) {
        for (const z of p.resourceOverrides) z.url = Vt(z.url);
        let l = this._frameSnapshots.get(p.frameId);
        l || (l = {
            raw: [],
            renderer: []
        }, this._frameSnapshots.set(p.frameId, l), p.isMainFrame && this._frameSnapshots.set(p.pageId, l)), l.raw.push(p);
        const k = new Dn(this._resources, l.raw, l.raw.length - 1);
        l.renderer.push(k), this._didSnapshot.fire(k)
    }

    resources() {
        return this._resources.slice()
    }

    snapshotByName(p, l) {
        const k = this._frameSnapshots.get(p);
        return k == null ? void 0 : k.renderer.find(z => z.snapshotName === l)
    }

    snapshotByIndex(p, l) {
        const k = this._frameSnapshots.get(p);
        return k == null ? void 0 : k.renderer[l]
    }
}

const gt = Tn;

class Pn {
    constructor() {
        K(this, "contextEntry");
        K(this, "pageEntries", new Map);
        K(this, "_snapshotStorage");
        K(this, "_entries", new Map);
        K(this, "_version");
        this.contextEntry = Cn()
    }

    _formatUrl(p) {
        let l = p.startsWith("http") || p.startsWith("blob") ? p : `file?path=${p}`;
        return l.startsWith("https://www.dropbox.com/") && (l = "https://dl.dropboxusercontent.com/" + l.substring(24)), l
    }

    async load(p, l) {
        this.contextEntry.traceUrl = p;
        const k = new gt.ZipReader(new gt.HttpReader(this._formatUrl(p), {
            mode: "cors",
            preventHeadRequest: !0
        }), {useWebWorkers: !1});
        let z, M;
        for (const D of await k.getEntries({onprogress: l})) D.filename.endsWith(".trace") && (z = D), D.filename.endsWith(".network") && (M = D), D.filename.includes("src@") && (this.contextEntry.hasSource = !0), this._entries.set(D.filename, D);
        this._snapshotStorage = new Hn(this._entries);
        const W = new gt.TextWriter;
        await z.getData(W);
        for (const D of (await W.getData()).split(`
`)) this.appendEvent(D);
        if (M) {
            const D = new gt.TextWriter;
            await M.getData(D);
            for (const H of (await D.getData()).split(`
`)) this.appendEvent(H)
        }
        this._build()
    }

    async resourceForSha1(p) {
        const l = this._entries.get("resources/" + p);
        if (!l) return;
        const k = new gt.BlobWriter;
        return await l.getData(k), await k.getData()
    }

    storage() {
        return this._snapshotStorage
    }

    _build() {
        this.contextEntry.actions.sort((p, l) => p.metadata.startTime - l.metadata.startTime), this.contextEntry.resources = this._snapshotStorage.resources()
    }

    _pageEntry(p) {
        let l = this.pageEntries.get(p);
        return l || (l = {screencastFrames: []}, this.pageEntries.set(p, l), this.contextEntry.pages.push(l)), l
    }

    appendEvent(p) {
        if (!p) return;
        const l = this._modernize(JSON.parse(p));
        switch (l.type) {
            case"context-options": {
                this.contextEntry.browserName = l.browserName, this.contextEntry.title = l.title, this.contextEntry.platform = l.platform, this.contextEntry.wallTime = l.wallTime, this.contextEntry.options = l.options;
                break
            }
            case"screencast-frame": {
                this._pageEntry(l.pageId).screencastFrames.push(l);
                break
            }
            case"action": {
                !jn(l.metadata) && (!l.metadata.internal || l.metadata.apiName) && (l.metadata.apiName || (l.metadata.apiName = l.metadata.type + "." + l.metadata.method), this.contextEntry.actions.push(l));
                break
            }
            case"event": {
                const k = l.metadata;
                k.pageId && (k.method === "__create__" ? this.contextEntry.objects[k.params.guid] = k.params.initializer : this.contextEntry.events.push(l));
                break
            }
            case"resource-snapshot":
                this._snapshotStorage.addResource(l.snapshot);
                break;
            case"frame-snapshot":
                this._snapshotStorage.addFrameSnapshot(l.snapshot);
                break
        }
        (l.type === "action" || l.type === "event") && (this.contextEntry.startTime = Math.min(this.contextEntry.startTime, l.metadata.startTime), this.contextEntry.endTime = Math.max(this.contextEntry.endTime, l.metadata.endTime)), l.type === "screencast-frame" && (this.contextEntry.startTime = Math.min(this.contextEntry.startTime, l.timestamp), this.contextEntry.endTime = Math.max(this.contextEntry.endTime, l.timestamp))
    }

    _modernize(p) {
        if (this._version === void 0) return p;
        for (let l = this._version; l < 3; ++l) p = this[`_modernize_${l}_to_${l + 1}`].call(this, p);
        return p
    }

    _modernize_0_to_1(p) {
        return p.type === "action" && typeof p.metadata.error == "string" && (p.metadata.error = {
            error: {
                name: "Error",
                message: p.metadata.error
            }
        }), p
    }

    _modernize_1_to_2(p) {
        return p.type === "frame-snapshot" && p.snapshot.isMainFrame && (p.snapshot.viewport = this.contextEntry.options.viewport || {
            width: 1280,
            height: 720
        }), p
    }

    _modernize_2_to_3(p) {
        if (p.type === "resource-snapshot" && !p.snapshot.request) {
            const l = p.snapshot;
            p.snapshot = {
                _frameref: l.frameId,
                request: {
                    url: l.url,
                    method: l.method,
                    headers: l.requestHeaders,
                    postData: l.requestSha1 ? {_sha1: l.requestSha1} : void 0
                },
                response: {
                    status: l.status,
                    headers: l.responseHeaders,
                    content: {mimeType: l.contentType, _sha1: l.responseSha1}
                },
                _monotonicTime: l.timestamp
            }
        }
        return p
    }
}

class Hn extends Nn {
    constructor(l) {
        super();
        K(this, "_entries");
        this._entries = l
    }

    async resourceContent(l) {
        const k = this._entries.get("resources/" + l), z = new gt.BlobWriter;
        return await k.getData(z), z.getData()
    }
}

function jn(T) {
    return T.method.startsWith("tracing")
}

self.addEventListener("install", function (T) {
    self.skipWaiting()
});
self.addEventListener("activate", function (T) {
    T.waitUntil(self.clients.claim())
});
const qn = new URL(self.registration.scope).pathname, ht = new Map, Gt = new Map;

async function Vn(T, p, l) {
    const k = ht.get(T);
    if (Gt.set(p, T), k) return k.traceModel;
    const z = new Pn;
    await z.load(T, l);
    const M = new Rn(z.storage());
    return ht.set(T, {traceModel: z, snapshotServer: M}), z
}

async function Gn(T) {
    const p = T.request, l = await self.clients.get(T.clientId);
    if (p.url.startsWith(self.registration.scope)) {
        const W = new URL(p.url), D = W.pathname.substring(qn.length - 1);
        if (D === "/ping") return await $n(), new Response(null, {status: 200});
        const H = W.searchParams.get("trace"), {snapshotServer: B} = ht.get(H) || {};
        if (D === "/context") try {
            const j = await Vn(H, T.clientId, (Z, dt) => {
                l.postMessage({method: "progress", params: {done: Z, total: dt}})
            });
            return new Response(JSON.stringify(j.contextEntry), {
                status: 200,
                headers: {"Content-Type": "application/json"}
            })
        } catch (j) {
            console.error(j);
            const Z = W.searchParams.get("traceFileName");
            return new Response(JSON.stringify({error: Z ? `Could not load trace from ${Z}. Make sure to upload a valid Playwright trace.` : `Could not load trace from ${H}. Make sure a valid Playwright Trace is accessible over this url.`}), {
                status: 500,
                headers: {"Content-Type": "application/json"}
            })
        }
        if (D.startsWith("/snapshotInfo/")) return B ? B.serveSnapshotInfo(D, W.searchParams) : new Response(null, {status: 404});
        if (D.startsWith("/snapshot/")) return B ? B.serveSnapshot(D, W.searchParams, p.url) : new Response(null, {status: 404});
        if (D.startsWith("/sha1/")) {
            for (const {traceModel: j} of ht.values()) {
                const Z = await j.resourceForSha1(D.slice(6));
                if (Z) return new Response(Z, {status: 200})
            }
            return new Response(null, {status: 404})
        }
        return fetch(T.request)
    }
    const k = l.url, z = new URL(k).searchParams.get("trace"), {snapshotServer: M} = ht.get(z) || {};
    return M ? M.serveResource(p.url, k) : new Response(null, {status: 404})
}

async function $n() {
    const T = await self.clients.matchAll(), p = new Set;
    for (const [l, k] of Gt) T.find(z => z.id === l) ? p.add(k) : Gt.delete(l);
    for (const l of ht.keys()) p.has(l) || ht.delete(l)
}

self.addEventListener("fetch", function (T) {
    T.respondWith(Gn(T))
});
