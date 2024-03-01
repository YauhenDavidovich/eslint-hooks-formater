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
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "skip",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
