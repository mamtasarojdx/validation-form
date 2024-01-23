import RegistrationForm2 from "./Components/RegistrationForm/RegistraionForm2";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<RegistrationForm />}></Route>
          <Route exact path="/regis-2" element={<RegistrationForm2 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
