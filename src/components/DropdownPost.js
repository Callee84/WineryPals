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

  export const DropdownPost = ({ handleEdit, handleDelete}) => {
    return (
        <Dropdown classname="ml-auto" drop="left">
            <Dropdown.Toggle as={DotMenu}>
                Custom toggle
            </Dropdown.Toggle>
  
            <Dropdown.Menu classname="text-center">
                <Dropdown.Item classname={styles.DropdownDots}
                    onClick={handleEdit}
                    aria-label="edit">
                        <i className="fas fa-edit"> Edit</i>
                </Dropdown.Item>
                <Dropdown.Item className={styles.DropdownDots}
                    onClick={handleDelete}  
                    aria-label="delete">
                        <i className="fas fa-trash"> Delete </i>
                    </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
  };
