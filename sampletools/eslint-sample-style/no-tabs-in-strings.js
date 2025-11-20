/**
 * @fileoverview Rule to replace tab characters in string literals with two spaces.
 */

'use strict';

module.exports = {
  meta: {
    docs: {
      description:
        'Disallow tab (\\t) characters in string literals, use two spaces instead.',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'whitespace',
    schema: false, // no options
    messages: {
      noTabs:
        'Use two spaces instead of tab escape sequences (\\t) in string literals.',
    },
    type: 'layout',
  },

  create(context) {
    const sourceCode = context.sourceCode ?? context.getSourceCode();
    return {
      Literal(node) {
        // Detect semantic tab character in the string value
        if (typeof node.value === 'string' && node.value.includes('\t')) {
          context.report({
            node,
            messageId: 'noTabs',
            fix(fixer) {
              // Get the raw text from the source file for this node
              const text = sourceCode.getText(node);
              // Replace tab characters in the raw text
              const newText = text.replace(/\\t/g, '  ');
              return fixer.replaceText(node, newText);
            },
          });
        }
      },
      TemplateElement(node) {
        // Detect semantic tab character in the cooked value
        if (node.value.cooked && node.value.cooked.includes('\t')) {
          context.report({
            node,
            messageId: 'noTabs',
            fix(fixer) {
              // Get the raw text from the source file for this node
              const text = sourceCode.getText(node);
              // Replace tab characters in the raw text
              const newText = text.replace(/\\t/g, '  ');
              return fixer.replaceText(node, newText);
            },
          });
        }
      },
    };
  },
};
