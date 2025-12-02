import { Routes, Route, Navigate, Outlet } from "react-router-dom"
import SignIn from "./pages/auth/sign-in"
import SignUp from "./pages/auth/sign-up"
import Dashboard from "./pages/dashboard"
import Settings from "./pages/settings"
import AccountPage from "./pages/account-page"
import Transactions from "./pages/transactions"
import useStore from "./store"
import { setAuthToken } from "./libs/apiCall"
import { Toaster } from "sonner"
import Navbar from "./components/ui/navbar"

const RootLayout = () => {
  const {user} = useStore((state) => state);

  setAuthToken(user?.token ||  '');


  return !user ? (<Navigate to="/sign-in" replace= {true} />) :
  (<>
     <Navbar/>
     <div className="min-h[cal(100vh-100px)]">
      <Outlet />
     </div>
  </>)

}

function App() {

  return <main>
    <div className="w-full min-h-screen px-6 md:px-20"
      style={{
 
        backgroundColor: "hsl(var(--background))", // light mode
  
        color: "hsl(var(--foreground))",           // optional, sets text color
      }}
>
      <Routes>
        <Route element={ <RootLayout /> }>
          <Route path="/" element={ <Navigate to="/overview" /> } />
          <Route path="/overview" element={ < Dashboard /> } />
          <Route path="/transactions" element={ < Transactions /> } />
          <Route path="/settings" element={ < Settings /> } />
          <Route path="/accounts" element={ < AccountPage /> } />
        </Route>


        <Route path="/sign-in" element={< SignIn />}/>
        <Route path="/sign-up" element={< SignUp />}/>
      </Routes>
    </div>

    <Toaster richColors position="top-center"/>
  </main>
  
}

export default App
