import "../styles/App.css";
import Cards from "./Cards.tsx";
import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import LoginPage from "./LoginPage";
import User from "./User";
import Posts from "./Posts";
import Albums from "./Albums";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <User />
              </MainLayout>
            }
          />
          <Route
            path="/posts"
            element={
              <MainLayout>
                <Posts />
              </MainLayout>
            }
          />
          <Route
            path="/albums"
            element={
              <MainLayout>
                <Albums />
              </MainLayout>
            }
          />
          <Route
            path="/"
            element={
              <MainLayout>
                <Cards />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
