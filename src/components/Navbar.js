import React,{useState, useEffect} from 'react';
import './Navbar.css';
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as MdIcons from "react-icons/md";
import * as FaIcons from "react-icons/fa";
import * as IoIcons from "react-icons/io";
import {SidebarData} from './Sidebardata';
import * as axiosData from '../service/Service';
import { Sling as Hamburger } from 'hamburger-react'
import { Redirect, useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";




function Navbar() {
    const history = useHistory();

    const cusData ={
        C_customerid:'',
        C_name:'',
        C_lastname:'',
        C_tel:'',
        C_image:'',
        S_statusid:'',
        L_email:'',
        L_password:''
    }

    

    const [isOpen, setOpen] = useState(false)
    const [colorHum, setColorHum] = useState('#000000')
    const [arrowEng, setArrowEng] = useState(false)
    const [userData, setUserData] = useState(cusData)
    const [useNavbar, setUseNavbar] = useState(false)
    const [cartData, setCartData] = useState([])
    const [profileModal, setProfileModal] = useState('close')
    const [ocCat, setocCat] = useState('open')
    const [dataCate, setDataCate] = useState([]);
    const [allProduct, setAllProduct] = useState([]);
    const [ocSearch, setOcSearch] = useState('closeSearch');
    const [wordKey, setWordKey] = useState('');
    const [viewProduct,setViewProduct]=useState('');

    const userId = {C_customerid:localStorage.getItem('UserId')};
    
    useEffect(initialValue,[cartData]);
    function initialValue(){
        
        axiosData.getCart(userId).then(function (data){
            setCartData(data)
        })
        axiosData.showproduct().then(function (data){
            setAllProduct(data)
        })
        axiosData.showcate().then(function (data){
            setDataCate(data.sp_category)
        })
        
        if(userId.C_customerid != null){
            axiosData.getprofile(userId).then(function (data){
                setUserData(data[0]);
                setUseNavbar(true)
                
            })
        }
    }

    const languageShow = () =>{
        const EngIcons = document.querySelector('.EngIcons');
        if(arrowEng === false){
            EngIcons.style.transform=" rotate(-180deg)";
        } else if (arrowEng === true){
            EngIcons.style.transform=" rotate(0deg)";
        }
    }

    const ManageModalProfileLogout = (status) => {
        var modal = document.getElementsByClassName('Modal-Profile-Nuvbar')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }

    const ManageModalSearch = (status) => {
        var modal = document.getElementsByClassName('Modal_search_Nuvbar')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }
   
    const LogOut = () =>{
        localStorage.removeItem('UserId');
        window.location.reload();
    }

    const GoToProfile = () => {
        history.push("/Profile");
        window.location.reload();
    }

    const GoToHistory = () => {
        history.push("/History");
        window.location.reload();
    }
    const showDropdownCat = (status) => {
        var dc = document.getElementsByClassName('dropDown-cat-body')[0];
        if(status === 'open'){
            dc.classList.add("showcat")
            setocCat('close')
        }else{
            dc.classList.remove("showcat")
            setocCat('open')
        }
    }
    const rePage = () => {

        history.push("/Home/Category");
        window.location.reload();
    }

    const reloadPage = ()=>{
        history.push("/Home/ProductInfo");
        window.location.reload();
    }


  return (
    <>
    {/*Profile modal*/}
    <div id="Modal-Profile-Nuvbar" onClick={()=>{ManageModalProfileLogout('close')}} className="Modal-Profile-Nuvbar">
        <div className="Modal-Profile-Nuvbar-body">
            <h4 onClick={()=>{GoToProfile()}}>Profile</h4>
            <h4 onClick={()=>{GoToHistory()}}>History</h4>
            <h4 onClick={()=>{LogOut()}}>Log out</h4>     
        </div>    
    </div>

    {/*Profile modal*/}


    {/*search modal*/}
    <div id="Modal_search_Nuvbar" className="Modal_search_Nuvbar">
        <AiIcons.AiOutlineClose onClick={()=>{ManageModalSearch('close');setWordKey('');setOcSearch('closeSearch')}} className="search-icon-nuvbar_close"/>
        <div className="Modal_search_Nuvbar_body">
                <input placeholder="Search..." value={wordKey} onChange={(e)=>{setWordKey(e.target.value);setViewProduct('')}} />
                <div className="AllResultG_nuvbar" >
                    <div className="TextResultG_nuvbar">
                        {wordKey == ''?
                            null
                        :
                            allProduct.filter((ap)=>ap.P_name.toLowerCase().includes(wordKey.toLowerCase())).map((sk)=>(
                        
                                <Link className="Link-producttoInfo" to={{pathname:"/Home/ProductInfo", 
                                    state:{
                                        B_brandid:sk.B_brandid,
                                        B_image:sk.B_image,
                                        B_name:sk.B_name,
                                        Cg_categoryid:sk.Cg_categoryid,
                                        Cg_name:sk.Cg_name,
                                        P_detail:sk.P_detail,
                                        P_image1:sk.P_image1,
                                        P_image2:sk.P_image2,
                                        P_image3:sk.P_image3,
                                        P_name:sk.P_name,
                                        P_price:sk.P_price,
                                        P_productid:sk.P_productid,
                                        Pr_promotion_code:sk.Pr_promotion_code,
                                        S_statusid:sk.S_statusid
                                    }}} >
                                    <p className="ResultTextNuvbar" 
                                    onMouseEnter={()=>{setViewProduct(sk.P_productid)}}
                                    onMouseLeave={()=>{setViewProduct('')}}
                                    onClick={()=>{reloadPage()}}>
                                        <IoIcons.IoMdArrowDropright />{sk.P_name}
                                    </p>
                                </Link>
                            ))
                        }
                    </div>
                    <div className="ImgResultG_nuvbar">
                        {viewProduct === '' || wordKey === ''?
                           null
                        :allProduct.filter((ap)=>ap.P_productid === viewProduct).map(imgEx=>(
                                <img src={imgEx.P_image1} />
                            ))}
                    </div>
                </div>
        </div>    
    </div>

    {/*search modal*/}

    <div className="navbarSPZ">

       
        <div className="nuvbarbox01">
            
        </div>

        <div className="nuvbarbox02">
            <a href='/'>
                <img src='/assets/image/minilogo.jpg' />
            </a>
        </div>
        <div className="nuvbarbox03">
            <div className="nuvbar03-group01">
                {ocSearch === 'closeSearch' ?
                    <BiIcons.BiSearch onClick={()=>{ManageModalSearch('show');setOcSearch('openSearch')}} className="search-icon-nuvbar"/>
                :
                    null
                }
            </div>
            <div className="nuvbar03-group02">
                
                
                    <h5 onClick={()=>{setArrowEng(!arrowEng);languageShow();}}>English</h5>
                    <MdIcons.MdKeyboardArrowDown className="EngIcons" onClick={()=>{setArrowEng(!arrowEng);languageShow();}} />
            </div>
                
            
            <div className="nuvbar03-group03">
           
                {useNavbar != true ?

               
                <a href='/Login'>
                    <span className="Login-text-home">
                     Log in
                    </span>
                </a>
                :
                <div className="name-user-login-navbar">
                    <div className="cart_group_nuvbar">
                        <a href="/Home/Cart" className="nuvbar_cart_icon"><HiIcons.HiOutlineShoppingCart /></a>
                        {cartData !== undefined ? 
                            <div className="AmountOfProductInCart">
                                <p>{cartData.length}</p>
                            </div>
                        :null}
                    </div>
                    { profileModal == 'close' ?

                    <div className="img-user-nuvbar" onClick={()=>{ManageModalProfileLogout('show');setProfileModal('show')}}>
                        
                        <span className="Username-text-home">
                            <img src={userData.C_image} />
                            <h5>{userData.C_name}</h5>
                        </span>
                       
                    </div>
                    :
                    <div className="img-user-nuvbar" onClick={()=>{ManageModalProfileLogout('close');setProfileModal('close')}}>
                        
                        <span className="Username-text-home">
                            <img src={userData.C_image} />
                            <h5>{userData.C_name}</h5>
                        </span>
                       
                    </div>

                    }
                </div>
                }
                
            </div>
            
        </div>


    <div className="slidebarHomeBg" >

    </div>
    <div className="slidebarHome02">

    </div>
    <div className="slidebarHome">
        <div className="slidebarhome-item">
            {SidebarData.map((item, index)=>{
                        return(
                            <div className="item-nuvbar-box">
                                {item.cStatus==2?
                                <>
                                <a key={index} className={item.cName} onClick={()=>{
                                    ocCat==='open'?showDropdownCat('open'):showDropdownCat('close')}}>

                                    <span className="dropDown-cat">{item.title}</span>
                                    
                                </a>
                                    <div className="dropDown-cat-body">
                                        {dataCate!=''? dataCate.map(cd=>(
                                             <Link to={{pathname:"/Home/Category",
                                                state:{
                                                    Cg_categoryid:cd.Cg_categoryid
                                                }
                                            }}>
                                                <p onClick={()=>{rePage(cd.Cg_categoryid)}}>{cd.Cg_name}</p>
                                            </Link>
                                            
                                            ))
                                        :null}
                                    </div>
                                </>
                                :
                                <a key={index} className={item.cName} href={item.path}>
                                        <span>{item.title}</span>
                                </a>
                                }
                            </div>
                        )
            })} 
            <div className="socails-icon">
                <a target="_blank" href="https://web.facebook.com/SPzone-809686962429089/" className="face_icon"><FaIcons.FaFacebook/></a>
                <a target="_blank" href="https://www.instagram.com/spzoneclothing/" className="ig_icon"><AiIcons.AiFillInstagram /></a>
            </div>

            <div className='shopData_group'>
                <div className='shopData'>
                    <span className="linundershopData">
                        <h5>close every Friday</h5>
                    </span>
                </div>
                <div className='shopData'>
                    <span className="linundershopData">
                        <h5>open 17.00 - 00.00</h5>
                    </span>
                </div>
                <div className='shopData'>
                    <span className="linundershopData">
                        <h5>Tel. 065-000-0000</h5>
                    </span>
                </div>
            </div>
        </div>
    </div>


    <div className="Hamburger-group">
                <Hamburger color={colorHum} size={20} duration={0.8} onToggle={toggled => {
                    const slidebar001 = document.querySelector('.slidebarHome');
                    const slidebar002 = document.querySelector('.slidebarHome02');
                    const slidebar00Bg = document.querySelector('.slidebarHomeBg');
                    if (toggled) {
                        slidebar001.style.marginLeft="0%";
                        slidebar001.style.transition=".8s";
                        slidebar001.style.position="fixed";
                        slidebar002.style.marginLeft="0%";
                        slidebar002.style.transition=".5s";
                        slidebar002.style.position="fixed";
                        slidebar00Bg.style.visibility="none";
                        slidebar00Bg.style.opacity="1"; 
                        slidebar00Bg.style.position="fixed"; 
                        slidebar00Bg.style.visibility="visible";
                        setColorHum('#ffffff');
                    } else {
                        slidebar001.style.marginLeft="-50%";
                        slidebar001.style.transition=".5s";
                        slidebar002.style.marginLeft="-50%";
                        slidebar002.style.transition=".8s";
                        slidebar00Bg.style.opacity="0"; 
                        slidebar00Bg.style.visibility="hidden";
                        setColorHum('#000000');
                    }
                }} />
            </div>
    </div>




    </>
  );
}

export default Navbar;