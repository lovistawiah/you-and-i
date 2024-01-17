import React from 'react'

const WelcomeText = () => {
  return (
      <section className='w-[291px] h-[98px] py-2 bg-white flex-col justify-start items-center inline-flex'>
          <span className='text-black text-[32px] font-normal '>
              Welcome to,
          </span>
          <div className='w-[291px] h-[47px] px-[37px] justify-end items-center gap-[27px] inline-flex'>
              <span className='text-center text-blue-600 text-[32px] font-normal '> You and I </span>
          </div>
      </section>
  )
}

export default WelcomeText