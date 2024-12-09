

var basisRow = 0
var basisCol = 0
var basisValue = 0

function addEmptyCol(row)
{
    const th = document.createElement('td');    
    th.innerHTML = " "; 
    row.appendChild(th);
}



function printMatrix() {
    // Get the div container
    const container = document.getElementById("tables");

    // Create a new table element
    const table = document.createElement("table");
    table.classList.add("simplex-table"); // Add CSS class for styling

    table.innerHTML = "";

    let headerRow = document.createElement('tr');

    const keys = Object.keys(targetExpressionParsed[0]);
    const count = Object.keys(targetExpressionParsed[0]).length;

    addEmptyCol(headerRow);

    addedLettersIndexStart = colNames.length / 2

    for (let i = 0; i < keys.length; i++)
    {
        const key = keys[i];
        const value = targetExpressionParsed[0][key];

        const th = document.createElement('th');    
        th.innerHTML = key; 
        headerRow.appendChild(th);

        if(keys[i + 1] === "Value")
        {
        
            for (let j = addedLettersIndexStart; j < colNames.length; j++)
            {
                const th = document.createElement('th');   
                let addLetter = colNames[j];
                th.innerHTML = addLetter; 
                headerRow.appendChild(th);     

            }
        }

    }

    table.appendChild(headerRow);



    // Create rows for the matrix
    for (let i = 0; i < matrix.length; i++) {
        const row = document.createElement("tr");

        // Add row name as the first cell
        const rowHeader = document.createElement("th");
        rowHeader.textContent = rowNames[i];
        row.appendChild(rowHeader);

        // Add matrix values as cells
        for (let j = 0; j < matrix[i].length; j++) {
            const cell = document.createElement("td");
            cell.textContent = matrix[i][j];
            row.appendChild(cell);
        }

        table.appendChild(row);
    }

    // Append the newly created table to the div
    container.appendChild(table);
}



function printColumns()
{
    for (let i = 0; i < matrix[0].length; i++) 
    {
        let row = "";
            
        for (let y = 0; y < matrix.length; y++) 
        {
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

    for (let col = 0; col < matrix[0].length; col++)
    {
        for (let row = 0; row < matrix.length; row++)
        {
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
        let value = matrix[row][matrix[0].length - 1] / matrix[row][basisCol];

        if(value < lowest && value >= 0)
        {
            lowest = value
            basisRow = row
            colLowest = 6
        }
    }

    basisValue = matrix[basisRow][basisRow]

    let oldRowValue = rowNames[basisRow];
    rowNames[basisRow] = colNames[basisCol];
    colNames[basisCol] = oldRowValue;
}


function operation()
{
    for (let row = 0; row < matrix.length; row++)
    {
        for (let col = 0; col < matrix[0].length; col++) 
        {
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
    
    for (let row = 0; row < matrix.length; row++)
    {
        if(matrix[row][basisCol] == 0)
        {
            subValues.push(1);
        }
        else
        {
            subValues.push(-matrix[row][basisCol] / matrix[basisRow][basisCol]);
        }
    }        

    for (let row = 0; row < matrix.length; row++)
    {
        if(checkToSkipRow(matrix[row]) || row == basisRow)
        {
            continue;
        }
        
        for (let col = 0; col < matrix[0].length; col++)
        {
           
            matrix[row][col] += subValues[row] * matrix[basisRow][col];
        }        
    }
}


function checkIfMoreZeors()
{
    let half = Math.floor(matrix[0].length / 2);

    for (let row = 0; row < matrix.length; row++)
    {
        for (let col = 0; col < half; col++)
        {
            if(matrix[row][col] < 0)
            {
                return true;
            }
        }
    }

    return false;
}

function writeCoeficient()
{
    for (let index = 0; index < matrix.length; index++) 
    {
        console.log(rowNames[index] + " " + matrix[index][matrix[0].length - 1])
    }
}


function iterate(matrix)
{
    this.matrix = matrix;


    while(checkIfMoreZeors())
    {
        findPivotRow()

        operation()
        
        operation2()
        
        printMatrix()
    }

    writeCoeficient()
}

