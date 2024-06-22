import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams , useLocation, useNavigate } from 'react-router-dom';
import { Button } from "reactstrap";
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import '../../../assets/scss/squadmaker/squadmake.scss';
import '../../../assets/scss/statColor/statColor.scss';
import soccerField from '../../../assets/images/football-stadium/soccer-field.png';
import '../../../assets/scss/squadmaker/maketeam.scss';
import '../../../assets/scss/Nexon_font/fonts.scss'
import "../../../../src/assets/scss/squadmaker/squadplayersearch.scss";
import SquadPlayerSearch from '../../../component/common/SquadMaker/SquadPlayerSearch';
import Warning from '../../common/warning/Warning';

const nation= {
    '알바니아': 'Albania.png',
    '알제리': 'Algeria.png',
    '아르헨티나': 'Argentina.png',
    '아르메니아': 'Armenia.png',
    '호주': 'Australia.png',
    '오스트리아': 'Austria.png',
    '아제르바이잔': 'Azerbaijan.png',
    '바레인': 'Bahrain.png',
    '방글라데시': 'Bangladesh.png',
    '벨기에': 'Belgium.png',
    '볼리비아': 'Bolivia.png',
    '보스니아 헤르체고비나': 'Bosnia & Herzegovina.png',
    '브라질': 'Brazil.png',
    '불가리아': 'Bulgaria.png',
    '카메룬': 'Cameroon.png',
    '캐나다': 'Canada.png',
    '칠레': 'Chile.png',
    '중국': 'China.png',
    '콜롬비아': 'Colombia.png',
    '콩고-브라자빌': 'Congo-Brazzaville.png',
    '프랑스': 'france.png',
    '크로아티아': 'Croatia.png',
    '덴마크': 'Denmark.png',
    '에콰도르': 'Ecuador.png',
    '이집트': 'Egypt.png',
    '잉글랜드': 'England.png',
    '핀란드': 'Finland.png',
    '가봉': 'Gabon.png',
    '조지아': 'Georgia.png',
    '독일': 'Germany.png',
    '가나': 'Ghana.png',
    '그리스': 'Greece.png',
    '헝가리': 'Hungary.png',
    '아이슬란드': 'Iceland.png',
    '이란': 'Iran.png',
    '이라크': 'Iraq.png',
    '아일랜드': 'Ireland.png',
    '이탈리아': 'Italy.png',
    '자메이카': 'Jamaica.png',
    '일본': 'Japan.png',
    '대한민국': 'Korea.png',
    '루마니아': 'Romania.png',
    '러시아': 'Russia.png',
    '스코틀랜드': 'Scotland.png',
    '세네갈': 'Senegal.png',
    '세르비아': 'Serbia.png',
    '슬로바키아': 'Slovakia.png',
    '슬로베니아': 'Slovenia.png',
    '스페인': 'Spain.png',
    '스웨덴': 'Sweden.png',
    '스위스': 'Switzerland.png',
    '터키': 'Turkey.png',
    '우크라이나': 'Ukraine.png',
    '우루과이': 'Uruguay.png',
    '미국': 'USA.png',
    '우즈베키스탄': 'Uzbekistan.png',
    '베네수엘라': 'Venezuela.png',
    '웨일스': 'Wales.png',
    '포르투갈' : 'Portugal.png',
    '폴란드' : 'Poland.png'
}

