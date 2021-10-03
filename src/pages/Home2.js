import React,{useState,useEffect} from 'react'
import '../css/Home2.css'
import * as axiosData from '../service/Service';
import * as IoIcon from "react-icons/io";
import {  useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";



const Home2 = () => {
    const history = useHistory();

    const [newlessProduct,setNewlessProduct] = useState([])
    const [newlessPromotion,setNewlessPromotion] = useState([])
    const [hottesProduct,setHottesProduct] = useState([])
  
    
    
    useEffect(initialValue,[]);
    function initialValue(){  
        axiosData.newlessProduct().then(function (data){
            setNewlessProduct(data)
        }) 
        
        axiosData.showPromotionNew().then(function (data){
            setNewlessPromotion(data)
        })

        axiosData.hotProduct().then(function (data){
            setHottesProduct(data[0])
        })
    }

    const GotoProduct = () =>{
        history.push("/Home/Product");
    }
    const GotoPromotion = () =>{
        history.push("/Home/Promotion");
    }

    return (
        
        <div className="body-Home2">

            <div className="videoDiv">
                <video autoPlay loop muted  > 
                    <source src='assets/home/index1.mp4' type="video/mp4"/>
                </video>
            </div>
            
            <div className="NewProduct_Group">
                <h1>Newest product</h1>
                <h3 onClick={()=>{GotoProduct()}} className="seeallProduct">see all</h3>
                <div className="NewProduct_layout">
                    {newlessProduct ? newlessProduct.map(item=>(
                    <div className="NewProductCard">
                        <img src={item.P_image1}/>
                        <h3>{item.P_name}</h3>
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
                            <button>buy now</button>
                        </Link>
                    </div>
                    ))
                :null
                }
                </div>
            </div>

            <div className="NewPromotion_Group">
                <h1>Newest promotion</h1>
                <h3 onClick={()=>{GotoPromotion()}} className="seeallProduct">see all</h3>
                <div className="NewPromotion_layout">
                    {newlessPromotion ? newlessPromotion.map(item=>(
                    <div className="NewPromotionCard">
                        <img src={item.Pr_image}/>
                        <h3>{item.P_name}</h3>
                        
                    </div>
                    ))
                :null
                }
                </div>
            </div>

            <div className="TopBodyAll">
                <Link to={{pathname:"/Home/Category",
                    state:{
                        Cg_categoryid:'CG0001'
                    }
                }}>
                    <div className="TopGroup">
                        <img src="/assets/home/top.jpg"/>
                        <h1 className="textTop">TOP</h1>
                    </div>
                </Link>
            </div>

            <div className="TopBodyAll2">
                <Link to={{pathname:"/Home/Category",
                    state:{
                        Cg_categoryid:'CG0002'
                    }
                }}>
                    <div className="TopGroup2">
                        <img src="/assets/home/bottom.jpg"/>
                        <h1 className="textTop2">BOTTOM</h1>
                    </div>
                </Link>
            </div>

            {hottesProduct ?
            <div className="TopBodyAll3">
                    <Link className="Link-producttoInfo" to={{pathname:"/Home/ProductInfo", 
                        state:{
                            B_brandid:hottesProduct.B_brandid,
                            B_image:hottesProduct.B_image,
                            B_name:hottesProduct.B_name,
                            Cg_categoryid:hottesProduct.Cg_categoryid,
                            Cg_name:hottesProduct.Cg_name,
                            P_detail:hottesProduct.P_detail,
                            P_image1:hottesProduct.P_image1,
                            P_image2:hottesProduct.P_image2,
                            P_image3:hottesProduct.P_image3,
                            P_name:hottesProduct.P_name,
                            P_price:hottesProduct.P_price,
                            P_productid:hottesProduct.P_productid,
                            Pr_promotion_code:hottesProduct.Pr_promotion_code,
                            S_statusid:hottesProduct.S_statusid
                     }}} >
                    <div className="TopGroup3">
                        <img src="/assets/home/hot.jpg"/>
                        <h1 className="textTop3">HOTTEST</h1>
                    </div>
                </Link>
            </div>
            :null}
     
            <h1 className="secretword">Hello</h1>
        </div>
    )
}

export default Home2
