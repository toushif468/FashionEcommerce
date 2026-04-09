import { useState, useEffect } from 'react';


interface PriceFilterProps {
    onFilterChange: (min: number, max: number) => void;
}

const PriceFilter = ({ onFilterChange }: PriceFilterProps) => {
    const [visualMin, setVisualMin] = useState<number>(0);
    const [visualMax, setVisualMax] = useState<number>(500);
    const maxLimit = 500;

    // This ensures the actual values used for filtering are always correct
    // even if the user slides the "min" handle past the "max" handle.
    const actualMin = Math.min(visualMin, visualMax);
    const actualMax = Math.max(visualMin, visualMax);

    // Communicate changes to the parent whenever the values update
    useEffect(() => {
        onFilterChange(actualMin, actualMax);
    }, [actualMin, actualMax, onFilterChange]);

    return (
        <div className="border border-gray-300 px-5 py-3 mt-6 w-full bg-white">
            <p className="mb-6 text-sm font-bold uppercase tracking-widest text-gray-800">
                Price
            </p>

            <div className="relative h-5 w-full flex items-center">
                {/* 1. Background Track */}
                <div className="absolute w-full h-1 bg-gray-200 rounded-lg"></div>

                {/* 2. Dynamic Brown Line (uses actualMin/Max to handle crossing) */}
                <div
                    className="absolute h-1 bg-[#3f1700] transition-all duration-75"
                    style={{
                        left: `${(actualMin / maxLimit) * 100}%`,
                        right: `${100 - (actualMax / maxLimit) * 100}%`,
                    }}
                ></div>

                {/* 3. Minimum Slider */}
                <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    value={visualMin}
                    onChange={(e) => setVisualMin(Number(e.target.value))}
                    className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none z-20"
                    style={{
                        // When handles are close, we swap Z-index so you can always grab one
                        zIndex: visualMin > maxLimit - 100 ? 40 : 20,
                    }}
                />

                {/* 4. Maximum Slider */}
                <input
                    type="range"
                    min="0"
                    max={maxLimit}
                    value={visualMax}
                    onChange={(e) => setVisualMax(Number(e.target.value))}
                    className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer pointer-events-none z-30"
                    style={{
                        zIndex: visualMax < 100 ? 40 : 30,
                    }}
                />
            </div>

            {/* Labels */}
            <div className="flex justify-between mt-6">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400 tracking-widest">Min</span>
                    <p className="text-sm text-gray-700 font-bold">${actualMin}.00</p>
                </div>
                <div className="flex flex-col text-right">
                    <span className="text-xs text-gray-400 tracking-widest">Max</span>
                    <p className="text-sm text-gray-700 font-bold">${actualMax}.00</p>
                </div>
            </div>

            <style>{`
        /* CRITICAL: The input is click-through, but the thumb is interactive */
        input[type="range"]::-webkit-slider-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          -webkit-appearance: none;
          background: #3f1700;
          border: 2px solid #fff;
        //   box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #3f1700;
          border: 2px solid #fff;
        //   box-shadow: 0 1px 3px rgba(0,0,0,0.3);
          cursor: pointer;
        }
      `}</style>
        </div>
    );
};

export default PriceFilter;