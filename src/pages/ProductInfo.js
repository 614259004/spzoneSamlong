import React,{useState, useEffect} from 'react'
import '../css/ProductInfo.css';
import * as axiosData from '../service/Service';
import * as TiIcons from "react-icons/ti";
import {  useHistory } from 'react-router-dom';


const ProductInfo = (props) => {
    const history = useHistory();

    const [proData,setProData] =useState([]);
    const [fristImg,setFristImg] =useState();
    const [size,setSize] =useState([]);
    const [radioSelect,setRadioSelect] =useState('');
    const [selectSize,setSelectSize] =useState("select size ");
    const [nameSize,setNameSize]=useState();
    const [amountOfPro,setAmountOfPro] =useState(1);
    
    

    var clothSize = ["XS","S","M","L","XL","XXL"];
    
    

    
    
    useEffect(initialValue,[]);
    function initialValue(){
        setProData(props.location.state);
        setFristImg(props.location.state.P_image1)
        setAmountOfPro(1);
        setRadioSelect('');
        
        var Pid =props.location.state
        document.querySelector(".minusButtonProFont").setAttribute("disabled", "disabled");
        document.querySelector(".plusButtonProFont").setAttribute("disabled", "disabled");
        


        axiosData.showsize(Pid).then(function (data){

            const allSize = [];
            
            for(let i =0 ; i< clothSize.length ; i++){
                data.filter(x=> x.P_size == clothSize[i]).map(y=> {allSize.push(y)   })
            }

            setSize(allSize);

        })
        
    }
    
   

    

    const plusAmount = () => {
        var valueAmount = document.getElementById("amount_ProInFo").value;

        valueAmount++;

        document.getElementById("amount_ProInFo").value = valueAmount

        if(valueAmount >1){
            document.querySelector(".minusButtonProFont").removeAttribute("disabled");
            document.querySelector(".minusButtonProFont").classList.remove("disabled");
        }

        if(valueAmount >= selectSize){
            document.querySelector(".plusButtonProFont").setAttribute("disabled", "disabled");
        }
        if(valueAmount < selectSize){
            document.querySelector(".plusButtonProFont").removeAttribute("disabled");
            document.querySelector(".plusButtonProFont").classList.remove("disabled");
        }

        
        setAmountOfPro(valueAmount);
        

    } 



    const minusAmount = () => {
        var valueAmount = document.getElementById("amount_ProInFo").value;

        valueAmount--;

        document.getElementById("amount_ProInFo").value = valueAmount


        if(valueAmount ==1){
            document.querySelector(".minusButtonProFont").setAttribute("disabled", "disabled");
        }
        if(valueAmount < selectSize){
            document.querySelector(".plusButtonProFont").removeAttribute("disabled");
            document.querySelector(".plusButtonProFont").classList.remove("disabled");
        }
        
        setAmountOfPro(valueAmount);
    } 

    const handelchangeRadeo = (item) => {
        setAmountOfPro(1);
        document.querySelector(".plusButtonProFont").removeAttribute("disabled");
        document.querySelector(".plusButtonProFont").classList.remove("disabled");
        document.querySelector(".minusButtonProFont").setAttribute("disabled", "disabled");
        setNameSize(item.P_size);
        setSelectSize(item.P_size_amount);
    }

    const buyProduct =() => {
        if(localStorage.getItem('UserId') == null){
            history.push("/Login");
        }else{
            const prodetail ={
                P_productid:proData.P_productid,
                C_customerid:localStorage.getItem('UserId'),
                P_size:nameSize,
                Ca_amount:amountOfPro
            }
            axiosData.addCart(prodetail).then(function (data){
                history.push("/Home/cart");
                window.location.reload();
            })

            
        }
        
    }

    const AddProductToCart =() => {
        if(localStorage.getItem('UserId') == null){
            history.push("/Login");
            
            window.location.reload();
        }else{
            const prodetail ={
                P_productid:proData.P_productid,
                C_customerid:localStorage.getItem('UserId'),
                P_size:nameSize,
                Ca_amount:amountOfPro
            }

            axiosData.addCart(prodetail).then(function (data){
                initialValue();
            })

            
        }
        
    }
    
    const goBackBefore = () =>{
        history.goBack()
    }

    

    return (
        <div className="body_Product_Info">
            
            <div className="left_productInfo_page">
                <div className="ProInfo-back-Pro" onClick={()=>{goBackBefore()}}>
                    <TiIcons.TiArrowLeft />
                </div>
                <img src={fristImg} className="fristImg_show" />
                <div className="group_show_img_font">
                    <img src={proData.P_image1} className="fristImg_secrond_1" onClick={()=>{setFristImg(proData.P_image1)}} />
                    <img src={proData.P_image2} className="fristImg_secrond_2" onClick={()=>{setFristImg(proData.P_image2)}} />
                    <img src={proData.P_image3} className="fristImg_secrond_3"onClick={()=>{setFristImg(proData.P_image3)}}  />
                </div>
            </div>
            <div className="right_productInfo_page">
                <div className="box_of_info_product">
                    <div className="tag_of_product">
                        <a href="" className="brandName_tag">{proData.B_name}</a>
                        <p>/</p>
                        <a href="" className="cateNmae_tag">  {proData.Cg_name}</a>
                    </div>
                    <h2 className="Name_of_proInfo">{proData.P_name}</h2>
                    <h4 className="Price_of_proInfo">{proData.P_price}.00 ฿</h4>
                    <p className="Info_of_proInfo">{proData.P_detail}</p>
                    <p className="Stock_of_size">in stock : {selectSize}</p>
                    <div className="Group_of_amount_Size">   
                        {Object.keys(size).length !== 0 ?
                            size.map(ProSize => (
                            <div className="radio-input-group-proInfo">
                                
                                    <input type="radio" checked={radioSelect === ProSize.P_size} name="radio_size_select_info" id={ProSize.P_size} onClick={()=>{handelchangeRadeo(ProSize)}}></input>
                                    <label for={ProSize.P_size} onClick={()=>{setRadioSelect(ProSize.P_size);}}>
                                        <span>{ProSize.P_size}</span>
                                    </label>
                    
                            </div>    
                        )):null}
                       
                        
                    </div>
                    <div className="plus_minus_group">          
                                <button className="minusButtonProFont " onClick={()=>{minusAmount()}}>-</button>
                                <input type="text" value={amountOfPro}  id="amount_ProInFo" name="Cart_amount"   disabled></input>
                                <button className="plusButtonProFont" onClick={()=>{plusAmount()}}>+</button>
                    </div>
                    <div className="buy_group">
                        <button className="button_add_cart" onClick={()=>{AddProductToCart()}}>add to cart</button>
                        <button className="buy_proInfo" onClick={()=>{buyProduct()}}>buy</button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ProductInfo