import React from 'react'
import Sidebar from '../../components/Sidebar'
import Hero from '../../components/home/Hero'
import Footer from '../../components/Footer'
import Phero from '../../components/popular/Phero'


const Popular = () => {
  return (
    <section>
    <section className='w-full h-full bg-dark_theme  flex justify-center font-bai'>
          <Sidebar/>
          <Phero/>
    </section>
    <Footer/>

    </section>

  )
}

export default Popular
