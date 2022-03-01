import { getGameHash, getGameHash512, byte2Num, hash2Bytes } from './util'

export function calculateClassicDice(server, client, nonce) {
    const hmacSha256Result = getGameHash(server, client, nonce);
    const hash = hash2Bytes(hmacSha256Result)
    const resultList = Math.floor(byte2Num(hash) * 10001) / 100;
    return { resultList, hmacSha256Result }
}

export function calculateHashDice(server, client, nonce) {
    const hmacSha512Result = getGameHash512(server, client, nonce);
    var index = 0;
    do {
        var lucky = parseInt(hmacSha512Result.substr(index, 5), 16);
        index += 5;
    } while (lucky >= 1000000);
    const resultList = lucky % 100000;
    return { resultList, hmacSha512Result }
}