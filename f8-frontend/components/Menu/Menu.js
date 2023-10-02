import React, {useEffect} from "react";
import BackButton from "../Button/BackButton";
import styles from "./Menu.module.scss"

const Menu = ({title, items, setShowMenu}) => {
  useEffect(() => {
    const handleOutsideClick = (e) => {
      let cur_ele = document.getElementById("menu-Box");
      let start_ele = document.getElementById("menu-btn");
      if((!cur_ele.contains( e.target )) && (!start_ele.contains(e.target)) && title != e.target.innerHTML){
        // console.log(e.target, title);
        setShowMenu();
      }
      
    }
    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  return (
    <div className={styles.menuContainer}>
      <div id="menu-Box" className={styles.menu}>
        <p className="title">{title}</p>
        <ul className="items">
          {items.map((item, index) => (
            <li key={index} onClick={item.handler} className="item">
              {item.label}
              {
                item.submenu != undefined && item.submenu.show &&
                <SubMenu items={item.submenu.items}/>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
const SubMenu = ({items}) => {
  return (
    <div className="submenu-container">
      <div className="submenu">
        <ul className="items">
          {items.map((item, index) => (
            <li key={index} onClick={item.handler} className="item">
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
export default Menu;
