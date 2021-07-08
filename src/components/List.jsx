import React from "react";

function List(props){
  return <li>{props.payer} {(props.event)==="Before"? "paid":"should pay "} {props.payee} Rs.{props.amount}</li>;
}

export default List;