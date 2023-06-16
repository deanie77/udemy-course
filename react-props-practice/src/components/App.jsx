import React from "react";
import contacts from "../contacts";
import Card from "./Card";

function App() {
  console.log(contacts);
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      {contacts.map(function (contact) {
        return (
          <Card
            id={contact.id}
            key={contact.id}
            name={contact.name}
            imgUrl={contact.imgURL}
            phone={contact.phone}
            email={contact.email}
          />
        );
      })}
    </div>
  );
}

export default App;
