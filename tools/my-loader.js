var loaderUtils = require("loader-utils");
var path = require('path');
var fs = require('fs');
var get = require('lodash/get');
var set = require('lodash/set');

function getValue(labelLine) {
  const matches = labelLine.match(/'(.*?)',$/);
  if (matches && matches.length) {
    return matches[1];
  }

  return '';
}

function getFullValue(lines) {
  if (lines && lines.length > 1) {
    const flmatch = lines[0].match(/'(.*?)'\s*\+$/);
    const fl = [flmatch[1]];
    lines.slice(1).forEach(l => {
      const lmatch = l.match(/'(.*?)'\s*[\+\,]$/);
      fl.push(lmatch[1])
    })

    return fl.join('');
  }

  return getValue(lines[0]);
}

function getFirstValueForKey(lines) {
  if (lines && lines.length > 1) {
    const matches = lines[0].match(/'(.*?)' ?\+$/);
    if (matches && matches.length) {
      return matches[1];
    }
  }

  return getValue(lines[0]);
}

function numberOfSpacesAtFirst(line) {
  let i = 0;
  while (line[i]===' ') {
    i++
  }
  return i;
}

function makeI18nKeyWithPrefix(label, prefix) {
  label = (label.trim() || 'empty').toLowerCase().replace(/[\.\,\"\'\:\(\)\/\+\\=\s%]/g, '_');
  label = label
    .replace(/_+/g, '_')
    .replace(/_$/g, '');

  let key = prefix + label;
  return key;
}

function genTemplate(fpath, sp) {
  let srcStr = `${path.sep}src${path.sep}api`
  let result = '';
  let childNum = '';
  if (sp >= 0) {
    srcStr = `${path.sep}src${path.sep}router`;
    childNum = `child_lv_${Math.round((sp - 4) / 4)}.`;
    result = 'title.';
  } else if (sp === -1) {
    result = 'fields.';
  } else if(sp === -3) {
    srcStr = `${path.sep}src${path.sep}model`
    result = 'modelFields.';
  } else {
    result = 'hints.';
  }

  let dirName = path.parse(fpath).dir;
  let fromIdx = dirName.indexOf(srcStr);

  if (fromIdx>=0) {
    let start = fromIdx + srcStr.length;
    let sDirs = dirName.substring(start);
    let dirs = sDirs.split(path.sep).filter(x => x).join('.');
    dirs = dirs? dirs+'.' : '';
    let basename = path.basename(fpath, '.js').replace(/\./g, '_');
    basename = basename? basename+'.': '';

    return `${result}${dirs}${basename}${childNum}`
  }

  return result;
}

function makeI18nLine(line, fpath, title, sp) {
  let l = line.replace(title, `i18n_${title}`);
  let lvalue = getValue(l);
  return l.replace(`'${lvalue}'`, `'${makeI18nKeyWithPrefix(lvalue, genTemplate(fpath, sp))}'`);
}

function makeI18nHintLine(lines, fpath) {
  let l = lines[0].replace('hint', 'i18n_hint');
  l = l.substring(0, l.indexOf(':') + 1);
  let lvalue = getFirstValueForKey(lines);
  let vl = makeI18nKeyWithPrefix(lvalue, genTemplate(fpath, -2));
  if ((l.length + vl.length + 4) >= 150) {
    const hvl = vl.length / 2;
    const sp = numberOfSpacesAtFirst(l);
    const blanks = (new Array(sp+1)).join(' ')
    return [
      `${l} '${vl.substring(0, hvl)}' +`,
      `${blanks}'${vl.substring(hvl)}',`,
    ];
  }
  const fullLine = `${l} '${makeI18nKeyWithPrefix(lvalue, genTemplate(fpath, -2))}',`;

  return [fullLine];
}

function extractKeyVal(line, fpath, sp) {
  let v = getValue(line);
  let k = makeI18nKeyWithPrefix(v, genTemplate(fpath, sp));

  return { key: k, value: v};
}

function extractKeyValMulti(lines, fpath) {
  let v = getFullValue(lines).replace(/\\n/g, '<br/>').replace('\\\'', '\'');
  let k = makeI18nKeyWithPrefix(getFirstValueForKey(lines), genTemplate(fpath, -2));
  return { key: k, value: v};
}

function updateLocaleFiles(keyVal, langdir, outdir) {
  // let langs = Object.keys(JSON.parse(fs.readFileSync(path.resolve(langdir, 'map.json'))).map);
  let langs = ['en'];

  langs.forEach(function (lang) {
    let l = JSON.parse(fs.readFileSync(path.resolve(outdir, lang+'.json')));

    let shouldUpdate = false;
    keyVal.forEach(function (it) {
      if (it.key && it.value && get(l, it.key) === undefined) {
        set(l, it.key, it.value.trim());
        shouldUpdate = true;
      }
    });

    if (shouldUpdate) {
      fs.writeFileSync(path.resolve(outdir, lang+'.json'), JSON.stringify(l,null,2) + '\n');
    }
  });
}

function byString(matchRegex, notmatchRegex) {
  return (lines) => {
    return (l) => matchRegex.test(l.l) && !notmatchRegex.test(lines[l.idx-1].l);
  };
}

function reduceMultiLines(matchRegex) {
  return (acc, l) => {
    if (matchRegex.test(l.l)) {
      const i = acc.find(s => s.start === l.idx);
      if (!i) {
        acc.push({
          start: l.idx,
          val: [l.l],
          end: l.idx,
        });
      }
    }

    const last = acc.pop();
    if (last) {
      if (!last.done && last.start <= l.idx) {
        last.end = l.idx;
        if (last.end > last.start) {
          last.val.push(l.l);
        }
        if (/',$/g.test(l.l)) {
          last.done = true;
        }
      }
      acc.push(last);
    }

    return acc;
  }
}

function processLine(srcByLines, fpath, options, filterFunc, lineFunc, extractFunc, title, sp) {
  let lines = [...srcByLines];
  let labelLines = lines
      .map(function (l,idx) { return { idx, l }; })
      .filter(filterFunc(lines));

  if (labelLines) {
    let i = 0;
    labelLines.forEach(function (ll) {
      lines.splice(ll.idx+i, 0, lineFunc(ll.l, fpath, title, sp));
      i++;
    });
    if (options && options.outDir && options.langDir) {
      let keyVal = labelLines.map(function (ll) { return extractFunc(ll.l, fpath, sp); });
      updateLocaleFiles(keyVal, options.langDir, options.outDir);
    }
  }

  return lines
}

function makeHintLine(srcByLines, fpath, options, reduceFunc, lineFunc, extractFunc) {
  let lines = [...srcByLines];
  let labelLines = lines
      .map(function (l,idx) { return { idx, l }; })
      .reduce(reduceFunc, []);

  if (labelLines) {
    let i = 0;
    labelLines.forEach(function (ll) {
      const l = lineFunc(ll.val, fpath);
      lines.splice(ll.start+i, 0, ...l)
      i = i + l.length;
    });
  }

  if (options && options.outDir && options.langDir) {
    let keyVal = labelLines.map(function (ll) { return extractFunc(ll.val, fpath); });
    updateLocaleFiles(keyVal, options.langDir, options.outDir);
  }

  return lines
}

function processTitleLine(srcByLines, fpath, options) {
  return processLine(srcByLines, fpath, options, byString(/title\:/g, /i18n_title\:/g), makeI18nLine, extractKeyVal, 'title', numberOfSpacesAtFirst(srcByLines));
}

function processLabelLine(srcByLines, fpath, options) {
  return processLine(srcByLines, fpath, options, byString(/label\:/g, /i18n_label\:/g), makeI18nLine, extractKeyVal, 'label', -1);
}

function processModelTitleLine(srcByLines, fpath, options) {
  if (srcByLines.find(it => it.includes('const SCALARS'))) {
    return processLine(srcByLines, fpath, options, byString(/title\:/g, /i18n_title\:/g), makeI18nLine, extractKeyVal, 'title', -3);
  } else if (srcByLines.find(it => it.includes('view:'))) {
    return processLine(srcByLines, fpath, options, byString(/label\:/g, /i18n_label\:/g), makeI18nLine, extractKeyVal, 'label', -3);
  }
  return srcByLines;
}

function processModelNameLine(srcByLines, fpath, options) {
  return processLine(srcByLines, fpath, options, byString(/name\:/g, /i18n_name\:/g), makeI18nLine, extractKeyVal, 'name', -3);
}

function processHintLine(srcByLines, fpath, options) {
  return makeHintLine(srcByLines, fpath, options, reduceMultiLines(/hint\:/g), makeI18nHintLine, extractKeyValMulti);
}

function exportAosVersion(srcByLines) {
  if(process.env.AOS_VERSION) {
    srcByLines[0] = `export const version = '.${process.env.AOS_VERSION}';`;
  }
  return srcByLines;
}

function generateLangFiles(langs, outdir) {
  langs.forEach((l) => {
    const lpath = path.resolve(outdir, l+'.json');
    if (!fs.existsSync(lpath)) {
      fs.appendFileSync(lpath, '{}');
    }
  });
}

function generateOutDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}

module.exports = function loader(source) {
  if (this.resourcePath) {
    const options = loaderUtils.getOptions(this);
    const fpath = this.resourcePath;
    const srcByLines = source.split('\n');

    if (options && options.langDir && options.outDir) {
      generateOutDir(options.outDir);
      generateLangFiles(['en'], options.outDir);
    }

    let lines = [...srcByLines];
    if (fpath.includes(`${path.sep}src${path.sep}model${path.sep}aos-version`)) {
      lines = exportAosVersion(lines);
      return lines.join('\n');
    }
    if (fpath.includes(`${path.sep}src${path.sep}api${path.sep}`)) {
      lines = processLabelLine(lines, fpath, options);
      lines = processHintLine(lines, fpath, options);
      return lines.join('\n');
    }
    if (fpath.includes(`${path.sep}src${path.sep}model${path.sep}`)) {
      lines = processModelTitleLine(lines, fpath, options);
      lines = processModelNameLine(lines, fpath, options);
      return lines.join('\n');
    }
    if (fpath.includes(`${path.sep}src${path.sep}router${path.sep}`)) {
      lines = processTitleLine(lines, fpath, options);

      return lines.join('\n');
    }
  }
  return source;
}
