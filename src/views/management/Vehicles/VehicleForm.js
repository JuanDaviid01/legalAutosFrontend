import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Axios from "axios";
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CFormCheck,
    CButton
} from '@coreui/react'

const VehicleForm = () => {

    const [vehicleData, setVehicleData] = useState({
        vehicleId: '',
        vehicleBrand: '',
        vehicleLine: '',
        vehicleYear: '',
        vehicleTrasmision: '',
        vehicleBuyPrice: '',
        vehicleState: '',
        cityId: 0,
        personId: 0,
        buyDate: new Date,
        sellDate: new Date,
        vehicleCC: '',
        vehicleColor: '',
        vehicleSoat: '',
        vehicleTecno: '',
        vehicleDescription: '',
        vhicleType: '',
    });
    const navigate = useNavigate();





















};