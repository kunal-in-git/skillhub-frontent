import React from 'react';

function Smallbox({ image, description, name, price }) {
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
      margin:"0 2% 0 2%"
    }}>
      <img src={image} alt="Course Thumbnail" style={{ width: "350px", height: '200px' }} />
      <div style={{ color: 'white', fontSize: '16px', fontWeight: 'bold', marginTop: '10px' }}>{name}</div>
      <div style={{ color: 'gray', fontSize: '14px', marginTop: '5px' }}>{description}</div>
      <div style={{ color: 'rgba(255, 255, 255, 0.58)', fontSize: '18px', fontWeight: 'bold', marginTop: '5px' }}>{price}</div>
    </div>
  );
}

export default Smallbox;
