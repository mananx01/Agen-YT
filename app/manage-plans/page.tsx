import React from 'react'
import SchematicComponent from '../components/schematic/SchematicComponent'

function ManagePlans() {
  return (
   
    <div className='container mx-auto md:mx-4 p-4 md:p-0 '>
      <h1 className='text-3xl font-bold mb-4 my-8'>Manage Your Plans </h1>
      <p className='text-[#2d0f27] mb-8'>
        Manage your subscription plans and billing information here.
      </p>

      <div>
        <SchematicComponent componentId='cmpn_CRNyLVwdpup' />
      </div>
    </div>
    
  )
}

export default ManagePlans
