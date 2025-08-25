import React, { useState } from 'react'
import { increamentpage, decrementpage } from '../../../slices/Dashboard.js'
import { useSelector, useDispatch } from 'react-redux';
import { course } from '../../../services/apis.js';
import { apiConnector } from '../../../services/apiconnector.js';
import { useNavigate } from 'react-router-dom';

function Page3() {

    const dispatch = useDispatch()
    const pagenumber = useSelector((state) => state.Dashboard.page);
    const navigate = useNavigate();
    const [isChecked, setIsChecked] = useState(false);

    const publishCourse = async () => {
        try {
            const data = JSON.parse(localStorage.getItem("coursedata_for_edit")) || {};
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;

            console.log("this is courseid from publishing", data._id);
            const result = await apiConnector("PUT", course.PUBLISHCOURSE_API, {
                courseid: data._id
            }, {
                Authorization: `Bearer ${token}`
            })
            navigate("/user/Dashboard/Mycourse");
            pagenumber = 1
            console.log("this is data of published course", result);
        } catch (error) {
            console.log("error in publishing course")
        }
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(0, 8, 20)', borderRadius: '1em', color: 'white',padding: '5%', height:"100vh" }}>
            <div style={{ fontSize: '24px', marginBottom: "2%" }}>
                Publish Settings
            </div>
            <div>
                <label style={{ marginRight: '1%' }}>
                    <input type='checkbox' onClick={() => { setIsChecked(!isChecked) }} />
                </label>Make this Course Public
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1%', marginTop: '5%', gap:'2%' }}>
                <button type="submit" onClick={() => { dispatch((decrementpage())) }} style={{padding:'2%', background:'white'}} >Prev</button>
                {isChecked &&
                    <button type="submit" onClick={publishCourse} style={{padding:'2%', background:'yellow'}}>Publish</button>
                }
            </div>
        </div>

    )
}

export default Page3
