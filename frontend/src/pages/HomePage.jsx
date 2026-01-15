import { useEffect, useState } from 'react'
import axios from 'axios';
import ProductCard from '../components/ProductCard.jsx'

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');
      setProducts(data);
    }

    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mb-3 md:px-4">
        <h1 className='font-bold text-xl md:text-2xl my-1 text-gray-500 text-center lg:text-left'>Latest Products</h1>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3 w-fit mx-auto'>
            { products.map((product) => <ProductCard product={product} />) }
        </div>
    </div>
  )
}

export default HomePage 