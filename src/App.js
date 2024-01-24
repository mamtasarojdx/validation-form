
import Form from "./Components/Form";
import RegistrationFormData from "./Components/RegistrationForm/RegistraionFormData";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RegistrationForm />}></Route>
          <Route exact path="/registration" element={<RegistrationFormData/>}></Route>
          <Route exact path="/form" element={<Form/>}></Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
