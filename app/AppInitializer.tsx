'use client';

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { fetchCategories } from './store/slices/categorySlice';
import { fetchUser } from './store/slices/authSlice';


export default function AppInitializer() {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.category);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
        dispatch(fetchUser())
  }, [dispatch, categories.length]);

  return null;
}