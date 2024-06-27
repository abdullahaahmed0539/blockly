/**
 * Toolbox configuration for Blockly
 */

export const toolbox = {
  kind: 'flyoutToolbox',
  contents: [
    {
      kind: 'block',
      type: 'variables_set_row',
      fields: {
        VAR: 'row', // Default variable name
      },
      values: {
        VALUE: {
          block: {
            type: 'math_number',
            fields: {
              NUM: 10, // Default number value
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'variables_set_movement',
      fields: {
        VAR: 'movement', // Default variable name
      },
      values: {
        VALUE: {
          block: {
            type: 'logic_boolean',
            fields: {
              BOOL: 'TRUE', // Default boolean value
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'variables_get_row',
      fields: {
        VAR: 'row', // Default variable name
      },
    },
    {
      kind: 'block',
      type: 'variables_get_movement',
      fields: {
        VAR: 'movement', // Default variable name
      },
    },
    {
      kind: 'block',
      type: 'controls_if',
      values: {
        IF0: {
          block: {
            type: 'logic_compare',
            fields: {
              OP: 'EQ', // Default operator for comparison
            },
          },
        },
        DO0: {
          block: {
            type: 'math_number',
            fields: {
              NUM: 0, // Default number value if condition is true
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'logic_compare',
      fields: {
        OP: 'EQ', // Default operator for comparison (Equal)
      },
      values: {
        A: {
          block: {
            type: 'math_number',
            fields: {
              NUM: 0, // Default value for operand A
            },
          },
        },
        B: {
          block: {
            type: 'math_number',
            fields: {
              NUM: 0, // Default value for operand B
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'logic_operation',
      inputsInline: true,
    },
    // Standalone blocks without connections
    {
      kind: 'block',
      type: 'math_number',
      fields: {
        NUM: 0, // Default number value
      },
    },
    {
      kind: 'block',
      type: 'logic_boolean',
      fields: {
        BOOL: 'TRUE', // Default boolean value
      },
    },
    
    {
      kind: 'block',
      type: 'math_arithmetic',
      fields: {
        OP: 'ADD', // Default operator (addition)
      },
      values: {
        A: {
          block: {
            type: 'math_number',
            fields: {
              NUM: 1, // Default value for operand A
            },
          },
        },
        B: {
          block: {
            type: 'math_number',
            fields: {
              NUM: 1, // Default value for operand B
            },
          },
        },
      },
    },
    {
      kind: 'block',
      type: 'text_print',
      fields: {
        TEXT: 'You have achieved your goal', // Default text value
      },
    },
    {
      kind: 'block',
      type: 'foreach_row_in_table', // Include the new block here
    },
    {
      kind: 'block',
      type: 'increase_row_by', // Include the new block here
    },
    {
      kind: 'block',
      type: 'controls_if_else'
    },
  ],
};
