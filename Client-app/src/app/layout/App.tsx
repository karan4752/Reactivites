/* eslint-disable react-refresh/only-export-components */
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";
import { useStore } from "../stores/Store";
import { useEffect } from "react";
import LoadingComponenet from "./loadingComponenet";
import ModalContainer from "../common/modals/modalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();
  useEffect(() => {
    if (commonStore.token)
      userStore.getUser().finally(() => commonStore.setApploaded());
    else commonStore.setApploaded();
  }, [commonStore, userStore]);
  if (!commonStore.apploded)
    return <LoadingComponenet content='Loading app...' />;
  return (
    <>
      <ModalContainer/>
      <ToastContainer position='bottom-right' theme='colored' />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
