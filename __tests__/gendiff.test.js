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
  const recieved = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish');
  const expected = readFile('comparedFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare two YAML files', () => {
  const recieved = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish');
  const expected = readFile('comparedFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare nested json files', () => {
  const recieved = genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'stylish');
  const expected = readFile('comparedNestedFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare nested yml files', () => {
  const recieved = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'stylish');
  const expected = readFile('comparedNestedFiles.txt');
  expect(expected).toEqual(recieved);
});

test('compare plain json', () => {
  const recieved = genDiff(getFixturePath('file3.json'), getFixturePath('file4.json'), 'plain');
  const expected = readFile('comparedPlain.txt');
  expect(expected).toEqual(recieved);
});

test('compare plain json', () => {
  const recieved = genDiff(getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'plain');
  const expected = readFile('comparedPlain.txt');
  expect(expected).toEqual(recieved);
});
