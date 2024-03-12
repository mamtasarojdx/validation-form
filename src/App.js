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
import { Provider } from 'react-redux';
import store from "./Components/LoginValidation/store";
import LoginPageTimer from "./Components/LoginPageTimer";

import LogOutTimer from "./Components/LogOutTimer.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (email, password) => {
    const user = userData.find((user) => user.email === email);

    if (user) {
      setLoggedInUser(user);
    }
  };

  return (
    <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Protected />} />
        <Route exact path="/login-data" element={<Protected />} />
       
        <Route exact path="/login-page" element={<LoginPage onLogin={handleLogin} />} />
        <Route exact path="/login-table" element={<LoginTable loggedInUser={loggedInUser} />} />
        <Route exact path="/login-timer" element={<LoginPageTimer />} />
        <Route exact path="/logout-timer" element={<LogOutTimer />} />
        <Route path="*" exact element={<PageNotFound />} />
      </Routes>
    </BrowserRouter></Provider>
  );
}

export default App;
