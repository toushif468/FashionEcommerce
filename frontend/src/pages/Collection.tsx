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
  const [visualMin, setVisualMin] = useState<number>(0);
  const [visualMax, setVisualMax] = useState<number>(500);
  const [subCategory, setSubCategory] = useState<string[]>([]);

  const [sortType, setSortType] = useState<string>('relavent');
  // Pagination States
  // const [currentPage, setCurrentPage] = useState<number>(1);
  // const itemsPerPage = 12;

  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // if (category.includes(value)) {
    //   setCategory((prev) => prev.filter(item => item !== value));
    // }
    // else {
    //   setCategory(prev => [...prev, value]);
    // }

    setCategory(curr =>
      curr.includes(value) ? curr.filter(item => item !== value) : [...curr, value]
    );
    // setCurrentPage(1);


  }

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    //   if(subCategory.includes(value)) {
    //     setCategory((curr) => curr.filter(item=> item !== value));
    //   }
    //   else{
    //     setCategory((curr) => [...curr, value]);
    //   }

    setSubCategory(curr =>
      curr.includes(value)
        ? curr.filter(item => item !== value) :
        [...curr, value]
    );
  }


  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));

    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }
    // Filter by Price Range


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
  }, [category, subCategory, search, showSearch, products, visualMin, visualMax]);


  useEffect(() => {
    sortProduct();
  }, [sortType]);


  // Logic for Pagination
  // const indexOfLastItem = currentPage * itemsPerPage;
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const currentItems = filterProducts.slice(indexOfFirstItem, indexOfLastItem);
  // const totalPages = Math.ceil(filterProducts.length / itemsPerPage);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-200 px-4 sm:px-[5vw]'>
      {/* Left side  */}
      {/* Filter options */}
      <div className='min-w-60'>
        <p onClick={() => SetShowFilter((prev) => !prev)} className='my-2 text-xl flex items-center cursor-pointer gap-2 font-maison font-bold'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>


        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 font-maison'>
            {['Men', 'Women', 'Kids'].map((item) => (
              <label key={item} className='flex gap-2 cursor-pointer hover:text-black'>
                <input className='w-3' type="checkbox" value={item} onChange={toggleCategory} /> {item}
              </label>
            ))}
          </div>
        </div>

        {/* subcategory filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {['Topwear', 'Bottomwear', 'Winterwear', 'T-shirts', 'Handbags', 'Jackets and Coats', 'Watches', 'Hats'].map((item) => (
              <label key={item} className='flex gap-2 cursor-pointer hover:text-black'>
                <input className='w-3' type="checkbox" value={item} onChange={toggleSubCategory} /> {item}
              </label>
            ))}
          </div>
        </div>
        {/* STATIC PRICE SLIDER UI */}
        {/* STATIC PRICE SLIDER UI */}
        <div className={`border border-gray-300 px-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison uppercase tracking-widest'>Price</p>

          <div className="relative h-5 w-full flex items-center">
            {/* 1. The Light Gray Background Track (full width) */}
            <div className="absolute w-full h-1 bg-gray-200 rounded-lg"></div>

            {/* 2. The Dynamic Brown Line (sits between handles) */}
            <div
              className="absolute h-1 bg-[#3f1700] transition-all duration-75"
              style={{
                left: `${(Math.min(visualMin, visualMax) / 500) * 100}%`,
                right: `${100 - (Math.max(visualMin, visualMax) / 500) * 100}%`
              }}
            ></div>

            {/* 3. Minimum Price Slider Input */}

            <input
              type="range"
              min="0"
              max="500"
              value={visualMin}
              onChange={(e) => setVisualMin(Number(e.target.value))}
              className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer accent-[#3f1700] z-10 pointer-events-none"
              style={{
                zIndex: visualMin > 250 ? 10 : 20,
                pointerEvents: 'auto'
              }}
            />

            {/* 4. Maximum Price Slider Input */}
            <input
              type="range"
              min="0"
              max="500"
              value={visualMax}
              onChange={(e) => setVisualMax(Number(e.target.value))}
              className="absolute w-full h-1 bg-transparent appearance-none cursor-pointer accent-[#3f1700] z-10 pointer-events-none"
              style={{
                zIndex: visualMax < 249 ? 30 : 20,
                pointerEvents: 'auto'
              }}
            />
          </div>

          {/* Display current selected price range */}
          <div className="flex justify-between mt-4">
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Min</span>
              <p className='text-sm text-gray-700 font-maison font-bold'>${Math.min(visualMin, visualMax)}.00</p>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[10px] text-gray-400 font-bold uppercase">Max</span>
              <p className='text-sm text-gray-700 font-maison font-bold'>${Math.max(visualMin, visualMax)}.00</p>
            </div>
          </div>
        </div>

        {/* Static Color Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>COLOR</p>
          <div className='flex flex-col gap-2'>
            {['Black', 'Grey', 'Green', 'Red', 'Orange', 'Blue', 'Pink', 'White'].map(color => (
              <p key={color} className='flex items-center gap-2 text-sm font-light font-maison'>
                <span className='w-3 h-3 rounded-full border border-gray-300' style={{ backgroundColor: color.toLowerCase() }}></span> {color}
              </p>
            ))}
          </div>
        </div>
        {/* Static Size Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-bold font-maison'>SIZE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700 font-maison'>
            {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map(size => (
              <p key={size} className='flex gap-2'>
                <input className='w-3 accent-[#3f1700]' type="checkbox" value={size} /> {size}
              </p>
            ))}
          </div>
        </div>
      </div>



      {/* Right side */}
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

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
              // <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} category={item.category} 
              // description={item.description} rating={item.rating || "4.8"}/>
            ))
          }
        </div>

        {/* Pagination Controls */}
        {/* <div className='flex justify-center items-center gap-2 mt-12 mb-10 font-maison'>
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
        </div> */}
      </div>
    </div>
  )
}

export default Collection