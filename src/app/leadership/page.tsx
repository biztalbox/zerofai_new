
import { NavigationBar } from '@/components/home2/BridgeSubNav';
import Image from 'next/image';
import { FaLinkedin } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";

const Leadership = () => {



    const teamMembers = [
        {
            name: "Ajay Sharma",
            designation: "Head - Managed Services Business",
            image: "/assets/ajay.png",
        },

        {
            name: "Nischal Maheshwari",
            designation: "Global Delivery Head",
            image: "/assets/nischal.webp",
        },
        {
            name: "Abhishek Gupta",
            designation: "Lead Solution Architect - ZerofAI",
            image: "/assets/abhishek.png",
        },
        {
            name: "Aashima Arya",
            designation: "Product Observability Manager",
            image: "/assets/aashima.webp",
        },
        {
            name: "Rishav Dev",
            designation: "Software Craftsperson",
            image: "/assets/rishav.webp",
        },
        {
            name: "Deeksha Khattar",
            designation: "Software Craftsperson",
            image: "/assets/deeksha.webp",
        },

        {
            name: "Lalit Mehta",
            designation: "Business Marketing",
            image: "/assets/lalit.webp",
        },
    ];


    return (
        <main>
            <NavigationBar />
            <section id="connect" className="border-t border-[#e8e8e8] bg-white py-16 lg:py-24 relative">
                <div className="mx-auto container relative z-10 w-full px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-10">
                    <div className='flex flex-col gap-10 w-full'>
                        <h2 className="text-[2rem] font-normal leading-[1.15] tracking-[-0.02em] text-[#006670] lg:text-[2.5rem]">
                            Meet our Leadership Team
                        </h2>

                        {/* 4 people */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
                            {teamMembers.map((member, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col gap-4`}
                                >
                                    <Image
                                        src={member.image}
                                        width={400}
                                        height={600}
                                        alt={member.name}
                                        className="w-full"
                                    />

                                    <div className="flex flex-col gap-1">
                                        <h3>{member.name}</h3>
                                        <p className="text-xs">{member.designation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* 3 column */}
                    </div>

                </div>

                {/* <h3 className="text-[10rem] text-[#F4F4F1] absolute -bottom-1 right-10">ZerofAI</h3> */}
                {/* <Image src="/assets/logo.png" width="600" height="200" alt="zerofai" className="absolute -bottom-5 right-12 sw-[8rem]!" /> */}

            </section>
        </main>
    )
}

export default Leadership

