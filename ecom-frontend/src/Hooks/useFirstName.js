import React, { useState } from "react";

export const useFirstName=()=>{
    const [first,setFirst]=React.useState('')
setTimeout(()=>{
// setFirst('shashi')
},5000)
    return {
        first,
        setFirst
    }
}