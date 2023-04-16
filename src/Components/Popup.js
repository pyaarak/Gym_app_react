// import React from 'react'
import React, { useEffect, useState } from "react";
import "../Stylesheets/Popup.scss";
import Select from "react-select";
import axios from "axios";
// import Logo from "../assets/Logo.png";
import Logo from '../assets/photo.jpg'
import { URL } from "../Content/Sidebardata";
import CloseIcon from "@mui/icons-material/Close";

export default function Popup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [Options, setOptions] = useState([]);
  const [PackageVal, setPackageval] = useState();
  const [Options1, setOptions1] = useState([]);
  const [Gender, setGender] = useState();
  const [UserDetails, setUserDetails] = useState({name:"",email:"",contact:"",gender:"",expirydate:"",package:"",status:1})



  const onSubmit=(e)=>{
      if(props.id == 0){
        props.setshowloader(true)
        axios({method:"post",url:URL.URL1+"UserDetails",data:UserDetails,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
          // console.log(response)
          props.setAddUsers(false)
          props.setshowloader(false)
        }).catch((error)=>{
          props.setshowloader(false)
        })
      }
      else{
        props.setshowloader(true)
        axios({method:"put",url:URL.URL1+"UserDetails/"+props.id,data:UserDetails,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
          // console.log(response)
          props.setAddUsers(false)
          props.setshowloader(false)
        }).catch((error)=>{
          props.setshowloader(false)
        })
      }
  }

  const handleChange1=(e)=>{
      setUserDetails((prev)=>{
        return{
            ...prev,[e.target.name]:e.target.value
        }
      })
  }

  const handleChange=(e)=>{
     if(e!=null){
        setUserDetails((prev)=>{
            return{
                ...prev,["package"]:e.value
            }
         })
     }
  }

  const handleChange2=(e)=>{
    if(e!=null){
        setUserDetails((prev)=>{
            return{
                ...prev,["gender"]:e.value
            }
         })
    }
 }

  const createOption = (label) => ({
        label,
        value: label,
  });

  useEffect(()=>{
    let option=[]
    option.push(createOption("package1"))
    option.push(createOption("package2"))
    option.push(createOption("package3"))
    option.push(createOption("package4"))
    option.push(createOption("package5"))

    let option2=[]
    option2.push(createOption("Male"))
    option2.push(createOption("Female"))

    setOptions(option)
    setOptions1(option2)
    if(props.setAddUsers){
      props.setshowloader(true)
      axios({method:"get",url:URL.URL1+"UserDetails/"+props.id,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
        console.log(response)
        if(response.data.data!=null){
          setUserDetails(response.data.data)
          setPackageval(createOption(response.data.data.package))
          setGender(createOption(response.data.data.gender))
        }
        props.setshowloader(false)
      }).catch((error)=>{
        props.setshowloader(false)
      })
    }
  },[])

  return (
    <div className="Popup_outer_Wrapper">
    <div className="Popup_inner_Wrapper">
      <div className="popup_header">
        <img src={Logo} width={50} height={50}></img>
        <div className="popup_header_content">{props.id == 0 && "Create New Users"}{props.id != 0 && "Edit Users"}</div>
        <div
          className="closeicon"
          onClick={(e) => {
              props.setAddUsers(false);
          }}
        >
          <CloseIcon></CloseIcon>
        </div>
      </div>
      <div className="inner_input_body">
        <input
          className="Inputfield"
          placeholder="Name.."
          value={UserDetails.name}
          name="name"
          onChange={(e) => handleChange1(e)}
        ></input>
        <input
          className="Inputfield"
          placeholder="Email.."
          value={UserDetails.email}
          name="email"
          onChange={(e) => handleChange1(e)}
        ></input>
        <input
          className="Inputfield"
          placeholder="Contact.."
          value={UserDetails.contact}
          name="contact"
          onChange={(e) => handleChange1(e)}
        ></input>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          name="Gender.."
          placeholder={"Choose the Gender"}
          options={Options1}
          value={Gender != null ? Gender : "Choose the Gender"}
        //   value={}
          onChange={(val) => {
            setGender(val);
            handleChange2(val);
          }}
        ></Select>
        <input
          className="Inputfield"
          type="date"
          placeholder="Expiry Date.."
          value={UserDetails.expirydate}
          name="expirydate"
          onChange={(e) => handleChange1(e)}
        ></input>
        <Select
          className="basic-single"
          classNamePrefix="select"
          isLoading={isLoading}
          isClearable={isClearable}
          isSearchable={isSearchable}
          name="Package.."
          placeholder={"Choose the package"}
          options={Options}
          value={PackageVal !=null ? PackageVal : "Choose the package"}
          onChange={(val) => {
            setPackageval(val);
            handleChange(val);
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
    </div>
  </div>
  )
}
