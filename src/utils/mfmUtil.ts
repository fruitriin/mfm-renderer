import { MfmNode, parse, parseSimple } from "mfm-js";

export function mfm(text: string, plain: boolean): MfmNode[] {
  if (text == null || text === "") {
    return [];
  }
  const ast = plain ? parseSimple(text) : parse(text);
  return ast;
}

/**
 * MfmVueがAST Nodeからコンポーネントを決定するためのもの
 * <component :is=getComponent(token.type)>
 * @param string
 */
export function getComponent(string: string) {
  return string.replace(
    /(^.)(.*)/,
    (_$1, $2, $3) => `${$2.toUpperCase() + $3}`,
  );
}
