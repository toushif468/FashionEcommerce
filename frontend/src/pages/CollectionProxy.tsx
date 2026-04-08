import { useContext, useEffect, useState, type ChangeEvent } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
import type { ProductType } from '../types/assets';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, SetShowFilter] = useState<boolean>(false);
  const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);

  // Filtering States
  const [category, setCategory] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sortType, setSortType] = useState<string>('relavent');

  // Pagination States
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory(curr =>
      curr.includes(value) ? curr.filter(item => item !== value) : [...curr, value]
    );
    setCurrentPage(1); // Reset to first page on filter change
  }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    // Filter by Price Range
    productsCopy = productsCopy.filter(item => item.price >= priceRange[0] && item.price <= priceRange[1]);

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, search, showSearch, products, priceRange]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Logic for Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200'>

      {/* --- LEFT SIDE: FILTERS --- */}
      <div className='min-w-60'>
        <p onClick={() => SetShowFilter((prev) => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-maison font-bold'>
          FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>

        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 font-maison'>
            {['Men', 'Women', 'Kids', 'T-Shirts', 'Handbags', 'Jackets and Coats', 'Watches', 'Hats'].map(cat => (
              <p key={cat} className='flex gap-2'>
                <input className='w-3 accent-[#3f1700]' type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
              </p>
            ))}
          </div>
        </div>

        {/* Price Slider Filter */}
        <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>PRICE</p>
          <input 
            type="range" 
            min="0" 
            max="500" 
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([0, Number(e.target.value)])}
            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3f1700]"
          />
          <p className='text-xs mt-2 text-gray-600 font-maison'>$0.00 - ${priceRange[1]}.00</p>
        </div>

        {/* Static Color Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>COLOR</p>
          <div className='flex flex-col gap-2'>
            {['Black', 'Grey', 'Green', 'Red', 'Orange', 'Blue', 'Pink', 'White'].map(color => (
              <p key={color} className='flex items-center gap-2 text-sm font-light font-maison'>
                <span className='w-3 h-3 rounded-full border border-gray-300' style={{backgroundColor: color.toLowerCase()}}></span> {color}
              </p>
            ))}
          </div>
        </div>

        {/* Static Size Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>SIZE</p>
          <div className='flex flex-wrap gap-2 text-sm font-light text-gray-700 font-maison'>
            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
              <p key={size} className='flex gap-2'>
                <input className='w-3 accent-[#3f1700]' type="checkbox" value={size} /> {size}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* --- RIGHT SIDE: PRODUCT GRID --- */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text={'ALL COLLECTION'} />
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 font-maison'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Low to High</option>
            <option value="high-low">High to Low</option>
          </select>
        </div>

        {/* 3 Column Grid with Hover Icons via ProductItem */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10'>
          {currentItems.map((item, index) => (
            <ProductItem 
              key={index} 
              name={item.name} 
              id={item._id} 
              price={item.price} 
              image={item.image} 
              rating={item.rating || "4.8"}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className='flex justify-center items-center gap-2 mt-12 mb-10 font-maison'>
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            className={`px-3 py-1 border rounded ${currentPage === 1 ? 'text-gray-300' : 'hover:bg-gray-100'}`}
          >
            &lt;
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-1 border rounded ${currentPage === i + 1 ? 'bg-[#fedb9b] font-bold' : 'hover:bg-gray-100'}`}
            >
              {i + 1}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            className={`px-3 py-1 border rounded ${currentPage === totalPages ? 'text-gray-300' : 'hover:bg-gray-100'}`}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  )
}

export default Collection;