import { Routes, Route } from 'react-router-dom'
import { StyledEngineProvider, ThemeProvider, CssBaseline } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import theme from './theme/theme';
import Sidebar from './Sidebar';
import Layout from './Layout'
import Public from './Public'
import Login from './Login'
import Net from './Net';
import RequireAuth from './Login/RequireAuth'
const menuData = [
  {
    id: 'analytics',
    kind: 'group',
    title: 'Аналітика',
    defaultOpen: true,
    children: [
      {
        id: 'dashboards',
        kind: 'section',
        title: 'Дашборди',
        children: [
          { id: 'overview', kind: 'item', title: 'Огляд', path: '/dashboards/overview' },
          { id: 'kpi', kind: 'item', title: 'KPI', path: '/dashboards/kpi' },
        ]
      }
    ]
  },
  {
    id: 'settings',
    kind: 'group',
    title: 'Налаштування',
    children: [
      {
        id: 'users',
        kind: 'section',
        title: 'Користувачі',
        children: [
          { id: 'list', kind: 'item', title: 'Список', path: '/settings/users' },
          { id: 'roles', kind: 'item', title: 'Ролі', path: '/settings/roles', meta: { roles: ['admin'] } }
        ]
      }
    ]
  }
]
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />  {/* без / */}

        {/* protected */}
        <Route element={<RequireAuth />}>
          <Route path="environment" element={ <Net
            LinkComponent={Link}
          />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="environment" element={ <Sidebar
            data={menuData}
            role="admin"
            persistKey="app.sidebar"
            LinkComponent={Link} 
          />} />
        </Route>
        {/* 404 за бажанням */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}