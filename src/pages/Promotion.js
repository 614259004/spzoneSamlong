import React,{useState, useEffect} from 'react';
import "../css/Promotion.css";
import * as axiosData from '../service/Service';

function Promotion() {

    const [dataPromotion,setDataPromotion] = useState([]);

    useEffect(initialValue,[]);
    function initialValue(){
        axiosData.getPromotionUse().then(function(data){
            setDataPromotion(data);
        })
    }
    console.log(dataPromotion);
    return(
        <div>
            <div className="body">
                {dataPromotion != null ? dataPromotion.map((proItem)=>(
                <div className="body-card">
                        <img src={proItem.Pr_image} />
                            <br/>
                        <h3> {proItem.P_name} </h3>
                        <h4> size {proItem.Pr_size}</h4>
                        <br />
                            <p> Sale {proItem.Pr_sale}.00 ฿ / 1 User</p>
                            <p> Timeout {proItem.Pr_time_out} </p>
                        <br />
                    <div>
                        
                        {/* <a href="#" className="button">
                            Add to cart
                        </a> */}
                    </div>
                </div>
               )): null }
            </div>
        </div>
    )
}

export default Promotion