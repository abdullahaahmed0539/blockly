import * as Blockly from 'blockly';
import { blocks } from './blocks/customBlocks';
import { save, load } from './serialization';
import { toolbox } from './toolbox';
import './index.css';
import './generators/javascript'; // Ensure you import the JavaScript generators

// Register the blocks and generator with Blockly
Blockly.common.defineBlocks(blocks);


// Set up UI elements and inject Blockly
const blocklyDiv = document.getElementById('blocklyDiv');
const resetButton = document.getElementById('resetButton');
const generateButton = document.getElementById('generateButton');
const tableBody = document.getElementById('dataTable')?.getElementsByTagName('tbody')[0];
const jsonOutput = document.getElementById('jsonOutput');
const resetTableButton = document.getElementById('resetTableButton');
const speedSlider = document.getElementById('speedSlider') as HTMLInputElement;
const messageField = document.getElementById('messageTextarea') as HTMLInputElement; // Reference to message field

let running: boolean = false;

if (!blocklyDiv) {
  throw new Error(`div with id 'blocklyDiv' not found`);
}

const workspace = Blockly.inject(blocklyDiv, { 
  toolbox, 
  trashcan: true,
  scrollbars: true,
// rtl: true,
  zoom: {
    controls: true
  }
});

// Function to set default variables
const setDefaultVariables = (workspace: Blockly.WorkspaceSvg, variableNames: string[]) => {
  variableNames.forEach(variableName => {
    if (!workspace.getVariable(variableName)) {
      workspace.createVariable(variableName);
    }
  });
};

// Function to clear workspace and localStorage
const resetWorkspace = () => {
  workspace.clear(); // Clear all blocks from workspace
  localStorage.clear(); // Clear localStorage

  resetOutput();
  jsonOutput!.textContent = ''

  // Reset default variables and load into workspace
  setDefaultVariables(workspace, ['row', 'movement']);
  load(workspace);

};

// Function to generate and display JavaScript code
const runCode =  async () => {
  if(running) return;
  running = true;
  resetOutput();
  let jsonResult = Blockly.serialization.workspaces.save(workspace)?.blocks?.blocks;
  if(!jsonResult) return;
  jsonResult.sort((a: any, b: any) => a.y - b.y);
  if (jsonOutput) jsonOutput.textContent = JSON.stringify(jsonResult, null, 2);
  // arr = new Array(tableBody?.rows.length);
  let index = -1;
  let movement: any = '';
  for (const block of jsonResult) {
    [index, movement] = await fillMovementValuesRecursively(index, movement, block);
  }
  running = false;
};

const resetOutput = () => {
  messageField.value = ''
  for(let i = 0; i < tableBody!.rows.length; i++){
    tableBody!.rows[i].cells[3].innerHTML = '';
  }
}

const compareRecursively = (inputs: any, index: number, movement: any) => {
  
  if(inputs?.block?.type === "math_number")  {
    return inputs.block.fields.NUM
  }
  else if (inputs?.block?.type === "logic_boolean"){
    return inputs.block.fields.BOOL
  }
  else if (inputs?.block?.type === "math_arithmetic"){ 
    return performMathArithmeticOperation(inputs.block, index) + 1;
  }
  else if (inputs?.block?.type === "variables_get_row"){ 
    return index + 1;
  }
  else if (inputs?.block?.type === "variables_get_movement"){ 
    return (movement === 'TRUE' || movement === true)? true: false;
  }
  else{
    if(!inputs?.IF0?.block?.inputs  && inputs?.IF0?.block?.type === "logic_boolean")  return  inputs?.IF0?.block?.fields.BOOL === 'TRUE'? true: false;
    if(!inputs?.IF0?.block?.inputs  && inputs?.IF0?.block?.type === "variables_get_movement")  return  (movement === 'TRUE' || movement === true)? true: false;
    if(inputs?.IF0?.block?.inputs){
      var comparisonType = inputs?.IF0?.block?.type 
      var comparisonOp = inputs?.IF0?.block?.fields.OP;
      var val1: any = compareRecursively(inputs?.IF0.block.inputs.A, index, movement)
      var val2: any = compareRecursively(inputs?.IF0.block.inputs.B, index, movement)
    }
    if (inputs?.block?.inputs) {
      comparisonType = inputs?.block?.type 
      comparisonOp = inputs?.block?.fields?.OP;
      val1 = compareRecursively(inputs?.block.inputs.A, index, movement)
      val2 = compareRecursively(inputs?.block.inputs.B, index, movement)
    }
    if(comparisonType === 'logic_compare'){
      switch (comparisonOp){
        case 'EQ':
          return (parseInt(val1) === parseInt(val2));
        case 'NEQ':
          return (parseInt(val1) !== parseInt(val2));
        case 'LT':
          return (parseInt(val1) < parseInt(val2));
        case 'LTE':
          return (parseInt(val1) <= parseInt(val2));
        case 'GT':
          return (parseInt(val1) > parseInt(val2));
        case 'GTE':
          return (parseInt(val1) >= parseInt(val2));
        default: 
      }
    }
    if(comparisonType === 'logic_operation'){
      val1 = (val1 === 'TRUE' || val1 === true)? true: false;
      val2 = (val2 === 'TRUE' || val2 === true)? true: false;

      switch (comparisonOp){
        case 'AND':
          return (val1 && val2);
        case 'OR':
          return (val1 || val2);
        default: 
      }
    } 
  }
}

