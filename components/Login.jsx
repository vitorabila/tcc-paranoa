import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

// Estilização do componente
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: #012980; /* Azul */
  color: #fff;
  text-align: center;
`;

const FormContainer = styled.div`
  width: 400px;
  padding: 40px;
  background-color: #ffff;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    width: 90vw;
    padding: 20px;
    border-radius: 0;
  }
`;

const Input = styled.input`
  width: 95%;
  margin: 10px 0;
  padding: 12px;
  border: none;
  border-radius: 4px;
  background-color: #f0f0f0; /* Tom de cinza claro */
  color: #000;
  font-size: 16px;
  outline: none;

  ::placeholder {
    color: #999; /* Placeholder cinza */
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #66ccff; /* Azul claro */
  color: #000;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #3399ff; /* Azul um pouco mais escuro para o hover */
  }
`;

const ToggleButton = styled(Button)`
  background-color: transparent;
  color: #66ccff; /* Azul claro */
  border: 1px solid #66ccff;
  margin-top: 10px;

  &:hover {
    background-color: #66ccff;
    color: #000;
  }
`;

const Logo = styled.img`
  width: 350px;
  margin-bottom: 20px;
`;

const Title = styled.h2`
  font-weight: normal;
  margin-bottom: 20px;
  color: black; /* Cor preta */
`;

const Login = ({ onLogin }) => {
  const [re, setRe] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('engenharia');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  // Função de Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Verifica as credenciais do usuário
      const response = await axios.get(`http://localhost:5000/users?re=${re}&password=${password}`);
      if (response.data.length > 0) {
        localStorage.setItem('user', JSON.stringify(response.data[0])); // Salva no localStorage
        onLogin(); // Chama a função onLogin passada pelo App.js
        navigate('/dashboard'); // Navega para o Dashboard
      } else {
        alert('Erro ao efetuar Login. RE ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao efetuar Login:', error);
    }
  };

  // Função de Registro
  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validação do RE
    if (!/^\d{6}$/.test(re)) {
      alert('O RE deve conter exatamente 6 números.');
      return;
    }

    try {
      const newUser = { re, password, role };
      await axios.post('http://localhost:5000/users', newUser);
      alert('Usuário registrado com sucesso!');
      setIsSignUp(false); // Volta para a tela de login após o registro
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Logo src="./imagens/logo.png" alt="Logo da Empresa" />
        <Title>{isSignUp ? 'Criar Conta' : 'Faça Login'}</Title>
        <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
          <Input
            type="text"
            value={re}
            onChange={(e) => setRe(e.target.value)}
            placeholder="RE (6 números)"
            required
            maxLength={6}
            pattern="\d{6}" // Apenas 6 dígitos numéricos
            title="O RE deve conter exatamente 6 números."
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            required
          />
          {isSignUp && (
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              style={{
                width: '100%',
                margin: '10px 0',
                padding: '12px',
                borderRadius: '4px',
                backgroundColor: '#f0f0f0',
                color: '#000',
              }}
            >
              <option value="vendas">Vendas</option>
              <option value="engenharia_de_produto">Engenharia de Produto</option>
              <option value="engenharia_de_processo">Engenharia de Processo</option>
              <option value="laboratorio_tecnico">Laboratório/Técnico de Laboratório</option>
              <option value="qualidade_analista">Qualidade/Analista da Qualidade</option>
              <option value="metrologia_analista">Metrologia/Analista de Metrologia</option>
              <option value="logistica_analista">Logística/Analista de Logística</option>
              <option value="compras">Compras</option>
              <option value="ferramentaria_modeladores">Ferramentaria/Modeladores/Ferramenteiros</option>
              <option value="comercial">Comercial</option>
              <option value="sgi">SGI (Sistema de Gestão Integrada)</option>
              <option value="manutencao">Manutenção</option>
              <option value="producao">Produção</option>
              <option value="recursos_humanos">Recursos Humanos (RH)</option>
            </select>
          )}
          <Button type="submit">{isSignUp ? 'Criar Conta' : 'Login'}</Button>
        </form>
        <ToggleButton onClick={() => setIsSignUp(!isSignUp)}>
          {isSignUp ? 'Já possui uma conta? Login' : 'Crie uma conta'}
        </ToggleButton>
      </FormContainer>
    </Container>
  );
};

export default Login;
