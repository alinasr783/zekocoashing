import React from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import ReasonsToJoin from "./components/ReasonsToJoin";
import GymMembership from "./components/GymMembership";
import AboutUs from "./components/AboutUs.jsx";
import Ai from "./components/ai.jsx"
import WhatsApp from "./components/whatsapp.jsx"
import Footer from "./components/Footer.jsx";
import Policies from "./components/Policies.jsx"
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./App.css";

const theme = createTheme({
  typography: {
    fontFamily: '"Tajawal", sans-serif',
    fontWeightBold: 900,
  },
});

const App = () => {
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        <Header />
        <WhatsApp />
        <HeroSection />
        <ReasonsToJoin />
        <GymMembership />
        <AboutUs />
        <Policies />
        <Footer />
        <Ai />
      </ThemeProvider>
    </div>
  );
};

export default App;
