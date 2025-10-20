import { Tiktoken } from 'js-tiktoken/lite';
import o200k_base from 'js-tiktoken/ranks/o200k_base';

const enc = new Tiktoken(o200k_base);

const userQuery = 'Hey There, I am Piyush Garg';
const tokens = enc.encode(userQuery);

console.log({ tokens });
console.log({ userQuery });
const inputTokens = [25216, 3274, 11, 357, 939, 398, 3403, 1776, 170676];
const decoded = enc.decode(inputTokens);
console.log({ decoded });
