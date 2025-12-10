import React from 'react';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-lg flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-w-1 aspect-h-1 bg-gray-200 group-hover:opacity-90 transition-opacity h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex-1 p-4 space-y-2 flex flex-col">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">
            {product.name}
          </h3>
          <p className="text-lg font-bold text-primary">${product.price.toFixed(2)}</p>
        </div>
        <p className="text-sm text-gray-500 line-clamp-2 flex-1">{product.description}</p>
        
        <div className="flex items-center mt-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-gray-500">({product.rating})</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-dark hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
