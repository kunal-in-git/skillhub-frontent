import React from 'react'
import Navigationbar from '../component/Home/Navigationbar'
import Footer from '../component/Home/Footer'
import { user } from '../services/apis.js'
import { ToastContainer, toast } from "react-toastify";
import { apiConnector } from '../services/apiconnector'
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import countrycode from '../data/countrycode.json'


function ContactUs() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    function onsubmit(data) {
        console.log("This is the form data:", data);
        const { firstname, lastname, email, countryCode, phonenumber, message } = data;
        console.log(firstname, lastname, email, countryCode, phonenumber, message);


        async function makecontact() {
            try {
                const result = await apiConnector("POST", user.MAKECONTACT_API, {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    countryCode: countryCode,
                    phonenumber: phonenumber,
                    message: message
                });
                console.log("this is result from contact api ", result);
                toast.success("Thanks for contacting us");
                reset();
            } catch (e) {
                console.log("unable to post new contact", e);
            }
        }
        makecontact()
    }

    return (
        <div>
            <ToastContainer />
            <Navigationbar />

            
            <div style={{ background: 'rgba(22, 29, 41, 1)', borderBottom: '1px solid white', display: 'flex', justifyContent: 'space-around', alignItems: 'center', padding: '5% 0 5% 0' }}>

                <div
                    style={{
                        backgroundColor: "rgba(0, 8, 20, 1)",
                        padding: "20px",
                        borderRadius: "12px",
                        width: "20%",
                        boxShadow: "0px 0px 15px rgba(72, 70, 70, 0.3)",
                        color: 'white',
                    }}
                >
                    {/* Chat Section */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{ fontSize: "20px", marginRight: "15px", color: "#f5c518" }}>💬</div>
                        <div style={{ fontSize: "14px" }}>
                            <strong style={{ fontSize: "16px", display: "block", marginBottom: "5px" }}>Chat on us</strong>
                            <div style={{ color: 'grey' }}>
                                Our friendly team is here to help.<br />
                                @mail address
                            </div>
                        </div>
                    </div>

                    {/* Visit Section */}
                    <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
                        <div style={{ fontSize: "20px", marginRight: "15px", color: "#f5c518" }}>📍</div>
                        <div style={{ fontSize: "14px" }}>
                            <strong style={{ fontSize: "16px", display: "block", marginBottom: "5px" }}>Visit us</strong>
                            <div style={{ color: 'grey' }}>
                                Come and say hello at our office HQ.<br />
                                Here is the location/ address
                            </div>
                        </div>
                    </div>

                    {/* Call Section */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <div style={{ fontSize: "20px", marginRight: "15px", color: "#f5c518" }}>📞</div>
                        <div style={{ fontSize: "14px" }}>
                            <strong style={{ fontSize: "16px", display: "block", marginBottom: "5px" }}>Call us</strong>
                            <div style={{ color: 'grey' }}>
                                Mon - Fri From 8am to 5pm<br />
                                +123 456 7890
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ width: "40%", border: "1px solid rgb(45, 49, 55)" }}>

                    <div style={{ fontSize: '36px', color: 'white', marginBottom: '1%' }}>
                        Got a Idea? We’ve got the skills. Let’s team up
                    </div>
                    <div style={{ color: 'rgba(131, 136, 148, 1)', marginBottom: '10%' }}>
                        Tall us more about yourself and what you’re got in mind.
                    </div>
                    <form onSubmit={handleSubmit(onsubmit)} style={{
                        background: 'rgba(0, 8, 20, 1)',
                        padding: '20px',
                        borderRadius: '10px',
                        boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                        width: '400px',
                        color: '#fff'
                    }}>
                        <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                            <div style={{ flex: 1 }}>
                                <label>First Name:</label>
                                <input
                                    placeholder="Enter first name"
                                    {...register("firstname", {
                                        required: "First name is required",
                                        minLength: {
                                            value: 2,
                                            message: "First name must be at least 2 characters"
                                        }
                                    })}
                                    style={inputStyle}
                                />
                                {errors.firstname && <p style={errorStyle}>{errors.firstname.message}</p>}
                            </div>

                            <div style={{ flex: 1 }}>
                                <label>Last Name:</label>
                                <input
                                    placeholder="Enter last name"
                                    {...register("lastname", {
                                        required: "Last name is required",
                                        minLength: {
                                            value: 2,
                                            message: "Last name must be at least 2 characters"
                                        }
                                    })}
                                    style={inputStyle}
                                />
                                {errors.lastname && <p style={errorStyle}>{errors.lastname.message}</p>}
                            </div>
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Email Address:</label>
                            <input
                                placeholder="Enter email address"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: "Enter a valid email"
                                    }
                                })}
                                style={inputStyle}
                            />
                            {errors.email && <p style={errorStyle}>{errors.email.message}</p>}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Phone Number:</label>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <select style={{ ...inputStyle, width: '80px' }} {...register("countryCode", { required: true })}>
                                    {countrycode.map((item, index) => (
                                        <option key={index} value={item.code}>
                                            {item.code} {item.country}
                                        </option>
                                    ))}
                                </select>

                                <input
                                    placeholder="12345 67890"
                                    {...register("phonenumber", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Enter a valid 10-digit number"
                                        }
                                    })}
                                    style={inputStyle}
                                />
                            </div>
                            {errors.phonenumber && <p style={errorStyle}>{errors.phonenumber.message}</p>}
                        </div>

                        <div style={{ marginBottom: '15px' }}>
                            <label>Message:</label>
                            <TextField
                                placeholder="Enter your message"
                                multiline
                                rows={3}
                                fullWidth
                                {...register("message", {
                                    required: "Message is required",
                                    minLength: {
                                        value: 10,
                                        message: "Message must be at least 10 characters"
                                    }
                                })}
                                style={{ backgroundColor: "rgba(22, 29, 41, 1)", borderRadius: '5px' }}
                                InputProps={{
                                    style: { color: "#fff" },
                                }}
                            />
                            {errors.message && <p style={errorStyle}>{errors.message.message}</p>}
                        </div>

                        <button type="submit" style={submitButtonStyle}>
                            Submit
                        </button>
                    </form>


                </div>

            </div>
            <Footer />
        </div>
    )
}


// ✅ Common Input Style
const inputStyle = {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: 'none',
    background: 'rgba(22, 29, 41, 1)',
    color: 'rgba(241, 242, 255, 1)',
    marginTop: '5px',
};

// ✅ Error Message Style
const errorStyle = {
    color: 'red',
    fontSize: '12px',
    marginTop: '5px'
};

// ✅ Submit Button Style
const submitButtonStyle = {
    width: '100%',
    marginTop: '15px'
};

export default ContactUs
