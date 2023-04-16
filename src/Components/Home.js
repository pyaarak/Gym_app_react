import React,{useEffect,useState,useRef} from 'react'
import Navbar from './Navbar';
import '../Stylesheets/Home.scss';
import Table from './Table';
import axios from 'axios';
import { URL } from '../Content/Sidebardata';
import Popup from './Popup';
import UserDetails from './UserDetails';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

export default function Home(props) {
  const [menuitem, setMenuitem] = useState(0);
  const [Searchval, setSearchval] = useState("");
  const [AddEnquiries, setAddenquiries] = useState(false);
  const [AddressID, setAddressID] = useState("");
  const [tabledata, setTabledata] = useState([]);
  const [searchdata, setsearchdata] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [tableColumns, settabelColumns] = useState([]);
  const [pageSize, setPageSize] = useState(1);
  const [AddUsers, setAddUsers]=useState(false)
  const tableRef = useRef(null);

  const handleClick = (e) => {
    setAddressID(e.id);
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
             item.name.includes(search) ||
             item.contact.includes(search) ||
             item.email.includes(search) ||
             item.package.includes(search) ||
             item.expirydate.includes(search) 
      ),
    };
    // console.log(data)
    if(event !=""){
      setTabledata(data.nodes)
    }
    else{
      setTabledata(searchdata)
    }
  };

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, "Sample" + fileExtension);
    }

  const column=[
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
        Header: "Name",
        accessor: "name",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='username'>{row.row.original.name}</div>
            </div>
        )
    },
    {
        Header: "Contact",
        accessor: "contact",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='Mobile'>{row.row.original.contact}</div>
              <div className='Email'>{row.row.original.email}</div>
            </div>
        )
    },
    {
        Header: "Package",
        accessor: "package",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package'>{row.row.original.package}</div>
            </div>
        )
    },
    {
        Header: "Expiray Date",
        accessor: "expirydate",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='ExpiryDate'>{row.row.original.expirydate}</div>
            </div>
        )
    },
    {
        Header: "Day Count",
        accessor: "",
        Cell:(row)=>(
            <div className='Contacts'>
              <div className='package'>{Math.ceil((new Date(row.row.original.expirydate).getTime() - new Date().getTime())/(1000 * 3600 * 24)) >=0 ? Math.ceil((new Date(row.row.original.expirydate).getTime() - new Date().getTime())/(1000 * 3600 * 24)) : "N/A" }</div>
            </div>
        )
    },
  ]

  useEffect(()=>{
     props.setshowloader(true)
     settabelColumns(column)
     axios({method:"get",url:URL.URL1+"UserDetails",headers:{Authorization:"Bearer "+props.accessToken,"Content-Type":"application/JSON"}}).then((response)=>{
        console.log(response,"liiiiii_liiiiii")
        setTabledata(response.data.data)
        setsearchdata(response.data.data)
        props.setshowloader(false)
     }).catch((error)=>{
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
              <h4 className="Header_Name">
                 {"Users"}
              </h4>
              {/* <input className='input_search' type={"text"} placeholder={"Order Id/Phone No.."} value={""}></input> */}
              {(
                <div>
                  <button
                  className="addenquiriesbutton"
                  onClick={(e) => {
                    setAddUsers(!AddUsers);
                  }}
                >
                  + New
                </button>
                 {props.Role == 1 && 

                   <button className="addenquiriesbutton" onClick={e=>{exportToCSV(tabledata)}}> Export excel </button>

                }
                </div>
              )}
              <Table columns={tableColumns} data={tabledata} handleClick={handleClick} ref={tableRef}/>
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
            <Popup id={0} setAddUsers={setAddUsers} accessToken={props.accessToken} setshowloader={props.setshowloader}></Popup>
        )}
        {AddressID !="" && (
            <UserDetails id={AddressID} accessToken={props.accessToken} setshowloader={props.setshowloader} Role={props.Role}></UserDetails>
        )}  
      </div>
    </>
  )
}
