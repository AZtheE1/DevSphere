'use client';

import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, ShoppingBag, Plus, Minus, Trash2, ArrowRight, CheckCircle2, CreditCard, Truck } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  emoji: string;
  tag: string;
  color: string;
  desc: string;
}

const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Mecha-Doodle Robot',
    price: 38,
    emoji: '🤖',
    tag: 'Bestseller',
    color: '#FFD93D',
    desc: 'Articulated toy robot with wind-up spring gears and neon decals.',
  },
  {
    id: 'p2',
    name: 'Stardust Rocket Pod',
    price: 45,
    emoji: '🚀',
    tag: 'Hot Item',
    color: '#4CC9F0',
    desc: 'Cel-shaded planetary exploration rocket with magnetic cockpit hatch.',
  },
  {
    id: 'p3',
    name: 'Rainbow Dino Plush',
    price: 24,
    emoji: '🦖',
    tag: 'Cute',
    color: '#6BE585',
    desc: 'Super squishy marshmallow velvet dinosaur with embroidered paws.',
  },
  {
    id: 'p4',
    name: 'Wizard Potion Bottle',
    price: 29,
    emoji: '🧪',
    tag: 'Magic',
    color: '#9B5DE5',
    desc: 'Glowing liquid sensory toy flask with swirling glitter vortex.',
  },
  {
    id: 'p5',
    name: 'Retro Game Boy Pad',
    price: 54,
    emoji: '🕹️',
    tag: 'Collector',
    color: '#FF6B9D',
    desc: 'Chunky clicky-button handheld arcade controller with 8-bit sound chip.',
  },
  {
    id: 'p6',
    name: 'Sparkle Star Blaster',
    price: 32,
    emoji: '✨',
    tag: 'Special',
    color: '#FF9F1C',
    desc: 'Projects starry constellations across ceiling with rotating prism lenses.',
  },
];

interface CartItem extends Product {
  quantity: number;
}

