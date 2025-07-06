import { ArrowDown, Linkedin } from "lucide-react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./HeroSection.css";
import { HashLink } from "react-router-hash-link";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "0 1rem",
        textAlign: "center",
      }}
    >
      <Container style={{ maxWidth: "768px", zIndex: 10 }}>
        <Row>
          <Col>
            <div style={{ marginBottom: "2rem" }}>
              <h1
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  marginBottom: "1rem",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    animation: "fade-in 0.7s ease-out forwards",
                  }}
                >
                  Hi, I'm
                </span>
                <span
                  style={{
                    display: "inline-block",
                    color: "rgb(238, 68, 187)",
                    opacity: 0,
                    animation: "fade-in 0.7s ease-out 0.2s forwards",
                  }}
                >
                  &#8205; Beatriz
                </span>
                <span
                  style={{
                    display: "inline-block",
                    background:
                      "linear-gradient(90deg,rgb(240, 90, 237),rgb(236, 19, 225))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    marginLeft: "0.5rem",
                    opacity: 0,
                    animation: "fade-in 0.7s ease-out 0.4s forwards",
                  }}
                >
                  Alves
                </span>
              </h1>

              <p
                style={{
                  fontSize: "1.125rem",
                  color: "#6c757d",
                  margin: "0 auto",
                  maxWidth: "640px",
                  opacity: 0,
                  animation: "fade-in 0.7s ease-out 0.6s forwards",
                }}
              >
                I am Telecommunications and Informatics Engineer from Portugal
                <br></br>
                Currently i am working on my Master's Thesis
              </p>

              <div
                style={{
                  paddingTop: "1rem",
                  opacity: 0,
                  animation: "fade-in 0.7s ease-out 0.8s forwards",
                }}
              >
                <Button
                  style={{
                    // padding: "0.5rem 1.5rem",
                    borderRadius: "999px",
                    backgroundColor: "rgb(238, 68, 187)",
                    border: "none",
                    color: "white",
                    fontWeight: "500",
                    transition: "all 0.3s",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.boxShadow =
                      "0 0 10px rgb(238, 68, 187)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                  onMouseDown={(e) => {
                    e.currentTarget.style.transform = "scale(0.95)";
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                >
                  <HashLink
                    smooth //necessario para o HashLink
                    to={"#projects"} //necessario para o HashLink
                    style={{
                      textDecoration: "none",
                      borderRadius: "999px",
                      width: "100%",
                      backgroundColor: "rgb(238, 68, 187)",
                      border: "none",
                      color: "white",
                      fontWeight: "500",
                      transition: "all 0.3s",
                    }}
                  >
                    View My Work
                  </HashLink>
                </Button>
                <Button
                  style={{
                    // padding: "0.5rem 1.5rem",
                    margin: "10px",
                    borderRadius: "999px",
                    backgroundColor: "rgb(238, 68, 187)",
                    border: "none",
                    color: "white",
                    fontWeight: "500",
                    transition: "all 0.3s",
                  }}
                  href="https://www.linkedin.com/in/-beatrizralves-/"
                >
                  Contact Me
                  <span style={{ marginLeft: "10px" }}></span>
                  <Linkedin />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          animation: "bounce 2s infinite",
        }}
      >
        <span
          style={{
            fontSize: "0.875rem",
            color: "#6c757d",
            marginBottom: "0.5rem",
          }}
        >
          Scroll
        </span>
        <ArrowDown size={20} color="rgb(238, 68, 187)" />
      </div>
    </section>
  );
};
