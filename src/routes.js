import { element } from 'prop-types'
import React from 'react' 

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Buyer = React.lazy(() => import('./views/management/Buyers/Buyer'))
const Seller = React.lazy(() => import('./views/management/Vehicles/Sellers/Seller'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/buyers', name: 'Buyers', exact: true},
  { path: '/buyers/buyer', name: 'Buyer', element: Buyer },
  {path:'/Seller', name: 'Seller', element: Seller  }
]

export default routes;
