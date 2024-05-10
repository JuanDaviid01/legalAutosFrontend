import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilStar,
  cilGarage,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'


const _nav = [
  

  {
    component: CNavTitle,
name: 'Management'
},
  {
    component: CNavGroup,
    name: 'Buyers',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buyer',
        to: '/buyers/buyer',
        badge: {
          color: 'success',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Vehicles',
    to: '/Vehicle',
    icon: <CIcon icon={cilGarage} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'vehicle list',
        to: '/Vehicles/Vehicle',
        badge: {
          color: 'success',
        },
      },
    ]
  },
  {
    component: CNavGroup,
    name: 'Sellers',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Seller',
        to: '/sellers/seller',
        badge: {
          color: 'success',
        },
      },
      {
        component: CNavItem,
        name: 'Seller form',
        to: '/icons/flags',
      },

    ],
  },

  {
    component: CNavTitle,
    name: 'Components',
  },

  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
]

export default _nav
