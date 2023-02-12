    import React,{useState,useRef,useEffect} from "react";
    import './main.css';
    import Cards from "./cardsComponent/cards";
    import dataApi from "../../mockData";



    function Main(){
        const [data,setData]=useState();
        const [selectedArray, setSelected]=useState([]);   
        let promiseData=dataApi();
    
        useEffect(()=>{
            //getting the data from mock data
            promiseData.then((res)=>{
                
                if(res.length!==0){
                    console.log("we have data",res);
                    setData(res);
                    
                }
            }).catch((err)=>console.log("there is some error",err))
    })

    //it gives a tile of selected cards for the given user
    function getSelectedCards(cardData,deleteFlag){
        cardData=cardData.dataObj;
        let timingFlag=true;        
        if(!deleteFlag){

            if(selectedArray.length){
            
                //timing constraint logic: to avoid the conflict withthe scheduled events
                selectedArray.map((data)=>{
                    let t1=data.start_timing;
                    let t2=data.end_timing;
                    let s1=cardData.start_timing;
                    let s2=cardData.end_timing;

                    if((s1>=t2 && s2>t2) || (s1<t1 && s2<=t1)){
                        let x=timingFlag;
                        let y=true;
                        timingFlag=x&&y;
                    }
                    else{
                        let x=timingFlag;
                        let y=false;
                        timingFlag=x&&y;
                    }
                })
            }
            //the number of displayed cards should not be greater than 3
            if(selectedArray.length<3 && timingFlag){
            setSelected((x)=>[...x,cardData]);

            console.log("selectedArray",selectedArray);
            }

            else if(selectedArray.length>=3){
                alert("you cannot select more than 3 activities");
            }
            else{
                alert("there is a conflict in the selected events.");
            }
        }
        else{
            //deleting the cards
            let updatedArr= selectedArray.filter((item)=>item.id!=cardData.id );
            console.log("upadr",updatedArr);
            setSelected(updatedArr);
        }
    
        
    }    
        return(
            <div className="parent">
                <div className="childOne child">
                    <div className="textHeading">
                    <h4>All Events</h4>
                    </div>
                    <div className="cardGrid">
                        <div className="childGrid">
                        {/* iterating all the cards */}
                            {
                        data?.map((card)=>{
                            let cardData={
                                id:card.id,
                                text:"Select",
                                event:card.event_name,
                                category:card.event_category,
                                start_timing: card.start_time,
                                end_timing:card.end_time,
                                func:getSelectedCards

                            }
                            return(
                                <Cards  key={card.id} dataObj={{...cardData}}/>
                                
                            )
                        })
                            
                            }
                    
                        </div>
                    </div>
                </div>
                <div className="childTwo child">
                    <div className="textHeading">
                        <h4>Selected Events</h4>
                    </div>
                    <div className="cardGrid">
                        <div className="childGrid">
                            {/* iterating the selected cards */}
                            {                            
                                selectedArray?.map((card)=>{
                                    let cardData={
                                        id:card.id,
                                        event:card.event,
                                        text:"Delete",
                                        category:card.category,
                                        start_timing:card.start_timing,
                                        end_timing:card.end_timing,
                                        func:getSelectedCards
                                        
                                    }
                                    return(

                                        <Cards key={card.id} dataObj={{...cardData}}/>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    export default Main;

