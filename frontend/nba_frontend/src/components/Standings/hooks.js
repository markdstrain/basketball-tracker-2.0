import { useState } from "react";
import Api from "../api";

const useStandings = () => {
          const [standings , loadStandings] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getStandings =async() => {
                    const standings= await Api.getStandings();
                    
                    loadStandings(() => standings);
                    changeLoading(false);
                    }

           return [standings , getStandings , isLoading];
          
}

const useConference=(standings, conference) =>{
          const[conf, setConf] = useState()
          function getConf(){
                    if(conference === true){
                              setConf(standings["Eastern"])
                    }else{
                              setConf(standings['Western'])
                    }
           }
           return[conf, getConf]
          
}

export {useStandings, useConference};