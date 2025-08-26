import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container,
    Typography,
    Box,
    TextField
} from '@mui/material';
import claimService from '../services/claimService';

const ClaimsList = () => {
    const [claims, setClaims] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadClaims();
    }, []);

    const loadClaims = async () => {
        try {
            const response = await claimService.getAllClaims();
            setClaims(response.data);
        } catch (error) {
            console.error('Failed to load claims', error);
        }
    };

    const handleSearch = async () => {
        if (searchQuery.trim() === '') {
            loadClaims();
            return;
        }
        try {
            const response = await claimService.searchClaims(searchQuery);
            setClaims(response.data);
        } catch (error) {
            console.error('Failed to search claims', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await claimService.deleteClaim(id);
            loadClaims(); // Reload claims after deletion
        } catch (error) {
            console.error('Failed to delete claim', error);
        }
    };

    return (
        <Container>
            <Box sx={{ my: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h4" component="h1">
                    Claims
                </Typography>
                <Button component={Link} to="/add-claim" variant="contained" color="primary">
                    Add Claim
                </Button>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', gap: 2 }}>
                <TextField
                    label="Search by Name or Status"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />
                <Button onClick={handleSearch} variant="contained">Search</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Claimant Name</TableCell>
                            <TableCell>Claim Amount</TableCell>
                            <TableCell>Claim Date</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {claims.map((claim) => (
                            <TableRow key={claim.id}>
                                <TableCell>{claim.id}</TableCell>
                                <TableCell>{claim.claimantName}</TableCell>
                                <TableCell>${claim.claimAmount.toFixed(2)}</TableCell>
                                <TableCell>{new Date(claim.claimDate).toLocaleDateString()}</TableCell>
                                <TableCell>{claim.status}</TableCell>
                                <TableCell>
                                    <Button component={Link} to={`/claims/${claim.id}`} sx={{ mr: 1 }}>
                                        View
                                    </Button>
                                    <Button component={Link} to={`/edit-claim/${claim.id}`} sx={{ mr: 1 }}>
                                        Edit
                                    </Button>
                                    <Button onClick={() => handleDelete(claim.id)} color="secondary">
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default ClaimsList;
