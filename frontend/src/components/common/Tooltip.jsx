import React from "react";

const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
    left: "right-full top-1/2 -translate-y-1/2 mr-3",
    right: "left-full top-1/2 -translate-y-1/2 ml-3",
};

const arrowClasses = {
    top: "top-full left-1/2 -translate-x-1/2 border-t-slate-800",
    bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-slate-800",
    left: "left-full top-1/2 -translate-y-1/2 border-l-slate-800",
    right: "right-full top-1/2 -translate-y-1/2 border-r-slate-800",
};

const Tooltip = ({
    children,
    text,
    position = "right",
}) => {
    return (
        <div className="relative inline-flex group">
            {children}

            {text && (
                <div
                    className={`
            absolute ${positionClasses[position]}
            pointer-events-none
            opacity-0 scale-95
            group-hover:opacity-100 group-hover:scale-100
            transition-all duration-200 ease-out
            z-50
          `}
                >
                    <div
                        className="
              relative
              px-3 py-2
              rounded-xl
              bg-slate-800/95
              backdrop-blur-md
              border border-slate-700
              text-white text-sm font-medium
              shadow-2xl
              whitespace-nowrap
            "
                    >
                        {text}

                        {/* Arrow */}
                        <div
                            className={`
                absolute w-0 h-0 border-4 border-transparent
                ${arrowClasses[position]}
              `}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;