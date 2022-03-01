import { getGameHash, byte2Num, hash2Bytes } from "./util";

const spinData = {
    regularWeightTable: {
        0: [5, 15, 30, 55, 105, 205, 355, 855, 1355, 1855, 2355, 6225, 10095, 13965, 17835],
        1: [5, 15, 30, 55, 105, 205, 355, 855, 1355, 1855, 2355, 5355, 8355, 11355, 14355, 15355, 20355],
        2: [5, 15, 30, 55, 105, 205, 355, 855, 1355, 1855, 2355, 5355, 8355, 11355, 14355, 15355, 20352],
        3: [5, 15, 30, 55, 105, 205, 355, 855, 1355, 1855, 2355, 5355, 8355, 11355, 14355, 15355, 17150],
        4: [5, 15, 30, 55, 105, 205, 355, 855, 1355, 1855, 2355, 6225, 10095, 13965, 17835]
    },
    catSpin: [25, 75, 150, 275, 525, 825, 1125, 1625, 2125, 2625, 3125, 5125],
    bonusWeightTable: [50, 150, 300, 550, 850, 1250, 1650, 2150, 2650, 3150, 3650, 4150, 4650, 5150, 5650]
}

function getNum(hash, weightArray, i = 0) {
    const num = byte2Num(hash2Bytes(hash, i))
    const total = weightArray[weightArray.length - 1];
    return num * total;
}

function getRegularWeights(hash) {
    return [...Array(5).keys()].map((i) => getNum(hash, spinData.regularWeightTable[i], i));
}

function getSpinWeight(arr, val) {
    return arr.find((x, i, a) => i < a.length - 1 ? x >= val : x);
}

function getSymbol(arr, val) {
    return arr.indexOf(getSpinWeight(arr, val)) + 1;
}

function regularSpin(reel, val) {
    const { regularWeightTable } = spinData;
    const arr = regularWeightTable[reel];
    return getSymbol(arr, val)
}

function catSpin(hash) {
    const { catSpin: arr } = spinData;
    const val = getNum(hash, arr)
    const symbol = getSymbol(arr, val)
    return symbol === arr.length ? 17 : symbol;
}

export default function calculateSwords(server, client, nonce, round) {
    const hmacSha256Result = getGameHash(server, client, nonce, round);
    const catRespinHash = getGameHash(server, client, nonce, 1);
    const resultList = getRegularWeights(hmacSha256Result).map((weight, reel) => {
        let symbol = regularSpin(reel, weight);
        if (symbol === 16) symbol = catSpin(catRespinHash);
        if (symbol === 17) return `${symbol}-${reel}`;
        return symbol
    });
    return { resultList, hmacSha256Result }
}