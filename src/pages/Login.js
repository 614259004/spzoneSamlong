import React,{useState, useEffect} from 'react';
import * as BiIcons from "react-icons/bi";
import * as AiIcons from "react-icons/ai";
import * as axiosData from '../service/Service';
import * as IoIcons5 from "react-icons/io5";
import { useHistory } from 'react-router-dom';
import '../css/login.css';


function Login() {
    const history = useHistory();

    const dataLogin={
        L_email:"",
        L_password:""
    }

    var textError = document.getElementsByClassName('CheckNullEmail')[0];
    var textError02 = document.getElementsByClassName('CheckNullPassword')[0];


    const [logInData, setLogInData] = useState(dataLogin);
    


    const handleChange = (e,num) =>{
        var textError = document.getElementsByClassName('CheckNullEmail')[0];
        var textError02 = document.getElementsByClassName('CheckNullPassword')[0];
        if(num === 1){
            textError.classList.add("Hide");
        }
        else if(num === 2){
            textError02.classList.add("Hide");
        }
        
        
        e.persist();
        setLogInData({...logInData,[e.target.name]: e.target.value});
    }

    const checkLogIn = () => {
        var textError = document.getElementsByClassName('CheckNullEmail')[0];
        var textError02 = document.getElementsByClassName('CheckNullPassword')[0];
        if(logInData.L_email === '' || logInData.L_password === ''){
            if(logInData.L_email === ''){
                textError.classList.remove("Hide");
            }else{
                textError.classList.add("Hide");
            }
            if(logInData.L_password === ''){
                textError02.classList.remove("Hide");
            }else{
                textError02.classList.add("Hide");
            }
            
        }else{
            axiosData.logIn(logInData).then(function (data){
                if(data != ''){
                    const datacus = data[0];
                    localStorage.setItem('UserId',datacus.C_customerid);
                    
                    if(datacus.S_statusid == 2){
                        history.push("/Home");
                    } else if(datacus.S_statusid == 1){
                        history.push("/Admin");
                    }
                }else{
                    ManageModelWrongLogin('show')
                }
            })
        }
    }

    const ManageModelWrongLogin = (status) => {
        var modal = document.getElementsByClassName('Modal_WrongLogin')[0];
        if(status === "show"){
            modal.classList.add("show");
        } else if(status === "close"){
            modal.classList.remove("show");
        }
    }


    return (
        <div className="body-login">

            <div className="loginform">
                <div className="login-back-home">
                    <a href="/"><AiIcons.AiOutlineClose /></a>
                </div>
                <div className="login-header-logo">
                    <h5>LOGIN</h5>
                </div>
                <div className="input-email-login-group">
                    <input type="text" placeholder="Email" name="L_email" onChange={(e)=> handleChange(e,1)}></input>
                </div>
                <p className="CheckNullEmail Hide"><IoIcons5.IoAlertCircleSharp />Please enter email</p>
                <div className="input-password-login-group">
                    <input type="password" placeholder="Password" name="L_password" onChange={(e)=> handleChange(e,2)}></input>
                    <p className="CheckNullPassword Hide"><IoIcons5.IoAlertCircleSharp />Please enter password</p>
                    <h6 className="forgot-password-login">forgot password?</h6>
                </div>
                <div className="input-submit-login">
                    <input type="submit" value="Login" onClick={()=>{checkLogIn();}}></input>
                </div>
                <a href="/NewRegister" className="create-account-a"><h6 className="create-account-h6">create new account</h6></a>
            </div>



            <div id="Modal_WrongLogin" className="Modal_WrongLogin">
                <div className="Modal_WrongLogin_body">
                    <h4>Invalid email or password, Please enter again</h4>
                    
                    <button onClick={()=>{ManageModelWrongLogin('close')}}>close</button>
                    
                </div>    
            </div>

        </div>
    )
}

export default Login