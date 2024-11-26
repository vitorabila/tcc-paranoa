import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

// Estilos
const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color: #f9f9f9;
  height: 100vh;
  width: 100vw;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
`;

const Title = styled.h1`
  color: #012980;
  text-align: center;
`;

const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

const ItemContainer = styled.div`
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${(props) =>
    props.completed &&
    `
    background-color: #d4edda;
    border-color: #c3e6cb;
  `}
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  color: #555;
`;

const CompleteButton = styled.button`
  padding: 8px 15px;
  background-color: ${(props) => (props.completed ? "#28a745" : "#007bff")};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.completed ? "#218838" : "#0056b3")};
  }
`;

const PhaseDetails = () => {
  const navigate = useNavigate();
  const { phaseId } = useParams(); // Acessa o nome da fase da URL
  const [phase, setPhase] = useState([]);
  const [completedSteps, setCompletedSteps] = useState(() => {
    // Carrega as etapas concluídas do localStorage
    return JSON.parse(localStorage.getItem("completedSteps")) || {};
  });

  // Dados das fases
  const phases = {
    "fase-1-planejamento": ["Liberação de Vendas", "Solicitação de SAV"],
    "fase-2-projeto-e-desenvolvimento-do-produto": [
      "FMEA de Produto (DFMEA)",
      "Elaboração dos Desenhos de Componentes",
    ],
  };

  useEffect(() => {
    const selectedPhase = phases[phaseId];
    setPhase(selectedPhase || []);
  }, [phaseId]);

  const handleCompleteStep = (step) => {
    // Evitar duplicação de etapas concluídas
    if (!isStepCompleted(step)) {
      const updatedCompletedSteps = {
        ...completedSteps,
        [phaseId]: [...(completedSteps[phaseId] || []), step],
      };
      setCompletedSteps(updatedCompletedSteps);
      localStorage.setItem("completedSteps", JSON.stringify(updatedCompletedSteps));
    }
  };

  const isStepCompleted = (step) => {
    return completedSteps[phaseId]?.includes(step);
  };

  return (
    <DetailsContainer>
      <ContentWrapper>
        <BackButton onClick={() => navigate("/Dashboard")}>Voltar para Dashboard</BackButton>
        <Title>{phase ? phaseId : "Fase Não Encontrada"}</Title>

        {phase.length > 0 ? (
          phase.map((item, index) => (
            <ItemContainer key={index} completed={isStepCompleted(item)}>
              <ItemTitle>{item}</ItemTitle>
              <CompleteButton
                completed={isStepCompleted(item)}
                onClick={() => handleCompleteStep(item)}
                disabled={isStepCompleted(item)}
              >
                {isStepCompleted(item) ? "Concluído" : "Marcar como concluído"}
              </CompleteButton>
            </ItemContainer>
          ))
        ) : (
          <p>Fase não encontrada.</p>
        )}
      </ContentWrapper>
    </DetailsContainer>
  );
};

export default PhaseDetails;
