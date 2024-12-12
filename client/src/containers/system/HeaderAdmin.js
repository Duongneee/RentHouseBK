import React from 'react';

const Header = () => {
    return (
        <header className="w-full h-[60px] flex items-center justify-between bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
            {/* Logo Section */}
            <div className="flex items-center justify-center w-[260px] h-full bg-blue-800 shadow-inner">
                <h1 className="text-2xl font-bold uppercase tracking-wider">
                    Phòng Trọ BK
                </h1>
            </div>


        </header>
    );
};

export default Header;
