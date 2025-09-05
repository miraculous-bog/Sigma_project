import { Outlet, Link } from 'react-router-dom'

import Header from './Header';

export default function Layout() {
    return (
        <>
            <nav>
                <Header />
            </nav>
            <div style={{ display: 'flex', gap: 12, minHeight: '100vh' }}>
        
            <main style={{
                flex: 1,
                minWidth: 0,
                display: 'grid',          // однорядковий центринг
                placeItems: 'center',     // = align-items + justify-content
                padding: 16
            }}>
                <Outlet />
            </main>
            </div>
        </>
      );
}
