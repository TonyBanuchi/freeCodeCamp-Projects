let price = 1.87;
let cid = [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90],
  ['FIVE', 55],
  ['TEN', 20],
  ['TWENTY', 60],
  ['ONE HUNDRED', 100]
];

const statusMsgs = {
  insuf: "Status: INSUFFICIENT_FUNDS",
  open: "Status: OPEN",
  closed: "Status: CLOSED",
  exact: "No change due - customer paid with exact cash"
};

class MoneyUnit {
  constructor(unitCount, valueMultiplier, plural){
    this.unitCount = unitCount;
    this.valueMultiplier = valueMultiplier
    this.plural = plural;
  }

  value = () => parseFloat((this.valueMultiplier * this.unitCount).toFixed(2));

}

class MoneyBreakdown {
  constructor(){
    this.PENNY = new MoneyUnit(0,0.01,'Pennies');
    this.NICKEL = new MoneyUnit(0,0.05,'Nickels');
    this.DIME = new MoneyUnit(0,0.10,'Dimes');
    this.QUARTER = new MoneyUnit(0,0.25,'Quarters');
    this.ONE = new MoneyUnit(0,1.00,'Ones');
    this.FIVE = new MoneyUnit(0,5.00,'Fives');
    this.TEN = new MoneyUnit(0,10.00,'Tens');
    this.TWENTY = new MoneyUnit(0,20.00,'Twenties');
    this['ONE HUNDRED'] = new MoneyUnit(0,100.00,'Hundreds');
  };

  total(){
     return parseFloat((this.PENNY.value() + 
    this.NICKEL.value() + 
    this.DIME.value() + 
    this.QUARTER.value() + 
    this.ONE.value() + 
    this.FIVE.value() + 
    this.TEN.value() + 
    this.TWENTY.value() + 
    this['ONE HUNDRED'].value()).toFixed(2));
  }

  clone(){
    const clone = new MoneyBreakdown();
    const indexes = Object.keys(clone);
    for(const index of indexes){
      clone[index].unitCount = this[index].unitCount;
    }

    return clone;
  }
}

const cashInput = document.getElementById('cash');
const cash = ()=>Number(cashInput.value);
const changeDueElement = document.getElementById('change-due');
const purchaseBtn = document.getElementById('purchase-btn');
const priceElement = document.getElementById('price-value');
const cashDrawerElement = document.getElementById('cash-drawer')


const purchase = ()=>{
  const cashIn = cash();
  const cashDrawer = countCashDrawer();
  calculateChange(price, cashIn);
  cashInput.value = '';
}

const countCashDrawer = () => {
  const cashDrawer = new MoneyBreakdown();
  cid.forEach(unit => {
    cashDrawer[unit[0]].unitCount = (unit[1]/cashDrawer[unit[0]].valueMultiplier);
  });
  return cashDrawer;
}

const updateCashDrawer = (changeGiven) => {
  const cashDrawer = countCashDrawer();
  cashDrawerElement.innerHTML = `<p><strong>Cash in Drawer:</strong></p>`;
  const tempCashDrawer = cashDrawer.clone();

  const indexes = Object.keys(tempCashDrawer);
  const newCid = [];
  for(const index of indexes){
    tempCashDrawer[index].unitCount -= changeGiven[index].unitCount;
    const cashRow = document.createElement('p');
    cashRow.className = 'cash-drawer-row';
    cashRow.innerHTML = `<span class="left">${tempCashDrawer[index].plural}:</span> <span class="right">$${tempCashDrawer[index].value().toFixed(2)}</span>`;
    cashDrawerElement.appendChild(cashRow);
    newCid.push([index, tempCashDrawer[index].value()])
  }

}

const updateRegister = (moneyOut, msg) => {
  changeDueElement.innerHTML = '';
  const msgElement = document.createElement('p');
  msgElement.id = 'status-msg'
  msgElement.textContent = msg;
  changeDueElement.appendChild(msgElement);

  if( msg === statusMsgs.open || msg === statusMsgs.closed){
    updateCashDrawer(moneyOut);
    const indexes = Object.keys(moneyOut);
    const changeElements = [];
    for(const index of indexes){
      if(moneyOut[index].unitCount){
        const changeRow = document.createElement('p');
        changeRow.classList.add('change-row');
        changeRow.innerHTML = `<span class="left">${index}: </span><span class="right">$${Number((moneyOut[index].value()).toFixed(2))}</span>`;
        changeElements.push(changeRow);
      }
    }
    changeElements.reverse().forEach(el => {
      changeDueElement.appendChild(el);
    });
  }
}

