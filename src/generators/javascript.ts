// /**
//  * @license
//  * Copyright 2023 Google LLC
//  * SPDX-License-Identifier: Apache-2.0
//  */

// import { Order } from 'blockly/javascript'; // Adjust import path based on your Blockly setup
// import * as Blockly from 'blockly'; // Adjust import path based on your Blockly setup

// // Define generators for custom blocks
// export const javascriptGenerator = Object.create(null);

// // Generator for 'variables_set_row' block
// javascriptGenerator.variables_set_row = function(block: Blockly.Block) {
//   const variableName = Blockly.JavaScript.nameDB_.getName(
//     block.getFieldValue('row'),
//     'row'
//   );
//   const value = Blockly.JavaScript.valueToCode(
//     block,
//     'VALUE',
//     Order.ADDITION
//   ) || '0';
  
//   return `${variableName} = ${value};\n`;
// };

// // Generator for 'variables_set_movement' block
// javascriptGenerator.variables_set_movement = function(block: Blockly.Block) {
//   const variableName = Blockly.JavaScript.nameDB_.getName(
//     block.getFieldValue('movement'),
//     'movement'
//   );
//   const value = block.getFieldValue('VALUE') === 'TRUE' ? 'true' : 'false';
  
//   return `${variableName} = ${value};\n`;
// };

// // Register the generators with Blockly's JavaScript generator
// Blockly.JavaScript['variables_set_row'] = javascriptGenerator.variables_set_row;
// Blockly.JavaScript['variables_set_movement'] = javascriptGenerator.variables_set_movement;




// // /**
// //  * @license
// //  * Copyright 2023 Google LLC
// //  * SPDX-License-Identifier: Apache-2.0
// //  */

// // import {Order} from 'blockly/javascript';
// // import * as Blockly from 'blockly/core';

// // // Export all the code generators for our custom blocks,
// // // but don't register them with Blockly yet.
// // // This file has no side effects!
// // export const forBlock = Object.create(null);

// // forBlock['add_text'] = function (
// //   block: Blockly.Block,
// //   generator: Blockly.CodeGenerator,
// // ) {
// //   const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
// //   const addText = generator.provideFunction_(
// //     'addText',
// //     `function ${generator.FUNCTION_NAME_PLACEHOLDER_}(text) {

// //   // Add text to the output area.
// //   const outputDiv = document.getElementById('output');
// //   const textEl = document.createElement('p');
// //   textEl.innerText = text;
// //   outputDiv.appendChild(textEl);
// // }`,
// //   );
// //   // Generate the function call for this block.
// //   const code = `${addText}(${text});\n`;
// //   return code;
// // };
