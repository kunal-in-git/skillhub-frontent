import React, { useEffect, useState } from 'react'
import { apiConnector } from '../../services/apiconnector';
import { profile } from '../../services/apis';

function Profile() {

    const [profiledata, setprofiledata] = useState();
    const [image, setimage] = useState(() => localStorage.getItem("image"));

    const [logindata, setlogindata] = useState(() => {
        try {
            const stored = localStorage.getItem('logindata');
            return stored ? JSON.parse(stored) : null;
        } catch (error) {
            console.error("Error parsing logindata from localStorage:", error);
            return null;
        }
    });



    useEffect(() => {
        const fetchdata = async () => {
            try {
                const token = logindata.token;
                const profdata = await apiConnector(
                    "GET",
                    `${profile.GETPROFILEDATA_API}?id=${logindata._id}`,
                    null,
                    {
                        Authorization: `Bearer ${token}`,
                    }
                );
                setprofiledata(profdata.data.data);
            } catch (error) {
                console.log("Unable to get profile data:", error.message);
            }
        };
        fetchdata();
    }, []);

    console.log("this is is data form ")
    const containerStyle = {
        display: 'flex',
        justifyContent: 'flex-start',
        background: '#2c333f',
        width: '85%',
        paddingBottom: '5%',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    };

    const sectionStyle = {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '4%',
    };

    const headingStyle = {
        fontSize: '36px',
        color: 'white',
        marginLeft: '20%',
        fontWeight: '500',
        marginBottom: '1%',
    };

    const cardStyle = {
        display: 'flex',
        color: 'white',
        backgroundColor: 'rgb(0, 8, 20)',
        width: '60%',
        marginLeft: '20%',
        marginTop: '1%',
        padding: '2%',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    };

    const aboutStyle = {
        ...cardStyle,
        flexDirection: 'column',
    };

    const detailCardStyle = {
        ...aboutStyle,
        marginBottom: '5%',
    };

    const infoBlock = {
        display: 'flex',
        alignItems: 'center',
        gap: '40%',
        marginTop: '2%',
    };

    const labelStyle = {
        fontSize: '16px',
        color: '#b0b3c0',
        marginBottom: '5px',
    };

    const valueStyle = {
        fontWeight: '500',
        fontSize: '14px',
        marginTop: '5px',
        color: '#ffffff',
    };

    const userImage = {
        width: '4em',
        borderRadius: '50%',
        border: '2px solid #444',
    };

    return (
        <div style={containerStyle}>
            <div style={sectionStyle}>
                <div style={headingStyle}>My Profile</div>

                {/* Image & Name */}
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                        <img style={userImage} src={image} alt="profile" />
                        <div style={{ marginLeft: '4%' }}>
                            <div style={{ fontWeight: '600', fontSize: '20px' }}>{profiledata?.displayname}</div>
                            <div style={{ fontSize: '12px', color: '#aeb0bc' }}>{logindata.email}</div>
                        </div>
                    </div>
                </div>

                {/* About */}
                <div style={aboutStyle}>
                    <div style={{ fontWeight: '600', fontSize: '20px', marginBottom: '1%' }}>About</div>
                    <div style={{ fontSize: '14px', color: '#d3d3d3' }}>{profiledata?.about}</div>
                </div>

                {/* Detailed Info */}
                <div style={detailCardStyle}>
                    {/* Row 1 */}
                    <div style={infoBlock}>
                        <div style={{ width: '50%' }}>
                            <div style={labelStyle}>First Name</div>
                            <div style={valueStyle}>{logindata.firstname}</div>
                        </div>
                        <div style={{ width: '50%' }}>
                            <div style={labelStyle}>Last Name</div>
                            <div style={valueStyle}>{logindata.lastname}</div>
                        </div>
                    </div>

                    {/* Row 2 */}
                    <div style={infoBlock}>
                        <div style={{ width: '50%' }}>
                            <div style={labelStyle}>DOB</div>
                            <div style={valueStyle}>{profiledata?.DOB?.split('T')[0]}</div>
                        </div>
                        <div style={{ width: '50%' }}>
                            <div style={labelStyle}>Gender</div>
                            <div style={valueStyle}>{profiledata?.gender}</div>
                        </div>
                    </div>

                    {/* Row 3 */}
                    <div style={infoBlock}>
                        <div style={{ width: '50%' }}>
                            <div style={labelStyle}>Phone Number</div>
                            <div style={valueStyle}>{profiledata?.phonenumber}</div>
                        </div>
                        <div style={{ width: '50%' }}>
                            <div style={labelStyle}>Profession</div>
                            <div style={valueStyle}>{profiledata?.profession}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;
