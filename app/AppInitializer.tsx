
'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { fetchCategories } from './store/slices/categorySlice';
import { fetchUser } from './store/slices/authSlice';

export default function AppInitializer() {
  console.log("AppInitializer mounted");

  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    
    if (!categories?.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories?.length]);   

  useEffect(() => {
    const token = localStorage.getItem('access-token');
    
    if (token) {
      dispatch(fetchUser());
    }
  }, [dispatch]);   

  return null;
}


