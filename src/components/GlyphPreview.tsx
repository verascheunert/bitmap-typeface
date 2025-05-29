interface GlyphPreviewProps {
    pixels: boolean[];
    letter: string;
    onClick: () => void;
}

const GlyphPreview = ({ pixels, letter, onClick }: GlyphPreviewProps) => (
    <div className="cursor-pointer" onClick={onClick}>
        <p className="text-center">{letter}</p>
        <div className="grid grid-cols-11 gap-px w-fit">
            {pixels.map((active, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 ${active ? 'bg-black' : 'bg-gray-200'}`}></div>
            ))}
        </div>
    </div>
);

export default GlyphPreview;
