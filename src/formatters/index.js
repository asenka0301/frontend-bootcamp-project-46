import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (obj, format) => {
  if (format === 'stylish') {
    return stylish(obj);
  }
  return plain(obj);
};

export default formatter;
