import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router'

const Paste_ID = () => {
  const paste_ID = useParams();
  const allPastes = useSelector(state => state.paste.pastes)

  const currPaste = allPastes.find((paste) => paste.id === paste_ID.id);


  return (
    <div className='w-full'>
      <div className='flex'>
        <input
          className='w-3/4 border-solid border-gray-600 border-2 p-1'
          type="text" 
          placeholder='Your title appears here' 
          value={currPaste.title}
          disabled
        />
      </div>

      <div className='my-5'>
          <textarea 
            className='w-full border-solid border-gray-600 border-2 p-1'
            rows={15}
            placeholder='Your paste content appears here'
            value={currPaste.content}
            disabled
            >
            </textarea>
        </div>
    </div>
  )
}

export default Paste_ID