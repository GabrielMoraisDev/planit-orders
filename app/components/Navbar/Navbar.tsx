"use client";
import { useEffect, useState } from 'react';
import { Cart3, HouseDoor, InfoCircle, PersonCircle } from 'react-bootstrap-icons';
import { useCart } from '@/app/context/CartContext';
import LoginModal from './LoginModal';
import Image from 'next/image';

export default function Navbar() {
  const { items, toggleCart } = useCart();
  const count = items.reduce((a, i) => a + i.qty, 0);

  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string } | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('acai_user');
      if (raw) setUser(JSON.parse(raw));
    } catch {}
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 bg-primary-00">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 font-semibold text-zinc-900">
            <Image src="/logo.png" alt="Açaí da Casa" width={70} height={70} />
          </a>
          <nav className="hidden md:flex items-center gap-1 bg-primary-00">
            <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700">
              <HouseDoor className="inline mr-2" /> Home
            </a>
            <a href="#estabelecimento" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700">
              <InfoCircle className="inline mr-2" /> Estabelecimento
            </a>
            <a href="#pedidos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700">
              <Cart3 className="inline mr-2" /> Pedidos
            </a>
            {user ? (
              <span className="px-3 py-2 text-sm text-purple-700">Olá, {user.name.split(' ')[0]}</span>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700"
              >
                <PersonCircle className="inline mr-2" /> Login
              </button>
            )}
          </nav>
          <button
            onClick={toggleCart}
            className="relative inline-flex items-center gap-2 rounded-full bg-white text-primary-00 hover:text-white px-4 py-2 hover:bg-primary-10 transition cursor-pointer"
          >
            <Cart3 />
            Carrinho
            {count > 0 && (
              <span className="absolute -top-2 -right-1 text-xs bg-accent-00 text-white rounded-full w-5 h-5 grid place-content-center">
                {count}
              </span>
            )}
          </button>
        </div>
        {/* <div className="md:hidden border-t px-4 py-2 flex gap-2">
          <a href="#" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700">
            <HouseDoor className="inline mr-2" /> Home
          </a>
          <a href="#estabelecimento" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700">
            <InfoCircle className="inline mr-2" /> Estabelecimento
          </a>
          <a href="#pedidos" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700">
            <Cart3 className="inline mr-2" /> Pedidos
          </a>
          {user ? (
            <span className="px-3 py-2 text-sm text-purple-700">Olá, {user.name.split(' ')[0]}</span>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-zinc-100 text-zinc-700"
            >
              <PersonCircle className="inline mr-2" /> Login
            </button>
          )}
        </div> */}
      </header>
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
