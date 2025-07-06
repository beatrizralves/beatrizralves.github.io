import { useEffect, useState, CSSProperties } from "react";
import {
  ThemeTypeEnum,
  useThemeContextValue,
} from "../Context/useThemeContext";

type Star = {
  id: number;
  size: number;
  x: number;
  y: number;
  opacity: number;
  animationDuration: number;
};

type Meteor = {
  id: number;
  size: number;
  x: number;
  y: number;
  delay: number;
  animationDuration: number;
};

export const StarBackground = () => {
  const [stars, setStars] = useState<Star[]>([]);
  const [meteors, setMeteors] = useState<Meteor[]>([]);
  const { theme, setTheme } = useThemeContextValue();

  useEffect(() => {
    generateStars();
    generateMeteors();

    const handleResize = () => {
      generateStars();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const generateStars = () => {
    const numberOfStars = Math.floor(
      (window.innerWidth * window.innerHeight) / 10000
    );

    const newStars: Star[] = [];

    for (let i = 0; i < numberOfStars; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1,
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.5 + 0.5,
        animationDuration: Math.random() * 4 + 2,
      });
    }

    setStars(newStars);
  };

  const generateMeteors = () => {
    const numberOfMeteors = 4;
    const newMeteors: Meteor[] = [];

    for (let i = 0; i < numberOfMeteors; i++) {
      newMeteors.push({
        id: i,
        size: Math.random() * 2 + 1,
        x: Math.random() * 100,
        y: Math.random() * 20,
        delay: Math.random() * 5,
        animationDuration: Math.random() * 3 + 3,
      });
    }

    setMeteors(newMeteors);
  };

  const starStyle = (star: Star): CSSProperties => ({
    position: "absolute",
    borderRadius: "50%",
    backgroundColor: "white",
    boxShadow:
      theme === ThemeTypeEnum.dark
        ? "0 0 10px 2px rgb(255, 217, 0)"
        : "0 0 10px 2px transparent",
    width: `${star.size}px`,
    height: `${star.size}px`,
    left: `${star.x}%`,
    top: `${star.y}%`,
    opacity: star.opacity,
    animation: `pulse-subtle ${star.animationDuration}s ease-in-out infinite`,
  });

  const meteorStyle = (meteor: Meteor): CSSProperties => ({
    position: "absolute",
    background: "linear-gradient(to right, white, white, transparent)",
    borderRadius: "9999px",
    boxShadow:
      theme === ThemeTypeEnum.dark
        ? "0 0 10px 5px rgba(255, 255, 255, 0.2)"
        : "0 0 10px 2px transparent",
    width: `${meteor.size * 50}px`,
    height: `${meteor.size * 2}px`,
    left: `${meteor.x}%`,
    top: `${meteor.y}%`,
    animation: `meteor ${meteor.animationDuration}s linear ${meteor.delay}s infinite`,
    transform: "rotate(215deg)",
  });

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        {stars.map((star) => (
          <div key={star.id} style={starStyle(star)} />
        ))}
        {meteors.map((meteor) => (
          <div key={meteor.id} style={meteorStyle(meteor)} />
        ))}
      </div>

      <style>
        {`
          @keyframes pulse-subtle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }

          @keyframes meteor {
            0% {
              transform: rotate(215deg) translateX(0);
              opacity: 1;
            }
            70% {
              opacity: 1;
            }
            100% {
              transform: rotate(215deg) translateX(-500px);
              opacity: 0;
            }
          }
        `}
      </style>
    </>
  );
};
