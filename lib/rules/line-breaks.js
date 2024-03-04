/**
 * @fileoverview line break rule
 * @author Yauhen Davidovich
 */
"use strict";
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce proper syntax for hooks like useMemo and useCallback',
      category: 'Stylistic Issues',
      recommended: true
    },
    fixable: 'whitespace'
  },

  create: function(context) {
    return {
      CallExpression(node) {
        if (
            node.callee.type === 'Identifier' &&
            ['useMemo', 'useCallback'].includes(node.callee.name)
        ) {
          // Locate the arguments of the hook
          const args = node.arguments;
          if (args.length > 0 && args[1].type === 'ArrayExpression') {
            const arrayHookeDependency = args[1];
            const comma = context.getSourceCode().getTokenBefore(arrayHookeDependency);
            const bracket = context.getSourceCode().getTokenBefore(comma);

            if (bracket.loc.start.line !== arrayHookeDependency.loc.start.line || bracket.loc.start.line !== comma.loc.start.line) {
              context.report({
                node: arrayHookeDependency,
                loc: arrayHookeDependency.loc.start,
                message: 'The closing bracket and comma must be on the same line as the dependency array.',
              });
            }
          }

          if (args.length > 0 && args[0].type === 'ArrowFunctionExpression') {
            const arrowFunctionNode = args[0];
            const body = arrowFunctionNode.body;


            if (
              body.type === 'BinaryExpression'
            ) {
              const firstToken = context.getSourceCode().getTokenBefore(body);
              const secondToken = context.getSourceCode().getFirstToken(body);
              const firstTokenHook = context.getSourceCode().getFirstToken(node.callee);

              if (firstToken && firstToken.loc.start.line !== firstTokenHook.loc.start.line) {
                context.report({
                  node: firstToken,
                  loc: firstToken.loc.start,
                  message: 'Expected a open curly bracket on the same line as hook start.',
                });
              }
              if (secondToken && secondToken.loc.end.line === firstToken.loc.start.line) {
                context.report({
                  node: node,
                  loc: node.loc.start,
                  message: 'Expected a line break after the open parenthesis before BinaryExpression.',
                  fix: fixer => fixer.insertTextBefore(secondToken, '\n')
                });
              }
            }

            if (body.type === 'BlockStatement') {
              const firstToken = context.getSourceCode().getFirstToken(body);
              const secondToken = context.getSourceCode().getTokenAfter(firstToken);
              const firstTokenHook = context.getSourceCode().getFirstToken(node.callee);

              if (firstToken && firstToken.loc.start.line !== firstTokenHook.loc.start.line) {
                context.report({
                  node: body,
                  loc: body.loc.start,
                  message: 'Expected a open curly bracket on the same line as hook start.',
                });
              }
              if (secondToken && secondToken.loc.start.line === firstToken.loc.end.line) {
                context.report({
                  node: body,
                  loc: body.loc.start,
                  message: 'Expected a line break after an open curly brace in BlockStatement.',
                  fix: fixer => fixer.insertTextAfter(firstToken, '\n')
                });
              }
            }
          }
        }
      }
    };
  }
};
