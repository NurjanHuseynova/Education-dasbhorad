import React from "react";

function ProContainer({ children, containerToggle }) {
    return (
        <div
            className={`pro-container px-[1rem] mx-auto w-full relative  bg-gray-100 ${
                containerToggle ? "pro-container-open" : "new-open"
            }`}
        >
            {children}
        </div>
    );
}

export default ProContainer;