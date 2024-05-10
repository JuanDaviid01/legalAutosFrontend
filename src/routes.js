import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Buyer = React.lazy(() => import('./views/management/Buyers/Buyer'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/buyers', name: 'Dashboard', element: Dashboard },
  { path: '/buyers/buyer', name: 'Dashboard', element: Dashboard },
]

export default routes