export const EcommerceModule: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3 | 4>(1); // 1: Cart, 2: Shipping, 3: Payment, 4: Confirmed

  const { playSound, addXP } = useGlobalStore();
  const cartIconRef = useRef<HTMLButtonElement>(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    playSound('pop');
    addXP(10);

    // GSAP bump animation on the cart button
    if (cartIconRef.current) {
      gsap.fromTo(
        cartIconRef.current,
        { scale: 0.8 },
        { scale: 1.15, duration: 0.15, yoyo: true, repeat: 1, ease: 'power2.out' }
      );
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
    playSound('click');
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const completeCheckout = () => {
    setCheckoutStep(4);
    playSound('win');
    addXP(50);
    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.5 },
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-sunny p-6 rounded-3xl border-[4px] border-ink shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-ink font-bold text-xs border-[2px] border-ink mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-bubblegum" />
            App 08 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black text-ink">Toy Aisle Emporium</h1>
          <p className="text-sm font-semibold text-ink/80 mt-1">
            Tactile Bento toy storefront, flying cart drawer & 4-step checkout journey.
          </p>
        </div>

        {/* Floating Cart Launcher */}
        <button
          ref={cartIconRef}
          onClick={() => {
            setIsCartOpen(true);
            playSound('pop');
          }}
          className="px-5 py-3 rounded-2xl bg-white border-[3px] border-ink font-heading font-black text-sm text-ink shadow-neo hover:translate-y-[-1px] active:translate-y-[2px] transition-all flex items-center gap-2 relative"
        >
          <ShoppingBag className="w-5 h-5 text-bubblegum" />
          <span>Cart ({cart.reduce((s, i) => s + i.quantity, 0)})</span>
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 px-2 py-0.5 rounded-full bg-bubblegum text-white text-xs font-bold border-2 border-ink">
              ${totalAmount}
            </span>
          )}
        </button>
      </div>

      {/* Bento Grid Products Catalog */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {PRODUCTS.map((prod) => (
          <div
            key={prod.id}
            className="p-6 rounded-[32px] border-[4px] border-ink shadow-neo bg-white hover:translate-y-[-4px] transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Tag & Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cream border-[2px] border-ink text-[11px] font-bold text-ink">
                  {prod.tag}
                </span>
                <span className="text-xl font-heading font-black text-ink">${prod.price}</span>
              </div>

              {/* Toy Icon Display */}
              <div
                className="w-full h-36 rounded-2xl border-[3px] border-ink flex items-center justify-center text-6xl mb-4 shadow-neo-sm"
                style={{ backgroundColor: prod.color }}
              >
                {prod.emoji}
              </div>

              <h3 className="font-heading font-black text-xl text-ink mb-1">{prod.name}</h3>
              <p className="text-xs font-semibold text-gray-600 mb-6">{prod.desc}</p>
            </div>

            <button
              onClick={() => addToCart(prod)}
              className="w-full py-3 rounded-2xl bg-sunny border-[3px] border-ink font-heading font-black text-sm text-ink shadow-neo-sm hover:bg-[#ffe173] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> Add to Basket
            </button>
          </div>
        ))}
      </div>

      {/* Cart & 4-Stop Checkout Modal Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white max-w-xl w-full p-8 rounded-[36px] border-[5px] border-ink shadow-neo-xl max-h-[90vh] overflow-y-auto">
            {/* Top Bar with Step Indicators */}
            <div className="flex items-center justify-between pb-4 border-b-[3px] border-ink mb-6">
              <h2 className="font-heading font-black text-2xl text-ink">
                {checkoutStep === 1 && 'Shopping Basket'}
                {checkoutStep === 2 && 'Shipping Coordinates'}
                {checkoutStep === 3 && 'Toy Token Payment'}
                {checkoutStep === 4 && 'Delivery Dispatched!'}
              </h2>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCheckoutStep(1);
                  playSound('click');
                }}
                className="w-8 h-8 rounded-full bg-bubblegum text-white border-[2px] border-ink font-bold text-sm flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Step 1: Cart Items */}
            {checkoutStep === 1 && (
              <div>
                {cart.length === 0 ? (
                  <div className="py-12 text-center text-gray-400 font-semibold text-sm">
                    Your basket is currently empty.
                  </div>
                ) : (
                  <div className="space-y-3 mb-6">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-2xl bg-cream border-[2.5px] border-ink flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{item.emoji}</span>
                          <div>
                            <h4 className="font-heading font-bold text-sm text-ink">{item.name}</h4>
                            <span className="text-xs font-bold text-gray-500">${item.price} each</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 rounded-lg bg-white border-[2px] border-ink"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="font-mono-code font-bold text-sm px-1.5">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 rounded-lg bg-white border-[2px] border-ink"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="p-4 rounded-2xl bg-sunny border-[3px] border-ink flex items-center justify-between font-heading font-black text-lg">
                      <span>Total Amount:</span>
                      <span>${totalAmount}</span>
                    </div>

                    <button
                      onClick={() => setCheckoutStep(2)}
                      className="w-full py-4 rounded-2xl bg-mint text-ink border-[3.5px] border-ink font-heading font-black text-base shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Proceed to Shipping</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Shipping */}
            {checkoutStep === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Recipient Name:</label>
                  <input
                    type="text"
                    defaultValue="Alex Adventurer"
                    className="w-full p-3 rounded-xl bg-cream border-[2.5px] border-ink font-semibold text-sm outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 mb-1">Delivery Address:</label>
                  <input
                    type="text"
                    defaultValue="77 Balloon Street, Toy Town, Doodle Valley"
                    className="w-full p-3 rounded-xl bg-cream border-[2.5px] border-ink font-semibold text-sm outline-none"
                  />
                </div>
                <button
                  onClick={() => setCheckoutStep(3)}
                  className="w-full py-3.5 rounded-2xl bg-sky text-ink border-[3.5px] border-ink font-heading font-black text-base shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-4 h-4" /> Next: Payment Method
                </button>
              </div>
            )}

            {/* Step 3: Payment */}
            {checkoutStep === 3 && (
              <div className="space-y-4 text-center">
                <div className="p-5 rounded-2xl bg-cream border-[3px] border-ink">
                  <span className="text-3xl block mb-2">💳</span>
                  <span className="font-heading font-bold text-base block text-ink">
                    Toy Token Instant Express Card
                  </span>
                  <span className="text-xs text-gray-500 font-mono-code block mt-1">**** **** **** 2026</span>
                </div>
                <button
                  onClick={completeCheckout}
                  className="w-full py-4 rounded-2xl bg-bubblegum text-white border-[3.5px] border-ink font-heading font-black text-lg shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all"
                >
                  Confirm & Pay ${totalAmount}
                </button>
              </div>
            )}

            {/* Step 4: Order Dispatched */}
            {checkoutStep === 4 && (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-mint border-[3px] border-ink shadow-neo-sm flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8 text-ink" />
                </div>
                <h3 className="font-heading font-black text-2xl text-ink mb-2">Order Confirmed!</h3>
                <p className="text-sm font-semibold text-gray-600 mb-6">
                  Your Doodle toy parcel is packed and on its way across the valley!
                </p>
                <button
                  onClick={() => {
                    setCart([]);
                    setCheckoutStep(1);
                    setIsCartOpen(false);
                    playSound('pop');
                  }}
                  className="px-8 py-3 rounded-2xl bg-sunny border-[3px] border-ink font-heading font-bold text-sm text-ink shadow-neo-sm"
                >
                  Back to Emporium
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
