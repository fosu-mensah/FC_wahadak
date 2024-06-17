import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/scss/squadmaker/squadmake.scss';
import soccerField from '../../../assets/images/football-stadium/soccer-field.png';
import { useNavigate } from 'react-router-dom'; // react-router-dom의 useNavigate 훅 사용
import Warning from '../../common/warning/Warning';

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
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "CB": { "top": 70, "left": 50, "class": "defender" },
        "CB2": { "top": 70, "left": 50, "class": "defender" },
        "CB3": { "top": 70, "left": 50, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 50, "class": "midfielder" },
        "LM": { "top": 50, "left": 50, "class": "midfielder" },
        "RM": { "top": 50, "left": 50, "class": "midfielder" },
        "CAM": { "top": 40, "left": 50, "class": "midfielder" },
        "ST": { "top": 20, "left": 50, "class": "attacker" },
        "ST2": { "top": 20, "left": 50, "class": "attacker" }
    },
    "3-1-4-2": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "CB": { "top": 70, "left": 50, "class": "defender" },
        "CB2": { "top": 70, "left": 50, "class": "defender" },
        "CB3": { "top": 70, "left": 50, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "CM": { "top": 50, "left": 50, "class": "midfielder" },
        "CM2": { "top": 50, "left": 50, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 50, "class": "attacker" },
        "ST2": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-5-1": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 50, "class": "defender" },
        "CB2": { "top": 70, "left": 50, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "CDM": { "top": 50, "left": 50, "class": "midfielder" },
        "CM": { "top": 50, "left": 50, "class": "midfielder" },
        "CM2": { "top": 50, "left": 50, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-4-2": {
        "GK": {"top": 85, "left": 46.9, "class": "goalkeeper"},
        "LB": { "top": 68, "left": 19, "class": "defender" },
        "CB": {"top": 72, "left": 36, "class": "defender"},
        "CB2": { "top": 71.5, "left": 55, "class": "defender" },
        "RB": { "top": 69.5, "left": 74, "class": "defender" },
        "LM": {"top": 39.5, "left": 17, "class": "midfielder"},
        "CM": {"top": 43, "left": 35, "class": "midfielder"},
        "CM2": {"top": 42.5, "left": 54, "class": "midfielder"},
        "RM": {"top": 40.8, "left": 73, "class": "midfielder"},
        "ST": {"top": 10, "left": 34.5, "class": "attacker"},
        "ST2": {"top": 9.5, "left": 50, "class": "attacker"}
    },
    "4-4-2(2)": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB1": { "top": 70, "left": 50, "class": "defender" },
        "CB2": { "top": 70, "left": 50, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "CM": { "top": 50, "left": 50, "class": "midfielder" },
        "CM2": { "top": 50, "left": 50, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 50, "class": "attacker" },
        "ST2": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-4-1-1": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 50, "class": "defender" },
        "CB2": { "top": 70, "left": 50, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "CM": { "top": 50, "left": 50, "class": "midfielder" },
        "CM2": { "top": 50, "left": 50, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "CF": { "top": 30, "left": 50, "class": "attacker" },
        "ST": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-3-3": {
        "GK": {"top": 85, "left": 46.9, "class": "goalkeeper"},
        "LB": { "top": 68, "left": 19, "class": "defender" },
        "CB": {"top": 72, "left": 36, "class": "defender"},
        "CB2": { "top": 71.5, "left": 55, "class": "defender" },
        "RB": { "top": 69.5, "left": 74, "class": "defender" },
        "CM": { "top": 45, "left": 45, "class": "midfielder" },
        "CM2": { "top": 44.5, "left": 25, "class": "midfielder" },
        "CM3": { "top":44.2, "left": 65, "class": "midfielder" },
        "LW": {"top": 18, "left": 20, "class": "attacker"},
        "ST": {"top": 10, "left": 43.5, "class": "attacker"},
        "RW": {"top": 17.1, "left": 70, "class": "attacker"}
    },
    "4-3-3(2)": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "CDM2": { "top": 50, "left": 45, "class": "midfielder" },
        "CM": { "top": 50, "left": 55, "class": "midfielder" },
        "LW": { "top": 25, "left": 30, "class": "attacker" },
        "ST": { "top": 20, "left": 50, "class": "attacker" },
        "RW": { "top": 25, "left": 70, "class": "attacker" }
    },
    "4-3-2-1": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CM": { "top": 50, "left": 40, "class": "midfielder" },
        "CM2": { "top": 50, "left": 50, "class": "midfielder" },
        "CM3": { "top": 50, "left": 60, "class": "midfielder" },
        "LF": { "top": 40, "left": 40, "class": "attacker" },
        "RF": { "top": 40, "left": 60, "class": "attacker" },
        "ST": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-3-1-2": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CM": { "top": 50, "left": 40, "class": "midfielder" },
        "CM2": { "top": 50, "left": 50, "class": "midfielder" },
        "CM3": { "top": 50, "left": 60, "class": "midfielder" },
        "CAM": { "top": 40, "left": 50, "class": "midfielder" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
        "ST2": { "top": 20, "left": 55, "class": "attacker" }
    },
    "4-2-4": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CM": { "top": 60, "left": 45, "class": "midfielder" },
        "CM2": { "top": 60, "left": 55, "class": "midfielder" },
        "LW": { "top": 25, "left": 30, "class": "attacker" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
        "ST2": { "top": 20, "left": 55, "class": "attacker" },
        "RW": { "top": 25, "left": 70, "class": "attacker" }
    },
    "4-2-3-1": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 45, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "CAM": { "top": 40, "left": 50, "class": "midfielder" },
        "CAM2": { "top": 25, "left": 30, "class": "midfielder" },
        "CAM3": { "top": 25, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-2-2-2": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 45, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
        "ST2": { "top": 20, "left": 55, "class": "attacker" }
    },
    "4-2-2-2(2)": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 45, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "LM": { "top": 40, "left": 45, "class": "midfielder" },
        "RM": { "top": 40, "left": 55, "class": "midfielder" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
        "ST2": { "top": 20, "left": 55, "class": "attacker" }
    },
    "4-2-1-3": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 45, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "CAM": { "top": 40, "left": 50, "class": "midfielder" },
        "LW": { "top": 25, "left": 30, "class": "attacker" },
        "ST": { "top": 20, "left": 50, "class": "attacker" },
        "RW": { "top": 25, "left": 70, "class": "attacker" }
    },
    "4-2-1-3(2)": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 45, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "CAM": { "top": 40, "left": 50, "class": "midfielder" },
        "LW": { "top": 25, "left": 30, "class": "attacker" },
        "ST": { "top": 20, "left": 50, "class": "attacker" },
        "RW": { "top": 25, "left": 70, "class": "attacker" }
    },
    "4-1-4-1": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "CM": { "top": 50, "left": 45, "class": "midfielder" },
        "CM2": { "top": 50, "left": 55, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 50, "class": "attacker" }
    },
    "4-1-3-2": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "CM": { "top": 50, "left": 45, "class": "midfielder" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "RM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
        "ST2": { "top": 20, "left": 55, "class": "attacker" }
    },
    "4-1-2-3": {
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "CM": { "top": 50, "left": 45, "class": "midfielder" },
        "CM2": { "top": 50, "left": 55, "class": "midfielder" },
        "RW": { "top": 50, "left": 30, "class": "attacker" },
        "ST": { "top": 50, "left": 70, "class": "attacker" },
        "LW": { "top": 20, "left": 45, "class": "attacker" },
    },
    "4-1-2-1-2":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "LM": { "top": 50, "left": 45, "class": "midfielder" },
        "RM": { "top": 50, "left": 55, "class": "midfielder" },
        "CAM": { "top": 50, "left": 30, "class": "attacker" },
        "ST": { "top": 50, "left": 70, "class": "attacker" },
        "ST2": { "top": 20, "left": 45, "class": "attacker" },
    },
    "4-1-2-1-2(2)":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "LM": { "top": 50, "left": 45, "class": "midfielder" },
        "RM": { "top": 50, "left": 55, "class": "midfielder" },
        "CAM": { "top": 50, "left": 30, "class": "attacker" },
        "ST": { "top": 50, "left": 70, "class": "attacker" },
        "ST2": { "top": 20, "left": 45, "class": "attacker" },
    },
    "4-2-2-1-1":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "RM": { "top": 50, "left": 55, "class": "midfielder" },
        "LM": { "top": 50, "left": 30, "class": "attacker" },
        "CAM": { "top": 50, "left": 70, "class": "attacker" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
    },
    "4-2-1-2":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "RB": { "top": 70, "left": 70, "class": "defender" },
        "CDM": { "top": 60, "left": 50, "class": "midfielder" },
        "CDM2": { "top": 60, "left": 55, "class": "midfielder" },
        "CM": { "top": 50, "left": 55, "class": "midfielder" },
        "CAM": { "top": 50, "left": 30, "class": "attacker" },
        "ST": { "top": 50, "left": 70, "class": "attacker" },
        "ST2": { "top": 20, "left": 45, "class": "attacker" },
    },
    "5-4-1":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LWB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "CB3": { "top": 70, "left": 70, "class": "defender" },
        "RWB": { "top": 60, "left": 50, "class": "midfielder" },
        "LM": { "top": 60, "left": 55, "class": "midfielder" },
        "CM": { "top": 50, "left": 55, "class": "midfielder" },
        "CM2": { "top": 50, "left": 30, "class": "attacker" },
        "RM": { "top": 50, "left": 70, "class": "attacker" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
    },
    "5-3-2":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LWB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "CB3": { "top": 70, "left": 70, "class": "defender" },
        "RWB": { "top": 60, "left": 50, "class": "midfielder" },
        "CM": { "top": 60, "left": 55, "class": "midfielder" },
        "CM2": { "top": 50, "left": 55, "class": "midfielder" },
        "CM3": { "top": 50, "left": 30, "class": "attacker" },
        "ST": { "top": 50, "left": 70, "class": "attacker" },
        "ST2": { "top": 20, "left": 45, "class": "attacker" },
    },
    "5-2-3":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LWB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "CB3": { "top": 70, "left": 70, "class": "defender" },
        "RWB": { "top": 60, "left": 50, "class": "midfielder" },
        "CM": { "top": 60, "left": 55, "class": "midfielder" },
        "CM2": { "top": 50, "left": 55, "class": "midfielder" },
        "RW": { "top": 50, "left": 30, "class": "attacker" },
        "ST": { "top": 50, "left": 70, "class": "attacker" },
        "LW": { "top": 20, "left": 45, "class": "attacker" },
    },
    "5-2-1-2":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LWB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "CB3": { "top": 70, "left": 70, "class": "defender" },
        "CDM1": { "top": 50, "left": 55, "class": "midfielder" },
        "CDM2": { "top": 50, "left": 30, "class": "attacker" },
        "CM": { "top": 60, "left": 55, "class": "midfielder" },
        "CAM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
        "ST2": { "top": 60, "left": 50, "class": "midfielder" },
    },
    "5-1-2-1-1":{
        "GK": { "top": 85, "left": 50, "class": "goalkeeper" },
        "LWB": { "top": 70, "left": 30, "class": "defender" },
        "CB": { "top": 70, "left": 45, "class": "defender" },
        "CB2": { "top": 70, "left": 55, "class": "defender" },
        "CB3": { "top": 70, "left": 70, "class": "defender" },
        "RWB": { "top": 60, "left": 50, "class": "midfielder" },
        "CDM": { "top": 60, "left": 55, "class": "midfielder" },
        "RM": { "top": 50, "left": 55, "class": "midfielder" },
        "LM": { "top": 50, "left": 30, "class": "midfielder" },
        "CAM": { "top": 50, "left": 70, "class": "midfielder" },
        "ST": { "top": 20, "left": 45, "class": "attacker" },
    },
}

