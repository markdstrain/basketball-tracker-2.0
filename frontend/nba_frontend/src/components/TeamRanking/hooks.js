import { useState } from "react"
import Api from '../api';

const useDataPerTotal = (team) => {
          const [dataPerTotal , loadDataPerTotal ] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getDataPerTotal =async() => {
                    const data= await Api.getTeamsPerTotal();
                    const nextTier = data['LeagueDashTeamStats']
                    const teamStats = nextTier.filter(d=>d["TEAM_ID"] === parseInt(team))
                              loadDataPerTotal(() => teamStats);
                              changeLoading(false);
                    }
           return [dataPerTotal , getDataPerTotal , isLoading];      
}
const useDataPer48 = (team) => {
          const [dataPer48 , loadDataPer48 ] = useState()

          const getDataPer48 =async() => {
                    const data= await Api.getTeamsPer48();
                    const nextTier = data['LeagueDashTeamStats']
                    const teamStats = nextTier.filter(d=>d["TEAM_ID"] === parseInt(team))
                              loadDataPer48(() => teamStats)
                    }
           return [dataPer48 , getDataPer48  ];      
}

const useDataPerGame = (team) => {
          const [dataPerGame , loadDataPerGame ] = useState()
          
          const getDataPerGame =async() => {
                    const data= await Api.getTeamsPerGame();
                    const nextTier = data['LeagueDashTeamStats']
                    const teamStats = nextTier.filter(d=>d["TEAM_ID"] === parseInt(team))
                              loadDataPerGame(() =>teamStats);
                    }
           return [dataPerGame , getDataPerGame ];      
}

const useDataPer36 = (team) => {
          const [dataPer36 , loadDataPer36 ] = useState()

          const getDataPer36 =async() => {
                    const data= await Api.getTeamsPer36();
                    const nextTier = data['LeagueDashTeamStats']
                    const teamStats = nextTier.filter(d=>d["TEAM_ID"] === parseInt(team))
                              loadDataPer36(() => teamStats);
                    }
           return [dataPer36 , getDataPer36 ];      
}

const useDataPerMin = (team) => {
          const [dataPerMin , loadDataPerMin ] = useState()

          const getDataPerMin =async() => {
                    const data= await Api.getTeamsPerMin();
                    const nextTier = data['LeagueDashTeamStats']
                    const teamStats = nextTier.filter(d=>d["TEAM_ID"] === parseInt(team))
                              loadDataPerMin(() => teamStats);
                    }
           return [dataPerMin , getDataPerMin ];      
}

const useDataPerPos = (team) => {
          const [dataPerPos , loadDataPerPos ] = useState()

          const getDataPerPos =async() => {
                    const data= await Api.getTeamsPerPos();
                    const nextTier = data['LeagueDashTeamStats']
                    const teamStats = nextTier.filter(d=>d["TEAM_ID"] === parseInt(team))
                              loadDataPerPos(() => teamStats);
                    }
           return [dataPerPos , getDataPerPos ];      
}
export {useDataPerTotal,useDataPer48, useDataPerGame, useDataPer36, useDataPerMin, useDataPerPos };