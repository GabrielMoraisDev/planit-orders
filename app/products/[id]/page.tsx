"use client";
import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from 'react-bootstrap-icons';
import type { VariacaoSelecionada } from '@/app/types';
import { useCart } from '@/app/context/CartContext';
import { products } from '@/app/data/mock';
import Image from 'next/image';

export default function ProductVariationsPage() {
  const params = useParams();
  const router = useRouter();
  const { addItem } = useCart();
  // Derive product from params instead of storing in state to avoid
  // calling setState synchronously inside an effect for product.
  const product = useMemo(() => products.find(p => p.id === params.id) || null, [params.id]);

  // Selections are local state (user-controlled). Initialize from the
  // derived product on first render; if `product` changes we reset selections.
  const [selecionadas, setSelecionadas] = useState<VariacaoSelecionada[]>(() => {
    if (product?.variacoes) {
      return product.variacoes.map(var_item => ({
        variacao_id: var_item.id,
        opcoes_selecionadas: [],
      }));
    }
    return [];
  });
  const [precoAdicional, setPrecoAdicional] = useState(0);
  const [erros, setErros] = useState<string[]>([]);
  const variacaoRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Note: `selecionadas` is initialized from the derived `product` above.
  // If the app requires resetting selections on client-side navigation
  // without a remount, consider moving selections into a child keyed by
  // `product?.id` or using a controlled reset action.

  // Calcula preço adicional baseado nas seleções
  useEffect(() => {
    const calcularPreco = () => {
      let total = 0;
      if (product?.variacoes) {
        product.variacoes.forEach(variacao => {
          const selecionada = selecionadas.find(s => s.variacao_id === variacao.id);
          if (selecionada) {
            selecionada.opcoes_selecionadas.forEach(opcaoId => {
              const opcao = variacao.opcoes.find(o => o.id === opcaoId);
              if (opcao?.preco_adicional) {
                total += opcao.preco_adicional;
              }
            });
          }
        });
      }
      setPrecoAdicional(total);
    };
    calcularPreco();
  }, [selecionadas, product?.variacoes]);

  const handleSelecionarOpcao = (variacaoId: string, opcaoId: string) => {
    setSelecionadas(prev =>
      prev.map(sel => {
        if (sel.variacao_id === variacaoId) {
          const variacao = product?.variacoes?.find(v => v.id === variacaoId);
          if (variacao?.multipla) {
            // Para múltiplas seleções (adicionais), alterna
            const novoArray = sel.opcoes_selecionadas.includes(opcaoId)
              ? sel.opcoes_selecionadas.filter(id => id !== opcaoId)
              : [...sel.opcoes_selecionadas, opcaoId];
            return { ...sel, opcoes_selecionadas: novoArray };
          } else {
            // Para seleção única, substitui
            return { ...sel, opcoes_selecionadas: [opcaoId] };
          }
        }
        return sel;
      })
    );
    setErros(erros.filter(e => e !== variacaoId));
  };

  const validarSeleções = () => {
    const novosErros: string[] = [];
    
    if (!product?.variacoes) return true;

    product.variacoes.forEach(variacao => {
      const selecionada = selecionadas.find(s => s.variacao_id === variacao.id);
      if (variacao.obrigatoria && (!selecionada || selecionada.opcoes_selecionadas.length === 0)) {
        novosErros.push(variacao.id);
      }
    });

    setErros(novosErros);
    
    // Scroll para o primeiro erro
    if (novosErros.length > 0 && variacaoRefs.current[novosErros[0]]) {
      variacaoRefs.current[novosErros[0]]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
    
    return novosErros.length === 0;
  };

  const handleConfirm = () => {
    if (validarSeleções() && product) {
      addItem(product, 1, selecionadas);
      router.back();
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Produto não encontrado</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-00 text-white pt-3 pb-6 -mt-1">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => router.back()}
            className="mb-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition inline-flex items-center gap-2"
          >
            <ArrowLeft size={24} />
            <span>Voltar</span>
          </button>
          
          <div className="flex flex-col gap-6 items-start">
            {product.imagem && (
              <div className="w-44 h-36 m-auto rounded-md overflow-hidden bg-white/10">
                <Image 
                  src={product.imagem} 
                  alt={product.nome_produto} 
                  width={128} 
                  height={128} 
                  className="object-cover w-full h-full" 
                />
              </div>
            )}
            <div className='px-4'>
              <h1 className="text-2xl font-bold capitalize mb-2 text-center">{product.nome_produto}</h1>
              <p className="text-purple-100 text-center">{product.descricao}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto pb-56">
        <div className="px-4 py-6 space-y-6">
          {!product.variacoes || product.variacoes.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Este produto não possui variações</p>
          ) : (
            product.variacoes.map(variacao => (
              <div 
                key={variacao.id} 
                ref={el => { variacaoRefs.current[variacao.id] = el; }}
                className={`border-b pb-6 last:border-b-0 ${
                  erros.includes(variacao.id) ? 'border-red-300' : 'border-gray-200'
                }`}
              >
                <div className="flex items-baseline gap-2 mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{variacao.nome}</h3>
                  {/* {variacao.obrigatoria && (
                    <span className="text-xs font-semibold px-2 py-1 bg-red-100 text-red-700 rounded-full">
                      Obrigatório
                    </span>
                  )}
                  {variacao.multipla && (
                    <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      Múltipla
                    </span>
                  )} */}
                </div>

                {/* Erro de validação */}
                {erros.includes(variacao.id) && (
                  <p className="text-red-600 text-sm mb-3 font-medium">Selecione uma opção</p>
                )}

                {/* Opções */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {variacao.opcoes.map(opcao => {
                    const selecionada = selecionadas
                      .find(s => s.variacao_id === variacao.id)
                      ?.opcoes_selecionadas.includes(opcao.id);
                    
                    const temErro = erros.includes(variacao.id);

                    return (
                      <button
                        key={opcao.id}
                        onClick={() => handleSelecionarOpcao(variacao.id, opcao.id)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 text-left font-medium ${
                          selecionada
                            ? 'border-green-600 bg-green-400/10 text-primary-00'
                            : temErro
                            ? 'border-red-400 bg-red-50 text-gray-700 hover:border-red-600'
                            : 'border-gray-200 bg-white text-gray-700 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex justify-between place-items-center">
                          <span className="capitalize">{opcao.nome}</span>
                          {opcao.preco_adicional ? (
                            <span className="text-sm font-bold text-accent-00 whitespace-nowrap ml-2">
                              +R$ {opcao.preco_adicional.toFixed(2).replace('.', ',')}
                            </span>
                          ) : (
                            <span className="text-xs text-gray-500">Incluso</span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer fixo */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Resumo de preço */}
          <div className="bg-gray-100 rounded-md px-4 pt-2 pb-3 border border-gray-300">
            {/* <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700">Preço base:</span>
              <span className="font-semibold text-gray-900">
                R$ {product.valor.toFixed(2).replace('.', ',')}
              </span>
            </div> */}
            {precoAdicional > 0 && (
              <div className="border-b flex justify-between items-center pb-2">
                <span className="text-gray-700">Adicionais:</span>
                <span className="font-semibold text-gray-700">
                  +R$ {precoAdicional.toFixed(2).replace('.', ',')}
                </span>
              </div>
            )}
            <div className="mt-2 flex justify-between items-center">
              <span className="font-bold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-green-600">
                R$ {(product.valor + precoAdicional).toFixed(2).replace('.', ',')}
              </span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex flex-col-reverse gap-3">
            <button
              onClick={() => router.back()}
              className="flex-1 py-3 rounded-md font-semibold text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 py-3 rounded-md font-semibold text-white bg-green-600 transition-all shadow-lg"
            >
              ✓ Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
