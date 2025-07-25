import { Outlet } from "react-router-dom";
import { Flip, ToastContainer } from "react-toastify";

import "./App.css";
import Nav from "./components/Nav";

function App() {
  return (
    <>
      <Nav />
      <ToastContainer
        transition={Flip}
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Outlet />
    </>
  );
}

export default App;
