import React, {  useEffect } from "react";
import { useRoster } from './hooks';
import {Link} from 'react-router-dom';
import "./Roster.css";
const genericPlayer = require('../../assets/genericPlayer.png')

function Roster(team){
          const [roster, getRoster, isLoading ] = useRoster(team.team);

          useEffect(()=>{
                    getRoster();
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);

          function addDefaultSrc(evt){
                    evt.target.src= genericPlayer;
          }
          
          return(
                    
                    <div>
                             <div className="roster-header text-center mt-3">
                                        <h2>
                                                  Roster
                                        </h2>
                              </div>
                              <div className="roster-container">
                                        {isLoading &&           
                                                  <div className="loading text-center"><p>Loading...</p></div>
                                        }
                                        {!isLoading &&
                                                  <div className="player-boxes">
                                                            {roster.map(player => 
                                                                      <div key={player["PLAYER_ID"]} className="player-box">
                                                                                <div className="player-photo">
                                                                                          <img alt={`${player["PLAYER"]} head shot`} width="260px" src={`https://cdn.nba.com/headshots/nba/latest/260x190/${player["PLAYER_ID"]}.png`} onError={addDefaultSrc} />
                                                                                </div>
                                                                                <div className="info">
                                                                                          <div className="player-name">
                                                                                                    <Link to={`/player/${player["PLAYER_ID"]}`}  className="player-link" >
                                                                                                              {player['PLAYER']}
                                                                                                    </Link>
                                                                                          </div>
                                                                                          <div className="position">
                                                                                                    <span className="position-title">
                                                                                                              pos:&nbsp;
                                                                                                    </span>
                                                                                                    <span className="player-position">
                                                                                                              {player['POSITION']}
                                                                                                    </span>
                                                                                          </div>
                                                                                          <div className="number">
                                                                                                    <span className="number-title">
                                                                                                              number:&nbsp;
                                                                                                    </span>
                                                                                                    <span className="number-player">
                                                                                                              {player['NUM']}
                                                                                                    </span>
                                                                                          </div>
                                                                                          <div className="age">
                                                                                                    <span className="age-title">
                                                                                                              age:&nbsp;
                                                                                                    </span>
                                                                                                    <span className="age-player">
                                                                                                              {player['AGE']}
                                                                                                    </span>
                                                                                          </div>
                                                                                          <div className="height">
                                                                                                    <span className="height-title">
                                                                                                              height:&nbsp;
                                                                                                    </span>
                                                                                                    <span className="height-player">
                                                                                                              {player['HEIGHT']}
                                                                                                    </span>
                                                                                          </div>
                                                                                          <div className="weight">
                                                                                                    <span className="weight-title">
                                                                                                              weight:&nbsp;                                                                                                              
                                                                                                    </span>
                                                                                                    <span className="weight-player">
                                                                                                              {player['WEIGHT']}&nbsp;lb
                                                                                                    </span>
                                                                                          </div>
                                                                                </div>
                                                                      </div>
                                                            )}
                                                  </div>
                                        }
                              </div>
                    </div>
          )
}

export default Roster;