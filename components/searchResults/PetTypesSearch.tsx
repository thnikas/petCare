'use client'
import React, { useState } from 'react'
import PetTypes from '../sitter/PetTypes'

type Props={
  sizePets:{small:boolean,medium:boolean,big:boolean,cat:boolean},
  setSizePets:(value:string) =>void

}
const PetTypesSearch = ({sizePets,setSizePets}:Props) => {//the pet type component in the filters. 
 
  return (
    <div className='pb-12 gap-6 grid'>
      <h2 className='h2 textTitleSS'>Pet types</h2>
      <PetTypes textStyle='text-lg pl-2 typesText'  iconsSize={40} values={sizePets} setState={setSizePets}/>
    </div>
  )
}

export default PetTypesSearch