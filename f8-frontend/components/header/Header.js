import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { Container,  Navbar } from "react-bootstrap"
import Image from "next/image";


import logoImg from "../../assets/logo.png";
import { logout, RESET, selectIsLoggedIn, saveApiKey, selectUser } from "@/redux/features/auth/authSlice";
import { ShowOnLogin, ShowOnLogout } from "../protect/hiddenLink";
import Menu from "../Menu/Menu";
import CustomInput from "../ConfirmMessage/CustomInput";

import styles from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(selectUser);

  const userMenu = {
    title:"Balance: 22coins",
    items:[
      { label: 'Topup', handler: () => { setMenu(TopupMenu); } },
      { label: 'Setting', handler: () => { setMenu(SettingMenu);} },
      { label: 'Upgrade', handler: () => { router.push("/payment/package"); } },
      { label: 'Help/Suggestion', handler: () => {router.push("https://discord.com/invite/vUUEXDfKVE");} },
      { label: 'Log out', handler: () => logoutUser() }
    ]
  };
  const AdminMenu = {
    title:"Dashboard",
    items: [
      { label:"Manage User", handler:()=>{} },
      { label:"Framework", handler:()=>{} },
      { label:"Template", handler:()=>{} },
      { label:"Logout", handler:()=>{} },
    ]
  }
  const SettingMenu = {
    title:"Setting",
    items:[
      { label: 'Subscriptions', handler:() => {setMenu(SubscriptionSubMenu);}},
      { label: 'OpenAI API Keys', handler: () => {setShowInput(true); toggleMenu();} }
    ]
  };
  const SubscriptionSubMenu = {
    title:"Subscriptions",
    items:[
      {label:"Upgrade", handler:()=>{}},
      {label:"Cancel", handler:()=>{}}
    ]
  } 
  const TopupMenu = {
    title:"Topup", 
    items:[
      {label:"Topup Coins", handler:()=>{router.push("/topup/topup"); setShowMenu(false);}},
      {label:"Use my own OpenAI API Keys", handler:()=>{setShowInput(true); toggleMenu();}}
    ]
  }
  const ManageUser = {
    title:"Manage User", 
    items:[
      {label:"Free: 500",handler:()=>{}},
      {label:"Ideal: 54",handler:()=>{}},
      {label:"Omni: 20",handler:()=>{}},
      {label:"Manage User Package",handler:()=>{}},
    ]
  }

  const [showMenu, setShowMenu] = useState(false, "");
  const [showInput, setShowInput] = useState(false, "");
  const [menu, setMenu] = useState(userMenu, "");

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const expand = 'md';

  const goHome = () => {
    router.push("/");
  };
  const saveKey = (key) => {
    dispatch(saveApiKey({
      user: user,
      apiKey: key
    }))
  }
  const logoutUser = async () => {
    dispatch(RESET());
    await dispatch(logout());
    router.push("/auth/login");
  };

  const toggleMenu = () => {
    setMenu(userMenu);
    showMenu ? setShowMenu(false) : setShowMenu(true);
  }
  return (
      isLoggedIn &&
      <Navbar key={expand} bg="light" expand={expand} className={`mb-3 ${styles.header} shadow-lg`}>
        <Container fluid>
          <Navbar.Brand href="#">
            <Image onClick={goHome} src={logoImg} alt="Auth" width="50" height="50" />
          </Navbar.Brand>
          <button id="menu-btn" onClick={toggleMenu} className={styles.menuBtn}>
            <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line y1="3" x2="46" y2="3" stroke="black" strokeWidth="6"/>
              <line y1="21.5" x2="46" y2="21.5" stroke="black" strokeWidth="6"/>
              <path d="M0 43H46" stroke="black" strokeWidth="6"/>
            </svg>
          </button>
          { 
            showMenu && 
              <Menu title={menu.title} items={menu.items} setShowMenu={toggleMenu}/> 
          }
          {
            showInput &&
            <CustomInput onConfirm={saveKey} title="OpenAI API Key" name="Key" showConfirm={setShowInput}/>
          }
          {
            // showManageUser &&
            // <
          }
        </Container>
      </Navbar>
  );
}

export default Header;