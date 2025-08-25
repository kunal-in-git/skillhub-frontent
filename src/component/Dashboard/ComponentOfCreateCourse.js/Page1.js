// import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiUploadCloud } from "react-icons/fi";
import HighlightText from '../../Home/HighlightText.js'
import { useSelector, useDispatch } from 'react-redux';
import { increamentpage, decrementpage } from '../../../slices/Dashboard.js'
import { useWatch } from 'react-hook-form';
import { profile } from '../../../services/apis.js';
import { apiConnector } from '../../../services/apiconnector.js';
import { course } from '../../../services/apis.js';
import { useEffect, useState } from 'react';

function Page1() {
    const { register, handleSubmit, formState: { errors }, reset, watch, control, setValue } = useForm();

    // const [tag, settag] = useState()
    // const Tagarr = watch("tags")?.split(",");
    // const requirementsarr = watch("requirements")?.split(",");

    // useEffect(() => {
    //     settag(watch("tags")); // Default to empty string to avoid undefined issues
    //   }, [tag]); // tag is not updating because tag updation is inside the useeffect

    // console.log(arr);
    // // console.log("tfdf",arr);
    // useEffect(() => {
    //     // console.log(watch("tags"));
    //     settag(watch("tags")); // Default to empty string to avoid undefined issues
    // }, [watch("tags")]); // tag is not updating because tag updation is inside the useeffect

    const watchedTags = useWatch({ control, name: "tags" });
    const watchedRequirements = useWatch({ control, name: "requirements" });
    const [image, setImage] = useState(null);

    let thumbnail = useWatch({ control, name: "thumbnail" });

    useEffect(() => {
        if (thumbnail && thumbnail.length > 0) {
            const file = thumbnail[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImage(reader.result); // Convert file to base64
                };
                reader.readAsDataURL(file);
                console.log("this is image", image);
            }
        }
    }, [thumbnail, image]);

    const Tagarr = watchedTags?.split(",");
    const requirementsarr = watchedRequirements?.split(",");

    const dispatch = useDispatch()
    const pagenumber = useSelector((state) => state.Dashboard.page);

    const firstpagecall = async (data) => {
        try {
            dispatch(increamentpage());
            console.log("this is data of form", data);
            // first upload image on cloudinary
            // console.log(data);
            const formdata = new FormData();
            let imagefile = data.thumbnail[0];
            // console.log("thiesi", imagefile);

            formdata.append('file', imagefile);
            const result = await apiConnector("POST", profile.UPLOADIMAGE_API, formdata, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            thumbnail = result.data.data.secure_url;
            console.log("Cloudinary upload result:", result);

            // now make course

            const logindata = JSON.parse(localStorage.getItem('logindata'));
            const token = logindata.token;

            const makecourseresult = await apiConnector("POST", course.CREATECOURSE_API, {
                coursename: data.coursename,
                description: data.description,
                tags: data.tags,
                price: data.price,
                category: data.category,
                benefits: data.benefits,
                requirements: data.requirements,
                thumbnail: thumbnail,
            }, {
                Authorization: `Bearer ${token}`
            })

            console.log("this is result of course make", makecourseresult);
            localStorage.setItem("courseId", makecourseresult.data.data._id);

            try {
                console.log(localStorage.getItem("courseId"));
            } catch (error) {

            }
        } catch (error) {
            console.log("error in uploading the file", error.message);
        }
    }


    // this part is used to edit the course 

    const isediting = useSelector((state) => state.isediting.value);

    useEffect(() => {
        if (isediting) {
            const fetchCourseData = async () => {
                try {
                    const data = JSON.parse(localStorage.getItem("coursedata_for_edit")) || {};
                    setValue("coursename", data.coursename || "");
                    setValue("description", data.description || "");
                    setValue("price", data.price || "");
                    setValue("category", data.category || "");
                    setValue("tags", data.tags || "");
                    setImage(data.thumbnail);
                    setValue("benefits", data.benefits || "");
                    setValue("requirements", data.requirements || "");

                    console.log('This is data from page 1:', data);
                } catch (error) {
                    console.error("Error fetching course data:", error);
                }
            };

            fetchCourseData(); // Call the function here
        }
    }, [isediting]);


    const editcourse = async (data) => {
        try {
            // Retrieve login data
            const logindata = JSON.parse(localStorage.getItem('logindata'));
            if (!logindata || !logindata.token) {
                console.error("User not logged in or missing token");
                return;
            }

            const token = logindata.token;

            // Retrieve existing course data
            const coursedetail = JSON.parse(localStorage.getItem("coursedata_for_edit")) || {};
            if (!coursedetail || Object.keys(coursedetail).length === 0) {
                console.error("No course data found in localStorage");
                return;
            }

            // Ensure 'image' is defined before using it
            if (!image) {
                console.error("Image is not defined");
                return;
            }

            // Merge form data (`data`) with existing course details (`coursedetail`)
            const updatedCourse = {
                coursename: data.coursename || coursedetail.coursename,
                description: data.description || coursedetail.description,
                benefits: data.benefits || coursedetail.benefits,
                price: data.price || coursedetail.price,
                category: data.category || coursedetail.category,
                thumbnail: image, // Ensure this is correctly defined
                tags: data.tags || coursedetail.tags,
                requirements: data.requirements || coursedetail.requirements,
                courseid: coursedetail._id // Course ID remains unchanged
            };

            // API call to update course
            const response = await apiConnector("PUT", course.EDITCOURSE_API, updatedCourse, {
                Authorization: `Bearer ${token}`
            });
            dispatch(increamentpage());
            // Handle API response
            if (response?.data?.success) {
                console.log("Course updated successfully:", response.data);
            } else {
                console.error("Failed to update course:", response?.data?.message || "Unknown error");
            }

            console.log(updatedCourse);

        } catch (error) {
            console.error("Error updating course:", error);
        }
    };


    return (
        <div style={{ display: 'flex', justifyContent: 'center', background: 'rgb(0, 8, 20)', borderRadius: '1em', }}>

            <form onSubmit={!isediting ? handleSubmit(firstpagecall) : handleSubmit(editcourse)} style={{ width: '80%', padding: '5%' }}>
                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>Course Title</label>
                    <input style={{
                        background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                        color: 'rgb(241,242,255)'
                    }}
                        placeholder='course title'
                        {...register("coursename")}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>Course Short Description</label>
                    <textarea
                        style={{
                            background: "rgba(44, 51, 63, 1)",
                            height: "6em",  // Adjust height as needed
                            marginTop: "2%",
                            borderRadius: ".5em",
                            padding: "1%",
                            color: "rgb(241,242,255)",
                            width: "100%",  // Adjust width as needed
                            resize: "vertical",  // Allow resizing
                            border: "none",
                            outline: "none",
                        }}
                        placeholder="Enter Description"
                        rows="3" // Define the number of lines
                        {...register("description")}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>price</label>
                    <input style={{
                        background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                        color: 'rgb(241,242,255)'
                    }}
                        placeholder='Enter Price'
                        {...register("price")}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>category</label>
                    <select style={{
                        background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                        color: 'rgb(241,242,255)'
                    }}
                        placeholder='Choose a Category'
                        {...register("category")}

                    >
                        <option style={{
                            background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                            color: 'rgb(241,242,255)'
                        }}>
                            Web Development
                        </option>

                        <option style={{
                            background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                            color: 'rgb(241,242,255)'
                        }}>
                            DSA
                        </option>

                        <option style={{
                            background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                            color: 'rgb(241,242,255)'
                        }}>
                            Java
                        </option>

                        <option style={{
                            background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                            color: 'rgb(241,242,255)'
                        }}>
                            Devops
                        </option>

                    </select>
                </div>

                {(Tagarr?.length > 1) &&
                    <div style={{ display: 'flex', color: 'black', flexWrap: 'wrap', gap: '1%', marginBottom: '5%', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                        {Tagarr?.map((tags, index) => (
                            <div style={{ background: 'rgba(255, 234, 0, 0.92)', border: '1px solid black', borderRadius: '1em', padding: '1%', fontSize: '10px', maxWidth: '100%' }} key={index}>
                                {tags}
                            </div>
                        ))}
                    </div>
                }

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>Tags</label>
                    <textarea
                        style={{
                            background: "rgba(44, 51, 63, 1)",
                            height: "6em",  // Adjust height as needed
                            marginTop: "2%",
                            borderRadius: ".5em",
                            padding: "1%",
                            color: "rgb(241,242,255)",
                            width: "100%",  // Adjust width as needed
                            resize: "vertical",  // Allow resizing
                            border: "none",
                            outline: "none",
                        }}
                        placeholder="Choose a Tag"
                        rows="3" // Define the number of lines
                        {...register("tags")}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <div>
                        Course Thumbnail
                    </div>
                    {image ? <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%', marginTop: '1%', border: '1px dashed white' }}>
                        <img src={image} alt='thumbnail'></img>
                    </div> : <label>
                        <input style={{
                            background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                            color: 'rgb(241,242,255)', display: 'none'
                        }}
                            {...register("thumbnail")}
                            type='file'
                        />
                        <div style={{
                            background: 'rgba(44, 51, 63, 1)', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                            color: 'rgb(241,242,255)', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%', border: '1px dashed white'
                        }}>

                            <div style={{ fontSize: '2em', padding: '2%', borderRadius: '1em', background: 'rgba(255, 214, 10, 0.38)', color: 'rgb(255,214,10)', marginTop: '3%' }}><FiUploadCloud /></div>

                            <div style={{ color: 'rgb(182, 185, 227)', fontSize: '12px', marginTop: '2%', width: '30%', textAlign: 'center' }}>
                                Drag and drop an image, or <HighlightText color="rgb(255,214,10)">Browse</HighlightText>
                                Max 6MB each (12MB for videos)
                            </div>

                            <div style={{ display: 'flex', gap: '35%', justifyContent: 'center', alignItems: 'center', color: 'rgb(182, 185, 227)', fontSize: '12px', width: '100%', marginTop: '4%', marginBottom: '3%' }}>
                                <div>--Aspect ratio 16:9</div>
                                <div>--Recommended size 1024x576</div>
                            </div>

                        </div>
                    </label>
                    }
                </div >

                <div style={{
                    width: "15%", background: "none", color: "#333", fontSize: "16px", fontWeight: "500", border: "none",
                    padding: "4px 8px", cursor: "pointer", textDecoration: "underline", display: "flex", transition: "color 0.2s ease", marginBottom: '5%'
                }}
                    onClick={() => { setImage(null); setValue("thumbnail", null) }}
                    onMouseEnter={(e) => (e.target.style.color = "#e0a899")}
                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                >
                    Change
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>Benefits of the course</label>
                    <textarea
                        style={{
                            background: "rgba(44, 51, 63, 1)",
                            height: "6em",  // Adjust height as needed
                            marginTop: "2%",
                            borderRadius: ".5em",
                            padding: "1%",
                            color: "rgb(241,242,255)",
                            width: "100%",  // Adjust width as needed
                            resize: "vertical",  // Allow resizing
                            border: "none",
                            outline: "none",
                        }}
                        placeholder="Enter Benefits of the course"
                        rows="3" // Define the number of lines
                        {...register("benefits")}
                    />
                </div>

                {(requirementsarr?.length > 1) &&
                    <div style={{ display: 'flex', color: 'black', flexWrap: 'wrap', gap: '1%', marginBottom: '5%', wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                        {requirementsarr?.map((tags, index) => (
                            <div style={{ background: 'rgba(255, 234, 0, 0.92)', border: '1px solid black', borderRadius: '1em', padding: '1%', fontSize: '10px', maxWidth: '100%' }} key={index}>
                                {tags}
                            </div>
                        ))}
                    </div>
                }

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                    <label>Requirements/Instructions</label>
                    <textarea
                        style={{
                            background: "rgba(44, 51, 63, 1)",
                            height: "6em",  // Adjust height as needed
                            marginTop: "2%",
                            borderRadius: ".5em",
                            padding: "1%",
                            color: "rgb(241,242,255)",
                            width: "100%",  // Adjust width as needed
                            resize: "vertical",  // Allow resizing
                            border: "none",
                            outline: "none",
                        }}
                        placeholder="Choose a Tag"
                        rows="3" // Define the number of lines
                        {...register("requirements")}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button type="submit" style={{ padding: '2%', background: 'yellow' }}>Next</button>
                </div>
            </form>
        </div>
    )
}

export default Page1
