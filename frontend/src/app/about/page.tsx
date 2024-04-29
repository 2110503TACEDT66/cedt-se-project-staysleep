"use client"
import { Button } from "@mui/material";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About(){

    return(
        <main>
            <motion.div
            animate={{translateY:[-100, 0] ,opacity: [0, 1]}}
            transition={{ duration: 1, ease: "easeInOut" }}
            >
            <div className="w-[100vw] h-[80vh]">
                    <div className="absolute mt-[20vh] left-1/2 -translate-x-1/2 z-20">
                        <p className="text-6xl font-extrabold text-white font-italic">About Us</p>
                        <p className="block text-2xl text-white font-semibold">Project-StaySleep</p>
                        <p className="text-lg text-white font-semibold mt-4">We are a team of developers who are passionate about creating a platform that helps you find the best hotels for your vacation. We are dedicated to providing you with the best experience possible. Our goal is to make your vacation planning as easy and stress-free as possible. We hope you enjoy using our platform and find the perfect hotel for your next vacation.</p>
                    </div>
                
                <Image src="/img/about.jpg" alt="About" fill priority style={{ objectFit: "cover", opacity: 0.8 }} className="!relative rounded-lg z-10" quality={100} />               
            </div>
            </motion.div>
            
            <motion.div
            animate={{translateY:[100, 0] ,opacity: [0, 1]}}
            transition={{ duration: 1, ease: "easeInOut" }}
            >
            <div className="flex justify-center">
                <Button variant="contained" className="text-lg text-black bg-[#ffa63d] rounded-lg w-[15rem] h-[5rem] mt-8 border-solid border-black border-2 hover:bg-black hover:text-primary">
                    Contact Us
                    <Image src="/icon/addicon.png" alt="arrow" width={30} height={30} className="ml-2"/>
                </Button>
            </div>
            </motion.div>
        </main>    
    );
}