const performMathArithmeticOperation = (block: any, index: number, returnIndex: Boolean = true) => {
  const valueBlock = block.inputs?.VALUE?.block ?? block;
  const operation = valueBlock?.fields.OP;
  const mathArithmeticInputs = valueBlock.inputs;

  let inputA: any, inputB: any;
  if(mathArithmeticInputs?.A?.block?.type === 'variables_get_row'){
    inputA = index + 1;
  }
  else if(mathArithmeticInputs?.A?.block?.type === 'math_number'){
    inputA = mathArithmeticInputs?.A?.block?.fields?.NUM;
  }
  else{
    inputA = performMathArithmeticOperation(mathArithmeticInputs?.A?.block, index);
  }

  if(mathArithmeticInputs?.B?.block?.type === 'variables_get_row'){
    inputB = index + 1;
  }
  else if(mathArithmeticInputs?.B?.block?.type === 'math_number'){
    inputB = mathArithmeticInputs?.B?.block?.fields?.NUM;
  }
  else{
    inputB = performMathArithmeticOperation(mathArithmeticInputs?.B?.block, index);
  }

  let result = 0;
  switch(operation){
    case 'ADD':
      result = inputA + inputB;
      break;
    case 'MINUS':
      result = inputA - inputB;
      break;
    case 'MULTIPLY': 
      result = inputA * inputB;
      break;
    case 'DIVIDE':
      result = inputA / inputB;
      break;
    case 'POWER': 
      result = Math.pow(inputA, inputB);
      break;  
  }
  return returnIndex ? result - 1: result ;
}

const fillMovementValuesRecursively = async (index: number, movement: any, block: any) => {
  workspace.highlightBlock(block?.id);
   // Add a small delay to allow the highlight to be visible
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(parseInt(speedSlider.value)); // Adjust the delay time as needed

  if(block?.type === 'foreach_row_in_table'){
    const rowCount = tableBody!.rows.length;
    for(let i = 0; i < rowCount; i++){
      [index, movement] = await fillMovementValuesRecursively(index, movement, block.inputs?.DO.block)
    }
  }

  if(block?.type === 'text_print') messageField.value = block?.fields?.TEXT || '';

  if(block?.type === 'variables_set_row' || block?.type === 'variables_set_row_ar'){ 
    if(block.inputs?.VALUE.block.type === 'math_number') {
      index = block.inputs?.VALUE.block.fields.NUM - 1; 
    }
    if(block.inputs?.VALUE.block.type === 'math_arithmetic'){
      index = performMathArithmeticOperation(block, index);
    }
  }

  if(block?.type === 'variables_set_movement') {
    if(index > -1 && tableBody && tableBody.rows[index] && tableBody.rows[index].cells[3]) {
      const row = tableBody.rows[index];
      if(block.inputs?.VALUE.block.inputs){
        row.cells[3].innerText = compareRecursively(block.inputs.VALUE, index, movement);
      }
      else{
        row.cells[3].innerText = block.inputs?.VALUE.block.fields.BOOL?.toLowerCase() ?? "";
      }
      row.style.backgroundColor = '#ffff99';
      await delay(parseInt(speedSlider.value));
      row.style.backgroundColor = ''; 
      // arr[index] = block.inputs.VALUE.block.fields.BOOL
    };
      movement = block.inputs?.VALUE.block.fields.BOOL;
  }

  if(block?.type === 'increase_row_by'){
    if(block.inputs?.VALUE.block.type === 'variables_get_row') {
      index = (2*index) + 1;
    }
    if(block.inputs?.VALUE.block.type === 'math_number') {
      index +=  block.inputs?.VALUE.block.fields.NUM ; 
    }
    if(block.inputs?.VALUE.block.type === 'math_arithmetic'){
      index += performMathArithmeticOperation(block, index, false) + 1;
    }
  }

  if(block?.type === 'controls_if' && compareRecursively(block?.inputs, index, movement)) [index, movement] = await fillMovementValuesRecursively(index, movement, block?.inputs?.DO0?.block);
  
  if(block?.type === 'controls_if_else'){
    [index, movement] = compareRecursively(block?.inputs, index, movement) ?  
      await fillMovementValuesRecursively(index, movement, block?.inputs?.DO0?.block): 
      await fillMovementValuesRecursively(index, movement, block?.inputs?.ELSE?.block);
  }

  if(block?.next) [index, movement] = await fillMovementValuesRecursively(index, movement, block?.next?.block);
  return [index, movement];
} 

