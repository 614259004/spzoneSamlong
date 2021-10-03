import React,{useState , useEffect} from 'react'
import * as axiosData from '../service/Service';
import NewChartarea from '../components/NewChartarea'
import '../css/Dashboard.css';
import NewChart from '../components/NewChart'
import NewDonut from '../components/NewDonut'


const Dashboard = () => {
    
    let dpS ={
        P_size: "",
        sellAmount: ""
    }

    

    let newDate = new Date()
        let day = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let years = newDate.getFullYear();
        const Today={
            date:day,
            months:month,
            year:years
        }

        const thismonth ={
            months:month,
            year:years
        }
        
        const Y={
            year:years
        }

        const thisyear ={year:years}

    const [toDayTotal,setToDayTotal] = useState(0);
    const [thisMonthTotal,setThisMonthTotal] = useState(0);
    const [thisYearTotal,setThisYearTotal] = useState(0);
    const [allProduct,setAllProduct]=useState([]);
    const [allBrand,setAllBrand] = useState([]);
    const [dataBrand,setDataBrand] = useState([]);


    const [selectProduct,setSelectProduct]=useState();
    const [dataProduct,setDataProduct]=useState([dpS]);

    const [sendDataBrand,setSendDataBrand] = useState([]);
    const [sendBN,setSendBN] = useState([]);

    const [selectYear,setSelectYear]=useState(Y);
    const [dataYear,setDataYear]=useState([]);
    const [sendYearTochart,setSendYearToChart]=useState()
    const [yearInOrder,setYearInOrder]=useState([])

    const [chartMode,setChartMode] = useState('Product');


    useEffect(initialValue,[]);
    function initialValue(){
        setSelectYear(Y)
        axiosData.showbrand().then(function(data){
            setAllBrand(data.sp_brand);
        })
        axiosData.selectYearOrder().then(function(data){
            setYearInOrder(data);
        })
        axiosData.showSellProByBrand().then(function(data){
            setDataBrand(data);
        })
        axiosData.showproduct().then(function (data){
            setAllProduct(data);
            setSelectProduct(data[0].P_productid)
          
        })
        axiosData.showTotalToDay(Today).then(function (data){
            setToDayTotal(data[0].todayprice) 
        })
        axiosData.showTotalInMonth(thismonth).then(function (data){
            setThisMonthTotal(data[0].thismonthprice)
        })
        axiosData.showTotalInYear(thisyear).then(function (data){
            setThisYearTotal(data[0].thisyearprice)
        })
        
    }
    

    const findTotalSizeProduct = () => {
        if(selectProduct){
            let Pid={P_id:selectProduct}
            axiosData.showSellProBySize(Pid).then(function (data){
                setDataProduct(data)
            })
            
        }else{
            // setTotalShow(0);
            
        }
    }

    useEffect(findTotalSizeProduct,[selectProduct]);

    const findTotalYear = () => {
        if(selectYear){
            let Yid={year:selectYear}
            axiosData.showSellProByYear(selectYear).then(function(data){
                setDataYear(data);
                
            })
            
        }else{
            // setTotalShow(0);
            
        }
    }

    useEffect(findTotalYear,[selectYear]);
    
    const [sizeDataSend,setSizeDataSend] = useState()
    
    

    const setDataSizeProduct = () =>{
        if(dataProduct){
            let data = {XS:0,S:0,M:0,L:0,XL:0,XXL:0}
            
            for( let i = 0 ; i < dataProduct.length ; i++){

                let size = dataProduct[i].P_size
                if(size == 'XS'){
                    data.XS=dataProduct[i].sellAmount
                }else if(size == 'S'){     
                    data.S=dataProduct[i].sellAmount
                }
                else if(size == 'M'){
                    data.M=dataProduct[i].sellAmount
                }
                else if(size == 'L'){
                    data.L=dataProduct[i].sellAmount
                }
                else if(size == 'XL'){
                    data.XL=dataProduct[i].sellAmount
                }
                else if(size == 'XXL'){
                    data.XXL=dataProduct[i].sellAmount
                }
                
            }
            setSizeDataSend(data);
        }
    }

    useEffect(setDataSizeProduct,[dataProduct]);

    const sendDataYear = ()=>{
        if(dataYear){
            let dataM = {jan:0,feb:0,mar:0,Api:0,May:0,Jun:0,Jul:0,Aug:0,Sep:0,Oct:0,Nov:0,Dec:0}
            
            for( let i = 0 ; i < dataYear.length ; i++){

                let month02 = dataYear[i].months
                
                if(month02 == '1'){
                    dataM.jan=dataYear[i].totalM
                }else if(month02 == '2'){     
                    dataM.feb=dataYear[i].totalM
                }
                else if(month02 == '3'){
                    dataM.mar=dataYear[i].totalM
                }
                else if(month02 == '4'){
                    dataM.Api=dataYear[i].totalM
                }
                else if(month02 == '5'){
                    dataM.May=dataYear[i].totalM
                }
                else if(month02 == '6'){
                    dataM.Jun=dataYear[i].totalM
                }
                else if(month02 == '7'){
                    dataM.Jul=dataYear[i].totalM
                }
                else if(month02 == '8'){
                    dataM.Aug=dataYear[i].totalM
                }
                else if(month02 == '9'){
                    dataM.Sep=dataYear[i].totalM
                }
                else if(month02 == '10'){
                    dataM.Oct=dataYear[i].totalM
                }
                else if(month02 == '11'){
                    dataM.Nov=dataYear[i].totalM
                }
                else if(month02 == '12'){
                    dataM.Dec=dataYear[i].totalM
                }
                
            }
            setSendYearToChart(dataM);
        }
    }

    useEffect(sendDataYear,[dataYear]);
    
    
    const sendDonutData = () =>{
        if(dataBrand){
            let bd =[]
            let bn =[]
            for(let i = 0 ; i < allBrand.length ; i++){
                if(dataBrand.some(tk=>tk.B_name === allBrand[i].B_name) === true){
                    for(let l =0 ;l < dataBrand.length ; l++){
                        if(dataBrand[l].B_name === allBrand[i].B_name){
                            bd.push(parseInt(dataBrand[l].B_amound))
                            bn.push(allBrand[i].B_name)
                        }
                    }
                }else{
                    bd.push(0)
                    bn.push(allBrand[i].B_name)
                }
            }
            setSendBN(bn)
            setSendDataBrand(bd)
            
        }
    }
    

    const deleteST =()=>{
        var sal = document.getElementsByClassName('headTapChart');
        
        if(sal.length != null){
            var bg = document.getElementsByClassName('headTapChart  black_tap');
            
            if(bg.length != 0){
                for(let i = 0 ; i<=bg.length;i++){
                    var salw = bg[i];
                    salw.classList.remove("black_tap");
                }
            }
        }
    }

    const selectTap = (index)=>{
        deleteST();
        var st = document.getElementsByClassName('headTapChart')[index];
        st.classList.add("black_tap");
    }

    const deletePD =()=>{
        var sal = document.getElementsByClassName('pdSelectlist');
        
        if(sal.length != null){
            var bg = document.getElementsByClassName('pdSelectlist  black_pro');
            
            if(bg.length != 0){
                for(let i = 0 ; i<=bg.length;i++){
                    var salw = bg[i];
                    salw.classList.remove("black_pro");
                }
            }
        }
    }

    const selectChart01 = (index)=>{
        deletePD();
        var st = document.getElementsByClassName('pdSelectlist')[index];
        st.classList.add("black_pro");
    }

    const handelYear = (e)=>{
        e.persist();
        setSelectYear({...selectYear,year: e.target.value});
    }

    

    return (
        <div className="brand-body-page">
            
                <div className="groupDMYTotal">
                    <div className="boxoftotalDMY">
                        <h5>ยอดขายวันนี้</h5>
                        {toDayTotal != null?
                            <h2>{toDayTotal}.00</h2>
                        :
                            <h2>0.00</h2>
                        }
                    </div>
                    <div className="boxoftotalDMY">
                        <h5>ยอดขายเดือนนี้</h5>
                        {thisMonthTotal != null?
                            <h2>{thisMonthTotal}.00</h2>
                        :
                            <h2>0.00</h2>
                        }
                    </div>
                    <div className="boxoftotalDMY">
                        <h5>ยอดขายปีนี้</h5>
                        {thisYearTotal != null?
                            <h2>{thisYearTotal}.00</h2>
                        :
                            <h2>0.00</h2>
                        }
                    </div>
                </div>
                <div>
                    <div className="tapGroupChrat">
                        <h5 className="headTapChart black_tap" onClick={()=>{setChartMode('Product');selectTap(0)}}>สินค้า</h5>
                        <h5 className="headTapChart" onClick={()=>{setChartMode('Brand');selectTap(1);sendDonutData()}}>แบรนด์</h5>
                        <h5 className="headTapChart" onClick={()=>{setChartMode('Year');selectTap(2);sendDataYear()}}>ยอดรายปี</h5>
                    </div> 
                    {chartMode === 'Product'?
                    <div className="TCGroup">
                        <div className="TC01">
                        {sizeDataSend ?
                                <NewChart   P_Data={sizeDataSend}/>
                            :null}
                        </div>
                        <div className="TC02">
                            {allProduct ? allProduct.map((pd,index)=>(
                                <div className='pdSelectlist' onClick={()=>{setSelectProduct(pd.P_productid);selectChart01(index)}}>
                                    <img src={pd.P_image1} />
                                    <h3>{pd.P_name}</h3>
                                </div>
                            ))
                            :null}
                        </div>
                    </div>
                    :chartMode === 'Brand'?
                    
                    <div className="DonutBox">
                        {sendDataBrand && sendBN ?
                            <NewDonut B_data={sendDataBrand} B_Na={sendBN}/>
                        :null}
                    </div>
                    :chartMode === 'Year'?
                    <div className="areaChartBox">
                        {sendYearTochart ?
                            <NewChartarea Y_data={sendYearTochart}/>
                        :null}
                        
                            <select value={selectYear.year} onChange={(e)=>{handelYear(e)}} name='year'>
                                {yearInOrder ? yearInOrder.map(YY=>(
                                    <option value={YY.yearr}>{YY.yearr}</option>
                                ))
                                :null}
                            </select>
                        
                    </div>
                    :null}
                </div>
                
                
                        
            
        </div> 
    )
}

export default Dashboard
