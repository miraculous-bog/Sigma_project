import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Public from './Public';
import SignIn from './SignIn';
import RequireAuth from './SignIn/RequireAuth';
// import Layout from './components/Layout'
// import Public from './components/Public'
// import Welcome from './features/auth/Welcome'
// import UsersList from './features/users/UsersList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route index element={<Public />} />
        <Route path="/signIn" element={<SignIn />} />

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          {/* <Route path="welcome" element={<Welcome />} />
          <Route path="userslist" element={<UsersList />} /> */}
        </Route>

      </Route>
    </Routes>
  )
}

export default App;