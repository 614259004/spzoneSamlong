import React,{useState, useEffect} from 'react';
import "../css/Brand.css";
import * as axiosData from '../service/Service';
import { Link } from "react-router-dom";

const Brand = () => {

    const [dataBrand,setDataBrand] = useState([]);

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.showbrand().then(function(data){
            setDataBrand(data.sp_brand);
            
        })
    }

return(
    <div>

            <div className="cardBrand">
            {dataBrand != null ? dataBrand.map((brandItem)=>(
                <div className="bodyBrand">
                <Link to={{pathname:"/Home/BrandProduct",
                    state:{
                        B_brandid:brandItem.B_brandid
                    }
                }}>
                    <div className="imgBrand">
                        <img src={brandItem.B_image} />
                        <div className="bgtext">

                        </div>
                        <h2 className="textBrand"> {brandItem.B_name} </h2>
                    </div>
                </Link>   
                </div>    
            )):null }<h1 className="bugHello">hello</h1>
            </div>

            

    </div>
)

}

export default Brand;