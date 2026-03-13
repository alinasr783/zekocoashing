import React from "react";
import Header from "./components/Header";
import WhatsApp from "./components/whatsapp.jsx";
import Beta from "./components/Beta.jsx";
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
        <Beta />
      </ThemeProvider>
    </div>
  );
};

export default App;
