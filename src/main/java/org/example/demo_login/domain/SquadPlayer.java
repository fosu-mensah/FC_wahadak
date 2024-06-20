package org.example.demo_login.domain;

import lombok.Data;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedJdbcTypes;
import org.apache.ibatis.type.MappedTypes;
import org.example.demo_login.util.JsonTypeHandler;

@Data
public class SquadPlayer {
    private int id;
    private int squadId;
    private int playerId;
    private String position;
    private PlayerInfo playerInfo;
}
