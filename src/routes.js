import { element } from 'prop-types'
import React from 'react' 

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Seller = React.lazy(() => import('./views/management/Vehicles/Sellers/Seller'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path:'/Seller', name: 'Seller', element: Seller  }
]

export default routes
