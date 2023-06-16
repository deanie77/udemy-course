import React from 'react'
import Emoji from './Emoji';
import Name from './Name';

function Card(props) {
  return (
    <div className="term">
          <dt>
            <Emoji emoji={props.emoji} />
            <Name name={props.name} />
          </dt>
          <dd>
            {props.meaning}
          </dd>
        </div>
  );
}

export default Card