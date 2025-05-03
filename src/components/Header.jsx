import React, { useState, useEffect, useCallback, useMemo } from "react";
import { 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Slide,
  Fade,
  Grow
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CloseIcon from "@mui/icons-material/Close";
import { useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";
import "./Header.css";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const menuItems = useMemo(
    () => [
      { text: "Home", icon: <HomeIcon />, link: "#home" },
      { text: "Packages", icon: <GroupWorkIcon />, link: "#packages" },
      { text: "About", icon: <InfoIcon />, link: "#about" },
      { text: "Contact", icon: <ContactMailIcon />, link: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleNavigation = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ 
        behavior: "smooth", 
        block: "start" 
      });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <motion.header 
        className={`header ${scrolled ? "scrolled" : ""}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="toolbar">
          <motion.div 
            className="logo"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img src={logo} alt="Logo" />
          </motion.div>

          {!isMobile && (
            <nav className="nav-links">
              {menuItems.map((item, index) => (
                <motion.a
                  key={index}
                  className={`nav-item ${hoveredItem === index ? "active" : ""}`}
                  onClick={(e) => handleNavigation(e, item.link)}
                  href={item.link}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.text}
                  {hoveredItem === index && (
                    <motion.span 
                      className="nav-item-highlight"
                      layoutId="navHighlight"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </motion.a>
              ))}
            </nav>
          )}

          {isMobile && (
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IconButton 
                edge="end" 
                color="inherit" 
                aria-label="menu" 
                onClick={handleDrawerToggle} 
                className="menu-button"
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </motion.div>
          )}
        </div>
      </motion.header>

      {isMobile && (
        <Drawer
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          className="drawer"
          sx={{ 
            "& .MuiDrawer-paper": { 
              backgroundColor: "#000000",
              width: "75vw",
              borderLeft: "2px solid #ff0000"
            } 
          }}
        >
          <div className="drawer-content">
            <div className="drawer-header">
              <motion.div 
                className="logo"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={logo} alt="Logo" />
              </motion.div>
              <IconButton onClick={handleDrawerToggle}>
                <CloseIcon sx={{ color: "#ffffff" }} />
              </IconButton>
            </div>
            <Divider sx={{ backgroundColor: "rgba(255, 0, 0, 0.3)" }} />
            <List>
              {menuItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <ListItem disablePadding>
                    <ListItemButton
                      onClick={(e) => handleNavigation(e, item.link)}
                      sx={{
                        "&:hover": {
                          backgroundColor: "rgba(255, 0, 0, 0.1)"
                        }
                      }}
                    >
                      <ListItemIcon sx={{ color: "#ff0000", minWidth: "40px" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText 
                        primary={item.text} 
                        primaryTypographyProps={{ 
                          fontFamily: "'Montserrat', sans-serif",
                          fontWeight: 600,
                          fontSize: "1.1rem"
                        }} 
                        sx={{ color: "#ffffff" }} 
                      />
                    </ListItemButton>
                  </ListItem>
                  {index < menuItems.length - 1 && (
                    <Divider sx={{ backgroundColor: "rgba(255, 0, 0, 0.1)" }} />
                  )}
                </motion.div>
              ))}
            </List>
          </div>
        </Drawer>
      )}

      <Fade in={showButton}>
        <motion.button 
          className="back-to-top"
          onClick={scrollToTop}
          whileHover={{ scale: 1.1, backgroundColor: "#000000" }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: showButton ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ArrowUpwardIcon />
        </motion.button>
      </Fade>
    </>
  );
};

export default Header;