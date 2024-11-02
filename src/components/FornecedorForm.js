// Importa as dependências do React e a API
import React, { useState } from 'react';
import api from '../services/api';

function FornecedorForm() {
  // Estados para armazenar os dados do fornecedor
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [data_cadastro, setData_Cadastro] = useState('');
  const [mostrarGravar, setMostrarGravar] = useState(false); // Estado para controlar se deve mostrar a opção de gravar

  // Função para gravar o fornecedor no banco de dados
  const gravarFornecedor = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    // Cria um objeto com os dados do novo fornecedor
    const novoFornecedor = {
      nome,
      cnpj,
      endereco,
      telefone,
      email,
      data_cadastro,
    };

    try {
      // Envia uma requisição POST para a API para criar o novo fornecedor
      await api.post('/fornecedor', novoFornecedor);
      alert('Fornecedor cadastrado com sucesso!'); // Alerta de sucesso
      // Limpa os campos do formulário após o envio
      setNome('');
      setCnpj('');
      setEndereco('');
      setTelefone('');
      setEmail('');
      setData_Cadastro('');
      setMostrarGravar(false); // Oculta a opção de gravar
    } catch (error) {
      // Trata erros que podem ocorrer durante a requisição
      console.error('Erro ao cadastrar fornecedor:', error);
    }
  };

  return (
    <form onSubmit={gravarFornecedor}>
      <div>
        <label>Nome do Fornecedor:</label>
        <input
          placeholder='Nome do Fornecedor' // Placeholder para o campo de entrada
          type="text"
          value={nome} // Valor controlado pelo estado
          onChange={(e) => setNome(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <div>
        <label>CNPJ:</label>
        <input
          placeholder='CNPJ do Fornecedor' // Placeholder para o campo de entrada
          type="text"
          value={cnpj} // Valor controlado pelo estado
          onChange={(e) => setCnpj(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <div>
        <label>Endereço:</label>
        <input
          placeholder='Digite o Endereço' // Placeholder para o campo de entrada
          type="text"
          value={endereco} // Valor controlado pelo estado
          onChange={(e) => setEndereco(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <div>
        <label>Telefone:</label>
        <input
          placeholder='Digite o Telefone' // Placeholder para o campo de entrada
          type="text"
          value={telefone} // Valor controlado pelo estado
          onChange={(e) => setTelefone(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          placeholder='Digite o Email' // Placeholder para o campo de entrada
          type="text"
          value={email} // Valor controlado pelo estado
          onChange={(e) => setEmail(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <div>
        <label>Data de Cadastro:</label>
        <input
          type="date"
          value={data_cadastro} // Valor controlado pelo estado
          onChange={(e) => setData_Cadastro(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <div>
        <button type="submit" onClick={() => setMostrarGravar(true)}>
          Gravar Fornecedor
        </button> {/* Botão para enviar o formulário */}
      </div>
    </form>
  );
}

export default FornecedorForm; // Exporta o componente para uso em outras partes da aplicação
