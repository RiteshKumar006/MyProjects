import React from "react";
import PropsTypes from "prop-types";

const SetUnits = ({value, onSet}) => {   
    return (
        <>
            <div className="set-units">
                <label>UNITS</label>
            <select value={value} onChange={onSet}>
                <option >Celsius</option>
                <option >Fahrenheit</option>
            </select>
            </div>
        </>
    ) 
};

SetUnits.propTypes = {
    value: PropsTypes.string.isRequired,
    onSet: PropsTypes.func.isRequired
}

export default SetUnits;