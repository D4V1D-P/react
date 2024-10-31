import React, { useState, useEffect } from 'react';
import api from '../services/api';


function ProdutoForm() {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [custo, setCusto] = useState('');
  const [markup, setMarkup] = useState('');
  const [preco, setPreco] = useState('');
  const [mostrarGravar, setMostrarGravar] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [categoria, setCategoria] = useState('');

  // Carregar as categorias do backend ao montar o componente
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await api.get('/categorias');
        setCategorias(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias:', error);
      }
    }
    fetchCategorias();
  }, []);

  // Função para calcular o preço de venda
  const calcularPreco = () => {
    const precoCalculado = parseFloat(custo) * (1 + parseFloat(markup) / 100);
    setPreco(precoCalculado.toFixed(2));
    setMostrarGravar(true); // Exibe o botão "Gravar" após o cálculo
  };

  // Função para gravar o produto no banco de dados
  const gravarProduto = async (e) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      descricao,
      custo: parseFloat(custo),
      markup: parseFloat(markup),
      preco: parseFloat(preco),
      id_categoria: parseInt(categoria)
    };

    try {
      await api.post('/produtos', novoProduto);
      alert('Produto cadastrado com sucesso!');
      // Limpar o formulário após o envio
      setNome('');
      setDescricao('');
      setCusto('');
      setMarkup('');
      setPreco('');
      setCategoria('');
      setMostrarGravar(false);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
    }
  };

  return (
    <form onSubmit={gravarProduto}>
      <div className='bd'>
        <label>Nome do Produto:</label>
        <input
        placeholder='Nome do Produto'
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
        placeholder='Descricao do Produto'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <div>
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nome}
            </option>
          ))}
        </select>
      </div>
      <div className='bd flex-item'>
        <label>Custo (R$):</label>
        <input
        placeholder='Digite o custo do Produto'
          type="number"
          value={custo}
          onChange={(e) => setCusto(e.target.value)}
          required
        />
      </div>
      <div className='bd flex-item'>
        <label>Markup (%):</label>
        <input
        placeholder='Percentual de Lucro'
        className='campo'
          type="number"
          value={markup}
          onChange={(e) => setMarkup(e.target.value)}
          required
        />
      </div>
      <div>
        <button type="button" onClick={calcularPreco}>
          Calcular Preço de Venda
        </button>
      </div>
      {preco && (
        <div>
          <p>Preço de Venda Calculado: R$ {preco}</p>
        </div>
      )}
      {mostrarGravar && (
        <button type="submit">Gravar Produto</button>
      )}
    </form>
  );
}

export default ProdutoForm;
