// import React from 'react'
interface TitleType {
  text: string;

}
const Title = ({ text }: TitleType) => {
  return (
    <div className='inline-flex gap-2 items-center'>
      <p className='text-brand-brown font-semibold font-maison'>{text} </p>

    </div>
  )
}

export default Title