import React, { useEffect, useState } from 'react'
import { Sidebardata } from '../Content/Sidebardata'
import '../Stylesheets/Sidebar.scss'
import Logo from '../assets/photo.jpg'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export default function Sidebar(props) {
   const [mobilewidth, setMobilbewidth] = useState(false)
   const [activate , setActivate] = useState(0)
   const [showmenu, setshowmenu] = useState(0)
   const [submenu, setsubmenu]=useState(200)
   const [subshowmenu, setsubshowmenu] = useState(200)


   useEffect(()=>{
     const location= window.location.href.split("/")
     console.log()
     if(location.includes("Users")){
       setActivate(1)
       setshowmenu(1)
       if(props.submenu == 1 || props.submenu == 2){
        setsubmenu(100)
       }
     }
     if(location.includes("EnquiryDetails")){
      setActivate(2)
      // setshowmenu(2)
    }
    if(location.includes("MenuStats")){
      setActivate(3)
      setshowmenu(3)
    }
    if(location.includes("SupportStats")){
      setActivate(4)
      setshowmenu(4)
    }
   },[])

   const mobilewidthfunction= ()=>{
      setMobilbewidth(!mobilewidth)
      props.setMobilebar(!mobilewidth)
   }
  return (
    <div className={`sidebar_wrapper ${!mobilewidth ? "" :"mobile"}`}>
        <div className={`sidebar_wrapper_inner`}>
        <div className='Imglogo'><img alt="" src={Logo} width={30} height={30}></img>{!mobilewidth ? "FIKA" : ""}</div>
           <ul>
              {/* <span className={`Logo ${!mobilewidth ? "" : "mobile"}`}></span><span onClick={e=>mobilewidthfunction()} className={`arrowimg ${mobilewidth ? "" : "mobile"}`}><img alt="arrow" src={imgarrow} width={30} height={30}/></span> */}
              <div className='brline'><div className='brline_inner'></div></div>
              {!mobilewidth &&
               Sidebardata.map((ele)=>{
                 return(
                    <>
                      <li key={ele.id} className={`mainmenu ${activate === ele.uniqkey ? "activate" : ""}`} onClick={e=>{window.location.href=ele.path}}>
                        <span>{ele.img}</span><a>{ele.id}</a>
                      </li>
                    </>
                 )
               })
              }
               {mobilewidth &&
               Sidebardata.map((ele)=>{
                 return(
                    <li key={ele.id} className={`mainmenu ${activate === ele.uniqkey ? "activate" : ""}`}>
                        <a href={ele.path}>{ele.img}</a>
                    </li>
                 )
               })
              }
           </ul>
           <div onClick={e=>mobilewidthfunction()} className={`arrowimg ${mobilewidth ? "" : "mobile"}`}>{!mobilewidth && <ArrowBackIosIcon></ArrowBackIosIcon>}{mobilewidth && <ArrowForwardIosIcon></ArrowForwardIosIcon>}</div>
        </div>
    </div>
  )
}