const formationCoordinates = {
    "3-4-3": {
        "GK": {"top": 85, "left": 46.9, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 46.5, "class": "defender"},
        "CB2": {"top": 70, "left": 27, "class": "defender"},
        "CB3": {"top": 70, "left": 66, "class": "defender"},
        "LM": {"top": 42, "left": 20, "class": "midfielder"},
        "CM": {"top": 50, "left": 37, "class": "midfielder"},
        "CM2": {"top": 50, "left": 53, "class": "midfielder"},
        "RM": {"top": 40.8, "left": 72, "class": "midfielder"},
        "LW": {"top": 18, "left": 20, "class": "attacker"},
        "ST": {"top": 10, "left": 43.5, "class": "attacker"},
        "RW": {"top": 17.1, "left": 70, "class": "attacker"}
    },
    "3-4-3(2)": {
        "GK": {"top": 85, "left": 46.9, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 46.5, "class": "defender"},
        "CB2": {"top": 70, "left": 27, "class": "defender"},
        "CB3": {"top": 70, "left": 66, "class": "defender"},
        "LM": {"top": 42, "left": 20, "class": "midfielder"},
        "CDM": {"top": 53, "left": 37, "class": "midfielder"},
        "CDM2": {"top": 52.8, "left": 52.5, "class": "midfielder"},
        "RM": {"top": 40.8, "left": 72, "class": "midfielder"},
        "LW": {"top": 18, "left": 20, "class": "attacker"},
        "ST": {"top": 10, "left": 43.5, "class": "attacker"},
        "RW": {"top": 17.1, "left": 69, "class": "attacker"}
    },
    "3-4-1-2": {
        "GK": {"top": 85, "left": 46.9, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 46.5, "class": "defender"},
        "CB2": {"top": 70, "left": 27, "class": "defender"},
        "CB3": {"top": 70, "left": 66, "class": "defender"},
        "LM": {"top": 42, "left": 20, "class": "midfielder"},
        "CM": {"top": 50, "left": 37, "class": "midfielder"},
        "CM2": {"top": 50, "left": 53, "class": "midfielder"},
        "RM": {"top": 40.8, "left": 72, "class": "midfielder"},
        "LW": {"top": 18, "left": 20, "class": "attacker"},
        "ST": {"top": 10, "left": 34.5, "class": "attacker"},
        "ST2": {"top": 9.5, "left": 50, "class": "attacker"}
    },
    "3-1-2-1-3": {
        "GK": {"top": 85, "left": 46.9, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 46.5, "class": "defender"},
        "CB2": {"top": 70, "left": 27, "class": "defender"},
        "CB3": {"top": 70, "left": 66, "class": "defender"},
        "CDM": {"top": 55, "left": 45, "class": "midfielder"},
        "CM": {"top": 43, "left": 33, "class": "midfielder"},
        "CM2": {"top": 42.5, "left": 56, "class": "midfielder"},
        "CAM": {"top": 25, "left": 44, "class": "midfielder"},
        "LW": {"top": 18, "left": 20, "class": "attacker"},
        "ST": {"top": 10, "left": 43.5, "class": "attacker"},
        "RW": {"top": 17.1, "left": 70, "class": "attacker"}
    },
    "3-2-3-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 50, "class": "defender"},
        "CB2": {"top": 70, "left": 50, "class": "defender"},
        "CB3": {"top": 70, "left": 50, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 40, "left": 50, "class": "midfielder"},
        "CAM": {"top": 40, "left": 50, "class": "midfielder"},
        "RM": {"top": 40, "left": 50, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "ST2": {"top": 20, "left": 50, "class": "attacker"}
    },
    "3-2-2-1-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 50, "class": "defender"},
        "CB2": {"top": 70, "left": 50, "class": "defender"},
        "CB3": {"top": 70, "left": 50, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 50, "left": 50, "class": "midfielder"},
        "RM": {"top": 50, "left": 50, "class": "midfielder"},
        "CAM": {"top": 40, "left": 50, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "ST2": {"top": 20, "left": 50, "class": "attacker"}
    },
    "3-1-4-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "CB": {"top": 70, "left": 50, "class": "defender"},
        "CB2": {"top": 70, "left": 50, "class": "defender"},
        "CB3": {"top": 70, "left": 50, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "CM": {"top": 50, "left": 50, "class": "midfielder"},
        "CM2": {"top": 50, "left": 50, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "ST2": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-5-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 50, "class": "defender"},
        "CB2": {"top": 70, "left": 50, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "CDM": {"top": 50, "left": 50, "class": "midfielder"},
        "CM": {"top": 50, "left": 50, "class": "midfielder"},
        "CM2": {"top": 50, "left": 50, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-4-2": {
        "GK": {"top": 89, "left": 46, "class": "goalkeeper"},
        "LB": {"top": 68, "left": 19, "class": "defender"},
        "CB": {"top": 71.5, "left": 36, "class": "defender"},
        "CB2": {"top": 71.5, "left": 55, "class": "defender"},
        "RB": {"top": 68, "left": 74, "class": "defender"},
        "LM": {"top": 39.5, "left": 19, "class": "midfielder"},
        "CM": {"top": 45, "left": 36, "class": "midfielder"},
        "CM2": {"top": 45, "left": 55, "class": "midfielder"},
        "RM": {"top": 39.5, "left": 73, "class": "midfielder"},
        "ST": {"top": 13, "left": 35, "class": "attacker"},
        "ST2": {"top": 13, "left": 55, "class": "attacker"}
    },
    "4-4-2(2)": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB1": {"top": 70, "left": 50, "class": "defender"},
        "CB2": {"top": 70, "left": 50, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "CM": {"top": 50, "left": 50, "class": "midfielder"},
        "CM2": {"top": 50, "left": 50, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "ST2": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-4-1-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 50, "class": "defender"},
        "CB2": {"top": 70, "left": 50, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "CM": {"top": 50, "left": 50, "class": "midfielder"},
        "CM2": {"top": 50, "left": 50, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "CF": {"top": 30, "left": 50, "class": "attacker"},
        "ST": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-3-3": {
        "GK": {"top": 91, "left": 45.5, "class": "goalkeeper"},
        "LB": {"top": 68, "left": 19, "class": "defender"},
        "CB": {"top": 71.5, "left": 36, "class": "defender"},
        "CB2": {"top": 71.5, "left": 55, "class": "defender"},
        "RB": {"top": 68, "left": 74, "class": "defender"},
        "CM": {"top": 45, "left": 45.5, "class": "midfielder"},
        "CM2": {"top": 44.5, "left": 25, "class": "midfielder"},
        "CM3": {"top": 44.2, "left": 65, "class": "midfielder"},
        "LW": {"top": 18, "left": 20, "class": "attacker"},
        "ST": {"top": 13, "left": 45.5, "class": "attacker"},
        "RW": {"top": 17.1, "left": 72, "class": "attacker"}
    },
    "4-3-3(2)": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CDM2": {"top": 50, "left": 45, "class": "midfielder"},
        "CM": {"top": 50, "left": 55, "class": "midfielder"},
        "LW": {"top": 25, "left": 30, "class": "attacker"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "RW": {"top": 25, "left": 70, "class": "attacker"}
    },
    "4-3-2-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CM": {"top": 50, "left": 40, "class": "midfielder"},
        "CM2": {"top": 50, "left": 50, "class": "midfielder"},
        "CM3": {"top": 50, "left": 60, "class": "midfielder"},
        "LF": {"top": 40, "left": 40, "class": "attacker"},
        "RF": {"top": 40, "left": 60, "class": "attacker"},
        "ST": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-3-1-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CM": {"top": 50, "left": 40, "class": "midfielder"},
        "CM2": {"top": 50, "left": 50, "class": "midfielder"},
        "CM3": {"top": 50, "left": 60, "class": "midfielder"},
        "CAM": {"top": 40, "left": 50, "class": "midfielder"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
        "ST2": {"top": 20, "left": 55, "class": "attacker"}
    },
    "4-2-4": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CM": {"top": 60, "left": 45, "class": "midfielder"},
        "CM2": {"top": 60, "left": 55, "class": "midfielder"},
        "LW": {"top": 25, "left": 30, "class": "attacker"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
        "ST2": {"top": 20, "left": 55, "class": "attacker"},
        "RW": {"top": 25, "left": 70, "class": "attacker"}
    },
    "4-2-3-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 45, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "CAM": {"top": 40, "left": 50, "class": "midfielder"},
        "CAM2": {"top": 25, "left": 30, "class": "midfielder"},
        "CAM3": {"top": 25, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-2-2-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 45, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
        "ST2": {"top": 20, "left": 55, "class": "attacker"}
    },
    "4-2-2-2(2)": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 45, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "LM": {"top": 40, "left": 45, "class": "midfielder"},
        "RM": {"top": 40, "left": 55, "class": "midfielder"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
        "ST2": {"top": 20, "left": 55, "class": "attacker"}
    },
    "4-2-1-3": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 45, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "CAM": {"top": 40, "left": 50, "class": "midfielder"},
        "LW": {"top": 25, "left": 30, "class": "attacker"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "RW": {"top": 25, "left": 70, "class": "attacker"}
    },
    "4-2-1-3(2)": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 45, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "CAM": {"top": 40, "left": 50, "class": "midfielder"},
        "LW": {"top": 25, "left": 30, "class": "attacker"},
        "ST": {"top": 20, "left": 50, "class": "attacker"},
        "RW": {"top": 25, "left": 70, "class": "attacker"}
    },
    "4-1-4-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "CM": {"top": 50, "left": 45, "class": "midfielder"},
        "CM2": {"top": 50, "left": 55, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 50, "class": "attacker"}
    },
    "4-1-3-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CM": {"top": 50, "left": 45, "class": "midfielder"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "RM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
        "ST2": {"top": 20, "left": 55, "class": "attacker"}
    },
    "4-1-2-3": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CM": {"top": 50, "left": 45, "class": "midfielder"},
        "CM2": {"top": 50, "left": 55, "class": "midfielder"},
        "RW": {"top": 50, "left": 30, "class": "attacker"},
        "ST": {"top": 50, "left": 70, "class": "attacker"},
        "LW": {"top": 20, "left": 45, "class": "attacker"},
    },
    "4-1-2-1-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 50, "left": 45, "class": "midfielder"},
        "RM": {"top": 50, "left": 55, "class": "midfielder"},
        "CAM": {"top": 50, "left": 30, "class": "attacker"},
        "ST": {"top": 50, "left": 70, "class": "attacker"},
        "ST2": {"top": 20, "left": 45, "class": "attacker"},
    },
    "4-1-2-1-2(2)": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 50, "left": 45, "class": "midfielder"},
        "RM": {"top": 50, "left": 55, "class": "midfielder"},
        "CAM": {"top": 50, "left": 30, "class": "attacker"},
        "ST": {"top": 50, "left": 70, "class": "attacker"},
        "ST2": {"top": 20, "left": 45, "class": "attacker"},
    },
    "4-2-2-1-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "RM": {"top": 50, "left": 55, "class": "midfielder"},
        "LM": {"top": 50, "left": 30, "class": "attacker"},
        "CAM": {"top": 50, "left": 70, "class": "attacker"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
    },
    "4-2-1-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "RB": {"top": 70, "left": 70, "class": "defender"},
        "CDM": {"top": 60, "left": 50, "class": "midfielder"},
        "CDM2": {"top": 60, "left": 55, "class": "midfielder"},
        "CM": {"top": 50, "left": 55, "class": "midfielder"},
        "CAM": {"top": 50, "left": 30, "class": "attacker"},
        "ST": {"top": 50, "left": 70, "class": "attacker"},
        "ST2": {"top": 20, "left": 45, "class": "attacker"},
    },
    "5-4-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LWB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "CB3": {"top": 70, "left": 70, "class": "defender"},
        "RWB": {"top": 60, "left": 50, "class": "midfielder"},
        "LM": {"top": 60, "left": 55, "class": "midfielder"},
        "CM": {"top": 50, "left": 55, "class": "midfielder"},
        "CM2": {"top": 50, "left": 30, "class": "attacker"},
        "RM": {"top": 50, "left": 70, "class": "attacker"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
    },
    "5-3-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LWB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "CB3": {"top": 70, "left": 70, "class": "defender"},
        "RWB": {"top": 60, "left": 50, "class": "midfielder"},
        "CM": {"top": 60, "left": 55, "class": "midfielder"},
        "CM2": {"top": 50, "left": 55, "class": "midfielder"},
        "CM3": {"top": 50, "left": 30, "class": "attacker"},
        "ST": {"top": 50, "left": 70, "class": "attacker"},
        "ST2": {"top": 20, "left": 45, "class": "attacker"},
    },
    "5-2-3": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LWB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "CB3": {"top": 70, "left": 70, "class": "defender"},
        "RWB": {"top": 60, "left": 50, "class": "midfielder"},
        "CM": {"top": 60, "left": 55, "class": "midfielder"},
        "CM2": {"top": 50, "left": 55, "class": "midfielder"},
        "RW": {"top": 50, "left": 30, "class": "attacker"},
        "ST": {"top": 50, "left": 70, "class": "attacker"},
        "LW": {"top": 20, "left": 45, "class": "attacker"},
    },
    "5-2-1-2": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LWB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "CB3": {"top": 70, "left": 70, "class": "defender"},
        "CDM1": {"top": 50, "left": 55, "class": "midfielder"},
        "CDM2": {"top": 50, "left": 30, "class": "attacker"},
        "CM": {"top": 60, "left": 55, "class": "midfielder"},
        "CAM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
        "ST2": {"top": 60, "left": 50, "class": "midfielder"},
    },
    "5-1-2-1-1": {
        "GK": {"top": 85, "left": 50, "class": "goalkeeper"},
        "LWB": {"top": 70, "left": 30, "class": "defender"},
        "CB": {"top": 70, "left": 45, "class": "defender"},
        "CB2": {"top": 70, "left": 55, "class": "defender"},
        "CB3": {"top": 70, "left": 70, "class": "defender"},
        "RWB": {"top": 60, "left": 50, "class": "midfielder"},
        "CDM": {"top": 60, "left": 55, "class": "midfielder"},
        "RM": {"top": 50, "left": 55, "class": "midfielder"},
        "LM": {"top": 50, "left": 30, "class": "midfielder"},
        "CAM": {"top": 50, "left": 70, "class": "midfielder"},
        "ST": {"top": 20, "left": 45, "class": "attacker"},
    },
}
const getStatColorClass = (value) => {
    if (value <= 59) return 'stat-color-0-59';
    if (value <= 69) return 'stat-color-60-69';
    if (value <= 79) return 'stat-color-70-79';
    if (value <= 89) return 'stat-color-80-89';
    if (value <= 99) return 'stat-color-90-99';
    if (value <= 109) return 'stat-color-100-109';
    if (value <= 119) return 'stat-color-110-119';
    if (value <= 129) return 'stat-color-120-129';
    if (value <= 139) return 'stat-color-130-139';
    if (value <= 149) return 'stat-color-140-149';
    if (value <= 159) return 'stat-color-150-159'
    return "stat-color-160-169";
};

