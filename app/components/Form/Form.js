import React from "react";
import InputField from "../InputField/inputField";
import Button from "../Button/Button";

function Form() {
  const handleSubmit = (e) => {
    event.preventDefault()
    console.log("I'm working");
  };
  return (
    <div>
      {/* <form onSubmit={handleSubmit}>
        <InputField />
        <Button text="Submit"/>
      </form> */}
    </div>
  );
}

export default Form;
