  import React,{useState,useRef,useEffect} from "react";
  import './cards.css';
  import dataApi from "../../../mockData";


  function Cards(props){

    //getting the props to display card objects
      const [data,setData]=useState('');

      let x=props.dataObj.start_timing;
      let startTime=x.substring(11,x.length-3);

      let y=props.dataObj.end_timing;
      let endTime=y.substring(11,y.length-3);

    function selectCards(event,flag){
      //getting the name of select and delete cards button
      //adding a flag to know if it's a delete or select card
      
      if(props.dataObj.text=="Select"){
        
        props.dataObj.func(props,false);
      }

      if(props.dataObj.text=="Delete"){
        
        props.dataObj.func(props,true);
      }
    }

    
      return(
        <div className="cardOutline">
          <div className="contRow">
        <div className="contColOne">
          <h1>{props.dataObj.category[0]}</h1>
        </div>
        <div className="contColLine">
          
        </div>
        <div className="contColTwo">
          <h4>{props.dataObj.event}</h4>
          <p>({props.dataObj.category})</p>
          <p>{startTime}-{endTime}</p>
          
        </div>
        <div className="contColThree">
          <button onClick={selectCards}>{props.dataObj.text}</button>
          </div>

          </div>
        </div>
        
      )
  }

  export default Cards;

