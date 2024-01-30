import HomePage from "./Components/RegistrationForm/HomePage";
import RegistrationFormData from "./Components/RegistrationForm/RegistraionFormData";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AlertRegistration from "./Components/AlertRegistration/AlertRegistration";
import LoginValidation from "./Components/LoginValidation/LoginValidation";
import Register from "./Components/RegistrationForm/RegistrationForm";

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
          <Route exact path="/regis22" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
