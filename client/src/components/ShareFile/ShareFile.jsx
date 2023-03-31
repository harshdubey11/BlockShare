import { Button, Input } from '@chakra-ui/react';
import React, {useState } from 'react'
import './ShareFile.scss';
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
function ShareFile(props) {
    const [inputFields,setInputFields]=useState({});
    const [transactionhash, setReceipt] = useState({});
  const handleSendIPFStoUser = async (e) => {
  e.preventDefault();
    try {
      props.contract.methods.sendIPFSNotification(inputFields.recipientAddress,inputFields.description,inputFields.IPFS_Hash)
      .send({from: props.addressAccount})
      .on('receipt', function(result){
          console.log(result);
          setReceipt(result);
      });
      setInputFields({});
    } catch (error) {
      console.log(error);
    }
 
  };
 
    const handleInputChange = ({ target: { name, value } }) => {
        setInputFields((prev) => ({ ...prev, [name]: value }))
      }
  return (
    <div className='container'>
    
    <form autoComplete='off' className='form' onSubmit={handleSendIPFStoUser}>
        <Input placeholder="Recepient's Address"variant='filled' className='formItem' onChange={handleInputChange} required type="text" name="recipientAddress" value={inputFields?.recipientAddress}/>
        <Input placeholder="Description" variant='filled' className='formItem' onChange={handleInputChange} required type="text" name="description" value={inputFields?.description}/>
        <Input placeholder="IPFS Hash" variant='filled' className='formItem' onChange={handleInputChange} required type="text" name="IPFS_Hash" value={inputFields?.IPFS_Hash}/>
        <Button  className='formItem'type='submit'>Send</Button>
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
  )
}

export default ShareFile