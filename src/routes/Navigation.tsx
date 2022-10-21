import {BrowserRouter, Routes, Route, Link, Navigate} from 'react-router-dom';
import { Home } from '../pages/home/Home';
import { CreateEditUser } from '../pages/user/CreateEditUser';

export const Navigation = () => {
  return (
    <BrowserRouter>
        <div>

            <Routes>
                <Route path="/home" element={<Home/>}></Route>
                <Route path="/user/:id" element={<CreateEditUser/>}></Route>
                <Route path="/*" element={<Navigate to="/home" replace/>}></Route>
            </Routes>
        </div>
    </BrowserRouter>
  )
}
