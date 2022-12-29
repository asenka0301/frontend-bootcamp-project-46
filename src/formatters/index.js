import stylish from './stylish.js';
import plain from './plain.js';

export default (obj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return JSON.stringify(obj);
    default:
      throw new Error(`${format} is not supported.`);
  }
};
