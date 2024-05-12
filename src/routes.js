import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Vehicle = React.lazy(() => import('./views/management/Vehicles/Vehicle'))
const VehicleForm = React.lazy(() => import('./views/management/Vehicles/VehicleForm'))

const Seller = React.lazy(() => import('./views/management/Sellers/Seller'))
const SellerForm = React.lazy(() => import('./views/management/Sellers/SellerForm'))
const Buyer = React.lazy(() => import('./views/management/Buyers/Buyer'))
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const BuyerForm = React.lazy(() => import('./views/management/Buyers/BuyerForm'))
const Publication = React.lazy(() => import('./views/management/Publications/Publication'))
const PublicationForm = React.lazy(() => import('./views/management/Publications/PublicationForm'))



const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  //-------------------------------------
  { path: '/Vehicles', name: 'Vehicles', exact: true },
  { path: '/Vehicles/Vehicle', name: 'Vehicle list', element: Vehicle },
  {path: '/Vehicles/VehicleForm', name: 'vehicle Form', element: VehicleForm },
  //-------------------------------------
  { path: '/buyers', name: 'Buyers', exact: true },
  { path: '/Buyers/Buyer', name: 'Buyer', element: Buyer },
  { path: '/buyers/buyerform', name: 'BuyerForm', element: BuyerForm },
  //{ path: '/buyers/buyerEditForm/:personId', name: 'BuyerEditForm', element: BuyerEditForm },
  //-------------------------------------
  { path: '/Publications', name: 'Publications', exact: true },
  { path: '/Publications/Publication', name: 'Publication', element: Publication },
  { path: '/Publications/PublicationForm', name: 'PublicationForm', element: PublicationForm},
  //------------------------------------- 
  { path: '/sellers', name: 'Sellers', exact: true },
  { path: '/Sellers/Seller', name: 'Seller', element: Seller },
  { path: '/sellers/sellerForm', name: 'SellerForm', element: SellerForm},
  //-------------------------------------
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },

]

export default routes;