const Player = ({ player, index, movePlayer }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'player',
        item: { index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    const [, drop] = useDrop(() => ({
        accept: 'player',
        hover: (draggedItem) => {
            if (draggedItem.index !== index) {
                movePlayer(draggedItem.index, index);
                draggedItem.index = index;
            }
        },
    }));

    return (
        <div ref={(node) => drag(drop(node))} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <div className="player-info">
                <p style={{
                    marginBottom: "-3px",
                    fontSize: "1rem",
                    fontWeight: "bolder",
                }}>{player.position} {
                    Math.max(...Object.values(player.playerInfo['포지션 스탯']))
                }</p>
                <img style={{ width: "6rem" }}
                     src={player.playerInfo['이미지 URL']}
                     alt={player.playerInfo['선수이름']}
                     className="player-image"
                     onError={e => (e.target.src = 'path_to_default_image')}
                />
                <div className="player-name-season"
                     style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ width: '30px', height: '25px', marginTop: '3px' }}
                         src={player.playerInfo['시즌 URL']}
                         alt="Season"
                         className="season-image"
                         onError={e => (e.target.src = 'path_to_default_image')}
                    />
                    <p style={{
                        fontSize: '13px',
                        marginTop: '5px',
                        marginBottom: "0"
                    }}>{player.playerInfo['선수이름']}</p>
                </div>
                <p style={{fontSize:'11.8px',marginTop:'-5px'}}>급여: {player.playerInfo['급여']}</p>
            </div>
        </div>
    );
};

