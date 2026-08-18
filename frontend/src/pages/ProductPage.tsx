import { useEffect, useState } from 'react';
import api from '../api/api';
import type{ Product } from '../types/product';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Available Products</h1>

      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: €{product.price}</p>
          <p>Stock: {product.stock}</p>

          <button>Reserve</button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;