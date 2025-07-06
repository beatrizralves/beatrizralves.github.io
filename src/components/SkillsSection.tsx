import { useState } from "react";
import { Button, Container, Row, Col, ProgressBar } from "react-bootstrap";
import { useThemeContextValue } from "../Context/useThemeContext";

const skills = [
  { name: "HTML/CSS", level: 90, category: "frontend" },
  { name: "JavaScript", level: 70, category: "frontend" },
  { name: "React", level: 70, category: "frontend" },
  { name: "TypeScript", level: 70, category: "frontend" },

  { name: "Node.js", level: 70, category: "backend" },
  { name: "Express", level: 60, category: "backend" },
  { name: "MongoDB", level: 70, category: "backend" },
  { name: "SQLite", level: 65, category: "backend" },
  { name: "SQL", level: 70, category: "backend" },
  { name: "Python", level: 75, category: "backend" },
  { name: "Java", level: 75, category: "backend" },

  { name: "Git/GitHub", level: 90, category: "tools" },
  { name: "Docker", level: 60, category: "tools" },
  { name: "VS Code", level: 95, category: "tools" },
  { name: "Postman", level: 80, category: "tools" },
  { name: "SourceTree", level: 80, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const { theme, setTheme } = useThemeContextValue();

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section
      id="skills"
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        backgroundColor: "rgba(108, 117, 125, 0.1)",
        position: "relative",
      }}
    >
      <Container style={{ maxWidth: "960px" }}>
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          My <span style={{ color: "rgb(238, 68, 187)" }}>Skills</span>
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {categories.map((category, key) => (
            <Button
              key={key}
              onClick={() => setActiveCategory(category)}
              style={{
                padding: "0.5rem 1.5rem",
                borderRadius: "9999px",
                textTransform: "capitalize",
                backgroundColor:
                  activeCategory === category ? "rgb(238, 68, 187)" : "#e9ecef",
                color: activeCategory === category ? "#fff" : "#212529",
                border: "none",
              }}
            >
              {category}
            </Button>
          ))}
        </div>

        <Row xs={1} sm={2} lg={3} className="g-4">
          {filteredSkills.map((skill, key) => (
            <Col key={key}>
              <div
                style={{
                  backgroundColor: "#fff",
                  padding: "1.5rem",
                  borderRadius: "0.5rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.02)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
              >
                <h5
                  style={{
                    fontWeight: "600",
                    fontSize: "1.125rem",
                    marginBottom: "1rem",
                    textAlign: "left",
                    color: "black",
                  }}
                >
                  {skill.name}
                </h5>
                <ProgressBar
                  now={skill.level}
                  variant="primary"
                  style={{
                    height: "0.5rem",
                    backgroundColor: "rgba(108,117,125,0.5)",
                    borderRadius: "9999px",
                    overflow: "hidden",
                  }}
                />
                <div style={{ textAlign: "right", marginTop: "0.25rem" }}>
                  <span style={{ fontSize: "0.875rem", color: "black" }}>
                    {skill.level}%
                  </span>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
