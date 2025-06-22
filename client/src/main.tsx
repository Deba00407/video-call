import { createRoot } from 'react-dom/client'
import './index.css'
import Providers from './components/react-components/Providers.tsx'

createRoot(document.getElementById('root')!).render(
    <Providers />
)
