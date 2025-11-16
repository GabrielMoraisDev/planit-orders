import { Order, Product, EstabelecimentoInfo } from '@/app/types';

export const categorias = [
  { value: 'clássicos', label: 'Clássicos' },
  { value: 'premium', label: 'Premium' },
  { value: 'casquinhas', label: 'Casquinhas' },
  { value: 'combos', label: 'Combos' },
];

export const products: Product[] = [
  // Clássicos
  {
    id: 'p1',
    nome_produto: 'Milkshake de morango',
    categoria: 'clássicos',
    valor: 18.9,
    tempo_preparo_min: 8,
    cupom_desconto: 5,
    imagem: '/products/milkshakes.png',
    descricao: 'Milkshake cremoso de açaí com leite condensado e granola.',
    variacoes: [
      {
        id: 'var-tamanho',
        tipo: 'tamanho',
        nome: 'Tamanho',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'tam-300', nome: '300ml', preco_adicional: 0 },
          { id: 'tam-400', nome: '400ml', preco_adicional: 2.5 },
          { id: 'tam-500', nome: '500ml', preco_adicional: 4.0 },
        ]
      },
      {
        id: 'var-sabor',
        tipo: 'sabor',
        nome: 'Sabor',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'sabor-morango', nome: 'Morango', preco_adicional: 0 },
          { id: 'sabor-chocolate', nome: 'Chocolate', preco_adicional: 0 },
          { id: 'sabor-baunilha', nome: 'Baunilha', preco_adicional: 0 },
          { id: 'sabor-mista', nome: 'Mista', preco_adicional: 1.5 },
          { id: 'xsabor-morango', nome: 'Morango', preco_adicional: 0 },
          { id: 'xsabor-chocolate', nome: 'Chocolate', preco_adicional: 0 },
          { id: 'xsabor-baunilha', nome: 'Baunilha', preco_adicional: 0 },
          { id: 'xsabor-mista', nome: 'Mista', preco_adicional: 1.5 },
        ]
      },
      {
        id: 'var-adicionais',
        tipo: 'adicional',
        nome: 'Adicionais',
        obrigatoria: false,
        multipla: true,
        opcoes: [
          { id: 'adic-morango', nome: 'Cobertura de Morango', preco_adicional: 2.0 },
          { id: 'adic-granulado', nome: 'Granulado', preco_adicional: 1.5 },
          { id: 'adic-leite-condensado', nome: 'Leite Condensado', preco_adicional: 1.0 },
          { id: 'adic-calda-chocolate', nome: 'Calda de Chocolate', preco_adicional: 2.0 },
          { id: 'xadic-morango', nome: 'Cobertura de Morango', preco_adicional: 2.0 },
          { id: 'xadic-granulado', nome: 'Granulado', preco_adicional: 1.5 },
          { id: 'xadic-leite-condensado', nome: 'Leite Condensado', preco_adicional: 1.0 },
          { id: 'xadic-calda-chocolate', nome: 'Calda de Chocolate', preco_adicional: 2.0 },
        ]
      }
    ]
  },
  {
    id: 'p5',
    nome_produto: 'Sunday de baunília',
    categoria: 'clássicos',
    valor: 19.5,
    tempo_preparo_min: 7,
    imagem: '/products/sorvetes.png',
    descricao: 'Sunday clássico com calda de chocolate e granola crocante.',
    variacoes: [
      {
        id: 'var-tamanho',
        tipo: 'tamanho',
        nome: 'Tamanho',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'tam-300', nome: '300ml', preco_adicional: 0 },
          { id: 'tam-400', nome: '400ml', preco_adicional: 2.0 },
          { id: 'tam-500', nome: '500ml', preco_adicional: 3.5 },
        ]
      },
      {
        id: 'var-sabor',
        tipo: 'sabor',
        nome: 'Sabor',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'sabor-chocolate', nome: 'Chocolate', preco_adicional: 0 },
          { id: 'sabor-caramelo', nome: 'Caramelo', preco_adicional: 1.0 },
          { id: 'sabor-morango', nome: 'Morango', preco_adicional: 0 },
        ]
      },
      {
        id: 'var-adicionais',
        tipo: 'adicional',
        nome: 'Adicionais',
        obrigatoria: false,
        multipla: true,
        opcoes: [
          { id: 'adic-granola', nome: 'Granola Extra', preco_adicional: 1.5 },
          { id: 'adic-castanha', nome: 'Castanha', preco_adicional: 2.5 },
          { id: 'adic-melancia', nome: 'Melancia', preco_adicional: 1.0 },
        ]
      }
    ]
  },
  {
    id: 'p6',
    nome_produto: 'Copos de Açaí',
    categoria: 'clássicos',
    valor: 17.9,
    tempo_preparo_min: 6,
    cupom_desconto: 3,
    imagem: '/products/copos.png',
    descricao: 'Milkshake de açaí com morango e leite integral.',
    variacoes: [
      {
        id: 'var-tamanho',
        tipo: 'tamanho',
        nome: 'Tamanho',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'tam-300', nome: '300ml', preco_adicional: 0 },
          { id: 'tam-400', nome: '400ml', preco_adicional: 2.5 },
          { id: 'tam-500', nome: '500ml', preco_adicional: 4.0 },
        ]
      },
      {
        id: 'var-sabor',
        tipo: 'sabor',
        nome: 'Sabor',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'sabor-morango', nome: 'Morango', preco_adicional: 0 },
          { id: 'sabor-chocolate', nome: 'Chocolate', preco_adicional: 0 },
          { id: 'sabor-baunilha', nome: 'Baunilha', preco_adicional: 0 },
        ]
      },
      {
        id: 'var-adicionais',
        tipo: 'adicional',
        nome: 'Adicionais',
        obrigatoria: false,
        multipla: true,
        opcoes: [
          { id: 'adic-mel', nome: 'Mel', preco_adicional: 1.5 },
          { id: 'adic-granulado', nome: 'Granulado', preco_adicional: 1.5 },
        ]
      }
    ]
  },
  {
    id: 'p2',
    nome_produto: 'Combos',
    categoria: 'premium',
    valor: 22.5,
    tempo_preparo_min: 10,
    imagem: '/products/combos.png',
    descricao: 'Sunday de açaí com calda de morango e pedaços de brownie.',
    variacoes: [
      {
        id: 'var-tamanho',
        tipo: 'tamanho',
        nome: 'Tamanho',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'tam-400', nome: '400ml', preco_adicional: 0 },
          { id: 'tam-500', nome: '500ml', preco_adicional: 2.0 },
          { id: 'tam-600', nome: '600ml', preco_adicional: 3.5 },
        ]
      },
      {
        id: 'var-sabor',
        tipo: 'sabor',
        nome: 'Sabor',
        obrigatoria: true,
        multipla: false,
        opcoes: [
          { id: 'sabor-morango', nome: 'Morango', preco_adicional: 0 },
          { id: 'sabor-amora', nome: 'Amora', preco_adicional: 1.0 },
        ]
      },
      {
        id: 'var-adicionais',
        tipo: 'adicional',
        nome: 'Adicionais',
        obrigatoria: false,
        multipla: true,
        opcoes: [
          { id: 'adic-brownie', nome: 'Brownie Extra', preco_adicional: 3.0 },
          { id: 'adic-granola-premium', nome: 'Granola Premium', preco_adicional: 2.0 },
          { id: 'adic-castanha-brava', nome: 'Castanha-do-Pará', preco_adicional: 3.5 },
        ]
      }
    ]
  },
];

