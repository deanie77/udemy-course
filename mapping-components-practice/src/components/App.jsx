import React from "react";
import emojipedia from "../emojipedia";
import Card from "./Card";

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojipedia.map(function (emojiEntry) {
          return (
            <Card
              key={emojiEntry.id}
              emoji={emojiEntry.emoji}
              name={emojiEntry.name}
              meaning={emojiEntry.meaning}

            />
          );
        })}
      </dl>
    </div>
  );
}

export default App;
