import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

const ClaimSchema = Yup.object().shape({
    claimantName: Yup.string().required('Claimant name is required'),
    claimAmount: Yup.number()
        .positive('Claim amount must be positive')
        .required('Claim amount is required'),
    claimDate: Yup.date().required('Claim date is required').max(new Date(), "Claim date cannot be in the future"),
    status: Yup.string().required('Status is required'),
});

const ClaimForm = ({ initialValues, onSubmit }) => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    {initialValues.id ? 'Edit Claim' : 'Add Claim'}
                </Typography>
            </Box>
            <Formik
                initialValues={initialValues}
                validationSchema={ClaimSchema}
                onSubmit={(values, actions) => {
                    onSubmit(values);
                    actions.setSubmitting(false);
                }}
                enableReinitialize
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <Field
                            name="claimantName"
                            as={TextField}
                            label="Claimant Name"
                            fullWidth
                            margin="normal"
                            error={touched.claimantName && !!errors.claimantName}
                            helperText={touched.claimantName && errors.claimantName}
                        />
                        <Field
                            name="claimAmount"
                            as={TextField}
                            label="Claim Amount"
                            type="number"
                            fullWidth
                            margin="normal"
                            error={touched.claimAmount && !!errors.claimAmount}
                            helperText={touched.claimAmount && errors.claimAmount}
                        />
                        <Field
                            name="claimDate"
                            as={TextField}
                            label="Claim Date"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={touched.claimDate && !!errors.claimDate}
                            helperText={touched.claimDate && errors.claimDate}
                        />
                        <Field
                            name="status"
                            as={TextField}
                            label="Status"
                            fullWidth
                            margin="normal"
                            error={touched.status && !!errors.status}
                            helperText={touched.status && errors.status}
                        />
                        <Box sx={{ mt: 2 }}>
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                {initialValues.id ? 'Save Changes' : 'Submit'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};

export default ClaimForm;
