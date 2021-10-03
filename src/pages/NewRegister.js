import React,{useState} from 'react';
import * as AiIcons from "react-icons/ai";
import * as HiIcons from "react-icons/hi";
import * as BiIcons from "react-icons/bi";
import * as RiIcons from "react-icons/ri";
import * as MdIcons from "react-icons/md";
import '../css/Newregister.css';
import {Form,Input} from 'antd';
import * as d from '../const/AllData';
import * as axiosData from '../service/Service';



const NewRegister = () => {
    const [eye, setEye] = useState(false);
    const [eye01, setEye01] = useState(false);
    const [emptyCheck , setEmptyCheck] = useState(false);
    const [register, setRegister] = useState(d.jsonRegister);
    const [form01] = Form.useForm();

    
    
   
    const onFinish = () => {
        if(register.L_password === null || register.L_password === ''){
            setEmptyCheck(false)
        }else{
            axiosData.sendDataRegister(register).then(function (data){
                 
                localStorage.setItem('UserId',data);
                setEmptyCheck(true)
                mangeModal('show')
            })
        }

       
    }
    const handleChange = (e)=>{
        e.persist();
        setRegister((prev) => ({ ...prev, [e.target.name]: e.target.value}));
    };
    const  test = (index) => {
        var w = document.getElementsByClassName('Register-step');
            for(let i = 0 ; i < w.length ; i++){
                if( i === index){
                    var x = document.getElementsByClassName('Register-bullet')[index];
                    var y = document.getElementsByClassName('Register-check')[index];
                    var z = document.getElementsByClassName('Regis-progress-p')[index];
                    const slidePage = document.querySelector(".slidepage");
                    
                   
                    if(i === 0){
                        if(register.C_name ===null || register.C_lastname === null ||register.C_name === ''|| register.C_lastname === ''){

                        }else{
                            x.classList.add("active");
                            y.classList.add("active");
                            z.classList.add("active");
                            slidePage.style.marginLeft="-25%";
                        }
                    }
                    else if(i === 1){
                        if(register.L_email === null || register.L_email === '' || register.C_tel === null ||  register.C_tel === ''){

                        }else{
                            x.classList.add("active");
                            y.classList.add("active");
                            z.classList.add("active");
                            slidePage.style.marginLeft="-50%";
                        }
                    }
                
                }
            }
        
}
const test01 = (index) => {
    var w = document.getElementsByClassName('Register-step');
    for(let i = 0 ; i < w.length ; i++){
        if(i === index){
            var x = document.getElementsByClassName('Register-bullet')[index];
            var y = document.getElementsByClassName('Register-check')[index];
            var z = document.getElementsByClassName('Regis-progress-p')[index];
            const slidePage = document.querySelector(".slidepage");
            
            x.classList.remove("active");
            y.classList.remove("active");
            z.classList.remove("active");
            if(i === 0){
                slidePage.style.marginLeft="0%";
            }
            else if(i === 1){
                slidePage.style.marginLeft="-25%";
            }
            else if(i === 2){
                slidePage.style.marginLeft="-50%";
            }
            else if(i === 3){
                slidePage.style.marginLeft="-75%";
            }
        }
    }
}

    const mangeModal = (status) =>{
        var modal = document.getElementsByClassName('fn-regis-modal')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }



    return (
        
        <div className="register-body">
            <div className="Register-contrainer">
                <div className="Register-back-home-icon">
                    <a href="/"><AiIcons.AiOutlineClose /></a>
                </div>
                <h2 >REGISTER</h2>
                <div className="Register-progress-bar">
                    <div className="Register-step">
                        <div className="Register-bullet ">
                            <p className='Regis-progress-p'> <HiIcons.HiUser/></p>
                            <div className="Register-check "><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                    <div className="Register-step">
                        <div className="Register-bullet">
                            <p className='Regis-progress-p'><AiIcons.AiFillPhone/></p>
                            <div className="Register-check"><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>
                    <div className="Register-step">
                        <div className="Register-bullet">
                            <p className='Regis-progress-p'><RiIcons.RiShieldKeyholeFill /></p>
                            <div className="Register-check"><AiIcons.AiOutlineCheck /></div>
                        </div>
                    </div>

                </div>
                <div className="Register-layout-form">
                    <Form  form={form01} className="Register-form">
                        <div className="Register-page slidepage">
                            <div className="Register-field">
                                
                                {/*input*/}
                                <div className="Regis-input">
                                        <Input  name="C_name" onChange={(e)=> handleChange(e)} placeholder="Name" />
                                         
                                </div>
                                <br />
                                <div className="Regis-input">
                                        <Input  name="C_lastname" onChange={(e)=> handleChange(e)} placeholder="Lastname" />
                                
                                </div>
                                <div className="Register-button">
                                    
                                        <a  onClick={() => {test(0);}} className="Next-button-regis01">
                                            next <MdIcons.MdKeyboardArrowRight className="Next02-button-icon-regis" />
                                        </a>
                                    
                                </div>
                            </div>
                        </div>
                    

                    
                        <div className="Register-page ">
                            <div className="Register-field">

                                {/*input*/}
                                <div className="Regis-input">
                                        <Input  name="L_email" onChange={(e)=> handleChange(e)} placeholder="Email"/>                                      
                                </div>
                                <br />
                                <div className="Regis-input">
                                        <Input   maxLength='10' name="C_tel" onChange={(e)=> handleChange(e)} placeholder="Phone"/>                                
                                </div>
                                <div className="Register-button">
                                    
                                        <a 
                                            onClick={() => {test01(0);}}
                                            className="Back-button-regis01"
                                        >
                                            <MdIcons.MdKeyboardArrowLeft className="back01-button-icon-regis" />back
                                        </a>
                                    
                                    <br /><br />
                                    
                                        <a onClick={() => {test(1);}} className="Next-button-regis04">
                                            next<MdIcons.MdKeyboardArrowRight className="Next02-button-icon-regis" />
                                        </a>
                                    
                                </div>
                            </div>
                        </div>
                                   
                    
                        <div className="Register-page ">
                            <div className="Register-field">

                                    {/*input*/}
                                <div className="Regis-input">
                                    <Input  type={eye01 ? "text":"password"} maxLength='15' name="L_password" onChange={(e)=> handleChange(e)} placeholder="Password"/>
                                    
                                    
                                    {eye01 ? <a onClick={() => {setEye01(false);}}><AiIcons.AiOutlineEye /></a>:<a onClick={() => {setEye01(true);}}><AiIcons.AiOutlineEyeInvisible /></a>}
                                </div>
                                <br />
                                <div className="Regis-input" >
                                    <Input  type={eye ? "text":"password"} maxLength='15' onChange={(e)=> handleChange(e)} placeholder="Comfirm Password"/>
                                    
                                    
                                    {eye ? <a onClick={() => {setEye(false);}}><AiIcons.AiOutlineEye /> </a>:<a onClick={() => {setEye(true);}}><AiIcons.AiOutlineEyeInvisible /></a>}
                                   
                                </div>
                                
                                <div className="Register-button">
                                    
                                        <a  
                                            onClick={() => {test01(1);}}
                                            className="Back-button-regis01"
                                        >
                                            <MdIcons.MdKeyboardArrowLeft className="back01-button-icon-regis" />back
                                        </a>

                                        <br /><br />
                                    
                                        <button onClick={() => {test(2);onFinish();}} className="Next-button-regis03">
                                            submit <BiIcons.BiCheck className="Next01-button-icon-regis" />
                                        </button>
                                   
                                </div>
                            </div>
                        </div>
                    </Form>
                </div>
            </div>


            {/*Delete modal*/}
            <div id="fn-regis-modal" className="fn-regis-modal">
                <div className="fn-regis-modal-body">
                    <h4>You're successfully register</h4>
                    <div className="button-fn-regis-group">
                        <a href="/Home">confrim</a>
                    </div>
                                
                </div>    
            </div>

            {/*Delete modal*/}





        </div>
    )
}

export default NewRegister;
