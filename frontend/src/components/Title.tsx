// import React from 'react'
interface TitleType {
  text: string;

}
const Title = ({ text}: TitleType) => {
  return (
    <div className='inline-flex gap-2 items-start
     mb-3'>
      <p className='text-[#3e1800] font-semibold '>{text} </p>
      
    </div>
  )
}

export default Title