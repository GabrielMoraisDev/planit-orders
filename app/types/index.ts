export type StatusPedido = 'recebido' | 'preparando' | 'enviado' | 'atrasado' | 'concluído';

export type ProdutoNome = string;

// Tipos para variações
export type VariacaoTipo = 'tamanho' | 'sabor' | 'adicional';

export type VariacaoOpcao = {
  id: string;
  nome: string;
  preco_adicional?: number; // Preço extra para esta opção (ex: tamanho maior custa mais)
};

export type Variacao = {
  id: string;
  tipo: VariacaoTipo;
  nome: string; // ex: "Tamanho", "Sabor", "Adicionais"
  obrigatoria: boolean; // Se é necessário escolher uma opção
  multipla: boolean; // Se permite múltiplas seleções (ex: adicionais)
  opcoes: VariacaoOpcao[];
};

export type Product = {
  id: string;
  nome_produto: ProdutoNome;
  categoria: string;
  valor: number; // R$
  tempo_preparo_min: number; // minutos
  cupom_desconto?: number; // R$
  imagem?: string;
  descricao?: string;
  variacoes?: Variacao[]; // Novas variações do produto
};

export type Order = {
  cod_pedido: string;
  cliente: string;
  num_cliente: string; // whatsapp
  nome_produto: ProdutoNome;
  categoria: string;
  valor: number; // R$
  tempo_preparo_min: number;
  cupom_desconto?: number; // R$
  data_pedido: string; // YYYY-MM-DD
  hora_pedido: string; // HH:mm
  endereco: string;
  status_pedido: StatusPedido;
};

// Seleções feitas pelo usuário nas variações
export type VariacaoSelecionada = {
  variacao_id: string;
  opcoes_selecionadas: string[]; // Array de IDs das opções selecionadas
};

export type CartItem = {
  product: Product;
  qty: number;
  variacoes_selecionadas?: VariacaoSelecionada[]; // Variações escolhidas para este item
};

export type EstabelecimentoInfo = {
  nome: string;
  descricao: string;
  endereco: string;
  telefone: string;
  horario: string;
  rating: number;
};
