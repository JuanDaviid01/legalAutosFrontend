import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Buyer = React.lazy(() => import('./views/management/Buyers/Buyer'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/buyers', name: 'Buyers', exact: true},
  { path: '/buyers/buyer', name: 'Buyer', element: Buyer },
]

export default routes;
