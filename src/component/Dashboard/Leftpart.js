import React, { useEffect, useState } from 'react'
import { CgProfile } from "react-icons/cg";
import { LiaAddressBookSolid } from "react-icons/lia";
import { CiShoppingCart } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import { NavLink } from 'react-router-dom';
import { IoIosCreate } from "react-icons/io";
import { SiBookstack } from "react-icons/si";
import { RxDashboard } from "react-icons/rx";


function Leftpart(props) {
  const [accounttype, setaccounttype] = useState(null);

  
  const fetchaccounttype = async () => {
    try {
      const logindata = JSON.parse(localStorage.getItem('logindata'))
      setaccounttype(logindata.accounttype);
    } catch (error) {

    }
  }

  useEffect(() => {
    fetchaccounttype();
  }, [])

  return (
    <div style={{ background: 'rgb(0, 8, 20)', width: '15%' }}>
      <div style={{ width: '100%', height: '100%', paddingTop: '10%' }}>

        <NavLink to="/user/Dashboard/profile" style={{ textDecoration: 'none' }}>

          <div style={{
            color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%', gap: '1%',
            borderLeft: props.location === "profile" ? '5px solid white' : 'none', paddingLeft: '5%'
          }}>
            <CgProfile style={{ fontSize: '1.5em' }} />
            My Profile
          </div>

        </NavLink>

        <NavLink to="/user/Dashboard/EnrolledCourses" style={{ textDecoration: 'none' }}>

          <div style={{
            color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%', gap: '1%',
            borderLeft: props.location === "EnrolledCourses" ? '5px solid white' : 'none', paddingLeft: '5%', marginTop: '5%'
          }}>
            <LiaAddressBookSolid style={{ fontSize: '1.5em' }} />
            Enrolled Courses
          </div>

        </NavLink>

        {accounttype === "instructor" && (
          <NavLink to="/user/Dashboard/create-course" style={{ textDecoration: 'none' }}>

            <div style={{
              color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%', gap: '1%',
              borderLeft: props.location === "create-course" ? '5px solid white' : 'none', paddingLeft: '5%', marginTop: '5%'
            }}>
              <IoIosCreate style={{ fontSize: '1.5em' }} />
              Create Course
            </div>

          </NavLink>
        )}

        {accounttype === "instructor" && (
          <NavLink to="/user/Dashboard/Mycourse" style={{ textDecoration: 'none' }}>

            <div style={{
              color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%', gap: '1%',
              borderLeft: props.location === "Mycourse" ? '5px solid white' : 'none', paddingLeft: '5%', marginTop: '5%'
            }}>
              <SiBookstack style={{ fontSize: '1.5em' }} />
              Mycourse
            </div>

          </NavLink>
        )}

        {accounttype === "instructor" && (
          <NavLink to="/user/Dashboard/Instructordata" style={{ textDecoration: 'none' }}>

            <div style={{
              color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%', gap: '1%',
              borderLeft: props.location === "Instructordata" ? '5px solid white' : 'none', paddingLeft: '5%', marginTop: '5%'
            }}>
              <RxDashboard style={{ fontSize: '1.5em' }} />
              Dashboard
            </div>

          </NavLink>
        )}

        <NavLink to="/user/Dashboard/settings" style={{ textDecoration: 'none' }}>

          <div style={{
            color: 'white', display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginBottom: '10%', gap: '1%',
            borderLeft: props.location === "settings" ? '5px solid white' : 'none', paddingLeft: '5%', marginTop: '5%'
          }}>
            <IoSettings style={{ fontSize: '1.5em' }} />
            Setting
          </div>

        </NavLink>

      </div>
    </div>
  )
}

export default Leftpart
