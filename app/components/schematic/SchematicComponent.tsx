import React from 'react'
import SchematicEmbed from './SchematicEmbed'
import { getTemporaryAccessToken } from '@/actions/getTemporaryAccessToken';

// it is a server component 
// by default in nextjs components are server 

async function SchematicComponent({componentId} : {componentId: string}) {

  if(!componentId) {
    return null;
  }

  // get access token from aip backend
  const accessToken = await getTemporaryAccessToken();

  if(!accessToken) {
    throw new Error('Failed to get access token');
  }

  return (
    <SchematicEmbed  accessToken={accessToken} componentId={componentId} />
  )
  
}

export default SchematicComponent
