import type { Declaration, Root } from 'postcss';

type Rule = {
  selector: Array<string>;
  transform: Function;
}

function transform(root: Root, rule: Rule) {
  root.walkDecls((decl: Declaration) => {
     // @ts-ignore
    if (rule?.selector?.includes(decl?.parent?.selector)) {
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