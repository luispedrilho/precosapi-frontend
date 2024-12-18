import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [precos, setPrecos] = useState(null);
  const [itemData, setItemData] = useState(null); // Para armazenar as informações do primeiro item
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Usando a variável de ambiente REACT_APP_API_URL
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Requisição para o endpoint '/search' para buscar preços
      const response = await axios.get(`${apiUrl}/search`, {
        params: { keyword },
      });
      setPrecos(response.data);

      // Requisição para o novo endpoint '/first-item' para buscar o primeiro item
      const itemResponse = await axios.get(`${apiUrl}/first-item`, {
        params: { keyword },
      });
      setItemData(itemResponse.data); // Salva os dados do primeiro item
    } catch (err) {
      console.error('Erro ao buscar preços ou item: ', err);
      setError('Erro ao buscar dados. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Consulta de Preços</h1>
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Digite o nome do produto"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">
          {loading ? 'Buscando...' : 'Buscar Preços'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* Preço Sugerido */}
      {precos && (
        <div className="suggested-price">
          <p>⭐ Preço sugerido:</p>
          <strong>R$ {precos.suggestedPrice.toFixed(2)}</strong>
        </div>
      )}

      {/* Exibindo as informações do primeiro item */}
      {itemData && (
        <div className="item-info">
          <div className="item-left">
            <img src={itemData.imageUrl} alt={itemData.title} className="item-image" />
            <p>{itemData.title}</p>
            <p>Preço médio: <strong>R$ {itemData.averagePrice.toFixed(2)}</strong></p>
            <p>Vendedor: <strong>{itemData.sellerName}</strong></p>
          </div>
          <div className="price-info">
            <div className="price-card">
              <p>📊 Preço médio:</p>
              <strong>R$ {precos.averagePrice.toFixed(2)}</strong>
            </div>
            <div className="price-card">
              <p>🔻 Preço mais baixo:</p>
              <strong>R$ {precos.lowerPrice.toFixed(2)}</strong>
            </div>
            <div className="price-card">
              <p>🔺 Preço mais alto:</p>
              <strong>R$ {precos.higherPrice.toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