const MakeSquad = () => {
    const [formations, setFormations] = useState([]);
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [userNickname, setUserNickname] = useState('');
    const [squadName, setSquadName] = useState('');
    const [formationId, setFormationId] = useState('');
    const [positions, setPositions] = useState([]);
    const [showModal, setShowModal] = useState(false); // 모달 상태 추가
    const [modalMessage, setModalMessage] = useState(''); // 모달 메시지 상태 추가
    const navigate = useNavigate(); // useNavigate 훅 초기화

    useEffect(() => {
        const fetchFormations = async () => {
            try {
                const response = await axios.get('/formation');
                setFormations(response.data);
            } catch (error) {
                console.error('Error fetching formations:', error);
            }
        };

        fetchFormations();
    }, []);

    const handleFormationChange = async (formation) => {
        if (formation) {
            setFormationId(formation.formationId);
            setSelectedFormation(formation);
            try {
                const response = await axios.get(`/formation/${formation.formationId}/positions`);
                const fetchedPositions = response.data;

                const positionCounts = {};
                const positionsWithNumbers = fetchedPositions.map(position => {
                    const positionName = position.position;
                    if (!positionCounts[positionName]) {
                        positionCounts[positionName] = 1;
                    } else {
                        positionCounts[positionName]++;
                    }
                    return {
                        ...position,
                        position: positionName + (positionCounts[positionName] > 1 ? positionCounts[positionName] : '')
                    };
                });

                setPositions(positionsWithNumbers);
            } catch (error) {
                console.error('Error fetching positions:', error);
            }
        } else {
            setFormationId('');
            setSelectedFormation(null);
            setPositions([]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!userNickname || !squadName || !formationId) {
            setModalMessage('모든 값을 채워주세요!');
            setShowModal(true);
            return;
        }

        const squadData = {
            userNickname,
            squadName,
            formationId
        };

        try {
            const response = await axios.post('/api/squad/create', squadData);
            if (response.status === 200) {
                setModalMessage('포메이션 생성이 되었습니다!\n팀 목록 확인하기?');
                setShowModal(true);
            } else {
                setModalMessage('포메이션 생성에 실패했습니다.');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error creating squad:', error);
            setModalMessage('포메이션 생성에 실패했습니다.');
            setShowModal(true);
        }
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handleModalConfirm = () => {
        setShowModal(false);
        if (modalMessage.includes('포메이션 생성이 되었습니다')) {
            navigate('/squad-list'); // 팀 목록 페이지로 이동
        }
    };

    return (
        <div className="make-squad">
            <h1>스쿼드 만들기</h1>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="squad-form">
                    <div className="form-group">
                        <label>유저 닉네임:</label>
                        <input
                            type="text"
                            value={userNickname}
                            onChange={(e) => setUserNickname(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>스쿼드 이름:</label>
                        <input
                            type="text"
                            value={squadName}
                            onChange={(e) => setSquadName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>포메이션:</label>
                        <select
                            value={formationId}
                            onChange={(e) =>
                                handleFormationChange(formations.find(f => f.formationId === parseInt(e.target.value)))
                            }
                        >
                            <option value="">포메이션 선택</option>
                            {formations.map((formation) => (
                                <option key={formation.formationId} value={formation.formationId}>
                                    {formation.formationName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit">스쿼드 생성</button>
                    <div className="soccer-field-container">
                        <img src={soccerField} alt="Soccer Field" className="soccer-field"/>
                        {positions.map((position, index) => {
                            const coordinates = selectedFormation
                                ? formationCoordinates[selectedFormation.formationName][position.position]
                                : undefined;
                            const offset = index * 3; // 위치를 조금씩 다르게 설정
                            return coordinates ? (
                                <div
                                    key={index}
                                    className={`player-position ${coordinates.class}`}
                                    style={{
                                        top: `calc(${coordinates.top}% + ${offset}px)`,
                                        left: `calc(${coordinates.left}% + ${offset}px)`
                                    }}
                                >
                                    {position.position}
                                </div>
                            ) : null;
                        })}
                    </div>
                </form>
                {selectedFormation && (
                    <div className="formation-details">
                        <h2>{selectedFormation.formationName}</h2>
                        <p>{selectedFormation.description}</p>
                    </div>
                )}
            </div>
            <Warning
                show={showModal}
                title="알림"
                message={modalMessage}
                onClose={handleModalClose}
                onConfirm={handleModalConfirm}
            />
        </div>
    );
};

export default MakeSquad;