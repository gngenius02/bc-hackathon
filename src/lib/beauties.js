import { getGameHash, byte2Num, hash2Bytes } from "./util";

const beautyIcons = [
	[3, 7, 10, 9, 7, 8, 10, 6, 9, 8, 4, 10, 8, 9, 10, 8, 2, 10, 7, 5, 10, 3, 8, 7, 12, 6, 10, 2, 9, 7, 8, 10, 12, 7, 8, 9, 10, 8, 6, 12, 7, 10, 8, 9, 3, 5, 1, 7, 12, 9, 8, 1, 7, 5, 10, 9, 4, 9, 10, 7, 5, 10, 12, 9, 6, 7, 2, 9, 4, 5, 1, 7, 8, 10, 9, 4, 8, 3, 10, 6, 3, 7, 10, 9],
	[4, 2, 9, 8, 10, 8, 9, 11, 5, 9, 8, 10, 8, 5, 10, 13, 13, 13, 13, 7, 5, 4, 7, 6, 10, 5, 6, 10, 1, 10, 11, 7, 10, 4, 9, 11, 6, 9, 1, 6, 8, 10, 3, 2, 10, 7, 11, 6, 5, 13, 13, 13, 13, 1, 8, 9, 10, 4, 3, 5, 10, 9, 11, 8, 9, 7, 6, 9, 7, 8, 10, 3, 5, 10, 9, 7, 8, 3, 7, 2, 10, 6, 10, 8, 4, 3, 4, 2, 9, 8],
	[3, 9, 10, 9, 4, 8, 7, 10, 2, 13, 13, 13, 1, 8, 10, 9, 11, 9, 10, 8, 10, 12, 9, 1, 8, 10, 1, 9, 8, 12, 3, 9, 7, 12, 3, 8, 11, 6, 13, 13, 13, 9, 11, 2, 3, 10, 5, 7, 2, 5, 9, 8, 7, 12, 10, 4, 9, 11, 4, 5, 8, 9, 6, 1, 13, 13, 13, 3, 6, 7, 2, 11, 6, 12, 7, 6, 10, 4, 9, 5, 10, 8, 9, 7, 2, 7, 3, 9, 10, 9],
	[2, 7, 11, 8, 9, 3, 8, 10, 11, 6, 8, 9, 3, 10, 1, 8, 7, 9, 2, 6, 10, 3, 9, 8, 4, 13, 13, 13, 13, 9, 3, 7, 10, 1, 10, 11, 9, 2, 7, 3, 1, 9, 8, 10, 11, 9, 1, 4, 5, 3, 10, 8, 4, 5, 9, 2, 10, 3, 9, 8, 4, 13, 13, 13, 13, 6, 8, 5, 9, 4, 11, 5, 2, 10, 8, 4, 3, 5, 2, 10, 2, 7, 11, 8],
	[3, 8, 6, 9, 10, 2, 10, 9, 7, 1, 10, 5, 7, 10, 12, 8, 10, 9, 13, 13, 13, 9, 10, 8, 12, 9, 2, 10, 1, 10, 9, 7, 12, 1, 10, 8, 9, 13, 13, 13, 9, 6, 6, 2, 12, 3, 10, 4, 9, 7, 1, 10, 4, 12, 5, 8, 3, 10, 4, 10, 3, 8, 6, 9]
]

function getColumnIconQty(col) {
	return col % 2 === 0 ? 3 : 4;
}

function getIcons(hash) {
	return [...new Array(5).keys()].map((col) => {
		const nums = byte2Num(hash2Bytes(hash, col));
		const columnLen = beautyIcons[col].length - 4;
		const num = Math.floor(nums * columnLen);
		return beautyIcons[col].slice(num, num + getColumnIconQty(col));
	});
}

export default function calculateBeauties(server, client, nonce, round, index) {
	const hmacSha256Result = getGameHash(server, client, nonce, round);
	const resultList = getIcons(hmacSha256Result)
	return { resultList, hmacSha256Result }
}