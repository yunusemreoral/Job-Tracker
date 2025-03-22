import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    error: null,
    jobs: [],
    
};

const jobSlice = createSlice({
    name:"job",
    initialState: initialState,
    reducers:{
        // yüklenme durumu
        setLoading: (state) => {
            state.isLoading = true;
        },
        //hata durumu
        setError: (state,action) => {
            // yuklenme statesını guncelle
            state.isLoading = false;
            // gelen hata mesahını state içerisindeki errora aktar
            state.error = action.payload.message;
        },
        // apı verisini al reducar ilet
        setJobs: (state,action) => {
            // yuklenme statesını guncelle
            state.isLoading = false;
            // hata statesını null a çek
            state.error = null;
            // gelen iş versini state içerisndeki jobsa aktar
            state.jobs = action.payload;
        },
        // yeni iş ekle
        createJob: (state,action) => {
         // action içerisinde gelen payload değerini state içerisindeki jobs dizisine aktar
        state.jobs.push(action.payload);
        },
        // iş sil
        deleteJob: (state,action) => {
            // deletejob a gelen ıd ile silinecek veriyi state içersinden bul ve starteden kalır
            
            
            // silinecek elemanın sırasını state içerisndne bul
            const index = state.jobs.findIndex((i) => i.id == action.payload);
            state.jobs.slice(index,1);
        },
    },
});

// aksiyonlar
export const {setError,setJobs,setLoading,createJob,deleteJob} = jobSlice.actions;

// reducer
export default jobSlice.reducer;