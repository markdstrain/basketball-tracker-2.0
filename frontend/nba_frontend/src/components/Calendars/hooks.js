import { useState } from "react";
import Api from '../api';
import moment from "moment";

const useData = () => {
          const [data , loadData] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getData =async() => {
                    const data= await Api.getSchedule();
                              loadData(() => data);
                              changeLoading(false);
                    }
           return [data , getData , isLoading];      
}

const useFilteredData=(data, time, team) =>{
          const[filteredData, setFilteredData] = useState()
          function getFilteredData(){
                    if(team.team === "all"){
                              const date = `${moment(time).format("l").concat(" 12:00:00 AM")}`
                              const newData = data.filter(d=>`${date}` === d.gameDate);
                              if(newData.length === 0 ){
                                        setFilteredData(newData)
                              }else{
                                        const gameDates = newData[0]['games'];
                                        setFilteredData(gameDates) 
                              }
                    }else{
                              const date = `${moment(time).format("l").concat(" 12:00:00 AM")}`
                              const datesData = data.filter(d=>`${date}` === d.gameDate);
                              if(datesData.length === 0){
                                        setFilteredData(datesData)
                              }else{
                                        const newDateData = datesData[0]['games'];
                                        const teamData = newDateData.filter(d=>  d['homeTeam']['teamId'] === parseInt(team.team) || d['awayTeam']['teamId'] === parseInt(team.team))
                                        setFilteredData(teamData)
                              }       
                    }  
           }
           return[filteredData, getFilteredData]   
}

export {useData, useFilteredData};