'use client'

import { SessionInterface, SitterServices, UserProfile } from '@/common.types'
import { getSitterDetails, getUserById, getUserSitter } from '@/lib/actions'
import React, { useEffect, useState } from 'react'
import HeaderShow from './HeaderShow'
import MainShow from './MainShow'
import HeaderStick from './sitterProfile/HeaderStick'
import { AnimatePresence, motion } from 'framer-motion';
import { useGlobalContext } from '@/app/context'

type Props={
    id:string,
    apikey:string|undefined,
    session?:SessionInterface;
}

const SitterShow = ({id,apikey}:Props) => {
  const {logUser} = useGlobalContext()
  const session = logUser?.mongoDB
    
    const [img,setImg]=useState<string|undefined>()
    const [name,setName]=useState<string|undefined>()
    const [desc,setDesc]=useState<string|null>('')
    const [locationM,setLocationM]=useState<string|null>('')
    const [sitterUser,setSitterUser]=useState<SitterServices>()
    const [isFixed, setIsFixed] = useState(false);
    const [firstRender, setFirstRender]=useState(true)
    type StyleType = {
        position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
        top?: string;
      };
    const getUser=async()=>{
       const finalSitter=await getSitterDetails(id) as{mongoDB:SitterServices}//check if the user is sitter
        const sitter=await getUserById(finalSitter.mongoDB.sitter.createdBy) as { mongoDB:{user:UserProfile}  }
        console.log(sitter)
        //@ts-ignore
        setSitterUser(finalSitter?.mongoDB?.sitter)
        setLocationM(finalSitter.mongoDB.sitter.locationM)
        setImg(sitter.mongoDB.user.avatarUrl)
        setName(sitter.mongoDB.user.name)
        setDesc(sitter.mongoDB.user.description)
        setFirstRender(false)
        }
        useEffect(()=>{
            firstRender==true?
            getUser():null
        },[])
        useEffect(() => {
            // Function to handle the scroll event
            const handleScroll = () => {
              // Check the scroll position (e.g., when it reaches a specific point)
              if (window.scrollY > 200) {
                setIsFixed(true);
              } else {
                setIsFixed(false);
              }
            };
        
            // Attach the scroll event listener when the component mounts
            window.addEventListener('scroll', handleScroll);
        
            // Clean up the event listener when the component unmounts
            return () => {
              window.removeEventListener('scroll', handleScroll);
            };
          }, []);
        
          const fixedStyle:StyleType = {
            position: isFixed ? 'fixed' : 'static',
            top: isFixed ? '0' : 'auto',
            
          };
  return (
   <div className='pt-8 '>
     <AnimatePresence initial={true} >

    

<motion.div className={`fixed-component ${!isFixed?'fixed-componentHide ':''}`}
initial={{ opacity: 0, y: -10 }}
animate={isFixed ? { opacity: 1, y: 0 } : {}}
exit={!isFixed ? { opacity: 0, y: -10 } : undefined}
transition={{ duration: 0.5 }}
>
<HeaderStick name={name} img={img} locationM={locationM} />
</motion.div></AnimatePresence>
       

        
    


        
        <HeaderShow session={session} sitter={sitterUser} firstRender={firstRender} name={name} img={img} locationM={locationM} /> 

        <MainShow name={name} desc={desc} sitter={sitterUser} apikey={apikey}/>
</div>
   
  )
}

export default SitterShow