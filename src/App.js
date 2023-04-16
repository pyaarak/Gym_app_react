import logo from './logo.svg';
import './App.css';
import Sidebar from './Components/Sidebar';
import { useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import { BrowserRouter as Router,Routes,Route, json } from 'react-router-dom';
import Users from './Components/Users';
import Login from './Components/Login';
import Loader from './Components/Loader';
import Enquiry from './Components/Enquiry';
import EnquiryDetails from './Components/EnquiryDetails';

function App() {
  const [mobilebar, setMobilebar] = useState(false)
  const [Loggedin, setLoggedin] = useState(false)
  const [accessToken, setaccesstoken] = useState("");
  const [Role, setRole] = useState("");
  const [showLoader, setshowloader] = useState(false);
  // const [userName, setUsername] = useState("");

  useEffect(()=>{
     const div=localStorage.getItem("logindetails")
     if(div){
      const dict=JSON.parse(div)
      console.log(dict.session.token)
      if(dict.session.token !=null){
        setLoggedin(true)
        console.log(dict.session.token)
        setaccesstoken(dict.session.token)
        setRole(dict.data.role)
      }
     }
     else{
      setLoggedin(false)
     }
  },[])

  return (
    <div className="App">
      {Loggedin ? <>
      {!window.location.href.split("/").includes("enquiry") && <Sidebar mobilebar={mobilebar} setMobilebar={setMobilebar}></Sidebar>}
      {showLoader && <Loader></Loader> }
      <Router>
        <Routes>
          <Route path='/' element={<Users Mobilebar={mobilebar} accessToken={accessToken} Role={Role} setshowloader={setshowloader}></Users>}></Route>
          <Route path='/Users' element={<Home Mobilebar={mobilebar} accessToken={accessToken} Role={Role} setshowloader={setshowloader}></Home>}></Route>
          <Route path='/enquiry' element={<Enquiry Mobilebar={mobilebar} setshowloader={setshowloader} accessToken={accessToken}></Enquiry>}></Route>
          <Route path='/EnquiryDetails' element={<EnquiryDetails Mobilebar={mobilebar} accessToken={accessToken} Role={Role} setshowloader={setshowloader}></EnquiryDetails>}></Route>
        </Routes>
      </Router>
      </>
      :
      <Login></Login>
      }
    </div>
  );
}

export default App;
