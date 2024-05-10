import React from 'react' 

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Vehicle = React.lazy(() => import('./views/management/Vehicles/Vehicle'))
const VehicleForm = React.lazy(() => import('./views/theme/typography/Typography'))
const Seller = React.lazy(() => import('./views/management/Sellers/Seller'))
const Buyer = React.lazy(() => import('./views/management/Buyers/Buyer'))
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  //-------------------------------------
  {path: '/Vehicles', name: 'Vehicles', exact: true},
  {path: '/Vehicles/Vehicle', name: 'Vehicle list', element:Vehicle},
  //-------------------------------------
  { path: '/buyers', name: 'Buyers', exact: true},
  { path: '/Buyers/Buyer', name: 'Buyer', element: Buyer },
  //-------------------------------------
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
]

export default routes;
