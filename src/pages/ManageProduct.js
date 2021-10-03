import React,{useState, useEffect} from 'react'
import '../css/ManageBrand.css';
import * as RiIcons from "react-icons/ri";
import * as FaIcons from "react-icons/fa";
import {Form,Input,Tooltip} from 'antd';
import * as AiIcons from "react-icons/ai";
import * as IoIcons5 from "react-icons/io5";
import * as IoIcons from "react-icons/io";
import {storage} from "../firebase";
import * as axiosData from '../service/Service';
import {jsonUrl} from '../const/AllData';
import { Preloader, Puff } from 'react-preloader-icon'; 
import Order  from 'react-order'; 



const ManageProduct = () => {

    

    const initProduct ={
        P_name:"",
        P_price:"",
        P_detail:"",
        B_brandid:"",
        Cg_categoryid:"",
        P_image1:"",
        P_image1File:"",
        P_image2:"",
        P_image2File:"",
        P_image3:"",
        P_image3File:"",
        P_status:"12"
    }

    const sizeData = {
        P_size:"",
        P_size_amount:""
    }

    
    

    const [productData , setProductData] = useState(initProduct);
    const [productUpdateStaffData , setProductUpdateStaffData] = useState(initProduct);
    const [showProduct , setShowProduct] = useState([]);
    const [showBrand , setShowBrand] = useState([]);
    const [showCate , setShowCate] = useState([]);
    const [firstImg , setFirstImg] = useState();

    const [loading, setLoading] = useState(false);
    const [buttonWork, setButtonWork] = useState(true);

    const [showSize, setShowSize] = useState([]);
    const [sizeAdd, setSizeAdd] = useState(sizeData);
    const [allSize, setAllSize] = useState([]);
    const [removeSize, setRemoveSize] = useState([]);
    

    const [productMode, setProductMode] = useState();
    const [addAmountSize , setAddAmountSize] = useState(sizeData);

    const [productModeDetail,setProductModeDetail] = useState('')
    const [productModeText,setProductModeText] = useState('ทั้งหมด')
    
    var clothSize = ["XS","S","M","L","XL","XXL"];
    var shoeSize = [4,5,6,7,8,9,10,11,12,13,14,15];
    
    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showproduct().then(function (data){
            setShowProduct(data);
            setProductData(initProduct);
          
        })
        axiosData.showbrand().then(function (data){
            
            setShowBrand(data.sp_brand);
           
        })
        axiosData.showcate().then(function (data){
            
            setShowCate(data.sp_category);
           
        })
        axiosData.showallsize().then(function (data){
           
           
            
        const size = [];

          for(let i =0 ; i<clothSize.length ; i++){
            data.sp_size.filter(x=> x.P_size == clothSize[i]).map(y=> {size.push(y)   })
          }

          
            setAllSize(size);
            
           
        })
        setButtonWork(true);
        
    }

    

    const HoverDelete =(index)=>{
        
        var buttonSize = document.getElementsByClassName('bin-in-size-Proinfo')[index];
        buttonSize.classList.add("show");
    }

    const LeaveHover=(index)=>{
        var buttonSize = document.getElementsByClassName('bin-in-size-Proinfo')[index];
        buttonSize.classList.remove("show");
    }
    
    const manageAddModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Product')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const ManageModelSizeDelete = (status) => {
        var modal = document.getElementsByClassName('Modal-Delete-Cate')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const manageInfoModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Info-Pro')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const callSize = (id) => {
         axiosData.showsize(id).then(function (data){

            const size = [];

            for(let i =0 ; i< clothSize.length ; i++){
                data.filter(x=> x.P_size == clothSize[i]).map(y=> {size.push(y)   })
              }
              
            setShowSize(size);
        })
    }

    const manageAddSizeModal = (status) => {
        var modal = document.getElementsByClassName('Modal-Add-Size-Product')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }
    
    const manageAddAmountModal = (status) =>{
        var modal = document.getElementsByClassName('Modal-Add-Amount-Size')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const selectFile01 = (e) =>{
        
        /*console.log(productData.P_image1);*/
        setProductData({...productData,P_image1:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        textError11.classList.add("Hide");
        
    }
    const selectFile02 = (e) =>{
        
        setProductData({...productData,P_image2:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        textError12.classList.add("Hide");
    }
    const selectFile03 = (e) =>{
        
        setProductData({...productData,P_image3:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        textError13.classList.add("Hide");
    }

    // add product
        // name
            var textError = document.getElementsByClassName('CheckDuplicateCateName')[0];
            var textError02 = document.getElementsByClassName('CheckDuplicateCateName02')[0];
            var textError05 = document.getElementsByClassName('CheckDuplicateCateName05')[0];
        // price
            var textError07 = document.getElementsByClassName('CheckDuplicateCateName07')[0];
        // info
            var textError08 = document.getElementsByClassName('CheckDuplicateCateName08')[0];
        // cate
            var textError09 = document.getElementsByClassName('CheckDuplicateCateName09')[0];
        //brand
            var textError10 = document.getElementsByClassName('CheckDuplicateCateName10')[0];
        //img1
            var textError11 = document.getElementsByClassName('CheckDuplicateCateName11')[0];
        //img2
            var textError12 = document.getElementsByClassName('CheckDuplicateCateName12')[0];
        //img3
            var textError13 = document.getElementsByClassName('CheckDuplicateCateName13')[0];

    // add size
        // name
            var textError03 = document.getElementsByClassName('CheckDuplicateCateName03')[0];
            var textError04 = document.getElementsByClassName('CheckDuplicateCateName04')[0];
            var textError14 = document.getElementsByClassName('CheckDuplicateCateName14')[0];
        // amount
            var textError15 = document.getElementsByClassName('CheckDuplicateCateName15')[0];
            var textError16 = document.getElementsByClassName('CheckDuplicateCateName16')[0];
            var textError17 = document.getElementsByClassName('CheckDuplicateCateName17')[0];
            var textError18 = document.getElementsByClassName('CheckDuplicateCateName18')[0];

    // add size amount
        //name
            var textError19 = document.getElementsByClassName('CheckDuplicateCateName19')[0];
        // amount
            var textError20 = document.getElementsByClassName('CheckDuplicateCateName20')[0];
            var textError21 = document.getElementsByClassName('CheckDuplicateCateName21')[0];
            var textError22 = document.getElementsByClassName('CheckDuplicateCateName22')[0];
            var textError23 = document.getElementsByClassName('CheckDuplicateCateName23')[0];

    const handleChange = (e,num)=>{
        if(num === 7){
            textError07.classList.add("Hide");
        }else if(num === 8){
            textError08.classList.add("Hide");
        }else if(num === 9){
            textError09.classList.add("Hide");
        }else if(num === 10){
            textError10.classList.add("Hide");
        }
        e.persist();
        setProductData({...productData,[e.target.name]: e.target.value});
    };
    const handleChangeName = (e)=>{
        e.persist();
        setProductData({...productData,[e.target.name]: e.target.value});

        textError.classList.add("Hide");
        textError02.classList.add("Hide");
        textError05.classList.add("Hide");

        if(e.target.value.length >= 3){

            setLoading(true);
            
                var productRecheck = {
                    name:e.target.value,
                    table_name:"sp_product"
                };
                axiosData.checkDataDuplicate(productRecheck).then(function (ToF){
                
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
    };

    // const [test1,setTest1] = useState(['database']);
    // const [datap,setdataP] = useState([]);
    // let datapoint =[
    //     {
    //       "x": 1483228800000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1485907200000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1488326400000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1491004800000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1493596800000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1496275200000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1498867200000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1501545600000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1504224000000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1506816000000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1509494400000,
    //       "y": 0
    //     },
    //     {
    //       "x": 1512086400000,
    //       "y": 0
    //     }
    //   ]
    // const test = ()=>{
    //     for(let i = 0 ;i<test1.length;i++){
    //         if(test1[i]){
                
    //             datapoint[forInt(test1[i].month)-1].y=test1[i].price
    //         }
    //     }

    //     setdataP(datapoint);
    // }

    const handleChangeSize = (e)=>{
        e.persist();
        setSizeAdd({...sizeAdd,[e.target.name]: e.target.value});

        textError03.classList.add("Hide");
        textError04.classList.add("Hide");
        textError14.classList.add("Hide");

        if(e.target.value.length >= 1){
            setLoading(true);
                    var Szdata ={
                        P_productid:productData.P_productid,
                        P_size:e.target.value
                    }
                   
                    
                    axiosData.checkSizeDataDuplicate(Szdata).then(function (ToF){
                    
                        const result = ToF
                        
                        
                        if(result === true){
                            setLoading(false);
                            setButtonWork(false);
                            textError03.classList.remove("Hide");  
                            console.log("size "+buttonWork);               
                        }else{
                            setLoading(false);
                            setButtonWork(true);
                            textError04.classList.remove("Hide");
                        }
                    })
        }
    };

    const handleChangeSizeandAmount = (e)=>{
        textError15.classList.add("Hide");
        textError16.classList.add("Hide");
        textError17.classList.add("Hide");
        textError18.classList.add("Hide");
        

        if(e.target.value < 0){
            setButtonWork(false);
            textError16.classList.remove("Hide");
        }else if(e.target.value > 599){
            setButtonWork(false);
            textError15.classList.remove("Hide");
        }else if(e.target.value === ""){
            setButtonWork(true);
            textError18.classList.add("Hide");
        }else{
            setButtonWork(true);
            textError18.classList.remove("Hide");
        }
        console.log(buttonWork);
        
        e.persist();
        setSizeAdd({...sizeAdd,[e.target.name]: e.target.value});

        
    }

    const handleChangeAddSize = (e) =>{
        textError19.classList.add("Hide");

        e.persist();
        setAddAmountSize({...addAmountSize,[e.target.name]: e.target.value});
        
        
    }

    const handleChangeAddSize02 = (e) =>{
        textError20.classList.add("Hide");
        textError21.classList.add("Hide");
        textError22.classList.add("Hide");
        textError23.classList.add("Hide");
        console.log(e.target.value);

        if(e.target.value < 0){
            setButtonWork(false);
            textError21.classList.remove("Hide");
            console.log(buttonWork);
            
        }else if(e.target.value > 599){
            setButtonWork(false);
            textError20.classList.remove("Hide");
        }else if(e.target.value === ""){
            setButtonWork(true);
            textError23.classList.add("Hide");
        }else{
            setButtonWork(true);
            textError23.classList.remove("Hide");
        }
        
        e.persist();
        setAddAmountSize({...addAmountSize,[e.target.name]: e.target.value});

        
        
        
    }

    const updateStockSize = (id) => {
        if(addAmountSize === "" || addAmountSize.P_size === "" || addAmountSize.P_size_amount === ""){
            if(addAmountSize.P_size === ""){
                textError19.classList.remove("Hide");
            }
            if(addAmountSize.P_size_amount === ""){
                textError22.classList.remove("Hide");
            }
        }else{
        
            const sizeAmount = allSize.map(AmountS => {
                    if(AmountS.P_size === addAmountSize.P_size && AmountS.P_productid === id){
                    return parseInt(addAmountSize.P_size_amount)+parseInt(AmountS.P_size_amount);
                    }
                }  
                )
                console.log(sizeAmount);
                sizeAmount.map(jojo => {
                    if(jojo !== undefined){
                        const A_S ={
                            P_size:addAmountSize.P_size,
                            P_size_amount:jojo
                        }

                        axiosData.updateamountsize(A_S, id).then(function (data){
                
                            initialValue()
                            manageAddAmountModal("close")
                            setAddAmountSize(sizeData);
                            hideError03();
                        })
                    }
                })
        }

    }
    


   const  uploadFileToFirebase =  (e) =>{

        if(productData === "" || productData.P_name === "" || productData.P_price === "" || productData.P_detail === ""
        || productData.B_brandid === "" || productData.Cg_categoryid === "" || productData.P_image1 === "" || productData.P_image2 === ""
        || productData.P_image3 === ""){
           
            if(productData.P_name === ""){
                textError05.classList.remove("Hide");
            }
            if(productData.P_price === ""){
                textError07.classList.remove("Hide");
            }
            if(productData.P_detail === ""){
                textError08.classList.remove("Hide");
            }
            if(productData.B_brandid === ""){
                textError09.classList.remove("Hide");
            }
            if(productData.Cg_categoryid === ""){
                textError10.classList.remove("Hide");
            }
            if(productData.P_image1 === ""){
                textError11.classList.remove("Hide");
            }
            if(productData.P_image2 === ""){
                textError12.classList.remove("Hide");
            }
            if(productData.P_image3 === ""){
                textError13.classList.remove("Hide");
            }
        }else{
        
                const timestamp = Math.floor(Date.now()/1000);
                const newName = timestamp + "-SPzone-Product-img1";
                const newName02 = timestamp + "-SPzone-Product-img2";
                const newName03 = timestamp + "-SPzone-Product-img3";
                
                
                const uploadTask = storage.ref(`imagesProduct/${newName}`).put(productData.P_image1File);
                const uploadTask02 = storage.ref(`imagesProduct/${newName02}`).put(productData.P_image2File);
                const uploadTask03 = storage.ref(`imagesProduct/${newName03}`).put(productData.P_image3File);
                if(productData.P_image1 != productUpdateStaffData.P_image1){
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
                        
                            storage.ref("imagesProduct")
                                .child(newName)
                                .getDownloadURL()
                                .then((url01)=>{
                                    addProductInfo(url01);
                                }
                                )
                        }            
                    )
                }else if(productData.P_image1 === productUpdateStaffData.P_image1){
                    addProductInfo(productData.P_image1);
                }

                if(productData.P_image2 != productUpdateStaffData.P_image2){
                    uploadTask02.on(
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
                        
                            storage.ref("imagesProduct")
                                .child(newName02)
                                .getDownloadURL()
                                .then((url02)=>{
                                    addProductInfo(url02);
                                }
                                )
                        }            
                    )
                }else if(productData.P_image2 === productUpdateStaffData.P_image2){
                    addProductInfo(productData.P_image2);
                }

                if(productData.P_image3 != productUpdateStaffData.P_image3){
                    uploadTask03.on(
                        "state_changed", 
                        (snapshop) => {
                        const progress = Math.round(
                            (snapshop.bytesTrans/snapshop.totalBytes) * 100
                        );
                        },
                        (error)=>{
                            console.log(error);
                        },
                        ()  => {
                        
                                storage.ref("imagesProduct")
                                .child(newName03)
                                .getDownloadURL()
                                .then((url03)=>{
                                    addProductInfo(url03);
                                }
                                )
                        }            
                    )
                }else if(productData.P_image3 === productUpdateStaffData.P_image3){
                    addProductInfo(productData.P_image3);
                }
        }
                
                      
        }

        const hideError =()=>{
            textError.classList.add("Hide");
            textError02.classList.add("Hide");
            textError05.classList.add("Hide");
            textError07.classList.add("Hide");
            textError08.classList.add("Hide");
            textError09.classList.add("Hide");
            textError10.classList.add("Hide");
            textError11.classList.add("Hide");
            textError12.classList.add("Hide");
            textError13.classList.add("Hide");
            
        }

        const hideError02 =()=>{
            textError03.classList.add("Hide");
            textError04.classList.add("Hide");
            textError14.classList.add("Hide");
            textError15.classList.add("Hide");
            textError16.classList.add("Hide");
            textError17.classList.add("Hide");
            textError18.classList.add("Hide");
        }

        const hideError03=()=>{
            textError19.classList.add("Hide");
            textError20.classList.add("Hide");
            textError21.classList.add("Hide");
            textError22.classList.add("Hide");
            textError23.classList.add("Hide");
        }
    
        const addProductInfo = (url) => {
            
            jsonUrl.push(url);

            console.log("url "+jsonUrl.length);

            if(jsonUrl.length === 3){
                var Pdata ={
                    P_name:productData.P_name,
                    P_price:productData.P_price,
                    P_detail:productData.P_detail,
                    B_brandid:productData.B_brandid,
                    Cg_categoryid:productData.Cg_categoryid,
                    P_image1:jsonUrl[0],
                    P_image2:jsonUrl[1],
                    P_image3:jsonUrl[2],
                    P_status:productData.P_status
                }

                
                if(productMode === "add"){
                axiosData.addproduct(Pdata).then((data) =>{
                    console.log(data);
                    manageAddModal("close");
                    initialValue();
                    hideError()
                    jsonUrl.splice(0,jsonUrl.length);
                })
                } else if(productMode === "edit"){
                    
                        axiosData.editproduct(Pdata,productData.P_productid).then((data) =>{
                        console.log(data);
                        manageAddModal("close");
                        initialValue();
                        hideError()
                        jsonUrl.splice(0,jsonUrl.length);
                   })
                }
            }
        }
        const addProductSize = () => {
            if(sizeAdd === "" || sizeAdd.P_size === "" || sizeAdd.P_size_amount === ""){
                if(sizeAdd.P_size === ""){
                    textError14.classList.remove("Hide");
                }
                if(sizeAdd.P_size_amount === ""){
                    textError17.classList.remove("Hide");
                }
            }else{
                if(sizeAdd){
                    var Szdata ={
                        P_productid:productData.P_productid,
                        P_size:sizeAdd.P_size
                    }

                    axiosData.checkSizeDataDuplicate(Szdata).then(function (ToF){
                    
                        const result = ToF
                        
                        
                        if(result === true){
                            
                            setButtonWork(false);
                            textError03.classList.remove("Hide");  
                            console.log("size02 "+buttonWork);               
                        }else{
                            var Szdata ={
                                P_productid:productData.P_productid,
                                P_size:sizeAdd.P_size,
                                P_size_amount:sizeAdd.P_size_amount
                            }
                            
        
                            axiosData.addsize(Szdata).then((data) =>{
                                
                                manageAddSizeModal("close");
                                manageInfoModal("close");
                                setSizeAdd(sizeData)
                                initialValue();
                                hideError02();
                            })
                        }
                    })

                }
           
                    
            }
        }
       
        const deleteSize =(Szdata)=>{
            var Sidata={
                P_productid:Szdata.P_productid,
                P_size:Szdata.P_size
            }
            
            
            axiosData.deletesize(Sidata).then((data) =>{
               
                ManageModelSizeDelete("close");
                manageInfoModal("close");
                initialValue();
            })
        }

        

    const triggerClick01 = () =>{
        document.querySelector('#ImgFileProduct01').click();
    }
    const triggerClick02 = () =>{
        document.querySelector('#ImgFileProduct02').click();
    }
    const triggerClick03 = () =>{
        document.querySelector('#ImgFileProduct03').click();
    }

   

    return (
        <div className="brand-body-page">
            <div className="Head-brand">
                <h1>สินค้า</h1>
                <details className="detailsAdminProduct">
                    <summary className="AdminProductsummary">{productModeText}</summary>
                    <ul>
                        <li onClick={()=>{setProductModeText('ทั้งหมด');setProductModeDetail('')}}>ทั้งหมด</li>
                        <li onClick={()=>{setProductModeText('ในคลัง');setProductModeDetail(12)}}>ในคลัง</li>
                        <li onClick={()=>{setProductModeText('สินค้าจอง');setProductModeDetail(13)}}>สินค้าจอง</li>
                    </ul>
                </details>
                <div className="Product-add-button">
                    
                    <a onClick={()=>{manageAddModal("show");setProductMode("add")}}><AiIcons.AiOutlinePlusCircle />เพิ่มสินค้า</a>
                </div>
            </div>

            <div className="Product-card-layout">
            {productModeDetail === '' ? showProduct.map((item, index)=>{
                return(
                    
                        <div className="Product-card" key={index}>
                            <img src={item.P_image1} />
                            <div className="Product-info-admin">
                                <div className="Product-name-group">
                                    {item.P_status == 12?
                                        <p className="greenFontStatus"><FaIcons.FaCircle className="circleIcon" />สินค้าในคลัง</p>
                                    :
                                        <p className="yellowFontStatus"><FaIcons.FaCircle className="circleIcon"/>สินค้าสั่งจอง</p>
                                    }
                                    <h5>{item.P_name}</h5>
                                    <h6>{item.P_productid}</h6>
                                    <div className="Size-layout">
                                        {Object.keys(allSize).length !== 0 ?
                                        allSize.filter(aSize => aSize.P_productid === item.P_productid).map(allS => (
                                            
                                                <div className="size-product" key={allS.P_size}>
                                                    <h6 >{allS.P_size}</h6>
                                                    <h6>{allS.P_size_amount}</h6>
                                               </div>
                                            
                                        )):null}
                                    </div>
                                </div>
                                <div className="button-brand-group-product">
                                    <a  className="Brand-pen-product" onClick={() => {setProductData(item);manageInfoModal("show");setFirstImg(item.P_image1);callSize(item)}}><RiIcons.RiPencilFill/>จัดการสินค้า</a>
                                    <a  className="Brand-pen-product Add-size-amount" onClick={()=>{manageAddAmountModal("show");setProductData(item)}}><AiIcons.AiOutlinePlusCircle />เพิ่มจำนวน</a>
                                </div>
                            </div>
                        </div>
             )
            })
            :
            showProduct.filter(pd=>pd.P_status == productModeDetail).map((item, index)=>{
                return(
                    
                        <div className="Product-card" key={index}>
                            <img src={item.P_image1} />
                            <div className="Product-info-admin">
                                <div className="Product-name-group">
                                    {item.P_status == 12?
                                        <p className="greenFontStatus"><FaIcons.FaCircle className="circleIcon" />สินค้าในคลัง</p>
                                    :
                                        <p className="yellowFontStatus"><FaIcons.FaCircle className="circleIcon"/>สินค้าสั่งจอง</p>
                                    }
                                    <h5>{item.P_name}</h5>
                                    <h6>{item.P_productid}</h6>
                                    <div className="Size-layout">
                                        {Object.keys(allSize).length !== 0 ?
                                        allSize.filter(aSize => aSize.P_productid === item.P_productid).map(allS => (
                                            
                                                <div className="size-product" key={allS.P_size}>
                                                    <h6 >{allS.P_size}</h6>
                                                    <h6>{allS.P_size_amount}</h6>
                                               </div>
                                            
                                        )):null}
                                    </div>
                                </div>
                                <div className="button-brand-group-product">
                                    <a  className="Brand-pen-product" onClick={() => {setProductData(item);manageInfoModal("show");setFirstImg(item.P_image1);callSize(item)}}><RiIcons.RiPencilFill/>จัดการสินค้า</a>
                                    <a  className="Brand-pen-product Add-size-amount" onClick={()=>{manageAddAmountModal("show");setProductData(item)}}><AiIcons.AiOutlinePlusCircle />เพิ่มจำนวน</a>
                                </div>
                            </div>
                        </div>
             )
            })
            
            }
            </div> 

            {/*Add modal*/}
            <div className="Modal-Add-Product">
                <div className="Modal-Add-Product-body">
                    <h1>{productMode==="add"?"เพิ่มสินค้า":"แก้ไขสินค้า"}</h1>
                    <a className="x-add-product-from" onClick={()=>{manageAddModal("close");initialValue();hideError()}}><RiIcons.RiCloseLine /></a>
                    <div className="Add-From-Product">
                        <div className="NameAndPrice">
                            <div className="Product-from-add">
                                <p>ชื่อสินค้า</p>
                                <Input  name="P_name" value={productData.P_name} onChange={(e)=> handleChangeName(e)}/>
                            </div>

                            {loading? 
                            <div className="loadingProduct">
                                <Preloader
                                    use={Puff}
                                    size={20}
                                    strokeWidth={6}
                                    strokeColor="#262626"
                                    duration={2000}
                                />
                            </div>
                            :null}

                            <div className="Price-from-add">
                                <p>ราคาสินค้า</p>
                                <Input  name="P_price" value={productData.P_price} onChange={(e)=> handleChange(e,7)}/>
                            </div>

                            
                        </div>

                        <p className="CheckDuplicateCateName Hide"><IoIcons5.IoAlertCircleSharp />ชื่อสินค้านี้มีในระบบแล้ว</p>
                        <p className="CheckDuplicateCateName02 Hide"><IoIcons.IoIosCheckmarkCircle />ชื่อสินค้านี้สามารถใช้ได้</p>
                        <p className="CheckDuplicateCateName05 Hide"><IoIcons5.IoAlertCircleSharp />กรุณากรอกชื่อสินค้า</p>
                        <p className="CheckDuplicateCateName07 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณากรอกราคาสินค้า</p>

                        <div className="ProductInfo">
                            <div className="Info-from-add">
                                <p>รายละเอียด</p>
                                <Input  name="P_detail" value={productData.P_detail} onChange={(e)=> handleChange(e,8)}/>
                            </div>
                        </div>

                        <p className="CheckDuplicateCateName08 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณากรอกรายละเอียดสินค้า</p>

                        <div className="CateAndBrand">
                            <div className="Cate-From-add">
                                <p>หมวดหมู่</p>
                                <select name="Cg_categoryid" value={productData.Cg_categoryid}  onChange={(e)=> handleChange(e,9)}>
                                        <option  value=""></option> 
                                    {showCate.map((Cate)=>(
                                       
                                       <option key={Cate.Cg_categoryid} value={Cate.Cg_categoryid}>{Cate.Cg_name}</option> 
                                    ))}
                                </select>
                            </div>
                            <div className="Brand-From-add">
                                <p>แบรนด์</p>
                                <select name="B_brandid" value={productData.B_brandid}  onChange={(e)=> handleChange(e,10)}>
                                    <option  value=""></option> 
                                    {showBrand.map((brand)=>(
                                       
                                       <option key={brand.B_brandid} value={brand.B_brandid}>{brand.B_name}</option> 
                                    ))}
                                </select>
                            </div>
                        </div>
                        <p className="CheckDuplicateCateName09 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณาเลือกหมวดหมู่สินค้า</p>
                        <p className="CheckDuplicateCateName10 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณาเลือกแบรนด์สินค้า</p>

                        <div className="CateAndBrand">
                            
                                <p>สถานะสินค้า</p>
                                <select name="P_status" value={productData.P_status} className="statusProductselect"  onChange={(e)=> handleChange(e)}>
                                        <option  value="12">สินค้าในคลัง</option> 
                                        <option  value="13">สินค้าต้องจอง</option>
                                </select>
                            
                        </div>


                        <div className="Image-Product-Group">
                            <div className="Product-Img-Add">
                                <img src={productData.P_image1} />
                                <Input  id="ImgFileProduct01"   type="file" accept="image/*" className="" name="P_image1File" onChange={selectFile01} />
                                <p onClick={() => {triggerClick01()}}>เลือกรูปภาพที่1</p>
                            </div>
                            <div className="Product-Img-Add">
                                <img src={productData.P_image2} />
                                <Input  id="ImgFileProduct02"    type="file" accept="image/*" className="" name="P_image2File" onChange={selectFile02}/>
                                <p onClick={() => {triggerClick02()}}>เลือกรูปภาพที่2</p>
                            </div>
                            <div className="Product-Img-Add">
                                <img src={productData.P_image3} />
                                <Input  id="ImgFileProduct03"    type="file" accept="image/*" className="" name="P_image3File" onChange={selectFile03}/>
                                <p onClick={() => {triggerClick03()}}>เลือกรูปภาพที่3</p>
                            </div>
                        </div>

                        <p className="CheckDuplicateCateName11 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณาเลือกรูปภาพ</p>
                        <p className="CheckDuplicateCateName12 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณาเลือกรูปภาพ</p>
                        <p className="CheckDuplicateCateName13 Hide" ><IoIcons5.IoAlertCircleSharp />กรุณาเลือกรูปภาพ</p>
                        
                        <div className="Button-group-add-pro">
                            <button className="cancle-add-pro" onClick={()=>{manageAddModal("close");initialValue();hideError()}}>ยกเลิก</button>
                            {buttonWork === false ?
                                <button className="Ok-add-pro" disabled onClick={(e)=>{uploadFileToFirebase(e)}}>{productMode==="add"?"เพิ่ม":"บันทึก"}</button>
                                :
                                <button className="Ok-add-pro" onClick={(e)=>{uploadFileToFirebase(e)}}>{productMode==="add"?"เพิ่ม":"บันทึก"}</button>
                            }  
                        </div>
                    </div>
                    
                </div>    
            </div>
            {/*Add modal*/}
            

            {/*Info modal*/}
            <div  className="Modal-Info-Pro">
            
                <div className="Modal-Info-Pro-body">
                    <a className="x-add-product-from" onClick={()=>{manageInfoModal("close");initialValue();setFirstImg()}}><RiIcons.RiCloseLine /></a>
                   <div className="Info-Product-Box">
                       <div  className="Product-Group-layout">
                            <img id="firstImg" src={firstImg}/>
                            <div className="Group-II-Img">
                                <img src={productData.P_image1} onClick={()=>{setFirstImg(productData.P_image1)}} />
                                <img src={productData.P_image2} onClick={()=>{setFirstImg(productData.P_image2)}}/>
                                <img src={productData.P_image3} onClick={()=>{setFirstImg(productData.P_image3)}}/>
                            </div>
                       </div>
                       <div className="Product-Group-layout-II">
                           <label id="Product-price">฿{productData.P_price}</label>
                           <h1 className="Name-ProInfo-h1">{productData.P_name}</h1>
                           <label className="Pid-ProInfo-lb">รหัสสินค้า :{productData.P_productid}</label>
                           <p className="Pdetail-ProInfo-p">{productData.P_detail}</p>
                           <div className="BrandAndCate-InfoPro">
                               <div className="InfoPro-Cate">
                                 <label>หมวดหมู่ :</label>
                                 <p>{productData.Cg_name}</p>
                               </div>
                               <div className="InfoPro-Brand">
                                 <label>แบรนด์ :</label>
                                 <p>{productData.B_name}</p>
                               </div>
                               <div className="InfoPro-Brand">
                                 <label>สถานะสินค้า :</label>
                                 {productData.P_status ==12?
                                 <p>สินค้าในคลัง</p>
                                 :
                                 <p>สินค้าสั่งจอง</p>
                                }
                               </div>
                           </div>
                           <label className="Jamnun-ProInfo">จำนวนสินค้า (ตัว) :</label>
                           <div className="Size-Pro-Info-group">
                               <div className="Size-layout-ProInfo">
                           {Object.keys(showSize).length !== 0 ?
                           
                                showSize.map((size,index)=>(
                                    
                                        <div className="Size-button-InfoPro" 
                                            onMouseEnter={()=>{HoverDelete(index)}} 
                                            onMouseLeave={()=>{LeaveHover(index)}}
                                            onClick={()=>{ManageModelSizeDelete("show");setRemoveSize(size)}}
                                        >
                                            <label className="Size-inFoPro">{size.P_size}</label>
                                            <p>{size.P_size_amount}</p>
                                            <div className="bin-in-size-Proinfo"><RiIcons.RiDeleteBin7Fill/></div>
                                        </div> 
                                    
                               ))
                            :null} </div>  
                               <div className="Add-Size-button-ProInfo">
                                    <a onClick={()=>{manageAddSizeModal("show")}}><AiIcons.AiOutlinePlusCircle />เพิ่มไซส์</a>
                               </div>
                           </div>
                           <div className="button-InfoPro-Group">
                               <button  onClick={()=>{setProductMode("edit");manageAddModal("show");manageInfoModal("close");setProductUpdateStaffData(productData)}}>แก้ไขสินค้า</button>
                           </div>

                       </div>
                   </div>
                    
                    
                </div>    
            </div>

            {/*Info modal*/}


            {/*Add Size modal*/}
            <div  className="Modal-Add-Size-Product">
                <div className="Modal-Add-Size-Product-body">
                    <a className="x-add-product-from" onClick={()=>{manageAddSizeModal("close");setSizeAdd(sizeData);hideError02();}}><RiIcons.RiCloseLine /></a>
                    <h1>เพิ่มไซส์</h1>
                    <div className="Size-From-group">
                        <div className="inputdata-Add-amount-Proinfo">
                            <p id="select-size-Add-amount-02">เลือกไซส์</p>
                            <select name="P_size" value={sizeAdd.P_size}  onChange={(e)=> handleChangeSize(e)}>
                                <option value=""></option>
                                <option value="XS">XS</option>
                                <option  value="S">S</option>
                                <option  value="M">M</option>
                                <option  value="L">L</option>
                                <option  value="XL">XL</option>
                                <option  value="XXL">XXL</option>
                            </select>
                        </div>

                        

                        {loading? 
                            <Preloader
                                use={Puff}
                                size={20}
                                strokeWidth={6}
                                strokeColor="#262626"
                                duration={2000}
                            />
                        :null}
                        
                        <p className="CheckDuplicateCateName03 Hide"><IoIcons5.IoAlertCircleSharp />ไซส์นี้มีในระบบแล้ว</p>
                        <p className="CheckDuplicateCateName04 Hide"><IoIcons.IoIosCheckmarkCircle />ไซส์นี้สามารถใช้ได้</p>
                        <p className="CheckDuplicateCateName14 Hide"><IoIcons5.IoAlertCircleSharp />กรุณากรอกชื่อไซส์</p>
                        
                        <div className="size-input-group">
                            <Input name="P_size_amount" value={sizeAdd.P_size_amount}  type="number" min="0" max="599"  onChange={(e)=> handleChangeSizeandAmount(e)}/>
                            <p id="Size-input-amount">จำนวน(ตัว)</p>
                        </div>

                        <p className="CheckDuplicateCateName15 Hide"><IoIcons5.IoAlertCircleSharp />จำนวนสินค้ามากเกินไป</p>
                        <p className="CheckDuplicateCateName16 Hide"><IoIcons5.IoAlertCircleSharp />ไม่สามารถกรอกจำนวนลบได้</p>
                        <p className="CheckDuplicateCateName17 Hide"><IoIcons5.IoAlertCircleSharp />กรุณากรอกจำนวนสินค้า</p>
                        <p className="CheckDuplicateCateName18 Hide"><IoIcons.IoIosCheckmarkCircle />จำนวนสินค้าสามารถใช้ได้</p>


                        <div className="size-button-group">
                            <a onClick={()=>{manageAddSizeModal("close");setSizeAdd(sizeData);hideError02();}}>ยกเลิก</a>
                            {buttonWork === false ?
                            <button onClick={()=>{addProductSize()}} disabled>เพิ่ม</button>
                            :
                            <button onClick={()=>{addProductSize()}}>เพิ่ม</button>
                            }
                        </div>
                    </div>
                </div>    
            </div>
            {/*Add Size modal*/}
            {/*Delete Size modal*/}
            <div id="Modal-Delete-Cate" className="Modal-Delete-Cate">
                <div className="Modal-Delete-Cate-body">
                    <h4>คุณต้องการจะลบไซส์ {removeSize.P_size} ใช่หรือไม่</h4>
                    <div className="button-Cate-group-Delete">
                            <a onClick={() => {ManageModelSizeDelete("close")}} className="Close-modal-Cate-Delete">ไม่ใช่</a>
                            <button  className="Save-Cate-submit-Delete" onClick={()=>{deleteSize(removeSize)}}>
                                ใช่
                            </button>
                    </div>
                    
                </div>    
            </div>
            {/*Delete Size modal*/}

            {/*Add Amount Size modal*/}
            <div  className="Modal-Add-Amount-Size">
                <div className="Modal-Add-Amount-Size-body">
                    <h1>เพิ่มจำนวนสินค้า</h1>
                    <a className="x-add-product-from" onClick={()=>{manageAddAmountModal("close");setAddAmountSize(sizeData);hideError03();}}><RiIcons.RiCloseLine /></a>
                    <div className="inputdata-Add-amount-Proinfo">
                        <p id="select-size-Add-amount">เลือกไซส์</p>
                        <select name="P_size" value={addAmountSize.P_size}  onChange={(e)=> handleChangeAddSize(e)}>
                            <option></option>
                            {Object.keys(allSize).length !== 0 ?
                                    allSize.filter(aSize => aSize.P_productid === productData.P_productid).map(AmountS => (
                                        
                                        <option value={AmountS.P_size}>{AmountS.P_size}</option>
                                       
                                    )):null}
                        </select>
                    </div>

                    <p className="CheckDuplicateCateName19 Hide"><IoIcons5.IoAlertCircleSharp />กรุณาเลือกไซส์</p>

                    <br></br>
                    <div className="inputdata-Add-amount-Proinfo">
                        <p id="input-Pro-Add-amount">จำนวน</p>
                        <Input  name="P_size_amount" type="number" min="0" max="599" value={addAmountSize.P_size_amount} onChange={(e)=> handleChangeAddSize02(e)}/>
                    </div>

                        <p className="CheckDuplicateCateName20 Hide"><IoIcons5.IoAlertCircleSharp />จำนวนสินค้ามากเกินไป</p>
                        <p className="CheckDuplicateCateName21 Hide"><IoIcons5.IoAlertCircleSharp />ไม่สามารถกรอกจำนวนลบได้</p>
                        <p className="CheckDuplicateCateName22 Hide"><IoIcons5.IoAlertCircleSharp />กรุณากรอกจำนวนสินค้า</p>
                        <p className="CheckDuplicateCateName23 Hide"><IoIcons.IoIosCheckmarkCircle />จำนวนสินค้าสามารถใช้ได้</p>
                

                    <div className="button-Pro-group-Delete-Amount">
                            <a onClick={() => {manageAddAmountModal("close");setAddAmountSize(sizeData);hideError03();}} >ไม่ใช่</a>
                            {buttonWork === false ?
                            <button  className="Save-Cate-submit-Delete" onClick={()=>{updateStockSize(productData.P_productid)}} disabled>
                                ใช่
                            </button>
                            :
                            <button  className="Save-Cate-submit-Delete" onClick={()=>{updateStockSize(productData.P_productid)}}>
                                ใช่
                            </button>
                            }   
                    </div>
                </div>    
            </div>
            {/*Add Amount Size modal*/}
        </div>
    )
}



export default ManageProduct
