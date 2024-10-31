// import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";
// import ActivityDashboard from "../../features/activites/dashboard/ActivityDashboard";
// import LoadingComponenet from "./loadingComponenet";
// import { useStore } from "../stores/Store";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation } from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import { ToastContainer } from "react-toastify";

function App() {
  const location = useLocation();
  return (
    <>
      <ToastContainer position='bottom-right' theme='colored' />
      {location.pathname === "/" ? (
        <HomePage />
      ) : (
        <>
          <NavBar />
          <Container style={{ marginTop: "7em" }}>
            {/* <ActivityDashboard /> */}
            <Outlet />
          </Container>
        </>
      )}
    </>
  );
}

export default observer(App);
