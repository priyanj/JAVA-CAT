package com.cg.jcat.api.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cg.jcat.api.entity.DTProviderRule;
import com.cg.jcat.api.entity.DTProviders;

public interface IDTProviderRuleRepository extends JpaRepository<DTProviderRule, Integer>{


//	List<DTProviderRule> findByDtProviders(int providerId);

	List<DTProviderRule> findByDtProviders(Optional<DTProviders> findById);

	DTProviderRule findByProviderRuleId(int providerRuleId);


}
