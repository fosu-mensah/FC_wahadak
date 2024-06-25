package org.example.demo_login.Mapper;

import org.apache.ibatis.annotations.*;
import org.example.demo_login.domain.FormationPosition;
import java.util.List;

@Mapper
public interface FormationPositionRepository {

    @Select("SELECT id, formation_id AS formationId, position FROM formation_position WHERE formation_id = #{formationId}")
    List<FormationPosition> selectFormationPositionsByFormationId(int formationId);
}
