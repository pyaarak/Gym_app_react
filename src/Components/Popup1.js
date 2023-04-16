// import React from 'react'
import React, { useEffect, useState } from "react";
import "../Stylesheets/Popup.scss";
import Select from "react-select";
import axios from "axios";
// import Logo from "../assets/Logo.png";
import Logo from '../assets/photo.jpg'
import { URL } from "../Content/Sidebardata";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup1(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [Options, setOptions] = useState([]);
  const [PackageVal, setPackageval] = useState();
  const [Options1, setOptions1] = useState([]);
  const [Gender, setGender] = useState();
  const [Document, setDoc]=useState([]);
  const [Totalval, setTotalval] = useState("");
  const [UserDetails, setUserDetails] = useState({User_id:"",Date:"",Day:"",trainername:"",musclegroup:""})
  const [UserDetails1, setUserDetails1] = useState({User_id:"",email:"",report_document:"",reportcycle:""})
  const [UserDetails2, setUserDetails2] = useState({User_id:"",email:"",attendance_document:"",attandancecycle:""})

  const onSubmit=(e)=>{
      if(props.val == 1){
        props.setshowloader(true)
        const formData = new FormData();
        formData.append("file", Document);
        formData.append("reportcycle",UserDetails1.reportcycle);
        formData.append("User_id",UserDetails1.User_id);
        formData.append("email", UserDetails1.email);
        axios({method:"post",url:URL.URL1+"Report",data:formData,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
          // console.log(response)
          props.setReportAdd(false)
          props.setRefresh(!props.refresh)
          props.setshowloader(false)
        }).catch((error)=>{
          props.setshowloader(false)
        })
      }
      else if(props.val == 2){
        props.setshowloader(true)
        const formData = new FormData();
        formData.append("file", Document);
        formData.append("attandancecycle",UserDetails2.attandancecycle);
        formData.append("User_id",UserDetails2.User_id);
        formData.append("email", UserDetails2.email);
        axios({method:"post",url:URL.URL1+"Attendance",data:formData,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
          // console.log(response)
          props.setAttendanceAdd(false)
          props.setRefresh(!props.refresh)
          props.setshowloader(false)
        }).catch((error)=>{
          props.setshowloader(false)
          
        })
      }
      else if(props.val == 3){
        if(props.edit ==0){
          props.setshowloader(true)
          axios({method:"post",url:URL.URL1+"Workouts",data:UserDetails,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
            // console.log(response)
            props.setWorkoutAdd(false)
            props.setshowloader(false)
          }).catch((error)=>{
            props.setshowloader(false)
          })
        }
        else{
          // console.log("userdetails")
          // debugger
          props.setshowloader(true)
          axios({method:"put",url:URL.URL1+"workouts/"+props.edit,data:UserDetails,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
          console.log(response)
          // debugger
          props.setWorkoutAdd(false)
          props.setshowloader(false)
        }).catch((error)=>{
          props.setshowloader(false)
        })
        }
      }
  }

  const handleChange1=(e)=>{
     setUserDetails((prev)=>{
      return{
        ...prev,["User_id"]:props.User_id
      }
     })
      setUserDetails((prev)=>{
        return{
            ...prev,[e.target.name]:e.target.value
        }
      })
  }

  const handleChange3=(e)=>{
    setUserDetails1((prev)=>{
      return{
        ...prev,["User_id"]:props.User_id
      }
     })
     setUserDetails1((prev)=>{
      return{
        ...prev,["email"]:props.email
      }
     })
    if(e.target.name == "report_document"){
      // setUserDetails1((prev)=>{
      //   return{
      //       ...prev,["report_document"]:e.target.files[0]
      //   }
      // })
      setDoc(e.target.files[0])
    }
    else{
      setUserDetails1((prev)=>{
        return{
            ...prev,[e.target.name]:e.target.value
        }
      })
    }
  }
  const handleChange4=(e)=>{
    setUserDetails2((prev)=>{
      return{
        ...prev,["User_id"]:props.User_id
      }
     })
     setUserDetails2((prev)=>{
      return{
        ...prev,["email"]:props.email
      }
     })
     if(e.target.name == "attendance_document"){
      // setUserDetails1((prev)=>{
      //   return{
      //       ...prev,["report_document"]:e.target.files[0]
      //   }
      // })
      setDoc(e.target.files[0])
    }
    else{
      setUserDetails2((prev)=>{
        return{
            ...prev,[e.target.name]:e.target.value
        }
      })
    }
  }

  const handleChange=(e)=>{
     if(e){
        if(e.length > 0){
          var val=""
          e.map((ele,index)=>{
            val=val+`${index != 0 ? "/" : ""}`+ele.value
            setUserDetails((prev)=>{
              return{
                  ...prev,["musclegroup"]:val
              }
            })
            console.log(val,"lil1l1l31l23l")
          })
        }
     }
     if(e.length == 0){
      setUserDetails((prev)=>{
        return{
            ...prev,["musclegroup"]:""
        }
     })
     }
  }

  const handleChange2=(e)=>{
    if(e!=null){
        setUserDetails((prev)=>{
            return{
                ...prev,["trainername"]:e.label
            }
         })
    }
 }

  const createOption = (label) => ({
        label,
        value: label,
  });

  useEffect(()=>{
    props.setshowloader(true)
    let option=[]
    option.push(createOption("Chest"))
    option.push(createOption("Back"))
    option.push(createOption("Leg"))
    option.push(createOption("Arms"))
    option.push(createOption("Shoulders"))
    option.push(createOption("Upper Body"))
    option.push(createOption("Lower Body"))
    option.push(createOption("Cardio"))
    option.push(createOption("HIIT"))
    option.push(createOption("Push"))
    option.push(createOption("Pull"))

    let option2=[]
    axios({method:"get",url:URL.URL1+"TrainerDetails",headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((respose)=>{
      respose.data.data.map((val)=>{
        option2.push({label:val.email,value:val.id})
      })
      props.setshowloader(false)
    }).catch((error)=>{
      props.setshowloader(false)
    })
    setOptions(option)
    setOptions1(option2)
    if(props.edit != 0){
      props.setshowloader(true)
      axios({method:"get",url:URL.URL1+"workouts/"+props.edit,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
        console.log(response)
        if(response.data.data!=null){
          setUserDetails(response.data.data)
          let l1=[]
          response.data.data.musclegroup.split("/").map((ele)=>{
              l1.push(createOption(ele))
          })
          setPackageval(l1)
          setGender(createOption(response.data.data.trainername))
        }
        props.setshowloader(false)
      }).catch((error)=>{
        props.setshowloader(false)
      })
    }
  },[])

  return (
    <div className="Popup_outer_Wrapper">
    <div className={`Popup_inner_Wrapper ${props.val != 3 ? "active" : ""}`}>
      <div className="popup_header">
        <img src={Logo} width={50} height={50}></img>
           <div className="popup_header_content">{props.val == 1 && "Send Report"}{props.val == 2 && "Send Attendance Report"}{props.val == 3 && props.edit == 0 &&  "Create Workouts"}{props.val == 3 && props.edit != 0 &&  "Edit Workouts"}</div>
        <div
          className="closeicon"
          onClick={(e) => {
            props.setReportAdd(false);
            props.setAttendanceAdd(false);
            props.setWorkoutAdd(false);
          }}
        >
          <CloseIcon></CloseIcon>
        </div>
      </div>
      {props.val == 1 &&
         <div className="inner_input_body">
         <input
           className="Inputfield doc"
           placeholder="Report.."
           // value={UserDetails.name}
           type="file"
           name="report_document"
           onChange={(e) => handleChange3(e)}
         ></input>
         <input
           className="Inputfield"
           placeholder="Day.."
           value={UserDetails1.reportcycle}
           name="reportcycle"
           onChange={(e) => handleChange3(e)}
         ></input>
         {/* <input className='Inputfield' placeholder='Product Usage Type' value={props.NewEnquiry.Product_usage_type} name="Product_usage_type" onChange={e=>handleChange(e)}></input> */}
         <button
           className="Submitbutton"
           onClick={(e) => {
             onSubmit(e);
           }}
         >
           Submit
         </button>
       </div>
      }
      {props.val == 2 &&
         <div className="inner_input_body">
         <input
           className="Inputfield doc"
           placeholder="Report.."
           // value={UserDetails.name}
           type="file"
           name="attendance_document"
           onChange={(e) => handleChange4(e)}
         ></input>
         <input
           className="Inputfield"
           placeholder="Day.."
           value={UserDetails2.attandancecycle}
           name="attandancecycle"
           onChange={(e) => handleChange4(e)}
         ></input>
         {/* <input className='Inputfield' placeholder='Product Usage Type' value={props.NewEnquiry.Product_usage_type} name="Product_usage_type" onChange={e=>handleChange(e)}></input> */}
         <button
           className="Submitbutton"
           onClick={(e) => {
             onSubmit(e);
           }}
         >
           Submit
         </button>
       </div>
      }
      {props.val == 3 &&
         <div className="inner_input_body">
         <input
           className="Inputfield"
           placeholder="Date.."
           type="date"
           value={UserDetails.Date}
           name="Date"
           onChange={(e) => handleChange1(e)}
         ></input>
         <input
           className="Inputfield"
           placeholder="Day.."
           value={UserDetails.Day}
           name="Day"
           onChange={(e) => handleChange1(e)}
         ></input>
         <Select
          className="basic-single"
          classNamePrefix="select"
          isLoading={isLoading}
          isClearable={isClearable}
          isMulti
          isSearchable={isSearchable}
          name="Package.."
          placeholder={"Choose the Muscle"}
          options={Options}
          value={PackageVal !=null && PackageVal !="" ? PackageVal : "Choose the Muscle"}
          onChange={(val) => {
            setUserDetails((prev)=>{
              return{
                  ...prev,["musclegroup"]:""
              }
            })
            setPackageval(val);
            handleChange(val);
            console.log(val)
          }}
        />
        <Select
          className="basic-single"
          classNamePrefix="select"
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          name="TrainerName.."
          placeholder={"Choose the Trainer"}
          options={Options1}
          value={Gender !=null && Gender !="" ? Gender : "Choose the trainer"}
          onChange={(val) => {
            setGender(val);
            handleChange2(val);
          }}
        />
         {/* <input className='Inputfield' placeholder='Product Usage Type' value={props.NewEnquiry.Product_usage_type} name="Product_usage_type" onChange={e=>handleChange(e)}></input> */}
         <button
           className="Submitbutton"
           onClick={(e) => {
             onSubmit(e);
           }}
         >
           Submit
         </button>
       </div>
      }
    </div>
  </div>
  )
}