export const estabelecimento: EstabelecimentoInfo = {
  nome: 'Açaí da Casa',
  descricao: 'O melhor açaí da cidade, feito com frutas fresquinhas e muito amor.',
  endereco: 'Rua das Flores, 123 - Centro',
  telefone: '(11) 3456-7890',
  horario: 'Seg-Dom: 10h às 22h',
  rating: 4.8,
};

export const pedidosMock: Order[] = [
  {
    cod_pedido: 'AC-1023',
    cliente: 'Ana Souza',
    num_cliente: '55 11 99999-0001',
    nome_produto: 'milkshake',
    categoria: 'clássicos',
    valor: 18.9,
    tempo_preparo_min: 8,
    cupom_desconto: 5,
    data_pedido: '2025-11-13',
    hora_pedido: '20:15',
    endereco: 'Rua das Palmeiras, 100 - Centro',
    status_pedido: 'preparando',
  },
  {
    cod_pedido: 'AC-1024',
    cliente: 'Lucas Lima',
    num_cliente: '55 11 98888-2222',
    nome_produto: 'sunday',
    categoria: 'premium',
    valor: 22.5,
    tempo_preparo_min: 10,
    data_pedido: '2025-11-13',
    hora_pedido: '20:22',
    endereco: 'Av. Brasil, 220 - Bairro Novo',
    status_pedido: 'recebido',
  },
  {
    cod_pedido: 'AC-1025',
    cliente: 'Marina Dias',
    num_cliente: '55 11 97777-3333',
    nome_produto: 'casquinha',
    categoria: 'casquinhas',
    valor: 9.9,
    tempo_preparo_min: 3,
    data_pedido: '2025-11-13',
    hora_pedido: '20:25',
    endereco: 'Rua do Sol, 45 - Jardim',
    status_pedido: 'enviado',
  },
  {
    cod_pedido: 'AC-1026',
    cliente: 'Pedro Gomes',
    num_cliente: '55 11 96666-4444',
    nome_produto: 'milkshake',
    categoria: 'combos',
    valor: 29.9,
    tempo_preparo_min: 12,
    data_pedido: '2025-11-13',
    hora_pedido: '20:40',
    endereco: 'Rua do Comércio, 789 - Vila Nova',
    status_pedido: 'atrasado',
  },
  {
    cod_pedido: 'AC-1027',
    cliente: 'Julia Costa',
    num_cliente: '55 11 95555-5555',
    nome_produto: 'casquinha',
    categoria: 'casquinhas',
    valor: 9.9,
    tempo_preparo_min: 3,
    data_pedido: '2025-11-13',
    hora_pedido: '20:55',
    endereco: 'Av. Paulista, 1000 - Bela Vista',
    status_pedido: 'concluído',
  },
];
