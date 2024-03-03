/**
 * @fileoverview line break rule
 * @author Yauhen Davidovich
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/line-breaks"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("line-breaks", rule, {
  valid: [
    {
      code: "useMemo(() => {\n// Some code here\n});",
    },
  ],

  invalid: [
    {
      code: "useMemo(()=> {\n// Some code here\n}, []);",
      errors: [{ message: "Expected line break after opening bracket of callback function." }],
    },
  ],
});
