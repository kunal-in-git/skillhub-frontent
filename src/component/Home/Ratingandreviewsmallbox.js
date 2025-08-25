import React from 'react'

function Ratingandreviewsmallbox({ image, firstname, lastname, email, review }) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            padding: '1.5rem',
            gap: '1rem',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto',
            fontFamily: 'sans-serif',
            height:'250px',
            marginBottom:'10%'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                    src={image}
                    alt='user'
                    style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: '2px solid #ddd'
                    }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontWeight: '600', fontSize: '1rem', color: '#1f2937' }}>
                        {firstname} {lastname}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                        {email}
                    </div>
                </div>
            </div>

            <div style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#374151',
                borderTop: '1px solid #e5e7eb',
                paddingTop: '1rem',
                fontStyle: 'italic'
            }}>
                {review}
            </div>
        </div>

    )
}

export default Ratingandreviewsmallbox
