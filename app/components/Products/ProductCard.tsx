"use client";
import { ArrowRight, Clock, Tag } from 'react-bootstrap-icons';
import { useState } from 'react';
import type { Product } from '@/app/types';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    // show quick loading feedback so the user doesn't think the app travou
    setIsLoading(true);
    if (product.variacoes && product.variacoes.length > 0) {
      // navigate to product page (will unmount this component)
      router.push(`/products/${product.id}`);
      return;
    }

    // add to cart then hide loading shortly after
    addItem(product, 1);
    // keep loading visible briefly so the user perceives feedback
    setTimeout(() => setIsLoading(false), 350);
  };

  return (
    <>
      <div className="py-3 border-b border-primary-00 bg-white transition-all duration-300 overflow-hidden h-full flex">
        {/* Image Placeholder */}
        <div className="h-full w-30 rounded-md relative overflow-hidden">
          <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 flex items-center justify-center w-full h-full">
            {product.imagem ? 
              <Image src={product.imagem} alt={product.nome_produto} width={300} height={300} className="object-cover w-full h-26 rounded-md" /> 
                : 
              <span className="text-6xl">🥤</span>}
          </div>
        </div>

        <div className="pl-3 flex flex-col ml-auto w-[80%] space-y-1">
          {/* Category Badge */}
          
            <h3 className="text-left font-bold text-primary-00 text-lg capitalize mb-0">{product.nome_produto}</h3>
            {/* <span className="px-3 py-1 w-full text-xs font-semibold bg-purple-100 text-purple-700">{product.categoria}</span> */}
          
            {/* Description */}
            <p className="ml-auto text-sm text-gray-600 w-full line-clamp-2">{product.descricao}</p>

          {/* Info Row */}
          {/* <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <Clock size={16} className="text-purple-600" /> {product.tempo_preparo_min} min
            </span>
            {desconto > 0 && (
              <span className="inline-flex items-center gap-1.5 font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md">
                <Tag size={16} /> Cupom
              </span>
            )}
          </div> */}

          {/* Price Section */}
          {/* <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-100">
            <p className="text-xs text-gray-600 font-medium mb-1">Preço</p>
            <div className="flex items-baseline gap-2">
              {desconto > 0 ? (
                <>
                  <p className="text-sm line-through text-gray-500">R$ {preco}</p>
                  <p className="text-2xl font-bold text-purple-600">R$ {precoFinal}</p>
                  <span className="ml-auto text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-md">-R$ {desconto.toFixed(2).replace('.', ',')}</span>
                </>
              ) : (
                <p className="text-2xl font-bold text-gray-900">R$ {preco}</p>
              )}
            </div>
          </div> */}

          {/* Button */}
          <div className="bg-red-400 flex-place-items-center justify-center"></div>
          <button
            onClick={handleAddToCart}
            disabled={isLoading}
            className={
              `mt-1 m-auto flex place-items-center justify-center gap-1 w-[90%] py-2 rounded-full font-light text-white bg-primary-00 hover:bg-primary-10 transition-all duration-300 text-sm` +
              (isLoading ? ' opacity-60 cursor-not-allowed' : '')
            }
          >
            {isLoading ? (
              <>
                <Clock className="animate-spin" /> Carregando...
              </>
            ) : (
              <>
                Adicionar <ArrowRight/>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
