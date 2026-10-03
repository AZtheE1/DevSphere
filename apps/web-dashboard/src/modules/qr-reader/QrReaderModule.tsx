'use client';

import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import anime from 'animejs';
import { useGlobalStore } from '@/store/useGlobalStore';
import { Sparkles, QrCode, Scan, Download, Sparkle, Camera, RefreshCw } from 'lucide-react';

export const QrReaderModule: React.FC = () => {
  const [mode, setMode] = useState<'scan' | 'generate'>('generate');
  const [inputText, setInputText] = useState('https://doodleland.dev/apps');
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [qrColor, setQrColor] = useState('#1E1B4B');
  const [centerEmoji, setCenterEmoji] = useState('🎪');
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const { playSound, addXP } = useGlobalStore();
  const laserRef = useRef<HTMLDivElement>(null);

  // Generate QR Code data URL
  useEffect(() => {
    if (!inputText) return;
    QRCode.toDataURL(inputText, {
      width: 320,
      margin: 2,
      color: {
        dark: qrColor,
        light: '#FFFFFF',
      },
    }).then((url) => {
      setQrDataUrl(url);
    });
  }, [inputText, qrColor]);

  // Anime.js Laser Scanner Sweep
  useEffect(() => {
    if (mode === 'scan' && laserRef.current) {
      const anim = anime({
        targets: laserRef.current,
        translateY: [0, 200],
        direction: 'alternate',
        loop: true,
        duration: 1200,
        easing: 'easeInOutSine',
      });
      return () => anim.pause();
    }
  }, [mode]);

  const handleSimulateScan = () => {
    setIsScanning(true);
    setScannedResult(null);
    playSound('laser');

    setTimeout(() => {
      const samples = [
        'https://doodleland.dev/quest/level-10',
        'SECRET_PASSCODE_VOYAGER_2026',
        'https://github.com/doodleland-suite',
        '🎪 You discovered a secret Toy Ticket! (+50 XP)',
      ];
      const result = samples[Math.floor(Math.random() * samples.length)];
      setScannedResult(result);
      setIsScanning(false);
      playSound('win');
      addXP(30);
    }, 1500);
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = `sticker-qr-${Date.now()}.png`;
    a.click();
    playSound('pop');
    addXP(15);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 bg-[#9B5DE5] text-white p-6 rounded-3xl border-[4px] border-[#1E1B4B] shadow-neo-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#1E1B4B] font-bold text-xs border-[2px] border-[#1E1B4B] mb-2 shadow-neo-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
            App 06 • Stitch UI Model
          </div>
          <h1 className="text-3xl font-heading font-black">Detective QR Studio & Radar</h1>
          <p className="text-sm font-semibold text-white/90 mt-1">
            Custom logo sticker QR generator with peeling preview & simulated radar scanner.
          </p>
        </div>

        {/* Mode Selector */}
        <div className="flex items-center gap-2 bg-white/20 p-1.5 rounded-2xl border-[3px] border-[#1E1B4B]">
          <button
            onClick={() => {
              setMode('generate');
              playSound('click');
            }}
            className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all ${
              mode === 'generate' ? 'bg-[#FFD93D] text-[#1E1B4B] border-[2px] border-[#1E1B4B] shadow-neo-sm' : 'text-white'
            }`}
          >
            🎨 Generator
          </button>
          <button
            onClick={() => {
              setMode('scan');
              playSound('click');
            }}
            className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all ${
              mode === 'scan' ? 'bg-[#FFD93D] text-[#1E1B4B] border-[2px] border-[#1E1B4B] shadow-neo-sm' : 'text-white'
            }`}
          >
            🔍 Radar Scan
          </button>
        </div>
      </div>

      {/* Mode 1: Sticker QR Generator */}
      {mode === 'generate' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="md:col-span-6 bg-white p-6 sm:p-8 rounded-[32px] border-[4px] border-[#1E1B4B] shadow-neo-lg">
            <h2 className="font-heading font-bold text-lg text-[#1E1B4B] mb-4 flex items-center gap-2">
              <QrCode className="w-5 h-5 text-[#9B5DE5]" />
              Sticker QR Parameters
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Target URL / Text Content:
                </label>
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-[#FFF8E7] border-[2.5px] border-[#1E1B4B] font-mono-code text-sm text-[#1E1B4B] outline-none focus:bg-white focus:ring-2 focus:ring-[#4CC9F0]"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Center Emoji Badge:
                </label>
                <div className="flex items-center gap-2">
                  {['🎪', '⭐', '🚀', '🐾', '💎', '🔥'].map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => setCenterEmoji(emoji)}
                      className={`w-10 h-10 rounded-xl border-[2px] border-[#1E1B4B] text-xl flex items-center justify-center transition-all ${
                        centerEmoji === emoji ? 'bg-[#FFD93D] shadow-neo-sm scale-110' : 'bg-[#FFF8E7]'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                  Pattern Ink Color:
                </label>
                <div className="flex items-center gap-2">
                  {['#1E1B4B', '#FF6B9D', '#006780', '#ac2a5d', '#705d00'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setQrColor(color)}
                      className={`w-8 h-8 rounded-full border-[2.5px] border-[#1E1B4B] transition-all ${
                        qrColor === color ? 'scale-125 ring-2 ring-[#1E1B4B]' : ''
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Peeling Sticker Preview */}
          <div className="md:col-span-6 bg-[#FFF8E7] p-8 rounded-[32px] border-[4px] border-[#1E1B4B] shadow-neo-xl flex flex-col items-center">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
              Peeling Sticker Output
            </span>

            <div className="relative p-6 bg-white rounded-3xl border-[4px] border-[#1E1B4B] shadow-neo-lg hover:rotate-1 transition-transform mb-6">
              {qrDataUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qrDataUrl} alt="QR Code" className="w-52 h-52 rounded-xl" />
              )}
              {centerEmoji && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-2xl border-[3px] border-[#1E1B4B] shadow-neo-sm flex items-center justify-center text-2xl">
                  {centerEmoji}
                </div>
              )}
            </div>

            <button
              onClick={downloadQR}
              className="px-6 py-3 rounded-2xl bg-[#6BE585] text-[#1E1B4B] border-[3px] border-[#1E1B4B] font-heading font-black text-sm shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" /> Download High-Res Sticker
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: Simulated Radar Scanner */}
      {mode === 'scan' && (
        <div className="bg-white p-8 rounded-[32px] border-[4px] border-[#1E1B4B] shadow-neo-xl text-center">
          <h2 className="text-2xl font-heading font-black text-[#1E1B4B] mb-2">
            Detective Magnifier Radar
          </h2>
          <p className="text-sm font-semibold text-gray-600 mb-6">
            Position any barcode or QR code inside the viewfinder reticle.
          </p>

          <div className="relative w-64 h-64 mx-auto mb-8 bg-[#1A1838] rounded-3xl border-[4px] border-[#1E1B4B] shadow-neo-lg overflow-hidden flex items-center justify-center">
            {/* Viewfinder Target */}
            <div className="w-44 h-44 rounded-2xl border-2 border-dashed border-[#4CC9F0] flex items-center justify-center relative">
              <Camera className="w-8 h-8 text-white/40" />
              {/* Laser Sweep Bar */}
              <div
                ref={laserRef}
                className="absolute top-0 left-0 w-full h-1 bg-[#FF6B9D] shadow-[0_0_12px_#FF6B9D]"
              />
            </div>
          </div>

          <div className="mb-6">
            <button
              onClick={handleSimulateScan}
              disabled={isScanning}
              className="px-8 py-3.5 rounded-2xl bg-[#FFD93D] border-[3.5px] border-[#1E1B4B] font-heading font-black text-base text-[#1E1B4B] shadow-neo hover:translate-y-[-2px] active:translate-y-[2px] transition-all flex items-center gap-2 mx-auto disabled:opacity-50"
            >
              <Scan className="w-5 h-5" />
              <span>{isScanning ? 'Decoding Matrix...' : 'Simulate Camera Capture'}</span>
            </button>
          </div>

          {scannedResult && (
            <div className="p-4 rounded-2xl bg-[#FFF8E7] border-[3px] border-[#1E1B4B] max-w-md mx-auto text-left animate-bounce">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">
                Decoded Payload:
              </span>
              <p className="font-mono-code text-sm font-black text-[#1E1B4B] break-all">
                {scannedResult}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
