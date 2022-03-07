import { useState } from "react";
import Api from "../api";

const useRoster = (team) => {
          const [roster , loadRoster] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getRoster =async() => {
                   console.log(team)
                    const roster= await Api.getRoster(team);
                    
                    loadRoster(() => roster["CommonTeamRoster"]);
                    changeLoading(false);
                    }

           return [roster , getRoster , isLoading];
          
}

export { useRoster };