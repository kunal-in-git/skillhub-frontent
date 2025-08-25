import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { user } from '../../services/apis';
import { apiConnector } from '../../services/apiconnector';

function Changepassword() {

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    const changepassword = async (data) => {
        try {
            const { oldpass, newpass } = data;

            if (newpass.trim().length < 6) {
                toast.error("Password must be at least 6 characters long");
                return;
            }

            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata?.token;

            console.log("you are in changepassword");

            const response = await apiConnector(
                "PUT",
                user.CHANGEPASSWORD_API,
                { oldpass, newpass },
                { Authorization: `Bearer ${token}` }
            );

            console.log("Password changed:", response);

            toast.success("✅ Password updated successfully! Redirecting...");

            // Clear session and redirect
            localStorage.clear();
            setTimeout(() => {
                navigate('/Home');
                window.location.reload();
            }, 1000);

        } catch (error) {
            console.error("Error changing password:", error);

            if (error?.response?.data?.message === 'Old password is incorrect') {
                toast.error("Old password is incorrect");
            } else {
                toast.error(error?.response?.data?.message || "Something went wrong");
            }

        }
    };


    return (
        <div style={{ backgroundColor: 'rgb(0, 8, 20)', padding: '20px', marginTop: '5%', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <ToastContainer/>
            <form onSubmit={handleSubmit(changepassword)}>

                <div style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '18px', fontWeight: '600', marginBottom: '25px' }}>
                    🔐 Want to Change Password? Let's do it! 💪
                </div>

                <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
                    <div style={{ width: '48%', minWidth: '250px' }}>
                        <label style={{ color: 'rgba(219, 221, 234, 1)', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                            Current Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter current password'
                            {...register('oldpass', { required: 'Current password is required' })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                background: 'rgb(44, 51, 63)',
                                color: 'rgba(219, 221, 234, 1)',
                                border: '1px solid transparent',
                                marginTop: '4px'
                            }}
                        />
                        {errors.oldpass && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.oldpass.message}</p>
                        )}
                    </div>

                    <div style={{ width: '48%', minWidth: '250px' }}>
                        <label style={{ color: 'rgba(219, 221, 234, 1)', fontSize: '14px', marginBottom: '5px', display: 'block' }}>
                            New Password
                        </label>
                        <input
                            type='password'
                            placeholder='Enter new password'
                            {...register('newpass', { required: 'New password is required' })}
                            style={{
                                width: '100%',
                                padding: '10px',
                                borderRadius: '6px',
                                background: 'rgb(44, 51, 63)',
                                color: 'rgba(219, 221, 234, 1)',
                                border: '1px solid transparent',
                                marginTop: '4px'
                            }}
                        />
                        {errors.newpass && (
                            <p style={{ color: 'red', fontSize: '12px', marginTop: '4px' }}>{errors.newpass.message}</p>
                        )}
                    </div>
                </div>


                <button
                    type="submit"
                    style={{
                        padding: '10px 20px',
                        backgroundColor: 'rgb(255, 204, 0)',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'black',
                        fontWeight: '600',
                        cursor: 'pointer',
                        marginTop: '10px',
                        transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => (e.target.style.backgroundColor = "gold")}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = "rgb(255, 204, 0)")}
                >
                    Let's Go 🚀
                </button>

            </form>
        </div>
    )
}

export default Changepassword
