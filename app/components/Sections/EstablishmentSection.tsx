"use client";
import { GeoAlt, StarFill, Telephone, ClockHistory } from 'react-bootstrap-icons';
import { estabelecimento } from '@/app/data/mock';

export function EstablishmentSection() {
  return (
    <section id="estabelecimento" className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🏪 Estabelecimento</h2>
        <p className="text-gray-600">Conheça mais sobre nós</p>
      </div>
      
      <div className="rounded-2xl bg-linear-to-r from-purple-600 via-pink-500 to-rose-500 text-white p-8 shadow-2xl">
        <h3 className="text-2xl font-bold mb-2">{estabelecimento.nome}</h3>
        <p className="text-white/90 text-base leading-relaxed">{estabelecimento.descricao}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div className="rounded-2xl border-2 border-purple-100 bg-linear-to-br from-purple-50 to-white p-6 shadow-md hover:shadow-lg transition-all">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-purple-100 text-purple-600">
                <GeoAlt size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">📍 Localização</p>
                <p className="text-gray-900 font-semibold mt-1">{estabelecimento.endereco}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-pink-100 text-pink-600">
                <Telephone size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">☎️ Contato</p>
                <p className="text-gray-900 font-semibold mt-1">{estabelecimento.telefone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
                <ClockHistory size={24} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600">⏰ Horário</p>
                <p className="text-gray-900 font-semibold mt-1">{estabelecimento.horario}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border-2 border-yellow-100 bg-linear-to-br from-yellow-50 to-white p-6 shadow-md hover:shadow-lg transition-all">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-yellow-100">
              <StarFill size={32} className="text-yellow-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Avaliação dos clientes</p>
              <p className="text-3xl font-bold text-yellow-600">{estabelecimento.rating}</p>
              <p className="text-sm text-gray-500">de 5 estrelas</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">Avaliações baseadas na experiência de qualidade e rapidez no atendimento dos nossos clientes.</p>
        </div>
      </div>
    </section>
  );
}
