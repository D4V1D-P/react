import React, { useState } from 'react';
import ProdutoForm from './components/ProdutoForm';
import CategoriaForm from './components/CategoriaForm';
import PesquisaProdutos from './components/PesquisaProdutos';
import FornecedorForm from './components/FornecedorForm';
import "./butao.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState('produtos');

  // Função para alternar entre o cadastro de produtos, categorias e pesquisa
  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'produtos':
        return <ProdutoForm />;
      case 'categorias':
        return <CategoriaForm />;
      case 'pesquisa':
        return <PesquisaProdutos />;
      case 'fornecedor':
        return <FornecedorForm />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1>Cadastro de Produtos e Categorias</h1>
      {/* Menu de navegação */}
      <nav>
        <button onClick={() => setPaginaAtual('produtos')}>Cadastrar Produto</button>
        <button onClick={() => setPaginaAtual('categorias')}>Cadastrar Categoria</button>
        <button onClick={() => setPaginaAtual('pesquisa')}>Pesquisar Produtos</button>
        <button onClick={() => setPaginaAtual('fornecedor')}>Pesquisar fornecedor</button>
      </nav>
      {/* Renderizar o conteúdo de acordo com a página atual */}
      {renderizarPagina()}
    </div>
  );
}

export default App;
