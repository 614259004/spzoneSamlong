import React,{useState, useEffect} from 'react';
import './AdminSidebar.css';
import { Link } from 'react-router-dom'
import {Adminbardata} from './Adminbardata';
import * as axiosData from '../service/Service';
import {  useHistory } from 'react-router-dom';


function AdminSidebar() {
  const history = useHistory();

  const cusData ={
    C_customerid:'',
    C_name:'',
    C_lastname:'',
    C_tel:'',
    C_image:'',
    S_statusid:'',
    L_email:'',
    L_password:''
}

  const userId = {C_customerid:localStorage.getItem('UserId')};
  const [userData , setUserData] = useState(cusData);


  useEffect(initialValue,[]);
    function initialValue(){
        
      axiosData.getprofile(userId).then(function (data){
        setUserData(data[0]);
        
    })
        
    }
    const LogOut = () =>{
      localStorage.removeItem('UserId');
      history.push("/Home");
      window.location.reload();
  }




  return (
    <div className="Navbar-admin">
     
      <div className="Admin-side-bar">
        <div className="Welcom-admin">
          <img src='/assets/image/spzone-logo.jpg' />
          <h5>ยินดีตอนรับ สู่หน้าจัดการร้าน</h5>
        </div>
        <br />
        {Adminbardata.map((item, index)=>{
                  return(
                      <li key={index} className={item.cName}>
                          <Link to={item.path}>
                            {item.icon}
                            <span>{item.title}</span>
                          </Link>
                      </li>
                   
                  )
        })} 
      </div> 
      <h5 className="logoutAdmin" onClick={()=>{LogOut();}}>Log out</h5>
      <div className="Admin-Profile">
        
        <a href="">
          {userData.C_name}
        </a>
      </div>
    </div>
  );
}

export default AdminSidebar;