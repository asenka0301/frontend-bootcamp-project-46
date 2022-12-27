import { test, expect } from '@jest/globals';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFileSync } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('compare two JSON files', () => {
  const recieved = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  const expected = readFile('comparedFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare two YAML files', () => {
  const recieved = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  const expected = readFile('comparedFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare two YAML files where one is empty', () => {
  const recieved = genDiff(getFixturePath('file1.yml'), getFixturePath('file3_empty.yml'));
  const expected = readFile('comparedEmptyFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare two equivalent YAML files', () => {
  const recieved = genDiff(getFixturePath('file2.yml'), getFixturePath('file4_equal.yml'));
  const expected = readFile('comparedEqualFiles.txt');
  expect(expected).toEqual(recieved);
});
