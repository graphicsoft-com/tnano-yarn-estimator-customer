class Material{
    constructor(type, costPerSpeaker){
        this.type = type;
        this.costPerSpeaker = costPerSpeaker;
    }
}

const materials = [];
materials[0] = new Material("Lintec Silicon Wafer", 4.12);
materials[1] = new Material("Speaker Housing", 40);
materials[2] = new Material("Speaker Electronics", 200);

let markupBase = 25;

// Runs the calculator to correct the placeholder numbers at start
RunCalculator();

function RunCalculator() {

    //let wafers = numberOfSpeakers * (6.5 / 5) * 5;
    let numberOfSpeakers = document.getElementById("numberOfSpeakers").value;

    let mfactor = Math.pow((numberOfSpeakers), 0.4);
    let markup = (markupBase / mfactor);
    
    let laborCostPerSpeaker = 500;

    let materialCostPerSpeaker = 0;
    materials.forEach((material) => {
        materialCostPerSpeaker += material.costPerSpeaker;
    });


    let totalCosts = ((laborCostPerSpeaker + materialCostPerSpeaker) * numberOfSpeakers);
    let totalPrice = totalCosts * (1 + markup / 100);
    let pricePerSpeaker = totalPrice / numberOfSpeakers;

    UpdateTexts(pricePerSpeaker, totalPrice);

    // PrintToConsole(numberOfSpeakers, totalCosts, totalPrice, markup, pricePerSpeaker, mfactor);
}

function UpdateTexts(pricePerSpeaker, totalPrice){
    document.getElementById("price").textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.round(totalPrice));

    document.getElementById("pricePerAmount").textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.round(pricePerSpeaker));
}

function PrintToConsole(numberOfSpeakers, totalCosts, totalPrice, markup, pricePerSpeaker, mfactor){
    console.log("Amount in grams: " + numberOfSpeakers);
    console.log("Total costs: " + totalCosts);
    console.log("Markup factor: " + mfactor);
    console.log("Markup: " + markup);
    console.log("Total price: " + totalPrice);
    console.log("Price per gram: " + pricePerSpeaker);
}