import React from "react";
import Entry from "./Entry";
import emojipedia from "../emojipedia";

const createEntry = emojiTerm =>
    <Entry
      key={emojiTerm.id}
      emoji={emojiTerm.emoji}
      name={emojiTerm.name}
      description={emojiTerm.meaning}
    />

const App = () => 
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>
      <dl className="dictionary">{emojipedia.map(createEntry)}</dl>
    </div>

export default App;
