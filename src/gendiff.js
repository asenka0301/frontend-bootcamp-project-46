import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return { name: key, type: 'added', value: obj2[key] };
    }
    if (!_.has(obj2, key)) {
      return { name: key, type: 'deleted', value: obj1[key] };
    }
    if ((_.isPlainObject(obj1[key])) && (_.isPlainObject(obj2[key]))) {
      return { name: key, type: 'nested', value: genDiff(obj1[key], obj2[key]) };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key, type: 'changed', value: obj1[key], newValue: obj2[key],
      };
    }
    return { name: key, type: 'unchanged', value: obj1[key] };
  });
  return result;
};

export default genDiff;
