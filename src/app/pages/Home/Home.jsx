import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import BgCard from "../../components/BgCard"
import student from "../../../assets/img/student.png"
import ProContainer from '../../components/ProContainer'

function Home() {
  return (
<ProContainer>
<div className='md:flex block'>
    <Sidebar />
<div className='flex flex-col w-full px-3'>
<BgCard classNames=''><h1 className='text-center text-[20px]'>Welcome to my educational platform!</h1></BgCard>
<div className='flex justify-center items-center'>
<img src={student} width={900}/>
</div>

</div>

    
</div>
</ProContainer>


  )
}

export default Home