// Event listener for reset button
if (resetButton) resetButton.addEventListener('click', resetWorkspace);

// Event listener for generate button
if (generateButton) generateButton.addEventListener('click', runCode);

// Event listener for reset Table button
if (resetTableButton) resetTableButton.addEventListener('click', resetOutput);


// Initial setup: Set default variables, load from storage, and run code
setDefaultVariables(workspace, ['row', 'movement']);
load(workspace);

// if(workspace.getAllBlocks().length < 1){

  const setRowBlock = workspace.newBlock('variables_set_row');
  setRowBlock.setFieldValue('row', 'VAR');

  var valueBlock1 = workspace.newBlock('math_number');
  valueBlock1.setFieldValue(2, 'NUM');  
  setRowBlock.getInput('VALUE')?.connection?.connect(valueBlock1.outputConnection);

  const setMovementBlock = workspace.newBlock('variables_set_movement');
  setMovementBlock.setFieldValue('movement', 'VAR');
  const valueBlock = workspace.newBlock('logic_boolean');
  valueBlock.setFieldValue('FALSE', 'BOOL');  
  setMovementBlock.getInput('VALUE')?.connection?.connect(valueBlock.outputConnection);

  const setMovementBlock2 = workspace.newBlock('variables_set_movement');
  setMovementBlock2.setFieldValue('movement', 'VAR');
  const valueBlock2 = workspace.newBlock('logic_boolean');
  valueBlock2.setFieldValue('FALSE', 'BOOL');  
  setMovementBlock2.getInput('VALUE')?.connection?.connect(valueBlock2.outputConnection);


  setRowBlock.nextConnection?.connect(setMovementBlock.previousConnection);
  setMovementBlock.nextConnection?.connect(setMovementBlock2.previousConnection);

  const foreachBlock = workspace.newBlock('foreach_row_in_table');
  console.log(foreachBlock.getInput('DO'))
  foreachBlock.getInput('DO')?.connection?.connect(setRowBlock.previousConnection);



  setRowBlock.initSvg();
  valueBlock1.initSvg();
  setRowBlock.render();
  valueBlock1.render();
  setMovementBlock.initSvg();
  valueBlock.initSvg();
  setMovementBlock.render();
  valueBlock.render();

//   setMovementBlock.moveBy(50, 50);
//   save(workspace);

// }


// Save changes to storage whenever workspace state changes
workspace.addChangeListener(event => {
  if (!event.isUiEvent) {
    save(workspace);
  }
});

// Run code whenever workspace changes meaningfully
workspace.addChangeListener(event => {
  if (!event.isUiEvent &&
      event.type !== Blockly.Events.FINISHED_LOADING &&
      !workspace.isDragging()) {
    // Optionally run code or update UI here
  }
});

// Event listener for Enter key press
document.addEventListener('keydown', async (event) => {
  if (event.shiftKey) {
    if (event.key.toLowerCase() === 'c') {
      await resetWorkspace();
    } 
    else  if (event.key.toLowerCase() === 'r') {
      console.log('here')
      await runCode(); 
    }
    else if (event.key.toLowerCase() === 't') {
      resetOutput();
    }
    else if (event.key === '-' || event.key === '_') {
      decreaseSliderValue();
    }
    if (event.key === '+' || event.key === '=' ) { 
      increaseSliderValue();
    }
  }
});

const increaseSliderValue = () => {
  let newValue = parseInt(speedSlider.value) + 100; // Increase by 10 (or any desired increment)
  if (newValue > 1000) newValue = 1000; // Ensure max value is not exceeded
  speedSlider.value = newValue.toString();
};

// Function to decrease slider value
const decreaseSliderValue = () => {
  let newValue = parseInt(speedSlider.value) - 100; // Decrease by 10 (or any desired decrement)
  if (newValue < 0) newValue = 0; // Ensure min value is not exceeded
  speedSlider.value = newValue.toString();
};





