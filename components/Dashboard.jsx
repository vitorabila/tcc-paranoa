  import React, { useState, useEffect, useRef } from "react";
  import styled from "styled-components";
  import axios from "axios";
  import { useNavigate } from "react-router-dom";

  // Função para formatar datas no padrão brasileiro (dd/mm/yyyy)
  const formatDate = (date) => {
    const d = new Date(date);
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const DashboardContainer = styled.div`
    display: flex;
    font-family: Arial, sans-serif;
    height: 100vh;
    width: 100%;
    background-color: #f9f9f9;
  `;

  const ContentContainer = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  `;

  const MenuContainer = styled.div`
    width: 250px;
    background-color: #012980;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  `;

  const MenuTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 30px;
    text-align: center;
  `;

  const MenuItem = styled.button`
    background-color: transparent;
    color: white;
    border: none;
    font-size: 1.2rem;
    padding: 10px 20px;
    margin: 10px 0;
    text-align: left;
    cursor: pointer;
    width: 100%;
    border-radius: 8px;

    &:hover {
      background-color: #66ccff;
      color: black;
    }
  `;

  const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;

  const Label = styled.label`
    margin-bottom: 5px;
    font-weight: bold;
  `;

  const Input = styled.input`
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  `;

  const Select = styled.select`
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 100%;
  `;

  const ErrorText = styled.p`
    color: red;
    font-size: 12px;
    margin-bottom: 10px;
  `;

  const DatabaseContainer = styled.div`
    flex: 1;
    background-color: #f3f3f3;
    display: flex;
    flex-direction: column;
    padding: 20px;
    overflow-y: auto;
    width: 113%;
  `;

  const DatabaseTitle = styled.h3`
    font-size: 1.5rem;
    margin-bottom: 20px;
  `;

  const ActionsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;

  const DatabaseTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  `;

  const TableHeader = styled.th`
    padding: 10px;
    background-color: #007bff;
    color: white;
    text-align: left;
  `;

  const TableRow = styled.tr`
    &:nth-child(even) {
      background-color: #f9f9f9;
    }

    cursor: pointer;
  `;

  const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
  `;

  const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  `;

  const CloseButton = styled(Button)`
    background-color: #ff4d4d;
    margin-top: 10px;

    &:hover {
      background-color: #cc0000;
    }
  `;

  // Barra de pesquisa
  const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    width: 60%;
    margin-right: 10px;
  `;

  const SearchInput = styled.input`
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  `;

  const Dashboard = ({ onLogout }) => {
    const [projects, setProjects] = useState([]);
    const [filteredProjects, setFilteredProjects] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [formData, setFormData] = useState({
      nome: "",
      abertura: "",
      fechamento: "",
      responsavel: "",
      clientePN: "", // "Part Number do Cliente"
      paranoaPN: "", // "Part Number Paranoá"
      cliente: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedProject, setSelectedProject] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [visibleProjects, setVisibleProjects] = useState(12); // Começa com 12 projetos visíveis

    const containerRef = useRef(null); // Ref para o contêiner de projetos

    const navigate = useNavigate();

    useEffect(() => {
      const fetchProjects = async () => {
        try {
          const response = await axios.get("http://localhost:5000/projects");
          setProjects(response.data);
          setFilteredProjects(response.data);
        } catch (error) {
          console.error("Erro ao buscar projetos:", error);
        }
      };
      fetchProjects();
    }, []);

    const handleSearchChange = (e) => {
      const query = e.target.value.toLowerCase();
      setSearchQuery(query);

      // Filtra os projetos com base no que é digitado na barra de pesquisa
      if (query === "") {
        setFilteredProjects(projects); // Se a pesquisa estiver vazia, exibe todos os projetos
      } else {
        setFilteredProjects(
          projects.filter(
            (project) =>
              project.id.toString().includes(query) ||
              project.nome.toLowerCase().includes(query) ||
              project.clientePN.toLowerCase().includes(query) ||
              project.paranoaPN.toLowerCase().includes(query) ||
              formatDate(project.abertura).includes(query) ||  // Pesquisa pela Data de Início
              formatDate(project.fechamento).includes(query)    // Pesquisa pela Data de Término
          )
        );
      }
    };

    const handleScroll = () => {
      const bottom = containerRef.current.scrollHeight === containerRef.current.scrollTop + containerRef.current.clientHeight;
      if (bottom) {
        setVisibleProjects((prevVisible) => prevVisible + 12); // Carrega mais 12 itens quando o usuário chega ao final
      }
    };

    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
      if (e.target.name === "abertura") {
        setFormData({ ...formData, fechamento: calculateEndDate(e.target.value) });
      }
    };

    const validateForm = () => {
      const { nome, abertura, fechamento, responsavel, clientePN, paranoaPN, cliente } =
        formData;
      if (!nome || !abertura || !fechamento || !responsavel || !clientePN || !paranoaPN || !cliente) {
        setErrorMessage("Todos os campos são obrigatórios.");
        return false;
      }
      const startDate = new Date(abertura);
      const endDate = new Date(fechamento);
      if (endDate <= startDate) {
        setErrorMessage("A Data de Término deve ser pelo menos 3 meses após a Data de Início.");
        return false;
      }
      setErrorMessage("");
      return true;
    };

    const handleSaveOrUpdate = async () => {
      if (!validateForm()) {
        return;
      }

      try {
        if (selectedProject) {
          const response = await axios.put(`http://localhost:5000/projects/${selectedProject.id}`, formData);
          setProjects(
            projects.map((project) =>
              project.id === selectedProject.id ? response.data : project
            )
          );
        } else {
          const response = await axios.post("http://localhost:5000/projects", formData);
          setProjects([...projects, response.data]);  // Atualiza o estado com o novo projeto
          setFilteredProjects([...projects, response.data]);  // Atualiza a lista filtrada de projetos automaticamente
        }

        setFormData({
          nome: "",
          abertura: "",
          fechamento: "",
          responsavel: "",
          clientePN: "",
          paranoaPN: "",
          cliente: "",
        });
        setIsFormOpen(false);
        setSelectedProject(null);
      } catch (error) {
        console.error("Erro ao salvar ou atualizar projeto:", error);
      }
    };

    const handleSelectProject = (project) => {
      setSelectedProject(project);
      setFormData({
        nome: project.nome,
        abertura: project.abertura,
        fechamento: project.fechamento,
        responsavel: project.responsavel,
        clientePN: project.clientePN,
        paranoaPN: project.paranoaPN,
        cliente: project.cliente,
      });
      setIsFormOpen(true);
    };

    const handleCloseForm = () => {
      setIsFormOpen(false);
      setSelectedProject(null);
      setFormData({
        nome: "",
        abertura: "",
        fechamento: "",
        responsavel: "",
        clientePN: "",
        paranoaPN: "",
        cliente: "",
      });
    };

    const handleViewProject = (projectId) => {
      navigate(`/projects/${projectId}`);
    };

    return (
      <DashboardContainer>
        <MenuContainer>
          <MenuTitle>Menu</MenuTitle>
          <MenuItem>Pendências</MenuItem>
          <MenuItem>Entregues</MenuItem>
          <MenuItem onClick={onLogout}>Sair</MenuItem>
        </MenuContainer>

        <ContentContainer>
          <DatabaseContainer
            ref={containerRef}
            onScroll={handleScroll} // Função para detecção do scroll
          >
            <DatabaseTitle>Banco de Dados</DatabaseTitle>
            <ActionsContainer>
              <Button onClick={() => setIsFormOpen(true)}>Novo Projeto</Button>
              <SearchContainer>
                <SearchInput
                  type="text"
                  placeholder="Pesquise por ID, Nome do Projeto, Part Number, Data de Início ou Data de Término"
                  value={searchQuery}
                  onChange={handleSearchChange}  // Chama a função que filtra conforme o valor da barra de pesquisa
                />
              </SearchContainer>
              </ActionsContainer>

            {isFormOpen && (
              <FormContainer>
                <h3>{selectedProject ? "Alterar Projeto" : "Adicionar Projeto"}</h3>
                <Label>Nome do Projeto:</Label>
                <Input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Digite o nome do projeto"
                />
                <Label>Data de Início:</Label>
                <Input
                  type="date"
                  name="abertura"
                  value={formData.abertura}
                  onChange={handleChange}
                />
                <Label>Data de Término:</Label>
                <Input
                  type="date"
                  name="fechamento"
                  value={formData.fechamento}
                  onChange={handleChange}
                />
                <Label>Responsável:</Label>
                <Input
                  type="text"
                  name="responsavel"
                  value={formData.responsavel}
                  onChange={handleChange}
                  placeholder="Responsável pelo projeto"
                />
                <Label>Part Number do Cliente:</Label>
                <Input
                  type="text"
                  name="clientePN"
                  value={formData.clientePN}
                  onChange={handleChange}
                  placeholder="Part Number do Cliente"
                />
                <Label>Part Number Paranoá:</Label>
                <Input
                  type="text"
                  name="paranoaPN"
                  value={formData.paranoaPN}
                  onChange={handleChange}
                  placeholder="Part Number Paranoá"
                />
                <Label>Cliente:</Label>
                <Select
                  name="cliente"
                  value={formData.cliente}
                  onChange={handleChange}
                >
                  <option value="">Selecione um cliente</option>
                  <option value="Tenneco">Tenneco</option>
                  <option value="RENAULT">RENAULT</option>
                  <option value="MBB">MBB</option>
                  <option value="IVECO">IVECO</option>
                  <option value="MITSUBISHI">MITSUBISHI</option>
                  <option value="PSA">PSA</option>
                  <option value="HONDA">HONDA</option>
                  <option value="NAVISTAR">NAVISTAR</option>
                  <option value="SCANIA">SCANIA</option>
                  <option value="INERGY">INERGY</option>
                  <option value="Sriko">Sriko</option>
                  <option value="INDEBRÁS">INDEBRÁS</option>
                  <option value="AGCO">AGCO</option>
                  <option value="AGRALE">AGRALE</option>
                  <option value="TI">TI</option>
                  <option value="Faurecia">Faurecia</option>
                  <option value="VW/MAN">VW/MAN</option>
                  <option value="COOPER">COOPER</option>
                  <option value="Bosal">Bosal</option>
                  <option value="DHB">DHB</option>
                  <option value="METALÚRGICA JARDIM">METALÚRGICA JARDIM</option>
                  <option value="Denso">Denso</option>
                  <option value="IPA">IPA</option>
                  <option value="Marelli">Marelli</option>
                  <option value="Mahlem">Mahlem</option>
                  <option value="TTB">TTB</option>
                  <option value="VOSS">VOSS</option>
                  <option value="METALBAGES">METALBAGES</option>
                  <option value="BENTELER">BENTELER</option>
                  <option value="Valeo">Valeo</option>
                  <option value="DELGA">DELGA</option>
                  <option value="Stellantis">Stellantis</option>
                  <option value="Volvo">Volvo</option>
                  <option value="HPE">HPE</option>
                  <option value="GM">GM</option>
                  <option value="Troller">Troller</option>
                  <option value="DAF">DAF</option>
                </Select>
                {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
                <Button onClick={handleSaveOrUpdate}>
                  {selectedProject ? "Salvar Alterações" : "Salvar Projeto"}
                </Button>
                <CloseButton onClick={handleCloseForm}>Fechar</CloseButton>
              </FormContainer>
            )}

            <DatabaseTable>
              <thead>
                <tr>
                  <TableHeader>ID</TableHeader>
                  <TableHeader>Nome do Projeto</TableHeader>
                  <TableHeader>Data de Início</TableHeader>
                  <TableHeader>Data de Término</TableHeader>
                  <TableHeader>Responsável</TableHeader>
                  <TableHeader>Part Number do Cliente</TableHeader>
                  <TableHeader>Part Number Paranoá</TableHeader>
                  <TableHeader>Cliente</TableHeader>
                  <TableHeader>Ações</TableHeader>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.slice(0, visibleProjects).map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>{project.id}</TableCell>
                    <TableCell>{project.nome}</TableCell>
                    <TableCell>{formatDate(project.abertura)}</TableCell>
                    <TableCell>{formatDate(project.fechamento)}</TableCell>
                    <TableCell>{project.responsavel}</TableCell>
                    <TableCell>{project.clientePN}</TableCell>
                    <TableCell>{project.paranoaPN}</TableCell>
                    <TableCell>{project.cliente}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleSelectProject(project)} style={{ marginRight: "10px" }}>
                        Editar
                      </Button>
                      <Button onClick={() => handleViewProject(project.id)}>
                        Visualizar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </DatabaseTable>
          </DatabaseContainer>
        </ContentContainer>
      </DashboardContainer>
    );
  };

  export default Dashboard;
