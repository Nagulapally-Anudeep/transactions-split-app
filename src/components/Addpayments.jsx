import React,{useState} from "react";

function Addpayments(props) {
  const [transaction,setTransaction]=useState({
    payer: "",
    payee: "",
    amount: 0
  });

  function handleChange(event){
   const {name,value} = event.target;
   setTransaction(prevTransaction =>{
      return {
        ...prevTransaction,
        [name]: value
      };
   });
  }

  function handleSubmit(event){
     event.preventDefault();
     if(transaction.payer !== "" && transaction.payee !== ""){
      props.onAdd(transaction);
     }
     setTransaction({
       payer:"",
       payee:"",
       amount: 0
     });
  }

  return (
    <div className="add-payment">
      <form onSubmit={handleSubmit}>
        <input name="payer"
         placeholder="Enter payer's name"
         value={transaction.payer}
         type="text"
         onChange={handleChange}>
         </input>
        <input type="text"
        name="payee"
        placeholder="Enter payee's name"
        value={transaction.payee}
        onChange={handleChange}>
        </input>
        <input name="amount" 
        type="number"
        placeholder="Enter amount"
        value={transaction.amount}
        onChange={handleChange}>
        </input>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Addpayments;
