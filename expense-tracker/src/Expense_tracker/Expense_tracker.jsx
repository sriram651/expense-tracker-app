import React from 'react'
import { useState } from 'react'

export const Expense_tracker = () => {
  const [resultsArray, setResultsArray] = useState([])
  const [enteredAmount, setEnteredAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  let action = "";

  React.useEffect(() => {
    console.log(resultsArray);
  }, [resultsArray]);
  return (
    <div>
      <div className='header-div'>
        <h1>Expense tracker</h1>
        <div className="header">
          <h3>Balance :<span className='balance'>{totalAmount < 0 ? setTotalAmount(0) : totalAmount
          }</span></h3>
          <input 
            required
            type="number" 
            value={enteredAmount} 
            onChange={amountChange} 
            className='input' />
          <div>
            <button onClick={increase}>Add</button>
            <button onClick={decrease}>Remove</button>
          </div>

        </div>
      </div>
      <div className="transaction-div">
        <h2>Transactions : </h2>
        <div className="container">
          {resultsArray && resultsArray.map((data) => {
            return (
              <div key={data}>
                <p>Rs. {data.transactionAmount}/-</p>
                {data.transactionType == "Add" && <p style={{color: "green"}}>Deposited</p>}
                {data.transactionType == "Remove" && <p style={{color: "Red"}}>Withdrawn</p>}
                <h5>On {data.transactionDate}  {data.transactionTime}</h5>
              </div>
            )
          })
          }
          {resultsArray.length == 0 && <h3>No Transactions to display!</h3>}
        </div>
      </div>
    </div>


  )
  function getResultswithDate() {
    const date = new Date() //current date
    const dateString = date.toLocaleDateString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric'});
    const timeString = date.toLocaleTimeString();
  
    return {
      transactionAmount: enteredAmount,
      transactionDate: dateString,
      transactionTime: timeString,
      transactionType: action
    }
  }


  function amountChange(e) {
    setEnteredAmount(e.target.value)
  }

  function noAmountEntered() {
    alert("Please enter some amount first")
  }

  function decrease(e) {
    if (enteredAmount) {
      if (totalAmount === 0) {
        alert("you have no balance!!")
      }

      else if (enteredAmount > totalAmount) {
        alert("Entered amount is more than your balance")
      }
      else {
        action = (e.target.innerText)
        setTotalAmount(totalAmount - enteredAmount)
        setEnteredAmount('')
        setResultsArray(oldArray => [...oldArray, getResultswithDate()])
      }
    } else {
      noAmountEntered()
    }
  }
  function increase(e) {
    if (enteredAmount) {
      setTotalAmount(totalAmount + parseInt(enteredAmount))
      setEnteredAmount('')
      setResultsArray(oldArray => [...oldArray, getResultswithDate()])
      action = (e.target.innerText)
    }
    else {
      noAmountEntered()
    }
  }
}