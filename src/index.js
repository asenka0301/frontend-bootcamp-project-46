import { cwd } from 'process';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import genDiff from './gendiff.js';
import parser from './parsers.js';
import stylish from './stylish.js';

const readFile = (path) => {
  const currentDir = cwd(path);
  const absPath = resolve(currentDir, path);
  const content = readFileSync(absPath, 'utf-8');
  return content;
};

export const getFileExtention = (file) => {
  const [, extention] = file.split('.');
  return `.${extention}`;
};

export default (file1, file2) => {
  const getData1 = parser(readFile(file1), getFileExtention(file1));
  const getData2 = parser(readFile(file2), getFileExtention(file2));
  const result = genDiff(getData1, getData2);
  return stylish(result);
};
