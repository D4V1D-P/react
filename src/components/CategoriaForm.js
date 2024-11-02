// Importa as dependências do React e a API
import React, { useState } from 'react';
import api from '../services/api';

function CategoriaForm() {
  // Estado para armazenar o nome da categoria
  const [nome, setNome] = useState('');

  // Função para gravar uma nova categoria
  const gravarCategoria = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    const novaCategoria = { nome }; // Cria um objeto com o nome da categoria

    try {
      // Envia uma requisição POST para a API para criar a nova categoria
      await api.post('/categorias', novaCategoria);
      alert('Categoria cadastrada com sucesso!'); // Alerta de sucesso
      setNome(''); // Limpa o campo após o envio
    } catch (error) {
      // Trata erros que podem ocorrer durante a requisição
      console.error('Erro ao cadastrar categoria:', error);
    }
  };

  return (
    <form onSubmit={gravarCategoria}>
      <div>
        <label>Nome da Categoria:</label>
        <input
          placeholder='Digite uma Nova Categoria' // Placeholder para o campo de entrada
          type="text"
          value={nome} // Valor controlado pelo estado
          onChange={(e) => setNome(e.target.value)} // Atualiza o estado com o valor do input
          required // Campo obrigatório
        />
      </div>
      <button type="submit">Cadastrar</button> {/* Botão para enviar o formulário */}
    </form>
  );
}

export default CategoriaForm; // Exporta o componente para uso em outras partes da aplicação
