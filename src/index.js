import { cwd } from 'process';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import genDiff from './gendiff.js';

const readFile = (path) => {
  const currentDir = cwd(path);
  const absPath = resolve(currentDir, path);
  const content = readFileSync(absPath, 'utf-8');
  return content;
};

export default (file1, file2) => {
  const getData1 = JSON.parse(readFile(file1));
  const getData2 = JSON.parse(readFile(file2));
  console.log(genDiff(getData1, getData2));
};
