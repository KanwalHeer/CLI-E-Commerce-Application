//imprt fs for fatchind data from app.json file;
import fs from "fs";
//import inquirer for getting user input;
import inquirer from "inquirer";
//imprt chalk for coloring output
import chalk from "chalk";
//fatch data from app.json file
const productsData = JSON.parse(fs.readFileSync("app.json", "utf-8"));
//make a dumy database cart for data saving
const cart = [];
//make main function in wich i call all other functions
async function mainFunction() {
    let exit = false;
    do {
        const options = [
            "View Products",
            "View Cart",
            "addToCartPrompt",
            "Delete cart",
            "Exit",
        ];
        const choice = await inquirer.prompt({
            name: "action",
            type: "list",
            message: "Choose an action:",
            choices: options,
        });
        switch (choice.action) {
            case "View Products":
                await viewProducts();
                break;
            case "View Cart":
                await viewCart();
                break;
            case "addToCartPrompt":
                await addToCartPrompt();
                break;
            case "Delete cart":
                await deleteToCart();
                break;
            case "Exit":
                exit = true;
                console.log(chalk.yellow.bold.italic("Exiting application. Goodbye!"));
                console.log(chalk.magenta.bold.italic(`**************************************************`));
        }
    } while (!exit);
}
//function for viewing all products i called this function in main function
async function viewProducts() {
    console.log(chalk.yellow.bold.italic(`View All Product!`));
    productsData.forEach((product) => {
        console.log(chalk.magentaBright.bold.italic(`ID:${product.id} ,Name:${product.name} ,Price: ${product.price}`));
    });
}
//function for viewing  cart, i called this function in main function
async function viewCart() {
    if (cart.length === 0) {
        console.log(chalk.redBright.bold.italic(`Cart is empty!`));
    }
    else {
        cart.forEach((product) => {
            console.log(chalk.magentaBright.bold.italic(`ID:${product.id} ,Name:${product.name} ,Price: ${product.price}`));
        });
    }
}
//function for adding products in cart , i called this function in main function
async function addToCartPrompt() {
    const { productId1 } = await inquirer.prompt({
        name: "productId1",
        type: "input",
        message: "Enter the ID of the product you want to add to cart:",
    });
    const product = productsData.find((product) => product.id === parseInt(productId1));
    if (product) {
        cart.push(product);
        console.log(chalk.greenBright.bold.italic(`${product.name} added to cart`));
    }
    else {
        console.log(chalk.redBright.bold.italic(`Invalid product ID.`));
    }
}
//function for deleting a products from cart, i called this function in main function
async function deleteToCart() {
    const { productId } = await inquirer.prompt({
        name: "productId",
        type: "input",
        message: "Enter the ID of the product you want to delete to cart:",
    });
    const deleteProduct = cart.find((product) => product.id === parseInt(productId));
    if (deleteProduct) {
        const index = cart.indexOf(deleteProduct);
        cart.splice(index, 1);
        console.log(chalk.green("Product removed from cart successfully!"));
    }
    else {
        console.log(chalk.redBright.bold.italic(`Invalid product ID.`));
    }
}
//and here i call the main function
mainFunction();
