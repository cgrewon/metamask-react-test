import React from "react";
import "./item.css";

function Item({
  countValue,
  itemName,
  onIncrease,
  onDecrease,
  onRemove,
  isEthEnabled,
}) {
  const decrease = () => {
    if (isEthEnabled && onDecrease) {
      onDecrease();
    }
  };

  const increase = () => {
    if (isEthEnabled && onIncrease) {
      onIncrease();
    }
  };

  const remove = () => {
    if (isEthEnabled && onRemove) {
      onRemove();
    }
  };

  return (
    <div className="itemRow">
      <span className="itemname">{itemName}</span>
      <span className="countvalue"> {countValue}</span>
      <div
        className={isEthEnabled ? `btn btnHover` : "btn btnDisabled"}
        onClick={increase}
      >
        <div>+</div>
      </div>
      <div
        className={isEthEnabled ? `btn btnHover` : "btn btnDisabled"}
        onClick={decrease}
      >
        <div>-</div>
      </div>
      <div
        className={isEthEnabled ? `btn btnHover` : "btn btnDisabled"}
        onClick={remove}
      >
        <div>Del</div>
      </div>
    </div>
  );
}

export default Item;
