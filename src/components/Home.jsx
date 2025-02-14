import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router'
import {useDispatch, useSelector} from 'react-redux'
import { addPaste, updatePaste } from '../redux/pasteSlice'
import toast from 'react-hot-toast'

const Home = () => {
  //Learn about useSearchParams()
  const [searchParams, setParams] = useSearchParams();
  const paste_ID = searchParams.get('paste_ID');
  const allPastes = useSelector(state => state.paste.pastes)

  //Information of the paste
  const [title, setTitle] = useState('');
  const [pasteValue, setPasteValue] = useState('');

  const dispatch = useDispatch();

  useEffect(()=>{
      const paste = allPastes.find(paste => paste.id === paste_ID);
      // console.log(paste_ID);
      // console.log(paste);
      // paste has falsy value always
      if(paste){
        setTitle(paste.title)
        setPasteValue(paste.content)
      }
  }, [paste_ID])

  function handlePaste(){
    // console.log(paste_ID);
    if(paste_ID){
      let paste_info = allPastes.find((paste) => paste.id === paste_ID);
      if(paste_info){
        paste_info = structuredClone(paste_info);
        paste_info.title = title;
        paste_info.content = pasteValue;
        paste_info.last_updated = new Date().toISOString();
        dispatch(updatePaste(paste_info));
      }
      else{
        toast.error('Invalid paste_ID');
      }
    }
    else{
      const paste_info = {
        title: title,
        content: pasteValue,
        id: Date.now().toString(36),
        created_on: new Date().toISOString(),
        last_updated: new Date().toISOString()
      }
      dispatch(addPaste(paste_info));
    }

    setTitle('');
    setPasteValue('');
    setParams({});
  }

  return (
    <div className='w-[90%]'>
      <div className='flex justify-evenly'>
        <input
          className='w-3/4 border-solid border-gray-600 border-2'
          type="text" 
          placeholder='Enter the title' 
          value={title}
          onChange={(event)=>{
            setTitle(event.target.value);
          }}
        />

        <button
          className='w-1/4'
          onClick={handlePaste}
        >
          {
            paste_ID ? 'Update paste' : 'Create paste'
          }
        </button>
      </div>

      <div className='my-5'>
          <textarea 
            className='w-full border-solid border-gray-600 border-2'
            rows={15}
            placeholder='Enter your note/Paste'
            value={pasteValue}
            onChange={(event)=>{
              setPasteValue(event.target.value);
            }}
            >
            </textarea>
        </div>
    </div>
  )
}

export default Home