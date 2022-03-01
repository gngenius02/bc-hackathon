
import { createNums, getGameHash, sha256 } from './util.js'

const minesNums = [7, 2, 19, 25, 1, 13, 5, 24, 14, 6, 15, 9, 22, 16, 3, 17, 18, 20, 8, 21, 4, 12, 10, 23, 11];

function getMinesResult(hash) {
    return createNums(createNums(minesNums, hash), sha256(hash)).map(({ num: { num } }) => num);
}

export default function calculateMines(serverSeed, clientSeed, nonce) {
    const hmacSha256Result = getGameHash(serverSeed, clientSeed, nonce)
    const resultList = getMinesResult(hmacSha256Result);
    return { resultList, hmacSha256Result }
}
