import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  return _.isString(value) ? `'${value}'` : value;
};

export default (obj) => {
  const iter = (data, acc) => {
    const result = data.flatMap((node) => {
      const {
        name, type, value, newValue,
      } = node;
      const newAcc = (acc === '') ? `${name}` : `${acc}.${name}`;
      switch (type) {
        case 'added':
          return `Property '${newAcc}' was added with value: ${stringify(value)}`;
        case 'deleted':
          return `Property '${newAcc}' was removed`;
        case 'changed':
          return `Property '${newAcc}' was updated. From ${stringify(value)} to ${stringify(newValue)}`;
        case 'nested':
          return iter(value, newAcc);
        case 'unchanged':
          return [];
        default:
          return 'invalid';
      }
    });
    return [...result].join('\n');
  };
  return iter(obj, '');
};
