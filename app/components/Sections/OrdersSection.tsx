"use client";
import { useMemo, useState } from 'react';
import Select from 'react-select';
import { StatusBadge } from '@/app/utils/StatusBadge';
import { pedidosMock } from '@/app/data/mock';

const statusOptions = [
  { value: 'recebido', label: 'Recebido' },
  { value: 'preparando', label: 'Preparando' },
  { value: 'enviado', label: 'Enviado' },
  { value: 'atrasado', label: 'Atrasado' },
  { value: 'concluído', label: 'Concluído' },
];

export function OrdersSection() {
  const [status, setStatus] = useState<string | undefined>();

  const pedidos = useMemo(() => pedidosMock.filter(p => (status ? p.status_pedido === status : true)), [status]);

  return (
    <section id="pedidos" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📦 Seus Pedidos</h2>
        <p className="text-gray-600">Acompanhe o status de suas encomendas</p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 shadow-md border border-purple-100">
        <div>
          <p className="text-sm font-medium text-gray-600">Total de pedidos</p>
          <p className="text-3xl font-bold text-purple-600">{pedidos.length}</p>
        </div>
        <div className="w-full sm:w-auto min-w-60">
          <label className="block text-sm font-medium text-gray-700 mb-2">🔍 Filtrar por status</label>
          <Select
            instanceId="status-select"
            isClearable
            placeholder="Todos os status"
            options={statusOptions}
            value={status ? statusOptions.find(s => s.value === status) : null}
            onChange={(opt) => setStatus(opt?.value)}
            styles={{
              control: (base) => ({ 
                ...base, 
                borderColor: '#d4d4d8',
                boxShadow: 'none',
                borderRadius: '0.75rem',
                padding: '0.25rem'
              }),
            }}
          />
        </div>
      </div>

      <div className="space-y-4">
        {pedidos.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-12 text-center">
            <p className="text-2xl mb-2">📭</p>
            <p className="text-gray-600 font-medium">Nenhum pedido encontrado</p>
            <p className="text-sm text-gray-500 mt-1">Faça seu primeiro pedido agora!</p>
          </div>
        ) : (
          pedidos.map(pedido => (
            <div key={pedido.cod_pedido} className="rounded-2xl border-2 border-purple-100 bg-white shadow-md hover:shadow-lg transition-all p-6 group">
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4 pb-4 border-b border-purple-100">
                <div className="space-y-1">
                  <p className="text-lg font-bold text-gray-900">Pedido #{pedido.cod_pedido}</p>
                  <p className="text-sm text-gray-600">Cliente: <span className="font-medium text-gray-900">{pedido.cliente}</span></p>
                </div>
                <StatusBadge status={pedido.status_pedido} />
              </div>

              {/* Grid de Informações */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                  <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide">🍨 Produto</p>
                  <p className="text-gray-900 font-bold mt-2 capitalize">{pedido.nome_produto}</p>
                </div>

                <div className="bg-green-50 rounded-xl p-4 border border-green-100">
                  <p className="text-xs font-semibold text-green-700 uppercase tracking-wide">💰 Valor</p>
                  <p className="text-gray-900 font-bold text-lg mt-2">R$ {pedido.valor.toFixed(2).replace('.', ',')}</p>
                </div>

                <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
                  <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide">📅 Data/Hora</p>
                  <p className="text-gray-900 font-bold mt-2">{pedido.data_pedido}</p>
                  <p className="text-sm text-gray-600">{pedido.hora_pedido}</p>
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                  <p className="text-xs font-semibold text-orange-700 uppercase tracking-wide">⏱️ Preparo</p>
                  <p className="text-gray-900 font-bold text-lg mt-2">{pedido.tempo_preparo_min} min</p>
                </div>
              </div>

              {/* Endereço */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">📍 Endereço de Entrega</p>
                <p className="text-gray-900 font-medium">{pedido.endereco}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
