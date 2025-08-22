package com.example.claimsmanagement.controller;

import com.example.claimsmanagement.model.Claim;
import com.example.claimsmanagement.service.ClaimService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ClaimController.class)
public class ClaimControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ClaimService claimService;

    @Autowired
    private ObjectMapper objectMapper;

    private Claim claim;

    @BeforeEach
    void setUp() {
        claim = new Claim(1L, "Test Claimant", new BigDecimal("1000.00"), LocalDate.now(), "Pending");
    }

    @Test
    void testGetAllClaims() throws Exception {
        given(claimService.getAllClaims()).willReturn(Collections.singletonList(claim));

        mockMvc.perform(get("/claims"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].claimantName").value(claim.getClaimantName()));
    }

    @Test
    void testGetClaimById() throws Exception {
        given(claimService.getClaimById(1L)).willReturn(Optional.of(claim));

        mockMvc.perform(get("/claims/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.claimantName").value(claim.getClaimantName()));
    }

    @Test
    void testCreateClaim() throws Exception {
        given(claimService.createClaim(any(Claim.class))).willReturn(claim);

        mockMvc.perform(post("/claims")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(claim)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.claimantName").value(claim.getClaimantName()));
    }

    @Test
    void testUpdateClaim() throws Exception {
        given(claimService.updateClaim(any(Long.class), any(Claim.class))).willReturn(claim);

        mockMvc.perform(put("/claims/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(claim)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.claimantName").value(claim.getClaimantName()));
    }

    @Test
    void testDeleteClaim() throws Exception {
        mockMvc.perform(delete("/claims/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    void testSearchClaims() throws Exception {
        given(claimService.searchClaims("test")).willReturn(Collections.singletonList(claim));

        mockMvc.perform(get("/claims/search?query=test"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].claimantName").value(claim.getClaimantName()));
    }
}
