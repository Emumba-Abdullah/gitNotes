import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import authStore from "./Store/store.ts"
import { RouterProvider } from 'react-router-dom';
import router from './Router.tsx'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={authStore}>
        <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
        </QueryClientProvider>
    </Provider>
)
