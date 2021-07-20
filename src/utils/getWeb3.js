import Web3 from "web3";
const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          console.log("web3 from window.ethereum");
          resolve(web3);
        } catch (error) {
          console.log("error", error);
          reject(error);
        }
      } else if (window.web3) {
        const web3 = window.web3;
        console.log("web3 from window.web3", window.web3);
        resolve(web3);
      } else {
        reject(new Error("web3 is not allowed"));
      }
    });
  });
};

export default getWeb3;
