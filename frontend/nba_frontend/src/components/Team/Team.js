import React from "react";
import Calendar from "../Calendars/Calendar";
import Roster from "../Roster/Roster";
import PlayerLeadersPerTeam from "../TeamLeaders/PlayerLeadersPerTeam";
import TeamRanking from "../TeamRanking/TeamRanking";
import News from "../News/News";
import { useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import './Team.css';



function Team(){
          const team = useParams();
          const stateTeams = useSelector(state => state.teams.teams)

          

          
          return(
                    
                    <div>
                              {stateTeams && 
                                        <div>
                                                  <h2 className="header text-center mb-0 mt-1">
                                                            {`The ${stateTeams.filter(t=>t.id === parseInt(team.teamId))[0]['nickname']}`}
                                                  </h2>
                                                  <Calendar team={team.teamId} />
                                                  <Roster team = {team.teamId} />
                                                  <PlayerLeadersPerTeam team={team.teamId}/>
                                                  <TeamRanking team={team.teamId}/>
                                                  <News query={team.teamId} querytype={"team"}/>
                                        </div>
                              
                              }
                    </div>
          )
}

export default Team;