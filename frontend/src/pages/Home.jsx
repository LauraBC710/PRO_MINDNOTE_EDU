import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <div className="overlay">
        <h1>Bienvenid@ a MindNote.EDU</h1>
        <p>Tus ideas, tus notas, tu clase.</p>
      </div>
    </div>
  );
}

export default Home;
