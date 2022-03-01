import CryptoJS from "crypto-js";

import { getGameHash, createNums, sha256 } from './util.js'

const kenoNums = [1, 30, 11, 40, 2, 29, 12, 39, 3, 28, 13, 38, 4, 27, 14, 37, 5, 26, 15, 36, 6, 25, 16, 35, 7, 24, 17, 34, 8, 23, 18, 33, 9, 22, 19, 32, 10, 21, 20, 31];

function getKenoResult(hash) {
	return createNums(createNums(kenoNums, hash), sha256(hash)).slice(0, 10).map(({ num: { num } }) => num);
}

function seedGenKenoMultiplayer(hash, salt) {
	const hmac = CryptoJS.HmacSHA256(CryptoJS.enc.Hex.parse(hash), salt);
	return hmac.toString(CryptoJS.enc.Hex);
}

export function calculateKenoSingle(serverSeed, clientSeed, nonce) {
	const hmacSha256Result = getGameHash(serverSeed, clientSeed, nonce)
	const resultList = getKenoResult(hmacSha256Result);
	return { resultList, hmacSha256Result }
}

export function calculateKeno(hash, salt) {
	const hmacSha256Result = seedGenKenoMultiplayer(hash, salt)
	const resultList = getKenoResult(hmacSha256Result);
	return { resultList, hmacSha256Result }
}