// Importa as dependências do React e a API
import React, { useState, useEffect } from 'react';
import api from '../services/api.js';

function PesquisaProdutos() {
  // Estados para armazenar produtos, categorias e filtros de pesquisa
  const [produtos, setProdutos] = useState([]); // Armazena a lista de produtos
  const [categorias, setCategorias] = useState([]); // Armazena a lista de categorias
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(''); // Categoria selecionada
  const [nomePesquisa, setNomePesquisa] = useState(''); // Nome para pesquisa

  // Buscar todos os produtos e categorias ao montar o componente
  useEffect(() => {
    async function fetchDados() {
      try {
        // Faz requisições para obter produtos e categorias
        const responseProdutos = await api.get('/produtos');
        const responseCategorias = await api.get('/categorias');
        setProdutos(responseProdutos.data); // Atualiza o estado com produtos
        setCategorias(responseCategorias.data); // Atualiza o estado com categorias
      } catch (error) {
        console.error('Erro ao buscar produtos ou categorias:', error); // Trata erros na requisição
      }
    }
    fetchDados(); // Chama a função para buscar os dados
  }, []); // Executa apenas uma vez ao montar o componente

  // Função para filtrar produtos por nome e categoria
  const filtrarProdutos = () => {
    let produtosFiltrados = produtos; // Começa com todos os produtos

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

    return produtosFiltrados; // Retorna os produtos filtrados
  };

  // Função para gerar e baixar o CSV
  const exportarCSV = () => {
    const produtosFiltrados = filtrarProdutos(); // Filtra os produtos para exportação
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
    const url = window.URL.createObjectURL(blob); // Cria um URL para o blob
    const a = document.createElement('a'); // Cria um elemento <a> para download
    a.setAttribute('hidden', ''); // Oculta o elemento
    a.setAttribute('href', url); // Define o href como o URL do blob
    a.setAttribute('download', 'produtos.csv'); // Define o nome do arquivo
    document.body.appendChild(a); // Adiciona o elemento ao DOM
    a.click(); // Simula o clique para iniciar o download
    document.body.removeChild(a); // Remove o elemento do DOM
  };

  return (
    <div>
      <h2>Pesquisa de Produtos</h2>

      {/* Campo de pesquisa por nome */}
      <div>
        <label htmlFor="nomePesquisa">Pesquisar por Nome:</label>
        <input
          placeholder='Nome do Produto' // Placeholder para o campo de entrada
          type="text"
          id="nomePesquisa"
          value={nomePesquisa} // Valor controlado pelo estado
          onChange={(e) => setNomePesquisa(e.target.value)} // Atualiza o estado com o valor do input
        />
      </div>

      {/* Filtro por Categoria */}
      <div>
        <label htmlFor="categoria">Filtrar por Categoria:</label>
        <select
          id="categoria"
          value={categoriaSelecionada} // Valor controlado pelo estado
          onChange={(e) => setCategoriaSelecionada(e.target.value)} // Atualiza o estado com a categoria selecionada
        >
          <option value="">Todas as Categorias</option> {/* Opção para mostrar todas as categorias */}
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nome} {/* Nome da categoria */}
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

export default PesquisaProdutos; // Exporta o componente para uso em outras partes da aplicação
