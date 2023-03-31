// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract SimpleStorage {
  struct singleFile{
    uint id;
    string description;
    string ipfsHash;
  }

  struct singleInboxMsg{
    uint id;
    string description;
    string ipfsHash;
  }
  constructor() public{}

     event FileUploaded (
        uint id,
        string description,
        string ipfsHash
   
    );

    event NotificationSent (
        uint id,
        string _ipfsHash, 
        address _address,
        string description

    );
   mapping(address => mapping(uint => singleFile)) public AllFiles;
   mapping(address => mapping(uint => singleInboxMsg)) public AllInboxMsg;
   mapping(address => uint) public TotalFiles;
   mapping(address => uint) public TotalInboxMsg;

function createFileHash(string memory _description,string memory _ipfsHash) public
{       
        uint nthFile = TotalFiles[msg.sender];
        AllFiles[msg.sender][nthFile] = singleFile(nthFile, _description, _ipfsHash);
        emit FileUploaded(nthFile, _description, _ipfsHash);
        TotalFiles[msg.sender]++;
        
        }
function sendIPFSNotification(address  _address,string memory _description, string memory _ipfsHash)  public
    {   
        uint nthMsg = TotalInboxMsg[_address];
        AllInboxMsg[_address][nthMsg]=singleInboxMsg(nthMsg,_description,_ipfsHash);
       emit NotificationSent(nthMsg,_ipfsHash, _address, _description);
         TotalInboxMsg[_address]++;
    }  
}


