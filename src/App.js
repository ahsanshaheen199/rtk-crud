import React from 'react';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import Users from "./pages/Users";
import Header from '../src/components/Header';
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Header />
        <Routes>
          <Route path={"/users"} element={<Users />} />
          <Route path={"/adduser"} element={<AddUser />} />
          <Route path={"/users/:id"} element={<EditUser />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
