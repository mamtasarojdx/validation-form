import HomePage from "./Components/RegistrationForm/HomePage";
import RegistrationFormData from "./Components/RegistrationForm/RegistraionFormData";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import AlertRegistration from "./Components/AlertRegistration/AlertRegistration";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/inline" element={<RegistrationForm/>}></Route>
          <Route exact path="/registration" element={<RegistrationFormData/>}></Route>
          <Route exact path="/alert" element={<AlertRegistration/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
