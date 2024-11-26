import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  overflow-y: auto;
`;

const ItemContainer = styled.li`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  font-size: 1.1rem;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.completed ? "#d4edda" : "white")}; /* Cor de fundo para etapas concluídas */
`;

const AddFileButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const FileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
`;

const ViewButton = styled.button`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #218838;
  }
`;

const RemoveButton = styled.button`
  padding: 5px 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [showRelatedFiles, setShowRelatedFiles] = useState(false);
  const [phaseItems, setPhaseItems] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({}); // Armazena arquivos por etapa
  const [activeFile, setActiveFile] = useState(null); // Armazena o arquivo ativo a ser visualizado

  const projectId = "project-123"; // Exemplo de código único para o projeto

  // Mapeamento de fases e etapas para um projeto específico
  const phaseFiles = {
    "fase-1-planejamento": [
      "Liberação de Vendas",
      "Solicitação de SAV",
      "Avaliação dos Dados de Entrada",
      "Definição da Equipe Multifuncional",
      "Análise Técnica Inicial",
    ],
    "fase-2-projeto-e-desenvolvimento-do-produto": [
      "FMEA de Produto (DFMEA)",
      "Elaboração dos Desenhos de Componentes",
      "Elaboração do DFM/DFA",
    ],
    // Continue com as fases restantes...
  };

  // Função para exibir as etapas de uma fase
  const handleViewFiles = (phaseId) => {
    setPhaseItems(phaseFiles[phaseId] || []);
    setShowRelatedFiles(true);
  };

  // Função para adicionar um arquivo a uma etapa do projeto específico
  const handleFileUpload = (file, item) => {
    const updatedFiles = {
      ...uploadedFiles,
      [item]: [...(uploadedFiles[item] || []), file.name],
    };
    setUploadedFiles(updatedFiles);

    // Armazenar no localStorage usando o ID do projeto
    const projectFiles = JSON.parse(localStorage.getItem(projectId)) || {};
    projectFiles[item] = updatedFiles[item];
    localStorage.setItem(projectId, JSON.stringify(projectFiles));
  };

  // Função para remover um arquivo de uma etapa do projeto específico
  const handleRemoveFile = (item, index) => {
    const updatedFiles = {
      ...uploadedFiles,
      [item]: uploadedFiles[item].filter((_, i) => i !== index),
    };
    setUploadedFiles(updatedFiles);

    // Atualizar no localStorage
    const projectFiles = JSON.parse(localStorage.getItem(projectId)) || {};
    projectFiles[item] = updatedFiles[item];
    localStorage.setItem(projectId, JSON.stringify(projectFiles));
  };

  // Função para alternar a visibilidade dos itens
  const handleDoubleClick = () => {
    setShowRelatedFiles(false);
  };

  // Função para abrir o arquivo
  const handleViewFile = (file) => {
    setActiveFile(file);
  };

  // Função para fechar o arquivo
  const handleCloseFile = () => {
    setActiveFile(null);
  };

  useEffect(() => {
    // Recuperar arquivos já carregados para o projeto específico do localStorage
    const projectFiles = JSON.parse(localStorage.getItem(projectId)) || {};
    setUploadedFiles(projectFiles);
  }, []);

  return (
    <DetailsContainer>
      <ContentWrapper>
        <BackButton onClick={() => navigate("/Dashboard")}>Voltar para Dashboard</BackButton>
        <Title>Detalhes do Projeto</Title>
        <h2>Fases do Projeto</h2>

        <div>
          {/* Botões para visualizar as fases */}
          <button onClick={() => handleViewFiles("fase-1-planejamento")}>
            Visualizar Fase 1 - Planejamento
          </button>
          <button onClick={() => handleViewFiles("fase-2-projeto-e-desenvolvimento-do-produto")}>
            Visualizar Fase 2 - Projeto e Desenvolvimento do Produto
          </button>
        </div>

        {/* Exibição dos itens relacionados à fase */}
        {showRelatedFiles && (
          <ItemList onDoubleClick={handleDoubleClick}>
            {phaseItems.length > 0 ? (
              phaseItems.map((item, index) => (
                <ItemContainer key={index} completed={uploadedFiles[item]?.length > 0}>
                  <span>{item}</span>

                  {/* Botão único para adicionar arquivos */}
                  <label>
                    <AddFileButton as="span">Adicionar Arquivo</AddFileButton>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={(e) => handleFileUpload(e.target.files[0], item)}
                    />
                  </label>

                  {/* Exibição dos arquivos enviados */}
                  {uploadedFiles[item] && (
                    <div>
                      <p>Arquivos enviados:</p>
                      {uploadedFiles[item].map((file, idx) => (
                        <FileContainer key={idx}>
                          <ViewButton onClick={() => handleViewFile(file)}>
                            {file}
                          </ViewButton>
                          <RemoveButton onClick={() => handleRemoveFile(item, idx)}>
                            Remover
                          </RemoveButton>
                        </FileContainer>
                      ))}
                    </div>
                  )}
                </ItemContainer>
              ))
            ) : (
              <p>Não há itens relacionados para esta fase.</p>
            )}
          </ItemList>
        )}

        {/* Exibição do arquivo ativo, quando o usuário clica para visualizar */}
        {activeFile && (
          <div>
            <h3>Visualizando: {activeFile}</h3>
            <button onClick={handleCloseFile}>Fechar</button>
            <iframe
              src={URL.createObjectURL(new Blob([activeFile]))}
              width="100%"
              height="500px"
              title="Document Viewer"
            />
          </div>
        )}
      </ContentWrapper>
    </DetailsContainer>
  );
};

export default ProjectDetails;
