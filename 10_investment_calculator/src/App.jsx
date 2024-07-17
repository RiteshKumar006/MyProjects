import { useState } from "react";
import Header from "./component/Headers";
import UserInput from "./component/UserInput";
import Result from "./component/Result";

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
});
const inputIsValid = userInput.duration >= 1;

console.log("app.jsx",userInput)
  function handleChange(inputIdentifier, newValue) {
    setUserInput((prev) => {
        return {
            ...prev,
            [inputIdentifier]: +newValue
        }
    })
}
  return (
    <>
      <Header />
      <UserInput onChange={handleChange} userInput={userInput} /> 
      {/* {result} */}
      {!inputIsValid && <p>Please enter a valid input</p>}
      { inputIsValid &&  <Result input={userInput} />}
    </>
  )
}

export default App
