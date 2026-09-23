const hasClass = (node, name) => node?.properties?.className?.includes(name);
const children = node => node?.children?.filter(child => child.type === 'element') ?? [];

function speak(node) {
  if (!node) return '';
  if (node.type === 'text') return node.value.trim();
  if (node.type !== 'element' || node.tagName === 'annotation') return '';

  const parts = children(node);
  const joined = () => parts.map(speak).filter(Boolean).join(' ');
  const [first, second, third] = parts;
  switch (node.tagName) {
    case 'msub': return `${speak(first)} 下标 ${speak(second)}`;
    case 'msup': return `${speak(first)} 上标 ${speak(second)}`;
    case 'msubsup': return `${speak(first)} 下标 ${speak(second)} 上标 ${speak(third)}`;
    case 'mfrac': return `分数，分子 ${speak(first)}，分母 ${speak(second)}`;
    case 'msqrt': return `根号 ${joined()}`;
    case 'mroot': return `${speak(second)} 次根号 ${speak(first)}`;
    case 'mo': {
      const symbol = node.children?.map(speak).join('').trim() ?? '';
      return ({ '×': '乘', '·': '乘', '=': '等于', '+': '加', '−': '减', '∑': '求和', '∞': '无穷', '≤': '小于等于', '≥': '大于等于' })[symbol] ?? symbol;
    }
    case 'semantics': return speak(first);
    default: return node.children?.map(speak).filter(Boolean).join(' ') ?? '';
  }
}

export default function rehypeAccessibleKatex() {
  return tree => {
    function visit(node) {
      if (node.type !== 'element') {
        node.children?.forEach(visit);
        return;
      }
      if (hasClass(node, 'katex')) {
        const mathml = node.children?.find(child => hasClass(child, 'katex-mathml'));
        const math = mathml?.children?.find(child => child.tagName === 'math');
        const label = speak(math).replace(/[\u200b-\u200d\u2060-\u2064]/g, '').replace(/\s+/g, ' ').trim();
        if (label) {
          node.properties.role = 'math';
          node.properties.ariaLabel = label;
          node.children = node.children.filter(child => child !== mathml);
        }
      }
      node.children?.forEach(visit);
    }
    tree.children?.forEach(visit);
  };
}
