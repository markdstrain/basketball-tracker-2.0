import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:5000';
const CURRENT_SEASON = "2021-22"
class Api {
          static async getSchedule(){
                    const results = await axios.get(`${BASE_URL}/schedule`)
                    const schedule = results.data
                    return schedule
          }
          static async getStandings(){
                    const results = await axios.get(`${BASE_URL}/standings/all`);
                    const standings = results.data;

                    return standings
                    
          }
          static async getRoster(team){
                    const results = await axios.get(`${BASE_URL}/roster/${team}`);
                    const roster = results.data;

                    return roster
          }
          static async getTeamLeaderPer48(team){
                    const results = await axios.get(`${BASE_URL}/playerleaders/${CURRENT_SEASON}/Per48/${team}`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamLeaderPerGame(team){
                    const results = await axios.get(`${BASE_URL}/playerleaders/${CURRENT_SEASON}/PerGame/${team}`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamLeaderPer36(team){
                    const results = await axios.get(`${BASE_URL}/playerleaders/${CURRENT_SEASON}/Per36/${team}`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamLeaderPerMin(team){
                    const results = await axios.get(`${BASE_URL}/playerleaders/${CURRENT_SEASON}/PerMinute/${team}`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamLeaderPerPos(team){
                    const results = await axios.get(`${BASE_URL}/playerleaders/${CURRENT_SEASON}/PerPossession/${team}`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamLeaderPerTotal(team){
                    const results = await axios.get(`${BASE_URL}/playerleaders/${CURRENT_SEASON}/Totals/${team}`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamsPer48(){
                    const results = await axios.get(`${BASE_URL}/teamleaders/${CURRENT_SEASON}/Per48`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamsPerGame(){
                    const results = await axios.get(`${BASE_URL}/teamleaders/${CURRENT_SEASON}/PerGame`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamsPer36(){
                    const results = await axios.get(`${BASE_URL}/teamleaders/${CURRENT_SEASON}/Per36`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamsPerMin(){
                    const results = await axios.get(`${BASE_URL}/teamleaders/${CURRENT_SEASON}/PerMinute`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamsPerPos(){
                    const results = await axios.get(`${BASE_URL}/teamleaders/${CURRENT_SEASON}/PerPossession`);
                    const leaders = results.data;

                    return leaders
          }
          static async getTeamsPerTotal(){
                    const results = await axios.get(`${BASE_URL}/teamleaders/${CURRENT_SEASON}/Totals`);
                    const leaders = results.data;

                    return leaders
          }
          static async getNews(query){
                    const results = await axios.get(`${BASE_URL}/news/${query}`);
                    const news = results.data;

                    return news
          }
          static async getPlayerBio(player){
                    const results = await axios.get(`${BASE_URL}/players/bio/${player}`)
                    const bio = results.data;

                    return bio
          }
}

export default Api;
