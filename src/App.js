import {BrowserRouter,Routes,Route} from 'react-router-dom'

import BookingForm from './components/BookingForm'
import PaymentPage from './components/PaymentPage'
import Students from './components/Students'

const App=()=>(
  <BrowserRouter>
    <Routes>
      <Route exact path='/bookings' element={<BookingForm/>} />
      <Route exact path='/payment' element={<PaymentPage />} />
      <Route exact path="/" element={<Students />} />
    </Routes>
  </BrowserRouter>
)


export default App
