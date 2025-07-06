import { ExternalLink, Github } from "lucide-react";
import React from "react";
import { Card } from "react-bootstrap";

interface ProjectCardProps {
  title?: string;
  image_base64?: string;
  description?: string;
  demo_url?: string;
  code_url?: string;
}
const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image_base64,
  description,
  demo_url,
  code_url,
}) => {
  return (
    <Card
      style={{
        borderRadius: "0.5rem",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.02)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow =
          "0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)";
      }}
    >
      <div
        style={{
          height: "192px",
          overflow: "hidden",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        <Card.Img
          variant="top"
          src={image_base64}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
          }}
        />
      </div>
      <Card.Body>
        <div
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {/* {tags.map((tag, i) => (
                      <Badge
                        key={i}
                        bg="secondary"
                        style={{
                          fontSize: "0.7rem",
                          fontWeight: "600",
                          padding: "0.25em 0.6em",
                          borderRadius: "9999px",
                          color: "white",
                        }}
                      >
                        {tag}
                      </Badge>
                    ))} */}
        </div>
        <Card.Title
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "0.25rem",
          }}
        >
          {title}
        </Card.Title>
        <Card.Text
          style={{
            color: "#6c757d",
            fontSize: "0.875rem",
            marginBottom: "1rem",
          }}
        >
          {description}
        </Card.Text>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "1rem",
          }}
        >
          <a
            href={demo_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(33,37,41,0.8)",
              transition: "color 0.3s",
              display: "inline-flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7c3aed")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(33,37,41,0.8)")
            }
          >
            <ExternalLink size={20} />
          </a>
          <a
            href={code_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "rgba(33,37,41,0.8)",
              transition: "color 0.3s",
              display: "inline-flex",
              alignItems: "center",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#7c3aed")}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(33,37,41,0.8)")
            }
          >
            <Github size={20} />
          </a>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
