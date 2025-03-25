import App from './App.jsx'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'
import { store } from './store/index.jsx'

import './assets/css/style.css'
import './assets/css/fontawesome.all.min.css'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
