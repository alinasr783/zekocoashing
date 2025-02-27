import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReasonsToJoin from "./components/ReasonsToJoin";
import GymMembership from "./components/GymMembership";
import AboutUs from "./components/AboutUs";
import TrainersStaff from "./components/TrainersStaff";
import Footer from "./components/Footer";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: '"Nosifer", serif',
  },
});

const App = () => {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Header />
        <HeroSection />
        <ReasonsToJoin />
        <GymMembership />
        <AboutUs />
        <TrainersStaff />
        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
