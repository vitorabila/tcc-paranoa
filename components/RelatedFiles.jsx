import React, { useState } from "react";
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

const FileList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 20px;
  overflow-y: auto;
`;

const FileItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  font-size: 1.1rem;

  span {
    color: #333;
  }
`;

const ViewButton = styled.button`
  padding: 5px 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [showRelatedFiles, setShowRelatedFiles] = useState(false); // Controle do modal de arquivos relacionados
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Arquivos relacionados para cada fase
  const phaseFiles = {
    "fase-1-planejamento": [
      "Liberação de Vendas: Assistente de Vendas",
      "Solicitação de SAV: Assistente de Vendas",
      "Avaliação dos Dados de Entrada: Engenheiro ou Técnico de Produto",
      "Definição da Equipe Multifuncional: Engenheiros/Supervisores",
      "Análise Técnica Inicial: Engenheiro ou Técnico de Produto",
      "Definição de Requisitos do Cliente: Analista do SGI/Atendimento ao Cliente",
      "Reunião de Abertura do APQP: Engenheiro ou Técnico de Produto",
      "Cronograma do APQP: Engenheiro ou Técnico de Produto",
      "Lista Preliminar de Materiais: Engenheiro ou Técnico de Produto",
      "Fluxograma Preliminar: Engenheiro ou Técnico de Produto",
      "Lista de Ferramental: Engenharia de Produto",
      "Layout Preliminar: Engenheiro ou Técnico de Processo",
      "Cadastro do Produto no Banco de Dados: Comercial",
      "Lista de Características Especiais: Engenheiro ou Técnico de Produto",
      "Lições Aprendidas: Engenheiro ou Técnico de Produto",
      "Plano de Teste para Validação do Produto: Técnico do Laboratório",
      "Análise Crítica da Documentação: Engenheiro ou Técnico de Produto",
      "Validação da Fase: Gerente/Supervisor de Engenharia/Qualidade"
    ],
    "fase-2-projeto-e-desenvolvimento-do-produto": [
      "FMEA de Produto (DFMEA): Equipe Multifuncional",
      "Elaboração dos Desenhos de Componentes: Engenheiro ou Técnico de Produto/Projetista",
      "Elaboração do DFM/DFA: Engenheiro ou Técnico de Processo",
      "Controle e Distribuição de Desenhos: Analista do SGI",
      "Definição de Fornecedores: Comprador",
      "Solicitação de Amostras e PPAP: EQF",
      "Acompanhamento de Construção de Ferramental: EQF",
      "Projeto de Ferramentas e Equipamentos: Engenheiro ou Técnico de Produto/Projetista",
      "Validação de Projetos de Ferramentas e Equipamentos: Engenheiro ou Técnico de Processo/Produto",
      "Definição de Fornecedores de Ferramental: Comprador",
      "Estudo Preliminar de Embalagem e Transporte: Engenheiro ou Técnico de Processo/Produto, Analista Logístico",
      "Plano de Controle Protótipo: Engenheiro ou Analista da Qualidade",
      "Folha de Trabalho Padronizado (FTP) Protótipo: Engenheiro ou Técnico de Processo",
      "Projeto de Dispositivos/Ferramentas para Protótipos: Engenheiro ou Técnico de Produto/Projetista",
      "Confecção de Ferramentas/Dispositivos para Protótipos: Modelador/Ferramenteiro",
      "Aprovação de Protótipos: Engenheiro ou Técnico de Processo/Produto",
      "Solicitação de Nota Fiscal de Protótipos: Assistente de Vendas",
      "Envio de Protótipos: Engenheiro ou Técnico de Produto",
      "Avaliação Ambiental e de Segurança: Analista ou Técnico de SGI/Engenharia ou Técnico de Segurança",
      "Validação da Fase: Gerente de Manufatura/Supervisor de Engenharia/Qualidade"
    ],
    // Adicione os arquivos das outras fases aqui...
  };

  // Função para mostrar os arquivos relacionados à fase
  const handleViewFiles = (phaseId) => {
    setSelectedFiles(phaseFiles[phaseId] || []);
    setShowRelatedFiles(true);
  };

  return (
    <DetailsContainer>
      <ContentWrapper>
        <BackButton onClick={() => navigate("/Dashboard")}>Voltar para Dashboard</BackButton>
        <Title>Detalhes do Projeto</Title>
        <h2>Fases do Projeto</h2>

        <div>
          {/* Fases de exemplo, você pode adicionar mais fases aqui */}
          <button onClick={() => handleViewFiles("fase-1-planejamento")}>
            Visualizar Fase 1 - Planejamento
          </button>
          <button onClick={() => handleViewFiles("fase-2-projeto-e-desenvolvimento-do-produto")}>
            Visualizar Fase 2 - Projeto e Desenvolvimento do Produto
          </button>
          {/* Adicione mais botões conforme necessário */}
        </div>

        {/* Exibe os arquivos relacionados quando o botão "Visualizar" é pressionado */}
        {showRelatedFiles && (
          <FileList>
            {selectedFiles.length > 0 ? (
              selectedFiles.map((file, index) => (
                <FileItem key={index}>
                  <span>{file}</span>
                  <ViewButton onClick={() => window.open("#", "_blank")}>Visualizar</ViewButton>
                </FileItem>
              ))
            ) : (
              <p>Não há arquivos relacionados para esta fase.</p>
            )}
          </FileList>
        )}
      </ContentWrapper>
    </DetailsContainer>
  );
};

export default ProjectDetails;
