package org.example.demo_login.service;

import org.example.demo_login.domain.FormationPosition;
import org.example.demo_login.Mapper.FormationPositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FormationPositionService {

    @Autowired
    private FormationPositionRepository formationPositionRepository;

    public List<FormationPosition> getFormationPositionsByFormationId(int formationId) {
        return formationPositionRepository.selectFormationPositionsByFormationId(formationId);
    }
}