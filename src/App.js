import "./styles.css";
import React, { useState } from "react";

// an array of currency denominations that we will use to make change
const CURRENCIES = [2000, 500, 100, 50, 20, 10, 5, 1];

export default function App() {
  // `billAmount` is the amount of the bill
  // `cashGiven` is the amount of cash given by the customer
  // `change` is the amount of change to be given to the customer
  // `changeNotes` is an object that shows how many of each currency denomination we need to give as change
  const [billAmount, setBillAmount] = useState(0);
  const [cashGiven, setCashGiven] = useState(0);
  const [change, setChange] = useState(0);
  const [changeNotes, setChangeNotes] = useState({});

  // this function updates the `billAmount` state variable when the user types in the bill amount input
  function handleBillAmountChange(event) {
    setBillAmount(Number(event.target.value));
  }
  // this function updates the `cashGiven` state variable when the user types in the cash given input
  function handleCashGivenChange(event) {
    setCashGiven(Number(event.target.value));
  }
  // this function is called when the user clicks the "Change" button
  function calculateChange() {
    // calculate the change amount by subtracting the bill amount from the cash given
    changeAmount = cashGiven - billAmount;
    // update the `change` state variable with the calculated change amount
    setChange(changeAmount);

    // initialize an empty object to hold the change notes breakdown
    var changeNotes = {};
    // loop through each currency denomination
    CURRENCIES.forEach((currency) => {
      // calculate the number of this denomination we need to give as change
      // by dividing the change amount by the denomination and flooring the result
      changeNotes[currency] = Math.floor(changeAmount / currency);
      // update the change amount to be the remainder after taking out the denominations we just calculated
      changeAmount %= currency;
    });
    // update the `changeNotes` state variable with the calculated change notes breakdown
    setChangeNotes(changeNotes);
  }

  return (
    <div>
      <label>
        Bill amount:
        <input
          type="number"
          value={billAmount}
          onChange={handleBillAmountChange}
        />
      </label>
      <br />
      <label>
        Cash given:
        <input
          type="number"
          value={cashGiven}
          onChange={handleCashGivenChange}
        />
      </label>
      <br />
      <button onClick={calculateChange}>Calculate Change</button>
      <br />
      <br />
      {/* this ternary operator is rendering a div with the change amount and change notes breakdown 
     if change is greater than 0, or a div with the text "No change" if change is 0 or less */}
      {change > 0 ? (
        <div>
          Change: {change}
          <br />
          Change Notes:
          {/* this map function is looping through each key-value pair in the changeNotes object 
         and rendering a div with the count and currency for each pair */}
          {Object.entries(changeNotes).map(([currency, count]) => {
            if (count > 0) {
              return (
                <div key={currency}>
                  {count} x {currency}
                </div>
              );
            }
          })}
        </div>
      ) : (
        <div>No change</div>
      )}
    </div>
  );
}
