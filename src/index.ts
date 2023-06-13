import type { Declaration, Root } from 'postcss';

type Rule = {
  selector: Array<string>;
  transform: (decl: Declaration) => void;
}

function match(rule: string | Array<string> | RegExp, selector: string): boolean {
  if (Object.prototype.toString.call(rule) === '[object String]' && typeof rule === 'string') {
    if (rule.startsWith('^')) {
        return selector?.startsWith(rule.replace('^', '.'));
    }
    return rule.includes(selector);
  }
  if (Array.isArray(rule)) {
    return rule.some((r: string) => match(r, selector));
  }
  if (Object.prototype.toString.call(rule) === '[object RegExp]' && typeof rule !== 'string') {
    return rule.test(selector);
  }
  return false;
}

function transform(root: Root, rule: Rule) {
  root.walkDecls((decl: Declaration) => {
     // @ts-ignore
    if (match(rule?.selector, decl?.parent?.selector)) {
      rule.transform(decl);
    }
  })
}

const plugin = (rule: Rule) => {
  return {
    postcssPlugin: 'postcss-transform-selector',
    Once(root: Root) {
      transform(root, rule);
    },
  }
}
plugin.postcss = true;

module.exports = plugin;