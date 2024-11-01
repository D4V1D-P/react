import React, { useState } from 'react';
import api from '../services/api';

function FornecedorForm() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [data_cadastro, setData_Cadastro] = useState('');
  const [mostrarGravar, setMostrarGravar] = useState(false);

  // Função para gravar o fornecedor no banco de dados
  const gravarFornecedor = async (e) => {
    e.preventDefault();

    const novoFornecedor = {
      nome,
      cnpj,
      endereco,
      telefone,
      email,
      data_cadastro,
    };

    try {
      await api.post('/fornecedor', novoFornecedor);
      alert('Fornecedor cadastrado com sucesso!');
      // Limpar o formulário após o envio
      setNome('');
      setCnpj('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setData_Cadastro('');
      setMostrarGravar(false);
    } catch (error) {
      console.error('Erro ao cadastrar fornecedor:', error);
    }
  };

  return (
    <form onSubmit={gravarFornecedor}>
      <div>
        <label>Nome do Fornecedor:</label>
        <input
          placeholder='Nome do Fornecedor'
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>CNPJ:</label>
        <input
          placeholder='CNPJ do Fornecedor'
          type="text"
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Endereço:</label>
        <input
          placeholder='Digite o Endereço'
          type="text"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          placeholder='Digite o Telefone'
          type="text"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          placeholder='Digite o Email'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Data de Cadastro:</label>
        <input
          type="date"
          value={data_cadastro}
          onChange={(e) => setData_Cadastro(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="button" onClick={() => setMostrarGravar(true)}>
          Mostrar Botão Gravar
        </button>
      </div>
      {mostrarGravar && (
        <button type="submit">Gravar Fornecedor</button>
      )}
    </form>
  );
}

export default FornecedorForm;
