import React,{useState , useEffect} from 'react';
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import {Form,Input} from 'antd';
import * as AiIcons from "react-icons/ai";
import * as IoIcons5 from "react-icons/io5";
import * as IoIcons from "react-icons/io";
import {storage} from "../firebase";
import * as axiosData from '../service/Service';
/*import logo from '../image/logo.png'*/  
import { Preloader, Puff } from 'react-preloader-icon'; 

const ManageBrand = () => {
    const initBrand ={
        B_name:"",
        B_image:"",
        B_imageFile:""
    }
    const [showBrand , setShowBrand] = useState([]);
    const [brandData , setBrandData] = useState(initBrand);
    const [loading, setLoading] = useState(false);
    const [buttonWork, setButtonWork] = useState(true);
    const [brandMode , setBrandMode] = useState();
    const [brandUpdateStaffData , setBrandUpdateStaffData] = useState(initBrand);
    
    
    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showbrand().then(function (data){
            
            setShowBrand(data.sp_brand);
            setBrandData(initBrand);
           
        })
        
    }


    var textError = document.getElementsByClassName('CheckDuplicateCateName')[0];
    var textError02 = document.getElementsByClassName('CheckDuplicateCateName02')[0];
    var textError05 = document.getElementsByClassName('CheckDuplicateCateName05')[0];
    var textError06 = document.getElementsByClassName('CheckDuplicateCateName06')[0];


    const manageModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const uploadFileToFirebase = (e) =>{
        //console.log(brandData.B_imageFile.name);
        if(brandData === "" || brandData.B_name === "" || brandData.B_imageFile === ""){
            if(brandData.B_name === ""){
                textError06.classList.remove("Hide");
            }
            if(brandData.B_imageFile === "" ){
                textError05.classList.remove("Hide");
            }
        }else{
            if(brandMode === "add"){
            
                    
                    const timestamp = Math.floor(Date.now()/1000);
                    const newName = timestamp + "-SPzone";
                    
                    const uploadTask = storage.ref(`images/${newName}`).put(brandData.B_imageFile);
                    
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
                        
                            storage.ref("images")
                                .child(newName)
                                .getDownloadURL()
                                .then((url)=>{
                                    addBrand(url);
                                }
                                )
                        }            
                    )
                
            }else if(brandMode === "edit"){
                if(brandData.B_image != brandUpdateStaffData.B_image){
                    const timestamp = Math.floor(Date.now()/1000);
                    const newName = timestamp + "-SPzone";
                    
                    const uploadTask = storage.ref(`images/${newName}`).put(brandData.B_imageFile);
                    
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
                        
                            storage.ref("images")
                                .child(newName)
                                .getDownloadURL()
                                .then((url)=>{
                                    
                                    editBrand(url);
                                }
                                )
                        }            
                    )
                }else if(brandData.B_image === brandUpdateStaffData.B_image){
                    editBrand(brandData.B_image);
                    
                }
                
            }
        }
    }


    const addBrand = (url) => {
        
        var Bdata = {
            B_name: brandData.B_name,
            B_image: url
        };
        
        axiosData.addbrand(Bdata).then((data) =>{
            
            manageModal("close");
            initialValue();
            hideError();
        })
    }

    const hideError =()=>{
        textError.classList.add("Hide");
        textError02.classList.add("Hide");
        textError05.classList.add("Hide");
        textError06.classList.add("Hide");
    }

    const editBrand = (url) => {
        var Bdata = {
            B_brandid:brandData.B_brandid,
            B_name: brandData.B_name,
            B_image: url
        };
        axiosData.updatebrand(Bdata).then(() =>{
            
            manageModal("close");
            initialValue();
            hideError();
        })
    }


    const manageModalDelete = (status) => {
        var modal = document.getElementsByClassName('Modal-Delete-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }
    

    const onFinish01 = () => {

        axiosData.deletebrand(brandData).then(function (data){
            console.log(data);
            manageModalDelete("close");
            setBrandData('');
            initialValue();
        })
    }

    const selectFile = (e) =>{
        textError05.classList.add("Hide");
        setBrandData({...brandData,B_image:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        setButtonWork(true);
        //setBrandData({...brandData,[e.target.name]: e.target.files[0]});
    }

    const handleChange = (e)=>{
        e.persist();
        setBrandData({...brandData,[e.target.name]: e.target.value});

        textError.classList.add("Hide");
        textError02.classList.add("Hide");
        
        textError06.classList.add("Hide");
        
        if(brandMode === "add"){
            if(e.target.value.length >= 3){

                setLoading(true);
                
                    var cateRecheck = {
                        name:e.target.value,
                        table_name:"sp_brand"
                    };
                    axiosData.checkDataDuplicate(cateRecheck).then(function (ToF){
                    
                        const result = ToF
                        console.log(result);
                        
                        if(result === true){
                            setLoading(false);
                            setButtonWork(false);
                            textError.classList.remove("Hide");                 
                        }else{
                            setLoading(false);
                            setButtonWork(true);
                            textError02.classList.remove("Hide");
                        }
                    })
                
            }
        }else{
            if(e.target.value != brandData.B_name){
                if(e.target.value.length >= 3){

                    setLoading(true);
                    
                        var BrandRecheck = {
                            name:e.target.value,
                            table_name:"sp_brand"
                        };
                        axiosData.checkDataDuplicate(BrandRecheck).then(function (ToF){
                        
                            const result = ToF
                            console.log(result);
                            
                            if(result === true){
                                setLoading(false);
                                setButtonWork(false);
                                textError.classList.remove("Hide");                 
                            }else{
                                setLoading(false);
                                setButtonWork(true);
                                textError02.classList.remove("Hide");
                            }
                        })
                    
                }
            }
        }
        
    };

    const triggerClick = () =>{
        document.querySelector('#ImgFileBrand').click();
    }

    

    
    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>แบรนด์</h1>
                <div className="brand-add-button">
                    
                    <a onClick={() => {setBrandMode("add");manageModal("show")}}><AiIcons.AiOutlinePlusCircle />เพิ่มเเบรนด์</a>
                </div>
            </div><div className="Brand-card-layout">
            {showBrand!=undefined?showBrand.map((item)=>(
                
                        <div className="Brand-card" key={item.B_brandid}>
                            <img src={item.B_image} />
                            <h5>{item.B_name}</h5>
                            <div className="button-brand-group">
                                <a  className="Brand-pen" onClick={() => {setBrandData(item);setBrandUpdateStaffData(item);setBrandMode("edit");manageModal("show")}}><RiIcons.RiPencilFill/>แก้ไข</a>
                                <a  className="Brand-bin" onClick={() => {setBrandData(item);manageModalDelete("show")}}><RiIcons.RiDeleteBin7Fill/>ลบ</a>
                            </div>
                        </div>

                    
            )):null} 

            </div> 

            {/*Add modal*/}
            <div id="Modal-Add-Cate" className="Modal-Add-Cate">
                <div className="Modal-Add-Cate-body">
                    {brandMode === "add" ?<h1>เพิ่มแบรนด์</h1>:<h1>แก้ไขแบรนด์</h1>}
                    <Form novalidate>
                        <div className="input-Cate-Add-img">
                            <img  src={brandData.B_image} />
                            <Input   type="file" accept="image/*" id="ImgFileBrand"  onChange={selectFile} className="ImgAddBrand" name="B_imageFile"/>
                            <p className="p-name-img-brand" for="ImgFileBrand" onClick={() => {triggerClick()}}>เลือกภาพที่ต้องการ</p>
                        </div>
                        
                        <p className="CheckDuplicateCateName05 Hide"><IoIcons5.IoAlertCircleSharp />กรุณาเลือกรูปภาพ</p>

                        <div className="input-Cate-Add">
                            <Input  name="B_name" maxLength='18' value={brandData.B_name} onChange={(e)=> handleChange(e)}/>
                            <label>ชื่อ</label>
                        </div>

                        {loading? 
                            <Preloader
                                use={Puff}
                                size={20}
                                strokeWidth={6}
                                strokeColor="#262626"
                                duration={2000}
                                className="loadNamePro"
                            />
                        :null}

                        <p className="CheckDuplicateCateName Hide"><IoIcons5.IoAlertCircleSharp />ชื่อแบรนด์นี้มีในระบบแล้ว</p>
                        <p className="CheckDuplicateCateName02 Hide"><IoIcons.IoIosCheckmarkCircle />ชื่อแบรนด์นี้สามารถใช้ได้</p>
                        <p className="CheckDuplicateCateName06 Hide"><IoIcons5.IoAlertCircleSharp />กรุณากรอกชื่อแบรนด์</p>

                        <a  className="Close-modal-x-Cate-Add" onClick={() => {manageModal("close");initialValue();hideError()}}><RiIcons.RiCloseLine /></a>
                        <div className="button-Cate-group-Add">
                            <a  className="Close-modal-Cate-Add" onClick={() => {manageModal("close");initialValue();hideError()}}>ยกเลิก</a>
                            {buttonWork === false ?
                            <button type="submit" className="Save-Cate-submit-Add" onClick={(e)=>{uploadFileToFirebase(e)}} disabled>
                                {brandMode==="add"?"เพิ่ม":"บันทึก"}
                            </button>:
                            <button type="submit" className="Save-Cate-submit-Add" onClick={(e)=>{uploadFileToFirebase(e)}}>
                            {brandMode==="add"?"เพิ่ม":"บันทึก"}
                        </button>
                            }   
                        </div>
                    </Form>
                </div>
            </div>
            {/*Add modal*/}

            {/*Delete modal*/}
            <div id="Modal-Delete-Cate" className="Modal-Delete-Cate">
                <div className="Modal-Delete-Cate-body">
                    <h4>คุณต้องการจะลบแบรนด์ {brandData.B_name}  ใช่หรือไม่</h4>
                    <div className="button-Cate-group-Delete">
                            <a onClick={() => {manageModalDelete("close")}} className="Close-modal-Cate-Delete">ไม่ใช่</a>
                            <button  className="Save-Cate-submit-Delete" onClick={()=> {onFinish01()}}>
                                ใช่
                            </button>
                    </div>
                    
                </div>    
            </div>

            {/*Delete modal*/}
        </div>
    )
}

export default ManageBrand
