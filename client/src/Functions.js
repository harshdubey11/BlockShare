import Web3 from 'web3';
import SimpleStoragejson from '../src/contracts/SimpleStorage.json'



export const load = async () => {
    await connectWallet();
    const addressAccount = await loadAccount();
    const { IPFSContract, SelfFiles , InboxFiles } = await loadContract(addressAccount);
    return { addressAccount, IPFSContract, SelfFiles , InboxFiles };

};

const connectWallet = async () => {
    if (window.ethereum) { //check if Metamask is installed
          try {
              const address = await window.ethereum.enable(); //connect Metamask
              const obj = {
                      connectedStatus: true,
                      status: "",
                      address: address
                  }
                  return obj;
               
          } catch (error) {
              return {
                  connectedStatus: false,
                  status: "🦊 Connect to Metamask using the button on the top right."
              }
          }
          
    } else {
          return {
              connectedStatus: false,
              status: "🦊 You must install Metamask into your browser: https://metamask.io/download.html"
          }
        } 
  };

  const loadAccount = async () => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const acc = await web3.eth.getCoinbase();
    return acc;
}; 

const loadFiles = async (IPFSContract, addressAccount) => {
    const FilesCount = await IPFSContract.methods.TotalFiles(addressAccount).call({from: addressAccount});
    const Files = [];
    for (var i = 0; i < FilesCount; i++) {
        const file = await IPFSContract.methods.AllFiles(addressAccount, i).call({from: addressAccount});
        Files.push(file);
    }
    return Files
};
const loadInboxFiles = async (IPFSContract, addressAccount) => {
    const FilesCount = await IPFSContract.methods.TotalInboxMsg(addressAccount).call({from: addressAccount});
    console.log("ininbox file",FilesCount);
    const Files = [];
    for (var i = 0; i < FilesCount; i++) {
        const file = await IPFSContract.methods.AllInboxMsg(addressAccount, i).call({from: addressAccount});
        Files.push(file);
    }
    return Files
};

const loadContract = async (addressAccount) => {
    const web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
    const networkID = await web3.eth.net.getId();
        const { abi } = SimpleStoragejson;
        let address, IPFSContract;
        address = SimpleStoragejson.networks[networkID].address;
        IPFSContract = new web3.eth.Contract(abi, address);
        
    // theContract.setProvider(web3.eth.currentProvider);
    // const IPFSContract = await theContract.deployed();
    // const SelfFiles = await loadFiles(IPFSContract, addressAccount);
    // const InboxFiles =  await loadInboxFiles(IPFSContract, addressAccount);
    // return { IPFSContract, SelfFiles , InboxFiles }
    
    const SelfFiles = await loadFiles(IPFSContract, addressAccount);
    const InboxFiles =  await loadInboxFiles(IPFSContract, addressAccount);
    return { IPFSContract, SelfFiles , InboxFiles }
};
