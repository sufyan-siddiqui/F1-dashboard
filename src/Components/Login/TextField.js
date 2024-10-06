import React from "react"
import './TextField.css'

export default function TextField({name, isPwd = false}) {
    return (
        <div className = "textfield">
            <input name={name} type={isPwd ? "password" : "text"} ></input>
        </div>
    );

}