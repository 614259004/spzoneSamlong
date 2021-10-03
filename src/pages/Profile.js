import React,{useState, useEffect} from 'react'
import '../css/Profile.css';
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as axiosData from '../service/Service';
import * as IoIcons5 from "react-icons/io5";
import * as BiIcons5 from "react-icons/bi";
import {storage} from "../firebase";

const Profile = () => {
    const initProfile ={
        C_customerid: "",
        C_name: "",
        C_lastname: "",
        C_tel: "",
        C_image: "",
        L_password: "",
        L_email:"",
        S_statusid:""
    }
    const initEditProfile ={
        C_customerid: "",
        C_name: "",
        C_lastname: "",
        C_tel: "",
        C_image: "",
        C_imageFile: "",
        L_password: "",
        L_email:"",
        S_statusid:""
    }
    const UserId = {C_customerid:localStorage.getItem('UserId')};

    const initNewAdd ={
        A_homenumber:"",
        A_moo:"",
        A_canton:"",
        A_district:"",
        A_province:"",
        A_postal_code:"",
        A_receive_name:"",
        A_phone:"",
        C_customerid:localStorage.getItem('UserId')
    }


    const [profileShow , setProfileShow] = useState(initProfile);
    const [profileEdit , setProfileEdit] = useState(initEditProfile);
    const [addDressShow , setAddDressShow] = useState();
    const [allAddDress , setAllAddDress] = useState([]);
    const [delAddDress , setDelAddDress] = useState();
    const [editAddDress , setEditAddDress] = useState(initNewAdd);
    const [addressMode , setAddressMode] = useState('');
    const [allProvince, setAllProvince] = useState([]);
    const [allAmphur, setAllAmphur] = useState([]);
    const [allDistrict, setAllDistrict] = useState([]);

    const [selectProvince, setSelectProvince] = useState();
    const [selectAmphur, setSelectAmphur] = useState();
   

    useEffect(initialValue,[]);
    
    

    function initialValue(){
        manageEditModal('close');
        axiosData.getprofile(UserId).then(function (data){
           setProfileShow(data[0])
        })

        axiosData.getAddress(UserId).then(function (data){
            setAddDressShow(data[0]);
            setAllAddDress(data);
         })

        axiosData.getProvince().then(function (data){
            setAllProvince(data)
        })
        
        axiosData.getAmphur().then(function (data){
            setAllAmphur(data)
        })

        axiosData.getDistrict().then(function (data){
            setAllDistrict(data)
        })

    }   

    const triggerClick = () =>{
        document.querySelector('#ImgProFile').click();
    }

    const clearData = () =>{
        setSelectProvince('')
        setSelectAmphur('')
    }

    const manageEditModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Edit_profile')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageAllAddressModal = (status) => {
        var modal = document.getElementsByClassName('Modal_All_address_profile')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageDelAddressModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Del_Address_profile')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageAddAddressModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Add_Address_Payment')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }
    

    const manageCloseEditModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Check_closeEdit_profile')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const selectImg = (e) => {
        setProfileEdit({...profileEdit,C_image:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        
    }
    
    const handleChange = (e) => {
        e.persist();
        setProfileEdit({...profileEdit,[e.target.name]: e.target.value});
    }


    const AddresshandleChange = (e) => {
        e.persist();
        setEditAddDress({...editAddDress,[e.target.name]: e.target.value});

    }

    const ProvincehandleChange = (e) => {
        e.persist();
        setEditAddDress({...editAddDress,[e.target.name]: e.target.value});
        setSelectProvince(e.target.value)
    }

    const AmphurhandleChange = (e) =>{
        e.persist();
        setEditAddDress({...editAddDress,A_district: e.target.value});
        setSelectAmphur(e.target.value)
    }


    const updateProfileUser = () => {
        if(profileEdit.C_image === profileShow.C_image){
            const editdata={
                C_customerid:profileEdit.C_customerid,
                C_name: profileEdit.C_name,
                C_lastname: profileEdit.C_lastname,
                C_tel: profileEdit.C_tel,
                C_image: profileEdit.C_image,
                L_email:profileEdit.L_email,
            }

            axiosData.updateprofile(editdata).then(function (data){
                initialValue();
             })
        }else{
            const timestamp = Math.floor(Date.now()/1000);
                const newName = timestamp + "-SPzone";
                    
                const uploadTask = storage.ref(`profile/${newName}`).put(profileEdit.C_imageFile);
                    
                uploadTask.on(
                    "state_changed", 
                    (snapshop) => {
                    const progress = Math.round(
                        (snapshop.bytesTrans/snapshop.totalBytes) * 100
                    );
                    },
                    (error)=>{
                        console.log(error);
                    },
                    () => {
                        storage.ref("profile")
                            .child(newName)
                            .getDownloadURL()
                            .then((url)=>{
                                updateProfileImg(url)
                                
                            }
                            )
                        }            
                    )

        }
    }
    

    const updateProfileImg = (url) =>{
        const editdata={
            C_customerid:profileEdit.C_customerid,
            C_name: profileEdit.C_name,
            C_lastname: profileEdit.C_lastname,
            C_tel: profileEdit.C_tel,
            C_image: url,
            L_email:profileEdit.L_email
        }

        axiosData.updateprofile(editdata).then(function (data){
           initialValue();
         })
    }


    const deleteAddress = () =>{
        const addselect ={
            A_addressid:delAddDress
        }

        axiosData.delAddress(addselect).then(function (data){
            manageDelAddressModal('close');
            initialValue();
        })
    }

    const addAddressProfile = () =>{
        axiosData.addAddress(editAddDress).then(function (data){
            manageAddAddressModal('close');
            clearData();
            setEditAddDress(initNewAdd);
            initialValue();
        })
    }

    const editAddressProfile = () => {
        axiosData.updateAddress(editAddDress).then(function (data){
            manageAddAddressModal('close');
            initialValue();
        })
    }
    
    return (
        <div className="Profile_background">
            <div className="Profile_body">
                
                    <a href="/" className="ProfileBackHomeX"><AiIcons.AiOutlineClose /></a>
                
                <div className="Profile_body_Img_group">
                    <div className="border_of_img">
                        <img src={profileShow.C_image}/>
                    </div>
                </div>
                <div className="Profile_body_Data_group">
                    <div className="Profile_Data_Name_group01">
                        <h2>{profileShow.C_name} {profileShow.C_lastname}</h2>
                    </div>
                    <div className="Profile_Data_Name_group02">
                        <h3 className="Data_Name_group02_head">Email </h3>
                        <h3 className="Data_Name_group02_Sum">{profileShow.L_email}</h3>
                    </div>
                    <div className="Profile_Data_Name_group02">
                        <h3 className="Data_Name_group02_head">Tel. </h3>
                        <h3 className="Data_Name_group02_Sum">{profileShow.C_tel}</h3>
                    </div>
                    <div className="Profile_Data_Address_group">
                        <h3 className="addressShow_head">Address</h3>
                        {addDressShow != null ?
                        <h3 className="addressShow_Ex01">
                            {addDressShow.A_homenumber}  Village No.{addDressShow.A_moo} ,{addDressShow.DISTRICT_NAME} Sub-district ,{addDressShow.AMPHUR_NAME} District, {addDressShow.PROVINCE_NAME}, {addDressShow.A_postal_code} 
                        </h3>
                        :null}
                    </div>
                    <div className="Profile_Data_Name_group">
                        <button onClick={() => {manageEditModal('show');setProfileEdit(profileShow)}} className="editProfileButton"><FaIcons.FaUserEdit className="editProicon"/>edit</button>
                        <button className="AddressShowbutton" onClick={()=>{manageAllAddressModal('show')}}><AiIcons.AiFillHome className="addressshowicon"/>address</button>
                    </div>
                </div>
            </div>

            {/*edit modal*/}
            <div id="Modal_Edit_profile" className="Modal_Edit_profile"> 

            {profileEdit != null ?
                <div className="Modal_Edit_profile_body">
                   
                        {profileEdit.C_image === profileShow.C_image && profileEdit.C_name === profileShow.C_name && profileEdit.C_lastname === profileShow.C_lastname
                        && profileEdit.C_tel === profileShow.C_tel && profileEdit.L_email === profileShow.L_email ?
                            <div className="boxOfCloseModalProfile">
                                 <a  onClick={() => {manageEditModal('close');setProfileEdit('')}} className="ProfileColseModaledit"><AiIcons.AiOutlineClose /></a>
                            </div>
                        :
                            <div className="boxOfCloseModalProfile">
                                <a  onClick={() => {manageCloseEditModal('show')}} className="ProfileColseModaledit"><AiIcons.AiOutlineClose /></a>
                            </div>
                        }
                    
                    <h2>Edit Profile</h2>
                    <div className="cardOfEditProfile">
                        <div className="left_cardOfEditProfile">
                            <div className="Img_edit_profile_group">
                                <img  src={profileEdit.C_image} onClick={() => {triggerClick()}}  for="ImgProFile"/>
                                <input   type="file" accept="image/*" id="ImgProFile" onChange={selectImg}  className="ImgProFile" name="C_imageFile"/>  
                            </div>
                        </div>
                        <div className="right_cardOfEditProfile">
                            <div className="edit_profile_group_input">
                                <input placeholder="Name" name="C_name" value={profileEdit.C_name} onChange={(e)=> handleChange(e)}/>
                            </div> 
                            <div className="edit_profile_group_input">
                                <input placeholder="Lastname" name="C_lastname" value={profileEdit.C_lastname} onChange={(e)=> handleChange(e)}/>
                            </div>
                            <div className="edit_profile_group_input">
                                <input placeholder="Email" name="L_email" value={profileEdit.L_email} onChange={(e)=> handleChange(e)}/>
                            </div>
                            <div className="edit_profile_group_input">
                                <input placeholder="Tel" maxLength="10" name="C_tel" value={profileEdit.C_tel} onChange={(e)=> handleChange(e)}/>
                            </div>
                        </div>
                        
                    </div>
                    
                    <button className="editProfileSave" onClick={()=>{updateProfileUser()}}><AiIcons.AiFillSave />Save</button>
                    
                    <h4>Change Password</h4>
                </div>  
            :null}  
            </div>
            

            {/*edit modal*/}



            {/*All Address modal*/}
            <div id="Modal_All_address_profile" className="Modal_All_address_profile"> 
                
                <div className="Modal_All_address_profile_body">
                    <div className="boxOfCloseModalProfile">
                        <a  onClick={() => {manageAllAddressModal('close')}} className="ProfileColseModaledit"><AiIcons.AiOutlineClose /></a>
                    </div>
                    <h2>Address</h2>
                    <div className="addressScollbar">
                    {allAddDress.length != 0 ?allAddDress.map((item)=>(
                        <div className="Alladdress_group">
                            <div className="Alladdress_icon_group">
                                <p>{item.A_receive_name}</p>
                                <p>{item.A_phone}</p>
                                <div className="addressInfo">
                                    <p>{item.A_homenumber} Village No.{item.A_moo} ,{item.DISTRICT_NAME} Sub-district ,{item.AMPHUR_NAME} District, {item.PROVINCE_NAME},{item.A_postal_code}</p>
                                </div>
                            </div>
                            <div className="Alladdress_icon_group_Delete_edit">
                                <p onClick={()=>{setAddressMode('edit');manageAddAddressModal('show');setEditAddDress(item);setSelectAmphur(item.A_district);setSelectProvince(item.A_province)}}><AiIcons.AiFillEdit /></p>
                                <p onClick={()=>{manageDelAddressModal('show');setDelAddDress(item.A_addressid)}}><IoIcons5.IoCloseSharp /></p>
                            </div>
                            
                        </div>
                   )) :null}</div>
                   <div>
                       <button className="button_add_address_profile" onClick={()=>{manageAddAddressModal('show')}}><BiIcons5.BiLocationPlus />Add Address</button>
                    </div>  
                </div>
                  
            </div>


            {/*All Address modal*/}

                        

            {/*Del Address modal*/}

            <div id="Modal_Del_Address_profile" className="Modal_Del_Address_profile"> 
                <div className="Modal_Del_Address_profile_body">
                    <h4>Do you want to delete this address?</h4>
                    <div className="buttongroup_checkeditProfile">
                        <button className="NoIwantEdit_button" onClick={()=>{manageDelAddressModal('close');setDelAddDress('')}}>No</button>
                        <button className="YesIwantcancel_button" onClick={()=>{deleteAddress()}} >Yes</button>
                    </div>
                </div>    
            </div>

            {/*Del Address modal*/}


            {/* ADD Address */}
            <div id="Modal_Add_Address_Payment" className="Modal_Add_Address_Payment">
                    <div className="Modal_Add_Address_Payment_body">
                        {addressMode === 'edit'?<h2>Edit Address</h2>:<h2>Add Address</h2>}
                        {addressMode === ''?
                        <h4 onClick={()=>{manageAddAddressModal('close');setAddressMode('');setEditAddDress(initNewAdd);clearData()}}><AiIcons.AiOutlineClose className="Close_Modal_Add_Address_Payment"/></h4>
                        :
                        <h4 onClick={()=>{manageCloseEditModal('show');clearData()}}><AiIcons.AiOutlineClose className="Close_Modal_Add_Address_Payment"/></h4>
                        }
                        <div className="input_Address_Payment_Name" >
                            <input placeholder="Recipient Name" name="A_receive_name" value={editAddDress.A_receive_name}  onChange={(e)=> AddresshandleChange(e)}/>
                        </div>
                        <div className="input_Address_Payment_Name" >
                            <input placeholder="Phone number" name="A_phone" value={editAddDress.A_phone}  onChange={(e)=> AddresshandleChange(e)}/>
                        </div>
                        <div className="input_Address_Payment_No_moo">
                            <input className="input_Address_Payment_No" value={editAddDress.A_homenumber} name="A_homenumber" placeholder="House No." onChange={(e)=> AddresshandleChange(e)}/>
                            <input className="input_Address_Payment_Moo" value={editAddDress.A_moo} name="A_moo"  placeholder="Village No." onChange={(e)=> AddresshandleChange(e)}/>
                        </div>
                        <div className="input_Address_Payment_Province"  >
                            <select value={editAddDress.A_province} placeholder="Province" name="A_province"   onChange={(e)=> ProvincehandleChange(e)} >
                                <option>PROVINCE</option>
                                {allProvince.length != 0 ? allProvince.map(item => (
                                    <option value={item.PROVINCE_ID}>{item.PROVINCE_NAME}</option>
                                )):null}
                            </select>
                        </div>
                        <div className="input_Address_Payment_canton_district">
                            <select value={editAddDress.A_district} className="input_Address_Payment_district"  name="A_district"  placeholder="District" onChange={(e)=> AmphurhandleChange(e)}>
                                <option>DISTRICT</option>
                                {selectProvince != '' ?
                                    allAmphur.filter(data=> selectProvince === data.PROVINCE_ID).map(item => (
                                        <option value={item.AMPHUR_ID}> {item.AMPHUR_NAME} </option>
                                    ))
                                :null}
                            </select>

                            <select className="input_Address_Payment_canton" value={editAddDress.A_canton} name="A_canton"  placeholder="Sub-district" onChange={(e)=> AddresshandleChange(e)}>
                                <option>SUB DISTRICT</option>
                                {selectAmphur != '' ?
                                    allDistrict.filter(data=> selectAmphur === data.AMPHUR_ID).map(item => (
                                        <option value={item.DISTRICT_ID}>{item.DISTRICT_NAME}</option>
                                    ))
                                :null}
                            </select>
                        </div>
                        <div className="input_Address_Payment_Province"  >
                        <select placeholder="Postal Code"  name="A_postal_code" value={editAddDress.A_postal_code}  onChange={(e)=> AddresshandleChange(e)}>
                            <option>POSTCODE</option>
                            {selectAmphur != undefined? allAmphur.filter(data=> selectAmphur === data.AMPHUR_ID ).map(item => (
                                        <option value={item.POSTCODE}>{item.POSTCODE}</option>
                                    ))
                            :null}
                        </select>
                        </div>

                        <div className="button_Address_Payment_add">
                            {addressMode === 'edit'?
                            <button onClick={()=>{editAddressProfile()}}><AiIcons.AiFillSave />Save</button>
                            :<button onClick={()=>{addAddressProfile()}}><BiIcons5.BiLocationPlus />Add Address</button>}
                        </div>         
                    </div>    
                </div>

            {/* ADD Address */}



            {/*Checkclose edit modal*/}
            <div id="Modal_Check_closeEdit_profile" className="Modal_Check_closeEdit_profile"> 
                <div className="Modal_Check_closeEdit_profile_body">
                    <h4>Would you like to cancel the edit?</h4>
                    {addressMode === 'edit'?
                    <div className="buttongroup_checkeditProfile">
                        <button className="NoIwantEdit_button" onClick={()=>{manageCloseEditModal('close')}}>No</button>
                        <button className="YesIwantcancel_button" onClick={()=>{manageCloseEditModal('close');manageAddAddressModal('close');setEditAddDress(initNewAdd)}}>Yes</button>
                    </div>
                    :
                    <div className="buttongroup_checkeditProfile">
                        <button className="NoIwantEdit_button" onClick={()=>{manageCloseEditModal('close')}}>No</button>
                        <button className="YesIwantcancel_button" onClick={()=>{manageCloseEditModal('close');manageEditModal('close');setProfileEdit('')}}>Yes</button>
                    </div>   
                    }
                </div>    
            </div>

            {/*Checkclose edit modal*/}

        </div>
    )
}

export default Profile
