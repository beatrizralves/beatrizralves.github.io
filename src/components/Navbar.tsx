import { useEffect, useState } from "react";
import { Navbar as RBNavbar, Container, Nav, Offcanvas } from "react-bootstrap";
import { Menu, X } from "lucide-react";
import {
  ThemeTypeEnum,
  useThemeContextValue,
} from "../Context/useThemeContext";
import { HashLink } from "react-router-hash-link";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  // { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { theme, setTheme } = useThemeContextValue();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navbarStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 1040,
    paddingTop: isScrolled ? "0.75rem" : "1.25rem",
    paddingBottom: isScrolled ? "0.75rem" : "1.25rem",
    backgroundColor: isScrolled ? "rgba(108, 117, 125, 0.1)" : "transparent",
    backdropFilter: isScrolled ? "blur(10px)" : "none",
    boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
    transition: "all 0.3s ease",
    //marginLeft: "-4%",
  };

  const linkStyle: React.CSSProperties = {
    color:
      theme === ThemeTypeEnum.dark && isScrolled
        ? "gray"
        : theme === ThemeTypeEnum.dark && !isScrolled
        ? "white"
        : "rgba(0,0,0,0.8)",
    textDecoration: "none",
    marginRight: "1.5rem",
    fontWeight: 500,
    cursor: "pointer",
    transition: "color 0.3s ease",
  };

  const linkHoverStyle: React.CSSProperties = {
    color: "rgb(238, 68, 187)",
  };

  return (
    <>
      <RBNavbar style={navbarStyle} expand="md">
        <Container>
          <RBNavbar.Brand
            as={HashLink}
            smooth //necessario para o HashLink
            to={"#hero"} //necessario para o HashLink
            style={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color:
                theme === ThemeTypeEnum.dark ? "pink" : "rgb(238, 68, 187)",
              userSelect: "none",
              textShadow:
                theme === ThemeTypeEnum.dark
                  ? "0 0 10px rgb(238, 68, 187)"
                  : "0 0 10px rgb(181, 170, 181)",
            }}
          >
            Beatriz Alves{" "}
            <span
              style={{
                color:
                  theme === ThemeTypeEnum.dark
                    ? "white"
                    : "hsl(221.54deg 46.43% 10.98%)",
              }}
            >
              Portfolio
            </span>
          </RBNavbar.Brand>

          <RBNavbar.Toggle
            aria-controls="offcanvasNavbar"
            onClick={() => setShowOffcanvas((prev) => !prev)}
            style={{ border: "none", color: "#333" }}
            aria-label={showOffcanvas ? "Close Menu" : "Open Menu"}
          >
            {showOffcanvas ? <X size={24} /> : <Menu size={24} />}
          </RBNavbar.Toggle>

          <RBNavbar.Collapse className="justify-content-end d-none d-md-flex">
            <Nav>
              {navItems.map((item, idx) => (
                <Nav.Link
                  as={HashLink}
                  key={idx}
                  smooth //necessario para o HashLink
                  to={item.href} //necessario para o HashLink
                  style={{
                    ...linkStyle,
                    ...(hoveredIndex === idx ? linkHoverStyle : {}),
                  }}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {item.name}
                </Nav.Link>
              ))}
            </Nav>
          </RBNavbar.Collapse>
        </Container>
        <ThemeToggle></ThemeToggle>
      </RBNavbar>

      <Offcanvas
        show={showOffcanvas}
        onHide={() => setShowOffcanvas(false)}
        placement="start"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          color: "#222",
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column" style={{ fontSize: "1.25rem" }}>
            {navItems.map((item, idx) => (
              <Nav.Link
                key={idx}
                as={HashLink}
                smooth
                to={item.href}
                onClick={() => setShowOffcanvas(false)}
                style={{
                  color: "rgba(0,0,0,0.8)",
                  marginBottom: "1rem",
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#5c3ac7")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(0,0,0,0.8)")
                }
              >
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
