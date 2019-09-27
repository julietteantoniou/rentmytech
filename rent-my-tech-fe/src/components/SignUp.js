import React, { useState } from "react";
import axios from "axios";
// import axiosWithAuth from "./utils/axiosWithAuth";

const SignUp = (props) => {

    const [signup, setSignup] = useState(
    {email: '', password: '', first_name: '', last_name: '', renter: true, owner: true}
        );

    const handleSignup = e => {
        e.preventDefault();
        setSignup({
            ...signup,
            [e.target.name]: e.target.value
            })
            console.log("New user: ", signup)
            }
    
    const routeToLogin = () => {
            props.history.push("/login") //Add route to login
        }
    
    
    const validate = () => {
        let emailError = "";
        let passwordError = "";
        let firstnameError = "";
        let lastnameError = "";

        if(!signup.email) {
            emailError = "Email is required";
            console.log('email error');
        }
                
        if(!signup.first_name) {
            firstnameError = "First Name is required";
            console.log('first name error')
        }
        if(!signup.last_name) {
            lastnameError = "Last Name is required";
            console.log('last name error');
        }
        if(signup.password.length < 6) {
            passwordError = "Password must contain at least 6 characters";
            console.log("password short err")
        }

        if(emailError || firstnameError || lastnameError || passwordError) {
            setSignup({ emailError, firstnameError, lastnameError, passwordError});
            return false
        } else return true
    }

    const submitSignup = e => {
        let result = validate();
        let submitFN = signup.first_name;
        let submitLN = signup.last_name;
        let submitEmail = signup.email;
        let submitPW = signup.password;
        console.log('signup firing', signup.first_name, signup.last_name, signup.email, signup.password);

        e.preventDefault();
        if (result === true) {
            console.log("validate: ", result)
           
        let creds = {
            first_name: submitFN,
            last_name: submitLN,
            email: submitEmail,
            password: submitPW,
            owner: true,
            renter: true
        }
        
        axios
            .post('https://tech-stuff.herokuapp.com/api/auth/register', creds)
            .then(res => {
                console.log("signup res", res)
                console.log("creds submitted", creds)
                props.setLoggedIn(true)
                localStorage.setItem("token", res.token)
               
            })
            
            .catch(err => console.log( err.response));
            routeToLogin()
            
        } 
        else console.log("error signing up", signup)
    }



    return(
        <div className='signup-form'>
        <form>
            <h3>Sign Up to List and Rent Tech!</h3>
            <input type='email'
                   name='email'
                   placeholder='Enter Email Address'
                   value={signup.email}
                   onChange={handleSignup}
                   />
            <input type='text'
                   name='first_name'
                   placeholder='Enter First Name'
                   value={signup.first_name}
                   onChange={handleSignup}
                   />
            <input type='text'
                   name='last_name'
                   placeholder='Enter Last Name'
                   value={signup.last_name}
                   onChange={handleSignup}
                   />
            <input type='password'
                   name='password'
                   placeholder='Enter a Password'
                   value={signup.password}
                   onChange={handleSignup}
                   />
            <button onClick={submitSignup}>Sign Up</button>

        </form>
        </div>
    )

    }

export default SignUp;