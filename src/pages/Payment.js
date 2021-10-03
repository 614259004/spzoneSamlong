import React,{useState, useEffect} from 'react'
import '../css/Payment.css';
import * as axiosData from '../service/Service';
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as GoIcons from "react-icons/go";
import * as MdIcons from "react-icons/md";
import * as BsIcons from "react-icons/bs";
import {storage} from "../firebase";
import {  useHistory } from 'react-router-dom';


const Payment = (prop) => {
    const history = useHistory();
    const initPayment ={
        Or_imgpayment:"",
        Or_imgpaymentFile:""
    }

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

  
    const [addressShow,setAddressShow] = useState([]);
    const [cartShow,setCartShow] = useState([]);
    const [headPayment,setHeadPayment] = useState('Address');
    const [totalShow,setTotalShow] = useState(0);
    const [billData , setBillData] = useState(initPayment);
    const [selectAdd , setSelectAdd] = useState('');
    const [newAddress, setNewAddress] = useState(initNewAdd);
    const [fnOrdermodal,setFnOrdermodal] = useState('close');
    const [promodata,setPromodata] = useState([]);
    const [allProvince, setAllProvince] = useState([]);
    const [allAmphur, setAllAmphur] = useState([]);
    const [allDistrict, setAllDistrict] = useState([]);

    const [selectProvince, setSelectProvince] = useState();
    const [selectAmphur, setSelectAmphur] = useState();
    
    const C_id = {C_customerid:localStorage.getItem('UserId')};

    useEffect(initialValue,[addressShow]);
    function initialValue(){

        setPromodata(prop.location.state)
        ManageModalFnOrder();
        axiosData.getAddress(C_id).then(function (data){
            setAddressShow(data)
            
        })
        axiosData.getCart(C_id).then(function (data){
            setCartShow(data)
            
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

    const deleteBg =()=>{
        var sal = document.getElementsByClassName('address_payment_group');
        
        if(sal.length != null){
            var bg = document.getElementsByClassName('address_payment_group  black_address');
            
            if(bg.length != 0){
                for(let i = 0 ; i<=bg.length;i++){
                    var salw = bg[i];
                    salw.classList.remove("black_address");
                }
            }
        }
    }


    const goShop =()=>{
        history.push("/Home/Product");
            
        window.location.reload();
    }

    const goHome =()=>{
        history.push("/Home");
            
        window.location.reload();
    }

    const findTotal = () => {
        var total = 0
        for(var i =0 ; i< cartShow.length ; i++){
            var sum = cartShow[i].P_price * cartShow[i].Ca_amount;
            
             total = total + parseInt(sum);
             setTotalShow(total+50);
        }
    }

    useEffect(findTotal,[cartShow]);

    const selectFile = (e) =>{
        
        setBillData({...billData,Or_imgpayment:URL.createObjectURL(e.target.files[0]),[e.target.name]: e.target.files[0]});
        
    }


    const handleChangeNewAddress = (e) =>{
        e.persist();
        setNewAddress({...newAddress,[e.target.name]: e.target.value});  
    }
    const ProvincehandleChange = (e) => {
        e.persist();
        setNewAddress({...newAddress,[e.target.name]: e.target.value});
        setSelectProvince(e.target.value)
    }
    const AmphurhandleChange = (e) =>{
        e.persist();
        setNewAddress({...newAddress,A_district: e.target.value});
        setSelectAmphur(e.target.value)
    }

    const selectAddress = (index,id) => {
        deleteBg();
        var sa = document.getElementsByClassName('address_payment_group')[index];
        sa.classList.add("black_address");
        
    }

    const slidePayment =(index)=>{
        var s = document.getElementsByClassName('Payment_step');
        if(selectAdd != ''){
            for(let i = 0 ; i < s.length ; i++){
                if( i === index){
                    var x = document.getElementsByClassName('Payment_bullet')[index];
                    var y = document.getElementsByClassName('Payment_check')[index];
                    var z = document.getElementsByClassName('Payment_progress_p')[index];
                    const slidePage = document.querySelector(".slidepage");
                    
                    x.classList.add("active");
                    y.classList.add("active");
                    z.classList.add("active");
                    if(i === 0){
                        
                        slidePage.style.marginLeft="-55%";
                    }
                
                }
            }
        }

    }

    const manageModalAddAddress = (status) => {
        var modal = document.getElementsByClassName('Modal_Add_Address_Payment')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
            setNewAddress(initNewAdd);
        }
    }

    const backSlide = (index) => {
        var s = document.getElementsByClassName('Payment_step');

        for(let i = 0 ; i < s.length ; i++){
            if(i === index){
                var x = document.getElementsByClassName('Payment_bullet')[index];
                var y = document.getElementsByClassName('Payment_check')[index];
                var z = document.getElementsByClassName('Payment_progress_p')[index];
                const slidePage = document.querySelector(".slidepage");
                
                x.classList.remove("active");
                y.classList.remove("active");
                z.classList.remove("active");
                if(i === 0){
                    slidePage.style.marginLeft="0%";
                }
                
            }
        }
    }

    const clearData = () =>{
        setSelectProvince('')
        setSelectAmphur('')
    }

    const addNewAddress = () =>{
        
        axiosData.addAddress(newAddress).then(function (data){
            initialValue();
            manageModalAddAddress("close")
            clearData();
        })
    }

    const triggerClick = () =>{
        document.querySelector('#ImgFileOrder').click();
    }

    const uploadFileToFirebase = (e) => {
        const timestamp = Math.floor(Date.now()/1000);
        const newName = timestamp + "-SPzone";
                    
        const uploadTask = storage.ref(`bills/${newName}`).put(billData.Or_imgpaymentFile);

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
            
                storage.ref("bills")
                    .child(newName)
                    .getDownloadURL()
                    .then((url)=>{
                        addOrders(url)
                    }
                    )
            }            
        )

    }

    const ManageModalFnOrder = () =>{
        var modal = document.getElementsByClassName('Modal_Finish_cart')[0];

        if(fnOrdermodal === "show"){
            modal.classList.add("show");
        } else if(fnOrdermodal === "close"){
            modal.classList.remove("show");
        
        }
    }

    const addOrders = (url) =>{
        if(promodata.Pr_promotion_code === 'PM0000'){
            var Or_data={
                Or_price:totalShow,
                Or_order_code:'test',
                C_customerid:localStorage.getItem('UserId'),
                A_addressid:selectAdd,
                Or_imgpayment:url,
                Or_Pr_id:promodata.Pr_promotion_code
            }
        }else{
            var Or_data={
                Or_price:totalShow-promodata.Pr_sale,
                Or_order_code:'test',
                C_customerid:localStorage.getItem('UserId'),
                A_addressid:selectAdd,
                Or_imgpayment:url,
                Or_Pr_id:promodata.Pr_promotion_code,
                Pr_promotion_code:promodata.Pr_promotion_code
            }
        }
        setFnOrdermodal('show');
        axiosData.addOrders(Or_data).then((data) =>{

            ManageModalFnOrder();
            
        })
    }

    return (
        <div className="Payment_body">
            <div className="Payment_card">
                {headPayment === 'Address' ?
                <h2 className="head_payment_icon">Select Address</h2>
                :
                <h2 className="head_payment_icon">Payment Page</h2>
                }
                <div className="Payment_progress_bar">
                    <div className="Payment_step">
                        <div className="Payment_bullet ">
                            <p className="Payment_progress_p "><GoIcons.GoPackage/></p>
                            <div className="Payment_check "><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                    <div className="Payment_step">
                        <div className="Payment_bullet">
                            <p className="Payment_progress_p"><BiIcons.BiMoney /></p>
                            <div className="Payment_check"><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                </div>


                <div className="payment_layout_form">

                    <div className="payment_page slidepage">
                        <div className="payment_field">
                            <div className="group_ofAddressPayment">
                            {Object.keys(addressShow).length !== 0 ?
                                addressShow.map((item,index) => (
                                    <div className="address_payment_group " onClick={()=>{selectAddress(index);setSelectAdd(item.A_addressid)}}>
                                        <h4>{item.A_receive_name}  {item.A_phone}</h4>
                                        <h5>
                                            {item.A_homenumber}  {item.A_moo} {item.DISTRICT_NAME} {item.AMPHUR_NAME} {item.PROVINCE_NAME} {item.A_postal_code}
                                        </h5>
                                
                                    </div>
                            )):null}
                            </div>
                            <h5 className="AddNewAddress_Payment" onClick={()=>{manageModalAddAddress("show")}}>+ add new address</h5>
                            {selectAdd != '' ?
                            <button className="Payment_button_next" onClick={()=>{slidePayment(0);setHeadPayment('Payment')}}>next<MdIcons.MdKeyboardArrowRight className="arrow_next_payment"/></button>
                            :
                            <button className="Payment_button_next">next<MdIcons.MdKeyboardArrowRight className="arrow_next_payment"/></button>
                            }
                        </div>
                    </div>

                    <div className="payment_page">
                        <div className="payment_field">
                            <div className="payment_container">
                                <div className="payment_bill">
                                    <div className="pay_data_group">
                                        <div className="payData">
                                            <p className="head_payment_product">product</p>
                                            <p className="head_payment_amount">amount</p>
                                            <p className="head_payment_price">price</p>
                                        </div>
                                        <div className="orderInFoLastPayment">
                                            {Object.keys(cartShow).length !== 0 ?
                                                cartShow.map(item => (
                                                    <div className="payData_02">
                                                        <p className="head_payment_product_02">{item.P_name}</p>
                                                        <p className="head_payment_amount_02">{item.Ca_amount}</p>
                                                        <p className="head_payment_price_02">{item.Ca_amount * item.P_price}.00฿</p>
                                                    </div>
                                                    
                                            )):null}
                                            
                                            <div className="payData_02">
                                                        <p className="head_payment_product_02">shipping</p>
                                                        <p className="head_payment_amount_02"></p>
                                                        <p className="head_payment_price_02">50.00฿</p>
                                            </div>
                                        </div>
                                        <div  className="payData_03">
                                            {promodata.Pr_promotion_code === 'PM0000'?
                                                <div className="payData_04">
                                                        <p className="total_name_payment">sale</p>
                                                        <p className="Total_number_payment_sale">- 0.00฿</p>
                                                </div>
                                                :
                                                <div className="payData_04">
                                                        <p className="total_name_payment">sale</p>
                                                        <p className="Total_number_payment_sale">- {promodata.Pr_sale}.00฿</p>
                                                </div>
                                            }       
                                            {promodata.Pr_promotion_code === 'PM0000'?
                                            <div className="payData_04">
                                                    <p className="total_name_payment">Total</p>
                                                    <p className="Total_number_payment">{totalShow}.00฿</p>
                                            </div>
                                            :
                                            <div className="payData_04">
                                                <p className="total_name_payment">Total</p>
                                                <p className="Total_number_payment">{totalShow - promodata.Pr_sale}.00฿</p>
                                            </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="payment_add_evidence">
                                    <div className="bank_admin_group">
                                        <img src="/assets/image/kbank-icon.png" />
                                        <div className="bank_data">
                                            <h4>024-3-89951-6</h4>
                                            <h4>นาย จิรายุค แซ่ลิ้ม</h4>
                                        </div>
                                        <img src="/assets/image/qrbank.jpg" />
                                    </div>
                                    <div className="input_add_img_payment">
                                        <div className="bill_img" for="ImgFileOrder" onClick={()=>{triggerClick()}}>
                                            <img  src={billData.Or_imgpayment} />
                                            {billData.Or_imgpayment === "" ?
                                            <p>select Image</p> : null}
                                        </div>
                                        <input type="file" accept="image/*" id="ImgFileOrder" onChange={selectFile}   className="ImgFileOrder" name="Or_imgpaymentFile"/>
                                        
                                    </div>
                                </div>

                                

                            </div>
                            <div className="button_group_payment">
                                <button className="button_group_payment_back" onClick={() => {backSlide(0);setHeadPayment('Address')}} >
                                    <MdIcons.MdKeyboardArrowLeft className="button_group_payment_back_icon" />back
                                </button>
                                {billData.Or_imgpayment != '' ?
                                    <button className="button_group_payment_next" onClick={(e)=>{slidePayment(1);uploadFileToFirebase(e)}}>
                                        submit<BsIcons.BsCheck className="button_group_payment_next_icon"/>
                                    </button>
                                :
                                    <button className="button_group_payment_next" >
                                        submit<BsIcons.BsCheck className="button_group_payment_next_icon"/>
                                    </button>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* ADD Address */}
                <div id="Modal_Add_Address_Payment" className="Modal_Add_Address_Payment">
                    <div className="Modal_Add_Address_Payment_body">
                        <h2>Add Address</h2>
                        <h4 onClick={()=>{manageModalAddAddress("close")}}><AiIcons.AiOutlineClose className="Close_Modal_Add_Address_Payment"/></h4>
                        <div className="input_Address_Payment_Name" >
                            <input placeholder="Recipient Name" name="A_receive_name" value={newAddress.A_receive_name} onChange={(e)=> handleChangeNewAddress(e)}/>
                        </div>
                        <div className="input_Address_Payment_Name" >
                            <input placeholder="Phone number" name="A_phone" value={newAddress.A_phone} onChange={(e)=> handleChangeNewAddress(e)}/>
                        </div>
                        <div className="input_Address_Payment_No_moo">
                            <input className="input_Address_Payment_No" name="A_homenumber" placeholder="House No." value={newAddress.A_homenumber} onChange={(e)=> handleChangeNewAddress(e)}/>
                            <input className="input_Address_Payment_Moo" name="A_moo" value={newAddress.A_moo} placeholder="Village No." onChange={(e)=> handleChangeNewAddress(e)}/>
                        </div>
                        <div className="input_Address_Payment_Province"  >
                            <select value={newAddress.A_province} placeholder="Province" name="A_province"   onChange={(e)=> ProvincehandleChange(e)} >
                                <option>PROVINCE</option>
                                {allProvince.length != 0 ? allProvince.map(item => (
                                    <option value={item.PROVINCE_ID}>{item.PROVINCE_NAME}</option>
                                )):null}
                            </select>
                        </div>
                        <div className="input_Address_Payment_canton_district">
                            <select value={newAddress.A_district} className="input_Address_Payment_district"  name="A_district"  placeholder="District" onChange={(e)=> AmphurhandleChange(e)}>
                                <option>DISTRICT</option>
                                {selectProvince != '' ?
                                    allAmphur.filter(data=> selectProvince === data.PROVINCE_ID).map(item => (
                                        <option value={item.AMPHUR_ID}> {item.AMPHUR_NAME} </option>
                                    ))
                                :null}
                            </select>

                            <select className="input_Address_Payment_canton" value={newAddress.A_canton} name="A_canton"  placeholder="Sub-district" onChange={(e)=> handleChangeNewAddress(e)}>
                                <option>SUB DISTRICT</option>
                                {selectAmphur != '' ?
                                    allDistrict.filter(data=> selectAmphur === data.AMPHUR_ID).map(item => (
                                        <option value={item.DISTRICT_ID}>{item.DISTRICT_NAME}</option>
                                    ))
                                :null}
                            </select>
                        </div>
                        <div className="input_Address_Payment_Province"  >
                        <select placeholder="Postal Code"  name="A_postal_code" value={newAddress.A_postal_code}  onChange={(e)=> handleChangeNewAddress(e)}>
                            <option>POSTCODE</option>
                            {selectAmphur != undefined? allAmphur.filter(data=> selectAmphur === data.AMPHUR_ID ).map(item => (
                                        <option value={item.POSTCODE}>{item.POSTCODE}</option>
                                    ))
                            :null}
                        </select>
                        </div>

                        <div className="button_Address_Payment_add">
                            
                            <button onClick={()=>{addNewAddress()}}>submit</button>
                        </div>         
                    </div>    
                </div>

            {/* ADD Address */}
            

            {/* finite Orders */}

            <div id="Modal_Finish_cart" className="Modal_Finish_cart">
                <div className="Modal_Finish_cart_body">
                    <h1>Successful purchase</h1>
                    <div className="Button_group_modal_fn_cart">
                        <button onClick={()=>{setFnOrdermodal('close');goShop()}} className="Button_Back_to_shopping">Back to shopping</button>    
                        <button onClick={()=>{setFnOrdermodal('close');goHome()}} className="Button_go_home">home</button>                          
                    </div>                            
                </div>    
            </div>


            {/* finite Orders */}



        </div>
    )
}

export default Payment
