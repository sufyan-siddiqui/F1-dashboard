import React from 'react'
import './Login.css'
import TextField from './TextField'

export default function Login({
    isNotCollapsed,
    setIsNotCollapsed,
    isMobile
}){
    return (
        <>
        <div className="page-container">
            <div
            className="form-container"
            >
                <div className="text-header"> 
                    Login Page

                </div>
                <TextField name="username"/>
                <TextField name="password" isPwd={true}/>
                <input type="button" name="submit" value="Submit"></input>
            </div>

        </div>

        </>
    )
}   