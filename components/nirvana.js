import React from "react";
import creative from './source/creative-nirvana.svg';
import marketing from './source/marketing-nirvana.svg';
import stats from './source/stats.svg';
import tech from './source/tech-nirvana.svg'
const Nirva=()=>{
    return(
        <div>
            <img src={creative} alt=""/>
            <img src={marketing} alt=""/>
            <img src={stats} alt=""/>
            <img src={tech} alt=""/>

        </div>
    )
}
export default Nirva;