import { createContext,useContext,useState } from "react";

const GlobalContext=createContext()

export const useGlobalContext=() => useContext(GlobalContext)

const AppContext=({children})=>{
    const [applicantData,setApplicantData]=useState({})

    return (
        <GlobalContext.Provider value={{applicantData,setApplicantData}}>
            {children}
        </GlobalContext.Provider>
    )
}

export default AppContext;