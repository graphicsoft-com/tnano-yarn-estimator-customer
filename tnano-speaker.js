class Material {
  constructor(type, costPerUnit) {
    this.type = type;
    this.costPerUnit = costPerUnit;
  }
}

const materials = [
  new Material("PCB Plate (0.2 mm-thick, 10x10 mm)", 2.0),
  new Material("Carbon Nanotube Sheet (Single Layer)", 8.0),
  new Material("Electrodes (Etched)", 1.5),
  new Material("Other Components", 2.5),
];

let equipmentCost = 5000;
let laborCost = 1500;
let indirectCosts = 3000;
let markupBase = 25;
let amount = 1;

RunCalculator();

function AmountUnitChanged(givenAmount) {
  amount = givenAmount;
  RunCalculator();
}

function RunCalculator() {
  let totalMaterialCosts = materials.reduce(
    (total, material) => total + material.costPerUnit,
    0
  );

  let totalCosts =
    (laborCost + indirectCosts + equipmentCost) * amount + totalMaterialCosts;
    
  let price = ReformatText(totalCosts);
  let pricePerAmount = ReformatText(totalCosts / amount);

  UpdateTextContent("price", price);
  UpdateTextContent("pricePerAmount", pricePerAmount);
}

function UpdateTextContent(id, content) {
  let contentElement = document.getElementById(id);
  if (contentElement.textContent !== content) {
    contentElement.classList.add("fadeOut");
    setTimeout(() => {
      contentElement.textContent = content;
      contentElement.classList.remove("fadeOut");
    }, 200);
  }
}

function ReformatText(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(Math.round(number));
}
