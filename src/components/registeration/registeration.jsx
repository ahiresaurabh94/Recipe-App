import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import Header from "../header/header";
import "./registeration.css";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import fetching from '../../images/fetch.gif'

const Register = () => {

    const navigate = useNavigate()
    const [registerationData, setregisterationData] = useState({email: "", password: ""});
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("");
    const [hide, setHide] = useState(true);
    const [conHide, setConHide] = useState(true)
    const [loading, setLoading] = useState(false);
    console.log(registerationData)

    async function registeration(e) {
    e.preventDefault();

        setLoading(true);
        if(registerationData.password !== confirmPassword) {
            setLoading(false);
            return setError("password not match");
        }

        if(registerationData.email && registerationData.password) {
            // await fetch("https://blog-server-2zb0.onrender.com/register", {
            await fetch("http://127.0.0.1:9000/user/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registerationData),
            }).then(res => {
                // console.log(res)
                return res.json()
            })
            .then((data)=>{
                console.log(data);
                setLoading(false);
                navigate("/")
            })
            .catch(e => {
                setLoading(false);
                console.log("errr>>> " + e.message);
            })
        } else {
                setLoading(false)
                alert('Some Feild Are Empty');
            }
        }


    return (
        <>
            <div className="registeration-container">
                {loading ? <img className="loader" src={fetching} alt='loading...' /> : ''}
                <section className="form">
                    <p className="form-header" style={{fontWeight: "bolder"}}>Sign Up :
                    <div style={{display: 'inline', fontWeight: 'lighter'}}
                            className='toggle-btn'>
                            have an account?  <span className='signup-btn' onClick={()=> navigate('/')}>LoginPage</span>
                        </div></p>
                    <form onSubmit={registeration}>
                    <input type="text"
                        placeholder="Email"
                        onChange={(e) => setregisterationData({...registerationData, email: e.target.value})} /><br/>
                        {error ? <span style={{color: "red", fontSize: "small"}}>{error} </span> : ''}
                    <input type={hide ? 'password' : 'text'}
                        placeholder="password"
                        onChange={(e) => setregisterationData({...registerationData, password: e.target.value})} />
                        <span className='pointer' onClick={() => setHide(!hide)}
                            style={{paddingLeft: '8px'}} >
                            {hide ? <FaEye size='1.1em' /> :
                            <FaEyeSlash size='1.1em'/> }
                        </span> <br/>
                        {error ? <span style={{color: "red", fontSize: "small"}}>{error} </span> : ''}
                    <input type={conHide ? 'password' : 'text'}
                        placeholder="Repeat password"
                        onChange={(e) => setConfirmPassword(e.target.value)} />
                        <span className='pointer' onClick={() => setConHide(!conHide)}
                            style={{paddingLeft: '8px'}} >
                            {conHide ? <FaEye size='1.1em' /> :
                            <FaEyeSlash size='1.1em'/> }
                        </span> <br/>

                <button className="register-btn" >Register</button>
                </form>
                </section>

            </div>
        </>
    )
}

export default Register;