const getAvailableChangeBreakdown = (change, tempCashDrawer, availableChange = new MoneyBreakdown()) => {
  let changeCalc = Number((change * 100).toFixed(2));

  switch(true){
    //$0
    case changeCalc === 0: return availableChange;
    //$100
    case changeCalc >= 10000  && tempCashDrawer['ONE HUNDRED'].unitCount > 0: { 
      availableChange['ONE HUNDRED'].unitCount++;
      tempCashDrawer['ONE HUNDRED'].unitCount--;
      changeCalc-=10000;
      break;
    }
    //$20
    case changeCalc >= 2000 && tempCashDrawer.TWENTY.unitCount > 0: { 
      availableChange.TWENTY.unitCount++;
      tempCashDrawer.TWENTY.unitCount--;
      changeCalc-=2000;
      break;
    }
    //$10
    case  changeCalc >= 1000 && tempCashDrawer.TEN.unitCount > 0: { 
      availableChange.TEN.unitCount++;
      tempCashDrawer.TEN.unitCount--;
      changeCalc-=1000;
      break;
    }
    //$5
    case  changeCalc >= 500 && tempCashDrawer.FIVE.unitCount > 0: { 
      availableChange.FIVE.unitCount++;
      tempCashDrawer.FIVE.unitCount--;
      changeCalc-=500;
      break;
    }
    //$1
    case  changeCalc >= 100 && tempCashDrawer.ONE.unitCount > 0: { 
      availableChange.ONE.unitCount++;
      tempCashDrawer.ONE.unitCount--;
      changeCalc-=100;
      break;
    }
    //$0.25
    case  changeCalc >= 25 && tempCashDrawer.QUARTER.unitCount > 0: { 
      availableChange.QUARTER.unitCount++;
      tempCashDrawer.QUARTER.unitCount--;
      changeCalc-=25;
      break;
    }
    //$0.10
    case  changeCalc >= 10 && tempCashDrawer.DIME.unitCount > 0: { 
      availableChange.DIME.unitCount++;
      tempCashDrawer.DIME.unitCount--;
      changeCalc-=10;
      break;
    }
    //$0.05
    case  changeCalc >= 5 && tempCashDrawer.NICKEL.unitCount > 0: { 
      availableChange.NICKEL.unitCount++;
      tempCashDrawer.NICKEL.unitCount--;
      changeCalc-=5;
      break;
    }
    //$0.01
    case changeCalc >= 1 && tempCashDrawer.PENNY.unitCount > 0: { 
      availableChange.PENNY.unitCount++;
      tempCashDrawer.PENNY.unitCount--;
      changeCalc-=1;
      break;
    }
    default: return availableChange;
  }

  return getAvailableChangeBreakdown(Number((changeCalc/100).toFixed(2)), tempCashDrawer, availableChange);
};

const getExactChangeBreakdown = (change, exactChange = new MoneyBreakdown()) => {
  let changeCalc = Number((change * 100).toFixed(2));
  switch(true){
    //$0
    case changeCalc === 0: return exactChange;
    //$100
    case changeCalc >= 10000: { 
      exactChange['ONE HUNDRED'].unitCount++
      changeCalc-=10000;
      break;
    }
    //$20
    case changeCalc >= 2000: { 
      exactChange.TWENTY.unitCount++
      changeCalc-=2000;
      break;
    }
    //$10
    case  changeCalc >= 1000: { 
      exactChange.TEN.unitCount++
      changeCalc-=1000;
      break;
    }
    //$5
    case  changeCalc >= 500: { 
      exactChange.FIVE.unitCount++
      changeCalc-=500;
      break;
    }
    //$1
    case  changeCalc >= 100: { 
      exactChange.ONE.unitCount++
      changeCalc-=100;
      break;
    }
    //$0.25
    case  changeCalc >= 25: { 
      exactChange.QUARTER.unitCount++
      changeCalc-=25;
      break;
    }
    //$0.10
    case  changeCalc >= 10: { 
      exactChange.DIME.unitCount++
      changeCalc-=10;
      break;
    }
    //$0.05
    case  changeCalc >= 5: { 
      exactChange.NICKEL.unitCount++
      changeCalc-=5;
      break;
    }
    //$0.01
    default: { 
      exactChange.PENNY.unitCount++
      changeCalc-=1;
    }
  }

  return getExactChangeBreakdown(Number((changeCalc/100).toFixed(2)), exactChange);
};

const getRegisterStatus = (changeObj) => {
  const cashDrawer = countCashDrawer();
  const tempCashDrawer = cashDrawer.clone();
  console.log(`Change: ${changeObj.total()}\nDrawer: ${tempCashDrawer.total()}\nEqual: ${Number(changeObj.total().toFixed(2)) === Number(tempCashDrawer.total().toFixed(2))}`)
  if(Number(changeObj.total().toFixed(2)) === Number(tempCashDrawer.total().toFixed(2))){
    updateRegister(tempCashDrawer, statusMsgs.closed);
  } else if (changeObj.total() > tempCashDrawer.total()){
    updateRegister(changeObj, statusMsgs.insuf);
  } else {
    const isChangeOnHand = cid.map((unit)=>
      changeObj[unit[0]].value() <= tempCashDrawer[unit[0]].value()
    )

    if(isChangeOnHand.every(test => test)){
      updateRegister(changeObj, statusMsgs.open);
    } else {
      const newChange = getAvailableChangeBreakdown(changeObj.total(),tempCashDrawer);

      if(newChange.total().toFixed(2) === changeObj.total().toFixed(2)){
        updateRegister(newChange, statusMsgs.open);
      } else {
        updateRegister({}, statusMsgs.insuf);
      }
    }
  }
};

const calculateChange = (amt, paid) => {
  if(paid < amt){
    alert("Customer does not have enough money to purchase the item");
    return;
  }

  const changeAmount = paid - amt;

  if (changeAmount === 0){
    updateRegister({},statusMsgs.exact);
    return;
  }

  const changeObj = getExactChangeBreakdown(changeAmount);

  getRegisterStatus(changeObj);
}; 

purchaseBtn.addEventListener('click',purchase);
updateCashDrawer(new MoneyBreakdown());
priceElement.textContent = price.toFixed(2);
