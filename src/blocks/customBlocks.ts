/**
 * @license
 * Copyright 2023 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

import * as Blockly from 'blockly/core';

// Create a custom block called 'add_text' that adds
// text to the output div on the sample app.
// This is just an example and you should replace this with your
// own custom blocks.
const addText = {
  type: 'add_text',
  message0: 'Add text %1',
  args0: [
    {
      type: 'input_value',
      name: 'TEXT',
      check: 'String',
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '',
  helpUrl: '',
};

// Custom block for setting the 'row' variable
const variablesSetRow = {
  type: 'variables_set_row',
  message0: 'set %1 to %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'VAR',
      options: [
        ['row', 'row']
      ]
    },
    {
      type: 'input_value',
      name: 'VALUE'
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: '',
  helpUrl: '',
};

// Custom block for setting the 'movement' variable
const variablesSetMovement = {
  type: 'variables_set_movement',
  message0: 'set %1 to %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'VAR',
      options: [
        ['movement', 'movement']
      ]
    },
    {
      type: 'input_value',
      name: 'VALUE'
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: '',
  helpUrl: '',
};

// Custom block for getting the 'row' variable
const variablesGetRow = {
  type: 'variables_get_row',
  message0: '%1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'VAR',
      options: [
        ['row', 'row']
      ]
    }
  ],
  output: 'Number',
  colour: 330,
  tooltip: '',
  helpUrl: '',
};

// Custom block for getting the 'movement' variable
const variablesGetMovement = {
  type: 'variables_get_movement',
  message0: '%1',
  args0: [
    {
      type: 'field_dropdown',
      name: 'VAR',
      options: [
        ['movement', 'movement']
      ]
    }
  ],
  output: 'Boolean',
  // output: null,
  colour: 330,
  tooltip: '',
  helpUrl: '',
};

const textPrint = {
  type: 'text_print',
  message0: 'print %1',
  args0: [
    {
      type: 'field_input',
      name: 'TEXT',
      text: 'You have achieved your goal', // Default text value
    },
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 160,
  tooltip: '',
  helpUrl: '',
};

const forEachRowInTable = {
  type: 'foreach_row_in_table',
  message0: 'for each row in table \n do %1', // Updated message with %1 for input value
  args0: [
    {
      type: 'input_statement',
      name: 'DO',
    },
  ],
  nextStatement: null,
  colour: 120,
  tooltip: 'Iterates over each row in the table',
  helpUrl: '',
};

const increaseRowBy = {
  type: 'increase_row_by',
  message0: 'increase %1 by %2',
  args0: [
    {
      type: 'field_dropdown',
      name: 'ROW',
      options: [
        ['row', 'row']
      ]
    },
    {
      type: 'input_value',
      name: 'VALUE',
      check: 'Number' // Ensures that the input is a number
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 330,
  tooltip: 'Increase the value of a row by a number',
  helpUrl: ''
};

const controlsIfElse = {
  type: 'controls_if_else',
  message0: 'if %1 do %2 else %3',
  args0: [
    {
      type: 'input_value',
      name: 'IF0',
      check: 'Boolean'
    },
    {
      type: 'input_statement',
      name: 'DO0'
    },
    {
      type: 'input_statement',
      name: 'ELSE'
    }
  ],
  previousStatement: null,
  nextStatement: null,
  colour: 210,
  tooltip: 'If-Else block: Executes the "then" statements if the condition is true, otherwise executes the "else" statements',
  helpUrl: '',
};



// Create the block definitions for the JSON-only blocks.
// This does not register their definitions with Blockly.
// This file has no side effects!
export const blocks = Blockly.common.createBlockDefinitionsFromJsonArray([
  addText,
  variablesSetRow,
  variablesSetMovement,
  variablesGetRow,
  variablesGetMovement,
  textPrint,
  forEachRowInTable, // Include the new block definition here
  increaseRowBy ,
  controlsIfElse,

]);
