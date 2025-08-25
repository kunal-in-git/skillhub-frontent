import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import countrycode from '../../data/countrycode.json';
import { Trash2 } from "lucide-react";
import { apiConnector } from '../../services/apiconnector';
import { edit, profile, user } from '../../services/apis';
import Confirmdelete from './Confirmdelete.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Changepassword from './Changepassword.js';

function Setting() {
    const image = localStorage.getItem("image");
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [imagefile, setimage] = useState();
    const [deleteaccount, setdeleteaccount] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (imagefile) {
            const uploadImage = async (imagefile) => {
                if (!imagefile) return; // Prevent running if no file selected

                try {
                    const formdata = new FormData();
                    formdata.append('file', imagefile);
                    console.log("this is imagefile", imagefile);

                    const result = await apiConnector("POST", profile.UPLOADIMAGE_API, formdata, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });

                    console.log("Cloudinary upload result:", result);
                    window.location.reload()
                    localStorage.setItem('image', result.data.data.secure_url);
                    // window.location.reload();
                } catch (e) {
                    console.error("Error uploading to Cloudinary:", e);
                }
            };
            uploadImage(imagefile);
        }
    }, [imagefile, image]);

    const RemoveImage = async () => {
        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const Imageresult = await apiConnector("PUT", edit.REMOVEIMAGE_API, {
                email: logindata.email
            });
            console.log("Image removed:", Imageresult);
            localStorage.setItem('image', Imageresult.data.data.image);
            window.location.reload();
        } catch (error) {
            console.error("Error removing image:", error);
        }
    };

    const addprofile = async (data) => {
        const { displayname, profession, DOB, gender, countryCode, phonenumber, about } = data
        console.log(displayname, " ", profession, " ", DOB, " ", countryCode, " ", gender, " ", phonenumber, " ", about);
        console.log(data);

        try {
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;
            const profiledata = await apiConnector("POST", profile.CREATEPROFILE_API, {
                displayname, profession, DOB, gender, countryCode, phonenumber, about
            }, {
                Authorization: `Bearer ${token}`
            })
            console.log("this is data after making profile", profiledata);
            toast.success("Profile information has successfully updated")
        } catch (error) {
            console.log("error in making profile", error.message)
        }
    }

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: 'auto' }}>
            <ToastContainer />
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px', color: 'rgba(219, 221, 234, 1)' }}>Edit Profile</h2>

            <div
                style={{
                    backgroundColor: 'rgb(0, 8, 20)',
                    padding: '20px',
                    marginTop: '5%',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}
            >
                <img
                    style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        flexShrink: 0
                    }}
                    src={image}
                    alt='profile'
                />
                <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', marginBottom: '10px', color: 'rgba(219, 221, 234, 1)' }}>
                        Change Profile Picture
                    </p>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <label
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'rgb(255, 204, 0)',
                                color: 'black',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                        >
                            <input type='file' style={{ display: 'none' }} onChange={(e) => setimage(e.target.files[0])} />
                            Change
                        </label>
                        <button
                            style={{
                                padding: '8px 16px',
                                backgroundColor: 'white',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                fontWeight: '500'
                            }}
                            onClick={RemoveImage}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>


            <div style={{ backgroundColor: 'rgb(0, 8, 20)', padding: '20px', marginTop: '5%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '5%', color: 'rgba(219, 221, 234, 1)' }}>Profile Information</h3>
                <form onSubmit={handleSubmit(addprofile)}>
                    {/* Display Name & Profession */}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ width: '48%' }}>
                            <label style={{ color: 'rgba(219, 221, 234, 1)' }}>Display Name</label>
                            <input
                                placeholder='Display Name'
                                {...register('displayname', { required: "Display name is required" })}
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', background: "rgb(44,51,63)", color: 'rgba(219, 221, 234, 1)', marginTop: '1%' }}
                            />
                            {errors.displayname && <p style={{ color: 'red' }}>{errors.displayname.message}</p>}
                        </div>

                        <div style={{ width: '48%' }}>
                            <label style={{ color: 'rgba(219, 221, 234, 1)' }}>Profession</label>
                            <select
                                {...register('profession', { required: "Profession is required" })}
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', background: "rgb(44,51,63)", color: 'rgba(219, 221, 234, 1)', marginTop: '1%' }}
                            >
                                <option value="">Select Profession</option>
                                <option value="Developer">Developer</option>
                                <option value="Designer">Designer</option>
                                <option value="Manager">Manager</option>
                            </select>
                            {errors.profession && <p style={{ color: 'red' }}>{errors.profession.message}</p>}
                        </div>
                    </div>

                    {/* Date of Birth & Gender */}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ width: '48%' }}>
                            <label style={{ color: 'rgba(219, 221, 234, 1)' }}>Date of Birth</label>
                            <input
                                type='date'
                                {...register('DOB', { required: "Date of Birth is required" })}
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', background: "rgb(44,51,63)", color: 'rgba(219, 221, 234, 1)', marginTop: '1%' }}
                            />
                            {errors.DOB && <p style={{ color: 'red' }}>{errors.DOB.message}</p>}
                        </div>

                        <div style={{ width: '48%', color: 'rgba(219, 221, 234, 1)' }}>
                            <label style={{ color: 'rgba(219, 221, 234, 1)' }}>Gender</label>
                            <div style={{ width: '100%', padding: '8px', borderRadius: '5px', display: 'flex', justifyContent: 'space-between', background: "rgb(44,51,63)", marginTop: '1%' }}>
                                <label><input type='radio' value='male' {...register('gender', { required: "Gender is required" })} /> Male</label>
                                <label><input type='radio' value='female' {...register('gender')} /> Female</label>
                                <label><input type='radio' value='other' {...register('gender')} /> Other</label>
                            </div>
                            {errors.gender && <p style={{ color: 'red' }}>{errors.gender.message}</p>}
                        </div>
                    </div>

                    {/* Phone Number & About */}
                    <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                        <div style={{ width: '48%' }}>
                            <label style={{ color: 'rgba(219, 221, 234, 1)' }}>Phone Number</label>
                            <div style={{ display: 'flex', gap: '5px' }}>
                                <select
                                    {...register("countryCode", { required: "Country code is required" })}
                                    style={{ width: '30%', padding: '8px', borderRadius: '5px', color: 'rgba(219, 221, 234, 1)', background: "rgb(44,51,63)", marginTop: '1%' }}
                                >
                                    {countrycode.map((item, index) => (
                                        <option key={index} value={item.code}>{item.code} {item.country}</option>
                                    ))}
                                </select>
                                <input
                                    placeholder="12345 67890"
                                    {...register("phonenumber", {
                                        required: "Phone number is required",
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: "Phone number must be 10 digits"
                                        }
                                    })}
                                    style={{ width: '70%', padding: '8px', borderRadius: '5px', color: 'rgba(219, 221, 234, 1)', background: "rgb(44,51,63)", marginTop: '1%' }}
                                />
                            </div>
                            {errors.phonenumber && <p style={{ color: 'red' }}>{errors.phonenumber.message}</p>}
                        </div>

                        <div style={{ width: '48%' }}>
                            <label style={{ color: 'rgba(219, 221, 234, 1)' }}>About</label>
                            <input
                                placeholder='Write about yourself'
                                {...register('about', {
                                    required: "About section is required",
                                    minLength: { value: 10, message: "Minimum 10 characters required" }
                                })}
                                style={{ width: '100%', padding: '8px', borderRadius: '5px', background: "rgb(44,51,63)", color: 'rgba(219, 221, 234, 1)', marginTop: '1%' }}
                            />
                            {errors.about && <p style={{ color: 'red' }}>{errors.about.message}</p>}
                        </div>
                    </div>

                    <button type="submit" style={{ padding: '2%', background: 'rgb(255, 204, 0)' }}>
                        Submit
                    </button>
                </form>

            </div>

            <Changepassword />

            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '20px', padding: '10px', backgroundColor: '#ffe6e6', borderRadius: '10px' }}>
                <div style={{ color: 'red' }}>
                    <Trash2 size={24} />
                </div>
                <div>
                    <h2 style={{ fontSize: "18px", fontWeight: "600" }}>Delete Account</h2>
                    <p style={{ fontSize: "14px" }}>
                        Deleting your account will remove all the content associated with it.
                    </p>
                    <p onClick={() => setdeleteaccount(true)} style={{ color: 'red', cursor: 'pointer', textDecoration: 'underline' }}>
                        I want to delete my account.
                    </p>
                </div>
            </div>

            {(deleteaccount) && <Confirmdelete setdeleteaccount={setdeleteaccount} />}
        </div>
    )
}

export default Setting;