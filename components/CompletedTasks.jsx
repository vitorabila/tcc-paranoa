
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const CompletedTasksContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const TaskItem = styled.div`
  background-color: #d4edda;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 80%;
`;

const CompletedTasks = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    // A lógica para buscar tarefas concluídas pode ser implementada aqui.
    // Exemplo estático de tarefas concluídas:
    setCompletedTasks([
      { id: 1, task: "Fase 1 - Planejamento Concluída" },
      { id: 2, task: "Fase 2 - Desenvolvimento Concluída" },
    ]);
  }, []);

  return (
    <CompletedTasksContainer>
      <h1>Tarefas Concluídas</h1>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => (
          <TaskItem key={task.id}>{task.task}</TaskItem>
        ))
      ) : (
        <p>Nenhuma tarefa concluída ainda.</p>
      )}
    </CompletedTasksContainer>
  );
};

export default CompletedTasks;
