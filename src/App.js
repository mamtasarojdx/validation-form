import HomePage from "./Components/RegistrationForm/HomePage";
import RegistrationFormData from "./Components/RegistrationForm/RegistraionFormData";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AlertRegistration from "./Components/AlertRegistration/AlertRegistration";
import LoginValidation from "./Components/LoginValidation/LoginValidation";
import FormTable from "./Components/CrudData/FormTable";
import EditData from "./Components/CrudData/EditData";
import CreateData from "./Components/CrudData/CreateData";
import LoginFormData from "./Components/LoginValidation/LoginFormData";
import LoginPage from "./Components/LoginValidation/LoginPage";
import Protected from "./Components/LoginValidation/Protected";
import PageNotFound from "./Components/LoginValidation/PageNotFound";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Protected />}></Route>
          <Route exact path="/inline" element={<Protected/>}></Route>
          <Route exact path="/registration" element={<Protected/>}></Route>
          <Route exact path="/alert" element={<Protected/>}></Route>
          <Route exact path="/login" element={<Protected/>}></Route>
          <Route exact path="/form-table" element={<Protected/>}></Route>
          <Route exact path="/edit" element={<Protected/>}></Route>
          <Route exact path="/create" element={<Protected/>}></Route>
          <Route exact path="/login-data" element={<Protected/>}></Route>
          <Route exact path="/login-page" element={<LoginPage/>}></Route>
          <Route path="*" exact element={<PageNotFound/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
