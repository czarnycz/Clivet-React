import './App.css';
import {NavBar} from "./components/nav-bar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {HomePage} from "./pages/home/home.page";
import {RegisterPage} from "./pages/register/register.page";
import {LoginPage} from "./pages/login/login.page";
import {ProfilePage} from "./pages/profile/profile.page";
import {AdminPage} from "./pages/admin/admin.page";
import {NotFoundPage} from "./pages/not-found/not-found.page";
import {UnauthorizedPage} from "./pages/unauthorized/unauthorized.page";
import {Footer} from "./components/footer";
import {AuthGuard} from "./guards/auth.guard";
import {Role} from "./models/role";
import { AddPetPage } from './pages/pet/AddPetPage';
import { PetList } from './pages/pet/PetList';



function App() {
    return (
        <BrowserRouter>
            <NavBar/>
            <div>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/home" element={<HomePage/>}/>
                    <Route path="/404" element={<NotFoundPage/>}/>
                    <Route path="/401" element={<UnauthorizedPage/>}/>
                    <Route path="/addPet" element={<AddPetPage/>}/>
                    <Route path="/owners/:ownerId/petList" element={<PetList/>}/>
                    

                    <Route path="/owners" element={
                        <AuthGuard roles={[Role.ADMIN]}>
                            <AdminPage/>
                        </AuthGuard>}/>

                    <Route path="/profile" element={<AuthGuard roles={[Role.USER]}><ProfilePage/></AuthGuard>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
