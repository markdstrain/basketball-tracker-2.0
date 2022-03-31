import React, { useState, useEffect } from "react";
import { useDataPerTotal, useDataPer48, useDataPerGame, useDataPer36, useDataPerMin, useDataPerPos } from './hooks';
import {Link} from 'react-router-dom';
import { library  } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import './PlayerLeadersPerTeam.css';
// import { useFilteredData } from "../Calendars/hooks";
const genericPlayer = require('../../assets/genericPlayer.png')
library.add(faCaretLeft, faCaretRight);



function PlayerLeadersPerTeam(team){

// Setting up Constants
          const [dataPerTotal, getDataPerTotal, isLoading] = useDataPerTotal(team.team)
          const [ dataPer48, getDataPer48 ] = useDataPer48(team.team);
          const [ dataPerGame, getDataPerGame ] = useDataPerGame(team.team);
          const [ dataPer36, getDataPer36 ] = useDataPer36(team.team);
          const [ dataPerMin, getDataPerMin ] = useDataPerMin(team.team);
          const [ dataPerPos, getDataPerPos ] = useDataPerPos(team.team);
          const [ data, setData ] = useState();
          const [ready, setReady]=useState(false)
          const perArray =['Season', 'Per 48 Minutes', 'Per Game', 'Per 36 Minutes', 'Per Minute', 'Per Possession']
          const [ per, setPer ] = useState(perArray[0]);
          const statArray =['Points','Field Goals','Rebounds','Assists', 'Blocks','Free Throws','Double Doubles', 'Triple Doubles', 'Playing Time','Steels', ' Win/Loss']
          const [ stat,setStat ] = useState(statArray[0]);
          const[ asc, setAsc ] = useState(true);
          const[ filteredStat, setFilteredStat ] = useState("PTS")
         const[filteredData, setFilteredData] = useState();

//  All the use Effects 
//Getting Data for Season Total
          useEffect(()=>{
                    getDataPerTotal(team.team);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
//Getting Data for Per 48
          useEffect(()=>{
                    getDataPer48(team.team);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
//Getting Data Per Game
          useEffect(()=>{
                    getDataPerGame(team.team);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
//Getting Data Per 36 minutes
          useEffect(()=>{
                    getDataPer36(team.team);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
//Getting Data Per Minute
          useEffect(()=>{
                    getDataPerMin(team.team);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
//Getting Data Per Possession
          useEffect(()=>{
                    getDataPerPos(team.team);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
          useEffect(()=>{
                    if(dataPerTotal){
                             setData(dataPerTotal)
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[dataPerTotal])
//changing Data for Each type of Per
          useEffect(()=>{
                    if(per === perArray[0]){
                              setData(dataPerTotal)
                    }else if(per === perArray[1]){
                              setData(dataPer48)
                    }else if(per === perArray[2]){
                              setData(dataPerGame)
                    }else if(per === perArray[3]){
                              setData(dataPer36)
                    }else if(per === perArray[4]){
                              setData(dataPerMin)
                    }else if(per === perArray[5]){
                              setData(dataPerPos)
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[per]);
//This is sorting data from top to bottom or bottom to top
          useEffect(()=>{
                    if(data){
                              if(asc===false){
                                       if(filteredStat === "2PTM"){
                                                  const newData = data.sort((a,b)=>{
                                                            return ((a["FGM"] - a["FG3M"]) - (b["FGM"] - b["FG3M"]))
                                                  })
                                                  setFilteredData(newData);
                                       }else if(filteredStat==="2PTA"){
                                                 const newData = data.sort((a,b)=>{
                                                           return ((a["FGA"] - a["FG3A"]) - (b["FGA"] - b["FG3A"]))
                                                })
                                                setFilteredData(newData);
                                        }else if(filteredStat==="2PT%"){
                                                  const newData = data.sort((a,b)=>{
                                                            return (((a["FGM"] - a["FG3M"])/(a["FGA"] - a["FG3A"])) - ( (b["FGM"] - b["FG3M"])/(b["FGA"] - b["FG3A"])))
                                                 })
                                                 setFilteredData(newData);
                                         }else{
                                                  const newData = data.sort((a, b) => {
                                                                      return a[filteredStat] -b[filteredStat];
                                                  })  
                                                  setFilteredData(newData);
                                       }
                              }else{
                                        if(filteredStat === "2PTM"){
                                                  const newData = data.sort((a,b)=>{
                                                            return ((b["FGM"] - b["FG3M"]) - (a["FGM"] - a["FG3M"]))
                                                  })
                                                  setFilteredData(newData);
                                       }else if(filteredStat==="2PTA"){
                                                 const newData = data.sort((a,b)=>{
                                                           return ((b["FGA"] - b["FG3A"]) - (a["FGA"] - a["FG3A"]))
                                                })
                                                setFilteredData(newData);
                                        }else if(filteredStat==="2PT%"){
                                                  const newData = data.sort((a,b)=>{
                                                            return (((b["FGM"] - b["FG3M"])/((b["FGA"] - b["FG3A"]) === 0 ? 1 : (b["FGA"] - b["FG3A"]))) - ( (a["FGM"] - a["FG3M"])/((a["FGA"] - a["FG3A"]) === 0 ? 1 : (a["FGA"] - a["FG3A"]))))
                                                 })
                                                 setFilteredData(newData);
                                         }else{
                                                  const newData = data.sort((a, b) => {
                                                                      return b[filteredStat] -a[filteredStat];
                                                  })  
                                                  setFilteredData(newData);
                                       }
                              }
                              setReady(true)
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[filteredStat, asc, data])
//changing data based on the stats
          useEffect(()=>{
                    if(stat ==="Points"){
                              setFilteredStat("PTS");
                               setAsc(true);
                    }else if(stat === "Field Goals"){
                              setFilteredStat("FGM");
                              setAsc(true);
                    }else if( stat === "Rebounds"){
                              setFilteredStat("REB");
                              setAsc(true);
                    }else if(stat === "Assists"){
                              setAsc(true);
                              setFilteredStat("AST")
                    }else if(stat === "Blocks"){
                              setAsc(true);
                              setFilteredStat("BLK")
                    }else if(stat === "Free Throws"){
                              setAsc(true);
                              setFilteredStat("FTM")
                    }else if(stat === "Double Doubles"){
                              setAsc(true);
                              setFilteredStat("DD2")
                    }else if(stat === "Triple Doubles"){
                              setAsc(true);
                              setFilteredStat("TD3")
                    }else if(stat === "Playing Time"){
                              setAsc(true);
                              setFilteredStat("GP")
                    }else if(stat === "Steels"){
                              setAsc(true);
                              setFilteredStat("STL")
                    }else {
                              setAsc(true);
                              setFilteredStat("W")
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[stat])

//functions to move controls   
          function minusPer(){
                    const currentIndex = perArray.indexOf(per);
                    if(currentIndex === 0){
                              setPer(perArray[5]);
                    }else{
                              setPer(perArray[currentIndex - 1])
                    }
          }
          function addPer(){
                    const currentIndex = perArray.indexOf(per);
                    if(currentIndex === perArray.length-1){
                              setPer(perArray[0]);
                    }else{
                              setPer(perArray[currentIndex + 1])
                    }
          }
          function minusStat(){
                    const currentIndex = statArray.indexOf(stat);
                    if(currentIndex === 0){
                              setReady(false);
                              setStat(statArray[10]);
                    }else{
                              setReady(false);
                              setStat(statArray[currentIndex - 1])
                    }
                    
          }
          function addStat(){
                    const currentIndex = statArray.indexOf(stat);
                    if(currentIndex === statArray.length-1){
                              setReady(false)
                              setStat(statArray[0]);
                    }else{
                              setReady(false)
                              setStat(statArray[currentIndex + 1])
                    }
          }
          function addDefaultSrc(evt){
                    evt.target.src= genericPlayer;
          }
          function tableSort(stat){
                    if(stat === filteredStat){
                              setReady(false)
                              setAsc(!asc);
                    }else{
                              setReady(false)
                              setAsc(true);
                              setFilteredStat(stat);
                    }
          }

//html render
          return(
                    <div>
                              <div className="team-leaders-header text-center mt-3">
                                        <h2 className="">
                                                 Team Leaders
                                        </h2>
                              </div> 
                              <div className="team-leaders-container" >
                                        <div className="stat-container">
                                                  <div className="stat-controls">
                                                            <button className="stat-button controls" onClick={minusStat}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-left"/>
                                                            </button>
                                                            <div className="controls stat text-center">
                                                                      {data &&

                                                                      <h5>{stat}</h5> 
                                                                      }   
                                                            </div>
                                                            <button className="stat-button controls" onClick={addStat}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-right"/>
                                                            </button>
                                                  </div>
                                        </div>
                                        <div className= "per-container" >
                                                  <div className="per-controls">
                                                            <button className="per-button controls" onClick={minusPer}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-left"/>
                                                            </button>
                                                            <div className="controls per text-center">
                                                                      {data &&
                                                                      
                                                                      <h5>{per}</h5> 
                                                                      }   
                                                            </div>
                                                            <button className="per-button controls" onClick={addPer}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-right"/>
                                                            </button>
                                                  </div>
                                        </div>

                                        <div>
                                                  {isLoading && !ready &&          
                                                            <div className="loading text-center"><p>Loading...</p></div>
                                                  }
                                                  {!isLoading && filteredData&&
                                                            <div className="table-container">
                                                                      <div className="warning">
                                                                                {stat === "Points" &&ready ?
                                                                                <div>
                                                                                        <Table className="table table-borderless container-fluid">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player ">&nbsp; Player</td>
                                                                                                                        {filteredStat === "PTS" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PTS")}>Points </td>
                                                                                                                                  : filteredStat === "PTS" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PTS")}>Points </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PTS")}>Points </td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PLUS_MINUS" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PLUS_MINUS")}>+/- </td>
                                                                                                                                  : filteredStat === "PLUS_MINUS" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PLUS_MINUS")}>+/- </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PLUS_MINUS")}>+/-</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "NBA_FANTASY_PTS" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("NBA_FANTASY_PTS")}>Fantasy </td>
                                                                                                                                  : filteredStat === "NBA_FANTASY_PTS" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("NBA_FANTASY_PTS")}>Fantasy </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("NBA_FANTASY_PTS")}>Fantasy</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr className="table-row" key={d["PLAYER_ID"]}>
                                                                                                                                {asc === true ?
                                                                                                                                  <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                  :
                                                                                                                                  <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["PTS"]}</td>
                                                                                                                                <td className="warning">{d["PLUS_MINUS"]}</td>
                                                                                                                                <td className="warning ">{d["NBA_FANTASY_PTS"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> :  
                                                                                stat === "Field Goals" && ready ?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "FGM" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FGM")}>FGM </td>
                                                                                                                                  : filteredStat === "FGM" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FGM")}>FGM </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FGM")}>FGM</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FGA" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FGA")}>FGA </td>
                                                                                                                                  : filteredStat === "FGA" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FGA")}>FGA </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FGA")}>FGA</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FG_PCT" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FG_PCT")}>FG% </td>
                                                                                                                                  : filteredStat === "FG_PCT" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FG_PCT")}>FG% </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FG_PCT")}>FG%</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "2PTM" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("2PTM")}>2PTM </td>
                                                                                                                                  : filteredStat === "2PTM" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("2PTM")}>2PTM </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("2PTM")}>2PTM</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "2PTA" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("2PTA")}>2PTA </td>
                                                                                                                                  : filteredStat === "2PTA" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("2PTA")}>2PTA </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("2PTA")}>2PTA</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "2PT%" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("2PT%")}>2PT% </td>
                                                                                                                                  : filteredStat === "2PT%" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("2PT%")}>2PT% </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("2PT%")}>2PT%</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FG3M" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FG3M")}>3PTM </td>
                                                                                                                                  : filteredStat === "FG3M" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FG3M")}>3PTM </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FG3M")}>3PTM</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FG3A" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FG3A")}>3PTA </td>
                                                                                                                                  : filteredStat === "FG3A" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FG3A")}>3PTA </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FG3A")}>3PTA</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FG3_PCT" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FG3_PCT")}>3PT% </td>
                                                                                                                                  : filteredStat === "FG3_PCT" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FG3_PCT")}>3PT%</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FG3_PCT")}>3PT%</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PTS" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PTS")}>PTS </td>
                                                                                                                                  : filteredStat === "PTS" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PTS")}>PTS </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PTS")}>PTS</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PLUS_MINUS" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PLUS_MINUS")}>+/-</td>
                                                                                                                                  : filteredStat === "PLUS_MINUS" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PLUS_MINUS")}>+/- </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PLUS_MINUS")}>+/-</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                              
                                                                                                                                <td className="warning ">{d["FGM"]}</td>
                                                                                                                                <td className="warning ">{d["FGA"]}</td>
                                                                                                                                <td className="warning ">{d["FG_PCT"]}</td>
                                                                                                                                <td className="warning ">{(d["FGM"]-d["FG3M"]).toFixed(3).replace(/\.?0*$/,'')}</td>
                                                                                                                                <td className="warning ">{(d["FGA"]-d["FG3A"]).toFixed(3).replace(/\.?0*$/,'')}</td>
                                                                                                                                <td className="warning ">{isNaN((d["FGM"]-d["FG3M"])/(d["FGA"]-d["FG3A"]))  ? 0: ((d["FGM"]-d["FG3M"])/(d["FGA"]-d["FG3A"])).toFixed(3).replace(/\.?0*$/,'')}</td>
                                                                                                                                <td className="warning p">{d["FG3M"]}</td>
                                                                                                                                <td className="warning ">{d["FG3A"]}</td>
                                                                                                                                <td className="warning ">{d["FG3_PCT"]}</td>  
                                                                                                                                <td className="warning ">{d["PTS"]}</td>
                                                                                                                                <td className="warning ">{d["PLUS_MINUS"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> :  
                                                                                stat === "Rebounds" && ready?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "REB" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("REB")}>REB</td>
                                                                                                                                  : filteredStat === "REB" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("REB")}>REB </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("REB")}>REB</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "OREB" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("OREB")}>OREB</td>
                                                                                                                                  : filteredStat === "OREB" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("OREB")}>OREB </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("OREB")}>OREB</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "DREB" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("DREB")}>DREB</td>
                                                                                                                                  : filteredStat === "DREB" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("DREB")}>DREB </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("DREB")}>DREB</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["REB"]}</td>
                                                                                                                                <td className="warning ">{d["OREB"]}</td>
                                                                                                                                <td className="warning ">{d["DREB"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> :  
                                                                                stat === "Assists" && ready?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "AST" && asc === true ?
                                                                                                                                  <td className="up" onClick={() =>tableSort("AST")}>AST</td>
                                                                                                                                  : filteredStat === "AST" && asc === false?
                                                                                                                                  <td className="down" onClick={() =>tableSort("AST")}>AST </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("AST")}>AST</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "STL" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("STL")}>STL</td>
                                                                                                                                  : filteredStat === "STL" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("STL")}>STL </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("STL")}>STL</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "TOV" && asc === false ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("TOV")}>TOV</td>
                                                                                                                                  : filteredStat === "TOV" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("TOV")}>TOV </td>
                                                                                                                                  :
                                                                                                                                  <td onClick={() =>tableSort("TOV")}>TOV</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PF" && asc === false ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PF")}>PF</td>
                                                                                                                                  : filteredStat === "PF" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PF")}>PF </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PF")}>PF</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PFD" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PFD")}>PFD</td>
                                                                                                                                  : filteredStat === "PFD" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PFD")}>PFD </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PFD")}>PFD</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td>
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["AST"]}</td>
                                                                                                                                <td className="warning ">{d["STL"]}</td>
                                                                                                                                <td className="warning ">{d["TOV"]}</td>
                                                                                                                                <td className="warning">{d["PF"]}</td>
                                                                                                                                <td className="warning ">{d["PFD"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> : 
                                                                                stat === "Blocks" && ready ?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "BLK" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("BLK")}>BLK</td>
                                                                                                                                  : filteredStat === "BLK" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("BLK")}>BLK </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("BLK")}>BLK</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "BLKA" && asc === false ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("BLKA")}>BLKA</td>
                                                                                                                                  : filteredStat === "BLKA" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("BLKA")}>BLKA </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("BLKA")}>BLKA</td>
                                                                                                                        }

                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["BLK"]}</td>
                                                                                                                                <td className="warning ">{d["BLKA"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> : 
                                                                                stat === "Free Throws" && ready?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "FTM" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FTM")}>FTM</td>
                                                                                                                                  : filteredStat === "FTM" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FTM")}>FTM </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FTM")}>FTM</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FTA" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FTA")}>FTA</td>
                                                                                                                                  : filteredStat === "FTA" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FTA")}>FTA </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FTA")}>FTA</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "FT_PCT" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("FT_PCT")}>FT%</td>
                                                                                                                                  : filteredStat === "FT_PCT" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("FT_PCT")}>FT% </td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("FT_PCT")}>FT%</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["FTM"]}</td>
                                                                                                                                <td className="warning">{d["FTA"]}</td>
                                                                                                                                <td className="warning ">{d["FT_PCT"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> : 
                                                                                stat === "Double Doubles" && ready ?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "DD2" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("DD2")}>Double Doubles</td>
                                                                                                                                  : filteredStat === "DD2" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("DD2")}>Double Doubles</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("DD2")}>Double Doubles</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["DD2"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> : 
                                                                                stat === "Triple Doubles" && ready ?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "TD3" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("TD3")}>Triple Doubles</td>
                                                                                                                                  : filteredStat === "TD3" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("TD3")}>Triple Doubles</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("TD3")}>Triple Doubles</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["TD3"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> : 
                                                                                stat === "Playing Time" && ready?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "GP" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("GP")}>Games</td>
                                                                                                                                  : filteredStat === "GP" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("GP")}>Games</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("GP")}>Games</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "MIN" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("MIN")}>Min</td>
                                                                                                                                  : filteredStat === "MIN" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("MIN")}>Min</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("MIN")}>Min</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "W" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("W")}>W</td>
                                                                                                                                  : filteredStat === "W" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("W")}>W</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("W")}>W</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "L" && asc === false ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("L")}>L</td>
                                                                                                                                  : filteredStat === "L" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("L")}>L</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("L")}>L</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["GP"]}</td>
                                                                                                                                <td className="warning ">{(d["MIN"]).toFixed(3)}</td>
                                                                                                                                <td className="warning">{d["W"]}</td>
                                                                                                                                <td className="warning ">{d["L"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> : 
                                                                                stat === "Steels" && ready ?
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "STL" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("STL")}>STL</td>
                                                                                                                                  : filteredStat === "STL" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("STL")}>STL</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("STL")}>STL</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "TOV" && asc === false ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("TOV")}>TOV</td>
                                                                                                                                  : filteredStat === "TOV" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("TOV")}>TOV</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("TOV")}>TOV</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PF" && asc === false ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PF")}>PF</td>
                                                                                                                                  : filteredStat === "PF" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PF")}>PF</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PF")}>PF</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "PFD" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("PFD")}>PFD</td>
                                                                                                                                  : filteredStat === "PFD" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("PFD")}>PFD</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("PFD")}>PFD</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["STL"]}</td>
                                                                                                                                <td className="warning ">{d["TOV"]}</td>
                                                                                                                                <td className="warning ">{d["PF"]}</td>
                                                                                                                                <td className="warning ">{d["PFD"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> 
                                                                                : 
                                                                                <div>
                                                                                        <Table className="table table-borderless ">
                                                                                                  <thead>
                                                                                                            <tr className="table-head">
                                                                                                                        <td className="rank"></td>
                                                                                                                        <td className="player">&nbsp; Player</td>
                                                                                                                        {filteredStat === "W" && asc === true ?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("W")}>W</td>
                                                                                                                                  : filteredStat === "W" && asc === false?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("W")}>W</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("W")}>W</td>
                                                                                                                        }
                                                                                                                        {filteredStat === "L" && asc === false?
                                                                                                                                  <td className="up clickable" onClick={() =>tableSort("L")}>L</td>
                                                                                                                                  : filteredStat === "L" && asc === true?
                                                                                                                                  <td className="down clickable" onClick={() =>tableSort("L")}>L</td>
                                                                                                                                  :
                                                                                                                                  <td className="clickable" onClick={() =>tableSort("L")}>L</td>
                                                                                                                        }
                                                                                                            </tr>
                                                                                                  </thead>
                                                                                                  <tbody>
                                                                                                            {filteredData.map((d, index) => 
                                                                                                                      <tr key={d["PLAYER_ID"]} className="player-row table-row">
                                                                                                                                 {asc === true ?
                                                                                                                                            <td className="rank warning pt-2">{index + 1}</td>
                                                                                                                                            :
                                                                                                                                            <td className="rank warning pt-2">{filteredData.length -index}</td>
                                                                                                                                  }
                                                                                                                                <td >
                                                                                                                                            <img  alt={`${d["PLAYER"]} head shot`} width="45px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${d["PLAYER_ID"]}.png`}  onError={addDefaultSrc}  />
                                                                                                                                            <Link to={`/player/${d["PLAYER_ID"]}`}  className="player-link" >
                                                                                                                                                      <span className="warning">{d["PLAYER_NAME"]}</span>
                                                                                                                                            </Link>
                                                                                                                                </td>
                                                                                                                                <td className="warning ">{d["W"]}</td>
                                                                                                                                <td className="warning ">{d["L"]}</td>
                                                                                                                      </tr>
                                                                                                            )}
                                                                                                  </tbody>
                                                                                        </Table>
                                                                                </div> 

                                                                      }
                                                                      </div>          
                                                            </div>
                                                  }
                                        </div>
                              </div>     
                    </div>
          )
}

export default PlayerLeadersPerTeam;