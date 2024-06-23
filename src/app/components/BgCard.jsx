import React from 'react'

function BgCard({ 
    children,
    classNames = '',
 }) {
    return (
        <div className={`w-full !rounded-[12px] font-semibold mt-3 py-[20px] px-[20px] bg-white text-black ${classNames}`} style={{boxShadow:"0px 0px 10px 0px rgba(0, 0, 0, 0.10)"}}>
            {children}
        </div>
    )
}

export default BgCard