import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import claimService from '../services/claimService';
import { Card, CardContent, Typography, Container, Button, Box, CircularProgress, Alert } from '@mui/material';

const ClaimDetails = () => {
    const { id } = useParams();
    const [claim, setClaim] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClaim = async () => {
            try {
                const response = await claimService.getClaimById(id);
                setClaim(response.data);
                setError(null);
            } catch (error) {
                console.error('Failed to fetch claim', error);
                setError('Failed to fetch claim details. Please try again.');
            }
        };
        fetchClaim();
    }, [id]);

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!claim) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Claim Details
                </Typography>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Claim ID: {claim.id}</Typography>
                        <Typography>Claimant Name: {claim.claimantName}</Typography>
                        <Typography>Claim Amount: ${claim.claimAmount.toFixed(2)}</Typography>
                        <Typography>Claim Date: {new Date(claim.claimDate).toLocaleDateString()}</Typography>
                        <Typography>Status: {claim.status}</Typography>
                    </CardContent>
                </Card>
                <Box sx={{ mt: 2 }}>
                    <Button component={Link} to="/claims" variant="contained">
                        Back to Claims
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default ClaimDetails;
