import React from "react";
import { useTheme } from "../context/ThemeContext";
import frontend from "../assets/img/frontend.png"
import responsive from "../assets/img/responsive.png"
import design from "../assets/img/design.png"
import optimization from "../assets/img/optimization.png"
import LineGradient from "../components/LineGradient";


const Services = () => {
    const { theme } = useTheme();
    const Style =
        theme === "light"
            ? { backgroundColor: "#EADBC8", color: "#000000" }
            : { backgroundColor: "#010026", color: "#ffffff" };

    return (
        <section id="services" style={Style} className="max-w-full mx-auto relative z-0 sm:px-16 px-6 sm:py-16 py-10">
            <div className="flex flex-col w-full mb-6">
                <p className="sm:text-4xl text-3xl text-center font-semibold title-font mb-2 tracking-in-expand ">
                    About
                    <span className="text-purple-600"> Me
                    </span>
                </p>
                <div className="flex justify-center mb-4">
                    <LineGradient width="w-1/12" />
                </div>
            </div>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base text-center tracking-in-expand mb-20"> I'm a Bootstrap Developer with 1+ years of experience in software engineering, specializing in front-end development. Skilled in developing and enhancing responsive UI components, collaborating in agile environments, integrating APIs, and crafting user-centered experiences. Highly adept at both independent and collaborative projects, driven by a strong passion for continuous learning, particularly in modern front-end frameworks and techniques. Committed to building seamless and dynamic applications.
            </p>
            <div className="flex flex-col w-full">
                <p className="sm:text-4xl text-3xl text-center font-semibold title-font mb-2 tracking-in-expand ">
                    What{" "}
                    <span
                        className="text-purple-600"
                    >
                        I do?
                    </span>
                </p>
                <div className="flex justify-center">
                    <LineGradient width="w-1/12" />
                </div>
            </div>
            <div className='mt-16 lg:flex-row flex flex-col gap-10'>
                <div className='lg:min-w-[250px] w-full slit-in-vertical' style={{ animationDelay: '0.5s' }}>
                    <div className='w-full p-[1px] rounded-[20px] shadow-card border-gradient-purple'>
                        <div className='bg-primary-400 rounded-xl py-5 px-10 min-h-[280px] flex justify-evenly items-center flex-col'>
                            <img src={frontend} alt='frontend' className='w-16 h-16 object-contain' />
                            <h3 className='text-white text-[20px] text-center font-bold'>
                                Front-End Development
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='lg:min-w-[250px] w-full slit-in-vertical' style={{ animationDelay: '1s' }}>
                    <div className='w-full p-[1px] rounded-[20px] shadow-card border-gradient-purple'>
                        <div className='bg-primary-400 rounded-xl py-5 px-10 min-h-[280px] flex justify-evenly items-center flex-col'>
                            <img src={design} alt='design' className='w-16 h-16 object-contain' />
                            <h3 className='text-white text-[20px] text-center font-bold'>
                                Custom Web Design
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='lg:min-w-[250px] w-full slit-in-vertical' style={{ animationDelay: '1.5s' }}>
                    <div className='w-full p-[1px] rounded-[20px] shadow-card border-gradient-purple'>
                        <div className='bg-primary-400 rounded-xl py-5 px-10 min-h-[280px] flex justify-evenly items-center flex-col'>
                            <img src={responsive} alt='responsive' className='w-16 h-16 object-contain' />
                            <h3 className='text-white text-[20px] text-center font-bold'>
                                Responsive Web Design
                            </h3>
                        </div>
                    </div>
                </div>
                <div className='lg:min-w-[250px] w-full slit-in-vertical' style={{ animationDelay: '2s' }}>
                    <div className='w-full p-[1px] rounded-[20px] shadow-card border-gradient-purple'>
                        <div className='bg-primary-400 rounded-xl py-5 px-10 min-h-[280px] flex justify-evenly items-center flex-col'>
                            <img src={optimization} alt='optimization' className='w-16 h-16 object-contain' />
                            <h3 className='text-white text-[20px] text-center font-bold'>
                                Website Optimization
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Services
