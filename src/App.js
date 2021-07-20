import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";

import Item from "./components/item";
import getWeb3 from "./utils/getWeb3";

function App() {
  const [ethAccounts, setEthAccounts] = useState();

  const [items, setItems] = useState([
    {
      itemName: "Item1",
      count: 2,
    },
    {
      itemName: "Item2",
      count: 4,
    },
    {
      itemName: "Item3",
      count: 5,
    },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const web3 = await getWeb3();
        console.log("", web3);
        const accounts = await web3.eth.getAccounts();
        const networkId = await web3.eth.net.getId();
        console.log("neid: ", networkId, " accounts:", accounts);
        setEthAccounts(accounts);
      } catch (err) {
        console.log(err);
        alert(
          "MetaMask is not installed. please install Chrome Extension for MetaMask."
        );
      }
    })();
  }, []);

  const handleReset = () => {
    let newItems = items.map((item) => {
      return { ...item, count: 0 };
    });
    setItems(newItems);
  };

  const handleInc = (index) => {
    let newItems = [...items];
    newItems[index] = { ...newItems[index], count: newItems[index].count + 1 };
    setItems(newItems);
  };

  const handleDec = (index) => {
    let newItems = [...items];
    let newVal = newItems[index].count - 1;
    newVal = newVal < 0 ? 0 : newVal;
    newItems[index] = { ...newItems[index], count: newVal };
    setItems(newItems);
  };

  const handleRemove = (index) => {
    let newItems = items.filter((item, idx) => idx != index);
    setItems(newItems);
  };

  const handleAdd = () => {
    let name = prompt("Enter new item name.");
    if (name) {
      let newItems = [...items, { itemName: name, count: 0 }];
      setItems(newItems);
    }
  };

  const isEthEnabled = ethAccounts && ethAccounts.length > 0;
  return (
    <div className="App">
      <header className="App-header">
        {isEthEnabled ? (
          ethAccounts.map((account, index) => {
            return (
              <div className="account" key={index}>
                {account}
              </div>
            );
          })
        ) : (
          <div className="account">MetaMask is not connected</div>
        )}
        {items.map((item, index) => {
          let idx = index + 1;
          return (
            <Item
              key={idx}
              countValue={item.count}
              itemName={item.itemName}
              onIncrease={() => handleInc(index)}
              onDecrease={() => handleDec(index)}
              onRemove={() => handleRemove(index)}
              isEthEnabled={isEthEnabled}
            />
          );
        })}

        <div className="btnRow">
          <div
            className={isEthEnabled ? "btn btnReset" : "btn btnDisabled"}
            onClick={handleAdd}
          >
            Add
          </div>
          <div
            className={isEthEnabled ? "btn btnReset" : "btn btnDisabled"}
            onClick={handleReset}
          >
            Resets
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
