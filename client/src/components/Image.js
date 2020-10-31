import React from 'react';
import '../styles/Image.css';

function Image(props) {
  return (
    <div className="image">
      <img
        alt={props.name}
        src={props.path} />
      <p className="name">{props.name}</p>
      <p className="user">By: {props.user}</p>
    </div>
  );
}

export default Image;
