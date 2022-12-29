import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each([
  ['file1.json', 'file2.json', 'stylish', 'comparedStylish.txt'],
  ['file1.json', 'file2.json', 'plain', 'comparedPlain.txt'],
  ['file1.json', 'file2.json', 'json', 'comparedJSON.txt'],
  ['file1.yml', 'file2.yml', 'stylish', 'comparedStylish.txt'],
  ['file1.yml', 'file2.yml', 'plain', 'comparedPlain.txt'],
  ['file1.yml', 'file2.yml', 'json', 'comparedJSON.txt'],
])('compare %p, %p  format %p) ', (file1, file2, format, expectedResult) => {
  const recieved = genDiff(getFixturePath(file1), getFixturePath(file2), format);
  const expected = readFile(expectedResult);
  expect(expected).toEqual(recieved);
});

test('compare without passing format', () => {
  const recieved = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('comparedStylish.txt');
  expect(expected).toEqual(recieved);
});
