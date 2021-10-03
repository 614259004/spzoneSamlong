import React,{useState, useEffect} from 'react'
import {storage} from "../firebase";
import * as AiIcons from "react-icons/ai";
import * as RiIcons from "react-icons/ri";
import '../css/ManagePromotion.css';
import * as axiosData from '../service/Service';

const ManagePromotion = () => {

    const initImgAdd ={
        Pr_image:'https://firebasestorage.googleapis.com/v0/b/spzone-fb1ee.appspot.com/o/images%2Fno_image.png?alt=media&token=964e11de-d35d-4a4a-b6b5-c3490d07c617',
        Pr_imageFile:''
    }

    const addDatainit ={
        Pr_size:'',
        Pr_sale:'',
        Pr_amountPro:'',
        Pr_detail:'',
        Pr_time_begin:'',
        Pr_time_out:''
    }

    const productinit ={
        P_productid:''
        
    }

    const [allPromotion , setAllPromotion] = useState([]);
    const [allProduct , setAllProduct] = useState([]);
    const [allSize , setAllSize] = useState([]);
    const [selectProduct , setSelectProduct] = useState(productinit);
    const [addInfo , setAddInfo] = useState(false);
    const [checkBackUp , setCheckBackUp] = useState(); 
    const [imgAddPromo , setImgAddPromo] = useState(initImgAdd)
    const [dataAddPro , setDataAddPro] = useState(addDatainit);
    const [deletePro, setDeletePro] = useState([]);
    const [infoPro, setInfoPro] = useState([]);
    const [promoMode, setPromoMode] = useState('add');

    const [promoText,setPromoText]=useState('ทั้งหมด')
    const [promodetailData,setPromoDetailData]=useState('')


    var clothSize = ["XS","S","M","L","XL","XXL"];

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.getPromotion().then(function (data){
            
            setAllPromotion(data)
           
        })
        axiosData.showproduct().then(function (data){
            
            setAllProduct(data)
           
        })

        axiosData.showallsize().then(function (data){
            const size = [];

            for(let i =0 ; i<clothSize.length ; i++){
                data.sp_size.filter(x=> x.P_size == clothSize[i]).map(y=> {size.push(y)   })
            }

            setAllSize(size)
        })
        setPromoMode('add')
        manageAddPromotionModal('close');
        manageDelPromotionModal('close');
        document.querySelector(".select_size_ptomotion_add").setAttribute("disabled", "disabled");
         
        
    }

    const triggerClick = () =>{
        document.querySelector('#ImgPromotionFile').click();
    }

    const manageAddPromotionModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Add_promotion_admin')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageDelPromotionModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Delete_promotion_admin')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }
    
    
    const manageInfoPromotionModal = (status) => {
        var modal = document.getElementsByClassName('Modal_Info_promotion_admin')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }


    const manageCheckEditModalPromotion = (status) => {
        var modal = document.getElementsByClassName('Modal_Check_closeEdit_profile')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }


    const handleChangeProduct = (e) => {
        e.persist();
        setSelectProduct({...selectProduct,[e.target.name]: e.target.value});
    }

    const handleCheckboxChange =(e)=> {
        
        setAddInfo(e.target.checked);
    }

    const handleCheckboxChangeV2 =(e)=> {
        
        
        setInfoPro({...infoPro,Pr_status: e});
        
    }

    const handleAddPromoChange =(e)=> {
        setImgAddPromo({...imgAddPromo,Pr_image:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
    }

    const handleAllPromoChange = (e)=>{
        e.persist();
        setDataAddPro({...dataAddPro,[e.target.name]: e.target.value});
    }

    const uploadImgPromotion = () =>{
        const timestamp = Math.floor(Date.now()/1000);
                    const newName = timestamp + "-SPzone";
                    
                    const uploadTask = storage.ref(`promotion/${newName}`).put(imgAddPromo.Pr_imageFile);
                    
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
                        
                            storage.ref("promotion")
                                .child(newName)
                                .getDownloadURL()
                                .then((url)=>{
                                    addPromotion(url);
                                }
                                )
                        }            
                    )
    }

    const uploadImgPromotionEdit = () =>{
        const timestamp = Math.floor(Date.now()/1000);
                    const newName = timestamp + "-SPzone";
                    
                    const uploadTask = storage.ref(`promotion/${newName}`).put(imgAddPromo.Pr_imageFile);
                    
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
                        
                            storage.ref("promotion")
                                .child(newName)
                                .getDownloadURL()
                                .then((url)=>{
                                    setImageEditPromotion(url);
                                }
                                )
                        }            
                    )
    }

    const addPromotion = (url) =>{
        if(addInfo === false){
            const info = 'sale '+dataAddPro.Pr_sale+'.00฿ ,start '+dataAddPro.Pr_time_begin+' - '+dataAddPro.Pr_time_out+' 1 bill/time'

            const Promodata={
                'Pr_time_begin':dataAddPro.Pr_time_begin,
                'Pr_time_out' : dataAddPro.Pr_time_out,
                'Pr_detail' : info,
                'Pr_sale' : dataAddPro.Pr_sale,
                'Pr_image' : url,
                'P_productid' : selectProduct.P_productid,
                'Pr_amountPro' : dataAddPro.Pr_amountPro,
                'Pr_size' : dataAddPro.Pr_size,
                'Pr_status' : 8
            }

            

            axiosData.addPromotion(Promodata).then(function (data){
                clearData();
                initialValue();
            })
        }else if(addInfo === true){
            const Promodata={
                'Pr_time_begin':dataAddPro.Pr_time_begin,
                'Pr_time_out' : dataAddPro.Pr_time_out,
                'Pr_detail' : dataAddPro.Pr_detail,
                'Pr_sale' : dataAddPro.Pr_sale,
                'Pr_image' : url,
                'P_productid' : selectProduct.P_productid,
                'Pr_amountPro' : dataAddPro.Pr_amountPro,
                'Pr_size' : dataAddPro.Pr_size,
                'Pr_status' : 8
            }
            axiosData.addPromotion(Promodata).then(function (data){
                clearData();
                initialValue();
            })
        }
    }

    const deletePromotion =() =>{

        const data={
            Pr_promotion_code:deletePro.Pr_promotion_code
        }
        axiosData.delPromotion(data).then(function (data){
            setDeletePro('');
            initialValue();
            
        })
    }

    const checkDatabackup = (item) =>{

        const backup ={
            Pr_image:item.Pr_image,
            Pr_imageFile:'',
            P_productid:item.P_productid,
            Pr_size:item.Pr_size,
            Pr_sale:item.Pr_sale,
            Pr_amountPro:item.Pr_amountPro,
            Pr_detail:item.Pr_detail,
            Pr_time_begin:item.Pr_time_begin,
            Pr_time_out:item.Pr_time_out
        }

        setCheckBackUp(backup);
    }

    const dataupdatePromo = (item) =>{
        const ImgEdit ={
            Pr_image:item.Pr_image,
            Pr_imageFile:''
        }

        const productselectInfo ={
            P_productid:item.P_productid  
        }

        const editData ={
            Pr_size:item.Pr_size,
            Pr_sale:item.Pr_sale,
            Pr_amountPro:item.Pr_amountPro,
            Pr_detail:item.Pr_detail,
            Pr_time_begin:item.Pr_time_begin,
            Pr_time_out:item.Pr_time_out
        }

        setImgAddPromo(ImgEdit);
        setSelectProduct(productselectInfo);
        setDataAddPro(editData);
    }

    const callBackData = () =>{
        const ImgEdit ={
            Pr_image:checkBackUp.Pr_image,
            Pr_imageFile:''
        }

        const productselectInfo ={
            P_productid:checkBackUp.P_productid
        }

        const editData ={
            Pr_size:checkBackUp.Pr_size,
            Pr_sale:checkBackUp.Pr_sale,
            Pr_amountPro:checkBackUp.Pr_amountPro,
            Pr_detail:checkBackUp.Pr_detail,
            Pr_time_begin:checkBackUp.Pr_time_begin,
            Pr_time_out:checkBackUp.Pr_time_out
        }

        setImgAddPromo(ImgEdit);
        setSelectProduct(productselectInfo);
        setDataAddPro(editData);
        setInfoPro({...infoPro,Pr_status: checkBackUp.Pr_status});
    }


    const updatePromotion = () =>{

        if(dataAddPro.Pr_detail === infoPro.Pr_detail){
            if(imgAddPromo.Pr_image === infoPro.Pr_image){
                const Promodata={
                    'Pr_time_begin':dataAddPro.Pr_time_begin,
                    'Pr_time_out' : dataAddPro.Pr_time_out,
                    'Pr_detail' : dataAddPro.Pr_detail,
                    'Pr_sale' : dataAddPro.Pr_sale,
                    'Pr_image' : imgAddPromo.Pr_image,
                    'P_productid' : selectProduct.P_productid,
                    'Pr_amountPro' : dataAddPro.Pr_amountPro,
                    'Pr_size' : dataAddPro.Pr_size,
                    'Pr_status' : infoPro.Pr_status,
                    'Pr_promotion_code' : infoPro.Pr_promotion_code
                }

                editPromotionV2(Promodata);
            }else{
                uploadImgPromotionEdit()
            }
        }else{
            if(imgAddPromo.Pr_image === infoPro.Pr_image){
                const Promodata={
                    'Pr_time_begin':dataAddPro.Pr_time_begin,
                    'Pr_time_out' : dataAddPro.Pr_time_out,
                    'Pr_detail' : dataAddPro.Pr_detail,
                    'Pr_sale' : dataAddPro.Pr_sale,
                    'Pr_image' : imgAddPromo.Pr_image,
                    'P_productid' : selectProduct.P_productid,
                    'Pr_amountPro' : dataAddPro.Pr_amountPro,
                    'Pr_size' : dataAddPro.Pr_size,
                    'Pr_status' : infoPro.Pr_status,
                    'Pr_promotion_code' : infoPro.Pr_promotion_code
                }

                editPromotionV2(Promodata);
            }else{
                uploadImgPromotionEdit()
            }
        }
    }

    const setImageEditPromotion =(url) =>{
        
        const Promodata={
            'Pr_time_begin':dataAddPro.Pr_time_begin,
            'Pr_time_out' : dataAddPro.Pr_time_out,
            'Pr_detail' : dataAddPro.Pr_detail,
            'Pr_sale' : dataAddPro.Pr_sale,
            'Pr_image' : url,
            'P_productid' : selectProduct.P_productid,
            'Pr_amountPro' : dataAddPro.Pr_amountPro,
            'Pr_size' : dataAddPro.Pr_size,
            'Pr_status' : infoPro.Pr_status,
            'Pr_promotion_code' : infoPro.Pr_promotion_code
        }

        editPromotionV2(Promodata);
    }
    
    const editPromotionV2 = (promoData) =>{

        
        axiosData.updatePromotion(promoData).then(function (data){
            clearData();
            initialValue();
        })
    }

    const clearData = () =>{
        setSelectProduct(productinit);setDataAddPro(addDatainit);setAddInfo(false);setImgAddPromo(initImgAdd)
    }

    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>โปรโมชัน</h1>
                <details className="detailsAdminProduct">
                    <summary className="AdminProductsummary">{promoText}</summary>
                    <ul>
                        <li onClick={()=>{setPromoText('ทั้งหมด');setPromoDetailData('')}}>ทั้งหมด</li>
                        <li onClick={()=>{setPromoText('กำลังใช้งาน');setPromoDetailData(8)}}>กำลังใช้งาน</li>
                        <li onClick={()=>{setPromoText('หมดเขต');setPromoDetailData(9)}}>หมดเขต</li>
                    </ul>
                </details>
                <div className="Add_Promotion_admin_button_head">
                    <button onClick={()=>{manageAddPromotionModal('show')}}><AiIcons.AiOutlinePlusCircle />เพิ่มโปรโมชัน</button>
                </div>
            </div>

            <div className="Promotion_admin_body">
                {allPromotion.length != 0 ? promodetailData === ''? allPromotion.map((item)=>(
                    <div className="promotion_card_admin">
                        <img src={item.Pr_image}/>
                        <div className="promotion_data_ex_group">
                            <h4>{item.P_name}</h4>
                            <h5 >ลดราคา {item.Pr_sale}.00 ฿</h5>
                            <h5>เริ่ม {item.Pr_time_begin} ถึง {item.Pr_time_out}</h5>
                            {item.Pr_status == 8?
                                <div className="status_Promotion_admin_group">
                                    <h5>สถานะ : </h5>
                                    <p className="status_promotion_on">กำลังใช้งาน</p>
                                </div>
                            :
                                <div className="status_Promotion_admin_group">
                                    <h5>สถานะ : </h5>
                                    <p className="status_promotion_off">หมดเขต</p>
                                </div>
                            }
                        </div>
                        <div className="menu_promo_admin_group">
                                <h3 onClick={()=>{manageInfoPromotionModal('show');setInfoPro(item)}}><AiIcons.AiFillInfoCircle/></h3>
                                <h3 onClick={()=>{setDeletePro(item);manageDelPromotionModal('show')}}><RiIcons.RiDeleteBinFill/></h3>
                        </div>
                    </div>
                )):allPromotion.filter(apm=>apm.Pr_status == promodetailData).map((item)=>(
                    <div className="promotion_card_admin">
                        <img src={item.Pr_image}/>
                        <div className="promotion_data_ex_group">
                            <h4>{item.P_name}</h4>
                            <h5 >ลดราคา {item.Pr_sale}.00 ฿</h5>
                            <h5>เริ่ม {item.Pr_time_begin} ถึง {item.Pr_time_out}</h5>
                            {item.Pr_status == 8?
                                <div className="status_Promotion_admin_group">
                                    <h5>สถานะ : </h5>
                                    <p className="status_promotion_on">กำลังใช้งาน</p>
                                </div>
                            :
                                <div className="status_Promotion_admin_group">
                                    <h5>สถานะ : </h5>
                                    <p className="status_promotion_off">หมดเขต</p>
                                </div>
                            }
                        </div>
                        <div className="menu_promo_admin_group">
                                <h3 onClick={()=>{manageInfoPromotionModal('show');setInfoPro(item)}}><AiIcons.AiFillInfoCircle/></h3>
                                <h3 onClick={()=>{setDeletePro(item);manageDelPromotionModal('show')}}><RiIcons.RiDeleteBinFill/></h3>
                        </div>
                    </div>
                ))
                :null}

            </div>


            {/*Info Promotion modal*/}
            <div id="Modal_Info_promotion_admin" className="Modal_Info_promotion_admin">
                {infoPro.length != 0?
                    <div className="Modal_Info_promotion_admin_body"> 
                    <h4 className="boxOfcloseInfopromoadmin" onClick={()=>{manageInfoPromotionModal('close');setInfoPro([]);}}><AiIcons.AiOutlineClose className="Close_Modal_Infopromotion_admin"/></h4>                   
                        <div className="InfoPromoImgGroup">
                            <img src={infoPro.Pr_image} />
                        </div>

                        <div className="InfoPromodataGroup">
                            <h1>รายละเอียดโปรโมชัน</h1>
                            <div className="NameproductInfoPromodata">
                                <h5>โปรโมชันสินค้า :</h5>
                                <h2>{infoPro.P_name}</h2>
                            </div>
                            <div className="SizeproductInfoPromodata">
                                <h4 className="head_info_promotion_admin">ไซส์สินค้า :</h4>
                                <h4>{infoPro.Pr_size}</h4>
                            </div>
                            <div className="grouppricesaleandAmountPromotion">
                                <div className="PricesaleInfoPromodata">
                                    <h4 className="head_info_promotion_admin">ลดราคา :</h4>
                                    <h4>{infoPro.Pr_sale}.00 ฿</h4>
                                </div>
                                <div className="AmountsaleInfoPromodata">
                                    <h4 className="head_info_promotion_admin">จำนวนสิทธิ์ :</h4>
                                    <h4>{infoPro.Pr_amountPro} สิทธิ์</h4>
                                </div>
                            </div>
                            <div className="timeOfPromotionInfo">
                                <h4 className="head_info_promotion_admin">ตั้งแต่วันที่ </h4>
                                <h4 className="timeIntoPromotion">{infoPro.Pr_time_begin}</h4>
                                <h4 className="head_info_promotion_admin">ถึง</h4>
                                <h4 className="timeIntoPromotion">{infoPro.Pr_time_out}</h4>
                            </div>

                            <div className="DetailPromotionInfo">
                                <h4 className="head_info_promotion_admin">รายละเอียด :</h4>
                                <h4>{infoPro.Pr_detail}</h4>
                            </div>

                            <div className="StatusPromotionInfo">
                                <h4 className="head_info_promotion_admin">สถานะ :</h4>
                                {infoPro.Pr_status == 8?
                                <h4>กำลังใช้งาน</h4>
                                :
                                <h4>หมดเขต</h4>
                                }
                            </div>

                            <button onClick={()=>{checkDatabackup(infoPro);setPromoMode('edit');manageAddPromotionModal('show');dataupdatePromo(infoPro)}} className="editInfoPromotionAdminButton"><AiIcons.AiFillEdit/>แก้ไขข้อมูล</button>
                        </div>
                        
                        
                    </div>
                :null}
            </div>

            {/*Info Promotion modal*/}
            


            {/*Add Promotion modal*/}

            <div id="Modal_Add_promotion_admin" className="Modal_Add_promotion_admin"> 
                <div className="Modal_Add_promotion_admin_body">
                {promoMode === 'add' ? 
                    <h4 onClick={()=>{manageAddPromotionModal('close');clearData();setPromoMode('add')}}><AiIcons.AiOutlineClose className="Close_Modal_addpromotion_admin"/></h4>
                :
                    <h4 onClick={()=>{manageCheckEditModalPromotion('show')}}><AiIcons.AiOutlineClose className="Close_Modal_addpromotion_admin"/></h4>
                }
                {promoMode === 'edit' ?
                        <h2>แก้ไขโปรโมชัน</h2>
                    :
                        <h2>เพิ่มโปรโมชัน</h2>
                    }
                    <div className="Img_Promotion_add_group">
                        <img  src={imgAddPromo.Pr_image} onClick={() => {triggerClick()}}  for="ImgPromotionFile"/>
                        <input   type="file" onChange={handleAddPromoChange} accept="image/*" id="ImgPromotionFile"  className="ImgPromotionFile" name="Pr_imageFile"/>  
                    </div>
                    {promoMode === 'edit' ? infoPro.Pr_status == 8  ?
                        <div className="checkbox_Promo_addPromo">
                            <input  type="checkbox" checked   className="checkboxofInfoPromo" onChange={()=>{handleCheckboxChangeV2(9)}}/>
                            <p>ต้องการเปิดใช้โปโมชันหรือไม่?</p>
                        </div>
                        : 
                        <div className="checkbox_Promo_addPromo">
                            <input  type="checkbox"  className="checkboxofInfoPromo" onChange={()=>{handleCheckboxChangeV2(8)}}/>
                            <p>ต้องการเปิดใช้โปโมชันหรือไม่?</p>
                        </div>
                    :null}
                    <div className="select_Product_group_addPromo">
                        <div className="select_Productid_addPromo">
                            <select className="select_product_ptomotion_add" value={selectProduct.P_productid}  name="P_productid" onChange={(e)=> handleChangeProduct(e)}>
                                <option value=''></option>
                                {allProduct.length != 0?allProduct.map((item)=>(
                                    <option value={item.P_productid}>
                                        {item.P_name}
                                    </option>
                                )):null}
                            </select>
                            <p>เลือกสืนค้า</p>
                        </div>
                        
                            {selectProduct.P_productid !='' ?
                                <div className="select_size_addPromo">
                                    <select name="Pr_size" value={dataAddPro.Pr_size} onChange={(e)=>{handleAllPromoChange(e)}} name="Pr_size" className="select_size_ptomotion_add " >
                                        <option></option>
                                        {allSize != 0 ? 
                                            allSize.filter(data =>data.P_productid === selectProduct.P_productid).map((item)=>(
                                                <option value={item.P_size}>{item.P_size}</option>
                                        )):null}
                                    </select>
                                    <p>เลือกไซส์</p>
                                </div>
                            :
                                <div className="select_size_addPromo">
                                    <select value={dataAddPro.Pr_size} name="Pr_size" onChange={(e)=>{handleAllPromoChange(e)}} className="select_size_ptomotion_add disabled" disabled>
                                        <option></option>
                                    </select>
                                    <p>เลือกไซส์</p>
                                </div>
                            }
                        
                    </div>
                

                    <div className="about_Promo_addPromo">
                        <div className="about_Price_Promo_addPromo">                          
                            <input value={dataAddPro.Pr_sale} name="Pr_sale" onChange={(e)=>{handleAllPromoChange(e)}}/>
                            <p>จำนวนลดราคา</p>
                        </div>
                        <div className="about_Amount_Promo_addPromo">
                            <input value={dataAddPro.Pr_amountPro} name="Pr_amountPro" onChange={(e)=>{handleAllPromoChange(e)}}/>
                            <p>จำนวนสิทธิ์</p>
                        </div>
                    </div>

                    <div className="groupDateInput">
                        <div className="startDatePromotion">
                            <input value={dataAddPro.Pr_time_begin} name="Pr_time_begin" type="date" onChange={(e)=>{handleAllPromoChange(e)}}/>
                            <p>วันเริ่มต้น</p>
                        </div>

                        <div className="endDatePromotion">
                            <input value={dataAddPro.Pr_time_out} name="Pr_time_out" type="date" onChange={(e)=>{handleAllPromoChange(e)}}/>
                            <p>วันสิ้นสุด</p>
                        </div>
                    </div>        



                    <div className="checkbox_Promo_addPromo">
                        <input  type="checkbox" className="checkboxofInfoPromo" onChange={(e)=>{handleCheckboxChange(e)}}/>
                        <p>ต้องการใส่คำอธิบายหรือไม่?</p>
                    </div>


                    {addInfo === true ?
                        <div   className="Info_Promo_addPromo" >
                                <input value={dataAddPro.Pr_detail} name="Pr_detail" onChange={(e)=>{handleAllPromoChange(e)}}/>
                                <p>คำอธิบาย</p>
                        </div>
                    :
                        <div className="Info_Promo_addPromo">
                                <input value={dataAddPro.Pr_detail} name="Pr_detail" disabled className="Info_Promo_addPromodis disabled" onChange={(e)=>{handleAllPromoChange(e)}}/>
                                <p >คำอธิบาย</p>
                        </div>
                    }
                    {promoMode === 'add' ?
                        <button onClick={()=>{uploadImgPromotion()}} className="AddProMoButton">เพิ่มโปรโมชัน</button>
                    :
                        <button onClick={()=>{updatePromotion()}} className="AddProMoButton">แก้ไขโปรโมชัน</button>
                    }
                </div>    
            </div>

            {/*Add Promotion modal*/}

            {/*delete Promotion modal*/}
            <div id="Modal_Delete_promotion_admin" className="Modal_Delete_promotion_admin">
                {deletePro != '' ?
                    <div className="Modal_Delete_promotion_admin_body">                    
                        <h4>คุณต้องการจะลบโปรโมชัน{deletePro.P_name}({deletePro.Pr_size})ใช่หรือไม่</h4>
                        <div className="buttongroup_checkeditProfile">
                            <button onClick={()=>{setDeletePro('');manageDelPromotionModal('close')}} className="NoIwantEdit_button" >ไม่ใช่</button>
                            <button onClick={()=>{deletePromotion();}} className="YesIwantcancel_button" >ใช่</button>
                        </div>
                        
                    </div>    :null}
            </div>


            {/*delete Promotion modal*/}


            {/*Checkclose edit modal*/}
            <div id="Modal_Check_closeEdit_profile" className="Modal_Check_closeEdit_profile"> 
                <div className="Modal_Check_closeEdit_profile_body">
                    <h4>ต้องการยกเลิกการแก้ไขหรือไม่?</h4>
                    
                    <div className="buttongroup_checkeditProfile">
                        <button onClick={()=>{manageCheckEditModalPromotion('close')}} className="NoIwantEdit_button" >ไม่ใช่</button>
                        <button onClick={()=>{clearData();manageInfoPromotionModal('close');manageCheckEditModalPromotion('close');manageAddPromotionModal('close');setPromoMode('add');}} className="YesIwantcancel_button" >ใช่</button>
                    </div>
                    
                </div>    
            </div>

            {/*Checkclose edit modal*/}
            
            
        </div>
    )
}

export default ManagePromotion
