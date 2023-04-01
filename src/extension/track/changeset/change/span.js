/* eslint-disable */
// ::- Stores metadata for a part of a change.
export class Span {
    length;
    data;
    constructor(length, data) {
        // :: number
        this.length = length;
        // :: any
        this.data = data;
    }
    cut(length) {
        return length == this.length ? this : new Span(length, this.data);
    }
    static slice(spans, from, to) {
        if (from == to)
            return Span.none;
        if (from == 0 && to == Span.len(spans))
            return spans;
        let result = [];
        for (let i = 0, off = 0; off < to; i++) {
            let span = spans[i], end = off + span.length;
            let overlap = Math.min(to, end) - Math.max(from, off);
            if (overlap > 0)
                result.push(span.cut(overlap));
            off = end;
        }
        return result;
    }
    static join(a, b, combine) {
        if (a.length == 0)
            return b;
        if (b.length == 0)
            return a;
        let combined = combine(a[a.length - 1].data, b[0].data);
        if (combined == null)
            return a.concat(b);
        let result = a.slice(0, a.length - 1);
        result.push(new Span(a[a.length - 1].length + b[0].length, combined));
        for (let i = 1; i < b.length; i++)
            result.push(b[i]);
        return result;
    }
    static len(spans) {
        let len = 0;
        for (let i = 0; i < spans.length; i++)
            len += spans[i].length;
        return len;
    }
    static get none() {
        return [];
    }
}
// Span.none = []
//# sourceMappingURL=span.js.map