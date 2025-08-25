import React from 'react'
import Logo1 from "../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../assets/TimeLineLogo/Logo4.svg"

function Leftgirlpart() {
    const data = [{
            url : Logo1,
            firstline: "Leadership",
            lastline: "Fully committed to the success company" 
        },
        {
            url : Logo2,
            firstline: "Responsibility",
            lastline: "Students will always be our top priority" 
        },
        {
            url : Logo3,
            firstline: "Flexibility",
            lastline: "The ability to switch is an important skills" 
        },  
        {
            url : Logo4,
            firstline: "Solve the problem",
            lastline: "Code your way to a solution" 
        }
    ]
    return (
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column', gap:'3em'}}>
            {
                data.map( (data, index)=>
                    <div key={index} style={{display:'flex', alignItems:'center',gap:'10%'}}>
                        <div style={{padding:'2%', 'borderRadius':'50%', 'backgroundColor':'rgb(220,255,255)'}}>
                            <img src={data.url} alt='logo' style={{width:'1.5em', height:'1.5em'}}></img></div>
                        <div>
                            <div><b>{data.firstline}</b></div>
                            <div>{data.lastline}</div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Leftgirlpart
