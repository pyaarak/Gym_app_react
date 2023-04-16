import React, { useState } from 'react'
import '../Stylesheets/Enquiry.scss'
import Reactanglemale from '../assets/rectmale-removebg-preview.png';
import Invertedmale from '../assets/invemale-removebg-preview.png';
import Trapemale from '../assets/Trapmale-removebg-preview.png'
import Trianglemale from '../assets/trimale-removebg-preview.png';
import Ovalmale from '../assets/ovalmale-removebg-preview.png';
import ectomale from '../assets/ectomale.png';
import mesomale from '../assets/mesomale.png';
import endomale from '../assets/endomale.png';
import rectfemale from '../assets/rectanglefemale-removebg-preview.png';
import trifemale from '../assets/trianglefemale-removebg-preview.png';
import spoonfemale from '../assets/spoonfemale-removebg-preview.png';
import hourglassfemale from '../assets/hourglass-removebg-preview.png';
import tophourfemale from '../assets/tophourfemale-removebg-preview.png';
import ectofemale from '../assets/ectofemale-removebg-preview.png';
import mesofemale from '../assets/mesofemale-removebg-preview.png';
import endofemale from '../assets/endofemale-removebg-preview.png';
import axios from 'axios';
import { URL } from '../Content/Sidebardata';

