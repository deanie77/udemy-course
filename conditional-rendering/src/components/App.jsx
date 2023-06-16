import React from "react";
import Form from "./Form";

function App() {
  let userIsRegistered = false;
  return (
    <div className="container">
      <h1>Hello</h1>
      <Form userRegistered={userIsRegistered} />
    </div>
  );
}

export default App;
