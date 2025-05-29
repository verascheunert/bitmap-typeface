"use client";

import { useState } from 'react';
import Image from 'next/image';
import close from '../../public/close.svg';
import undo from '../../public/undo.svg';
import check from '../../public/check.svg';
import GlyphEditor from '@/components/GlyphEditor';
import GlyphPreview from '@/components/GlyphPreview';
import TypingArea from '@/components/TypingArea';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Home() {
  const [glyphMap, setGlyphMap] = useState<Record<string, boolean[]>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center">Bitmap Typeface Creator</h1>
      <div className="grid grid-cols-13 gap-4 mt-6">
        {alphabet.map((letter) => (
          <GlyphPreview
            key={letter}
            letter={letter}
            pixels={glyphMap[letter] || Array(154).fill(false)}
            onClick={() => setSelectedLetter(letter)}
          />
        ))}
      </div>

      {selectedLetter && (
        <div className="mt-6 flex flex-col items-center">
          <GlyphEditor
            letter={selectedLetter}
            initialPixels={glyphMap[selectedLetter]}
            onChange={(pixels) =>
              setGlyphMap((prev) => ({ ...prev, [selectedLetter]: pixels }))
            }
          />
          < div className="flex gap-1">
            <button
              className="mt-4 px-2 py-2 bg-white text-black rounded cursor pointer"
              onClick={() => setSelectedLetter(null)}
            >
              <Image src={close} alt="Close Editor" width={24} height={24} />
            </button>
            <button
              className="mt-4 px-2 py-2 bg-white text-black rounded cursor-pointer"
              onClick={() => setGlyphMap({ ...glyphMap, [selectedLetter]: Array(154).fill(false) })}
            >
              <Image src={undo} alt="Reset Glyph" width={24} height={24} />
            </button>
            <button
              className="mt-4 px-2 py-2 bg-white text-black rounded cursor-pointer"
              onClick={() => setSelectedLetter(null)} // Closing the editor as glyph is saved automatically
            >
              <Image src={check} alt="Save Glyph" width={24} height={24} />
            </button>
          </div>
        </div>
      )
      }

      <TypingArea glyphMap={{ ...glyphMap, '?': Array(154).fill(false) }} />
    </div >
  );
}
