import React, {useState, useEffect } from "react";
import { useStandings, useConference } from './hooks';
import { library  } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'react-bootstrap';
import Video from "../VideoDiv/Video";
import './Standings.css';
library.add(faCaretLeft, faCaretRight);


function Standings(){
          const [standings, getStandings, isLoading ] = useStandings();
          const [conference, setConference] = useState(true);
          const[conf, getConf] = useConference(standings, conference);


          useEffect(()=>{
                    getStandings();
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[]);
          
          useEffect(()=>{
                    if(standings){
                            getConf(standings, conference);
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[standings, conference])

          function changeConference(){
                    if(conference === true){
                              setConference(false)
                    }else{
                              setConference(true)
                    }
          }

          return(
                    <div className="schedule">
                              <Video source={'../static/basketball.mp4'} />
                              <div className="schedule-header text-center mt-3">
                                        <h2>
                                                  Standings
                                        </h2>
                              </div>
                              <div className="standings-container">
                                        <div className="conference-selector-container">
                                                  <div className="conference-controls">
                                                            <button className="calendar-button controls" onClick={changeConference}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-left"/>
                                                            </button>
                                                            <div className="controls conference warning text-center pt-2">
                                                                      {conference === true ?
                                                                                <h4>
                                                                                          Eastern
                                                                                </h4>
                                                                                : 
                                                                                <h4>
                                                                                          Western
                                                                                </h4> 
                                                                      } 
                                                                     
                                                            </div>
                                                            <button className="calendar-button controls" onClick={changeConference}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-right"/>
                                                            </button>
                                                  </div>
                                        </div>
                                        <div>
                                                  {isLoading &&
                                                            <div className="loading text-center"><p>Loading...</p></div>
                                                  }
                                                  {!isLoading && conference === true &&
                                                            <Table className="table-borderless ">
                                                                      <thead>
                                                                                <tr className="middle">
                                                                                          <td></td>
                                                                                          <td className="team">&nbsp; Team</td>
                                                                                          <td className="text-center" >W</td>
                                                                                          <td className="text-center" >L</td>
                                                                                          <td className="text-center" >Pct</td>
                                                                                          <td className="text-center" >GB</td>
                                                                                          <td className="text-center" >Conf</td>
                                                                                          <td className="text-center" >Home</td>
                                                                                          <td className="text-center" >Away</td>
                                                                                          <td className="text-center" >L10</td>
                                                                                          <td className="text-center" >Strk</td>
                                                                                </tr>
                                                                      </thead>
                                                                      <tbody>
                                                                                {conf.map(s=>                                                          
                                                                                          <tr key={s["TeamID"]} className={s["PlayoffRank"]<7 ? "top table-row" : s["PlayoffRank"]<11 ? "middle table-row" : "bottom table-row" }>
                                                                                                    <td className="table-cell pt-2">{s["PlayoffRank"]}</td>
                                                                                                    <td className="table-cell">
                                                                                                    <img className="standings-logo" alt="" src={`https://cdn.nba.com/logos/nba/${s['TeamID']}/primary/L/logo.svg`}/>
                                                                                                    {s['TeamName']}
                                                                                                    </td>
                                                                                                    <td className="text-center table-cell">{s['WINS']}</td>
                                                                                                    <td className="text-center table-cell">{s['LOSSES']}</td>
                                                                                                    <td className="text-center table-cell">{s['WinPCT']}</td>
                                                                                                    <td className="text-center table-cell">{s["ConferenceGamesBack"]}</td>
                                                                                                    <td className="text-center table-cell">{s["ConferenceRecord"]}</td>
                                                                                                    <td className="text-center table-cell">{s["HOME"]}</td>
                                                                                                    <td className="text-center table-cell">{s["ROAD"]}</td>
                                                                                                    <td className="text-center table-cell">{s['L10']}</td>
                                                                                                    <td className="text-center table-cell">{s['strCurrentStreak']}</td>
                                                                                          </tr>                                                                                                    
                                                                                )} 
                                                                      </tbody>
                                                            </Table>
                                                  }
                                                   {!isLoading && conference === false &&
                                                            <Table className="table-borderless">
                                                                      <thead>
                                                                                <tr className="middle">
                                                                                          <td></td>
                                                                                          <td className="team">&nbsp; Team</td>
                                                                                          <td className="text-center" >W</td>
                                                                                          <td className="text-center" >L</td>
                                                                                          <td className="text-center" >Pct</td>
                                                                                          <td className="text-center" >GB</td>
                                                                                          <td className="text-center conf" >Conf</td>
                                                                                          <td className="text-center" >Home</td>
                                                                                          <td className="text-center" >Away</td>
                                                                                          <td className="text-center" >L10</td>
                                                                                          <td className="text-center" >Strk</td>
                                                                                </tr>
                                                                      </thead>
                                                                      <tbody>
                                                                                {conf.map(s=>                                                          
                                                                                          <tr key={s["TeamID"]} className={s["PlayoffRank"]<7 ? "top table-row" : s["PlayoffRank"]<11 ? "middle table-row" : "bottom table-row" }>
                                                                                                    <td className="table-cell pt-2">{s["PlayoffRank"]}</td>
                                                                                                    <td className="table-cell">
                                                                                                    <img className="standings-logo" alt="" src={`https://cdn.nba.com/logos/nba/${s['TeamID']}/primary/L/logo.svg`}/>
                                                                                                    {s['TeamName']}
                                                                                                    </td>
                                                                                                    <td className="text-center table-cell pt-2">{s['WINS']}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s['LOSSES']}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s['WinPCT']}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s["ConferenceGamesBack"]}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s["ConferenceRecord"]}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s["HOME"]}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s["ROAD"]}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s['L10']}</td>
                                                                                                    <td className="text-center table-cell pt-2">{s['strCurrentStreak']}</td>
                                                                                          </tr>                                                                                                    
                                                                                )} 
                                                                      </tbody>
                                                            </Table>
                                                  }
                                        </div> 
                              </div>
                              
                    </div>
          )
}








export default Standings;