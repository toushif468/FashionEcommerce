import React, { useState } from 'react'
import { assets, type Category, type Size, type SubCategory } from '../assets/assets'

const Add = () => {
  const [image1, setImage1] = useState<File | null>(null);
  const [image2, setImage2] = useState<File | null>(null);
  const [image3, setImage3] = useState<File | null>(null);
  const [image4, setImage4] = useState<File | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState<Category>("Men");
  const [subCategory, setSubCategory] = useState<SubCategory>("Topwear");
  const [bestseller, setBestseller] = useState<boolean>(false);
  const [sizes, setSizes] = useState<Size[]>([]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2 '>Upload Image</p>

        <div className='flex  gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={assets.upload_area} alt="" />
            {/* typescript assume that if you write (e)=>setImage1(e.target.files[0])} as null and that generate and error if we rewrite this as onchange{setImage(e.target.files && e.target.files[0] ? etarget.files[0] : null)}. we are essentailly telling typescript that if the e,target.value doesnot have a file in it then donot trigger the codintion. */}
            <input onChange={(e) => setImage1(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
              type="file" id='image1' hidden />
          </label>

          <label htmlFor="image2">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files && e.target.files[0] ? e.target.files[0] : null)} type="file" id='image2' hidden />
          </label>

          <label htmlFor="image3">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files && e.target.files[0] ? e.target.files[0] : null)} type="file" id='image3' hidden />
          </label>

          <label htmlFor="image4">
            <img className='w-20' src={assets.upload_area} alt="" />
            <input onChange={(e) => setImage1(e.target.files && e.target.files[0] ? e.target.files[0] : null)} type="file" id='image4' hidden />
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p>Product name</p>
        <input className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='write content here' required />
      </div>

      <div>
        <div>
          <p className='mb-2'>Product catgory</p>
          <select className='w-full px-3 py-2' name="" id="">
            <option value="Men"></option>
            <option value="Women"></option>
            <option value="kids"></option>
          </select>
        </div>
      </div>

      <div>
        <div>
          <p className='mb-2'>Sub catgory</p>
          sel
          <select className='w-full px-3 py-2' name="" id="">
            <option value="Topwear ">Topwear</option>
            <option value="Bottom wear">Bottomwear</option>
            <option value="Winter wear">Winterwear</option>
          </select>
        </div>
      </div>

      <div>
        <p className='mb-2'>Product price</p>
        <input className='w-full px-3 py-2 sm:w-[120px]' type="Number" placeholder='25' />
      </div>

      <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          <div>
            <p className={' bg-slate-200 cursor-pointer px-3 py-1 '} >S</p>
          </div>

          <div>
            <p className={' bg-slate-200 cursor-pointer px-3 py-1 '}>M</p>
          </div>

          <div>
            <p className={' bg-slate-200 cursor-pointer px-3 py-1 '}>L</p>
          </div>

          <div>
            <p className={'bg-slate-200 cursor-pointer px-3 py-1 '}>XL</p>
          </div>

          <div>
            <p className={' bg-slate-200 cursor-pointer px-3 py-1 '} >XXL</p>
          </div>
        </div>
      </div>

      <div>
        <input type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">ADD TO BESTSELLER</label>

      </div>
      <button type='submit' className='w-28 py-3 mt-4 bg-black text-white' >ADD</button>
    </form>
  )
}

export default Add