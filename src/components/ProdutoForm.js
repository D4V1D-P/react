import React, { useState, useEffect } from 'react'; // Importa React e hooks
import api from '../services/api'; // Importa a instância da API para requisições

function ProdutoForm() {
  // Estados para armazenar informações do produto
  const [nome, setNome] = useState(''); // Nome do produto
  const [descricao, setDescricao] = useState(''); // Descrição do produto
  const [custo, setCusto] = useState(''); // Custo do produto
  const [markup, setMarkup] = useState(''); // Markup para cálculo do preço
  const [preco, setPreco] = useState(''); // Preço de venda calculado
  const [mostrarGravar, setMostrarGravar] = useState(false); // Controle de exibição do botão "Gravar"
  const [categorias, setCategorias] = useState([]); // Lista de categorias
  const [categoria, setCategoria] = useState(''); // Categoria selecionada
  const [fornecedor, setFornecedor] = useState([]); // Lista de fornecedores
  const [fornecedo, setFornecedo] = useState(''); // Fornecedor selecionado

  // Carregar as categorias do backend ao montar o componente
  useEffect(() => {
    async function fetchCategorias() {
      try {
        const response = await api.get('/categorias'); // Faz a requisição para obter categorias
        setCategorias(response.data); // Atualiza o estado com as categorias
      } catch (error) {
        console.error('Erro ao buscar categorias:', error); // Trata erros na requisição
      }
    }
    fetchCategorias(); // Chama a função para buscar as categorias
  }, []);

  // Carregar os fornecedores do backend ao montar o componente
  useEffect(() => {
    async function fetchFornecedor() {
      try {
        const response = await api.get('/fornecedor'); // Faz a requisição para obter fornecedores
        setFornecedor(response.data); // Atualiza o estado com os fornecedores
      } catch (error) {
        console.error('Erro ao buscar fornecedor:', error); // Trata erros na requisição
      }
    }
    fetchFornecedor(); // Chama a função para buscar os fornecedores
  }, []);

  // Função para calcular o preço de venda
  const calcularPreco = () => {
    const precoCalculado = parseFloat(custo) * (1 + parseFloat(markup) / 100); // Calcula o preço
    setPreco(precoCalculado.toFixed(2)); // Define o preço formatado com duas casas decimais
    setMostrarGravar(true); // Exibe o botão "Gravar" após o cálculo
  };

  // Função para gravar o produto no banco de dados
  const gravarProduto = async (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    const novoProduto = {
      nome,
      descricao,
      custo: parseFloat(custo),
      markup: parseFloat(markup),
      preco: parseFloat(preco),
      id_fornecedo: fornecedo, // ID do fornecedor
      id_categoria: parseInt(categoria) // ID da categoria
    };

    try {
      await api.post('/produtos', novoProduto); // Faz a requisição para gravar o produto
      alert('Produto cadastrado com sucesso!'); // Alerta de sucesso
      // Limpar o formulário após o envio
      setNome('');
      setDescricao('');
      setCusto('');
      setMarkup('');
      setPreco('');
      setCategoria('');
      setFornecedo('');
      setMostrarGravar(false);
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error); // Trata erros na requisição
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
          onChange={(e) => setNome(e.target.value)} // Atualiza o estado com o nome do produto
          required
        />
      </div>
      <div>
        <label>Descrição:</label>
        <textarea
          placeholder='Descrição do Produto'
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)} // Atualiza o estado com a descrição
        />
      </div>
      <div>
        <label>Categoria:</label>
        <select
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)} // Atualiza o estado com a categoria selecionada
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
      <div>
        <label>Fornecedor:</label>
        <select
          value={fornecedo}
          onChange={(e) => setFornecedo(e.target.value)} // Atualiza o estado com o fornecedor selecionado
          required
        >
          <option value="">Selecione um Fornecedor</option>
          {fornecedor.map((forn) => (
            <option key={forn.id} value={forn.id}>
              {forn.nome}
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
          onChange={(e) => setCusto(e.target.value)} // Atualiza o estado com o custo
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
          onChange={(e) => setMarkup(e.target.value)} // Atualiza o estado com o markup
          required
        />
      </div>
      <div>
        <button type="button" onClick={calcularPreco}> {/* Botão para calcular o preço */}
          Calcular Preço de Venda
        </button>
      </div>
      {preco && (
        <div>
          <p>Preço de Venda Calculado: R$ {preco}</p> {/* Exibe o preço calculado */}
        </div>
      )}
      {mostrarGravar && (
        <button type="submit">Gravar Produto</button> // Botão para gravar o produto
      )}
    </form>
  );
}

export default ProdutoForm; // Exporta o componente para uso em outras partes da aplicação
