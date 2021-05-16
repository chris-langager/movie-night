import { html } from './html';
import { layout } from './layout';

export function helloWorld(name: string) {
  const content = html`<h1>hello ${name}</h1>`;
  return layout(content);
}
