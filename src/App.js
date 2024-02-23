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
import LoginTable from "./Components/LoginValidation/LoginTable";
import { useState } from "react";
import userData from "./Components/LoginValidation/LoginData.json";
import CountTimer from "./Components/CountTimer";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email, password) => {
    const user = userData.find((user) => user.email === email);

    if (user) {
      setLoggedInUser(user);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Protected />} />
        <Route exact path="/login-data" element={<Protected />} />
        <Route exact path="/count-timer" element={<CountTimer />} />
        <Route exact path="/login-page" element={<LoginPage onLogin={handleLogin} />} />
        <Route exact path="/login-table" element={<LoginTable loggedInUser={loggedInUser} />} />
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
