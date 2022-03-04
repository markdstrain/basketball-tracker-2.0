import React, { useState, useEffect } from "react";
import moment from "moment";
import { useData, useFilteredData } from './hooks'
import { library  } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import "./Calendar.css";
library.add(faCaretLeft, faCaretRight);

function Calendar(team){
          const value = moment();
          const startDay = value.clone().startOf("day");
          const [date, setDate] = useState(startDay);
          const [ data, getData, isLoading ] = useData(team);
          const[ filteredData, getFilteredData ] = useFilteredData(data, date.format("YYYYMMDD"))

//populate or page with data and filtered data
          useEffect(()=>{
                    getData();
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
          
          useEffect(()=>{
                    if(data){
                             getFilteredData(data, date);
                    }
                    // eslint-disable-next-line react-hooks/exhaustive-deps
          },[data, date])
          
//functions to move the date up or down 
          function minusDay(){
                    setDate(date.clone().subtract(1, "day"))
          }
          function addDay(){
                    setDate(date.clone().add(1, "day"))
          }
          function dateFormat(startTime){
                    const newTime = startTime.slice(0, -1);
                    const estTime = moment(newTime).format("LT").concat(" EST");
                    return estTime 
          }
          return(
                    <div>
                              <div className="schedule-header text-center mt-3">
                                        <h2>
                                                  Schedule
                                        </h2>
                              </div>
{/* Section Controls the Date Picker.  Arrows to move the date Backwards and Forwards Date Formatted with Moment.js*/}
                              <div className="mt-3 text-center calendar-container">
                                        <div className="date-container">
                                                  <div className="date-controls">
                                                            <button className="calendar-button controls" onClick={minusDay}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-left"/>
                                                            </button>
                                                            <div className="controls date">
                                                                      <h5>{date.format("dddd MMMM Do")}</h5> 
                                                            </div>
                                                            <button className="calendar-button controls" onClick={addDay}>
                                                                      <FontAwesomeIcon  className="arrow" icon="fa-solid fa-caret-right"/>
                                                            </button>
                                                  </div>
                                        </div>
{/*See if we got our data from the backend and if not shows the user that it's loading or goes to section to organize our data */}
                                        <div className="games-container">
                                                  {isLoading &&           
                                                            <div className="loading"><p>Loading...</p></div>
                                                  }
                                                  {!isLoading &&
 /** section is where most of the magic happens we call on our schedule and organize it in this container */
                                                            <div className="game-container">
{/**here we see if there are any games for the day if not post No Games Scheduled else we move on */}
                                                                      {filteredData.length ===0 ? 
                                                                                <div>
                                                                                          <h2 className="warning">
                                                                                                    No Games Scheduled On This Day
                                                                                          </h2>
                                                                                </div> 
                                                                                :
/**map over the games that have been filtered for the date */
                                                                                filteredData.map(games => 
/**This will me our mapped boxes containing Team Logo Nickname Score or Scheduled Play Time */                      
                                                                                          <div key={games['gameId']} id={games['gameid']} className="game-div">
 {/**First Team Box Will Contain the Visiting Teams Info  */}                                                                                    
                                                                                                    <div className="team-box"> 
                                                                                                              <span> 
                                                                                                                         {/**Visiting Team Logo */}
                                                                                                                        <img className="logo" alt="" src={`https://cdn.nba.com/logos/nba/${games['awayTeam']['teamId']}/primary/L/logo.svg`}/>
                                                                                                                        {/**Getting Teams Nicname from Redux Store */}
                                                                                                                        
                                                                                                                                  <span className="team-name"  key={games['awayTeam']["teamId"]} >
                                                                                                                                            {/**see if visiting Team won if so we put gold else white */}
                                                                                                                                            {parseInt(games['awayTeam']["score"])> parseInt(games['homeTeam']["score"]) ?
                                                                                                                                                      <span className="winner">
                                                                                                                                                                {games['awayTeam']['teamName']}
                                                                                                                                                      </span>
                                                                                                                                            :
                                                                                                                                                      <span className="loser">
                                                                                                                                                                {games['awayTeam']["teamName"]}
                                                                                                                                                      </span>
                                                                                                                                            }
                                                                                                                                  </span>          
                                                                                                                        
                                                                                                              </span>
                                                                                                              {/** Visiting Team Score*/}
                                                                                                              <span className="team-score">
{/**see if there is a score if not set upcoming Time */}
                                                                                                              {games['awayTeam']["score"] === 0? 
                                                                                                                        <span className="winner start-time ">{dateFormat(games['gameTimeEst'])}</span> :
                                                                                                                                  /**See If visitng Team won if so put in gold else white */
                                                                                                                                  (parseInt(games['awayTeam']["score"]) > parseInt(games['homeTeam']["score"]))? 
                                                                                                                                            <span className="winner">{games['awayTeam']["score"]}</span> :
                                                                                                                                            <span className="loser">{games['awayTeam']["score"]}</span> 
                                                                                                              }
                                                                                                              </span>
                                                                                                    </div>
{/**Second Team Box Will Contain the Home Teams Info */}                                                                                          
                                                                                          <div className="team-box">
                                                                                                    <span>
                                                                                                              {/**Home Team Logo */}
                                                                                                              <img className="logo" alt="" src={`https://cdn.nba.com/logos/nba/${games['homeTeam']["teamId"]}/primary/L/logo.svg`}/>
                                                                                                              {/**Getting Home Team Nickname from Redux Store */}
                                                                                                              
                                                                                                                        <span className="team-name"  key={games['homeTeam']["teamId"]} >
                                                                                                                                  {/**See if Home team One if so set Name to Gold else white */}
                                                                                                                                  {parseInt(games['homeTeam']["score"])> parseInt(games['awayTeam']["score"]) ?
                                                                                                                                            <span className="winner">
                                                                                                                                                      {games['homeTeam']["teamName"]}
                                                                                                                                            </span>
                                                                                                                                  :
                                                                                                                                            <span className="loser">
                                                                                                                                                      {games['homeTeam']["teamName"]}
                                                                                                                                            </span>
                                                                                                                                  }
                                                                                                                        </span>          
                                                                                                              
                                                                                                    </span>
                                                                                                    <span className="team-score">
{/**see if there is a score if not set upcoming Time */}
                                                                                                              {games['homeTeam']["score"] === 0? 
                                                                                                                                  <span></span> 
                                                                                                                                  :
                                                                                                                                  /**See If visitng Team won if so put in gold else white */
                                                                                                                                  (parseInt(games['homeTeam']["score"]) > parseInt(games['awayTeam']["score"]))? 
                                                                                                                                            <span className="winner">{games['homeTeam']["score"]}</span> :
                                                                                                                                            <span className="loser">{games['homeTeam']["score"]}</span> 
                                                                                                              }
                                                                                                              </span>
                                                                                          </div> 
                                                                                </div>          
                                                                                )
                                                                      }         
                                                            </div>
                                                  }
                                        </div>
                              </div>
                    </div>
          )
}

export default Calendar;