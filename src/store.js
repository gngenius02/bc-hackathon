import { writable, readable } from 'svelte/store'

// All Games
export const results = writable([]);
export const server = writable("baa020359bdde394acb4017e6bb9f6c20e0c175d6ca6db33aa8045885ce96e16");
export const client = writable("abcde12345");
export const nonce = writable(1);

// Mines
export const mines = writable(10);

// HiLo
export const hiloRounds = writable(10);

// Beauties
export const beautiesRounds = writable(0);

// Swords
export const swordsRounds = writable(0);

// Keno MultiPlayer
export const kenoSalt = readable("000000000000000000076973be291d219d283d4af9135601ff37df46491cca7e");

// Plinko
export const rows = writable(8);
export const risk = writable('high');