const MakeTeam = () => {
    const { squadId } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const squadData = location.state || {};
    const [formation, setFormation] = useState({ positions: [] });
    const [players, setPlayers] = useState([]);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [showPlayerSearch, setShowPlayerSearch] = useState(true);
    const [totalSalary, setTotalSalary] = useState(0);
    const [showSaveWarning, setShowSaveWarning] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const fieldRef = useRef(null);

    useEffect(() => {
        const fetchSquadDetails = async () => {
            try {
                const squadResponse = await axios.get(`/api/squad/${squadId}`);
                const playersResponse = await axios.get(`/api/squad/maker/${squadId}/players`);
                console.log('Squad:', squadResponse.data);
                console.log('Squad players:', playersResponse.data);

                const formationData = {
                    formationId: squadResponse.data.formationId,
                    formationName: squadResponse.data.formationName || '',
                    positions: Object.keys(formationCoordinates[squadResponse.data.formationName] || {})
                };

                const players = playersResponse.data.map(player => {
                    console.log('Before replacement:', player.playerInfo["시즌 URL"]);
                    const updatedPlayer = {
                        ...player,
                        playerInfo: {
                            ...player.playerInfo,
                            "시즌 URL": player.playerInfo["시즌 URL"] ? player.playerInfo["시즌 URL"].replace('/Users/leeeunhak/Desktop/images/', '/FC_wahadak/assets/images/seasons/') : ''
                        }
                    };
                    console.log('After replacement:', updatedPlayer.playerInfo["시즌 URL"]);
                    return updatedPlayer;
                });

                console.log('Players after URL replacement:', players);

                setFormation(formationData);
                setPlayers(players);
                const total = players.reduce((sum, player) => sum + parseInt(player.playerInfo['급여'], 10), 0);
                setTotalSalary(total);
            } catch (error) {
                console.error('Error fetching squad details:', error);
                const formationName = formationCoordinates[squadData.formationName] ? squadData.formationName : '4-4-2';
                setFormation({
                    formationId: null,
                    formationName: formationName,
                    positions: Object.keys(formationCoordinates[formationName] || {})
                });
            }
        };

        fetchSquadDetails();
    }, [squadId]);

    const handlePositionClick = position => {
        setSelectedPosition(position);
        setShowPlayerSearch(true);
    };

    const handlePlayerSearchClose = () => {
        setSelectedPosition(null);
    };

    const handlePlayerAdd = async (playerId, playerData) => {
        try {
            await axios.post(`/api/squad/maker/${squadId}/addPlayer`, {
                playerId,
                position: selectedPosition,
                playerInfo: playerData,
            });

            const newPlayer = {
                ...playerData,
                position: selectedPosition,
                playerInfo: {
                    ...playerData,
                    '시즌 URL': playerData['시즌 URL'].replace(
                        '/Users/leeeunhak/Desktop/images/',
                        '/FC_wahadak/assets/images/seasons/'
                    ),
                },
            };

            const newPlayers = [...players, newPlayer];
            setPlayers(newPlayers);

            const total = newPlayers.reduce((sum, player) => sum + parseInt(player.playerInfo['급여'], 10), 0);
            setTotalSalary(total);
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    const handleSaveSquad = async () => {
        try {
            const playerRequests = players.map(player => ({
                playerId: player.playerInfo.pid,
                position: player.position,
                playerInfo: player.playerInfo,
            }));
            await axios.post(`/api/squad/maker/${squadId}/save`, playerRequests);
            setShowSaveWarning(true);
        } catch (error) {
            console.error('Error saving squad:', error);
        }
    };

    const handleResetSquad = async () => {
        try {
            await axios.delete(`/api/squad/maker/${squadId}/players`);
            setPlayers([]);
            setTotalSalary(0);
        } catch (error) {
            console.error('Error resetting squad:', error);
        }
    };

    const handleContinueTeam = () => {
        setShowSaveWarning(false);
    };

    const handleGoToSquadList = () => {
        navigate(`${process.env.PUBLIC_URL}/squad-list`);
    };

    const movePlayer = (fromIndex, toIndex) => {
        const updatedPlayers = [...players];

        const fromPlayer = updatedPlayers.find(player => player.position === formation.positions[fromIndex]);
        const toPlayer = updatedPlayers.find(player => player.position === formation.positions[toIndex]);

        if (fromPlayer && toPlayer) {
            const tempPosition = fromPlayer.position;
            fromPlayer.position = toPlayer.position;
            toPlayer.position = tempPosition;
        } else if (fromPlayer) {
            fromPlayer.position = formation.positions[toIndex];
        } else if (toPlayer) {
            toPlayer.position = formation.positions[fromIndex];
        }

        setPlayers(updatedPlayers);
    };

    const handleSearch = async (searchParams) => {
        try {
            const response = await axios.get("/players/search", {
                params: searchParams,
            });
            if (response.status === 200) {
                const players = response.data.map(player => ({
                    ...player,
                    "시즌 URL": player["시즌 URL"].replace('/Users/leeeunhak/Desktop/images/', '/FC_wahadak/assets/images/seasons/')
                }));
                setSearchResult(players);
            } else {
                setSearchResult([]);
            }
        } catch (error) {
            console.error("Error searching player:", error);
            setSearchResult([]);
        }
    };

    const openPlayerDetail = (pid) => {
        window.open(`${process.env.PUBLIC_URL}/player/${pid}`, "_blank", "noopener,noreferrer");
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="make-squad">
                <h1 style={{marginRight: "1rem"}}><strong>스쿼드 메이커</strong></h1>
                <div className="squad-info" style={{marginRight: "1rem"}}>
                    <div style={{fontSize:'1.8rem',marginBottom:'1rem'}}>팀 이름: {squadData.squadName}</div>
                    <div style={{
                        fontSize: '1.5rem',
                        textAlign: 'center',
                        marginBottom: '2rem',
                    }}>Formation: <strong>{formation.formationName}</strong></div>
                </div>
                <div className="content-wrapper">
                    <div style={{
                        fontSize: '1.3rem',
                        float: 'left',
                        marginRight: '1.5rem',
                        textAlign: 'center',
                        color: totalSalary > 255 ? 'red' : 'black'
                    }}>
                        급여
                        <div style={{display: "flex"}}>
                            <strong>{totalSalary}</strong>/255 {totalSalary > 255 && '급여 초과!'}
                        </div>
                    </div>
                    <div className="soccer-field-container" ref={fieldRef} style={{position: 'relative'}}>
                        <img src={soccerField} alt="Soccer Field" className="soccer-field"/>
                        {formation.positions.map((position, index) => {
                            const coordinates = formationCoordinates[formation.formationName]?.[position] || {};
                            const player = players.find(p => p.position === position);
                            return (
                                <div
                                    key={index}
                                    className={`player-position ${coordinates.class || ''}`}
                                    style={{
                                        top: `${coordinates.top}%`,
                                        left: `${coordinates.left}%`,
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onClick={() => handlePositionClick(position)}
                                >
                                    {player ? (
                                        <Player player={player} index={index} movePlayer={movePlayer}/>
                                    ) : (
                                        <div className="position-circle">{position}</div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="player-search-container">
                        {showPlayerSearch && (
                            <SquadPlayerSearch
                                position={selectedPosition}
                                onClose={handlePlayerSearchClose}
                                onSearch={handleSearch}
                            />
                        )}
                    </div>
                    <div className="buttons-container"
                         style={{textAlign: 'right', paddingRight: '1rem', marginTop: '1rem'}}>
                        <button onClick={handleSaveSquad} style={{marginRight: '1rem'}}>스쿼드 저장</button>
                        <button onClick={handleResetSquad} style={{color: 'white'}}>스쿼드 초기화</button>
                    </div>
                    <Warning
                        show={showSaveWarning}
                        title="스쿼드 저장"
                        message="스쿼드가 저장되었습니다!"
                        onClose={handleContinueTeam}
                        onConfirm={handleGoToSquadList}
                    />
                </div>
                <div className="search-result-container">
                    {searchResult.length > 0 ? (
                        <ul>
                            {searchResult.map((player, index) => (
                                <li key={index} className="player-card">
                                    <div className="player-header">
                                        <img
                                            src={`${player["시즌 URL"]}`}
                                            alt={`시즌 ${player["시즌"]}`}
                                            className="season-image"
                                        />
                                        <h3>{player["선수이름"]}</h3>
                                    </div>
                                    <div className="ProfileCard-description">
                                        <strong>급여:</strong> {player["급여"]} - {player["포지션 스탯"] ?
                                        Object.entries(player["포지션 스탯"]).map(([key, value], index) => (
                                            <span key={key}>
                                                    <strong>{key}:</strong> {value}
                                                {index < Object.entries(player["포지션 스탯"]).length - 1 ? ' ' : ''}
                                                </span>
                                        ))
                                        : null}
                                    </div>
                                    <img
                                        src={player["이미지 URL"]}
                                        alt={player["선수이름"]}
                                        className="player-profile-image"
                                    />
                                    <div className="player-info">
                                        <p><strong>시즌:</strong> {player["시즌"]}</p>
                                        {nation[player["국적"]] && (
                                            <img
                                                src={`/FC_wahadak/assets/images/nation/${nation[player["국적"]]}`}
                                                alt={player["국적"]}
                                                className="nationality-image"
                                                style={{width: '40px', height: '30px', marginLeft: '5px', marginBottom: '3px'}}
                                            />
                                        )}
                                        {player["국적"]}{" "}
                                        <p><strong>생년월일:</strong> {player["생년 월일"]}</p>
                                        <p><strong>키:</strong> {player["키"]}cm - <strong>몸무게:</strong> {player["몸무게"]}kg
                                        </p>
                                        <p><strong>체형:</strong> {player["체형"]}</p>
                                        <p><strong>주발:</strong> {player["발"]}</p>
                                    </div>
                                    <div className="player-stats">
                                        {player["포지션"] === "GK" ? (
                                            <div className="goalkeeper-stats">
                                                <div className={`stat ${getStatColorClass(player["다이빙"])}`}>
                                                    <strong>다이빙</strong><span>{player["다이빙"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["골핸들링"])}`}>
                                                    <strong>골핸들링</strong><span>{player["골핸들링"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["킥"])}`}>
                                                    <strong>킥</strong><span>{player["킥"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["반응속도"])}`}>
                                                    <strong>반응속도</strong><span>{player["반응속도"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["GK 스피드"])}`}>
                                                    <strong>GK 스피드</strong><span>{player["GK 스피드"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["위치선정"])}`}>
                                                    <strong>위치선정</strong><span>{player["위치선정"]}</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="field-player-stats">
                                                <div className={`stat ${getStatColorClass(player["스피드"])}`}>
                                                    <strong>스피드</strong><span>{player["스피드"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["슛"])}`}>
                                                    <strong>슛</strong><span>{player["슛"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["패스"])}`}>
                                                    <strong>패스</strong><span>{player["패스"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["드리블"])}`}>
                                                    <strong>드리블</strong><span>{player["드리블"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["수비"])}`}>
                                                    <strong>수비</strong><span>{player["수비"]}</span>
                                                </div>
                                                <div className={`stat ${getStatColorClass(player["피지컬"])}`}>
                                                    <strong>피지컬</strong><span>{player["피지컬"]}</span>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="player-buttons" style={{display: "flex"}}>
                                        <Button color="primary" onClick={() => handlePlayerAdd(player.pid, player)}
                                                style={{width: "50%", marginRight: "5px", height: "3rem"}}>
                                            스쿼드에 추가
                                        </Button>
                                        <Button color="secondary" onClick={() => openPlayerDetail(player.pid)}
                                                style={{width: "50%", height: "3rem"}}>
                                            선수 상세 정보
                                        </Button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )}
                </div>
            </div>
        </DndProvider>
    );
};

export default MakeTeam;