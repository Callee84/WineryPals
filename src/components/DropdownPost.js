import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/DropdownPost.module.css";

const DotMenu = React.forwardRef(({ onClick }, ref) => (
    <i
      className="fas fa-ellipsis-v"
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    />
  ));

  export const DropdownPost = () => {
    return (
        <Dropdown classname="ml-auto" drop="left">
            <Dropdown.Toggle as={DotMenu}>
                Custom toggle
            </Dropdown.Toggle>
  
            <Dropdown.Menu classname="text-center">
                <Dropdown.Item classname={styles.DropdownDots}></Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
  };
