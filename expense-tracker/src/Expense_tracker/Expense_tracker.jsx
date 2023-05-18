import React from 'react'
import { useState } from 'react'

export const Expense_tracker = () => {
  const [resultsArray,setResultsArray]=useState([])
  const [enteredAmount,setEnteredAmount]=useState(0) 
  const [totalAmount,setTotalAmount]=useState(0)
  let action = ""
  return (
    <div>
        <div className='header-div'>
              <h1>Expense tracker</h1>
              <div className="header">
                 <h3>Balance :<span className='balance'>{totalAmount<0 ? setTotalAmount(0) : totalAmount
                        }</span></h3>
                 <input type="number" value={enteredAmount} onChange={amountChange} className='input' />
                <div>
                   <button onClick={increase}>Add</button>
                   <button onClick={decrease}>Remove</button>
               </div>
             
              </div>
         </div>
        <div className="transaction-div">
          <h2>Transactions : </h2>
           <div className="container">
              { resultsArray.map((data)=>{
                return(<h3 key={data}>{data}</h3>)
              })
              }
           </div>
        </div> 
    </div>
    
    
  )
  function getResultswithDate() {
    const daysArray = ["S","M" ,"T","W","T", "F","S"]
    const date = new Date().getDate() //current date
    const month = new Date().getMonth() + 1 //current month
    const year = new Date().getFullYear() //current year
    const hours = new Date().getHours() //current hours
    const min = new Date().getMinutes() //current minutes
    const sec = new Date().getSeconds() //current seconds
    const dayIndex = new Date().getDay() //current seconds
    
    return year+ '-' + month + '-' + date + ' ' + daysArray[dayIndex] + hours + ':' + min + ':' + sec + '-' + enteredAmount + '-'+ action
  }
   

   function amountChange(e){
     setEnteredAmount(e.target.value)
    
   }

   function noAmountEntered(){
    alert("Please enter some amount first")
   }

   function decrease(e){
   if(enteredAmount){
       if(totalAmount === 0){
         alert("you have no balance!!")
        }

        else if(enteredAmount > totalAmount){
         alert("Entered amount is more than your balance")
        }
       else{
        action = (e.target.innerText)
        setTotalAmount(totalAmount - enteredAmount)
        setEnteredAmount('')
        setResultsArray(oldArray => [...oldArray,getResultswithDate()])
        }}else{
          noAmountEntered()
        }
  }
  function increase(e){
    if(enteredAmount){
    setTotalAmount(totalAmount +  parseInt(enteredAmount))
    setEnteredAmount('')
    setResultsArray(oldArray => [...oldArray,getResultswithDate()])
   action =  (e.target.innerText)}
   else {
    noAmountEntered()
   }    
  }
}