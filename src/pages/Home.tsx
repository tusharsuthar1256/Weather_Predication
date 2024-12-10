import { Link } from 'react-router-dom';
import { Cloud, Droplet, Github, Linkedin, MoveRight, MoveUpRight, Sprout, Twitter, X } from 'lucide-react';
import { Card } from '../components/Card';
import { useLanguage } from '../contexts/LanguageContext';
import img from "../image/irrigationImg.jpg"
import rainImg from "../image/rain.png";
import plantImg from "../image/roots.png";
import soilImg from "../image/soil.png";

export function Home() {

 return (
  <>
<div className="h-screen w-full bg-white relative px-8 dark:bg-gray-900  pl-[32px] pr-0 pb-[32px]">
  <div className='h-full w-full '>

  <div className="absolute z-10 px-8 ">
    <p className="text-8xl flex flex-col leading-[85px] tracking-[6px] font-extrabold text-black mt-2 dark:text-white " style={{wordSpacing:'10px',}}><span>The</span><span>future of</span><span>irrigation</span><span>is now</span></p>
   
   <p className='w-[420px] text-[14px] mt-5 dark:text-white'>Optimize farming with real-time weather, water tracking, and soil moisture insights for healthier crops!</p>
   <div className='mt-5 w-full flex items-center mb-0'>
    <button className='px-6 py-2 bg-black text-white  dark:bg-gray-400 dark:text-black'>View Details</button>
    <button className='px-2  py-2 bg-white text-black  flex justify-evenly shadow-sm ml-4 w-[150px]'>Get started<MoveRight/></button>
   </div>
  </div>

  <img
    src={img}
    className="absolute right-0  w-[60%] h-[calc(100vh-96px)] z-0"
    alt=""
  />
  </div>
</div>
<div className='h-screen w-full bg-white pb-[20px] px-[60px] dark:bg-gray-900'>
  <div className='h-full w-full  p-0 dark:text-white'>
    <h1 className='text-[70px] font-extrabold h-[100px] mt-0'>Our services</h1>
    <div className='h-[calc(100vh-150px)] mt-[20px]   flex justify-center items-center gap-32'>
      <div className='w-[33.33%] h-full  flex justify-center items-start flex-col '>
        <p className='text-left mb-6 text-gray-400'>01</p><img src={rainImg} className=' h-[170px] flex justify-center items-center w-full object-contain' alt="" /><h2 className='text-[24px] font-bold mt-8 mb-4'>Weather predication</h2><p className='text-[13px]'>Stay prepared with accurate, real-time weather forecasts. Using advanced algorithms, we deliver insights on temperature, precipitation, and humidity to help you plan effectively.</p>
        <Link to='/weather'>
        <button className='flex justify-center items-center text-[14px] font-medium h-[24px] w-auto mt-4'>explore<MoveUpRight size={14}/> </button>
        </Link>
        </div>
      <div className='w-[33.33%] h-full  flex justify-center items-start flex-col'>
        <p className='text-left mb-6 text-gray-400'>02</p><img src={plantImg} className='h-[170px] flex justify-center items-center w-full object-contain' alt="" /><h2 className='text-[24px] font-bold mt-8 mb-4'>Plant Water consumption</h2><p className='text-[13px]'>Efficiently manage water usage with our calculator, tailored to your plants' needs. Prevent overwatering and conserve resources for a sustainable future.</p>
        <Link to="/water-calculator">
        <button  className='flex justify-center items-center text-[14px] font-medium h-[24px] w-auto mt-4'>explore<MoveUpRight size={14}/> </button>
        </Link>
        </div>
      <div className='w-[33.33%] h-full  flex justify-center items-start flex-col'>
        <p className='text-left mb-6 text-gray-400'>03</p><img src={soilImg} className='h-[170px] flex justify-center items-center w-full object-contain' alt="" /><h2 className='text-[24px] font-bold mt-8 mb-4'>Soil moisture calculation</h2><p className='text-[13px]'>Enhance agriculture with precise soil moisture insights and smart tools. Determine ideal water levels, reduce wastage, and boost crop productivity effortlessly.</p>
        <Link to="/soil-moisture">
        <button  className='flex justify-center items-center text-[14px] font-medium h-[24px] w-auto mt-4'>explore<MoveUpRight size={14}/> </button>
        </Link></div>
    
      
    </div>
  </div>
</div>
<hr />
<footer className='w-full h-[50px] bg-white flex justify-between items-center px-[60px] dark:text-white dark:bg-gray-900'>
<div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-6 w-6 text-green-600 sm:h-8 sm:w-8" />
              <span className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
                GreenCalc
              </span>
            </Link>
          </div>
 
</footer>



  </>
 )
}