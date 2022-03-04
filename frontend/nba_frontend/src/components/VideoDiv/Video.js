import React from "react";

function Video(source){

          return(
                    <video className='app-page-video'
                                 autoPlay
                                 loop 
                                 muted
                                 style={{
                                           position: "absolute",
                                           width: "100%",
                                           left: "50%",
                                           top: "50%",
                                           height: "100%",
                                           objectFit: "cover",
                                           transform: "translate(-50%, -50%)",
                                           zIndex: "-1",
                                           overflow:'hidden'
                                 }}>
                              <source src={`${source.source}`} />
                    </video>  
          )
}                         
                              
export default Video;
                              
                              
                              