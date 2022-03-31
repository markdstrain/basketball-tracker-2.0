import React, {useState, useEffect} from "react";
import { useDataPerTotal, useDataPer48, useDataPerGame, useDataPer36, useDataPerMin, useDataPerPos } from './hooks';
import { library  } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import "./TeamRanking.css";
library.add(faCaretLeft, faCaretRight);

function TeamRanking(team){
          const [dataPerTotal, getDataPerTotal, isLoading] = useDataPerTotal(team.team)
          const [ dataPer48, getDataPer48 ] = useDataPer48(team.team);
          const [ dataPerGame, getDataPerGame ] = useDataPerGame(team.team);
          const [ dataPer36, getDataPer36 ] = useDataPer36(team.team);
          const [ dataPerMin, getDataPerMin ] = useDataPerMin(team.team);
          const [ dataPerPos, getDataPerPos ] = useDataPerPos(team.team);
          const [ data, setData ] = useState();
          const perArray =['Season', 'Per 48 Minutes', 'Per Game', 'Per 36 Minutes', 'Per Minute', 'Per Possession']
          const [ per, setPer ] = useState(perArray[0]);

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
//Setting Initial Data To Total
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
         
          return(
                    <div>
                              <div className="team-ranking-header text-center mt-3">
                                        <h2 className="">
                                                 Team's Rankings
                                        </h2>
                              </div> 
                              <div className= "team-leaders-container" >
                                        <div className="stat-container">
                                                  <div className="per-controls">
                                                            <button className="stat-button controls" onClick={minusPer}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-left"/>
                                                            </button>
                                                            <div className="controls stat text-center">
                                                                      {data &&

                                                                      <h5>{per}</h5> 
                                                                      }   
                                                            </div>
                                                            <button className="stat-button controls" onClick={addPer}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-right"/>
                                                            </button>
                                                  </div>
                                        </div>
                                        <div>
                                                  {isLoading &&          
                                                            <div className="loading text-center"><p>Loading...</p></div>
                                                  }
                                                  {!isLoading && data &&
                                                            <div className="ranking-table-container">
                                                                      <Table className="table table-borderless container-fluid">
                                                                                <thead>
                                                                                          <tr className="ranking-table-head">
                                                                                                    <td className="rank-stat text-center td">Statistic</td>
                                                                                                    <td className="amount text-center td">Amount</td>
                                                                                                    <td className="rank text-center td">Rank</td>
                                                                                          </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Points</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PTS"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PTS_RANK"] }</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Field Goals Made</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FGM"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FGM_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Field Goals Attempted</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FGA"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FGA_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Field Goal %</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG_PCT"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG_PCT_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">3 Pointers Made</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG3M"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG3M_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">3 Pointers Attempted</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG3A"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG3A_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">3 Point %</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG3_PCT"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FG3_PCT_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Rebounds</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["REB"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["REB_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head  table-row">
                                                                                                    <td className="rank-points text-center body-td">Defensive Rebounds</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["DREB"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["DREB_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Offensive Rebounds</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["OREB"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["OREB_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Assists</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["AST"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["AST_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Steels</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["STL"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["STL_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head  table-row">
                                                                                                    <td className="rank-points text-center body-td">Blocks</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["BLK"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["BLK_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Blocks Against</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["BLKA"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["BLKA_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Turn Overs</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["TOV"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["TOV_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Free Throw Made</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FTM"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FTM_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Free Throw Attempted</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FTA"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FTA_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Free Throw %</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FT_PCT"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["FT_PCT_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Personal Fouls</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PF"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PF_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Personal Fouls Drawn</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PFD"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PFD_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Games Played</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["GP"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["GP_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Minutes Played</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["MIN"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["MIN_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Wins</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["W"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["W_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Win %</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["W_PCT"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["W_PCT_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head  table-row">
                                                                                                    <td className="rank-points text-center body-td">Losses</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["L"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["L_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head table-row">
                                                                                                    <td className="rank-points text-center body-td">Plus Minus</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PLUS_MINUS"]}</td>
                                                                                                    <td className="rank-points text-center body-td">{data[0]["PLUS_MINUS_RANK"]}</td>
                                                                                          </tr>
                                                                                          <tr className="ranking-table-head">
                                                                                                    <td></td>
                                                                                                    <td></td>
                                                                                                    <td></td>
                                                                                          </tr>

                                                                                </tbody>
                                                                      </Table>
                                                            </div>
                                                  
                                                  }
                                        </div>
                              </div>
                    </div>
          )
}
export default TeamRanking;