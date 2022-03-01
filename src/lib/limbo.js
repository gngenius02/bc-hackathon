import { getGameHash, hash2Bytes, byte2NumLimbo } from './util'

export default function calculateLimbo(server, client, nonce) {
    const hmacSha256Result = getGameHash(server, client, nonce);
    const hash = hash2Bytes(hmacSha256Result, 0, 13);
    const resultList = byte2NumLimbo(hash).toFixed(2) + "x";
    return { resultList, hmacSha256Result }
}