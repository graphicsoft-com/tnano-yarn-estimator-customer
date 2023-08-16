class Material{
    constructor(type, costPerWafer){
        this.type = type;
        this.costPerWafer = costPerWafer;
    }
}

const materials = [];
materials[0] = new Material("Silicon Wafer", 200/5);
materials[1] = new Material("Iron Pellets", 6.7/5);
materials[2] = new Material("Acetylene Gas", 4.41/5);
materials[3] = new Material("Hydrogen Gas", 3.5154/5);
materials[4] = new Material("Argon Gas", 5.7246/5);

let amountInGrams = (1/(6.5/5*1000));
let amountFactor = 1;
let markupBase = 25;

// Runs the calculator to correct the placeholder numbers at start
AmountUnitChanged();

function AmountChanged(amount) {
    amountInGrams = amount / amountFactor;
    RunCalculator();
}

function AmountUnitChanged() {
    switch (document.getElementById("amountUnit").value) {
        case "grams":
            amountFactor = 1;
            break;
        case "kg":
            amountFactor = 1 / 1000;
            break;
        case "lbs":
            amountFactor = 1 / 453.592;
            break;
        case "km":
            amountFactor = 6.5 / 5;
            break;
        case "m":
            amountFactor = 6.5 / 5 * 1000;
            break;
        case "ft":
            amountFactor = 6.5 / 5 * 1000 * 3.28084;
    }
    document.getElementById("amount").value = Math.round(amountInGrams * amountFactor * 10000) / 10000;
    RunCalculator();
}

function RunCalculator() {

    let wafers = amountInGrams * (6.5 / 5) * 5;

    let mfactor = Math.pow((amountInGrams * 6.5 / 5 * 1000), 0.3);
    let markup = (markupBase / mfactor);
    
    let equipmentCostPerGram = 17672;
    
    let laborCostPerGram = 2600;

    let indirectCostsPerGram = 5356;

    let totalMaterialCosts = 0;
    materials.forEach((material) => {
        totalMaterialCosts += material.costPerWafer * wafers;
    });


    let totalCosts = ((laborCostPerGram + indirectCostsPerGram + equipmentCostPerGram) * amountInGrams + totalMaterialCosts);
    let totalPrice = totalCosts * (1 + markup / 100);
    let pricePerGram = totalPrice / amountInGrams;

    UpdateTexts(pricePerGram, totalPrice);

    //PrintToConsole(amountInGrams, wafers, totalCosts, totalPrice, markup, pricePerGram, mfactor);
}

function UpdateTexts(pricePerGram, totalPrice){
    UpdateTextContent("price", new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.round(totalPrice)));

    let factor = 1;
    switch (document.getElementById("pricePerAmountUnit").value) {
        case "grams":
            factor = 1;
            break;
        case "km":
            factor = 5/6.5;
            break;
        case "m":
            factor = 5/6.5/1000;
            break;
        case "ft":
            factor = 5/6.5/1000/3.28084;
            break;
    }

    UpdateTextContent("pricePerAmount", new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.round(pricePerGram*factor)));
}

function UpdateTextContent(id, content){
    let contentElement = document.getElementById(id);
    if(contentElement.textContent != content){
        contentElement.classList.add("fadeOut");
        setTimeout(() => {
            contentElement.textContent = content;
            contentElement.classList.remove("fadeOut");
        }, 200);
    }
}

function PrintToConsole(amountInGrams, wafers, totalCosts, totalPrice, markup, pricePerGram, mfactor){
    console.log("Amount in grams: " + amountInGrams);
    console.log("Wafers: " + wafers);
    console.log("Total costs: " + totalCosts);
    console.log("Markup factor: " + mfactor);
    console.log("Markup: " + markup);
    console.log("Total price: " + totalPrice);
    console.log("Price per gram: " + pricePerGram);
}