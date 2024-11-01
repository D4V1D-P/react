
import React, { useState, useEffect } from 'react';
import api from '../services/api.js';

function PesquisaProdutos() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');
  const [nomePesquisa, setNomePesquisa] = useState('');

  // Buscar todos os produtos e categorias ao montar o componente
  useEffect(() => {
    async function fetchDados() {
      try {
        const responseProdutos = await api.get('/produtos');
        const responseCategorias = await api.get('/categorias');
        setProdutos(responseProdutos.data);
        setCategorias(responseCategorias.data);
      } catch (error) {
        console.error('Erro ao buscar produtos ou categorias:', error);
      }
    }
    fetchDados();
  }, []);

  // Função para filtrar produtos por nome e categoria
  const filtrarProdutos = () => {
    let produtosFiltrados = produtos;

    // Filtra por nome, se houver algo digitado
    if (nomePesquisa) {
      produtosFiltrados = produtosFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(nomePesquisa.toLowerCase())
      );
    }

    // Filtra por categoria, se houver uma selecionada
    if (categoriaSelecionada) {
      produtosFiltrados = produtosFiltrados.filter(
        produto => produto.id_categoria === parseInt(categoriaSelecionada)
      );
    }

    return produtosFiltrados;
  };

  // Função para gerar e baixar o CSV
  const exportarCSV = () => {
    const produtosFiltrados = filtrarProdutos();
    const csvRows = [];

    // Adicionar o cabeçalho do CSV
    csvRows.push(['Nome do Produto', 'Preço de Venda']);

    // Adicionar os dados dos produtos
    produtosFiltrados.forEach((produto) => {
      csvRows.push([produto.nome, `R$ ${produto.preco}`]);
    });

    // Converter os dados em string CSV
    const csvContent = csvRows.map(e => e.join(',')).join('\n');

    // Criar um arquivo blob com os dados CSV
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'produtos.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div>
      <h2>Pesquisa de Produtos</h2>

      {/* Campo de pesquisa por nome */}
      <div>
        <label htmlFor="nomePesquisa">Pesquisar por Nome:</label>
        <input
        placeholder='Nome do Produto'
          type="text"
          id="nomePesquisa"
          value={nomePesquisa}
          onChange={(e) => setNomePesquisa(e.target.value)}
        />
      </div>

      {/* Filtro por Categoria */}
      <div>
        <label htmlFor="categoria">Filtrar por Categoria:</label>
        <select
          id="categoria"
          value={categoriaSelecionada}
          onChange={(e) => setCategoriaSelecionada(e.target.value)}
        >
          <option value="">Todas as Categorias</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome}
            </option>
          ))}
        </select>
      </div>

      {/* Botão para exportar os dados filtrados para CSV */}
      <button onClick={exportarCSV}>Exportar para CSV</button>

      {/* Exibir os produtos em uma tabela */}
      <table border="1" cellPadding="5" cellSpacing="0">
        <thead>
          <tr>
            <th>Nome do Produto</th>
            <th>Preço de Venda</th>
          </tr>
        </thead>
        <tbody>
          {filtrarProdutos().map((produto) => (
            <tr key={produto.id}>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PesquisaProdutos;