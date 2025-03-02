import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useMediaQuery, useTheme } from "@mui/material";
import logo from "../assets/logo.png";
import "./Header.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const menuItems = useMemo(
    () => [
      { text: "Home", icon: <HomeIcon />, link: "#home" },
      { text: "Packages", icon: <PeopleIcon />, link: "#packages" },
      { text: "AboutUs", icon: <FitnessCenterIcon />, link: "#AboutUs" },
      { text: "Contact", icon: <ContactMailIcon />, link: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const scrollStep = -window.scrollY / 15;
    const scrollAnimation = () => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
        requestAnimationFrame(scrollAnimation);
      }
    };
    requestAnimationFrame(scrollAnimation);
  };

  const handleNavigation = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="toolbar">
          <div className="logo">
            <img src={logo} alt="Logo" />
          </div>

          {!isMobile && (
            <nav className="nav-links">
              {menuItems.map((item, index) => (
                <a key={index} className="nav-item" onClick={(e) => handleNavigation(e, item.link)} href={item.link}>
                  {item.text}
                </a>
              ))}
            </nav>
          )}

          {isMobile && (
            <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleDrawerToggle} className="menu-button">
              <MenuIcon />
            </IconButton>
          )}
        </div>
      </header>

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className="drawer"
          sx={{ "& .MuiDrawer-paper": { backgroundColor: "#121212", color: "#ffffff" } }}
        >
          <div className="drawer-content">
            <h2 className="drawer-title">Menu</h2>
            <Divider sx={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }} />
            <List>
              {menuItems.map((item, index) => (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    onClick={(e) => {
                      handleNavigation(e, item.link);
                      setMobileOpen(false);
                    }}
                  >
                    <ListItemIcon sx={{ color: "#bb86fc" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} sx={{ color: "#ffffff" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </div>
        </Drawer>
      )}

      {showButton && (
        <button className="back-to-top" onClick={scrollToTop} style={{ opacity: showButton ? 1 : 0, transition: "opacity 0.3s" }}>
          <ArrowUpwardIcon />
        </button>
      )}
    </>
  );
};

export default Header;