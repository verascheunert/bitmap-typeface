import { useState } from "react";

interface TypingAreaProps {
    glyphMap: Record<string, boolean[]>;
}

const TypingArea = ({ glyphMap }: TypingAreaProps) => {
    const [text, setText] = useState('');

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value.toLowerCase());
    };

    const renderGlyph = (char: string, idx: number) => {
        const pixels = glyphMap[char] || glyphMap['?'];
        return (
            <div key={idx} className="grid grid-cols-11 gap-px inline-grid mx-0.5">
                {pixels.map((active, i) => (
                    <div key={i} className={`w-2 h-2 ${active ? 'bg-black' : 'bg-white'}`}></div>
                ))}
            </div>
        );
    };

    return (
        <div className="mt-6">
            <input
                type="text"
                value={text}
                onChange={handleInput}
                className="border rounded p-2 mb-4 w-full"
                placeholder="Type here..."
            />
            <div>{[...text].map(renderGlyph)}</div>
        </div>
    );
};

export default TypingArea;
