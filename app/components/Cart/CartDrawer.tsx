"use client";
import { X, Trash, Plus, Dash } from 'react-bootstrap-icons';
import { useCart } from '@/app/context/CartContext';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
  const { isCartOpen, closeCart, items, total, updateQty, removeItem, clear } = useCart();
  const [deleteConfirm, setDeleteConfirm] = useState<{ productId: string; idx: number } | null>(null);

  return (
    <div className={`fixed inset-0 z-40 ${isCartOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isCartOpen}>
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-black/40 transition-opacity ${isCartOpen ? 'opacity-100' : 'opacity-0'}`}
      />
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transition-transform duration-300 ${
          isCartOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Seu carrinho</h3>
          <button onClick={closeCart} className="cursor-pointer text-3xl rounded hover:bg-zinc-100">
            <X />
          </button>
        </div>
        <div className="p-4 space-y-4 max-h-[calc(100%-160px)] overflow-y-auto">
          {items.length === 0 ? (
            <p className="text-zinc-500">Seu carrinho está vazio.</p>
          ) : (
            items.map(({ product, qty, variacoes_selecionadas }, idx) => {
              // Calcula preço adicional das variações
              let precoAdicional = 0;
              if (variacoes_selecionadas && product.variacoes) {
                product.variacoes.forEach(variacao => {
                  const selecionada = variacoes_selecionadas.find(s => s.variacao_id === variacao.id);
                  if (selecionada) {
                    selecionada.opcoes_selecionadas.forEach(opcaoId => {
                      const opcao = variacao.opcoes.find(o => o.id === opcaoId);
                      if (opcao?.preco_adicional) {
                        precoAdicional += opcao.preco_adicional;
                      }
                    });
                  }
                });
              }
              
              const precoTotal = product.valor + precoAdicional;
              const chaveUnica = `${product.id}-${idx}`;
              
              return (
                <div key={chaveUnica} className="flex items-start gap-3 border-b last:border-0 last:pb-0 pb-3">
                  <div className="h-14 w-14 rounded bg-zinc-100 overflow-hidden shrink-0 flex items-center justify-center text-lg">
                    <Image src={product?.imagem ?? '/placeholder.png'} alt={product.nome_produto} width={56} height={56} className='w-full h-full object-fill' />
                  </div>
                  <div className="flex-1">
                    <p className="capitalize font-semibold">
                      {product.nome_produto}
                    </p>
                    <p className="font-medium capitalize text-light">
                      {product.categoria}
                    </p>
                    
                    {/* Variações selecionadas */}
                    {variacoes_selecionadas && variacoes_selecionadas.length > 0 && (
                      <div className="text-xs text-zinc-600 mt-1 space-y-0.5">
                        {variacoes_selecionadas.map(var_sel => {
                          const variacao = product.variacoes?.find(v => v.id === var_sel.variacao_id);
                          if (!variacao) return null;
                          
                          const nomes = var_sel.opcoes_selecionadas
                            .map(id => variacao.opcoes.find(o => o.id === id)?.nome)
                            .filter(Boolean);
                          
                          return (
                            <div key={variacao.id}>
                              <strong>{variacao.nome}:</strong> {nomes.join(', ')}
                            </div>
                          );
                        })}
                      </div>
                    )}
                    
                    <p className="text-sm text-zinc-600 mt-1">
                      R$ {precoTotal.toFixed(2).replace('.', ',')}
                      {precoAdicional > 0 && (
                        <span className="text-xs text-purple-600 ml-1">
                          (+R$ {precoAdicional.toFixed(2).replace('.', ',')})
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="rounded-full p-1.5 border"
                      onClick={() => qty > 1 ? updateQty(product.id, Math.max(0, qty - 1), idx) : null}
                    >
                      <Dash />
                    </button>
                    <span className="w-6 text-center text-sm">{qty}</span>
                    <button
                      className="rounded-full p-1.5 border"
                      onClick={() => updateQty(product.id, qty + 1, idx)}
                    >
                      <Plus />
                    </button>
                  </div>
                  <button
                    className="p-2 text-zinc-500 hover:text-red-600"
                    onClick={() => setDeleteConfirm({ productId: product.id, idx })}
                  >
                    <Trash />
                  </button>
                </div>
              );
            })
          )}
        </div>
        <div className="p-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-600">Total</span>
            <span className="text-lg font-semibold">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
          <button className="w-full rounded-lg bg-purple-600 text-white py-3 font-medium hover:bg-purple-700">
            Finalizar Pedido
          </button>
          <button
            onClick={() => {
              clear();
              closeCart();
            }}
            className="w-full text-zinc-600 py-2 text-sm hover:text-zinc-700"
          >
            Limpar carrinho
          </button>
        </div>
      </aside>

      {/* Modal de confirmação */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setDeleteConfirm(null)}
            className="absolute inset-0 bg-black/50"
          />
          <div className="relative bg-white rounded-lg shadow-xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-lg font-semibold">Remover produto?</h3>
            <p className="text-zinc-600">
              Tem certeza que deseja remover este item do carrinho?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  removeItem(deleteConfirm.productId, deleteConfirm.idx);
                  setDeleteConfirm(null);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
