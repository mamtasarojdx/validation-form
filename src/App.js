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

import { TimerProvider } from "./Components/LoginValidation/TimerContext.jsx";
import CompanyRegistrationForm from "./Components/CrudRegistrationForm/CompanyRegistrationForm.jsx";

import SubmitFormData from "./Components/CrudRegistrationForm/SubmitFormData.jsx";
import CrudTableList from "./Components/CrudRegistrationTable/CrudTableList.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email, password) => {
    const user = userData.find((user) => user.email === email);

    if (user && loggedInUser) {
      setLoggedInUser(user);
    }
  };

  return (
    <TimerProvider>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Protected />} />
          <Route exact path="/login-data" element={<Protected />} />
          <Route exact path="/home" element={<HomePage />}></Route>
          <Route exact path="/registration-page" element={<RegistrationForm />}></Route>
          <Route exact path="/login-page" element={<LoginPage onLogin={handleLogin} />} />
          <Route exact path="/login-table" element={<LoginTable loggedInUser={loggedInUser} />} />
          <Route exact path="/registration" element={<RegistrationFormData />}></Route>
          <Route path="*" exact element={<PageNotFound />} />
          <Route exact path="/company-registration" element={<CompanyRegistrationForm />}></Route>
          <Route exact path="/submit-page" element={<SubmitFormData />}></Route>
          <Route exact path="/company-table" element={<CrudTableList />}></Route>
        </Routes>
      </BrowserRouter>
    </TimerProvider>
  );
}

export default App;
