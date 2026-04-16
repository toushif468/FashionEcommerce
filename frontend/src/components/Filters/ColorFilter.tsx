import type { ChangeEvent } from "react";

interface ColorFilterProps {
    onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedColors: string[];
}
const ColorFilter = ({ onFilterChange, selectedColors }: ColorFilterProps) => {
    return (
        <div>
            <p className='mb-3 text-sm font-semibold tracking-wider text-primary uppercase'>Color</p>
            <div className='flex flex-col gap-2'>
                {['Black', 'Grey', 'Green', 'Red', 'Orange', 'Blue', 'Pink', 'White'].map(colorName => (
                    <label key={colorName} className='flex items-center gap-3 text-sm font-light cursor-pointer group' >
                        <input
                            type="checkbox"
                            value={colorName}
                            onChange={onFilterChange}
                            checked={selectedColors.includes(colorName)}
                            className="hidden peer"
                        />
                        <div className="relative flex items-center justify-center">
                            {/* it used create a border circle */}
                            <span className={`absolute w-5 h-5 border border-brand-brown/10 rounded-full transition-opacity duration-200 ${selectedColors.includes(colorName) ? 'opacity-100' : 'opacity-0'}`}></span>
                            {/* to fill the background color */}
                            <span className="w-3 h-3 rounded-full border-gray-300 z-10" style={{ backgroundColor: colorName.toLowerCase() }}>
                            </span>
                        </div>
                        <span className={`transition-colors duration-200 text-primary ${selectedColors.includes(colorName) ? ' font-medium' : ' group-hover:text-black'}`}>
                            {colorName}
                        </span>

                    </label>
                ))}
            </div>
        </div >
    )
}

export default ColorFilter