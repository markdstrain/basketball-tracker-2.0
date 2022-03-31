import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import { library  } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBahai } from '@fortawesome/free-solid-svg-icons';
import { useData } from './hooks';
import './PlayerBio.css';
library.add(faBahai );
const genericPlayer = require('../../assets/genericPlayer.png')

function PlayerBio(player){
          const [data, getData, isLoading] = useData(player.player)
         

          //Getting Data for Player bio
          useEffect(()=>{
                    getData(player.player);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);

          function addDefaultSrc(evt){
                    evt.target.src= genericPlayer;
          }
          function doNothin(){
                    alert('coming Soon')
          }

          return(
                    <div>
                              <div className="player-bio-header text-center mt-3">
                                        <h2 className="">
                                                 Bio
                                        </h2>
                              </div>
                              <div>
                              {isLoading &&
                                                            <div className="loading text-center"><p>Loading...</p></div>
                                                  }
                                                  {!isLoading &&
                                                            <div>
                                                                      <div className='bio-container'>
                                                                                <div className='player-bio-logo'>
                                                                                          <div>
                                                                                                    <Link to={`/team/${data["TEAM_ID"]}`} className="player-bio-image">
                                                                                                              <img className="player-bio-image" alt="" src={`https://cdn.nba.com/logos/nba/${data['TEAM_ID']}/primary/L/logo.svg`}/>
                                                                                                    </Link>
                                                                                          </div>

                                                                                </div>
                                                                                <div className='player-bio-pic'>
                                                                                          <img className='player-bio-pic-img' alt={`${data["PERSON_ID"]} head shot`}  src={`https://cdn.nba.com/headshots/nba/latest/260x190/${data["PERSON_ID"]}.png`} onError={addDefaultSrc} />
                                                                                </div>
                                                                                <div className='player-bio-stats'>
                                                                                          <div className='player-bio-stats-box-1'>
                                                                                                    {`${data['TEAM_CITY']} ${data["TEAM_NAME"]} / #${data["JERSEY"]} / ${data["POSITION"]}`}
                                                                                          </div>    
                                                                                          <div>
                                                                                                    <h1 className='player-bio-first-name'>
                                                                                                              {data["FIRST_NAME"]}
                                                                                                    </h1>
                                                                                          </div>
                                                                                                    <h1 className='player-bio-last-name '>
                                                                                                              {data["LAST_NAME"]}
                                                                                                    </h1>
                                                                                          <div>

                                                                                          </div>
                                                                                </div>
                                                                                <div className='player-bio-buttons'>
                                                                                          <nav className='fav-button'
                                                                                                    onClick={()=> doNothin()}>
                                                                                                    <ul>
                                                                                                              <li className='fav-button'>
                                                                                                                        <FontAwesomeIcon  className="start" icon="fa-solid fa-bahai"/>
                                                                                                                         Favorite
                                                                                                              </li>
                                                                                                    </ul>
                                                                                          </nav>
                                                                                          <nav className='fav-button'
                                                                                                    onClick={()=> doNothin()}>
                                                                                                    <ul>
                                                                                                              <li className='fav-button'>
                                                                                                                        Compare 
                                                                                                              </li>
                                                                                                    </ul>
                                                                                          </nav>
                                                                                </div>
                                                                      </div>
                                                                      <div className='bio-container-footer'>
                                                                      </div>
                                                            </div>
                                                  }
                              </div>              
                    </div>
          )
}

export default PlayerBio