import React, { useState, useEffect } from 'react'
import { useWatch } from 'react-hook-form';
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../services/apiconnector';
import { course } from '../../../services/apis';
import { CiFileOn } from "react-icons/ci";
import { GoPencil } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { CiCirclePlus } from "react-icons/ci";
import HighlightText from '../../Home/HighlightText';
import { FiUploadCloud } from "react-icons/fi";
import { increamentpage, decrementpage } from '../../../slices/Dashboard.js'
import { useSelector, useDispatch } from 'react-redux';

function Page2() {

  const { register, handleSubmit, formState: { errors }, reset, watch, control, setValue, getValues } = useForm();
  const [sectionarry, setsectionarray] = useState([]);
  const [subsection, setsubsection] = useState(false);
  const [selectedSectionId, setSelectedSectionId] = useState(null);
  const [edit, setedit] = useState(false);
  const [editsubsect, seteditsubsect] = useState(false);
  const [index, setindex] = useState(null);
  const [subindex, setsubindex] = useState(null);

  const [video, setvideo] = useState(null);
  let thumbnail = useWatch({ control, name: "thumbnail" });

  const dispatch = useDispatch()
  const pagenumber = useSelector((state) => state.Dashboard.page);

  useEffect(() => {
    if (thumbnail && thumbnail.length > 0) {
      const file = thumbnail[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setvideo(reader.result); // Convert file to base64
        };
        reader.readAsDataURL(file);
        console.log("this is video file", thumbnail[0]);
      }
    }
  }, [thumbnail]);


  const makesection = async (data) => {
    try {
      const courseid = localStorage.getItem("courseId");
      console.log("this is couse id", courseid);

      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;

      let section;
      try {
        section = await apiConnector("POST", course.CREATESECTION_API, {
          sectionname: data.sectionname,
          couresid: courseid
        }, {
          Authorization: `Bearer ${token}`
        })
      }
      catch (e) {

      }
      console.log("this is section data", section);
      setsectionarray([...sectionarry, { name: data.sectionname, id: section?.data?.data?._id }]);
      console.log(sectionarry);
      reset();
    }
    catch (e) {
      console.log("error in making section", e.message);
    }
  }


  const makesubsection = async (data) => {
    try {
      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;

      const time = data.hours + ":" + data.minutes + ":" + data.seconds;
      console.log("this is duration", time);
      const formdata = new FormData();
      formdata.append("file", thumbnail[0]);
      formdata.append("sectionid", selectedSectionId);
      formdata.append("title", data.coursename);
      formdata.append("description", data.description);
      formdata.append("timeduration", time);

      let result;
      try {
        result = await apiConnector("POST", course.CREATESUBSECTION_API, formdata, {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        })
      } catch (error) {

      }

      if (result) {
        setTimeout(() => {
          setsubsection(false);
          reset();
          setvideo(null)
        }, 2000);
      }

      console.log("this is result of sub section", result);
      // formdata.forEach((value, key) => {
      //   console.log(key, value);
      // });
      // console.log("this is thumbnail", thumbnail);
      // console.log("this is data from makesubsection", result);

      // put subsection in section

      setsectionarray(sectionarry =>
        sectionarry.map(section =>
          section?.id === selectedSectionId
            ? {
              ...section,
              subsection: [
                ...(section.subsection || []),
                {
                  id: result?.data?.data?._id,
                  title: result?.data?.data?.title,
                  description: result?.data?.data?.description,
                  timeduration: result?.data?.data?.timeduration,
                  videourl: result?.data?.data?.videourl
                }
              ]
            }
            : section
        )
      );

      // sectionarry.forEach((section, index) => {
      //   console.log(`Section ${index + 1}:`, section.name);

      //   if (section.subsection && section.subsection.length > 0) {
      //     section.subsection.forEach((sub, subIndex) => {
      //       console.log(`  Subsection ${subIndex + 1}:`, sub.title);
      //     });
      //   } else {
      //     console.log("  No subsections.");
      //   }
      // });


    } catch (error) {
      console.error("Error uploading:", error);
    }

  }

  const [editIndex, setEditIndex] = useState(null);


  const editsection = (index) => {
    const oldsectionname = sectionarry.find((_, i) => i === index).name;
    setValue("sectionname", oldsectionname);
    setedit(!edit);
    setEditIndex(index);
  }

  const newsectionname = useWatch({ control, name: "sectionname" });
  const saveedit = () => {
    if (editIndex !== null) {
      setsectionarray((prevArray) =>
        prevArray.map((section, i) =>
          i === editIndex ? { ...section, name: newsectionname } : section
        )
      );
      setEditIndex(null); // Reset after saving
      setedit(!edit);
    }
  };

  const deletesection = async (index) => {

    try {

      // removed from sectionarray
      setsectionarray(sectionarry.filter((_, i) => (i !== index)));

      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;
      const sectionid = sectionarry.find((_, i) => (i === index)).id

      // this is special api call for get request

      const sectiondata = await apiConnector(
        "GET",
        `${course.GETSECTION_API}?sectionid=${sectionid}`,
        null,
        {
          Authorization: `Bearer ${token}`
        }
      );

      console.log("this is data by existing section", sectiondata.data.data.subsection);

      // now we have to delete each subsection present in that section 

      const subsections = sectiondata?.data?.data.subsection

      for (let i = 0; i < subsections?.length; i++) {
        console.log("this is data by delete subsection", await apiConnector("DELETE", course.DELETESUBSECTION_API, {
          subsectionid: subsections[i]
        },
          {
            Authorization: `Bearer ${token}`
          }
        ))
      }

      // now delete section
      const courseid = localStorage.getItem("courseId");
      console.log("this is data by delete section", await apiConnector("DELETE", course.DELETESECTION_API, {
        sectionid: sectionid, 
        courseid: courseid
      },
        {
          Authorization: `Bearer ${token}`
        }
      ))

    } catch (error) {
      console.log("error in existing section", error.message)
    }
  }

  const deltesubsection = async (index, subindex) => {
    try {
      setsectionarray(sectionarry =>
        sectionarry.map((section, i) =>
          i === index ? {
            ...section, subsection: section.subsection.filter((_, j) => j !== subindex)
          } : section
        )
      );

      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;
      const subsectionid = sectionarry.find((_, i) => (i === index)).subsection.find((_, i) => (i === subindex)).id;

      console.log("subsectionid", subsectionid);

      const result = await apiConnector("DELETE", course.DELETESUBSECTION_API, {
        subsectionid: subsectionid
      },
        {
          Authorization: `Bearer ${token}`
        }
      )
      console.log(result);

    } catch (error) {
      console.log("unable to delete subsection", error.message)
    }
  }

  const editsubsection = async (index, subindex) => {
    setindex(index);
    setsubindex(subindex);
    seteditsubsect(true);

    // for updating subsection we have to remove the video
    setvideo(null);
    
    try {
      setsubsection(true);
      const subsectionData = sectionarry[index]?.subsection[subindex];

      if (subsectionData) {
        setValue("coursename", subsectionData.title);
        setValue("hours", subsectionData?.timeduration?.split(":")[0]);
        setValue("minutes", subsectionData?.timeduration?.split(":")[1]);
        setValue("seconds", subsectionData?.timeduration?.split(":")[2]);
        setValue("description", subsectionData?.description);

        // If you need to update `video` (assuming it's in state)
        // setvideo(subsectionData.videourl);
      }

      // make a backend call to edit the data of that sub section


    } catch (error) {
      console.log("Error in editing subsection", error.message);
    }
  };

  const updatesubsection = async () => {
    try {

      // console.log("this is index and subindex", index, subindex)

      const title = getValues("coursename");
      const description = getValues("description");
      const hours = getValues("hours") || "00";
      const minutes = getValues("minutes") || "00";
      const seconds = getValues("seconds") || "00";
      const timeduration = `${hours}:${minutes}:${seconds}`;

      console.log("new input", title, " ", description, " ", timeduration);

      if (!title || !description || !timeduration) {
        console.error("Missing required fields");
        return;
      }

      // now updating the data in backend

      const logindata = JSON.parse(localStorage.getItem('logindata'));
      const token = logindata.token;
      const subsectionid = sectionarry[index]?.subsection[subindex]?.id;

      console.log("this is subsection id from updatecourse", subsectionid);

      const formdata = new FormData();
      formdata.append("file", thumbnail[0]);
      formdata.append("subsectionid", subsectionid);
      formdata.append("title", title);
      formdata.append("description", description);
      formdata.append("timeduration", timeduration);

      let result;
      try {
        result = await apiConnector("PUT", course.UPDATESUBSECTION_API, formdata, {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        })
      } catch (error) {

      }

      console.log("this is data by updating of subsection", result);

      console.log("Updating subsection with:", title, description, timeduration);

      console.log("this is video", thumbnail)
      setsectionarray(prevSections =>
        prevSections.map((section, i) =>
          i === index
            ? {
              ...section,
              subsection: section.subsection.map((sub, j) =>
                j === subindex
                  ? {
                    ...sub, // Spread existing properties
                    id: subsectionid,
                    title: title,
                    description: description,
                    timeduration: timeduration,
                    videourl: result.data.data.videourl
                  }
                  : sub
              )
            }
            : section
        )
      );

      seteditsubsect(false);
      setsubsection(false);
      reset();
      setvideo(null);

      console.log("sectionarry:", sectionarry);
      console.log("Selected section:", sectionarry[index]); // Check if this exists
      console.log("Selected subsection:", sectionarry[index]?.subsection); // Check if subsection exists
      console.log("Index values:", index, subindex); // Check if indices are valid

      console.log("thumbnail", thumbnail[0])
    } catch (error) {
      console.error("Error updating subsection:", error.message);
    }
  };
  useEffect(() => {
    console.log("Updated sectionarry:", JSON.stringify(sectionarry, null, 2));
  }, [sectionarry]);




  // this is for editing the course 

  const isediting = useSelector((state) => state.isediting.value);

  useEffect(() => {
    if (isediting) {
      // Function to set old data
      const setolddata = async () => {
        try {
          const data = JSON.parse(localStorage.getItem("coursedata_for_edit")) || {};

          const newarray = data?.coursecontent?.map((section) => ({
            name: section?.sectionname,
            id: section?._id,
            subsection: section?.subsection?.map((sub) => ({
              id: sub._id,
              title: sub.title,
              description: sub.description,
              timeduration: sub.timeduration,
              videourl: sub.videourl
            })) || []
          })) || [];

          setsectionarray(newarray);
        } catch (error) {
          console.error("Error setting old data:", error);
        }
      };

      setolddata(); // Call the function
    }
  }, [isediting]);



  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'rgb(0, 8, 20)', borderRadius: '1em', color: 'white', height: "100vh" }}>

      <div style={{ color: 'rgb(241,242,255)', fontSize: '24px', padding: '2%' }}>
        Course Builder
      </div>

      <div style={{ color: 'rgb(241,242,255)', fontSize: '16px', width: '95%', background: 'rgba(44, 51, 63, 1)', margin: '0 auto 0', borderRadius: '0.5em', justifyContent: 'center', alignItems: 'center', position: 'relative', display: 'flex', flexDirection: 'column' }}>
        {sectionarry?.length > 0 && (
          sectionarry.map((data, index) => (
            <div key={index} style={{
              display: 'flex', color: 'rgb(241,242,255)', fontSize: '16px', width: '100%', gap: '2%', borderRadius: '0.5em', flexDirection: 'column', borderBottom: '1px solid white', marginTop: '3%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3%' }}>

                {/* Section Container */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90%', padding: '1%', borderRadius: '0.5em', gap: '5%', borderRight: '1px solid white' }}>

                  {/* Section Name */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5%', width: '85%' }}>
                    <div><CiFileOn /></div>
                    <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{data.name}</div>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', alignItems: 'center', width: '15%', justifyContent: 'space-between' }}>
                    <GoPencil style={{ cursor: 'pointer' }} onClick={() => { editsection(index) }} />
                    <MdDeleteOutline style={{ cursor: 'pointer' }} onClick={() => { deletesection(index) }} />
                  </div>
                </div>

                {/* Add Subsection Button */}
                <div title='Make a SubSection' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <CiCirclePlus
                    style={{ fontSize: "26px", color: 'yellow', cursor: 'pointer' }}
                    onClick={() => {
                      setsubsection(true);
                      setSelectedSectionId(data.id);
                    }}
                  />
                </div>
              </div>
              {
                data.subsection?.length > 0 && (
                  <div style={{ color: 'rgb(241,242,255)', fontSize: '16px', width: '80%', background: 'rgba(44, 51, 63, 1)', margin: '0 auto 0', borderRadius: '0.5em', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', padding: '2%', marginTop: '0%' }}>

                    {data.subsection.map((sub, subIndex) => (
                      <div key={subIndex} style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'rgb(241,242,255)',
                        fontSize: '16px', width: '100%', gap: '2%', borderRadius: '0.5em', marginBottom: '1%'
                      }}>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '5%', width: '85%' }}>
                          <div><CiFileOn /></div>
                          <div style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>{sub.title}</div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', width: '15%', justifyContent: 'space-between' }}>
                          <GoPencil style={{ cursor: 'pointer' }} onClick={() => { editsubsection(index, subIndex) }} />
                          <MdDeleteOutline style={{ cursor: 'pointer' }} onClick={() => { deltesubsection(index, subIndex) }} />
                        </div>

                      </div>
                    ))}
                  </div>
                )
              }
            </div>
          ))
        )}
      </div>

      <form style={{ display: 'flex', padding: '2%', flexDirection: 'column' }} onSubmit={handleSubmit(makesection)}>
        <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
          <label>Section Name</label>
          <input style={{
            background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
            color: 'rgb(241,242,255)'
          }}
            placeholder='Enter section name'
            {...register("sectionname")}
          />
        </div>
        {!edit ?
          <button type='submit' style={{ padding: '1%', background: 'yellow', width: '20%' }}>
            Create Section &nbsp;<span style={{ fontSize: '20px' }}>+</span>
          </button> :
          <div style={{
            width: "15%", background: "none", color: "#333", fontSize: "16px", fontWeight: "500", border: "none",
            padding: "4px 8px", cursor: "pointer", textDecoration: "underline", display: "inline", transition: "color 0.2s ease",
          }}
            onClick={saveedit}
            onMouseEnter={(e) => (e.target.style.color = "#e0a899")}
            onMouseLeave={(e) => (e.target.style.color = "#333")}
          >
            Save
          </div>
        }
      </form >

      {
        subsection && (
          <div style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(8px)", display: "flex", justifyContent: "center", alignItems: 'center', zIndex: 999
          }}>
            <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column', background: 'rgb(0, 8, 20)', borderRadius: '1em', width: '40%' }}>

              <div style={{ display: 'flex', justifyContent: 'space-between', background: 'rgb(44, 51, 63)', padding: '3%', }}>
                <div>Make Subsection</div>
                <div
                  onClick={() => { setsubsection(false); seteditsubsect(false); reset() }}
                  style={{ cursor: 'pointer', padding: '1%', backgroundColor: 'transparent', transition: 'background-color 0.3s ease' }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = 'red'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}>
                  X
                </div>
              </div>

              <form style={{ padding: '3%', overflowY: "auto", maxHeight: "65vh" }} onSubmit={handleSubmit(makesubsection)}>

                <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%' }}>
                  <div style={{ fontSize: '10px' }}>
                    Course Thumbnail
                  </div>
                  {video ? <div style={{ display: 'flex', flexDirection: 'column', color: 'rgb(241,242,255)', marginBottom: '5%', marginTop: '1%', border: '1px dashed white' }}>
                    <video src={video} alt='thumbnail' controls></video>
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
                  onClick={() => { setvideo(null); setValue("thumbnail", null) }}
                  onMouseEnter={(e) => (e.target.style.color = "#e0a899")}
                  onMouseLeave={(e) => (e.target.style.color = "#333")}
                >
                  Change
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5%' }}>
                  <label style={{ fontSize: '10px' }}>Lecture Title</label>
                  <input style={{
                    background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                    color: 'rgb(241,242,255)'
                  }}
                    placeholder='Lecture Title'
                    {...register("coursename")}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5%' }}>
                  <label style={{ fontSize: '10px' }}>Lecture Duration</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <input style={{
                      background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                      color: 'rgb(241,242,255)'
                    }}
                      type='number'
                      placeholder='HH'
                      {...register("hours")}
                    />

                    <input style={{
                      background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                      color: 'rgb(241,242,255)'
                    }}
                      type='number'
                      placeholder='MM'
                      {...register("minutes")}
                    />

                    <input style={{
                      background: 'rgba(44, 51, 63, 1)', height: '3em', marginTop: '2%', borderRadius: '.5em', padding: '1%',
                      color: 'rgb(241,242,255)'
                    }}
                      type='number'
                      placeholder='SS'
                      {...register("seconds")}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '5%' }}>
                  <label style={{ fontSize: '10px' }}>Course Short Description</label>
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
                    placeholder="Lecture Description"
                    rows="3" // Define the number of lines
                    {...register("description")}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: "space-between" }}>
                  {/* <div style={{
                    width: "15%", background: "none", color: "#333", fontSize: "16px", fontWeight: "500", border: "none",
                    padding: "4px 8px", cursor: "pointer", textDecoration: "underline", display: "inline", transition: "color 0.2s ease",
                  }}
                    onClick={() => {
                      seteditsubsect(true);
                      setvideo(null)
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "#e0a899")}
                    onMouseLeave={(e) => (e.target.style.color = "#333")}
                  >
                    Edit
                  </div> */}

                  {editsubsect ? (
                    <div style={{
                      width: "15%", background: "none", color: "#333", fontSize: "16px", fontWeight: "500", border: "none",
                      padding: "4px 8px", cursor: "pointer", textDecoration: "underline", display: "inline", transition: "color 0.2s ease",
                    }}
                      onClick={updatesubsection}
                      onMouseEnter={(e) => (e.target.style.color = "#e0a899")}
                      onMouseLeave={(e) => (e.target.style.color = "#333")}
                    >
                      Save Edit
                    </div>
                  ) :
                    <button type='submit' style={{ padding: '2%' }}>
                      Submit
                    </button>
                  }
                </div>

              </form>
            </div>

          </div>
        )
      }

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1%', gap: '2%', marginRight: '2%' }}>
        <button onClick={() => { dispatch((decrementpage())) }} style={{ padding: '2%', background: 'white' }} >Prev</button>
        <button onClick={() => { dispatch(increamentpage()) }} style={{ padding: '2%', background: 'yellow' }} >Next</button>
      </div>

    </div >
  )
}

export default Page2
