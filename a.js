const matrix = [

    [  2,    1,    0,    1,   0,   0,  10],
    [  0,    2,    1,    0,   1,   0,  20],
    [  1,    0,    2,    0,   0,   1,  30],
    [ -3,   -4, -  5,    0,   0,   0,   0],
];

var basisRow = 0
var basisCol = 0
var basisValue = 0

function printMatrix() {
    console.log("Matrix Visualization:");
    for (let i = 0; i < matrix.length; i++) { // Loop through rows
        let row = "";
        for (let j = 0; j < matrix[i].length; j++) { // Loop through columns
            row += matrix[i][j].toString().padStart(4, " "); // Add each value, formatted
        }
        console.log(row); // Print the formatted row
    }
}

function printColumns()
{
    for (let i = 0; i < matrix[0].length; i++) {
        let row = "";
        for (let y = 0; y < matrix.length; y++) {

            row += matrix[y][i].toString().padStart(4, " "); // Add each value, formatted
            
        }

        console.log(row);
    }
}


function lowestInColumn()
{
    let rowLowest = 0;
    let colLowest = 0;

    let lowest = Number.MAX_SAFE_INTEGER;

    for (let col = 0; col < matrix[0].length; col++) {

        for (let row = 0; row < matrix.length; row++) {

            if(matrix[row][col] < lowest)
            {
                lowest = matrix[row][col];
                basisRow = row;
                basisCol = col;
            }
        }
    }
}


function findPivotRow()
{
    let rowLowest = 0;
    let colLowest = 0;

    let lowest = Number.MAX_SAFE_INTEGER;

    const result = lowestInColumn();

    for (let row = 0; row < matrix.length - 1; row++) 
    {
        let value = matrix[row][6] / matrix[row][basisCol];

        if(value < lowest && value >= 0)
        {
            lowest = value
            basisRow = row
            colLowest = 6
        }
    }

    basisValue = matrix[basisRow][basisRow]
}


function operation()
{
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[0].length; col++) {

           if(row == basisRow)
            {
                matrix[row][col] /= basisValue
            }
        }        
    }

    basisValue = matrix[basisRow][basisCol]
}

function checkToSkipRow(array)
{   
    if(array[basisCol] == 0)
        {
            return true;
        }

        return false;
}

function operation2()
{
    let subValues = [];
    
    for (let row = 0; row < matrix.length; row++) {

        if(matrix[row][basisCol] == 0)
        {
            subValues.push(1);
        }
        else
        {
            subValues.push(-matrix[row][basisCol] / matrix[basisRow][basisCol]);
        }
    }        

    for (let row = 0; row < matrix.length; row++) {

        if(checkToSkipRow(matrix[row]) || row == basisRow)
        {
            continue;
        }
        
        for (let col = 0; col < matrix[0].length; col++) {
           
            matrix[row][col] += subValues[row] * matrix[basisRow][col];
        }        
    }
}


function checkIfMoreZeors()
{
    let half = Math.floor(matrix[0].length / 2)

    for (let row = 0; row < matrix.length; row++) {

        for (let col = 0; col < half; col++) {
            if(matrix[row][col] < 0)
            {
                return true;
            }
        }
    }

    return false;
}

function iterate()
{
    while(checkIfMoreZeors())
    {
        findPivotRow()

        operation()
        
        operation2()
        
        printMatrix()
    }
}

iterate();