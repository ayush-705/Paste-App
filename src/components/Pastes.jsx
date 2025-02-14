import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { removePaste } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes)
  const [searchValue, setSearchValue] = useState('');

  const filteredData = pastes.filter(paste => {
    return paste.title.toLowerCase().includes(searchValue.toLowerCase())
  })
  // console.log(filteredData)

  const dispatch = useDispatch();
  function handleDelete(paste_id){
    dispatch(removePaste(paste_id))
  }

  function handleCopy(content){
    navigator.clipboard.writeText(content);
    toast.success("Copied Successfully !");
  }

  function handleShare(paste){

  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <input 
        className='w-full border border-black'
        type="text"
        placeholder='Search Paste/Note'
        value={searchValue}
        onChange={(event) => { setSearchValue(event.target.value) }} 
        />

        <div className='flex flex-col gap-5'>
          {
            filteredData.length > 0 && 
              filteredData.map(paste => {
                return(
                  <div key={paste.id} className='border border-black'>
                    <div>
                      {paste.title}
                    </div>
                    <div>
                      {paste.content}
                    </div>

                    <div className='flex justify-evenly'>
                      <button>
                        <NavLink to={`/pastes/${paste.id}`}>
                          View
                        </NavLink>
                      </button>
                      <button>
                        <NavLink to={`/?paste_ID=${paste.id}`}>
                          Edit
                        </NavLink>
                      </button>
                      <button onClick={() => handleCopy(paste.content)}>Copy</button>
                      <button onClick={() => handleDelete(paste.id)}>Delete</button>
                      <button onClick={() => handleShare(paste)} disabled>Share</button>
                    </div>
                  </div>
                )
              })
          }
        </div>
    </div>
  )
}

export default Pastes