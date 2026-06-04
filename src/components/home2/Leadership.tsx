
import Image from 'next/image';
import React from 'react'
import { FaLinkedin } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const Leadership = () => {
  return (
    <section id="connect" className="border-t border-[#e8e8e8] bg-white py-16 lg:py-24">
      <div className="mx-auto container grid gap-12 w-full px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
        <div className='flex flex-col gap-10'>
          <h2 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#006670] lg:text-[2.5rem]">
          Meet our Leadership Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10 items-center">

            <div className="flex flex-col gap-4">

                <Image src="/assets/ajay.png" width="400" height="600" alt="leadership" className="w-fit" />

                <div className="flex justify-between items-center">
                  <h3>
                    Ajay Sharma
                    </h3>
                    <FaLinkedin />

                  
                </div>
                <div className="flex justify-between items-center">
                  <h3 className='text-xs'>
                   Head - Managed Services Business
                    </h3>
                    <MdArrowOutward />

                  
                </div>
              </div>
            <div className="flex flex-col gap-4">

                <Image src="/assets/abhishek.png" width="400" height="600" alt="leadership" className="w-fit" />

                <div className="flex justify-between items-center">
                  <h3>
                    Abhishek  Gupta
                    </h3>
                    <FaLinkedin />

                  
                </div>
                <div className="flex justify-between items-center">
                  <h3 className='text-xs'>
                   Lead Solution Architect - ZerofAI
                    </h3>
                    <MdArrowOutward />

                  
                </div>
              </div>

            </div>
        </div>

      </div>
    </section>
  )
}

export default Leadership

