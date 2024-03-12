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

import LoginPageTimer from "./Components/LoginPageTimer";

import LogOutTimer from "./Components/LogOutTimer.jsx";
import { TimerProvider } from "./Components/LoginValidation/TimerContext.jsx";

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [timeRunning, setTimeRunning] = useState(true);
  const [time, setTime] = useState(true);


  const handleLogin = (email, password) => {
    const user = userData.find((user) => user.email === email);
   
    if (user && loggedInUser) {
      setLoggedInUser(user);
      setTimeRunning(true)
      setTime(true)
    }
  };

  return (
    <TimerProvider>
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
    </BrowserRouter></TimerProvider>
  );
}

export default App;
