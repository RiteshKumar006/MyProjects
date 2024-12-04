import React from "react";

const CurrencyConvertor = ({symbol, setSymbol,amount, setAmount}) => {
    return (
        <div className="field">
            <div className="currency-picker">
                <select value={symbol} onChange={(evt)=> setSymbol(evt.target
                    .value
                )}>
                    <option>USD</option>
                    <option>EUR</option>
                    <option>INR</option>
                    <option>GBP</option>
                    <option>JPY</option>
                    <option>AUD</option>
                    <option>CAD</option>
                    <option>CHF</option>
                    <option>CNY</option>
                    <option>HKD</option>
                    <option>KRW</option>
                    <option>NZD</option>
                    <option>SGD</option>
                    <option>ZAR</option>
                </select>
            </div>
            <div className="currency-input">
                <input className="number-input" type="number" value ={amount} onChange={(evt) => setAmount(evt.target.value)}/>
            </div>

        </div>
    );
};

export default CurrencyConvertor;