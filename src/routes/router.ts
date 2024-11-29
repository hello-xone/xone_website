import { useRoutes } from 'react-router';
import { Routes } from './modules';

export const RenderRoutes = () => {
  return useRoutes(Routes);
};
