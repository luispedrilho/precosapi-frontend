import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [keyword, setKeyword] = useState('');
  const [precos, setPrecos] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Usando a variável de ambiente REACT_APP_API_URL
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get(`${apiUrl}/search`, {
        params: { keyword },
      });
      setPrecos(response.data);
    } catch (err) {
      console.error('Erro ao buscar preços: ', err);
      setError('Erro ao buscar preços. Tente novamente mais tarde.');
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

      {precos && (
        <div className="results">
          <div className="results-row">
            <div className="result-card small-card">
              <p>🔻 Preço mais baixo:</p>
              <strong>R$ {precos.lowerPrice.toFixed(2)}</strong>
              <small>({precos.lowerPriceCount} itens)</small>
            </div>
            <div className="result-card medium-card">
              <p>📊 Preço médio:</p>
              <strong>R$ {precos.averagePrice.toFixed(2)}</strong>
            </div>
            <div className="result-card small-card">
              <p>🔺 Preço mais alto:</p>
              <strong>R$ {precos.higherPrice.toFixed(2)}</strong>
              <small>({precos.higherPriceCount} itens)</small>
            </div>
          </div>
          <div className="result-card large-card">
            <p>⭐ Preço sugerido:</p>
            <strong>R$ {precos.suggestedPrice.toFixed(2)}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
