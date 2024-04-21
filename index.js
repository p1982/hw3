// Task 1: Immutability and Pure Functions
// Implement a pure function called calculateDiscountedPrice that takes an array 
//of products and a discount percentage as arguments. 
//The function should return a new array of products with discounted prices based 
//on the given percentage, without modifying the original products.
// Create a pure function called calculateTotalPrice that takes an array of products as an argument. 
//The function should return the total price of all products, without modifying the original array or its items.

const calculateDiscountedPrice = (products, discountPercentage) => {
    if (!Array.isArray(products)) {
        throw new Error("Products should be an array.");
    }
    if (typeof discountPercentage !== "number" || isNaN(discountPercentage)) {
        throw new Error("Discount percentage should be a number.");
    }
    // return products.map(product => ({
    //     ...product,
    //     price: product.price * (1 - discountPercentage / 100)
    // }));
    return products.map(({name, price}) => ({
        name,
        price: price * (1 - discountPercentage / 100)
    }));
};


const calculateTotalPrice = (products) => {
    if (!Array.isArray(products)) {
        throw new Error("Products should be an array.");
    }
    return products.reduce((acc, {price}) => acc + price, 0);
};

const products = [
    { name: "Product 1", price: 100 },
    { name: "Product 2", price: 200 },
    { name: "Product 3", price: 300 }
];


const discountedProducts = calculateDiscountedPrice(products, 10);
console.log(discountedProducts);


const totalPrice = calculateTotalPrice(products);
console.log(totalPrice);

// Task 2: Function Composition and Point-Free Style
// Implement a function called getFullName that takes a person object with firstName 
// and lastName properties. The function should return the person's full name in the format "FirstName LastName".
// Create a function called filterUniqueWords that takes a string of text and returns an array of unique words, 
// sorted in alphabetical order, without using explicit loops. Use function composition and point-free style.
// Implement a function called getAverageGrade that takes an array of student objects, 
// each containing a name and grades property. The function should return the average grade 
// of all students, without modifying the original array or its items. Use function composition and point-free style.


const getFullName = (person) => {
    if (typeof person !== "object" || person === null || Array.isArray(person)) {
        throw new Error("Argument must be a non-null object");
    }
    
    if (!("firstName" in person) || !("lastName" in person)) {
        throw new Error("Object must have 'firstName' and 'lastName' properties");
    }

    if (typeof person.firstName !== "string" || typeof person.lastName !== "string") {
        throw new Error("Values of 'firstName' and 'lastName' properties must be strings");
    }

    return `${person.firstName} ${person.lastName}`;
};

const compose = (...fns) => (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);

const fullName = compose(getFullName);

const person = { firstName: "John", lastName: "Doe" };
console.log(fullName(person)); // Output: John Doe

try {
    console.log(fullName(null));
} catch (error) {
    console.error(error.message); // Output: Argument must be a non-null object
}

try {
    console.log(fullName("John Doe"));
} catch (error) {
    console.error(error.message); // Output: Argument must be a non-null object
}

try {
    console.log(fullName({ firstName: "John" }));
} catch (error) {
    console.error(error.message); // Output: Object must have 'firstName' and 'lastName' properties
}

try {
    console.log(fullName({ firstName: "John", lastName: 123 }));
} catch (error) {
    console.error(error.message); // Output: Values of 'firstName' and 'lastName' properties must be strings
}

//unique
const filterUniqueWords = (text) => {
    if (typeof text !== 'string') {
        throw new Error("Input should be a string.");
    }

    const uniqueWords = text.toLowerCase().split(' ').filter((word, index, arr) => arr.indexOf(word) === index);
    return uniqueWords.sort();
};

const text = "hello World hello world";
console.log(filterUniqueWords(text)); // Output: ["hello", "world"]


//  calc average
const calculateAverageGrade = (grades) => {
    if (!Array.isArray(grades) || grades.length === 0) {
        throw new Error("Grades should be a non-empty array.");
    }
    return grades.reduce((acc, grade) => acc + grade, 0) / grades.length;
};

const getGrades = (student) => {
    if (!student || !Array.isArray(student.grades)) {
        throw new Error("Invalid student object or grades array.");
    }
    return student.grades;
};

const calculateAverageTotalGrade = (students) => {
    if (!Array.isArray(students) || students.length === 0) {
        throw new Error("Students should be a non-empty array.");
    }
    const averageGrades = students.map((student) => calculateAverageGrade(getGrades(student)));
    return averageGrades.reduce((acc, grade) => acc + grade, 0) / averageGrades.length;
};

