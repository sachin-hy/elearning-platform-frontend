
import React, { useEffect, useState } from 'react';
import { apiConnector } from '../apiconnector';
import { categorysEndpoints } from '../apis';
import toast from 'react-hot-toast';
import { removeToken } from '../../slices/authSlice';
// in navbar.jsx page function called in useeffect
export async function fetchSubLinks (setSubLinks){
        try{
            
            const result = await apiConnector("GET",categorysEndpoints.CATEGORYS_API,null,null,null);
            console.log("fecth sublinkes arr called")
            const safeArray = Array.isArray(result?.data) ? result.data : [];

            setSubLinks(safeArray);
            
        }catch(error)
        {
           
            setSubLinks([])
          }
     }



  //  function call from courseinfo page inside useeffect  
export async function fetchTags(setCategories, token,navigate,dispatch) {
    try {
      const res = await apiConnector(
        "GET",
        categorysEndpoints.CATEGORYS_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        },
        null,
      )

      const safeArray = Array.isArray(res?.data) ? res.data : []

      setCategories(safeArray)
      
    } catch (error) {
      setCategories([])
      if(error.status === 401)
            {
                      toast.error("Your session has expired. Please log in again.");
                      dispatch(removeToken())
                      navigate("/login");
            }else{
              toast.error(error.response.data);
            }
     
      
    }
}    