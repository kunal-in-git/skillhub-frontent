import React from 'react'

function NumberHeading( props ) {
  return (
    <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <div style={{color:'white', fontSize:'30px', marginBottom:'1.5%'}}>
        {props.number}
      </div>
      <div style={{color:'rgb(88,93,105)'}}>
        {props.heading}
      </div>
    </div>
  )
}

export default NumberHeading
