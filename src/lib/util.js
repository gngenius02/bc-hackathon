// import { createHmac, createHash } from 'crypto';

function leftrotate(str, d) {
    return str.substring(d, str.length) + str.substring(0, d);
}

export function getRandom(fullHash, index, events) {
    return Math.floor(Number(BigInt(parseInt(fullHash.substring(8 * index, 8 * index + 14), 16)) >> 3n) * Math.pow(2, -53) * events);
}

export function byte2Num(byte) {
    return [...new Array(4).keys()].reduce((acc, i) => acc + parseInt(byte.substr(i * 2, 2), 16) / Math.pow(256, i + 1), 0)
}

export function byte2NumLimbo(bytes) {
    return Math.max(1, Math.floor(99 / (1 - (parseInt(bytes, 16) / Math.pow(2, 52)))) / 100);
}

export function hash2Bytes(hash, i = 0, len = 8) {
    const start = 8 * i;
    return hash.substr(start, len)
}

export function sha256(msg) {
    return createHash("SHA256").update(msg).digest("hex")
}

export function getGameHash(server, ...args) {
    return createHmac("sha256", server).update(args.join(":")).digest("hex");
}

export function getGameHash512(server, ...args) {
    return createHmac("sha512", server).update(args.join(":")).digest("hex");
}

export function createNums(allNums, hashInput) {
    let hash = sha256(hashInput);
    const nums = allNums.map((num, i) => ({ num, hash: leftrotate(hash, i) }))
    nums.sort((o1, o2) => (o1.hash < o2.hash) ? -1 : (o1.hash === o2.hash) ? 0 : 1);
    return nums;
}