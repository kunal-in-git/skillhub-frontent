import React from 'react'

function SmallColorBox(props) {
  return (
    <div style={{display:'flex', background:`${props.color}`, flexDirection:'column', width:'25%'}}>
        <div style={{color:'rgb(241,242, 255)', fontSize:'18px', margin:'10%'}}>
            {props.heading}
        </div>
        <div style={{color:'rgba(131, 136, 148, 1)', margin:'5% 10% 15% 10%'}}> 
            {props.content}
        </div>
    </div>
  )
}

export default SmallColorBox
