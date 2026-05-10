import { useContext, useEffect, useState, useCallback, type ChangeEvent } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import type { ProductType } from '../types/assets';
import { IoMdClose } from "react-icons/io";
import PriceFilter from '@/components/Filters/PriceFilter';
import ColorFilter from '@/components/Filters/ColorFilter';
import GreyHeaderSection from '@/components/GreyHeaderSection';
import OurPolicy from '@/components/OurPolicy';

const Collection = () => {

  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, SetShowFilter] = useState<boolean>(false);
  const [filterProducts, setFilterProducts] = useState<ProductType[]>([]);

  // Filtering States
  const [category, setCategory] = useState<string[]>([]); // [men]
  const [subCategory, setSubCategory] = useState<string[]>([]);
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [priceRangefilters, setPriceRangeFilters] = useState({
    min: 0,
    max: 500
  });

  const [sortType, setSortType] = useState<string>('relavent');



  const toggleCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setCategory(curr =>
      curr.includes(value) ? curr.filter(item => item !== value) : [...curr, value]
    );



  }

  const toggleSubCategory = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setSubCategory(curr =>
      curr.includes(value)
        ? curr.filter(item => item !== value) :
        [...curr, value]
    );
  }

  const handlePriceChange = useCallback((min: number, max: number) => {
    // setPriceRangeFilters({ min, max })
    setPriceRangeFilters(
      prev => {
        if (prev.min === min && prev.max === max) {
          return prev;
        }
        return { min, max };
      }
    )
  }, []);

  const toggleSize = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSize(curr =>
      curr.includes(value)
        ? curr.filter(item => item !== value) : //'s' !== 'M' 
        [...curr, value]
    )
  }
  const toggleColor = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setColor(curr =>
      curr.includes(value) ?
        curr.filter(item => item !== value) :
        [...curr, value]
    );
  }

  // useEffect(() => {
  //   console.log(color)
  // }, [color])

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) { // ['men']
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    // ---Filter by Price Range ---
    productsCopy = productsCopy.filter(item =>
      item.price >= priceRangefilters.min && item.price <= priceRangefilters.max
    );

    if (color.length > 0) {
      productsCopy = productsCopy.filter(item =>
        item.colors?.some(productColor => productColor && color.includes(productColor))
      )
    }
    // filter by size
    if (size.length > 0) {
      productsCopy = productsCopy.filter(item =>
        item.sizes?.some(productSize => productSize && size.includes(productSize))
      );
    }
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
  }, [category, subCategory, search, showSearch, products, size, color, priceRangefilters.min, priceRangefilters.max]);


  useEffect(() => {
    sortProduct();
  }, [sortType]);

  const path = [
    { to: '/', text: 'Home' },
  ]

  return (
    <div className='w-full border-t'>


      <GreyHeaderSection path={path} title='Collection' />



      <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10  border-gray-200 '>
        {/* Left side  */}
        {/* Filter options */}
        <div className='min-w-60'>
          <p onClick={() => SetShowFilter((prev) => !prev)} className='my-2 text-lg flex items-center cursor-pointer gap-2 font-maison font-semibold text-primary'>Filter Options
            <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
          </p>


          {/* Category Filter */}
          <div className={`border border-gray-300 px-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-semibold tracking-wider text-primary uppercase'>Category</p>
            <div className='flex flex-col gap-2 text-sm font-light text-muted-background'>
              {['Men', 'Women', 'Kids'].map((item) => (
                <label key={item} className='flex gap-2 cursor-pointer hover:text-black items-center'>
                  <input className='w-3 h-3 accent-brand-brown cursor-pointer' type="checkbox" value={item} onChange={toggleCategory} /> {item}
                </label>
              ))}
            </div>
          </div>

          {/* subcategory filter */}
          <div className={`border border-gray-300 px-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-semibold tracking-wider text-primary uppercase'>Type</p>
            <div className='flex flex-col gap-2 text-sm font-light text-muted-background'>
              {['Topwear', 'Bottomwear', 'Winterwear', 'T-shirts', 'Handbags', 'Jackets and Coats', 'Watches', 'Hats'].map((item) => (
                <label key={item} className='flex gap-2 cursor-pointer  hover:text-black items-center'>
                  <input className='w-3 h-3 accent-brand-brown cursor-pointer' type="checkbox" value={item} onChange={toggleSubCategory} /> {item}
                </label>
              ))}
            </div>
          </div>

          {/* price slider filter */}

          <div className={`border border-gray-300 px-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <PriceFilter onFilterChange={handlePriceChange} />
          </div>
          {/* <PriceFilter onFilterChange={(min, max) => setFilters({ min, max })} /> */}



          {/* Static Color Filter */}
          <div className={`border border-gray-300 px-5 py-3 my-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <ColorFilter onFilterChange={toggleColor} selectedColors={color} />
          </div>


          {/* Static Size Filter */}
          <div className={`border border-gray-300 px-5 py-3 my-6 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-semibold tracking-wider text-primary uppercase'>Size</p>
            <div className='flex flex-col gap-2 text-sm font-light text-muted-background'>
              {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (

                <label key={size} className='flex gap-2 cursor-pointer hover:text-black items-center'>
                  <input className='w-3 h-3 accent-brand-brown' type="checkbox" value={size} onChange={toggleSize} /> {size}
                </label>
              ))}
            </div>
          </div>
        </div>



        {/* Right side */}
        <div className='flex-1'>
          <div className='flex gap-4  justify-between items-center text-base sm:text-2xl mb-4'>
            <p className='text-sm text-primary'>Showing 1-12 of 240 results</p>
            {/* <Title text={'ALL COLLECTION'} /> */}
            <div>
              <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2 py-1.5  '>
                <option value="relavent">Default Sorting</option>
                <option value="low-high">Low to High</option>
                <option value="high-low">High to Low</option>
              </select>
            </div>
          </div>

          {/* all filters list */}
          {/* <div className='flex flex-wrap items-center gap-y-3 gap-x-4 my-5'>
            <p className='text-sm font-semibold whitespace-nowrap'>Active Filter</p>

            <div className='flex flex-wrap items-center gap-2'>
              <div className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm'>
                <span>Women</span>
                <button className='ml-1 hover:text-black font-bold cursor-pointer'>
                  <IoMdClose />
                </button>
              </div>
              <div className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm'>
                <span>Black</span>
                <button className='ml-1 hover:text-black font-bold cursor-pointer'>
                  <IoMdClose />
                </button>
              </div>
              <div className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm'>
                <span>M</span>
                <button className='ml-1 hover:text-black font-bold cursor-pointer'>
                  <IoMdClose />
                </button>
              </div>
              <div className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm'>
                <span>Price: $25.00 - $125.00</span>
                <button className='ml-1 hover:text-black font-bold cursor-pointer'>
                  <IoMdClose />
                </button>
              </div>
              <div className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm'>
                <span>Kids</span>
                <button className='ml-1 hover:text-black font-bold cursor-pointer'>
                  <IoMdClose />
                </button>
              </div>
              <div className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm'>
                <span>Winterwear</span>
                <button className='ml-1 hover:text-black font-bold cursor-pointer'>
                  <IoMdClose />
                </button>
              </div>
              <button className='text-sm underline ml-2 cursor-pointer hover:text-brand-brown whitespace-nowrap'>
                Clear All
              </button>
            </div>
          </div> */}

          {/* all filters list */}
          {(category.length > 0 || subCategory.length > 0 || size.length > 0 || color.length > 0) && (
            <div className='flex flex-wrap items-center gap-y-3 gap-x-4 my-5'>
              <p className='text-sm font-semibold whitespace-nowrap text-primary'>Active Filter</p>

              <div className='flex flex-wrap items-center gap-2'>
                {/* Dynamic Category Badges */}
                {category.map(item => (
                  <div key={item} className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm rounded-sm'>
                    <span>{item}</span>
                    <button onClick={() => setCategory(prev => prev.filter(c => c !== item))} className='ml-1 hover:text-black font-bold cursor-pointer'>
                      <IoMdClose />
                    </button>
                  </div>
                ))}

                {/* Dynamic Sub-Category Badges */}
                {subCategory.map(item => (
                  <div key={item} className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm rounded-sm'>
                    <span>{item}</span>
                    <button onClick={() => setSubCategory(prev => prev.filter(s => s !== item))} className='ml-1 hover:text-black font-bold cursor-pointer'>
                      <IoMdClose />
                    </button>
                  </div>
                ))}

                {/* Dynamic Size Badges */}
                {size.map(item => (
                  <div key={item} className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm rounded-sm'>
                    <span>{item}</span>
                    <button onClick={() => setSize(prev => prev.filter(s => s !== item))} className='ml-1 hover:text-black font-bold cursor-pointer'>
                      <IoMdClose />
                    </button>
                  </div>
                ))}

                {/* Dynamic Color Badges */}
                {color.map(item => (
                  <div key={item} className='flex items-center gap-2 bg-brand-amber px-3 py-2 text-sm rounded-sm'>
                    <span>{item}</span>
                    <button onClick={() => setColor(prev => prev.filter(c => c !== item))} className='ml-1 hover:text-black font-bold cursor-pointer'>
                      <IoMdClose />
                    </button>
                  </div>
                ))}

                {/* Clear All Button */}
                <button
                  onClick={() => {
                    setCategory([]);
                    setSubCategory([]);
                    setSize([]);
                    setColor([]);
                  }}
                  className='text-sm underline ml-2 cursor-pointer hover:text-brand-brown whitespace-nowrap font-medium'
                >
                  Clear All
                </button>
              </div>
            </div>
          )}

          {/* 3 Column Grid with Hover Icons via ProductItem */}

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
            {
              filterProducts.map((item, index) => (
                <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} subCategory={item.subCategory} />
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
      <OurPolicy />
    </div>
  )
}

export default Collection