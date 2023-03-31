import React, { useState } from "react";
import axios from "axios";
import "./Home.scss";
import { Button, Input } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  useToast
} from "@chakra-ui/react";

function Home(props) {
  const [transactionhash, setReceipt] = useState({});
  const [inputFields, setInputFields] = useState({});
  const [file, setFile] = useState(null);
  const [ipfsHash, setipfsHash] = useState("");
  const toast = useToast();

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    setFile(data);
    e.preventDefault();
  };
  const handleAddIPFStoBC = async (ipfsHash) => {
    console.log("hash", ipfsHash);
    props.contract.methods
      .createFileHash("file by client", ipfsHash)
      .send({ from: props.addressAccount })
      .on("receipt", function (result) {
        console.log(result);
        setReceipt(result);
      });
     
  };

  const sendFileToIPFS = async (e) => {
    e.preventDefault();
    if (file) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: "179ce4b4ace5e9b13e22",
            pinata_secret_api_key:
              "9e8cc7e6b612bc49a95b75546ad8f7b76077cd979db54c50c1def6590d4e491d",
            "Content-Type": "multipart/form-data",
          },
        });

        const ImgHash = resFile.data.IpfsHash;
        setipfsHash(ImgHash);
        console.log(props.addressAccount);

        handleAddIPFStoBC(ImgHash);
      
      } catch (error) {
        console.log("Error sending File to IPFS: ");
        console.log(error);
      }
    }
  };
  const handleInputChange = ({ target: { name, value } }) => {
    setInputFields((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div className="container">
      <form autoComplete="off" className="form" onSubmit={sendFileToIPFS}>
        <Input
          className="formItem desc"
          onChange={handleInputChange}
          required
          type="text"
          name="description"
          value={inputFields?.description}
          variant="filled"
          placeholder="Description"
        />
        <Input
          className="formItem file"
          variant="filled"
          onChange={retrieveFile}
          required
          type="file"
          accept="image/*,.pdf"
        />

        <Button  className="formItem btn" type="submit">
          Upload
        </Button>
      </form>
      {transactionhash?.transactionHash ? (
        <div className="display">
          <span className="tableHead">Transaction Receipt</span>
          <TableContainer>
            <Table size="md" variant="striped" colorScheme="purple">
              <TableCaption></TableCaption>
              {/* <Thead>
      <Tr>
        <Th>Item</Th>
        <Th>Value</Th>
      </Tr>
    </Thead> */}
              <Tbody>
                <Tr>
                  <Td>File IPFS Hash</Td>
                  <Td>{ipfsHash}</Td>
                </Tr>
                <Tr>
                  <Td>Transaction Hash</Td>
                  <Td>{transactionhash.transactionHash}</Td>
                </Tr>
                <Tr>
                  <Td>Block Number</Td>
                  <Td>{transactionhash.blockNumber}</Td>
                </Tr>
                <Tr>
                  <Th>Gas Used</Th>
                  <Th>{transactionhash.gasUsed}</Th>
                </Tr>
              </Tbody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
