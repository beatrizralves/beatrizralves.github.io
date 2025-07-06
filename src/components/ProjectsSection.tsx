import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { loadDatabase } from "../Database/loadDb";
import { Database } from "sql.js";
import { useDbContextValue } from "../Context/useDbContext";
import * as DbService from "../services/DbService";
import ProjectCard from "./ProjectCard";

// const projects = [
//   {
//     id: 1,
//     title: "SaaS Landing Page",
//     description: "A beautiful landing page app using React and Tailwind.",
//     image: "/projects/project1.png",
//     tags: ["React", "TailwindCSS", "Supabase"],
//     demoUrl: "#",
//     githubUrl: "#",
//   },
//   {
//     id: 2,
//     title: "Orbit Analytics Dashboard",
//     description:
//       "Interactive analytics dashboard with data visualization and filtering capabilities.",
//     image: "/projects/project2.png",
//     tags: ["TypeScript", "D3.js", "Next.js"],
//     demoUrl: "#",
//     githubUrl: "#",
//   },
//   {
//     id: 3,
//     title: "E-commerce Platform",
//     description:
//       "Full-featured e-commerce platform with user authentication and payment processing.",
//     image: "/projects/project3.png",
//     tags: ["React", "Node.js", "Stripe"],
//     demoUrl: "#",
//     githubUrl: "#",
//   },

// ];

