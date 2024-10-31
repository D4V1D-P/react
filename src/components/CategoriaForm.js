import React, { useState } from 'react';
import api from '../services/api';

function CategoriaForm() {
  const [nome, setNome] = useState('');

  // Função para gravar uma nova categoria
  const gravarCategoria = async (e) => {
    e.preventDefault();

    const novaCategoria = { nome };

    try {
      await api.post('/categorias', novaCategoria);
      alert('Categoria cadastrada com sucesso!');
      setNome('');  // Limpar o campo após o envio
    } catch (error) {
      console.error('Erro ao cadastrar categoria:', error);
    }
  };

  return (
    <form onSubmit={gravarCategoria}>
      <div>
        <label>Nome da Categoria:</label>
        <input
        placeholder='Digite uma Nova Categoria'
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CategoriaForm;
