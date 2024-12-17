import React, { useState } from 'react';

const FormSearch = ({ onSubmit }) => {
  const [keyword, setKeyword] = useState('');
  const [condition, setCondition] = useState('new');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ keyword, condition });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Palavra-chave:</label>
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>
      <div>
        <label>Status do Produto:</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        >
          <option value="new">Novo</option>
          <option value="used">Usado</option>
        </select>
      </div>
      <button type="submit">Pesquisar</button>
    </form>
  );
};

export default FormSearch;