export const ProjectsSection = () => {
  const { db, setDb } = useDbContextValue();

  const [rows, setRows] = useState<any[]>([]);
  const [isCreatProjectClicked, setISCreateProjectClicked] = useState(false);

  const [titleInput, setTitleInput] = useState<string>("");
  const [desriptionInput, setDescriptionInput] = useState<string>("");
  const [codeUrlInput, setCodeUrlInput] = useState<string>("");
  const [demoUrlInput, setDemoUrlInput] = useState<string>("");
  const [imageBase64Input, setImageBase64Input] = useState<string>("");
  const [projects, setProjects] = useState<DbService.Project[]>([]);

  const [toggleDataInserted, setToggleDataInserted] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleInput(event.target.value); // update state with input value
  };
  const handleChangeDescription = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionInput(event.target.value); // update state with input value
  };

  const handleChangeCodeUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCodeUrlInput(event.target.value); // update state with input value
  };

  const handleChangeDemoUrl = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDemoUrlInput(event.target.value); // update state with input value
  };

  const handleChangeImageBase64 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setImageBase64Input(event.target.value); // update state with input value
  };

  const handleCriarProjectAndDownload = async () => {
    if (!db) return;
    DbService.addProjectToDB(db, {
      title: titleInput,
      description: desriptionInput,
      code_url: codeUrlInput,
      demo_url: demoUrlInput,
      image_base64: imageBase64Input,
    });
    setDb(
      Object.create(
        Object.getPrototypeOf(db),
        Object.getOwnPropertyDescriptors(db)
      )
    );
    handleDownload(db);
  };

  const handleCreateProject = async () => {
    if (!db) return;
    const newDb = DbService.addProjectToDB(db, {
      title: titleInput,
      description: desriptionInput,
      code_url: codeUrlInput,
      demo_url: demoUrlInput,
      image_base64: imageBase64Input,
    });
    setDb(newDb);
    setTitleInput("");
    setDescriptionInput("");
    setCodeUrlInput("");
    setDemoUrlInput("");
    setImageBase64Input("");
    setToggleDataInserted(!toggleDataInserted);
    setISCreateProjectClicked(false);
  };

  const handleDownload = (db: Database) => {
    setISCreateProjectClicked(false);
    return DbService.downloadDb(db);
  };

  const handleDeleteProject = (id: number) => {
    if (!db) return;
    setDb(DbService.deleteProject(db, id));
    setToggleDataInserted(!toggleDataInserted);
  };

  useEffect(() => {
    if (db) {
      DbService.getAllProjects(db).then(setProjects);
    }
  }, [db, toggleDataInserted]);

  useEffect(() => {
    loadDatabase().then(setDb);
  }, []);

  function isPageLocal() {
    if (window.location.hostname === "localhost") {
      return true; //neter aqui a false se nao quiser editar
    } else return false;
  }

  if (!db) return <div>Loading database...</div>;

  return (
    <section
      id="projects"
      style={{
        paddingTop: "6rem",
        paddingBottom: "6rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        position: "relative",
      }}
    >
      <Container style={{ maxWidth: "960px" }}>
        <h2
          style={{
            fontSize: "2.25rem",
            fontWeight: "700",
            marginBottom: "1rem",
            textAlign: "center",
          }}
        >
          Featured <span style={{ color: "rgb(238, 68, 187)" }}>Projects</span>
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#6c757d", // muted text color bootstrap
            marginBottom: "3rem",
            maxWidth: "640px",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        {isPageLocal() && (
          <div style={{ marginBottom: "70px" }}>
            {isCreatProjectClicked && (
              <Card style={{ height: "600px" }}>
                <label>
                  Title:
                  <input
                    type="text"
                    value={titleInput}
                    onChange={handleChangeTitle}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={desriptionInput}
                    onChange={handleChangeDescription}
                  />
                </label>
                <label>
                  ImageBase64:
                  <input
                    type="text"
                    value={imageBase64Input}
                    onChange={handleChangeImageBase64}
                  />
                </label>
                <label>
                  Demo URL:
                  <input
                    type="text"
                    value={demoUrlInput}
                    onChange={handleChangeDemoUrl}
                  />
                </label>
                <label>
                  Code URL:
                  <input
                    type="text"
                    value={codeUrlInput}
                    onChange={handleChangeCodeUrl}
                  />
                </label>
                <Row style={{ marginBottom: "2px" }}>
                  <Button
                    variant="primary"
                    onClick={handleCreateProject}
                    style={{
                      width: "50%",
                      maxWidth: "fit-content",
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "5px",
                      marginTop: "5px",
                    }}
                  >
                    Create project
                  </Button>

                  <Button
                    variant="danger"
                    style={{
                      marginLeft: "auto",
                      marginRight: "auto",
                      marginBottom: "5px",
                      marginTop: "5px",
                      width: "50%",
                      maxWidth: "fit-content",
                    }}
                    onClick={() => {
                      setISCreateProjectClicked(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Row>

                <Row xs={1} md={2} lg={3} className="g-4">
                  <Col style={{ marginLeft: "auto", marginRight: "auto" }}>
                    <ProjectCard
                      code_url={codeUrlInput}
                      demo_url={demoUrlInput}
                      description={desriptionInput}
                      image_base64={
                        imageBase64Input === "" ? undefined : imageBase64Input
                      }
                      title={titleInput}
                    />
                  </Col>
                </Row>
              </Card>
            )}
            {!isCreatProjectClicked && (
              <>
                {" "}
                <Button
                  variant="success"
                  style={{ marginTop: "10px", marginRight: "10px" }}
                  onClick={() => {
                    setISCreateProjectClicked(true);
                  }}
                >
                  Add Project
                </Button>
                <Button
                  variant="primary"
                  style={{ marginTop: "10px" }}
                  onClick={() => {
                    setISCreateProjectClicked(true);
                    handleDownload(db);
                  }}
                >
                  Download database
                </Button>
              </>
            )}
          </div>
        )}

        <Row xs={1} md={2} lg={3} className="g-4">
          {projects?.map((project) => (
            <Col key={project.id}>
              <ProjectCard
                code_url={project.code_url}
                demo_url={project.demo_url}
                description={project.description}
                image_base64={
                  project.image_base64 === "" ? undefined : project.image_base64
                }
                title={project.title}
              />
              {isPageLocal() && (
                <Button
                  variant="danger"
                  onClick={() => {
                    handleDeleteProject(project.id);
                  }}
                >
                  DELETE
                </Button>
              )}
            </Col>
          ))}
        </Row>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <Button
            href="https://github.com/beatrizralves"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              paddingLeft: "1.5rem",
              paddingRight: "1.5rem",
              borderRadius: "9999px",
              backgroundColor: "rgb(238, 68, 187)",
              borderColor: "rgb(238, 68, 187)",
              fontWeight: "500",
              fontSize: "1rem",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 0 10px rgb(238, 68, 187)";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Check My Github <ArrowRight size={16} />
          </Button>
        </div>
      </Container>
    </section>
  );
};
