import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useMediaQuery, useTheme } from "@mui/material";
import "./Header.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigation = (event, targetId) => {
    event.preventDefault(); // منع السلوك الافتراضي للرابط
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="toolbar">
          <h1 className="logo">GYM+</h1>

          {!isMobile && (
            <nav className="nav-links">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  className="nav-item"
                  onClick={(e) => handleNavigation(e, item.link)}
                  href={item.link}
                >
                  {item.text}
                </a>
              ))}
            </nav>
          )}

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              className="menu-button"
            >
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

      {scrolled && (
        <button className="back-to-top" onClick={scrollToTop}>
          <ArrowUpwardIcon />
        </button>
      )}
    </>
  );
};

export default Header;