import { useState, useEffect, useCallback } from 'react'

const debounce = (callback, delay) => {
  let timer;
  return (value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay);
  };
};

function App() {
  const [query, setQuery] = useState('');
  const [suggestion, setSuggestion] = useState([]);

  // Funzione che recupera i prodotti
  const fetchProducts = async (query) => {
    if (!query.trim()) {
      setSuggestion([]);
      return;
    };
    try {
      const res = await fetch(`http://localhost:3333/products?search=${query}`);
      const data = await res.json();
      setSuggestion(data);
    } catch (error) {
      console.error(error);
    };
  };

  const debouncedFetchProducts = useCallback(
    debounce(fetchProducts, 500

    ), [])

  // Eseguo il fetch dei prodotti ogni volta che la query viene modificata
  useEffect(() => {
    debouncedFetchProducts(query);
  }, [query]);

  return (
    <>
      <h1>Title</h1>

      <input
        type="text"
        placeholder='Cerca un prodotto...'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {suggestion.length > 0 && (
        <div className="dropdown">
          {suggestion.map(product => (
            <p key={product.id}>{product.name}</p>
          ))}
        </div>
      )}
    </>
  )
}

export default App
