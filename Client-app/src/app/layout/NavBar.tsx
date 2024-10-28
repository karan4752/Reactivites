// import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
// import { useStore } from "../stores/Store";
import { NavLink } from "react-router-dom";
export default function NavBar() {
  // const { activityStore } = useStore();
  return (
    <Menu inverted fixed='top'>
      <Container>
        <Menu.Item as={NavLink} to='/' header>
          <img
            src='/assests/logo.png'
            alt='logo'
            style={{ marginRight: "10px" }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item as={NavLink} to='/activities' name='Activity' />
        <Menu.Item>
          <Button
            positive
            content='Create Activity'
            as={NavLink}
            to='/createActivity'
          />
          {/* <Button
            positive
            content='Create Activity'
            onClick={() => activityStore.openForm()}
          /> */}
        </Menu.Item>
      </Container>
    </Menu>
  );
}
