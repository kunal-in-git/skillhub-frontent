import React from 'react'

function BigBox({ image, description, name, price }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.04)', // Make it stand out
            borderRadius: '10px',
            padding: '10px',
            boxShadow: '0px 0px 10px rgba(2, 0, 0, 0.29)',
        }}>
            <img src={image} alt="Course Thumbnail" style={{ width: "450px", height: '250px' }} />
            <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>{name}</div>
            <div style={{ color: 'gray', fontSize: '14px', marginTop: '5px' }}>{description}</div>
            <div style={{ color: 'rgba(255, 255, 255, 0.58)', fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>{price}</div>
        </div>
    )
}

export default BigBox
