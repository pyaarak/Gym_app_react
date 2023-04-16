import React from 'react'
import '../Stylesheets/Loader.scss'
import Loaderimg from '../assets/loading.gif'

export default function Loader(props) {
  return (
    <div className={`Loader_Wrapper ${props.Mobilebar ? "active" : ""}`}>
       <div className='Loader_Inner_Wrapper'>
           <img src={Loaderimg}></img>
       </div>
    </div>
  )
}
