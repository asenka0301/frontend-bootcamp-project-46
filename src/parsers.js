import yaml from 'js-yaml';

const parser = (data, extention) => {
  let parse;
  if (extention === '.json') {
    parse = JSON.parse;
  } else if (extention === '.yml' || extention === '.yaml') {
    parse = yaml.load;
  }
  return parse(data);
};

export default parser;
