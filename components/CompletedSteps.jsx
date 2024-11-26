import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CompletedStepsContainer = styled.div`
  padding: 20px;
  background-color: #f9f9f9;
  height: 100vh;
  overflow-y: auto;
`;

const Title = styled.h1`
  color: #012980;
`;

const PhaseSection = styled.div`
  margin-bottom: 20px;
`;

const Step = styled.div`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
`;

const CompletedSteps = () => {
  const [completedSteps, setCompletedSteps] = useState({});

  useEffect(() => {
    // Carrega do localStorage
    const steps = JSON.parse(localStorage.getItem("completedSteps")) || {};
    setCompletedSteps(steps);
  }, []);

  return (
    <CompletedStepsContainer>
      <Title>Etapas Concluídas</Title>
      {Object.keys(completedSteps).map((phase) => (
        <PhaseSection key={phase}>
          <h2>{phase}</h2>
          {completedSteps[phase].map((step, index) => (
            <Step key={index}>{step}</Step>
          ))}
        </PhaseSection>
      ))}
    </CompletedStepsContainer>
  );
};

export default CompletedSteps;
