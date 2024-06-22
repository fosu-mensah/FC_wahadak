package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.Formation;
import java.util.List;

@Mapper
public interface FormationRepository {

    @Select("SELECT formation_id AS formationId, formation_name AS formationName, description FROM formation WHERE formation_id = #{formationId}")
    Formation selectFormationById(int formationId);

    @Select("SELECT formation_id AS formationId, formation_name AS formationName, description FROM formation")
    List<Formation> selectAllFormations();

    @Select("SELECT position FROM formation_position WHERE formation_id = #{formationId}")
    List<String> selectPositionsByFormationId(int formationId);
}
