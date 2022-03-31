import React,{ useEffect }from "react";
import { useSelector } from "react-redux";
import { useData } from "./hooks";
import './News.css'

function News(query){
          const teams = useSelector(state => state.teams.teams)
          const players = useSelector(state => state.players.payload)
          const newsQuery = query.querytype === "team" ?
                    teams.filter(d=>d.id === parseInt(query.query))[0]["full_name"]
                    : query.querytype === "player" ?
                              players.filter(d=>d.id === parseInt(query.query))[0]["full_name"]
                    : "NBA"
          const [data, getData, isLoading] = useData(newsQuery)
          
          //getting News Article for 
          useEffect(()=>{
                    getData(newsQuery);
                    // eslint-disable-next-line react-hooks/exhaustive-deps
                },[]);
          
          return(
                    <div className="news-container">
                              <div className="news-header text-center mt-3">
                                        <h2 className="">
                                                 News
                                        </h2>
                              </div>
                              <div>
                              {isLoading &&
                                                            <div className="loading text-center"><p>Loading...</p></div>
                                                  }
                                                  {!isLoading && 
                                                            <div className="article-container mt-5">
                                                                      {data.map(d=>
                                                                                <div className="news-card" key={d["id"]}> 
                                                                                          <div>
                                                                                                    <a href={d["link"]} target="_blank" rel="noopener noreferrer">
                                                                                                              <h3 className="text-center article-title">
                                                                                                                        {d['title'].length > 24 ? `${d['title'].substring(0,24)}...`: d['title'] }
                                                                                                              </h3>
                                                                                                    </a>          
                                                                                          </div>
                                                                                          <div className="article-body">
                                                                                                    <h5 className="text-center article-script">
                                                                                                              {d["title"].slice(0, d["title"].lastIndexOf('-'))}
                                                                                                    </h5>
                                                                                          </div>
                                                                                          <div className="source-container">
                                                                                                    <a href={d["source"]["href"]} target="_blank"  rel="noopener noreferrer" >
                                                                                                              <span className="publisher">
                                                                                                                        {d["source"]['title']}
                                                                                                              </span>
                                                                                                    </a>
                                                                                                    <span className="article-date">
                                                                                                              {`${d['published_parsed']['1']}/${d['published_parsed']['2']}/${d['published_parsed']['0']}`}
                                                                                                    </span>
                                                                                          </div>
                                                                                </div>
                                                                      )}
                                                            </div>
                                                  }     
                              </div> 
                    </div>
          )
}
export default News;

