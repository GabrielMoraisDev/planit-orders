"use client";
import { Receipt, HourglassSplit, Truck, ExclamationTriangle, Check2Circle } from 'react-bootstrap-icons';
import type { ReactNode } from 'react';

type StatusBadgeProps = {
  status: string;
};

const statusMap: Record<string, { color: string; icon: ReactNode; label: string }> = {
  recebido: { color: 'bg-zinc-100 text-zinc-800', icon: <Receipt />, label: '✓ Recebido' },
  preparando: { color: 'bg-blue-100 text-blue-800', icon: <HourglassSplit />, label: '👨‍🍳 Preparando' },
  enviado: { color: 'bg-purple-100 text-purple-800', icon: <Truck />, label: '🚗 Enviado' },
  atrasado: { color: 'bg-red-100 text-red-800', icon: <ExclamationTriangle />, label: '⚠️ Atrasado' },
  'concluído': { color: 'bg-green-100 text-green-800', icon: <Check2Circle />, label: '✅ Concluído' },
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const item = statusMap[status] ?? statusMap['recebido'];
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-2 rounded-full text-sm font-semibold ${item.color}`}>
      {item.icon}
      {item.label}
    </span>
  );
}
