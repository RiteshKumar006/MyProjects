import { useState } from "react";

const Players = ({ playerName,symbol }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(playerName)
    function handleEditButton(){
        setIsEditing(prev => !prev)
    }
  return (
    <>
      <li>
        <span className="player">
          { !isEditing ? <span className="player-name">{name}</span> :
          <input className="inputBox" type="text" defaultValue={name} onChange={(e) => setName(e.target.value)} />}
          <span>{symbol}</span>
        </span>
        <button className="button" onClick={handleEditButton}>{ isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
};

export default Players;
