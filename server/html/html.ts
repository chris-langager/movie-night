export function html(ss: TemplateStringsArray, ...params: string[]) {
  return ss.reduce((acc, s, i) => (acc += s + (params[i] || '')), '');
}
