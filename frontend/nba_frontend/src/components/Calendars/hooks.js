import { useState } from "react";
import Api from '../api';
import moment from "moment";



const useData = (team) => {
          const [data , loadData] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getData =async() => {
                    const data= await Api.getSchedule(team.team);
                    
                    loadData(() => data);
                    changeLoading(false);
                    }

           return [data , getData , isLoading];
          
}

const useFilteredData=(data, time) =>{
          const[filteredData, setFilteredData] = useState()
          function getFilteredData(){
                    const date = `${moment(time).format("l").concat(" 12:00:00 AM")}`
                    const newData = data.filter(d=>`${date}` === d.gameDate);
                    setFilteredData(newData[0]['games'])
           }
           return[filteredData, getFilteredData]
          
}


export {useData, useFilteredData};