import { cwd } from 'process';
import path, { resolve } from 'path';
import { readFileSync } from 'fs';
import genDiff from './gendiff.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const readFile = (filepath) => {
  const currentDir = cwd(filepath);
  const absPath = resolve(currentDir, filepath);
  const content = readFileSync(absPath, 'utf-8');
  return content;
};

export const getFileExtention = (file) => path.extname(file);

export default (file1, file2, format = 'stylish') => {
  const getData1 = parse(readFile(file1), getFileExtention(file1));
  const getData2 = parse(readFile(file2), getFileExtention(file2));
  const diff = genDiff(getData1, getData2);
  return formatter(diff, format);
};
