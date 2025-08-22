package com.example.claimsmanagement.service;

import com.example.claimsmanagement.model.Claim;
import com.example.claimsmanagement.repository.ClaimRepository;
import com.example.claimsmanagement.exception.ResourceNotFoundException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ClaimServiceTest {

    @Mock
    private ClaimRepository claimRepository;

    @InjectMocks
    private ClaimService claimService;

    private Claim claim;

    @BeforeEach
    void setUp() {
        claim = new Claim(1L, "Test Claimant", new BigDecimal("1000.00"), LocalDate.now(), "Pending");
    }

    @Test
    void testGetAllClaims() {
        when(claimRepository.findAll()).thenReturn(Collections.singletonList(claim));
        List<Claim> claims = claimService.getAllClaims();
        assertFalse(claims.isEmpty());
        assertEquals(1, claims.size());
        verify(claimRepository, times(1)).findAll();
    }

    @Test
    void testGetClaimById() {
        when(claimRepository.findById(1L)).thenReturn(Optional.of(claim));
        Optional<Claim> foundClaim = claimService.getClaimById(1L);
        assertTrue(foundClaim.isPresent());
        assertEquals(claim, foundClaim.get());
        verify(claimRepository, times(1)).findById(1L);
    }

    @Test
    void testCreateClaim() {
        when(claimRepository.save(any(Claim.class))).thenReturn(claim);
        Claim createdClaim = claimService.createClaim(new Claim());
        assertEquals(claim, createdClaim);
        verify(claimRepository, times(1)).save(any(Claim.class));
    }

    @Test
    void testUpdateClaim() {
        when(claimRepository.findById(1L)).thenReturn(Optional.of(claim));
        when(claimRepository.save(any(Claim.class))).thenReturn(claim);

        Claim claimDetails = new Claim(1L, "Updated Claimant", new BigDecimal("2000.00"), LocalDate.now().plusDays(1), "Approved");
        Claim updatedClaim = claimService.updateClaim(1L, claimDetails);

        assertEquals("Updated Claimant", updatedClaim.getClaimantName());
        assertEquals(new BigDecimal("2000.00"), updatedClaim.getClaimAmount());
        verify(claimRepository, times(1)).findById(1L);
        verify(claimRepository, times(1)).save(claim);
    }

    @Test
    void testUpdateClaim_NotFound() {
        when(claimRepository.findById(1L)).thenReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> {
            claimService.updateClaim(1L, new Claim());
        });
        verify(claimRepository, times(1)).findById(1L);
    }

    @Test
    void testDeleteClaim() {
        when(claimRepository.existsById(1L)).thenReturn(true);
        doNothing().when(claimRepository).deleteById(1L);
        claimService.deleteClaim(1L);
        verify(claimRepository, times(1)).deleteById(1L);
    }

    @Test
    void testDeleteClaim_NotFound() {
        when(claimRepository.existsById(1L)).thenReturn(false);
        assertThrows(ResourceNotFoundException.class, () -> {
            claimService.deleteClaim(1L);
        });
        verify(claimRepository, never()).deleteById(1L);
    }

    @Test
    void testSearchClaims() {
        when(claimRepository.findByClaimantNameContainingIgnoreCaseOrStatusContainingIgnoreCase("test", "test"))
                .thenReturn(Collections.singletonList(claim));
        List<Claim> claims = claimService.searchClaims("test");
        assertFalse(claims.isEmpty());
        assertEquals(1, claims.size());
    }
}
