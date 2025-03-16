// src/components/Header/Header.jsx
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles.header}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        MAIN
      </NavLink>
      <NavLink
        to="/description"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        DESC
      </NavLink>
      <NavLink
        to="/meta-creation"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        META CREATE
      </NavLink>
      <NavLink
        to="/total"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        TOTAL
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => (isActive ? styles.active : "")}
      >
        SETTING
      </NavLink>
    </nav>
  );
};

export default Header;
