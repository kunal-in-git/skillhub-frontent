import React from 'react'

function HighlightText(props) {
  return (
    <span style={{color: props.color}}>
        {props.text}
    </span>
  )
}

export default HighlightText
