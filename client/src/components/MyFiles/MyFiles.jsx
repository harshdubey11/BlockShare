import React from "react";
import "./MyFiles.scss";
import {
  Stack,
  HStack,
  VStack,
  Text,
  Heading,
  Divider,
  Button,
  StackDivider,
} from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    TabIndicator,
  } from "@chakra-ui/react";
function MyFiles(props) {
  return (
    <div className="contaier">
    <Tabs size="lg" className="tabsContainer2" isFitted>
            <TabList>
              <Tab _selected={{ color: "white", bg: "#8E05C2" ,borderRadius:"20px"}}>
              My Uploads
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8E05C2",borderRadius:"20px" }}>
               Files Received
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
              <div className="selfUploads">
        <span className="head">My Uploads</span>
      
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {props.Files.length>0
            ? props.Files.map((item, idx) => {
                return (
                  <Card maxW="lg" variant='elevated'>
                    <CardBody>
                      <Stack mt="6" spacing="2">
                        <Heading size="sm">{item.description}</Heading>
                        <Text>{item.ipfsHash}</Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                    <a href={"https://gateway.pinata.cloud/ipfs/"+item.ipfsHash} target="_blank" rel="noreferrer">
                      <Button>Checkout File</Button>
                      </a>
                    </CardFooter>
                  </Card>
                );
              })
            :  <Card maxW="lg" variant='elevated'>
                    <CardBody>
                      <Stack>
                        <Heading size="md">No Files Found</Heading>
                      </Stack>
                    </CardBody>
                  
                  </Card>}
        </VStack>
      </div>
              </TabPanel>
              <TabPanel>
              <div  className="selfUploads">
      <span className="head">Files Received</span>
        <VStack
          divider={<StackDivider borderColor="gray.200" />}
          spacing={4}
          align="stretch"
        >
          {props.InboxFiles.length>0
            ? props.InboxFiles.map((item, idx) => {
                return (
                  <Card maxW="lg" variant='elevated' >
                    <CardBody>
                      <Stack mt="6" spacing="3">
                        <Heading size="sm">{item.description}</Heading>
                        <Text>{item.ipfsHash}</Text>
                      </Stack>
                    </CardBody>
                    <Divider />
                    <CardFooter>
                    <a href={"https://gateway.pinata.cloud/ipfs/"+item.ipfsHash} target="_blank" rel="noreferrer">
                      <Button>Checkout File</Button>
                      </a>
                    </CardFooter>
                  </Card>
                );
              })
            : <Card  variant='elevated'>
                    <CardBody>
                      <Stack>
                        <Heading size="md">No Files Found</Heading>
                      </Stack>
                    </CardBody>
                  
                  </Card>}
        </VStack>
      </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
    
   
    </div>
  );
}

export default MyFiles;
