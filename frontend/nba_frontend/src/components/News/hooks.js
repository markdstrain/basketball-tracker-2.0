import { useState } from "react";
import Api from '../api';


const useData = (query) => {
         
          const [data , loadData ] = useState()
          const [isLoading,changeLoading] = useState(true)

          const getData =async() => {
                    const result= await Api.getNews(query);
                              loadData(() => result);
                              changeLoading(false);
                    }
           return [data , getData , isLoading];      
}

export{useData}