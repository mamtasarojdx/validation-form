import HomePage from "./Components/RegistrationForm/HomePage";
import RegistrationFormData from "./Components/RegistrationForm/RegistraionFormData";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AlertRegistration from "./Components/AlertRegistration/AlertRegistration";
import LoginValidation from "./Components/LoginValidation/LoginValidation";
import FormTable from "./Components/CrudData/FormTable";
import EditData from "./Components/CrudData/EditData";
import CreateData from "./Components/CrudData/CreateData";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/inline" element={<RegistrationForm/>}></Route>
          <Route exact path="/registration" element={<RegistrationFormData/>}></Route>
          <Route exact path="/alert" element={<AlertRegistration/>}></Route>
          <Route exact path="/login" element={<LoginValidation/>}></Route>
          <Route exact path="/form-table" element={<FormTable/>}></Route>
          <Route exact path="edit/:id" element={<EditData/>}></Route>
          <Route exact path="/create" element={<CreateData/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
