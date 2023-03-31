import React from "react";
import "./Topbar.scss";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { MdAccountCircle } from "react-icons/md";
function Topbar(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <div className="topbar">
      <div className="wrapper">
        <div className="left">
          <span className="logo">BlockShare</span>
        </div>
        <div className="right">
          <MdAccountCircle onClick={onOpen} className='accIcon'/>
          <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader className="text" borderBottomWidth="1px">
                Connected Account
              </DrawerHeader>
              <DrawerBody>{props.addressAccount}</DrawerBody>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
