import type { ChangeEvent } from "react";

interface ColorFilterProps {
    onFilterChange: (e: ChangeEvent<HTMLInputElement>) => void;
    selectedColors: string[];
}

const ColorFilter = ({ onFilterChange, selectedColors }: ColorFilterProps) => {
    const colors = ['Black', 'Grey', 'Green', 'Red', 'Orange', 'Blue', 'Pink', 'White'];

    return (
        <div>
            <p className='mb-3 text-sm font-semibold tracking-wider text-primary uppercase'>Color</p>
            <div className='flex flex-col gap-2'>
                {colors.map(colorName => {
                    const isSelected = selectedColors.includes(colorName);

                    return (
                        <label key={colorName} className='flex items-center gap-3 text-sm font-light cursor-pointer group'>
                            <input
                                type="checkbox"
                                value={colorName}
                                onChange={onFilterChange}
                                checked={isSelected}
                                className="hidden peer"
                            />

                            <div className="relative flex items-center justify-center w-5 h-5">
                                <span
                                    className={`absolute inset-0 border border-ring rounded-full transition-all duration-200 ${isSelected ? 'opacity-100 scale-80' : 'opacity-0 scale-75'
                                        }`}
                                />

                                <span
                                    className="w-3 h-3 rounded-full border border-muted z-10"
                                    style={{ backgroundColor: colorName.toLowerCase() }}
                                />
                            </div>

                            {/* 3. The Label Text */}
                            <span className={`transition-colors duration-200 text-primary ${isSelected ? 'font-medium text-black' : 'group-hover:text-black'
                                }`}>
                                {colorName}
                            </span>
                        </label>
                    );
                })}
            </div>
        </div>
    );
};

export default ColorFilter;