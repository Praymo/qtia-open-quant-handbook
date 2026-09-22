/** Accept TeX delimiters before Markdown consumes their backslashes.
 * Fenced and inline code remain literal. Dollar math remains supported.
 */
export function normalizeLatex(source) {
  let fence = null;
  return source.split('\n').map((line) => {
    const marker = line.match(/^\s{0,3}(`{3,}|~{3,})/);
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
      return line;
    }
    if (fence || /^( {4}|\t)/.test(line)) return line;
    return line.split(/(`+[^`]*`+)/g).map((part, index) => index % 2 ? part : part
      .replace(/\\\(/g, '$').replace(/\\\)/g, '$')
      .replace(/\\\[/g, '$$$$').replace(/\\\]/g, '$$$$')).join('');
  }).join('\n');
}

export default function remarkLatexDelimiters() {
  const parser = this.parser;
  this.parser = (source, file) => parser(normalizeLatex(source), file);
}
