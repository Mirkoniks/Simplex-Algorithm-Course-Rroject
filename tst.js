const b = "-x - 3y + 2z = 2; 4a + 5b - 6c = 7; 8a + 9b - 5c = 12";

// Split the expression string by semicolon to handle multiple equations
const equations = b.split(';');

equations.forEach((equation) => {
  const c = equation.trim().replace(/\s+/g, '');  // Trim and remove spaces

  // Regex to match terms like "5x", "-3y", "2z", and constants after '='
  const regex = /([+-]?\d*)([a-zA-Z]+)/g;

  // Split the equation into left and right parts
  const [lhs, rhs] = c.split('=');

  // Parse the right-hand side to extract constant
  const rhsValue = parseFloat(rhs);

  // Initialize an object to store variables and their coefficients
  let terms = {};

  // Find matches for terms on the left-hand side
  let match;
  while ((match = regex.exec(lhs)) !== null) {
    const coefficient = match[1] === '' || match[1] === '+' ? 1 : (match[1] === '-' ? -1 : parseInt(match[1]));
    const variable = match[2];

    terms[variable] = coefficient;
  }

  // Output the result for each equation
  console.log("Left-hand terms:", terms);
  console.log("Right-hand constant:", rhsValue);
});
