import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Image} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import avatarRegister from './img/avatarRegister.svg'
import login from '../actions/userActions'
import { Helmet } from 'react-helmet';
import addUs from './img/new.svg'
import wave from './img/wavev.png'
import {register} from '../actions/userActions'
import { Redirect} from 'react-router-dom';
import axios from 'axios';





import {
  Button, Input
} from "@chakra-ui/react"

const RegisterScreen = ({location, history}) => {
    const [name,setName] = useState('')
    const [address,setAddress] = useState('')
    const [pincode,setPincode] = useState('')
    const [phonenumber,setPhoneNumber] = useState('')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [message,setMessage] = useState(null) 

  const dispatch = useDispatch()

  const userRegister = useSelector(state => state.userRegister)

  const { error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password do not match')
    }
    else{
      dispatch(register(name,address,pincode,phonenumber,email, password))

      const UserData = {
      
        name: name,
        address: address,
        pincode:pincode,
        phonenumber:phonenumber,
        email: email,
        password: password,
     
      }
  
      
  
      axios.post('http://localhost:5000/api/users/', UserData)
  
        console.log(UserData);

        //  alert('Registered successfully!');
        //  window.location.reload(false);
        //  e.target.reset();
        //  <Redirect to="/login"/>
    
    }
  }

  const inputs = document.querySelectorAll(".inputa");


  function addcl(){
    let parent = this.parentNode.parentNode;
    parent.classList.add("focus");
  }
  
  function remcl(){
    let parent = this.parentNode.parentNode;
    if(this.value == ""){
      parent.classList.remove("focus");
    }
  }
  
  
  inputs.forEach(inputa => {
    inputa.addEventListener("focus", addcl);
    inputa.addEventListener("blur", remcl);
  });
  




    return (
        <div className="registerSc">
          <Helmet>
            <title>
              Register
            </title>
          </Helmet>
          	<Image className="wave" src={wave} />

            <div className="containera">
              
		<div className="imga">
			<Image src={addUs} />
		</div>
		<div className="login-content">
     
			<form onSubmit={submitHandler}>
      <h1 style={{margin:'16px',fontFamily:'inherit',fontWeight:'10px'}}>Registration</h1>
				{error && <h4 style={{fontSize:'13px'}}>{error}</h4>}
                



                <div className="input-div zz">
                       <div className="i">
                        <i className="fas fa-user"></i>
                    </div>
                   <div className="div">
           		   		
           		   		<input type="text" value={name} className="inputa" placeholder="Enter Name"  onChange={(e) => setName(e.target.value)}/>
           		   </div>  		   
           		</div>
             
               <div className="input-div zz">
                       <div className="i">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                   <div className="div">
           		   		<input type="text" value={address} className="inputa" placeholder="Enter Address"  onChange={(e) => setAddress(e.target.value)}/>
           		   </div>  		   
           		</div>
               <div className="input-div zz">
                       <div className="i">
                        <i className="fas fa-map-marker-alt"></i>
                    </div>
                   <div className="div">
           		   		<input type="text" value={pincode} className="inputa" placeholder="Enter Pincode"  onChange={(e) => setPincode(e.target.value)}/>
           		   </div>  		   
           		</div>
               <div className="input-div zz">
                       <div className="i">
                        <i className="fas fa-phone-alt"></i>
                    </div>
                   <div className="div">
           		   		<input type="text" value={phonenumber} className="inputa" placeholder="Enter Phonenumber"  onChange={(e) => setPhoneNumber(e.target.value)}/>
           		   </div>  		   
           		</div>


           		<div className="input-div one">
                       

           		   <div className="i">
           		   		<i className="fas fa-envelope"></i>
           		   </div>
           		   <div className="div">
           		   		
           		   		<input type="text" value={email} className="inputa" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
           		   </div>
           		</div>



                

           		<div className="input-div pass">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={password} className="inputa" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}/>
            	   </div>
            	</div>


                <div className="input-div passconf">
           		   <div className="i"> 
           		    	<i className="fas fa-lock"></i>
           		   </div>
           		   <div className="div">
           		    	
           		    	<input type="password" value={confirmPassword} className="inputa" placeholder="Confirm password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            	   </div>
            	</div>
                {message && <h4>{message}</h4>}
                <input type="submit" className="btna2" value="Sign up"/>
                <br />
                Have an Account? {' '}
            	<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Login</Link>
            	
                
              
            </form>
        </div>
    </div>
        </div>
    )
}

export default RegisterScreen
