import React,{useEffect,useState} from 'react'
import Navbar from './Navbar';
import '../Stylesheets/Home.scss';
import Table from './Table';
import axios from 'axios';
import { URL } from '../Content/Sidebardata';
import Popup from './Popup';
import UserDetails from './UserDetails';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function Users(props) {
  const [menuitem, setMenuitem] = useState(0);
  const [Searchval, setSearchval] = useState("");
  const [AddEnquiries, setAddenquiries] = useState(false);
  const [AddressID, setAddressID] = useState("");
  const [tabledata, setTabledata] = useState([]);
  const [tabledata1, setTabledata1] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [tableColumns, settabelColumns] = useState([]);
  const [tableColumns1, settabelColumns1] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [AddUsers, setAddUsers]=useState(false);
  const [searchdata, setsearchdata] = useState([]);
  const [searchdata1, setsearchdata1] = useState([]);
  

  const handleClick = (e) => {
    setAddressID(e.User_id);
    console.log(e.User_id)
    // axios({
    //   method: "get",
    //   url: URL.URL1 + "api/GetUserAddress/" + e.addressId_id,
    //   headers: { Authorization: accessToken },
    // }).then((response) => {
    //   setAddress(response.data.data);
      
    //   //  console.log(e,"llll")
    //   console.log(AddressID);
    // });
  };

  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event);
    const data = {
      nodes: searchdata.filter((item) =>
             item.reportdate.includes(search) ||
             item.reportremaider.includes(search) ||
             item.User_detail.email.includes(search) ||
             item.User_detail.package.includes(search) ||
             item.User_detail.expirydate.includes(search) ||
             item.User_detail.name.includes(search) ||
             item.User_detail.contact.includes(search)
      ),
    };
    const data1 = {
      nodes: searchdata1.filter((item) =>
             item.attendancedate.includes(search) ||
             item.attendanceremainder.includes(search) ||
             item.User_detail.email.includes(search) ||
             item.User_detail.package.includes(search) ||
             item.User_detail.expirydate.includes(search) ||
             item.User_detail.name.includes(search) || 
             item.User_detail.contact.includes(search)
      ),
    };
    // console.log(data)
    if(event !=""){
      setTabledata(data.nodes)
      setTabledata1(data1.nodes)
    }
    else{
      setTabledata(searchdata)
      setTabledata1(searchdata1)
    }
  };

  const column1=[
    {
        Header: "ID",
        accessor: "id",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='uniqid'>{"#"+row.row.original.User_detail.id}</div>
            </div>
        )
    },
    {
        Header: "Report Date",
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
      Header: "UserDetails",
      accessor: "",
      Cell:(row)=>(
          <div className='Contacts'>
            <div className='Mobile'>{row.row.original.User_detail.name}</div>
            {/* <div className='Email'>{"Next Report: "}{row.row.original.reportremaider}</div> */}
            <div className='Email'>{"Expiry date: "}{row.row.original.User_detail.expirydate}</div>
          </div>
      )
  },
  {
    Header: "Contact",
    accessor: "",
    Cell:(row)=>(
        <div className='Contacts'>
          <div className='Mobile'>{row.row.original.User_detail.contact}</div>
        </div>
    )
}
  ]

  const column2=[
    {
        Header: "ID",
        accessor: "id",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='uniqid'>{"#"+row.row.original.User_detail.id}</div>
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
      Header: "UserDetails",
      accessor: "",
      Cell:(row)=>(
          <div className='Contacts'>
            <div className='Mobile'>{row.row.original.User_detail.name}</div>
            {/* <div className='Email'>{"Next Report: "}{row.row.original.reportremaider}</div> */}
            <div className='Email'>{"Expiry date: "}{row.row.original.User_detail.expirydate}</div>
          </div>
      )
  },
  {
    Header: "Contact",
    accessor: "",
    Cell:(row)=>(
        <div className='Contacts'>
          <div className='Mobile'>{row.row.original.User_detail.contact}</div>
        </div>
    )
}
  ]

  useEffect(()=>{
     props.setshowloader(true)
     settabelColumns(column1)
     axios({method:"get",url:URL.URL1+"Reportremainder",headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
        console.log(response)
        setTabledata(response.data.data)
        setsearchdata(response.data.data)
        props.setshowloader(false)
     })
     settabelColumns1(column2)
     axios({method:"get",url:URL.URL1+"Attendanceremainder",headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
      console.log(response)
      setTabledata1(response.data.data)
      setsearchdata1(response.data.data)
      props.setshowloader(false)
   })
  },[AddUsers])

  return (
    <>
      <div className={`enquiry_wrapper ${props.Mobilebar ? "active" : ""}`}>
        <Navbar
          Mobilebar={props.Mobilebar}
          navbar={"1"}
          setMenuitem={setMenuitem}
          Menuitem={menuitem}
          handleSearch={handleSearch}
          Searchval={Searchval} setSearchval={setSearchval}
        ></Navbar>
        {AddressID =="" && (
          <div className={`row enquiry_inner_wrapper`}>
            <div className={`col-lg-12 enquiry_inner_right_wrapper`}>
              <div className='row remainders'>
                <div className='col-lg-6'>
                    <h5>Report Remainder</h5>
                   <Table columns={tableColumns} data={tabledata} handleClick={handleClick}/>
                </div>
                <div className='col-lg-6'>
                   <h5>Attandance Remainder</h5>
                   <Table columns={tableColumns1} data={tabledata1} handleClick={handleClick}/>
                </div>
              </div>
            </div>
            {/* <div className={`col-xl-2 enquiry_inner_left_wrapper`}>
            <ul>
              <li>
                <span className={`enquirymenuitem ${menuitem === 0 ? "active" : ""}`} onClick={e => setmenuitemfuntion(0)}>New Enquiry</span>
              </li>
              <li>
                <span className={`enquirymenuitem ${menuitem === 1 ? "active" : ""}`} onClick={e => setmenuitemfuntion(1)}>Ongoing Enquiries</span>
                  <ul className={`enquiryinnermenuitem ${menuitem1 ? "active" : ""}`}>
                    <li><span className={`enquiryinnermenuitem1 ${innermenuitem === 1 ? "active" : ""}`} onClick={e => setinnermenuitemfuntion(1)}>Approval Pending</span></li>
                    <li><span className={`enquiryinnermenuitem1 ${innermenuitem === 2 ? "active" : ""}`} onClick={e => setinnermenuitemfuntion(2)}>Changes Required</span></li>
                  </ul>
              </li>
              <li>
                <span className={`enquirymenuitem ${menuitem === 2 ? "active" : ""}`} onClick={e => setmenuitemfuntion(2)}>All Enquiries</span>
              </li>
              <li>
                <span className={`enquirymenuitem ${menuitem === 3 ? "active" : ""}`} onClick={e => setmenuitemfuntion(3)}>Archived</span>
              </li>
            </ul>
            <div className={`midline ${mediumwidth ? "active" : ""}`}></div>
          </div> */}
            {/* <div className='col-lg-2 enquiry_inner_left_wrapper1'>
              <div className='card details_card'>Customer details
              {Address !="" ? Address.map((val)=>{
                return(
                  <>
                    <div>{val.apartmentNo}</div><div>{val.street}</div><div>{val.landmark}</div><div>{val.city}</div><div>{val.state}</div><div>{val.zipcode}</div>{val.mobileno}
                  </>
                )
              }):""}
              </div>
              <div className='card details_card'>Order status</div>
          </div> */}
          </div>
        )}
        {AddUsers && (
            <Popup setshowloader={props.setshowloader} setAddUsers={setAddUsers} accessToken={props.accessToken}></Popup>
        )}
        {AddressID !="" && (
            <UserDetails id={AddressID} setshowloader={props.setshowloader} accessToken={props.accessToken} Role={props.Role}></UserDetails>
        )}
      </div>
    </>
  )
}
