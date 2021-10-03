import React,{useState, useEffect} from 'react';
import './AdminSidebar.css';
import { Link } from 'react-router-dom'
import {Adminbardata} from './Adminbardata';
import * as axiosData from '../service/Service';


function AdminSidebar() {

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
      <div className="Admin-Profile">
        <a href="">
          {userData.C_name}
        </a>
      </div>
    </div>
  );
}

export default AdminSidebar;