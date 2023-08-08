class Equipment{
    constructor(type, name, cost, maxThroughput, costExponent){
        this.type = type;
        this.name = name;
        this.cost = cost;
        this.maxThroughput = maxThroughput;
        this.costExponent = costExponent;
    }
}

class Material{
    constructor(type, costPerWafer){
        this.type = type;
        this.costPerWafer = costPerWafer;
    }
}

class Worker{
    constructor(type, hourlySalary, maxThroughput){
        this.type = type;
        this.hourlySalary = hourlySalary;
        this.maxThroughput = maxThroughput;
    }
}

class IndirectCost{
    constructor(type, monthlyCost){
        this.type = type;
        this.monthlyCost = monthlyCost;
    }
}

const equipment = [];
equipment[0] = new Equipment("CVD", "Easytube 3000", 185000, 0.75, 1);
equipment[1] = new Equipment("CVD", "Easytube 3000 EXT", 250000, 32, 1);
equipment[2] = new Equipment("CVD", "Easytube 6000", 800000, 200, 1);
equipment[3] = new Equipment("Laser Engraver", "Ray5 5W", 250, 50, 1);
equipment[4] = new Equipment("E-Gun Evaporator", "CHA Mark 50", 140000, 6, 1);
equipment[5] = new Equipment("Spinning Machine", "Custom", 1000, 1/4, 0.8);

const materials = [];
materials[0] = new Material("Silicon Wafer", 8/5);
materials[1] = new Material("Iron Pellets", 6.7/5);
materials[2] = new Material("Acetylene Gas", 4.41/5);
materials[3] = new Material("Hydrogen Gas", 3.5154/5);
materials[4] = new Material("Argon Gas", 5.7246/5);

const workers = [];
workers[0] = new Worker("Engineer", 62.5, 8);

const indirectCosts = [];
indirectCosts[0] = new IndirectCost("Rent", 4000);
indirectCosts[1] = new IndirectCost("Electricity", 120);



let amountInput = document.getElementById("amount");
let amountUnitInput = document.getElementById("amountUnit");
let monthsInput = document.getElementById("time");

let pricePerAmountText = document.getElementById("pricePerAmount");
let toalPriceText = document.getElementById("price");

let amountInGrams = 100;
let amountFactor = 1;
let months = 6;
let markup = 0;

// Runs the calculator to correct the placeholder numbers at start
RunCalculator();

function AmountChanged(amount) {
    amountInGrams = amount / amountFactor;
    console.log("Amount changed to: " + amount + " = " + amountInGrams + " grams");
    RunCalculator();
}

function AmountUnitChanged(unit) {
    switch (unit) {
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
    amountInput.value = Math.round(amountInGrams * amountFactor * 100) / 100;
    RunCalculator();
}

function TimeChanged(time) {
    months = time;
    console.log("Time changed to: " + months + " months");
    RunCalculator();
}



function CompareEquipment(e1, e2) {
    if (e1.maxThroughput < e2.maxThroughput)
        return 1;
    else
        return -1;
}

function GetEquipmentOfType(type) {
    let count = 0;
    equipment.forEach((equipment) => {
        if (equipment.type === type)
            count++;
    });

    let equipmentOfType = new Array(count);
    let index = 0;
    equipment.forEach((equipment) => {
        if (equipment.type === type) {
            equipmentOfType[index] = equipment;
            index++;
        }
    });

    // Sorts the array from largest capacity to smallest
    equipmentOfType.sort(CompareEquipment);

    return equipmentOfType;
}



function RunCalculator() {

    let gramsPerMonth = amountInGrams / months;

    let wafersPerMonth = gramsPerMonth * 6.5 / 5 * 5;
    console.log("Wafers per month: " + wafersPerMonth);

    let countOfEquipment = [0, 0, 0, 0, 0, 0];

    let types = ["E-Gun Evaporator", "CVD", "Laser Engraver", "Spinning Machine"];
    types.forEach((type) => {
        let eq = GetEquipmentOfType(type);
        let wafersPerHourLeft = wafersPerMonth / 160;

        for (let i = 0; i < eq.length; i++) {
            while (wafersPerHourLeft > eq[i].maxThroughput) {
                countOfEquipment[equipment.indexOf(eq[i])]++;
                wafersPerHourLeft -= eq[i].maxThroughput;
            }

            if (i < eq.length - 1) {
                let count = Math.round(wafersPerHourLeft / eq[i + 1].maxThroughput);
                if (eq[i].cost < eq[i + 1].cost * count) {
                    countOfEquipment[equipment.indexOf(eq[i])]++;
                    wafersPerHourLeft -= eq[i].maxThroughput;
                }
            }
        }

        let indexOfFinal = equipment.indexOf(GetEquipmentOfType(type)[GetEquipmentOfType(type).length - 1]);
        while (wafersPerHourLeft > 0) {
            countOfEquipment[indexOfFinal]++;
            wafersPerHourLeft -= equipment[indexOfFinal].maxThroughput;
        }
    });

    for (i = 0; i < equipment.length; i++) {
        console.log(countOfEquipment[i] + " x " + equipment[i].type + " " + equipment[i].name);
    }

    let totalEquipmentCost = 0;
    for (i = 0; i < equipment.length; i++) {
        totalEquipmentCost += equipment[i].cost * Math.pow(countOfEquipment[i], equipment[i].costExponent);
    }
    console.log("Total equipment cost: " + totalEquipmentCost);
    console.log("Equipment cost per km: " + totalEquipmentCost / (wafersPerMonth * months / 5));

    let workerCount = Math.ceil(wafersPerMonth / 160 / workers[0].maxThroughput);
    let totalLaborCosts = workerCount * workers[0].hourlySalary * 160 * months;
    console.log("Labor cost per month: " + totalLaborCosts / months);

    let totalIndirectCosts = 0;
    indirectCosts.forEach((idc) => {
        totalIndirectCosts += idc.monthlyCost * months;
    });
    console.log("Labor indirect costs per month: " + totalIndirectCosts / months);

    let totalMaterialCosts = 0;
    materials.forEach((material) => {
        totalMaterialCosts += material.costPerWafer * wafersPerMonth * months;
    });
    console.log("Material costs per km: " + totalMaterialCosts / (wafersPerMonth * months / 5));


    let totalMontlyCosts = (totalLaborCosts + totalIndirectCosts + totalMaterialCosts + totalEquipmentCost) / months;
    let totalPrice = totalMontlyCosts * months * (1 + markup / 100);

    let pricePerGram = totalPrice / months / gramsPerMonth;

    let pricePerAmountUnit;
    let factor;
    switch (amountUnitInput.value) {
        case "grams":
        case "kg":
            factor = 1;
            pricePerAmountUnit = "gram";
            break;
        case "lbs":
            factor = 1 / 453.592;
            pricePerAmountUnit = "lb"
            break;
        case "km":
        case "m":
            factor = 6.5 / 5;
            pricePerAmountUnit = "km"
            break;
        case "ft":
            factor = 6.5 / 5 / 1000 * 3.28084;
            pricePerAmountUnit = "ft"
    }
    let pricePerAmount = Math.round(pricePerGram / factor * 100) / 100;

    pricePerAmountText.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.round(pricePerAmount)) + "/" + pricePerAmountUnit;
    toalPriceText.textContent = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(Math.round(totalPrice));
}

