// Importa as dependências do React e os componentes necessários
import React, { useState } from 'react';
import ProdutoForm from './components/ProdutoForm';
import CategoriaForm from './components/CategoriaForm';
import PesquisaProdutos from './components/PesquisaProdutos';
import FornecedorForm from './components/FornecedorForm';
import "./butao.css"; // Importa o estilo dos botões

function App() {
  // Estado para controlar a página atual sendo exibida
  const [paginaAtual, setPaginaAtual] = useState('produtos');

  // Função para alternar entre o cadastro de produtos, categorias e pesquisa
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'produtos':
        return <ProdutoForm />; // Renderiza o formulário de produtos
      case 'categorias':
        return <CategoriaForm />; // Renderiza o formulário de categorias
      case 'pesquisa':
        return <PesquisaProdutos />; // Renderiza a pesquisa de produtos
      case 'fornecedor':
        return <FornecedorForm />; // Renderiza o formulário de fornecedores
      default:
        return null; // Retorna nulo se não corresponder a nenhuma página
    }
  };

  return (
    <div className="App">
      <h1>Cadastro de Produtos e Categorias</h1>
      {/* Menu de navegação */}
      <nav>
        <button onClick={() => setPaginaAtual('produtos')}>Cadastrar Produto</button>
        <button onClick={() => setPaginaAtual('fornecedor')}>Cadastrar Fornecedor</button>
        <button onClick={() => setPaginaAtual('categorias')}>Cadastrar Categoria</button>
        <button onClick={() => setPaginaAtual('pesquisa')}>Pesquisar Produtos</button>
      </nav>
      {/* Renderiza o conteúdo de acordo com a página atual */}
      {renderizarPagina()}
    </div>
  );
}

export default App;
