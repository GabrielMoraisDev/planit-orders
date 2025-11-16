"use client";
import { useState } from 'react';

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const submitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = { name, phone };
    localStorage.setItem('acai_user', JSON.stringify(user));
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isOpen}>
      <div onClick={onClose} className={`absolute inset-0 bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
      <div
        className={`absolute left-1/2 top-1/2 w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl p-5 transition ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <h3 className="text-lg font-semibold mb-3">Entrar</h3>
        <form onSubmit={submitLogin} className="space-y-3">
          <div>
            <label className="block text-sm text-zinc-600 mb-1">Nome</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ring-purple-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-zinc-600 mb-1">WhatsApp</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 ring-purple-200"
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            <button type="button" onClick={onClose} className="rounded-md border px-3 py-2 text-sm">
              Cancelar
            </button>
            <button className="rounded-md bg-purple-600 text-white px-3 py-2 text-sm hover:bg-purple-700">
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
