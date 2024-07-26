import React from "react";

function Form() {
  const handleSubmit = (e) => {
    event.preventDefault()
    console.log("I'm working");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="testing"/>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Form;
