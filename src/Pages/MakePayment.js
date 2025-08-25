import React from 'react'
import { apiConnector } from '../services/apiconnector';
import { payments, user } from '../services/apis.js'

function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

async function displayRazorpay(props) {
    const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
    }

    const logindata = JSON.parse(localStorage.getItem('logindata'))
    const token = logindata.token

    // creating a new order

    // console.log("this is course and user id", props.courseid, props.userid);

    const result = await apiConnector("POST", payments.MAKEPAYMENT_API, {
        prize: props.prize
    }, {
        Authorization: `Bearer ${token}`
    })

    if (!result) {
        alert("Server error. Are you online?");
        return;
    }
    console.log("this is result by makepayment.js ", result);

    // Getting the order details back
    const { amount, id: order_id, currency } = result.data;

    const options = {
        key: "rzp_test_LPy8hEuSwd3qbY", // Enter the Key ID generated from the Dashboard
        amount: amount?.toString(),
        currency: currency,
        name: "Soumya Corp.",
        description: "Test Transaction",
        order_id: order_id,
        course_id: props.id,
        handler: async function (response) {
            console.log("this is response", response);

            let data;

            if (props?.fromcartflag) {
                // Immediately invoke async function
                await (async () => {
                    try {
                        const token = logindata.token;
                        const userid = props.userid;

                        if (!token || !userid) {
                            console.error("Token or UserID missing");
                            return;
                        }

                        if( props.isalreadyenrolled ){
                            console.log("this is from already enrolled");
                            props.isalreadyenrolled()
                        } 
                        
                        const result = await apiConnector(
                            "GET",
                            `${user.GETCARTDATA_API}?userid=${userid}`,
                            null,
                            {
                                Authorization: `Bearer ${token}`,
                            }
                        );

                        if (result?.data?.success) {
                            console.log("Cart data retrieved:", result.data.data);

                            data = {
                                orderCreationId: order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpayOrderId: response.razorpay_order_id,
                                razorpaySignature: response.razorpay_signature,
                                courseid: result.data.data.course,
                                userid: props.userid,
                                flag: true
                            };
                        } else {
                            console.error("Failed to fetch cart data:", result?.data?.message || "Unknown error");
                        }

                    } catch (error) {
                        console.error("Error fetching cart data:", error);
                    }
                })();
            } else {
                data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    courseid: props.courseid,
                    userid: props.userid,
                    flag: false
                };
            }

            const result = await apiConnector("POST", payments.VERIFY_API, data);

            console.log("this is result by verify", result);
            alert(result.data.msg);
        },
        prefill: {
            name: "Soumya Dey",
            email: "SoumyaDey@example.com",
            contact: "9999999999",
        },
        notes: {
            address: "Soumya Dey Corporate Office",
        },
        theme: {
            color: "#61dafb",
        },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
}


function MakePayment(props) {
    return (
        <div >
            <button style={{
                width: "80%",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "none",
                background: "#EF476F",
                color: "#fff",
                fontWeight: "600",
                cursor: "pointer",
                margin: '3% auto'
            }} onClick={() => { displayRazorpay(props) }}>Buy Now</button>
        </div>
    )
}

export default MakePayment
