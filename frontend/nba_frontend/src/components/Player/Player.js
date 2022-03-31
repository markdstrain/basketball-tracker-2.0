import React from "react";
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import PlayerBio from "../PlayerBio/PlayerBio";
import News from "../News/News";
import './Player.css'


function Player(){
          const player = useParams();
          const statePlayers = useSelector(state => state.players.payload)

          return(
                    <div>
                              {statePlayers &&
                                        <div>
                                                  <h2 className="header text-center mb-0 mt-1">
                                                            {statePlayers.filter(p=>p.id === parseInt(player.playerId))[0]["full_name"]}
                                                  </h2>
                                                  <PlayerBio player={player.playerId} />
                                                  <News query={player.playerId} querytype={"player"} />
                                        </div>
                              }
                    </div>
          )
}
export default Player;