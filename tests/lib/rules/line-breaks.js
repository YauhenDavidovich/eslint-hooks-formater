/**
 * @fileoverview line break rule
 * @author Yauhen Davidovich
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------
const { RuleTester } = require('eslint');
const rule = require("../../../lib/rules/line-breaks");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------
const ruleTester = new RuleTester();

ruleTester.run('your-eslint-rule', rule, {
  valid: [
    {
      code: `
        const test = useMemo(() => {\n
          // Some logic here\n
        }, [dependencies]);
      `,
    },
    {
      code: `
        const test = useCallback(() => {\n
          // Some logic here\n
        }, [dependencies]);
      `,
    },
  ],

  invalid: [
    {
      code: `
        useMemo(() => { console.log('test')
        }, [dependencies]);
      `,
      errors: [{
        message: 'Expected a line break after an open curly brace in BlockStatement.',
        type: 'BlockStatement'
      }],
      output: `
         const test = useMemo(() => {\n
          // Some logic here\n
        }, [dependencies]);
      `,
    }
  ],
});