export default function Enquiry(props) {
    const [Steps, setSteps] = useState(0)
    const [Imageactive, setImageactive] = useState(0)
    const [Imageactive1, setImageactive1] = useState(0)
    const [UserDetails, setUserDetails] = useState({status:"1",name:"",email:"",gender:"",contact:"",bmi_value:"",bmi_state:"",height:"",weight:"",age:"",fat_percentage:"",fat_state:"",body_type:"",gaol_type:""})
    const handleChange=(e)=>{
          setUserDetails((prev)=>{
             return{
                ...prev,[e.target.name]:e.target.value
             }
          })
    }

    const handlesubmit=(e)=>{
        props.setshowloader(true)
        axios({method:"post",url:URL.URL1+"EnquiryDetails",data:UserDetails,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
          // console.log(response)
        //   props.setAddUsers(false)
          props.setshowloader(false)
          window.location.href="/enquiry"
        }).catch((error)=>{
          props.setshowloader(false)
        })
    }

    const handleImageclick1=(e)=>{
        if(e==1){
            setImageactive1(1)
            setUserDetails((prev)=>{
                return{
                    ...prev,["gaol_type"]:"Ectomorph"
                }
            })
        }
        if(e==2){
            setImageactive1(2)
            setUserDetails((prev)=>{
                return{
                    ...prev,["gaol_type"]:"Mesomorph"
                }
            })
            
        }
        if(e==3){
            setImageactive1(3)
            setUserDetails((prev)=>{
                return{
                    ...prev,["gaol_type"]:"Endomorph"
                }
            })
           
        }
    }

    const handleImageclick=(e)=>{
        if(e==1){
            setImageactive(1)
            if(UserDetails.gender == "Male"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Reactangel"
                    }
                })
            }
            if(UserDetails.gender == "Female"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Reactangel"
                    }
                })
            }
        }
        if(e==2){
            setImageactive(2)
            if(UserDetails.gender == "Male"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Inverted Triangel"
                    }
                })
            }
            if(UserDetails.gender == "Female"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Triangel"
                    }
                })
            }
        }
        if(e==3){
            setImageactive(3)
            if(UserDetails.gender == "Male"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Trapezoid"
                    }
                })
            }
            if(UserDetails.gender == "Female"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Spoon"
                    }
                })
            }
        }
        if(e==4){
            setImageactive(4)
            if(UserDetails.gender == "Male"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Triangle"
                    }
                })
            }
            if(UserDetails.gender == "Female"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Hour Glass"
                    }
                })
            }
        }
        if(e==5){
            setImageactive(5)
            if(UserDetails.gender == "Male"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Oval"
                    }
                })
            }
            if(UserDetails.gender == "Female"){
                setUserDetails((prev)=>{
                    return{
                        ...prev,["body_type"]:"Top Hourglass"
                    }
                })
            }
        }
    }
    const Bmicalculate=(e)=>{
        let val=(Number(UserDetails.weight)/((Number(UserDetails.height)*0.01)*(Number(UserDetails.height)*0.01))).toFixed(2)
        let state=""
        setUserDetails((prev)=>{
            return{
                ...prev,["bmi_value"]:val
            }
        })
        if(val < 18.5){
           state="Unserweight"
        }
        else if(val >= 18.5 && val <= 24.9){
            state="Healthy Weight"
        }
        else if(val >= 25.0 && val <= 29.9){
            state="Overweight"
        }
        else if(val >= 30.0){
            state="Obesity"
        }
        setUserDetails((prev)=>{
            return{
                ...prev,["bmi_state"]:state
            }
        })
    }

    const Fatcalculate=(e)=>{
        let val=(1.20*Number(UserDetails.bmi_value))+(0.23*Number(UserDetails.age))  
        let state=""
        if(UserDetails.gender == "Male"){
            val=(val-16.2).toFixed(2)
        }
        else if (UserDetails.gender == "Female"){
            val=(val-5.4).toFixed(2)
        }
        setUserDetails((prev)=>{
            return{
                ...prev,["fat_percentage"]:val
            }
        })
        if(UserDetails.age >= 20 && UserDetails.age <= 40){
            if(UserDetails.gender == "Male"){
                if(val < 21){
                    state="Underfat"
                }
                else if(val >= 21 && val < 33){
                    state="Healthy"
                }
                else if(val >= 33 && val <= 39){
                    state="Overweight"
                }
                else if(val > 39){
                    state="Obese"
                }
            }
            if(UserDetails.gender == "Female"){
                if(val < 8){
                    state="Underfat"
                }
                else if(val >= 8 && val < 19){
                    state="Healthy"
                }
                else if(val >= 19 && val <= 25){
                    state="Overweight"
                }
                else if(val > 25){
                    state="Obese"
                }
            }
        }
        else if(UserDetails.age >= 41 && UserDetails.age <= 60){
            if(UserDetails.gender == "Male"){
                if(val < 23){
                    state="Underfat"
                }
                else if(val >= 23 && val < 35){
                    state="Healthy"
                }
                else if(val >= 35 && val <= 40){
                    state="Overweight"
                }
                else if(val > 40){
                    state="Obese"
                }
            }
            if(UserDetails.gender == "Female"){
                if(val < 11){
                    state="Underfat"
                }
                else if(val >= 11 && val < 22){
                    state="Healthy"
                }
                else if(val >= 22 && val <= 27){
                    state="Overweight"
                }
                else if(val > 27){
                    state="Obese"
                }
            }
        }
        else if(UserDetails.age >= 61 && UserDetails.age <= 79){
            if(UserDetails.gender == "Male"){
                if(val < 24){
                    state="Underfat"
                }
                else if(val >= 24 && val < 36){
                    state="Healthy"
                }
                else if(val >= 36 && val <= 42){
                    state="Overweight"
                }
                else if(val > 42){
                    state="Obese"
                }
            }
            if(UserDetails.gender == "Female"){
                if(val < 13){
                    state="Underfat"
                }
                else if(val >= 13 && val < 25){
                    state="Healthy"
                }
                else if(val >= 25 && val <= 30){
                    state="Overweight"
                }
                else if(val > 30){
                    state="Obese"
                }
            }
        }
        setUserDetails((prev)=>{
            return{
                ...prev,["fat_state"]:state
            }
        })
    }
  return (
    <div className='Enquiry_Wrapper'>
        <div className='Enquiry_Inner_Wrapper'>
             {Steps == 0 &&
                  <div className='card UserInfoCard'>
                  <p>USER INFO</p>
                  <input type='text' name='name' placeholder='Enter name...' value={UserDetails.name} onChange={e=>{handleChange(e)}}></input>
                  <input type='text' name='email' placeholder='Enter Email...' value={UserDetails.email} onChange={e=>{handleChange(e)}}></input>
                  <input type='text' name='contact' placeholder='Enter Contact...' value={UserDetails.contact} onChange={e=>{handleChange(e)}}></input>  
                  <select name='gender' placeholder='Choose Gender...' value={UserDetails.gender} onChange={e=>handleChange(e)}>
                      <option value={""}>Please Select Gender...</option>
                      <option value={"Male"}>Male</option>
                      <option value={"Female"}>Female</option>  
                  </select>  
                  {(UserDetails.name !="" && UserDetails.contact !="" && UserDetails.gender !="") && <button className='Next_button' onClick={e=>{setSteps(Number(Steps)+1)}}>Next</button>}
             </div>
             }
             {Steps == 1 &&
                  <div className='card UserInfoCard'>
                  <p>BMI CACLCULATOR</p>
                  <input type='text' name='height' placeholder='Enter Height in CM...' value={UserDetails.height} onChange={e=>{handleChange(e)}}></input>
                  <input type='text' name='weight' placeholder='Enter Weight in KG...' value={UserDetails.weight} onChange={e=>{handleChange(e)}}></input>  
                  {UserDetails.bmi_state != "" && <p className={`${UserDetails.bmi_state == "Unserweight" ? "yellow" : UserDetails.bmi_state == "Healthy Weight" ? "green" : UserDetails.bmi_state == "Overweight" ? "orange" : "red"}`}>{UserDetails.bmi_value} {" "} {UserDetails.bmi_state}</p>}  
                  <div><button className='Next_button' onClick={e=>{if(Steps!=0){setSteps(Number(Steps)-1)}}}>Back</button>{(UserDetails.bmi_value !="" && UserDetails.bmi_state!="") ? <button className='Next_button' onClick={e=>{setSteps(Number(Steps)+1)}}>Next</button> : <button className='Next_button' onClick={e=>{Bmicalculate(e)}}>Calculate</button> }</div>
             </div>
             }
             {Steps == 2 &&
                  <div className='card UserInfoCard'>
                  <p>FAT PERCENTAGE</p>
                  <input type='text' name='age' placeholder='Enter age...' value={UserDetails.age} onChange={e=>{handleChange(e)}}></input>  
                  {UserDetails.fat_state != "" && <p className={`${UserDetails.fat_state == "Underfat" ? "yellow" : UserDetails.fat_state == "Healthy" ? "green" : UserDetails.fat_state == "Overweight" ? "orange" : "red"}`}>{UserDetails.fat_percentage} {" "} {UserDetails.fat_state}</p>}  
                  <div><button className='Next_button' onClick={e=>{if(Steps!=0){setSteps(Number(Steps)-1)}}}>Back</button>{(UserDetails.fat_percentage !="" && UserDetails.fat_state!="") ? <button className='Next_button' onClick={e=>{setSteps(Number(Steps)+1)}}>Next</button> : <button className='Next_button' onClick={e=>{Fatcalculate(e)}}>Calculate</button> }</div>
             </div>
             }
             {Steps == 3 &&
                  <div className='card UserInfoCard'>
                  <p>Select YOUR BODY TYPE</p>
                  <div className='row'>
                    <div className='col-1 none'></div>
                    <div className={`col-2 ${Imageactive == 1 && "active"}`} onClick={e=>{handleImageclick(1)}}><img src={UserDetails.gender == "Male" ? Reactanglemale : rectfemale}></img></div>
                    <div className={`col-2 ${Imageactive == 2 && "active"}`} onClick={e=>{handleImageclick(2)}}><img src={UserDetails.gender == "Male" ? Invertedmale : trifemale}></img></div>
                    <div className={`col-2 ${Imageactive == 3 && "active"}`} onClick={e=>{handleImageclick(3)}}><img src={UserDetails.gender == "Male" ? Trapemale : spoonfemale}></img></div>
                    <div className={`col-2 ${Imageactive == 4 && "active"}`} onClick={e=>{handleImageclick(4)}}><img src={UserDetails.gender == "Male" ? Trianglemale : hourglassfemale}></img></div>
                    <div className={`col-2 ${Imageactive == 5 && "active"}`} onClick={e=>{handleImageclick(5)}}><img src={UserDetails.gender == "Male" ? Ovalmale : tophourfemale}></img></div>
                    <div className='col-1 none'></div>
                  </div>
                  <div><button className='Next_button' onClick={e=>{if(Steps!=0){setSteps(Number(Steps)-1)}}}>Back</button>{(UserDetails.body_type !="") && <button className='Next_button' onClick={e=>{setSteps(Number(Steps)+1)}}>Next</button>}</div>
             </div>
             }
             {Steps == 4 &&
                  <div className='card UserInfoCard'>
                  <p>Select YOUR GOAL TYPE</p>
                  <div className='row'>
                    {/* <div className='col-1 none'></div> */}
                    <div className={`col-4 ${Imageactive1 == 1 && "active"}`} onClick={e=>{handleImageclick1(1)}}><img src={UserDetails.gender == "Male" ? ectomale : ectofemale}></img></div>
                    <div className={`col-4 ${Imageactive1 == 2 && "active"}`} onClick={e=>{handleImageclick1(2)}}><img src={UserDetails.gender == "Male" ? mesomale : mesofemale}></img></div>
                    <div className={`col-4 ${Imageactive1 == 3 && "active"}`} onClick={e=>{handleImageclick1(3)}}><img src={UserDetails.gender == "Male" ? endomale : endofemale}></img></div>
                    {/* <div className='col-1 none'></div> */}
                  </div>
                  <div><button className='Next_button' onClick={e=>{if(Steps!=0){setSteps(Number(Steps)-1)}}}>Back</button>{(UserDetails.gaol_type !="") && <button className='Next_button' onClick={e=>{handlesubmit(e)}}>Submit</button>}</div>
             </div>
             }
        </div>
    </div>
  )
}
