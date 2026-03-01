import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import SortingVisualizer from './index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SortingVisualizer />
  </StrictMode>,
)
