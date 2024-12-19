import React, { useState } from "react";
import LoginPage from "./LoginPage";
import EmployeeCRUD from "./EmployeeCRUD";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <div>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <EmployeeCRUD onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
