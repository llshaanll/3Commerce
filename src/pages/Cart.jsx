import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="min-h-screen w-screen flex items-stretch">
      {/* Menu Button (visible when menu is closed) */}
      {!menuOpen && (
        <button 
          onClick={toggleMenu}
          className="fixed left-0 top-0 m-4 p-2 bg-white border rounded-md z-30"
        >
          ☰ Menu
        </button>
      )}
      
      {/* Side Menu */}
      <div className={`
        fixed right-0 top-0 h-full w-64 bg-white shadow-lg
        transition-transform duration-300 ease-in-out
        ${menuOpen ? 'translate-x-0' : '-translate-x-full'}
        z-30 p-10
      `}>
        <button 
          onClick={toggleMenu}
          className="absolute right-4 top-4 text-xl"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Menu</h2>
        <ul>
          <li className="py-2"><a href="home">Home</a></li>
          <li className="py-2">Orders</li>
          <li className="py-2"><a href="cart">Cart</a></li>
          <li className="py-2">Profile</li>
        </ul>
      </div>
      
      {/* Overlay when menu is open */}
      {menuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={toggleMenu}
        />
      )}
      <div className='w-full border-10 flex-3'>
      <div className="border-1 flex-3 flex flex-wrap p-10 gap-15">
        {[...Array(2)].map((_, i) => (
          <ClothCard
            key={i}
            index={i}
            hoveredIndex={hoveredIndex}
            setHoveredIndex={setHoveredIndex}
          />
        ))}
      </div>
      <div>
        <button className='border-1 w-full hover:bg-black hover:text-white duration-300 font-bold'>
            Buy
        </button>
      </div>
      </div>
      <div className='flex-1'>
        Items detail
      </div>
    </div>
  );
};

export default Cart;

const ClothCard = ({ index, hoveredIndex, setHoveredIndex, setHovered }) => {
  const isHovered = hoveredIndex === index;
  const isAnotherHovered = hoveredIndex !== null && !isHovered;
  const navigate = useNavigate();
  function handleHover(index){
    setHoveredIndex(index) 
    setHovered(true)
  }

  function handleHoverExit(){
    setHoveredIndex(null)
    setHovered(false)
  }

  return (
    <div
      onMouseEnter={() => handleHover(index)}
      onMouseLeave={handleHoverExit}
      className={`md:h-[300px] md:w-[200px] flex flex-col relative
        group duration-300
        ${isHovered && hoveredIndex === index ? 'scale-102 z-20' : ''}
        ${isAnotherHovered ? 'pointer-events-none' : 'pointer-events-auto'}
      `}
    >
      <div
        className={`border-1 bg-white group-hover:shadow-xl/20 flex-4 group-hover:scale-102 duration-300 relative z-10`}
      >
        Canvas
      </div>
      <div
        className={`flex-1 flex flex-col
          duration-300 transition-all
          relative z-10
        `}
      >
        <div id="brand-name" className="font-bold">
          Malkov's
        </div>
        <div>
          Price: <span className="font-bold">$1899</span>
        </div>
        <div>
          <button onClick={()=> navigate('/cart')} className="border-1 w-full bg-white hover:bg-red-500 hover:text-white group-hover:shadow-xl/30 duration-300">
            Remove from cart
          </button>
        </div>
      </div>
    </div>
  );
};