"use client";
import { Search } from 'react-bootstrap-icons';
import { useState, useMemo } from 'react';
import ProductCard from '@/app/components/Products/ProductCard';
import { products, categorias } from '@/app/data/mock';

export function MenuSection() {
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState<string | undefined>();

  const filtered = useMemo(() => {
    return products.filter(p => {
      const matchQ = `${p.nome_produto} ${p.categoria} ${p.descricao ?? ''}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchC = categoria ? p.categoria === categoria : true;
      return matchQ && matchC;
    });
  }, [query, categoria]);

  // const categoriasSelecionada = categoria 
  //   ? categorias.find(c => c.value === categoria)?.label 
  //   : 'Todos os Produtos';

  return (
    <>
      <section id="cardapio" className="mt-5">
        <div className="mb-1 text-center">
          <h2 className="text-2xl font-bold text-primary-00">Cardápio</h2>
        </div>

        {/* Search Products - Abaixo da categoria selecionada */}
        <div className="sticky top-16 py-3 bg-white z-20">
          <div className="mb-3">
            {/* <label className="block text-sm font-semibold text-gray-700 mb-2">Buscar dentro da categoria</label> */}
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Pesquise por produtos aqui..."
                className="w-full pr-10 pl-4 py-3 rounded-lg md:rounded-xl border-2 border-primary-00 text-primary-00 placeholder-gray-500 outline-none focus:border-primary-00 focus:ring-2 focus:ring-primary-00 transition-all text-sm md:text-base"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-primary-00" size={18} />
            </div>
          </div>

          {/* Categories Section converted to a select for compact UI */}
          <div>
            {/* <label htmlFor="categoria-select" className="block text-sm font-semibold text-gray-700 mb-2">Categoria</label> */}
            <div>
              <select
                id="categoria-select"
                value={categoria ?? ''}
                onChange={(e) => setCategoria(e.target.value === '' ? undefined : e.target.value)}
                className="w-full px-4 py-3 rounded-lg md:rounded-xl border-2 border-primary-00 text-primary-00 placeholder-gray-500 outline-none focus:border-primary-00 focus:ring-primary-00 transition-all text-sm md:text-base"
              >
                <option value="">Todas as categorias</option>
                {categorias.map((cat) => (
                  <option key={cat.value} value={cat.value}>{cat.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Category Info - Melhorado */}
        {/* {categoria && (
          <div className="mb-6 p-4 bg-linear-to-r from-purple-50 to-pink-50 border-l-4 border-purple-600 rounded-lg animate-fadeIn">
            <p className="text-purple-900 font-semibold text-sm md:text-base">
              Mostrando: <span className="text-purple-600">{categoriasSelecionada}</span>
            </p>
          </div>
        )} */}


        {/* Products Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-gray-500 text-lg flex place-items-center justify-center gap-2">Nenhum produto encontrado <Search></Search></p>
            <p className="text-gray-400 mt-2">Tente outra categoria ou termo de busca</p>
          </div>
        )}
      </section>
      <div className="h-20"></div>
    </>
  );
}
