import React,{useState, useEffect} from 'react'
import * as axiosData from '../service/Service';
import '../css/Product.css';
import { Link } from "react-router-dom";


function BrandProduct(props) {



    const [showProduct , setShowProduct] = useState([]);
    const Bid = props.location.state.B_brandid


    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showproduct().then(function (data){
            setShowProduct(data);
            console.log(data);
        })
    }



    return (


            <div className="Product-card-layout-show">
                {showProduct!==undefined?showProduct.filter(sb=>sb.B_brandid===Bid).map((item)=>(
                    <Link className="Link-producttoInfo" to={{pathname:"/Home/ProductInfo", 
                    state:{
                        B_brandid:item.B_brandid,
                        B_image:item.B_image,
                        B_name:item.B_name,
                        Cg_categoryid:item.Cg_categoryid,
                        Cg_name:item.Cg_name,
                        P_detail:item.P_detail,
                        P_image1:item.P_image1,
                        P_image2:item.P_image2,
                        P_image3:item.P_image3,
                        P_name:item.P_name,
                        P_price:item.P_price,
                        P_productid:item.P_productid,
                        Pr_promotion_code:item.Pr_promotion_code,
                        S_statusid:item.S_statusid
                     }}} >
                        <div className="Product-show-font-card">
                            <div className="Product-img-show-font">
                                <img src={item.P_image1} />
                            </div>
                            <h2 className="Product-name-font-h2">{item.P_name}</h2>
                            <h5 className="Product-price-font-h5">{item.P_price}.00฿</h5>
                        </div>
                    </Link>
                )):null}<h1 className="bugHello">hello</h1>
            </div>


    )
}

export default BrandProduct