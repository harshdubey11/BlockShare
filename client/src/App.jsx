import Topbar from "./components/Topbar/Topbar";
import Home from "./components/Home/Home";
import ShareFile from "./components/ShareFile/ShareFile";
import { useEffect, useRef, useState } from "react";
import { load } from "./Functions";
import Lottie from "lottie-react";
import { loadingAnim } from "../src/Lottie/LoadingScreen";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import {AiFillInfoCircle} from 'react-icons/ai';
import "./App.scss";
import MyFiles from "./components/MyFiles/MyFiles";
function App() {
  const [addressAccount, setAddressAccount] = useState("");
  const [refresh, setRefresh] = useState(true);
  const [contract, setContract] = useState(null);
  const [loadingScreen, setLoading] = useState(true);
  const [Files, setFiles] = useState([]);
  const [InboxFiles, setInboxFiles] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    let loadedData;
    async function loadIt() {
      loadedData = await load();
      console.log(loadedData);
      setAddressAccount(loadedData.addressAccount);
      setFiles(loadedData.SelfFiles);
      setInboxFiles(loadedData.InboxFiles);
      setContract(loadedData.IPFSContract);
    }
    loadIt();
    setTimeout(() => {
      setRefresh(false);
      setLoading(false);
    }, 5000);
  }, []);
  if (loadingScreen) {
    return (
      <div className="animation">
        <Lottie
          animationData={loadingAnim}
          loop={true}
          style={{ height: "790px", width: "800px" }}
        />
      </div>
    );
  } else {
    return (
      <div id="App">
        <div className="container">
          <Topbar addressAccount={addressAccount}/>
          <Tabs size="lg" className="tabsContainer" isFitted >
            <TabList>
              <Tab _selected={{ color: "white", bg: "#8E05C2" ,borderRadius:"20px"}}>
                Upload Files
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8E05C2",borderRadius:"20px" }}>
                Send FileHash
              </Tab>
              <Tab _selected={{ color: "white", bg: "#8E05C2" ,borderRadius:"20px"}}>My Files</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Home addressAccount={addressAccount} contract={contract} />
              </TabPanel>
              <TabPanel>
                <ShareFile
                  addressAccount={addressAccount}
                  contract={contract}
                />
              </TabPanel>
              <TabPanel>
                <MyFiles Files={Files} InboxFiles={InboxFiles} />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <div className="info">
          <AiFillInfoCircle onClick={onOpen} className='icon'/>
          <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader className="text" borderBottomWidth="1px">
                About BlockShare
              </DrawerHeader>
              <DrawerBody></DrawerBody>
            </DrawerContent>
          </Drawer>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
