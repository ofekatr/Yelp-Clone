export default function range(start, end) {
    const lst: number[] = [];
    for (let i = start; i < end; i++) {
        lst.push(i);
    }
    return lst;
}