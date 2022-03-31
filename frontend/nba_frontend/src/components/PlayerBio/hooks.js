import { useState } from "react"
import Api from '../api';

const useData = (player) => {
          const [data , loadData ] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getData=async() => {
                    const data= await Api.getPlayerBio(player);
                              loadData(() => data[0]);
                              changeLoading(false);
                    }
           return [data, getData, isLoading];      
}

export { useData }