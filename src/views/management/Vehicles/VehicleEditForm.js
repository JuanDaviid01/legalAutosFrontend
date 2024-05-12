import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

import Axios from "axios";
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CFormCheck,
    CButton,
} from '@coreui/react'

const VehicleForm = () => {

    const [vehicleData, setVehicleData] = useState({
        vehiclePlate: '',
        vehicleBrand: '',
        vehicleLine: '',
        vehicleType: '',
        vehicleYear: 0,
        vehicleTrasmision: '',
        vehicleCC: '',
        vehicleColor: '',
        vehicleBuyPrice: 0,
        vehicleSellPrice: 0,
        vehicleState: '',
        cityId: 0,
        personId: '',
        buyDate: '',
        sellDate: '',
        vehicleSoat: false,
        vehicleTecno: false,
        vehicleDescription: '',
    });
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedTransmission, setSelectedTransmission] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedSoat, setSelectedSoat] = useState('');
    const [selectedTecno, setSelectedTecno] = useState('');

    useEffect(() => {
        const getVehicles = async () => {
            const response = await Axios({ url: `http://localhost:1338/api/getVehicle/` });
            const buyer = response.data.data
            setBuyerData(buyer);
        }
        const getDepartments = async () => {
            const response = await Axios({ url: 'http://localhost:1338/api/listdepartments' });
            const lstDepartments = Object.keys(response.data).map(i => response.data[i]);
            setDepartments(lstDepartments.flat());
        }

        const getCities = async (departmentId) => {
            const response = await Axios({ url: `http://localhost:1338/api/listcities/${departmentId}` });
            const lstCities = Object.keys(response.data).map(i => response.data[i]);
            setCities(lstCities.flat());
        }









    });

}