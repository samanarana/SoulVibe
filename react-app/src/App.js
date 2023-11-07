import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import ExercisePage from "./components/ExercisePage/index";
import MeditationPage from "./components/MeditationPage/index";
import NutritionPage from "./components/NutritionPage/index";
import JournalPage from "./components/JournalPage/index";
import ResourcePage from "./components/ResourcePage/index";

import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/exercise" >
            <ExercisePage />
          </Route>
          <Route path="/nutrition" >
            <NutritionPage />
          </Route>
          <Route path="/meditation" >
            <MeditationPage />
          </Route>
          <Route path="/Journal" >
            <JournalPage />
          </Route>
          <Route path="/resource" >
            <ResourcePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
