import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import {
    CForm,
    CCol,
    CFormInput,
    CFormSelect,
    CButton
} from '@coreui/react';

const PublicationEditForm = () => {

    const { publicationId } = useParams();

    const [publicationData, setPublicationData] = useState({
        state:'',
        price: ''
    });
    const navigate = useNavigate();

    const [selectedState, setSelectedState] = useState('');

    useEffect(() => {
        const getPublications = async () => {
            try {
                const response = await Axios({ url: `http://localhost:1338/api/getPublication/${publicationId}` });
                const publication = response.data.data;
                setPublicationData(publication);
            } catch (error) {
                console.error("Error fetching publication:", error);
            }
        };
    
        getPublications();
    }, []); // Agregar una ma   triz vacía como segundo argumento
    

    function handleChange(event){
        const {name, value} = event.target;
        setPublicationData({
            ...publicationData,
            [name]: value
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await Axios.put(`http://localhost:1338/api/updatePublication/${publicationId}`, publicationData);
            console.log(response.data);
            navigate('/publications/publication');
        } catch (e) {
            console.log(e);
        }
    }

    const handleCancel = async (event) => {
        navigate('/publications/publication');
    }

    function handleSelectState(event) {
        setSelectedState(event.target.value);
        setPublicationData({
            ...publicationData,
            state: event.target.value
        });
    }

    return (
        <CForm className="row g-3" onSubmit={handleSubmit}>
          <CCol xs={12} md={6}>
            <CCol xs={12}>
              <CFormSelect id="stateOptions" label="State" value={selectedState} onChange={handleSelectState}>
                <option value="">Select status</option>
                <option key="avaliable" value="avaliable">Avaliable</option>
                <option key="unvaliable" value="unvaliable">Unvaliable</option>
              </CFormSelect>
            </CCol>
            <CCol xs={12}>
              <CFormInput
                type="number"
                id="price"
                name="price"
                label="Publication Price"
                value={publicationData.price}
                onChange={handleChange}
                required
              />
            </CCol>
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">Save</CButton>
            <CButton color="secondary" onClick={handleCancel}>Cancel</CButton>
          </CCol>
        </CForm>
      );
      

 }

export default PublicationEditForm;
