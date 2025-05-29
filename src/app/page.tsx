"use client";

import { useState } from 'react';
import GlyphEditor from '@/components/GlyphEditor';
import GlyphPreview from '@/components/GlyphPreview';
import TypingArea from '@/components/TypingArea';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

export default function Home() {
  const [glyphMap, setGlyphMap] = useState<Record<string, boolean[]>>({});
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Bitmap Typeface Creator</h1>
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
        <div className="mt-6">
          <GlyphEditor
            letter={selectedLetter}
            initialPixels={glyphMap[selectedLetter]}
            onChange={(pixels) =>
              setGlyphMap((prev) => ({ ...prev, [selectedLetter]: pixels }))
            }
          />
          <button
            className="mt-4 px-4 py-2 bg-gray-200 text-black rounded"
            onClick={() => setSelectedLetter(null)}
          >
            Close Editor
          </button>
        </div>
      )}

      <TypingArea glyphMap={{ ...glyphMap, '?': Array(154).fill(false) }} />
    </div>
  );
}
