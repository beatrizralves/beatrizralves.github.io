import { Briefcase, Code, User } from "lucide-react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { HashLink } from "react-router-hash-link";
import {
  ThemeTypeEnum,
  useThemeContextValue,
} from "../Context/useThemeContext";
import { useState, useEffect } from "react";

export const AboutSection = () => {
  const { theme, setTheme } = useThemeContextValue();
  const [isScrolled, setIsScrolled] = useState(false);
  return (
    <section
      id="about"
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingInline: "1rem",
        position: "relative",
        minHeight: "100vh",
      }}
    >
      <Container style={{ maxWidth: "960px" }}>
        <h2
          className="text-center fw-bold mb-5"
          style={{ fontSize: "2rem", lineHeight: 1.2 }}
        >
          About <span style={{ color: "rgb(238, 68, 187)" }}>Me</span>
        </h2>

        <Row className="align-items-center">
          <Col md={6}>
            <div>
              <h3
                className="fw-semibold"
                style={{
                  fontSize: "1.5rem",
                  color:
                    theme === ThemeTypeEnum.dark ? "pink" : "rgb(238, 68, 187)",
                }}
              >
                Software Engineer
              </h3>
              <p
                style={{
                  color: theme === ThemeTypeEnum.dark ? "white" : "gray",
                }}
              >
                I have completed my bachelor's degree and am currently finishing
                my master's. Throughout my academic journey, I’ve actively
                participated in programming-related events such as job fairs and
                hackathons.
              </p>
              <p
                style={{
                  marginTop: "1rem",
                  color: theme === ThemeTypeEnum.dark ? "white" : "gray",
                }}
              >
                I'm passionate about creating innovative solutions to real-world
                problems.
              </p>
            </div>
          </Col>

          <Col md={6}>
            <img
              src="../me.jpg"
              alt="About me"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                objectFit: "cover",
              }}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
