import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ClaimForm from '../components/ClaimForm';
import claimService from '../services/claimService';
import { CircularProgress, Box, Alert } from '@mui/material';

const EditClaim = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [claim, setClaim] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaim = async () => {
            try {
                const response = await claimService.getClaimById(id);
                const claimData = response.data;
                if (claimData.claimDate) {
                    claimData.claimDate = new Date(claimData.claimDate).toISOString().split('T')[0];
                }
                setClaim(claimData);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch claim', error);
                setError('Failed to fetch claim data. Please try again.');
            }
        };
        fetchClaim();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            await claimService.updateClaim(id, values);
            navigate('/claims');
        } catch (error) {
            console.error('Failed to update claim', error);
            setError('Failed to update claim. Please try again.');
        }
    };

    if (!claim) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <ClaimForm
                initialValues={claim}
                onSubmit={handleSubmit}
            />
        </div>
    );
};

export default EditClaim;
