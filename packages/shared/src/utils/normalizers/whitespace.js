/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict
 */

'use strict';

/**
 * Use single spaces and remove spaces when not needed: around functions,
 * commas. But preserve spece around + and - as they are required in calc()
 */

export default function normalizeWhitespace(
  ast: PostCSSValueAST,
  _: mixed,
): PostCSSValueAST {
  // trim
  if (ast.nodes[0].type === 'space') {
    ast.nodes.shift();
  }
  if (ast.nodes[ast.nodes.length - 1].type === 'space') {
    ast.nodes.pop();
  }

  ast.walk((node, idx) => {
    switch (node.type) {
      case 'space': {
        node.value = ' ';
        break;
      }
      case 'div':
      case 'function': {
        node.before = '';
        node.after = '';
        break;
      }
      case 'word': {
        if (node.value === '!important') {
          if (ast.nodes[idx - 1] && ast.nodes[idx - 1].type === 'space') {
            ast.nodes.splice(idx - 1, 1);
          }
        }
        break;
      }
      default: {
        break;
      }
    }
  });
  return ast;
}
