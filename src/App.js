import React,{useState} from "react";
import Header from "./components/Header";
import Addpayments from "./components/Addpayments";
import List from "./components/List";
import {split} from "./logic/split";

export default function App() {
  const [transactions,setTransactions] = useState([]);
  const [empty,setEmpty] = useState(true);
  const [event,setEvent] = useState("Before");

  function addTransaction(transaction){
    setTransactions(prevTransactions =>{
       return [...prevTransactions,transaction];
    });
    setEmpty(false);
  }

  function handleClear(){
    setTransactions([]);
    setEmpty(true);
    setEvent("Before");
  }

  function handleSplit(){
    //console.log(transactions);
    const output = split(transactions);
    setEvent("After");
    setTransactions(output);
    //console.log(output);
  }

  return (
    <div className="App">
      <Header />
      <Addpayments onAdd={addTransaction}/>
      <div className="transaction-area">
        <div className="details">
          {empty? <p>No Transactions Available...</p> :
            (<ul>
              {transactions.map((transaction,id) =>{
                 return <List 
                     key={id} 
                     event={event}
                     payer={transaction.payer} 
                     payee={transaction.payee} 
                     amount={transaction.amount}/>;
                    })
              }
          </ul>)
          }
        </div>
        {!empty && <div className="buttons">
             <button className="clear-button" onClick={handleClear}>Clear</button>
             <button className="simplify" onClick={handleSplit}>Split</button>
        </div> }
      </div>
    </div>
  );
}