const composeAv = (...fns) => (arg) => fns.reduceRight((acc, fn) => fn(acc), arg);

const getAverageGrade = composeAv(calculateAverageTotalGrade);

const students = [
    { name: "Alice", grades: [80, 90, 70] },
    { name: "Bob", grades: [85, 88, 92] }
];

try {
    console.log(getAverageGrade(students)); // Output: 84.166
} catch (error) {
    console.error("Error:", error.message);
}


// Task 3: Closures and Higher-Order Functions
// Create a function called createCounter that returns a closure. 
//The closure should be a counter function that increments the count on each call and returns 
//the updated count. Each closure should have its own independent count.
// Implement a higher-order function called repeatFunction that takes a function 
//and a number as arguments. The function should return a new function that invokes 
//the original function multiple times based on the provided number. If the number is negative, 
//the new function should invoke the original function indefinitely until stopped.

const createCounter = () => {
    let count = 0;
    return () => ++count;
};

const counter1 = createCounter();
console.log(counter1()); // 1
console.log(counter1()); // 2

const repeatFunction = (func, times) => {
    if (typeof func !== 'function') {
        throw new Error("First argument must be a function.");
    }

    if (typeof times !== 'number' || !Number.isInteger(times) || times < 1) {
        throw new Error("Second argument must be a positive integer.");
    }
    return () => {
        for (let i = 0; i < times; i++) {
            func();
        }
    };
};

const repeatHello = () => console.log("Hello!");

const repeatHelloThreeTimes = repeatFunction(repeatHello, 3);
repeatHelloThreeTimes(); // Hello! Hello! Hello!

// Task 4: Recursion and Tail Call Optimization
// Implement a recursive function called calculateFactorial that calculates the factorial 
//of a given number. Optimize the function to use tail call optimization to avoid stack 
//overflow for large input numbers.
// Create a recursive function called power that takes a base and an exponent as arguments. 
//The function should calculate the power of the base to the exponent using recursion.

const calculateFactorial = (n, factorial = 1) => {
    if (typeof n !== 'number' || !Number.isInteger(n) || n < 0) {
        throw new Error("Argument 'n' must be a non-negative integer.");
    }
    if (n === 0) return factorial;
    return calculateFactorial(n - 1, n * factorial);
};

const factorial = calculateFactorial(5);
console.log(factorial); // 120

const power = (base, exponent) => {
    if (typeof base !== 'number' || typeof exponent !== 'number' || !Number.isInteger(exponent)) {
        throw new Error("Arguments 'base' and 'exponent' must be numbers and 'exponent' must be an integer.");
    }
    if (exponent === 0) return 1;
    if (exponent === 1) return base;
    return base * power(base, exponent - 1);
};

const powerOf2To5 = power(2, 5);
console.log(powerOf2To5); // 32

// Task 5: Lazy Evaluation and Generators (*do not use yield)
// Implement a lazy evaluation function called lazyMap that takes an array and a mapping function. 
//The function should return a lazy generator that applies the mapping function to each element of the array one at a time.
// Create a lazy generator function called fibonacciGenerator that generates 
//Fibonacci numbers one at a time using lazy evaluation.

function lazyMap(array, mappingFunction) {
    if (!Array.isArray(array)) {
        throw new Error("The first argument must be an array.");
    }

    if (typeof mappingFunction !== 'function') {
        throw new Error("The second argument must be a function.");
    }
    let index = 0;
    return {
        next () {
            if (index < array.length) {
                const result = mappingFunction(array[index]);
                index++;
                return { value: result, done: false };
            } else {
                return { done: true };
            }
        }
    };
}


const numbers = [1, 2, 3, 4, 5];
const squaredNumbersGenerator = lazyMap(numbers, (x) => x * x);

console.log(squaredNumbersGenerator.next().value); // 1
console.log(squaredNumbersGenerator.next().value); // 4
console.log(squaredNumbersGenerator.next().value); // 9

function fibonacciGenerator() {
    let prev = 0;
    let curr = 1;
    return {
        next () {
            const result = curr;
            curr = curr + prev;
            prev = result;
            return { value: result, done: false };
        }
    };
}


const fibonacciSequence = fibonacciGenerator();

console.log(fibonacciSequence.next().value); // 1
console.log(fibonacciSequence.next().value); // 1
console.log(fibonacciSequence.next().value); // 2
console.log(fibonacciSequence.next().value); // 3
console.log(fibonacciSequence.next().value); // 5