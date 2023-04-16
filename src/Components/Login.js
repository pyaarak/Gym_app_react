import React, {useState} from "react"
import '../Stylesheets/Login.scss'
import axios from 'axios'
import { URL } from "../Content/Sidebardata"
import Logo from '../assets/photo.jpg'


export default function Login() {
    const [Logindetails, setLoginDetails] = useState({email:"",password:""})

    

    const Changehandle=(e)=>{
        setLoginDetails({
            ...Logindetails,
            [e.target.name]:e.target.value
        })
    }

    const Clickhandle=(e)=>{
        setTimeout(()=>{
            axios({method:"post",url:URL.URL1+"logindetails/login",data:Logindetails}).then((response)=>{
                console.log(response.data)
                if(response.data){
                    localStorage.setItem("logindetails",JSON.stringify(response.data))
                    // store.dispatch(loginfunction(response.data))
                    // store.dispatch(loggedin(response.data))
                    window.location.href="/"
                }
                else{
                }
            }).catch((error)=>{
                console.log(error)
                // Swal.fire({

                // })
            })
        },200)
    }


  return (
    <div className='Login_Home_wrapper'>
        <div className='Login_inner_wrapper'>
             <div className='Login_form_container'>
                 <div className='login_form_filed'>
                  <img src={Logo} width="70" height={70}></img>
                 <div className='form_fileds'>
                    <input type="text" placeholder='Username' name='email' value={Logindetails.email} onChange={e=>Changehandle(e)}></input>
                 </div>
                 <div className='form_fileds'>
                    <input type="text" placeholder='Password' name='password' value={Logindetails.password} onChange={e=>Changehandle(e)}></input>
                 </div>
                 <div className='form_button'>
                     <button className='form_button_register' onClick={e=>Clickhandle(e)}>Login</button>
                 </div>
                 </div>
             </div>
        </div>
    </div>
  )
}
