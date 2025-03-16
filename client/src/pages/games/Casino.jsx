import React from 'react'
import Sidebar from '../../components/Sidebar'
import Hero from '../../components/home/Hero'
import Footer from '../../components/Footer'
import Chero from '../../components/casino/Chero'


const Casino = () => {
  return (
    <section>
    <section className='w-full h-full bg-dark_theme  flex justify-center font-bai'>
          <Sidebar/>
          <Chero/>
    </section>
    <Footer/>

    </section>

  )
}

export default Casino
