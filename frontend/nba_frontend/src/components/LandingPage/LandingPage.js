import React from "react";
import Calendar from "../Calendars/Calendar";
import Video from "../Video/Video.js";



function LandingPage(){
          
          return(
                    
                    <div>
                              <Video source={'../static/basketball.mp4'}/>
                              <Calendar team={"all"} />
                    </div>
          )
}

export default LandingPage;