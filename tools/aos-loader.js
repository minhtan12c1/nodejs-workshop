var loaderUtils = require("loader-utils");
var path = require('path');
var fs = require('fs');
var get = require('lodash/get');
var set = require('lodash/set');

function getLabelValue(labelLine) {
  const matches = labelLine.match(/'(.*?)'/);
  if (matches && matches.length) {
    return matches[1];
  }

  return '';
}

function makeI18nLabelKey(label, prefix) {
  label = (label || 'empty').toLowerCase().replace(/[\.\"\'\:\(\)\/\s]/g, '_');
  return prefix+label;
}

function generatePrefix(fpath) {
  let dirName = path.parse(fpath).dir;
  let srcApiStr = `${path.sep}src${path.sep}api`;
  let fromIdx = dirName.indexOf(srcApiStr);
  if (fromIdx>=0) {
    let start = fromIdx + srcApiStr.length;
    let apiDirs = dirName.substring(start);
    let dirs = apiDirs.split(path.sep).filter(function(x) { return x; }).join('.');
    let basename = path.basename(fpath, '.js');

    return `${dirs}.${basename}.`
  }

  return '';
}

function makeI18nLabel(labelLine, fpath) {
  let l = labelLine.replace('label', 'i18n_label');
  let lvalue = getLabelValue(l);
  return l.replace(`'${lvalue}'`, `'${makeI18nLabelKey(lvalue, generatePrefix(fpath))}'`);
}

function extractKeyVal(line, fpath) {
  let v = getLabelValue(line);
  let k = makeI18nLabelKey(v, generatePrefix(fpath));

  return { key: k, value: v};
}

function updateLocaleFiles(keyVal, langdir) {
  let langs = Object.getOwnPropertyNames(JSON.parse(fs.readFileSync(path.resolve(langdir, 'map.json'))).map);

  langs.forEach(function (lang) {
    let l = JSON.parse(fs.readFileSync(path.resolve(langdir, lang+'.json')));

    let shouldUpdate = false;
    keyVal.forEach(function (it) {
      if (!get(l, it.key)) {
        set(l, it.key, it.value);
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      fs.writeFileSync(path.resolve(langdir, lang+'.json'), JSON.stringify(l,null,2));
    }
  });
}

module.exports = function loader(source) {
  if (this.resourcePath) {
    const options = loaderUtils.getOptions(this);
    const fpath = this.resourcePath;
    const srcByLines = source.split('\n');
    // get label lines
    let labelLines = srcByLines
      .map(function (l,idx) { return { idx, l}; })
      .filter(function (l) { return /label/g.test(l.l) && !/i18n_label/g.test(srcByLines[l.idx-1].l); });
    
    if (labelLines) {
      let i = 0;
      labelLines.forEach(function (ll) {
        srcByLines.splice(ll.idx+i, 0, makeI18nLabel(ll.l, fpath));
        i++;
      });

      if (options && options.langDir) {
        let keyVal = labelLines.map(function (ll) { return extractKeyVal(ll.l, fpath); });
        updateLocaleFiles(keyVal, options.langDir);
      }
    }

    return srcByLines.join('\n');
  }

  return source;
}