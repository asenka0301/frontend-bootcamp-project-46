import _ from 'lodash';

const indentSymbol = '  ';
const openSymbol = '{';
const closeSymbol = '}';
const labels = {
  deleted: '-',
  added: '+',
  unchanged: ' ',
  nested: ' ',
};

const addPrefix = (key, type, indent) => `${indent}${labels[type]} ${key}`;

export default (obj1, obj2) => {
  const keys = _.sortBy(_.union(_.keys(obj1), _.keys(obj2)));
  const result = keys.map((key) => {
    if (!_.has(obj1, key)) {
      return `${addPrefix(key, 'added', indentSymbol)}: ${obj2[key]}`;
    }
    if (!_.has(obj2, key)) {
      return `${addPrefix(key, 'deleted', indentSymbol)}: ${obj1[key]}`;
    }
    if (obj1[key] !== obj2[key]) {
      return `${addPrefix(key, 'deleted', indentSymbol)}: ${obj1[key]}\n${addPrefix(key, 'added', indentSymbol)}: ${obj2[key]}`;
    }
    return `${addPrefix(key, 'unchanged', indentSymbol)}: ${obj1[key]}`;
  });
  return `${openSymbol}\n${result.join('\n')}\n${closeSymbol}`;
};
