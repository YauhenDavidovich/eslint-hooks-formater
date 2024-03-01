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
  rules: {
    'proper-hook-syntax': {
      meta: {
        type: 'suggestion',
        docs: {
          description: 'Enforce proper syntax for hooks like useMemo and useCallback',
          category: 'Stylistic Issues',
          recommended: true
        },
        fixable: 'whitespace' // This indicates that automatic fixing is possible
      },

      create: function(context) {
        return {
          CallExpression(node) {
            if (
                node.callee.type === 'Identifier' &&
                ['useMemo', 'useCallback'].includes(node.callee.name)
            ) {
              const openingBracket = context.getSourceCode().getTokenAfter(node.callee, token => token.value === '(');

              const firstCharacterOfOpeningBracketLine = openingBracket.loc.start.column;
              const firstCharacterAfterOpeningBracket = openingBracket.loc.end.column + 1;

              if (firstCharacterAfterOpeningBracket !== firstCharacterOfOpeningBracketLine + 1) {
                context.report({
                  node: openingBracket,
                  message: 'Expected line break after opening bracket of hook arguments.',
                  fix: fixer => fixer.insertTextAfter(openingBracket, '\n')
                });
              }
            }
          }
        };
      }
    }
  }
};

