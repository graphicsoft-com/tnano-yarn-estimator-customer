class Material {
  constructor(type, costPerUnit) {
    this.type = type;
    this.costPerUnit = costPerUnit;
  }
}

const materials = [
  new Material("PCB Plate (0.2 mm-thick, 10x10 mm)", 2.0),
  new Material("Carbon Nanotube Sheet (Single Layer)", 5.0),
  new Material("Electrodes (Etched)", 1),
  new Material("Other Components", 2),
];

let equipmentCost = 0;
let laborCost = 1;
let indirectCosts = 0;
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

  let totalCosts = ((laborCost + indirectCosts + equipmentCost) * amount * totalMaterialCosts);

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

const thermoacousticEarphoneProperties = [
  {
    property: "Applied Power",
    value: "0.35 W and 1 mW"
  },
  {
    property: "Distance from Source",
    value: "1.0 cm"
  },
  {
    property: "Sheet Material",
    value: "Single layer of multiwalled carbon nanotube sheet"
  },
  {
    property: "Sheet Resistance",
    value: "1 kΩ per square"
  },
  {
    property: "Transparency",
    value: "90%"
  },
  {
    property: "PCB Plate Thickness",
    value: "0.2 mm"
  },
  {
    property: "Opening Size",
    value: "10 × 10 mm"
  },
  {
    property: "Frequency Range for SPL Measurement",
    value: "10 Hz to 100 kHz"
  },
  {
    property: "Frame Weight",
    value: "0.1684 g"
  }
];


function renderPropDiv(prop, value) {
  return `
    <div class="contentBox">
      <p>${prop}</p>
      <p>${value}</p>
    </div>
  `;
}

const renderProperties = () => {
  const materialProperties = document.querySelector('.materialProperties');
  thermoacousticEarphoneProperties.forEach((item) => {
    materialProperties.innerHTML += renderPropDiv(item.property, item.value);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderProperties();
});