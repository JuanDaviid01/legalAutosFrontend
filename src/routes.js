import { element } from 'prop-types'
import React from 'react' 

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Vehicle = React.lazy(() => import('./views/management/Vehicles/Vehicle'))
const VehicleForm = React.lazy(() => import('./views/theme/typography/Typography'))

const Seller = React.lazy(() => import('./views/management/Sellers/Seller'))

const routes = [
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/Vehicles', name: 'Vehicle', exact: true},
  {path: '/Vehicles/Vehicle', name: 'Vehicle', element:Vehicle},
  {path: '/Vehicles/Vehicle'},
  //-------------------------------------
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/buyers', name: 'Buyers', exact: true},
  { path: '/buyers/buyer', name: 'Buyer', element: Buyer },
]

export default routes
