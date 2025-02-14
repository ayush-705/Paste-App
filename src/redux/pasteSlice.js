import {createSlice} from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

export const pasteSlice = createSlice({
    name:'paste',
    initialState:{
        pastes : JSON.parse(localStorage.getItem('pastes')) ? JSON.parse(localStorage.getItem('pastes')) : []
    },
    reducers:{
        addPaste:(state, action) => {
            const paste_info = action.payload;

            const checkTitle = state.pastes.some(paste => paste.title === paste_info.title);

            if(checkTitle){
                toast('A paste with the same title exists. Please enter another title');
                return;
            }

            state.pastes.push(paste_info);
            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            // console.log(state.pastes);
            toast.success('Paste added successfully :D')
        },
        updatePaste:(state, action) => {
            const paste_info = action.payload;

            let paste = state.pastes.find(paste => paste.id === paste_info.id);
            // console.log(paste_info);
            if(paste){
                paste.title = paste_info.title
                paste.content = paste_info.content
                paste.last_updated = new Date().toISOString();
                localStorage.setItem('pastes', JSON.stringify(state.pastes));
                toast.success('Paste updated successfully :D');
            }
            else{
                toast.error('The above paste was not found in local storage');
            }
        },
        resetAllPaste:(state, action) => {
            state.pastes = [];
            localStorage.removeItem('pastes');
        },
        removePaste: (state, action) => {
            const paste_id = action.payload;

            state.pastes = state.pastes.filter(paste => paste.id !== paste_id);

            localStorage.setItem('pastes', JSON.stringify(state.pastes));
            toast.success('Paste removed successfully');
        },
    }
})

export const {addPaste, updatePaste, resetAllPaste, removePaste} = pasteSlice.actions
export default pasteSlice.reducer