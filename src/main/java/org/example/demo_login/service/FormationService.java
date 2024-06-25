package org.example.demo_login.service;

import org.example.demo_login.domain.Formation;
import org.example.demo_login.Mapper.FormationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FormationService {

    @Autowired
    private FormationRepository formationRepository;

    public Formation getFormationById(int formationId) {
        return formationRepository.selectFormationById(formationId);
    }

    public List<Formation> getAllFormations() {
        return formationRepository.selectAllFormations();
    }

    public List<String> getPositionsByFormationId(int formationId) {
        return formationRepository.selectPositionsByFormationId(formationId);
    }
}
