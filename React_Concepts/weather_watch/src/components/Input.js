import React from "react";
import PropTypes from "prop-types";

const Input= ({onInput, inputRef, label}) =>{
    return (
        <>
            <div className="input-box">
            <label className="label">{label}</label>
            <input type="text" placeholder="Enter City Name" ref={inputRef} onChange={onInput} />
            </div>
        </>
    )
}
Input.propTypes = {
    onInput: PropTypes.func,
    inputRef: PropTypes.object,
    label: PropTypes.string.isRequired
} 


export default Input;