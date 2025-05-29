import { useEffect, useState } from 'react';

interface GlyphEditorProps {
    letter: string;
    onChange: (pixels: boolean[]) => void;
    initialPixels?: boolean[];
}

const GlyphEditor = ({ letter, onChange, initialPixels }: GlyphEditorProps) => {
    const defaultGrid = Array(154).fill(false);
    const [pixels, setPixels] = useState<boolean[]>(initialPixels || defaultGrid);
    const [isDrawing, setIsDrawing] = useState(false);
    const [drawMode, setDrawMode] = useState<boolean | null>(null); // true = draw, false = erase

    useEffect(() => {
        const newPixels = initialPixels || defaultGrid;
        setPixels(newPixels);
    }, [letter, initialPixels]);

    useEffect(() => {
        const handleMouseUp = () => {
            setIsDrawing(false);
            setDrawMode(null);
        };
        window.addEventListener('mouseup', handleMouseUp);
        return () => window.removeEventListener('mouseup', handleMouseUp);
    }, []);

    const applyDrawMode = (index: number) => {
        if (drawMode === null) return;
        const updated = [...pixels];
        updated[index] = drawMode;
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
                        onMouseDown={() => {
                            setIsDrawing(true);
                            setDrawMode(!active);
                            const updated = [...pixels];
                            updated[idx] = !active;
                            setPixels(updated);
                            onChange(updated);
                        }}
                        onMouseEnter={() => {
                            if (isDrawing) applyDrawMode(idx);
                        }}
                        className={`w-4 h-4 cursor-pointer ${active ? 'bg-black' : 'bg-white'}`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default GlyphEditor;
