import React, { useEffect, useState } from 'react'
import '../Stylesheets/UserDetails.scss'
import axios from 'axios'
import { URL } from '../Content/Sidebardata'
import CloseIcon from "@mui/icons-material/Close";
import Table from './Table';
import Popup1 from './Popup1';
import Popup from './Popup';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Swal from 'sweetalert2'

export default function UserDetails(props) {
  const [UserDetails, setUserDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [tabledata, setTabledata] = useState([]);
  const [tabledata1, setTabledata1] = useState([]);
  const [tabledata2, setTabledata2] = useState([]);
  const [tabledata3, setTabledata3] = useState([]);
  const [tableColumns, settabelColumns] = useState([]);
  const [reportAdd, setReportAdd] = useState(false);
  const [WorkoutAdd, setWorkoutAdd] = useState(false);
  const [AttendanceAdd, setAttendanceAdd] = useState(false);
  const [Userid, setUserId] = useState("");
  const [AddUsers, setAddUsers]=useState(false)
  const [email, setEmail] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [edit, setEdit] = useState(0);
  useEffect(()=>{
    props.setshowloader(true)
    axios({method:"get",url:URL.URL1+"UserDetails/"+props.id,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
       console.log(response)
       if(response.data.data !=null){
         setUserDetails(response.data.data)
         setShowDetails(true)
         setUserId(response.data.data.id)
         setTabledata2(response.data.data.workouts)
         setEmail(response.data.data.email)
        //  setTabledata1(response.data)
        props.setshowloader(false)
       }
    })
  },[WorkoutAdd])

  const DeleteFunction=(e)=>{
    Swal.fire({
      title: 'Are you sure want to delete this user',
      text: '',
      icon: 'warning',
      showCloseButton: true,
      showCancelButton:false,
      confirmButtonText:"Okay",
      denyButtonText:"Cancel"
    }).then((result)=>{
      if(result.isConfirmed){
        const formData=new FormData();
        formData.append("status",0);
        props.setshowloader(true);
        axios({method:"put",url:URL.URL1+"UserDetails/"+props.id,data:formData,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((reposnse)=>{
           window.location.href="/Users"  
        }).catch((error)=>{
           props.setshowloader(false)
        })
      }
    })  
  }

  useEffect(()=>{
    props.setshowloader(true)
    axios({method:"get",url:URL.URL1+"UserDetails/"+props.id,headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
      console.log(response)
      if(response.data.data !=null){
        // setUserDetails(response.data.data)
        // setShowDetails(true)
        setUserId(response.data.data.id)
        setTabledata1(response.data.data.workouts)
        setEmail(response.data.data.email)
        let l1=[]
        let l2=[]
        if(response.data.data.Reports.length > 0){
          console.log("liiiiii",response.data.data.Reports.length)
          response.data.data.Reports.map((ele)=>{
             if(ele.attendance_document !=null){
              l2.push(ele)
             }
             else{
               l1.push(ele)
             } 
          })
          setTabledata1(l1)
          setTabledata3(l2)
          props.setshowloader(false)
        }
        if(response.data.data.Reports.length == 0){
          setTabledata1([])
          setTabledata3([])
          props.setshowloader(false)
        }
      }
   }).catch((error)=>{
     props.setshowloader(false)
   })
  },[refresh])

  const column1=[
    {
        Header: "ID",
        accessor: "id",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='uniqid'>{"#"+row.row.original.id}</div>
            </div>
        )
    },
    {
        Header: "Date",
        accessor: "contact",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='Mobile'>{"Report Date: "}{row.row.original.reportdate}</div>
              <div className='Email'>{"Next Report: "}{row.row.original.reportremaider}</div>
              <div className='Email'>{"Cycle: "}{row.row.original.reportcycle}</div>
            </div>
        )
    },
    {
        Header: "Document",
        accessor: "package",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package' onClick={e=>{window.open(row.row.original.report_document)}}><FileDownloadIcon></FileDownloadIcon></div>
            </div>
        )
    },
  ]

  const column2=[
    {
        Header: "ID",
        accessor: "id",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='uniqid'>{"#"+row.row.original.id}</div>
            </div>
        )
    },
    {
        Header: "Date",
        accessor: "contact",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='Mobile'>{"Attendance: "}{row.row.original.attendancedate}</div>
              <div className='Email'>{"Remainder: "}{row.row.original.attendanceremainder}</div>
              <div className='Email'>{"Cycle: "}{row.row.original.attandancecycle}</div>
            </div>
        )
    },
    {
        Header: "Document",
        accessor: "package",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package' onClick={e=>{window.open(row.row.original.attendance_document)}}><FileDownloadIcon></FileDownloadIcon></div>
            </div>
        )
    },
  ]


  const column3=[
    {
        Header: "ID",
        accessor: "id",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='uniqid'>{"#"+row.row.original.id}</div>
            </div>
        )
    },
    {
        Header: "Date",
        accessor: "Date",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='Mobile'>{row.row.original.Date}</div>
            </div>
        )
    },
    {
        Header: "Day",
        accessor: "Day",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package'>{row.row.original.Day}</div>
            </div>
        )
    },
    {
        Header: "Muscle Group",
        accessor: "musclegroup",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package'>{row.row.original.musclegroup}</div>
            </div>
        )
    },
    {
        Header: "Trainer Name",
        accessor: "trainername",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package'>{row.row.original.trainername}</div>
            </div>
        )
    },
    {
      Header: "Action",
      accessor: "Action",
      Cell:(row)=>(
          <div className='Contacts'>
            <div className='' onClick={e=>{setWorkoutAdd(true);setEdit(row.row.original.id)}}>{"Edit"}</div>
          </div>
      )
  },
  ]

  const handleClick=(e)=>{

  }

  return (
    <>
    <div className='UserDetails_Wrapper'>
        <div className='UserDetails_Inner_Wrapper'>
            <CloseIcon
              className="svgbackspace"
              onClick={(e) => {
                    props.setAddressID("");   
              }}
            ></CloseIcon>
            <div className='Editbuttons'><button onClick={e=>{setAddUsers(true)}}>Edit</button>
            {props.Role == 1 && <button onClick={e=>{DeleteFunction(e)}}>Delete</button>}</div>
            <div className='row'>
              <div className='col-lg-5'>
               {showDetails &&
                  <div className='card UserDetailscard'>
                     <h6>Details</h6>
                     <p><p className='Header'>Name : </p><p className='Content'>{UserDetails.name}</p></p>
                     <p><p className='Header'>Contact : </p><p className='Content'>{UserDetails.contact}</p></p>
                     <p><p className='Header'>Expiry Date : </p><p className='Content'>{UserDetails.expirydate}</p></p>
                     <p><p className='Header'>No of Days left : </p><p className='Content'>{Math.ceil((new Date(UserDetails.expirydate).getTime() - new Date().getTime())/(1000 * 3600 * 24)) >=0 ? Math.ceil((new Date(UserDetails.expirydate).getTime() - new Date().getTime())/(1000 * 3600 * 24)) : "N/A" }</p></p>
                     <p><p className='Header'>Package : </p><p className='Content'>{UserDetails.package}</p></p>
                  </div>
               }
              </div>
            </div>
            <div className='row reportdetails'>
                <div className='col-lg-6 Report'>
                    <h5>Reports </h5><button className='addbutton' onClick={e=>{setReportAdd(true)}}>+ Add</button>
                    <Table columns={column1} data={tabledata1} handleClick={handleClick}></Table>
                </div>
                <div className='col-lg-6 attandance'>
                    <h5>Attandance</h5><button className='addbutton' onClick={e=>{setAttendanceAdd(true)}}>+ Add</button>
                    <Table columns={column2} data={tabledata3} handleClick={handleClick}></Table>
                </div>
            </div>
            <div className='row WorkoutShedules'>
                <div className='col-lg-12 attandance'>
                    <h3>Workouts</h3><button className='addbutton' onClick={e=>{setWorkoutAdd(true);setEdit(0)}}>+ Add</button>
                    <Table columns={column3} data={tabledata2} handleClick={handleClick}></Table>
                </div>
            </div>
        </div>
    </div>
    {reportAdd &&(
        <Popup1 setReportAdd={setReportAdd} setAttendanceAdd={setAttendanceAdd} setWorkoutAdd={setWorkoutAdd} val={"1"} User_id={Userid} email={email} accessToken={props.accessToken} setRefresh={setRefresh} refresh={refresh} setshowloader={props.setshowloader}></Popup1>
    )}
    {AttendanceAdd &&(
        <Popup1 setReportAdd={setReportAdd} setAttendanceAdd={setAttendanceAdd} setWorkoutAdd={setWorkoutAdd} val={"2"} User_id={Userid} email={email} accessToken={props.accessToken} setRefresh={setRefresh} refresh={refresh} setshowloader={props.setshowloader} ></Popup1>
    )}
    {WorkoutAdd &&(
        <Popup1 setReportAdd={setReportAdd} setAttendanceAdd={setAttendanceAdd} setWorkoutAdd={setWorkoutAdd} val={"3"} User_id={Userid} accessToken={props.accessToken} setRefresh={setRefresh} refresh={refresh} setshowloader={props.setshowloader} setEdit={setEdit} edit={edit}></Popup1>
    )}
    {AddUsers && (
      <Popup setAddUsers={setAddUsers} id={Userid} accessToken={props.accessToken} setshowloader={props.setshowloader}></Popup>
    )

    }
    </>
  )
}
