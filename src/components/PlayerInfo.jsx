import { useState } from "react";

export default function Player({ initalName, symbol, isActive,onChangeName }) {
  const [playerName, setPlayerName] = useState(initalName);
  const [isEditing, setIsEdiditing] = useState(false);

  function handleEditClick() {
    setIsEdiditing((editing) => !editing); // To use the latest available   state value
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }
  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEditing) {
    editablePlayerName = (
      <input type="text" required value={playerName} onChange={handleChange} />
    );
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
}
