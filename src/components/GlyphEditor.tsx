import { useEffect, useState } from 'react';

interface GlyphEditorProps {
    letter: string;
    onChange: (pixels: boolean[]) => void;
    initialPixels?: boolean[];
}

const GlyphEditor = ({ letter, onChange, initialPixels }: GlyphEditorProps) => {
    const defaultGrid = Array(154).fill(false);
    const [pixels, setPixels] = useState<boolean[]>(initialPixels || Array(154).fill(false));

    // Reset pixels when the letter or initialPixels changes
    useEffect(() => {
        const newPixels = initialPixels || defaultGrid;
        setPixels(newPixels);
    }, [letter, initialPixels]);



    const togglePixel = (index: number) => {
        const updated = [...pixels];
        updated[index] = !updated[index];
        setPixels(updated);
        onChange(updated);
    };

    return (
        <div>
            <h3 className="text-xl mb-2">Letter: {letter}</h3>
            <div className="grid grid-cols-[repeat(11,min-content)] gap-[1px]">
                {pixels.map((active, idx) => (
                    <div
                        key={idx}
                        onClick={() => togglePixel(idx)}
                        className={`w-4 h-4 border border-gray-300 ${active ? 'bg-black' : 'bg-white'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default GlyphEditor;
