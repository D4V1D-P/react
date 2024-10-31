import React, { useState } from 'react';
import ProdutoForm from './components/ProdutoForm';
import CategoriaForm from './components/CategoriaForm';
import PesquisaProdutos from './components/PesquisaProdutos';
import "./butao.css";

function App() {
  const [paginaAtual, setPaginaAtual] = useState('produtos');

  // Função para alternar entre o cadastro de produtos, categorias e pesquisa
  const renderizarPagina = () => {
    if (paginaAtual === 'produtos') {
      return <ProdutoForm />;
    } else if (paginaAtual === 'categorias') {
      return <CategoriaForm />;
    } else if (paginaAtual === 'pesquisa') {
      return <PesquisaProdutos />;
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
      </nav>
      {/* Renderizar o conteúdo de acordo com a página atual */}
      {renderizarPagina()}
    </div>
  );
}

export default App;
