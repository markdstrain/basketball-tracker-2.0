import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://127.0.0.1:5000';
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
}

export default Api;