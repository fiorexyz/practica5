import AppRouter from './routes/AppRouter';
import { Toaster } from 'react-hot-toast';
import { useUIStore } from './store/uiStore';

function App() {
  const theme = useUIStore((state) => state.theme);
  
  return (
    <>
      <AppRouter />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#374151' : '#fff',
            color: theme === 'dark' ? '#f3f4f6' : '#374151',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  );
}
export default App;