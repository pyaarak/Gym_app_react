// import Home from '../Components/Home'
// import Enquirystats from '../Components/Enquirystats'
// import Homeimg from '../assets/1.Home.png'
// import Enquiryimg from '../assets/2.Enquiries.png'
// import Orderimg from '../assets/3.Order.png'
// import Menuimg from '../assets/5.Menu.png'
// import Supportimg from '../assets/4.Support.png'

import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WidgetsIcon from '@mui/icons-material/Widgets';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

export const Sidebardata=[
    {
        uniqkey:0,
        id:"Home",
        path:"/",
        // element:<Home></Home>
        img:<HomeIcon></HomeIcon>
    },
    {
        uniqkey:1,
        id:"Users",
        path:"/Users",
        img:<PostAddIcon></PostAddIcon>,
    },
    {
        uniqkey:2,
        id:"Enquiry",
        path:"/EnquiryDetails",
        img:<PostAddIcon></PostAddIcon>,
    }
]

export const URL={
   "URL1":"http://localhost:5000/"
}