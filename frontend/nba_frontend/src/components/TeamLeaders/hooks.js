import { useState } from "react"
import Api from '../api';

const useDataPerTotal = (team) => {
          const [dataPerTotal , loadDataPerTotal ] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getDataPerTotal =async() => {
                    const data= await Api.getTeamLeaderPerTotal(team);
                              loadDataPerTotal(() => data['LeagueDashPlayerStats']);
                              changeLoading(false);
                    }
           return [dataPerTotal , getDataPerTotal , isLoading];      
}
const useDataPer48 = (team) => {
          const [dataPer48 , loadDataPer48 ] = useState()

          const getDataPer48 =async() => {
                    const data= await Api.getTeamLeaderPer48(team);
                              loadDataPer48(() => data['LeagueDashPlayerStats'])
                    }
           return [dataPer48 , getDataPer48  ];      
}

const useDataPerGame = (team) => {
          const [dataPerGame , loadDataPerGame ] = useState()
          
          const getDataPerGame =async() => {
                    const data= await Api.getTeamLeaderPerGame(team);
                              loadDataPerGame(() => data['LeagueDashPlayerStats']);
                    }
           return [dataPerGame , getDataPerGame ];      
}

const useDataPer36 = (team) => {
          const [dataPer36 , loadDataPer36 ] = useState()

          const getDataPer36 =async() => {
                    const data= await Api.getTeamLeaderPer36(team);
                              loadDataPer36(() => data['LeagueDashPlayerStats']);
                    }
           return [dataPer36 , getDataPer36 ];      
}

const useDataPerMin = (team) => {
          const [dataPerMin , loadDataPerMin ] = useState()

          const getDataPerMin =async() => {
                    const data= await Api.getTeamLeaderPerMin(team);
                              loadDataPerMin(() => data['LeagueDashPlayerStats']);
                    }
           return [dataPerMin , getDataPerMin ];      
}

const useDataPerPos = (team) => {
          const [dataPerPos , loadDataPerPos ] = useState()

          const getDataPerPos =async() => {
                    const data= await Api.getTeamLeaderPerPos(team);
                              loadDataPerPos(() => data['LeagueDashPlayerStats']);
                    }
           return [dataPerPos , getDataPerPos ];      
}
export {useDataPerTotal,useDataPer48, useDataPerGame, useDataPer36, useDataPerMin, useDataPerPos };