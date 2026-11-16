/**
 * AxoMed — Autonomous Astronaut Health Monitoring Dashboard (Visual Prototype)
 * NASA Space Apps Challenge 2026
 *
 * AI / Super Intelligence (SI) Disclosure:
 * AI coding assistants were used for help in React/TypeScript implementation
 * and debugging, to create synthetic dataset/diary generation, and edit
 * documentation, under the direction of the project author.
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ReferenceDot,
  Legend
} from 'recharts';
import {
  Heart,
  Brain,
  ShieldAlert,
  Droplets,
  Activity,
  Radiation,
  Sun,
  Moon,
  PlusCircle,
  Download,
  Upload,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  AlertOctagon,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Clock,
  Stethoscope,
  FlaskConical,
  Thermometer,
  Dumbbell,
  Info,
  Zap,
  RefreshCw,
  BookHeart,
  Lock,
  ChevronDown,
  Pill,
  Bell,
  Trash2,
  Calendar
} from 'lucide-react';

// ============================================================================
// 1. NASAHRP, CSA & OSDR (INSPIRATION4) SCIENTIFIC INVESTIGATION LINKS
// ============================================================================
const NASA_REFERENCES = {
  HAZARDS: {
    id: 'NASA-HRP-Hazards',
    title: 'NASA 5 Hazards of Human Spaceflight',
    agency: 'NASA HRP',
    url: 'https://www.nasa.gov/hrp/hazards/',
    topic: 'Radiation, Altered Gravity, Isolation, Distance, Hostile Environments'
  },
  RISKS: {
    id: 'NASA-HRP-Risks',
    title: 'NASA Human Research Program Risks',
    agency: 'NASA HRP',
    url: 'https://www.nasa.gov/hrp/risks/',
    topic: 'Clinical Countermeasures & Crew Health Thresholds'
  },
  CSA_RAD: {
    id: 'CSA-Rad-2026',
    title: 'CSA Monitoring Radiation & Astronaut Health',
    agency: 'CSA',
    url: 'https://www.asc-csa.gc.ca/eng/news/articles/2026/2026-02-26-monitoring-radiation-astronaut-health.asp',
    topic: 'Dosimetry in mSv & Solar Particle Event (SPE) Shelter Protocols'
  },
  CSA_MOSFET: {
    id: 'CSA-MOSFET',
    title: 'CSA MOSFET Space Dosimeters',
    agency: 'CSA',
    url: 'https://www.asc-csa.gc.ca/eng/astronauts/space-medicine/mosfet.asp',
    topic: 'Real-time Skin, Eye & Blood-Forming Organ (BFO) Dosimetry'
  },
  CSA_EVARM: {
    id: 'CSA-EVARM',
    title: 'CSA EVARM Spacewalk Radiation Badges',
    agency: 'CSA',
    url: 'https://www.asc-csa.gc.ca/eng/iss/evarm.asp',
    topic: 'Extravehicular Activity (EVA) Suit Radiation Exposure'
  },
  CSA_RADIN2: {
    id: 'CSA-Radi-N2',
    title: 'CSA Radi-N2 Neutron Bubble Detectors',
    agency: 'CSA',
    url: 'https://www.asc-csa.gc.ca/eng/sciences/radi-n2.asp',
    topic: 'Spacecraft Module Neutron Radiation Mapping'
  },
  OSD_569: {
    id: 'OSD-569',
    title: 'OSDR OSD-569: Whole Blood & Space Anemia',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-569',
    topic: 'Complete Blood Count (CBC), Hemoglobin Drop & Space Hemolysis'
  },
  OSD_570: {
    id: 'OSD-570',
    title: 'OSDR OSD-570: PBMC Immune Profiling',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-570',
    topic: 'Leukocyte Shifts & Spaceflight Immune Dysregulation'
  },
  OSD_571: {
    id: 'OSD-571',
    title: 'OSDR OSD-571: Blood Plasma Proteomics',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-571',
    topic: 'Systemic Cellular Turnover & Tissue Stress Biomarkers'
  },
  OSD_574: {
    id: 'OSD-574',
    title: 'OSDR OSD-574: Deltoid Skin & Microbiome',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-574',
    topic: 'Dermal Barrier Inflammation, Rashes & Microbiome Shifts'
  },
  OSD_575: {
    id: 'OSD-575',
    title: 'OSDR OSD-575: Serum Metabolic & Cytokines',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-575',
    topic: 'Blood Glucose, Calcium, Electrolytes & Cardiovascular Markers'
  },
  OSD_656: {
    id: 'OSD-656',
    title: 'OSDR OSD-656: Urine Inflammation & Renal Panel',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-656',
    topic: 'Non-Invasive Hydration, Urinary Calcium & Kidney Stone Risk'
  },
  OSD_687: {
    id: 'OSD-687',
    title: 'OSDR OSD-687: T-Cell Epigenetic Recovery',
    agency: 'NASA OSDR',
    url: 'https://osdr.nasa.gov/bio/repo/data/studies/OSD-687',
    topic: 'Autonomic Stress & Long-Term Immune Chromatin Remodeling'
  }
};

// ============================================================================
// 2. EMBEDDED 30-DAY MISSION DATASET FOR COMMANDER JANE DOE
// ============================================================================
const ASTRONAUT_PROFILE = {
  name: 'Commander Jane Doe',
  mission_id: 'ARTEMIS-GATEWAY-30D',
  prior_career_bfo_dose_mSv: 120.0,
  nasa_career_limit_mSv: 600.0,
  bfo_30d_limit_mSv: 250.0,
  baseline_metrics: {
    resting_hr_bpm: 60,
    hrv_ms: 68,
    cognition_reaction_ms: 245,
    blood_hemoglobin_g_dL: 14.2,
    bp_systolic: 116,
    bp_diastolic: 74,
    blood_glucose_mg_dL: 88,
    urine_calcium_mg_dL: 13.0,
    skin_temp_c: 36.6
  }
};

const INITIAL_30D_DATA = [
  {
    mission_day: 1,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.6,
    exercise_minutes: 145,
    resting_hr_bpm: 60,
    hrv_ms: 68,
    skin_temp_c: 36.6,
    spo2_percent: 98.5,
    sleep_duration_hrs: 7.8,
    cognition_reaction_ms: 245,
    mood_score: 9,
    daily_dose_bfo_mSv: 0.55,
    daily_dose_skin_mSv: 0.65,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 120.55,
    cumulative_career_skin_mSv: 145.65,
    bp_systolic: 116,
    bp_diastolic: 74,
    urine_specific_gravity: 1.014,
    urine_calcium_mg_dL: 12.5,
    blood_hemoglobin_g_dL: 14.2,
    blood_wbc_k_uL: 6.2,
    blood_glucose_mg_dL: 88,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Scheduled_Baseline_Panel',
    recommended_action: 'Nominal operations. Maintain 2.5h ARED/Treadmill exercise and 2.5L hydration.'
  },
  {
    mission_day: 2,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.2,
    water_intake_liters: 2.5,
    exercise_minutes: 140,
    resting_hr_bpm: 61,
    hrv_ms: 66,
    skin_temp_c: 36.5,
    spo2_percent: 98.2,
    sleep_duration_hrs: 7.6,
    cognition_reaction_ms: 248,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.58,
    daily_dose_skin_mSv: 0.68,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 121.13,
    cumulative_career_skin_mSv: 146.33,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 3,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.0,
    water_intake_liters: 2.7,
    exercise_minutes: 150,
    resting_hr_bpm: 59,
    hrv_ms: 70,
    skin_temp_c: 36.6,
    spo2_percent: 98.6,
    sleep_duration_hrs: 8.0,
    cognition_reaction_ms: 242,
    mood_score: 9,
    daily_dose_bfo_mSv: 0.54,
    daily_dose_skin_mSv: 0.64,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 121.67,
    cumulative_career_skin_mSv: 146.97,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 4,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.3,
    water_intake_liters: 2.4,
    exercise_minutes: 135,
    resting_hr_bpm: 62,
    hrv_ms: 65,
    skin_temp_c: 36.7,
    spo2_percent: 98.0,
    sleep_duration_hrs: 7.4,
    cognition_reaction_ms: 251,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.60,
    daily_dose_skin_mSv: 0.71,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 122.27,
    cumulative_career_skin_mSv: 147.68,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: 1.016,
    urine_calcium_mg_dL: 13.8,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Routine_Midweek_Urine_Check',
    recommended_action: 'Nominal hydration and renal profile.'
  },
  {
    mission_day: 5,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.5,
    exercise_minutes: 145,
    resting_hr_bpm: 60,
    hrv_ms: 67,
    skin_temp_c: 36.5,
    spo2_percent: 98.4,
    sleep_duration_hrs: 7.7,
    cognition_reaction_ms: 246,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.56,
    daily_dose_skin_mSv: 0.66,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 122.83,
    cumulative_career_skin_mSv: 148.34,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 6,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.2,
    water_intake_liters: 2.6,
    exercise_minutes: 140,
    resting_hr_bpm: 61,
    hrv_ms: 69,
    skin_temp_c: 36.6,
    spo2_percent: 98.3,
    sleep_duration_hrs: 7.5,
    cognition_reaction_ms: 249,
    mood_score: 9,
    daily_dose_bfo_mSv: 0.57,
    daily_dose_skin_mSv: 0.67,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 123.40,
    cumulative_career_skin_mSv: 149.01,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 7,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.4,
    water_intake_liters: 2.5,
    exercise_minutes: 150,
    resting_hr_bpm: 62,
    hrv_ms: 64,
    skin_temp_c: 36.6,
    spo2_percent: 98.1,
    sleep_duration_hrs: 7.6,
    cognition_reaction_ms: 250,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.59,
    daily_dose_skin_mSv: 0.70,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 123.99,
    cumulative_career_skin_mSv: 149.71,
    bp_systolic: 118,
    bp_diastolic: 76,
    urine_specific_gravity: 1.015,
    urine_calcium_mg_dL: 14.2,
    blood_hemoglobin_g_dL: 13.9,
    blood_wbc_k_uL: 6.0,
    blood_glucose_mg_dL: 90,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Scheduled_Weekly_Panel',
    recommended_action: 'Nominal weekly labs. Slight expected microgravity hemoglobin shift.'
  },
  {
    mission_day: 8,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.3,
    water_intake_liters: 2.4,
    exercise_minutes: 135,
    resting_hr_bpm: 63,
    hrv_ms: 63,
    skin_temp_c: 36.7,
    spo2_percent: 98.0,
    sleep_duration_hrs: 7.2,
    cognition_reaction_ms: 254,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.55,
    daily_dose_skin_mSv: 0.65,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 124.54,
    cumulative_career_skin_mSv: 150.36,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 9,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.6,
    water_intake_liters: 2.2,
    exercise_minutes: 125,
    resting_hr_bpm: 64,
    hrv_ms: 60,
    skin_temp_c: 36.7,
    spo2_percent: 97.9,
    sleep_duration_hrs: 6.8,
    cognition_reaction_ms: 262,
    mood_score: 7,
    daily_dose_bfo_mSv: 0.58,
    daily_dose_skin_mSv: 0.69,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 125.12,
    cumulative_career_skin_mSv: 151.05,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Monitor hydration; slight dip in water intake.'
  },
  {
    mission_day: 10,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 3.4,
    water_intake_liters: 1.8,
    exercise_minutes: 75,
    resting_hr_bpm: 69,
    hrv_ms: 51,
    skin_temp_c: 36.8,
    spo2_percent: 97.2,
    sleep_duration_hrs: 5.8,
    cognition_reaction_ms: 284,
    mood_score: 6,
    daily_dose_bfo_mSv: 0.61,
    daily_dose_skin_mSv: 0.72,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 125.73,
    cumulative_career_skin_mSv: 151.77,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Advisory: Cabin CO2 rising (3.4 mmHg). Increase fluid intake and prioritize sleep.'
  },
  {
    mission_day: 11,
    activity_status: 'IVA_Nominal',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 4.1,
    water_intake_liters: 1.5,
    exercise_minutes: 45,
    resting_hr_bpm: 74,
    hrv_ms: 43,
    skin_temp_c: 36.9,
    spo2_percent: 96.5,
    sleep_duration_hrs: 5.1,
    cognition_reaction_ms: 312,
    mood_score: 5,
    daily_dose_bfo_mSv: 0.59,
    daily_dose_skin_mSv: 0.70,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 126.32,
    cumulative_career_skin_mSv: 152.47,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Dry_Mild_Irritation',
    exam_trigger_reason: null,
    recommended_action: 'YELLOW ALERT: High CO2 (4.1 mmHg) & sleep debt degrading cognition (+27% reaction time). Inspect ECLSS CO2 scrubber.'
  },
  {
    mission_day: 12,
    activity_status: 'IVA_Nominal',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 4.3,
    water_intake_liters: 1.4,
    exercise_minutes: 30,
    resting_hr_bpm: 78,
    hrv_ms: 38,
    skin_temp_c: 37.0,
    spo2_percent: 96.2,
    sleep_duration_hrs: 4.7,
    cognition_reaction_ms: 338,
    mood_score: 4,
    daily_dose_bfo_mSv: 0.62,
    daily_dose_skin_mSv: 0.74,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 126.94,
    cumulative_career_skin_mSv: 153.21,
    bp_systolic: 134,
    bp_diastolic: 86,
    urine_specific_gravity: 1.029,
    urine_calcium_mg_dL: 26.4,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: 108,
    dermal_status: 'Dry_Mild_Irritation',
    exam_trigger_reason: 'Triggered_By_HR_HRV_Dehydration_Alert',
    recommended_action: 'ACTION REQUIRED: Triggered POC Urine & BP exam shows dehydration (USG 1.029) & hypercalciuria (26.4 mg/dL - Kidney Stone Risk). Start 2.5L water + Oral Potassium Citrate protocol; switch ECLSS to backup LiOH scrubber; enable blue-enriched circadian LED shift.'
  },
  {
    mission_day: 13,
    activity_status: 'IVA_Nominal',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 2.9,
    water_intake_liters: 2.6,
    exercise_minutes: 110,
    resting_hr_bpm: 71,
    hrv_ms: 48,
    skin_temp_c: 36.8,
    spo2_percent: 97.4,
    sleep_duration_hrs: 6.9,
    cognition_reaction_ms: 288,
    mood_score: 6,
    daily_dose_bfo_mSv: 0.57,
    daily_dose_skin_mSv: 0.68,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 127.51,
    cumulative_career_skin_mSv: 153.89,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Recovery in progress: Cabin CO2 dropping post-scrubber maintenance. Continue Potassium Citrate and hydration push.'
  },
  {
    mission_day: 14,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.2,
    water_intake_liters: 2.7,
    exercise_minutes: 140,
    resting_hr_bpm: 64,
    hrv_ms: 61,
    skin_temp_c: 36.6,
    spo2_percent: 98.1,
    sleep_duration_hrs: 7.8,
    cognition_reaction_ms: 255,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.56,
    daily_dose_skin_mSv: 0.66,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 128.07,
    cumulative_career_skin_mSv: 154.55,
    bp_systolic: 120,
    bp_diastolic: 78,
    urine_specific_gravity: 1.016,
    urine_calcium_mg_dL: 15.8,
    blood_hemoglobin_g_dL: 13.5,
    blood_wbc_k_uL: 6.4,
    blood_glucose_mg_dL: 92,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Scheduled_Weekly_Panel',
    recommended_action: 'Resolved: Urine specific gravity and calcium normalized. Resume standard countermeasure schedule.'
  },
  {
    mission_day: 15,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.5,
    exercise_minutes: 145,
    resting_hr_bpm: 61,
    hrv_ms: 65,
    skin_temp_c: 36.6,
    spo2_percent: 98.3,
    sleep_duration_hrs: 7.6,
    cognition_reaction_ms: 247,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.58,
    daily_dose_skin_mSv: 0.69,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 128.65,
    cumulative_career_skin_mSv: 155.24,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 16,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.0,
    water_intake_liters: 2.6,
    exercise_minutes: 150,
    resting_hr_bpm: 60,
    hrv_ms: 67,
    skin_temp_c: 36.5,
    spo2_percent: 98.4,
    sleep_duration_hrs: 7.7,
    cognition_reaction_ms: 244,
    mood_score: 9,
    daily_dose_bfo_mSv: 0.55,
    daily_dose_skin_mSv: 0.65,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 129.20,
    cumulative_career_skin_mSv: 155.89,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 17,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.2,
    water_intake_liters: 2.5,
    exercise_minutes: 140,
    resting_hr_bpm: 62,
    hrv_ms: 66,
    skin_temp_c: 36.6,
    spo2_percent: 98.2,
    sleep_duration_hrs: 7.5,
    cognition_reaction_ms: 249,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.59,
    daily_dose_skin_mSv: 0.70,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 129.79,
    cumulative_career_skin_mSv: 156.59,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 18,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.3,
    water_intake_liters: 2.6,
    exercise_minutes: 120,
    resting_hr_bpm: 63,
    hrv_ms: 62,
    skin_temp_c: 36.7,
    spo2_percent: 98.1,
    sleep_duration_hrs: 7.1,
    cognition_reaction_ms: 253,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.61,
    daily_dose_skin_mSv: 0.73,
    peak_dose_rate_mSv_hr: 0.04,
    cumulative_career_bfo_mSv: 130.40,
    cumulative_career_skin_mSv: 157.32,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: 1.015,
    urine_calcium_mg_dL: 14.5,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Pre_EVA_Readiness_Check',
    recommended_action: 'Cleared for Day 19 EVA Spacewalk. Ensure EVARM/MOSFET radiation badges are zeroed.'
  },
  {
    mission_day: 19,
    activity_status: 'EVA_Spacewalk',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 2.4,
    water_intake_liters: 2.1,
    exercise_minutes: 60,
    resting_hr_bpm: 76,
    hrv_ms: 41,
    skin_temp_c: 37.2,
    spo2_percent: 97.0,
    sleep_duration_hrs: 6.0,
    cognition_reaction_ms: 278,
    mood_score: 7,
    daily_dose_bfo_mSv: 1.45,
    daily_dose_skin_mSv: 4.80,
    peak_dose_rate_mSv_hr: 0.65,
    cumulative_career_bfo_mSv: 131.85,
    cumulative_career_skin_mSv: 162.12,
    bp_systolic: 128,
    bp_diastolic: 82,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Dry_Mild_Irritation',
    exam_trigger_reason: 'Post_EVA_Telemetry_Check',
    recommended_action: 'YELLOW ALERT: Elevated EVARM skin dose (4.80 mSv) & autonomic fatigue (HRV 41 ms) post-6hr EVA. Prioritize recovery and antioxidant nutrition.'
  },
  {
    mission_day: 20,
    activity_status: 'IVA_Nominal',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 2.3,
    water_intake_liters: 2.4,
    exercise_minutes: 45,
    resting_hr_bpm: 79,
    hrv_ms: 35,
    skin_temp_c: 37.8,
    spo2_percent: 97.3,
    sleep_duration_hrs: 6.2,
    cognition_reaction_ms: 291,
    mood_score: 5,
    daily_dose_bfo_mSv: 0.85,
    daily_dose_skin_mSv: 1.10,
    peak_dose_rate_mSv_hr: 0.08,
    cumulative_career_bfo_mSv: 132.70,
    cumulative_career_skin_mSv: 163.22,
    bp_systolic: 126,
    bp_diastolic: 80,
    urine_specific_gravity: 1.019,
    urine_calcium_mg_dL: 16.2,
    blood_hemoglobin_g_dL: 13.2,
    blood_wbc_k_uL: 9.8,
    blood_glucose_mg_dL: 112,
    dermal_status: 'Rash_Detected',
    exam_trigger_reason: 'Triggered_By_Temp_HRV_Rash_Alert',
    recommended_action: 'YELLOW ALERT: Stress-induced immune dysregulation (WBC 9.8 k/uL, Temp 37.8C, Deltoid rash - OSD-570/574). Apply topical hydrocortisone/antiviral protocol and log dermal photo for Flight Surgeon.'
  },
  {
    mission_day: 21,
    activity_status: 'Shelter_Protocol',
    alert_status: 'Red',
    cabin_co2_mmHg: 2.5,
    water_intake_liters: 2.5,
    exercise_minutes: 0,
    resting_hr_bpm: 84,
    hrv_ms: 31,
    skin_temp_c: 37.6,
    spo2_percent: 97.5,
    sleep_duration_hrs: 5.5,
    cognition_reaction_ms: 305,
    mood_score: 4,
    daily_dose_bfo_mSv: 14.20,
    daily_dose_skin_mSv: 22.50,
    peak_dose_rate_mSv_hr: 18.40,
    cumulative_career_bfo_mSv: 146.90,
    cumulative_career_skin_mSv: 185.72,
    bp_systolic: 136,
    bp_diastolic: 88,
    urine_specific_gravity: 1.018,
    urine_calcium_mg_dL: 17.0,
    blood_hemoglobin_g_dL: 13.1,
    blood_wbc_k_uL: 9.4,
    blood_glucose_mg_dL: 115,
    dermal_status: 'Rash_Detected',
    exam_trigger_reason: 'Scheduled_Weekly_Plus_SPE_Red_Alert',
    recommended_action: 'RED EMERGENCY: Major Solar Particle Event (Peak 18.4 mSv/hr). ABORT ALL IVA/EVA TASKS. Remain in Polyethylene/Water-Shielded Crew Quarters (Shelter Protocol cuts dose rate by 75%). Administer oral prophylactic radioprotectant/antioxidant pack; auto-transmit telemetry to Flight Surgeon.'
  },
  {
    mission_day: 22,
    activity_status: 'Shelter_Protocol',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 2.4,
    water_intake_liters: 2.6,
    exercise_minutes: 90,
    resting_hr_bpm: 72,
    hrv_ms: 46,
    skin_temp_c: 37.1,
    spo2_percent: 97.9,
    sleep_duration_hrs: 7.3,
    cognition_reaction_ms: 268,
    mood_score: 6,
    daily_dose_bfo_mSv: 2.10,
    daily_dose_skin_mSv: 3.20,
    peak_dose_rate_mSv_hr: 0.45,
    cumulative_career_bfo_mSv: 149.00,
    cumulative_career_skin_mSv: 188.92,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Dry_Mild_Irritation',
    exam_trigger_reason: null,
    recommended_action: 'SPE subsiding (0.45 mSv/hr). Cleared to exit storm shelter at 14:00 UTC. Rash improving; continue topical treatment.'
  },
  {
    mission_day: 23,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.6,
    exercise_minutes: 135,
    resting_hr_bpm: 65,
    hrv_ms: 58,
    skin_temp_c: 36.7,
    spo2_percent: 98.0,
    sleep_duration_hrs: 7.7,
    cognition_reaction_ms: 254,
    mood_score: 7,
    daily_dose_bfo_mSv: 0.62,
    daily_dose_skin_mSv: 0.75,
    peak_dose_rate_mSv_hr: 0.04,
    cumulative_career_bfo_mSv: 149.62,
    cumulative_career_skin_mSv: 189.67,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Returned to nominal IVA status. Dermal inflammation resolved.'
  },
  {
    mission_day: 24,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.2,
    water_intake_liters: 2.5,
    exercise_minutes: 145,
    resting_hr_bpm: 64,
    hrv_ms: 62,
    skin_temp_c: 36.6,
    spo2_percent: 98.1,
    sleep_duration_hrs: 7.6,
    cognition_reaction_ms: 250,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.58,
    daily_dose_skin_mSv: 0.69,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 150.20,
    cumulative_career_skin_mSv: 190.36,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 25,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.0,
    water_intake_liters: 2.6,
    exercise_minutes: 140,
    resting_hr_bpm: 65,
    hrv_ms: 63,
    skin_temp_c: 36.6,
    spo2_percent: 97.8,
    sleep_duration_hrs: 7.5,
    cognition_reaction_ms: 248,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.56,
    daily_dose_skin_mSv: 0.66,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 150.76,
    cumulative_career_skin_mSv: 191.02,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: 1.015,
    urine_calcium_mg_dL: 14.8,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Routine_Midweek_Urine_Check',
    recommended_action: 'Nominal renal and hydration status.'
  },
  {
    mission_day: 26,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.5,
    exercise_minutes: 150,
    resting_hr_bpm: 66,
    hrv_ms: 61,
    skin_temp_c: 36.5,
    spo2_percent: 97.6,
    sleep_duration_hrs: 7.4,
    cognition_reaction_ms: 252,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.57,
    daily_dose_skin_mSv: 0.67,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 151.33,
    cumulative_career_skin_mSv: 191.69,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 27,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.2,
    water_intake_liters: 2.4,
    exercise_minutes: 140,
    resting_hr_bpm: 67,
    hrv_ms: 60,
    skin_temp_c: 36.6,
    spo2_percent: 97.4,
    sleep_duration_hrs: 7.5,
    cognition_reaction_ms: 255,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.59,
    daily_dose_skin_mSv: 0.70,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 151.92,
    cumulative_career_skin_mSv: 192.39,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Nominal operations.'
  },
  {
    mission_day: 28,
    activity_status: 'IVA_Nominal',
    alert_status: 'Yellow',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.5,
    exercise_minutes: 135,
    resting_hr_bpm: 68,
    hrv_ms: 59,
    skin_temp_c: 36.6,
    spo2_percent: 96.8,
    sleep_duration_hrs: 7.6,
    cognition_reaction_ms: 258,
    mood_score: 7,
    daily_dose_bfo_mSv: 0.56,
    daily_dose_skin_mSv: 0.66,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 152.48,
    cumulative_career_skin_mSv: 193.05,
    bp_systolic: 112,
    bp_diastolic: 70,
    urine_specific_gravity: 1.016,
    urine_calcium_mg_dL: 15.1,
    blood_hemoglobin_g_dL: 11.8,
    blood_wbc_k_uL: 5.8,
    blood_glucose_mg_dL: 91,
    dermal_status: 'Normal',
    exam_trigger_reason: 'Scheduled_Weekly_Panel',
    recommended_action: 'YELLOW ALERT: Progressive Space Anemia detected (Hemoglobin 11.8 g/dL, down 17% from Day 1 baseline; mild SpO2 dip to 96.8% - OSD-569 hemolysis). Initiate Folate + Iron nutritional protocol and schedule Lower Body Negative Pressure (LBNP) cardiovascular conditioning.'
  },
  {
    mission_day: 29,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.0,
    water_intake_liters: 2.6,
    exercise_minutes: 145,
    resting_hr_bpm: 65,
    hrv_ms: 63,
    skin_temp_c: 36.6,
    spo2_percent: 97.5,
    sleep_duration_hrs: 7.8,
    cognition_reaction_ms: 249,
    mood_score: 8,
    daily_dose_bfo_mSv: 0.55,
    daily_dose_skin_mSv: 0.65,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 153.03,
    cumulative_career_skin_mSv: 193.70,
    bp_systolic: null,
    bp_diastolic: null,
    urine_specific_gravity: null,
    urine_calcium_mg_dL: null,
    blood_hemoglobin_g_dL: null,
    blood_wbc_k_uL: null,
    blood_glucose_mg_dL: null,
    dermal_status: 'Normal',
    exam_trigger_reason: null,
    recommended_action: 'Continuing Folate/Iron supplementation and LBNP countermeasure session.'
  },
  {
    mission_day: 30,
    activity_status: 'IVA_Nominal',
    alert_status: 'Green',
    cabin_co2_mmHg: 2.1,
    water_intake_liters: 2.6,
    exercise_minutes: 150,
    resting_hr_bpm: 63,
    hrv_ms: 65,
    skin_temp_c: 36.5,
    spo2_percent: 97.9,
    sleep_duration_hrs: 7.9,
    cognition_reaction_ms: 246,
    mood_score: 9,
    daily_dose_bfo_mSv: 0.57,
    daily_dose_skin_mSv: 0.67,
    peak_dose_rate_mSv_hr: 0.03,
    cumulative_career_bfo_mSv: 153.60,
    cumulative_career_skin_mSv: 194.37,
    bp_systolic: 115,
    bp_diastolic: 74,
    urine_specific_gravity: 1.014,
    urine_calcium_mg_dL: 14.0,
    blood_hemoglobin_g_dL: 12.1,
    blood_wbc_k_uL: 6.1,
    blood_glucose_mg_dL: 89,
    dermal_status: 'Normal',
    exam_trigger_reason: 'End_Of_Month_Summary_Panel',
    recommended_action: 'End of 30-day mission block. Hemoglobin stabilizing (12.1 g/dL). All systems nominal.'
  }
];

// ============================================================================
// 2b. PRIVATE CREW DIARY (stored locally, never included in telemetry export)
// ============================================================================
const INITIAL_DIARY_ENTRIES = [
  { mission_day: 1, note: 'First full day aboard. Couldn\'t stop staring at Earth through the window during dinner. I feel so small and so lucky at the same time.' },
  { mission_day: 2, note: 'Still learning to sleep floating. Woke up with my arms drifting over my head like a zombie. Laughed alone in the crew quarters.' },
  { mission_day: 3, note: 'Called home in my head today: practiced what I\'ll tell Mia about the Moon. She\'ll want to know if it smells like cheese. (It smells like gunpowder, apparently.)' },
  { mission_day: 4, note: 'Good workout on ARED. Body feels strong. Miss the feeling of rain, which is a weird thing to miss.' },
  { mission_day: 5, note: 'Quiet day of experiments. Played my old playlist while pipetting. Small routines keep me grounded, even without gravity.' },
  { mission_day: 6, note: 'Best sleep so far. Dreamt I was swimming in the lake behind grandma\'s house. Woke up happy.' },
  { mission_day: 7, note: 'One week in. The novelty is fading into routine, and honestly I like routine. Proud of how the crew is clicking.' },
  { mission_day: 8, note: 'Food is starting to taste the same. Saving the dark chocolate for a hard day. Not today though.' },
  { mission_day: 9, note: 'Slept poorly, the fans felt louder than usual. Little irritable at the crew meeting. Need to be kinder to myself and others.' },
  { mission_day: 10, note: 'Headache that won\'t quit and my thoughts feel foggy. Hard to admit it, but I feel a bit homesick tonight.' },
  { mission_day: 11, note: 'Rough one. Snapped at a crewmate over nothing and apologized after. I hate when tiredness makes me someone I\'m not.' },
  { mission_day: 12, note: 'Worst day yet. CO2 headache, barely slept, and I think I\'ve been drinking too little water. Opened the dark chocolate. It helped a little.' },
  { mission_day: 13, note: 'Scrubbers fixed, air feels lighter. Made myself drink properly. Feeling like a person again, slowly.' },
  { mission_day: 14, note: 'Slept almost 8 hours! Everything looks brighter. Funny how much the mind depends on the body.' },
  { mission_day: 15, note: 'Halfway point. Watched a sunrise over the lunar horizon. No words. Just tears floating in little spheres.' },
  { mission_day: 16, note: 'Movie night with the crew, a terrible 80s sci-fi film. We laughed so hard. These people are my family up here.' },
  { mission_day: 17, note: 'Wrote a letter to my future self for when I\'m back on Earth. Told her not to forget how this feels.' },
  { mission_day: 18, note: 'Nervous about tomorrow\'s EVA. Went through every procedure twice. Trust the training, Jane.' },
  { mission_day: 19, note: 'I WALKED OUTSIDE. Seven hours. Exhausted, sore hands, but I have never felt more alive. Nothing will ever compare.' },
  { mission_day: 20, note: 'Itchy rash on my arm, probably the suit liner. Annoying and a bit worrying. Trying not to google symptoms in my head.' },
  { mission_day: 21, note: 'Solar storm. Spent the day in the shielded shelter, cramped and anxious. Kept thinking about the people I love. We are safe, but it shook me.' },
  { mission_day: 22, note: 'Still sheltering part of the day. We played word games to pass the time. Fear turns into dark humor up here, and that\'s okay.' },
  { mission_day: 23, note: 'Back to normal ops. Gratitude day: for thick walls, for good engineers, for this crew.' },
  { mission_day: 24, note: 'Rash is fading. Felt light and playful today, did a slow-motion somersault in the module just because I could.' },
  { mission_day: 25, note: 'Thinking a lot about what I want to do after this mission. Maybe teach. I want kids to look up and feel what I feel.' },
  { mission_day: 26, note: 'Uneventful day, which is a gift. Read three chapters of my book and fell asleep mid-sentence.' },
  { mission_day: 27, note: 'Missing coffee from my favorite little cafe. Promised myself the first thing I do back home is sit there for hours.' },
  { mission_day: 28, note: 'Felt weak and tired during exercise, blood work says hemoglobin is low. Space anemia is real. Eating my iron-rich rations like a good astronaut.' },
  { mission_day: 29, note: 'Energy creeping back. Spent a long time just looking out the window. I\'m going to miss this view terribly.' },
  { mission_day: 30, note: 'Day 30. Looking back at these notes, I\'ve been through so much. Tired, proud, a little changed.' }
];

// ============================================================================
// 2c. PILLS & COUNTERMEASURE CALENDAR (MONTH 1: DAYS 1-30 & MONTH 2: DAYS 31-60)
// ============================================================================
const PILL_CATALOG = {
  vit_d3: {
    id: 'vit_d3',
    name: 'Vitamin D3 + Spaceflight Multivitamin',
    dose: '1000 IU + 1 cap',
    timing: 'Morning with breakfast & 250 mL water',
    category: 'baseline',
    reason: 'Daily microgravity bone mineral & micronutrient maintenance'
  },
  potassium_citrate: {
    id: 'potassium_citrate',
    name: 'Oral Potassium Citrate',
    dose: '20 mEq (2 tabs)',
    timing: 'Morning & Evening — drink with 2.5L total daily water',
    category: 'countermeasure',
    reason: 'Alkalinizes urine to prevent calcium oxalate kidney stones (OSD-656)'
  },
  eva_antioxidant: {
    id: 'eva_antioxidant',
    name: 'Post-EVA Antioxidant Recovery Pack',
    dose: 'Vit C 500mg + Vit E + CoQ10',
    timing: 'Immediately post-EVA with 500 mL electrolyte water',
    category: 'countermeasure',
    reason: 'Counters suit radiation oxidative stress & autonomic fatigue (CSA-EVARM)'
  },
  antiviral_dermal: {
    id: 'antiviral_dermal',
    name: 'Prophylactic Oral Antiviral + Hydrocortisone',
    dose: 'Valacyclovir 500mg oral + 1% topical',
    timing: 'Morning & Evening with water (plus topical to deltoid)',
    category: 'countermeasure',
    reason: 'Stress-induced immune shift & deltoid rash protocol (OSD-570 / OSD-574)'
  },
  spe_radioprotectant: {
    id: 'spe_radioprotectant',
    name: 'Emergency Oral Radioprotectant Pack',
    dose: 'NAC 600mg + High-Potency Antioxidants',
    timing: 'Immediate inside Storm Shelter with 400 mL water',
    category: 'emergency',
    reason: 'Acute cellular radioprotection during Solar Particle Event (CSA-Rad-2026)'
  },
  folate_b12_iron: {
    id: 'folate_b12_iron',
    name: 'Folate + Vitamin B12 + Bioavailable Iron Pack',
    dose: 'Folate 400mcg + B12 500mcg + Iron 18mg',
    timing: 'Morning with Vitamin C ration & 300 mL water',
    category: 'countermeasure',
    reason: 'Supports erythropoiesis for progressive Space Anemia (OSD-569)'
  }
};

const QUICK_CUSTOM_PILL_PRESETS = [
  { name: 'Melatonin', dose: '3 mg', timing: '30 min before sleep with water', reason: 'Circadian alignment & sleep support' },
  { name: 'Electrolyte Rehydration Tab', dose: '1 effervescent tab', timing: 'Dissolve in 500 mL water', reason: 'Plasma volume & orthostatic support' },
  { name: 'Magnesium Glycinate', dose: '200 mg', timing: 'Evening with water', reason: 'Muscle recovery & sleep quality' },
  { name: 'Acetaminophen', dose: '500 mg', timing: 'With 250 mL water as needed', reason: 'CO2 or tension headache relief' }
];

function buildInitial60DayPillSchedule() {
  const schedule = {};
  for (let day = 1; day <= 60; day++) {
    const items = [
      {
        uid: `d${day}-vit_d3`,
        catalogId: 'vit_d3',
        name: PILL_CATALOG.vit_d3.name,
        dose: PILL_CATALOG.vit_d3.dose,
        timing: PILL_CATALOG.vit_d3.timing,
        category: PILL_CATALOG.vit_d3.category,
        reason: PILL_CATALOG.vit_d3.reason,
        taken: day <= 30,
        isCustom: false
      }
    ];

    const addCatalogPill = (catId, isTaken, customReason = '') => {
      const c = PILL_CATALOG[catId];
      items.push({
        uid: `d${day}-${catId}`,
        catalogId: catId,
        name: c.name,
        dose: c.dose,
        timing: c.timing,
        category: c.category,
        reason: customReason || c.reason,
        taken: isTaken,
        isCustom: false
      });
    };

    // Exact matches to INITIAL_30D_DATA & drAxoBriefing:
    if (day === 12 || day === 13) {
      addCatalogPill('potassium_citrate', true);
    }
    if (day === 19) {
      addCatalogPill('eva_antioxidant', true);
    }
    if (day >= 20 && day <= 22) {
      addCatalogPill('antiviral_dermal', true);
    }
    if (day === 21) {
      addCatalogPill('spe_radioprotectant', true);
    }
    if (day >= 28 && day <= 30) {
      addCatalogPill('folate_b12_iron', true);
    }

    // Month 2 (Days 31-60) pre-scheduled continuation & planned countermeasures:
    if (day >= 31 && day <= 34) {
      addCatalogPill(
        'folate_b12_iron',
        false,
        'Planned Day 31-34 continuation of 7-day Space Anemia course started on Day 28 (OSD-569)'
      );
    }
    if (day === 38 || day === 39) {
      addCatalogPill(
        'potassium_citrate',
        false,
        'Scheduled Month 2 prophylactic renal alkalinization check (OSD-656)'
      );
    }
    if (day === 45) {
      addCatalogPill(
        'eva_antioxidant',
        false,
        'Planned Month 2 EVA spacewalk antioxidant pre/post pack (CSA-EVARM)'
      );
    }

    schedule[day] = items;
  }
  return schedule;
}

const INITIAL_PILL_SCHEDULE = buildInitial60DayPillSchedule();

// ============================================================================
// 3. ORGAN SYSTEM DEFINITIONS & EVALUATION LOGIC
// ============================================================================
const BODY_SYSTEMS = {
  heart: {
    id: 'heart',
    name: 'Cardiovascular & Autonomic',
    shortName: 'Heart & BP',
    organLabel: 'Heart & Chest Telemetry',
    icon: Heart,
    hazard: 'Altered Gravity & Fluid Shift',
    description:
      'Monitors Resting Heart Rate, Blood Pressure (Systolic/Diastolic), HRV (Autonomic Stress), and SpO2 oxygenation against Commander Jane Doe’s pre-flight baseline.',
    references: [NASA_REFERENCES.HAZARDS, NASA_REFERENCES.OSD_575, NASA_REFERENCES.OSD_687]
  },
  brain: {
    id: 'brain',
    name: 'Behavioral, Sleep & Cognitive',
    shortName: 'Brain & Sleep',
    organLabel: 'Neuro-Cognitive & Habitat CO2',
    icon: Brain,
    hazard: 'Isolation, Confinement & Hostile CO2',
    description:
      'Tracks NASA Cognition PVT reaction speed (ms), sleep duration, subjective mood (1–10), and cabin CO2 concentration impacts on executive function.',
    references: [NASA_REFERENCES.HAZARDS, NASA_REFERENCES.RISKS, NASA_REFERENCES.OSD_687]
  },
  blood: {
    id: 'blood',
    name: 'Hematology & BFO Radiation',
    shortName: 'Blood & Marrow',
    organLabel: 'Hematology (Space Anemia) & BFO Dose',
    icon: FlaskConical,
    hazard: 'Space Radiation & Microgravity Hemolysis',
    description:
      'Tracks capillary Hemoglobin (Space Anemia), Fasting Blood Glucose, and CSA Blood-Forming Organs (BFO) radiation exposure toward the 600 mSv career limit.',
    references: [NASA_REFERENCES.OSD_569, NASA_REFERENCES.OSD_575, NASA_REFERENCES.CSA_RAD, NASA_REFERENCES.CSA_MOSFET]
  },
  kidneys: {
    id: 'kidneys',
    name: 'Renal, Hydration & Metabolic',
    shortName: 'Kidneys & Bone',
    organLabel: 'Renal Stone Risk & Bone Calcium',
    icon: Droplets,
    hazard: 'Altered Gravity Bone Demineralization',
    description:
      'Monitors daily hydration (L), Urine Specific Gravity, Urinary Calcium excretion from microgravity bone loss, and ARED resistive exercise countermeasure minutes.',
    references: [NASA_REFERENCES.OSD_656, NASA_REFERENCES.OSD_575, NASA_REFERENCES.RISKS]
  },
  skin: {
    id: 'skin',
    name: 'Dermal, Immune & Suit Radiation',
    shortName: 'Skin & Immune',
    organLabel: 'Deltoid Microbiome & EVARM Suit Badge',
    icon: ShieldAlert,
    hazard: 'Hostile Closed Environment & EVA Radiation',
    description:
      'Tracks CSA MOSFET/EVARM skin radiation dose during spacewalks, core skin temperature, White Blood Cell (WBC) count, and latent viral/dermal rashes.',
    references: [NASA_REFERENCES.OSD_570, NASA_REFERENCES.OSD_574, NASA_REFERENCES.CSA_EVARM, NASA_REFERENCES.CSA_MOSFET]
  }
};

// Helper to compute organ-specific status (Green / Yellow / Red) for a given day
function evaluateOrganStatuses(dayData) {
  if (!dayData) {
    return { heart: 'Green', brain: 'Green', blood: 'Green', kidneys: 'Green', skin: 'Green' };
  }

  // 1. Heart / Cardiovascular
  let heart = 'Green';
  if (
    dayData.resting_hr_bpm >= 82 ||
    dayData.hrv_ms <= 32 ||
    (dayData.bp_systolic && dayData.bp_systolic >= 136)
  ) {
    heart = 'Red';
  } else if (
    dayData.resting_hr_bpm >= 72 ||
    dayData.hrv_ms <= 48 ||
    (dayData.bp_systolic && (dayData.bp_systolic >= 128 || dayData.bp_systolic <= 105)) ||
    dayData.spo2_percent < 97.0
  ) {
    heart = 'Yellow';
  }

  // 2. Brain / Cognitive / CO2
  let brain = 'Green';
  if (dayData.cognition_reaction_ms >= 350 || dayData.cabin_co2_mmHg >= 5.0 || dayData.sleep_duration_hrs < 4.5) {
    brain = 'Red';
  } else if (
    dayData.cognition_reaction_ms >= 275 ||
    dayData.cabin_co2_mmHg >= 3.5 ||
    dayData.sleep_duration_hrs < 6.2 ||
    dayData.mood_score <= 5
  ) {
    brain = 'Yellow';
  }

  // 3. Blood / Hematology & BFO Radiation
  let blood = 'Green';
  if (
    dayData.daily_dose_bfo_mSv >= 5.0 ||
    dayData.peak_dose_rate_mSv_hr >= 5.0 ||
    (dayData.blood_hemoglobin_g_dL && dayData.blood_hemoglobin_g_dL < 11.0) ||
    (dayData.blood_glucose_mg_dL && dayData.blood_glucose_mg_dL >= 126)
  ) {
    blood = 'Red';
  } else if (
    dayData.daily_dose_bfo_mSv >= 1.2 ||
    (dayData.blood_hemoglobin_g_dL && dayData.blood_hemoglobin_g_dL <= 12.2) ||
    (dayData.blood_glucose_mg_dL && dayData.blood_glucose_mg_dL >= 105)
  ) {
    blood = 'Yellow';
  }

  // 4. Kidneys / Renal & Hydration
  let kidneys = 'Green';
  if (
    (dayData.urine_specific_gravity && dayData.urine_specific_gravity >= 1.032) ||
    (dayData.urine_calcium_mg_dL && dayData.urine_calcium_mg_dL >= 30.0)
  ) {
    kidneys = 'Red';
  } else if (
    dayData.water_intake_liters < 1.8 ||
    dayData.exercise_minutes < 65 ||
    (dayData.urine_specific_gravity && dayData.urine_specific_gravity >= 1.024) ||
    (dayData.urine_calcium_mg_dL && dayData.urine_calcium_mg_dL >= 20.0)
  ) {
    kidneys = 'Yellow';
  }

  // 5. Skin / Immune & EVA Suit Dose
  let skin = 'Green';
  if (dayData.daily_dose_skin_mSv >= 10.0 || dayData.skin_temp_c >= 38.2) {
    skin = 'Red';
  } else if (
    dayData.daily_dose_skin_mSv >= 2.5 ||
    dayData.skin_temp_c >= 37.2 ||
    dayData.dermal_status !== 'Normal' ||
    (dayData.blood_wbc_k_uL && dayData.blood_wbc_k_uL >= 8.5)
  ) {
    skin = 'Yellow';
  }

  return { heart, brain, blood, kidneys, skin };
}

// ============================================================================
// 4. CHIBI ASTRO-AXOLOTL MASCOT COMPONENT ("DR. AXO")
// ============================================================================
function ChibiAstroAxolotl({ status = 'Green', activity = 'IVA_Nominal', darkMode = false }) {
  const isRed = status === 'Red';
  const isYellow = status === 'Yellow';

  const glowColor = isRed ? '#EF4444' : isYellow ? '#F59E0B' : '#10B981';
  const gillColor = isRed ? '#FB7185' : isYellow ? '#F472B6' : '#F472B6';
  const bodyColor = '#FBCFE8'; // Soft pastel pink axolotl

  return (
    <div className="relative flex items-center justify-center select-none">
      <svg
        viewBox="0 0 220 220"
        className="w-36 h-36 sm:w-40 sm:h-40 transition-transform duration-500 hover:scale-105"
        aria-label="Dr. Axo the Chibi Astro-Axolotl Mascot"
      >
        <defs>
          <radialGradient id="helmetGlass" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#93C5FD" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.32" />
          </radialGradient>
          <radialGradient id="antennaGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor={glowColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor={glowColor} stopOpacity="0" />
          </radialGradient>
          <filter id="softDropShadow" x="-15%" y="-15%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.18" />
          </filter>
        </defs>

        {/* Outer Status Aura Pulse */}
        <circle
          cx="110"
          cy="115"
          r="86"
          fill="none"
          stroke={glowColor}
          strokeWidth="2.5"
          strokeDasharray={isRed ? '8 5' : 'none'}
          opacity="0.35"
        />

        {/* Floating Zero-G Bubbles / Stars */}
        <circle cx="34" cy="56" r="4" fill={glowColor} opacity="0.6" />
        <circle cx="186" cy="68" r="5" fill="#60A5FA" opacity="0.5" />
        <circle cx="42" cy="168" r="3.5" fill="#A78BFA" opacity="0.5" />

        <g filter="url(#softDropShadow)">
          {/* Axolotl Tail Behind Suit */}
          <path
            d="M 155 162 Q 195 155 190 130 Q 184 115 156 142 Z"
            fill={bodyColor}
            stroke="#F472B6"
            strokeWidth="2.5"
          />
          <path
            d="M 162 155 Q 184 148 181 134"
            fill="none"
            stroke="#EC4899"
            strokeWidth="1.5"
            strokeDasharray="3 2"
          />

          {/* Chibi Spacesuit Backpack (PLSS) */}
          <rect
            x="62"
            y="118"
            width="96"
            height="62"
            rx="16"
            fill="#CBD5E1"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />

          {/* Spacesuit Torso */}
          <path
            d="M 68 140 C 62 165, 66 192, 82 196 L 138 196 C 154 192, 158 165, 152 140 Z"
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />

          {/* Suit Chest Control Telemetry Patch */}
          <rect
            x="91"
            y="156"
            width="38"
            height="24"
            rx="6"
            fill="#1E293B"
            stroke="#64748B"
            strokeWidth="2"
          />
          {/* Mini ECG Line on Chest */}
          <polyline
            points="95,168 102,168 105,161 109,174 113,164 117,168 125,168"
            fill="none"
            stroke={glowColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Left & Right Chibi Arms */}
          <ellipse
            cx="62"
            cy="160"
            rx="14"
            ry="9"
            transform={isRed ? 'rotate(-35 62 160)' : isYellow ? 'rotate(-15 62 160)' : 'rotate(-25 62 160)'}
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />
          <ellipse
            cx="158"
            cy="160"
            rx="14"
            ry="9"
            transform={isRed ? 'rotate(35 158 160)' : 'rotate(20 158 160)'}
            fill="#F8FAFC"
            stroke="#94A3B8"
            strokeWidth="2.5"
          />

          {/* Cute Little Feet */}
          <ellipse cx="92" cy="197" rx="12" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
          <ellipse cx="128" cy="197" rx="12" ry="7" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />

          {/* Spacesuit Neck Ring */}
          <ellipse cx="110" cy="142" rx="48" ry="10" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />

          {/* Helmet Base Dome */}
          <circle cx="110" cy="95" r="56" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="3" />

          {/* Helmet Antenna */}
          <line x1="110" y1="39" x2="110" y2="20" stroke="#64748B" strokeWidth="4" strokeLinecap="round" />
          <circle cx="110" cy="16" r="14" fill="url(#antennaGlow)" />
          <circle cx="110" cy="16" r="6" fill={glowColor} />

          {/* Inside Helmet Dark Interior */}
          <circle cx="110" cy="96" r="48" fill="#1E293B" />

          {/* AXOLOTL EXTERNAL FRILLY GILLS (3 Left, 3 Right) */}
          {/* Left Gills */}
          <g fill={gillColor} stroke="#DB2777" strokeWidth="1.5">
            <ellipse cx="64" cy="78" rx="13" ry="5.5" transform="rotate(-22 64 78)" />
            <ellipse cx="61" cy="94" rx="14" ry="5.5" transform="rotate(-4 61 94)" />
            <ellipse cx="65" cy="110" rx="12" ry="5.5" transform="rotate(18 65 110)" />
          </g>
          {/* Right Gills */}
          <g fill={gillColor} stroke="#DB2777" strokeWidth="1.5">
            <ellipse cx="156" cy="78" rx="13" ry="5.5" transform="rotate(22 156 78)" />
            <ellipse cx="159" cy="94" rx="14" ry="5.5" transform="rotate(4 159 94)" />
            <ellipse cx="155" cy="110" rx="12" ry="5.5" transform="rotate(-18 155 110)" />
          </g>

          {/* Axolotl Chibi Head */}
          <ellipse cx="110" cy="98" rx="38" ry="32" fill={bodyColor} stroke="#F472B6" strokeWidth="2" />

          {/* Rosy Cheeks */}
          <ellipse cx="84" cy="104" rx="6.5" ry="4" fill="#F43F5E" opacity="0.45" />
          <ellipse cx="136" cy="104" rx="6.5" ry="4" fill="#F43F5E" opacity="0.45" />

          {/* Dynamic Eyes based on Alert Status */}
          {isRed ? (
            // Urgent / Focused Eyes
            <g>
              <circle cx="92" cy="95" r="6.5" fill="#0F172A" />
              <circle cx="128" cy="95" r="6.5" fill="#0F172A" />
              <circle cx="90" cy="93" r="2.2" fill="#FFFFFF" />
              <circle cx="126" cy="93" r="2.2" fill="#FFFFFF" />
              {/* Determined Eyebrows */}
              <line x1="83" y1="84" x2="99" y2="88" stroke="#BE185D" strokeWidth="3" strokeLinecap="round" />
              <line x1="137" y1="84" x2="121" y2="88" stroke="#BE185D" strokeWidth="3" strokeLinecap="round" />
            </g>
          ) : isYellow ? (
            // Concerned / Attentive Eyes with Medical Monocle HUD
            <g>
              <circle cx="92" cy="95" r="6.5" fill="#0F172A" />
              <circle cx="128" cy="95" r="6.5" fill="#0F172A" />
              <circle cx="90" cy="93" r="2.5" fill="#FFFFFF" />
              <circle cx="126" cy="93" r="2.5" fill="#FFFFFF" />
              {/* Concerned Brows */}
              <path d="M 84 86 Q 92 82 98 86" fill="none" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M 122 86 Q 128 82 136 86" fill="none" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" />
              {/* Medical Scanner Monocle */}
              <circle cx="128" cy="95" r="11" fill="#38BDF8" fillOpacity="0.2" stroke="#0284C7" strokeWidth="2" />
            </g>
          ) : (
            // Happy Sparkling Eyes
            <g>
              <circle cx="92" cy="95" r="6.5" fill="#0F172A" />
              <circle cx="128" cy="95" r="6.5" fill="#0F172A" />
              <circle cx="89.5" cy="92.5" r="2.6" fill="#FFFFFF" />
              <circle cx="125.5" cy="92.5" r="2.6" fill="#FFFFFF" />
              <circle cx="94.5" cy="97.5" r="1.2" fill="#FFFFFF" />
              <circle cx="130.5" cy="97.5" r="1.2" fill="#FFFFFF" />
            </g>
          )}

          {/* Axolotl Mouth */}
          {isRed ? (
            <ellipse cx="110" cy="108" rx="5" ry="4" fill="#BE185D" />
          ) : isYellow ? (
            <path d="M 103 108 Q 110 105 117 108" fill="none" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" />
          ) : (
            <path d="M 101 104 Q 105.5 110 110 105 Q 114.5 110 119 104" fill="none" stroke="#BE185D" strokeWidth="2.5" strokeLinecap="round" />
          )}

          {/* Glass Visor Reflection Overlay */}
          <circle cx="110" cy="96" r="48" fill="url(#helmetGlass)" />
          <path
            d="M 78 68 A 40 40 0 0 1 134 62"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.65"
          />

          {/* Radiation Shield Visor Down if Shelter Protocol / Red Alert */}
          {(isRed || activity === 'Shelter_Protocol') && (
            <path
              d="M 64 82 Q 110 92 156 82 L 152 60 Q 110 44 68 60 Z"
              fill="#F59E0B"
              fillOpacity="0.45"
              stroke="#F59E0B"
              strokeWidth="2"
            />
          )}

          {/* Medical Clipboard on Yellow/Red Alert */}
          {(isYellow || isRed) && (
            <g transform="translate(142, 142) rotate(12)">
              <rect x="0" y="0" width="26" height="34" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
              <rect x="7" y="-3" width="12" height="6" rx="2" fill="#64748B" />
              <line x1="5" y1="11" x2="21" y2="11" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="18" x2="18" y2="18" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
              <line x1="5" y1="25" x2="15" y2="25" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}
        </g>
      </svg>
    </div>
  );
}

// ============================================================================
// 5. INTERACTIVE 2D/SVG ANATOMICAL BODY HUB COMPONENT
// ============================================================================
function InteractiveAstronautBody({
  selectedOrgan,
  onSelectOrgan,
  organStatuses,
  dayData,
  darkMode
}) {
  const getColor = (status) => {
    if (status === 'Red') return '#EF4444';
    if (status === 'Yellow') return '#F59E0B';
    return '#10B981';
  };

  const nodes = [
    {
      id: 'brain',
      label: 'Brain & Sleep',
      sub: `${dayData.cognition_reaction_ms}ms | ${dayData.sleep_duration_hrs}h`,
      cx: 150,
      cy: 56,
      labelX: 25,
      labelY: 36,
      align: 'left'
    },
    {
      id: 'skin',
      label: 'Skin & EVARM',
      sub: `${dayData.daily_dose_skin_mSv} mSv | ${dayData.skin_temp_c}°C`,
      cx: 96,
      cy: 122,
      labelX: 16,
      labelY: 112,
      align: 'left'
    },
    {
      id: 'heart',
      label: 'Heart & BP',
      sub: `${dayData.resting_hr_bpm} bpm | ${dayData.bp_systolic ? `${dayData.bp_systolic}/${dayData.bp_diastolic}` : 'HRV ' + dayData.hrv_ms + 'ms'}`,
      cx: 158,
      cy: 132,
      labelX: 204,
      labelY: 96,
      align: 'right'
    },
    {
      id: 'blood',
      label: 'Blood & BFO',
      sub: `${dayData.blood_hemoglobin_g_dL ? dayData.blood_hemoglobin_g_dL + ' g/dL' : dayData.daily_dose_bfo_mSv + ' mSv'}`,
      cx: 142,
      cy: 172,
      labelX: 16,
      labelY: 194,
      align: 'left'
    },
    {
      id: 'kidneys',
      label: 'Renal & Bone',
      sub: `${dayData.water_intake_liters}L | ${dayData.urine_calcium_mg_dL ? 'Ca ' + dayData.urine_calcium_mg_dL : dayData.exercise_minutes + 'm Ex'}`,
      cx: 164,
      cy: 205,
      labelX: 204,
      labelY: 202,
      align: 'right'
    }
  ];

  return (
    <div className="relative w-full flex flex-col items-center">
      <svg
        viewBox="0 0 300 370"
        className="w-full max-w-[330px] h-auto select-none overflow-visible"
      >
        <defs>
          <linearGradient id="bodySilhouetteGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={darkMode ? '#334155' : '#CBD5E1'} stopOpacity="0.7" />
            <stop offset="100%" stopColor={darkMode ? '#1E293B' : '#94A3B8'} stopOpacity="0.4" />
          </linearGradient>
          <filter id="organGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Biometric Scanner Grid Rings */}
        <circle
          cx="150"
          cy="185"
          r="135"
          fill="none"
          stroke={darkMode ? '#334155' : '#CBD5E1'}
          strokeWidth="1"
          strokeDasharray="4 6"
        />
        <circle
          cx="150"
          cy="185"
          r="98"
          fill="none"
          stroke={darkMode ? '#334155' : '#CBD5E1'}
          strokeWidth="1"
        />
        <line
          x1="150"
          y1="15"
          x2="150"
          y2="355"
          stroke={darkMode ? '#334155' : '#CBD5E1'}
          strokeWidth="1"
          strokeDasharray="3 5"
        />

        {/* Astronaut Helmet Outer Halo */}
        <circle
          cx="150"
          cy="58"
          r="36"
          fill="none"
          stroke={darkMode ? '#475569' : '#94A3B8'}
          strokeWidth="2"
          strokeDasharray="6 3"
        />

        {/* Stylized Human Anatomical Silhouette */}
        <g
          fill="url(#bodySilhouetteGrad)"
          stroke={darkMode ? '#64748B' : '#64748B'}
          strokeWidth="2"
          strokeLinejoin="round"
        >
          {/* Head & Neck */}
          <circle cx="150" cy="58" r="24" />
          <rect x="141" y="82" width="18" height="14" rx="4" />

          {/* Torso, Shoulders, Arms, Legs */}
          <path
            d="M 104 96
               L 196 96
               C 208 96, 214 106, 216 120
               L 224 192
               C 225 200, 214 202, 210 194
               L 198 128
               L 190 128
               L 186 220
               L 194 332
               C 194 342, 176 342, 174 332
               L 156 238
               L 144 238
               L 126 332
               C 124 342, 106 342, 106 332
               L 114 220
               L 110 128
               L 102 128
               L 90 194
               C 86 202, 75 200, 76 192
               L 84 120
               C 86 106, 92 96, 104 96 Z"
          />
        </g>

        {/* Internal Anatomical Organ Illustrations (Clickable) */}
        {/* 1. Brain Graphic */}
        <g
          onClick={() => onSelectOrgan('brain')}
          className="cursor-pointer"
          opacity={selectedOrgan === 'brain' ? 1 : 0.85}
        >
          <path
            d="M 136 55 C 134 45, 148 42, 150 49 C 152 42, 166 45, 164 55 C 168 62, 160 69, 150 67 C 140 69, 132 62, 136 55 Z"
            fill={getColor(organStatuses.brain)}
            fillOpacity="0.35"
            stroke={getColor(organStatuses.brain)}
            strokeWidth="2.2"
          />
        </g>

        {/* 2. Vascular / Spine / Bone Marrow Line (Blood & BFO) */}
        <g
          onClick={() => onSelectOrgan('blood')}
          className="cursor-pointer"
          opacity={selectedOrgan === 'blood' ? 1 : 0.85}
        >
          <path
            d="M 150 96 L 150 215 M 150 140 L 132 175 M 150 140 L 168 175"
            stroke={getColor(organStatuses.blood)}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect
            x="130"
            y="158"
            width="24"
            height="24"
            rx="6"
            fill={getColor(organStatuses.blood)}
            fillOpacity="0.28"
            stroke={getColor(organStatuses.blood)}
            strokeWidth="2"
          />
        </g>

        {/* 3. Heart Graphic */}
        <g
          onClick={() => onSelectOrgan('heart')}
          className="cursor-pointer"
          opacity={selectedOrgan === 'heart' ? 1 : 0.9}
        >
          <path
            d="M 158 125 C 154 118, 144 120, 146 129 C 148 137, 158 142, 158 145 C 158 142, 168 137, 170 129 C 172 120, 162 118, 158 125 Z"
            fill={getColor(organStatuses.heart)}
            stroke="#FFFFFF"
            strokeWidth="1.5"
            filter="url(#organGlow)"
          />
        </g>

        {/* 4. Kidneys Graphic */}
        <g
          onClick={() => onSelectOrgan('kidneys')}
          className="cursor-pointer"
          opacity={selectedOrgan === 'kidneys' ? 1 : 0.85}
        >
          <ellipse
            cx="136"
            cy="205"
            rx="7"
            ry="11"
            transform="rotate(-12 136 205)"
            fill={getColor(organStatuses.kidneys)}
            fillOpacity="0.5"
            stroke={getColor(organStatuses.kidneys)}
            strokeWidth="2"
          />
          <ellipse
            cx="164"
            cy="205"
            rx="7"
            ry="11"
            transform="rotate(12 164 205)"
            fill={getColor(organStatuses.kidneys)}
            fillOpacity="0.5"
            stroke={getColor(organStatuses.kidneys)}
            strokeWidth="2"
          />
        </g>

        {/* 5. Deltoid Skin & EVARM Patch */}
        <g
          onClick={() => onSelectOrgan('skin')}
          className="cursor-pointer"
          opacity={selectedOrgan === 'skin' ? 1 : 0.85}
        >
          <rect
            x="84"
            y="108"
            width="22"
            height="28"
            rx="8"
            fill={getColor(organStatuses.skin)}
            fillOpacity="0.4"
            stroke={getColor(organStatuses.skin)}
            strokeWidth="2.2"
          />
        </g>

        {/* Interactive Callout Lines & Clickable Organ Nodes */}
        {nodes.map((node) => {
          const status = organStatuses[node.id];
          const color = getColor(status);
          const isSelected = selectedOrgan === node.id;

          return (
            <g
              key={node.id}
              onClick={() => onSelectOrgan(node.id)}
              className="cursor-pointer group"
            >
              {/* Connector Line */}
              <polyline
                points={`${node.cx},${node.cy} ${
                  node.align === 'left' ? node.labelX + 78 : node.labelX
                },${node.labelY + 16}`}
                fill="none"
                stroke={color}
                strokeWidth={isSelected ? '2.5' : '1.5'}
                strokeDasharray={isSelected ? 'none' : '3 3'}
              />

              {/* Pulsing Ring on Organ Node */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={isSelected ? 13 : 9}
                fill={color}
                fillOpacity={isSelected ? 0.35 : 0.2}
                stroke={color}
                strokeWidth={isSelected ? 2.5 : 1.5}
              />
              <circle cx={node.cx} cy={node.cy} r={5} fill={color} />

              {/* Callout Pill Label */}
              <g transform={`translate(${node.labelX}, ${node.labelY})`}>
                <rect
                  x="0"
                  y="0"
                  width="84"
                  height="34"
                  rx="9"
                  fill={darkMode ? '#1E222B' : '#E6E9EF'}
                  stroke={isSelected ? color : darkMode ? '#334155' : '#CBD5E1'}
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                />
                <circle cx="10" cy="12" r="3.5" fill={color} />
                <text
                  x="18"
                  y="14"
                  fontSize="9.5"
                  fontWeight="700"
                  fill={darkMode ? '#F8FAFC' : '#1E293B'}
                >
                  {node.label}
                </text>
                <text
                  x="10"
                  y="26"
                  fontSize="8"
                  fontWeight="600"
                  fill={darkMode ? '#94A3B8' : '#475569'}
                >
                  {node.sub}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ============================================================================
// 6. MAIN DASHBOARD APPLICATION COMPONENT
// ============================================================================
export default function App() {
  const [missionData, setMissionData] = useState(INITIAL_30D_DATA);
  const [selectedDay, setSelectedDay] = useState(12); // Start on Day 12 (CO2 + Renal Alert) to immediately show rich clinical insights
  const [selectedOrgan, setSelectedOrgan] = useState('heart');
  const [heartChartSubTab, setHeartChartSubTab] = useState('hr_bp'); // 'hr_bp' | 'hrv_spo2'
  const [darkMode, setDarkMode] = useState(false);
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Private Crew Diary State (kept separate from telemetry, never exported)
  const [diaryEntries, setDiaryEntries] = useState(INITIAL_DIARY_ENTRIES);
  const [diaryDraft, setDiaryDraft] = useState('');
  const [diaryError, setDiaryError] = useState('');
  const [checkInDiaryOpen, setCheckInDiaryOpen] = useState(true);
  const [diaryPanelOpen, setDiaryPanelOpen] = useState(false);

  // Pills & Countermeasure Calendar State (Month 1: Days 1-30, Month 2: Days 31-60)
  const [pillSchedule, setPillSchedule] = useState(INITIAL_PILL_SCHEDULE);
  const [pillsPanelOpen, setPillsPanelOpen] = useState(false);
  const [pillCalendarMonth, setPillCalendarMonth] = useState(1); // 1 = Days 1-30, 2 = Days 31-60
  const [selectedPillDay, setSelectedPillDay] = useState(12);
  const [newPillForm, setNewPillForm] = useState({
    name: '',
    dose: '',
    timing: 'Morning with 250 mL water',
    reason: 'Crew personal schedule',
    startDay: 12,
    durationDays: 1
  });
  const [checkInPillsOpen, setCheckInPillsOpen] = useState(true);
  const [checkInSelectedCatalogIds, setCheckInSelectedCatalogIds] = useState(['vit_d3', 'folate_b12_iron']);
  const [checkInCustomPillName, setCheckInCustomPillName] = useState('');
  const [checkInCustomPillDose, setCheckInCustomPillDose] = useState('');

  // Export menu & Import state
  const [exportMenuOpen, setExportMenuOpen] = useState(false);
  const exportMenuRef = useRef(null);
  const importInputRef = useRef(null);
  const [importStatus, setImportStatus] = useState(null); // { type: 'success' | 'error', text }

  // Close export menu on outside click
  useEffect(() => {
    if (!exportMenuOpen) return;
    const onDown = (e) => {
      if (exportMenuRef.current && !exportMenuRef.current.contains(e.target)) setExportMenuOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [exportMenuOpen]);

  // Auto-dismiss import status banner
  useEffect(() => {
    if (!importStatus) return;
    const t = setTimeout(() => setImportStatus(null), 5000);
    return () => clearTimeout(t);
  }, [importStatus]);

  // Check-In Form State for Appending Day 31+
  const nextMissionDay = missionData.length + 1;
  const [checkInForm, setCheckInForm] = useState({
    mood_score: 8,
    cognition_reaction_ms: 248,
    blood_glucose_mg_dL: 92,
    resting_hr_bpm: 62,
    bp_systolic: 118,
    bp_diastolic: 76,
    sleep_duration_hrs: 7.6,
    water_intake_liters: 2.5,
    exercise_minutes: 140,
    daily_dose_bfo_mSv: 0.58,
    cabin_co2_mmHg: 2.1,
    dermal_status: 'Normal',
    blood_hemoglobin_g_dL: 12.3
  });

  // Mini interactive NASA PVT Reaction Timer inside the Check-in Modal
  const [pvtState, setPvtState] = useState('idle'); // 'idle' | 'waiting' | 'ready' | 'done'
  const pvtStartRef = useRef(0);
  const pvtTimeoutRef = useRef(null);

  const startPvtTest = () => {
    setPvtState('waiting');
    const randomDelay = 1200 + Math.random() * 1800;
    pvtTimeoutRef.current = setTimeout(() => {
      pvtStartRef.current = performance.now();
      setPvtState('ready');
    }, randomDelay);
  };

  const handlePvtClick = () => {
    if (pvtState === 'waiting') {
      clearTimeout(pvtTimeoutRef.current);
      setPvtState('idle');
      return;
    }
    if (pvtState === 'ready') {
      const elapsed = Math.round(performance.now() - pvtStartRef.current);
      const clamped = Math.max(180, Math.min(500, elapsed));
      setCheckInForm((prev) => ({ ...prev, cognition_reaction_ms: clamped }));
      setPvtState('done');
    }
  };

  useEffect(() => {
    return () => clearTimeout(pvtTimeoutRef.current);
  }, []);

  // Sync Pills Calendar day when user scrubs the main mission timeline
  useEffect(() => {
    setSelectedPillDay(selectedDay);
    setPillCalendarMonth(selectedDay > 30 ? 2 : 1);
    setNewPillForm((prev) => ({ ...prev, startDay: selectedDay }));
  }, [selectedDay]);

  // Dynamically compute recommended catalog pills for Check-In modal based on entered vitals & Month 2 schedule
  const checkInAutoRecommendedIds = useMemo(() => {
    const rec = new Set(['vit_d3']);
    const existing = pillSchedule[nextMissionDay] || [];
    existing.forEach((p) => {
      if (p.catalogId) rec.add(p.catalogId);
    });
    if (Number(checkInForm.water_intake_liters) < 2.0) rec.add('potassium_citrate');
    if (Number(checkInForm.blood_hemoglobin_g_dL) <= 12.0) rec.add('folate_b12_iron');
    if (Number(checkInForm.daily_dose_bfo_mSv) >= 1.5) rec.add('spe_radioprotectant');
    if (checkInForm.dermal_status === 'Rash_Detected') rec.add('antiviral_dermal');
    return Array.from(rec);
  }, [checkInForm, pillSchedule, nextMissionDay]);

  useEffect(() => {
    if (showCheckInModal) {
      setCheckInSelectedCatalogIds(checkInAutoRecommendedIds);
    }
  }, [showCheckInModal, checkInAutoRecommendedIds]);

  const handleTogglePillTaken = (day, uid) => {
    setPillSchedule((prev) => ({
      ...prev,
      [day]: (prev[day] || []).map((item) => (item.uid === uid ? { ...item, taken: !item.taken } : item))
    }));
  };

  const handleMarkAllDayPillsTaken = (day) => {
    setPillSchedule((prev) => ({
      ...prev,
      [day]: (prev[day] || []).map((item) => ({ ...item, taken: true }))
    }));
  };

  const handleDeleteCustomPill = (day, uid) => {
    setPillSchedule((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((item) => item.uid !== uid)
    }));
  };

  const handleAddCustomPillToCalendar = (e) => {
    e.preventDefault();
    const name = newPillForm.name.trim();
    if (!name) return;
    const dose = newPillForm.dose.trim() || '1 dose';
    const timing = newPillForm.timing.trim() || 'With water';
    const reason = newPillForm.reason.trim() || 'Added by crew';
    const start = Math.max(1, Math.min(60, Number(newPillForm.startDay) || selectedPillDay));
    const dur = Math.max(1, Math.min(30, Number(newPillForm.durationDays) || 1));
    const end = Math.min(60, start + dur - 1);

    setPillSchedule((prev) => {
      const next = { ...prev };
      for (let d = start; d <= end; d++) {
        const cur = next[d] ? [...next[d]] : [];
        cur.push({
          uid: `custom-${d}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
          catalogId: null,
          name,
          dose,
          timing,
          category: 'custom',
          reason,
          taken: false,
          isCustom: true
        });
        next[d] = cur;
      }
      return next;
    });
    setSelectedPillDay(start);
    setPillCalendarMonth(start > 30 ? 2 : 1);
    setNewPillForm((prev) => ({ ...prev, name: '', dose: '' }));
  };

  // Current Day Data & Organ Statuses
  const currentDayData = useMemo(() => {
    return missionData.find((d) => d.mission_day === selectedDay) || missionData[0];
  }, [missionData, selectedDay]);

  const organStatuses = useMemo(() => {
    return evaluateOrganStatuses(currentDayData);
  }, [currentDayData]);

  // Neumorphic Theme Classes
  const neuBg = darkMode ? 'bg-[#1E222B] text-slate-100' : 'bg-[#E6E9EF] text-slate-800';
  const neuCard = darkMode
    ? 'bg-[#1E222B] shadow-[8px_8px_16px_#15181f,-8px_-8px_16px_#272c37] border border-slate-800/60'
    : 'bg-[#E6E9EF] shadow-[8px_8px_16px_#c5c8cf,-8px_-8px_16px_#ffffff] border border-white/50';
  const neuCardSm = darkMode
    ? 'bg-[#1E222B] shadow-[5px_5px_10px_#15181f,-5px_-5px_10px_#272c37] border border-slate-800/50'
    : 'bg-[#E6E9EF] shadow-[5px_5px_10px_#c5c8cf,-5px_-5px_10px_#ffffff] border border-white/40';
  const neuInset = darkMode
    ? 'bg-[#1E222B] shadow-[inset_4px_4px_8px_#15181f,inset_-4px_-4px_8px_#272c37] border border-slate-800/40'
    : 'bg-[#E6E9EF] shadow-[inset_4px_4px_8px_#c5c8cf,inset_-4px_-4px_8px_#ffffff] border border-white/30';
  const neuBtn = darkMode
    ? 'bg-[#1E222B] shadow-[4px_4px_8px_#15181f,-4px_-4px_8px_#272c37] hover:shadow-[2px_2px_4px_#15181f,-2px_-2px_4px_#272c37] active:shadow-[inset_3px_3px_6px_#15181f,inset_-3px_-3px_6px_#272c37]'
    : 'bg-[#E6E9EF] shadow-[4px_4px_8px_#c5c8cf,-4px_-4px_8px_#ffffff] hover:shadow-[2px_2px_4px_#c5c8cf,-2px_-2px_4px_#ffffff] active:shadow-[inset_3px_3px_6px_#c5c8cf,inset_-3px_-3px_6px_#ffffff]';

  // Quick Scenario Presets
  const SCENARIO_PRESETS = [
    {
      day: 1,
      label: 'Day 1: Baseline',
      badge: 'Green',
      organ: 'heart',
      desc: 'Scheduled Baseline Panel'
    },
    {
      day: 12,
      label: 'Day 12: High CO2 & Stone Risk',
      badge: 'Yellow',
      organ: 'kidneys',
      desc: 'CO2 4.3 mmHg + Ca 26.4 mg/dL'
    },
    {
      day: 19,
      label: 'Day 19: EVA Spacewalk',
      badge: 'Yellow',
      organ: 'skin',
      desc: 'EVARM Skin Dose 4.80 mSv'
    },
    {
      day: 20,
      label: 'Day 20: Immune & Rash',
      badge: 'Yellow',
      organ: 'skin',
      desc: 'WBC 9.8 k/uL + Deltoid Rash'
    },
    {
      day: 21,
      label: 'Day 21: Solar Storm (SPE)',
      badge: 'Red',
      organ: 'blood',
      desc: '18.4 mSv/hr Shelter Protocol'
    },
    {
      day: 28,
      label: 'Day 28: Space Anemia',
      badge: 'Yellow',
      organ: 'blood',
      desc: 'Hemoglobin 11.8 g/dL (-17%)'
    }
  ];

  // Dynamic Dr. Axo Triage Advice + NASA Investigation Links for Selected Day
  const drAxoBriefing = useMemo(() => {
    const d = currentDayData;
    const refs = new Set([NASA_REFERENCES.HAZARDS]);

    if (d.mission_day === 21 || d.peak_dose_rate_mSv_hr >= 5.0) {
      refs.add(NASA_REFERENCES.CSA_RAD);
      refs.add(NASA_REFERENCES.CSA_MOSFET);
      refs.add(NASA_REFERENCES.CSA_RADIN2);
      return {
        headline: 'RED EMERGENCY: Solar Particle Event (SPE) Detected!',
        whyExam:
          'Active CSA CANS/Radi-N2 cabin dosimeters and MOSFET badges detected an acute proton flux spike (18.4 mSv/hr). A full blood and stress panel was automatically triggered to baseline hematological and metabolic markers during peak radiation.',
        protocolSteps: [
          'ABORT all IVA/EVA operations immediately and retreat to the Polyethylene & Water-Lined Crew Quarters Storm Shelter (reduces effective dose rate by ~75%).',
          'Administer onboard prophylactic oral antioxidant / radioprotectant countermeasure pack.',
          'Monitor Blood-Forming Organs (BFO) cumulative dose (146.9 mSv vs. 250 mSv 30-day limit).'
        ],
        references: Array.from(refs)
      };
    }

    if (d.mission_day === 12 || (d.urine_calcium_mg_dL && d.urine_calcium_mg_dL >= 20)) {
      refs.add(NASA_REFERENCES.OSD_656);
      refs.add(NASA_REFERENCES.OSD_575);
      refs.add(NASA_REFERENCES.RISKS);
      return {
        headline: 'CAUTION: High Cabin CO2 Cascade & Kidney Stone Risk',
        whyExam:
          'Elevated resting HR (78 bpm), low HRV (38 ms), and low fluid intake (1.4L) automatically triggered an unscheduled Point-of-Care Urine Strip & BP exam. Microgravity bone demineralization dumps calcium into urine—combined with dehydration (USG 1.029), urinary calcium hit 26.4 mg/dL.',
        protocolSteps: [
          'Switch ECLSS air revitalization to backup LiOH scrubber to bring cabin CO2 (4.3 mmHg) below 2.5 mmHg.',
          'Drink 2.5L water today + take oral Potassium Citrate to alkalinize urine and prevent calcium oxalate stone crystallization.',
          'Enable dynamic 480nm blue-enriched LED lighting to correct sleep debt (4.7 hrs) and 338 ms cognitive lag.'
        ],
        references: Array.from(refs)
      };
    }

    if (d.mission_day === 19 || d.activity_status === 'EVA_Spacewalk') {
      refs.add(NASA_REFERENCES.CSA_EVARM);
      refs.add(NASA_REFERENCES.CSA_MOSFET);
      return {
        headline: 'POST-EVA ADVISORY: Suit Skin Radiation & Autonomic Fatigue',
        whyExam:
          'Following a 6-hour Extravehicular Activity (EVA), a post-spacewalk cuff BP (128/82 mmHg) and EVARM badge readout were required because spacesuits offer less radiation shielding than the station hull.',
        protocolSteps: [
          'Log EVARM skin dose (4.80 mSv today vs. 1.45 mSv internal BFO dose).',
          'Prioritize 8 hours of recovery sleep and high-antioxidant hydration to restore HRV (currently 41 ms).'
        ],
        references: Array.from(refs)
      };
    }

    if (d.mission_day === 20 || d.dermal_status === 'Rash_Detected') {
      refs.add(NASA_REFERENCES.OSD_570);
      refs.add(NASA_REFERENCES.OSD_574);
      refs.add(NASA_REFERENCES.OSD_687);
      return {
        headline: 'CAUTION: Stress-Induced Immune Shift & Deltoid Rash',
        whyExam:
          'Elevated skin temperature (37.8°C), post-EVA HRV drop (35 ms), and a deltoid skin rash triggered a fingerstick WBC & metabolic panel (WBC elevated at 9.8 k/uL, Glucose 112 mg/dL). Spaceflight stress blunts T-cell regulation and alters skin flora.',
        protocolSteps: [
          'Apply topical hydrocortisone + prophylactic antiviral regimen per OSD-570/574 dermal protocol.',
          'Capture high-resolution deltoid rash image for Flight Surgeon telemetry queue.',
          'Reduce heavy resistive workload for 24 hours to lower cortisol and autonomic stress.'
        ],
        references: Array.from(refs)
      };
    }

    if (d.mission_day === 28 || (d.blood_hemoglobin_g_dL && d.blood_hemoglobin_g_dL <= 12.0)) {
      refs.add(NASA_REFERENCES.OSD_569);
      refs.add(NASA_REFERENCES.OSD_571);
      return {
        headline: 'CAUTION: Progressive Space Anemia Detected (OSD-569)',
        whyExam:
          'Scheduled Day 28 weekly i-STAT fingerstick panel revealed capillary Hemoglobin dropped to 11.8 g/dL (a 17% decline from Day 1 baseline of 14.2 g/dL), accompanied by a mild SpO2 dip to 96.8%. Microgravity causes ~10–12% red blood cell hemolysis.',
        protocolSteps: [
          'Initiate Folate, Vitamin B12, and bioavailable Iron nutritional countermeasure pack.',
          'Schedule a 45-minute Lower Body Negative Pressure (LBNP) session to stimulate vascular conditioning.',
          'Maintain 140+ mins/day ARED + CVIS aerobic exercise.'
        ],
        references: Array.from(refs)
      };
    }

    // Default / Nominal or Custom Day
    refs.add(NASA_REFERENCES.OSD_569);
    refs.add(NASA_REFERENCES.OSD_656);
    return {
      headline:
        d.alert_status === 'Green'
          ? `Day ${d.mission_day}: All Physiological Systems Nominal!`
          : `Day ${d.mission_day}: Crew Health Advisory (${d.alert_status})`,
      whyExam: d.exam_trigger_reason
        ? `Exam Triggered (${d.exam_trigger_reason.replace(/_/g, ' ')}): Periodic Point-of-Care checks validate wearable trends without wasting limited onboard microfluidic cartridges.`
        : 'No invasive fingerstick or urine cartridge needed today—continuous passive wearable telemetry (HR, HRV, SpO2, Sleep, Radiation) is within nominal bounds.',
      protocolSteps: [
        d.recommended_action,
        'Complete 2.5 hours of daily ARED resistive + treadmill exercise and 2.5L water intake to protect bone density and cardiovascular volume.'
      ],
      references: Array.from(refs)
    };
  }, [currentDayData]);

  // Handle Daily Crew Check-In Form Submission (Adds Day 31+)
  const handleAddDailyCheckIn = (e) => {
    e.preventDefault();
    const diaryNote = diaryDraft.trim();
    if (!diaryNote) {
      setCheckInDiaryOpen(true);
      setDiaryError('Please write a short diary note before submitting today\'s check-in.');
      return;
    }
    const lastEntry = missionData[missionData.length - 1];
    const newDayNum = lastEntry.mission_day + 1;

    const hr = Number(checkInForm.resting_hr_bpm);
    const sys = Number(checkInForm.bp_systolic);
    const dia = Number(checkInForm.bp_diastolic);
    const glu = Number(checkInForm.blood_glucose_mg_dL);
    const cog = Number(checkInForm.cognition_reaction_ms);
    const mood = Number(checkInForm.mood_score);
    const sleep = Number(checkInForm.sleep_duration_hrs);
    const water = Number(checkInForm.water_intake_liters);
    const ex = Number(checkInForm.exercise_minutes);
    const bfo = Number(checkInForm.daily_dose_bfo_mSv);
    const co2 = Number(checkInForm.cabin_co2_mmHg);
    const hgb = Number(checkInForm.blood_hemoglobin_g_dL);

    // Compute synthetic derived metrics & alert status
    const skinDose = Number((bfo * 1.22).toFixed(2));
    const cumBfo = Number((lastEntry.cumulative_career_bfo_mSv + bfo).toFixed(2));
    const cumSkin = Number((lastEntry.cumulative_career_skin_mSv + skinDose).toFixed(2));
    const computedHrv = Math.max(28, Math.min(78, Math.round(68 - (hr - 60) * 1.3 - (8 - sleep) * 3)));

    let alert = 'Green';
    let actionNotes = [];

    if (hr >= 84 || sys >= 138 || bfo >= 5.0 || glu >= 126 || cog >= 350) {
      alert = 'Red';
    } else if (
      hr >= 72 ||
      sys >= 128 ||
      bfo >= 1.2 ||
      glu >= 105 ||
      cog >= 280 ||
      mood <= 5 ||
      water < 1.8 ||
      co2 >= 3.5 ||
      hgb <= 12.0 ||
      checkInForm.dermal_status !== 'Normal'
    ) {
      alert = 'Yellow';
    }

    if (hr >= 72 || sys >= 128) {
      actionNotes.push('Elevated cardiovascular strain (HR/BP above baseline): increase isotonic hydration and schedule LBNP.');
    }
    if (glu >= 105) {
      actionNotes.push(`Elevated fasting glucose (${glu} mg/dL - OSD-575 insulin resistance risk): prioritize aerobic CVIS session.`);
    }
    if (cog >= 280 || sleep < 6.2 || mood <= 5) {
      actionNotes.push('Cognitive/sleep fatigue detected: activate 480nm blue-enriched circadian lighting and reduce high-risk robotics tasks.');
    }
    if (water < 2.0) {
      actionNotes.push('Low hydration increases microgravity renal stone risk (OSD-656): drink 2.5L water + Potassium Citrate.');
    }
    if (bfo >= 1.5) {
      actionNotes.push('Elevated radiation dose: verify CSA MOSFET badge and shelter in polyethylene-shielded quarters.');
    }
    if (actionNotes.length === 0) {
      actionNotes.push('Crew check-in nominal. Continue standard 2.5h ARED/Treadmill exercise and 2.5L hydration.');
    }

    const newEntry = {
      mission_day: newDayNum,
      astronaut_id: ASTRONAUT_PROFILE.name,
      activity_status: bfo >= 5.0 ? 'Shelter_Protocol' : 'IVA_Nominal',
      alert_status: alert,
      cabin_co2_mmHg: co2,
      water_intake_liters: water,
      exercise_minutes: ex,
      resting_hr_bpm: hr,
      hrv_ms: computedHrv,
      skin_temp_c: checkInForm.dermal_status === 'Rash_Detected' ? 37.6 : 36.6,
      spo2_percent: hgb < 12.0 ? 96.9 : 98.2,
      sleep_duration_hrs: sleep,
      cognition_reaction_ms: cog,
      mood_score: mood,
      daily_dose_bfo_mSv: bfo,
      daily_dose_skin_mSv: skinDose,
      peak_dose_rate_mSv_hr: Number((bfo / 12).toFixed(2)),
      cumulative_career_bfo_mSv: cumBfo,
      cumulative_career_skin_mSv: cumSkin,
      bp_systolic: sys,
      bp_diastolic: dia,
      urine_specific_gravity: water < 1.8 ? 1.027 : 1.015,
      urine_calcium_mg_dL: ex < 60 ? 23.5 : 14.2,
      blood_hemoglobin_g_dL: hgb,
      blood_wbc_k_uL: checkInForm.dermal_status === 'Rash_Detected' ? 9.2 : 6.1,
      blood_glucose_mg_dL: glu,
      dermal_status: checkInForm.dermal_status,
      exam_trigger_reason: 'Crew_Logged_POC_Check_In',
      recommended_action: actionNotes.join(' ')
    };

    setMissionData((prev) => [...prev, newEntry]);
    setDiaryEntries((prev) => [...prev, { mission_day: newDayNum, note: diaryNote }]);
    setPillSchedule((prev) => {
      const existingCustom = (prev[newDayNum] || []).filter((p) => p.isCustom);
      const loggedCatalogPills = checkInSelectedCatalogIds.map((catId) => {
        const c = PILL_CATALOG[catId];
        return {
          uid: `d${newDayNum}-${catId}`,
          catalogId: catId,
          name: c.name,
          dose: c.dose,
          timing: c.timing,
          category: c.category,
          reason: c.reason,
          taken: true,
          isCustom: false
        };
      });
      const extraCustom = checkInCustomPillName.trim()
        ? [
            {
              uid: `custom-${newDayNum}-${Date.now()}`,
              catalogId: null,
              name: checkInCustomPillName.trim(),
              dose: checkInCustomPillDose.trim() || '1 dose',
              timing: 'Logged during Daily Check-In with water',
              category: 'custom',
              reason: 'Crew logged during check-in',
              taken: true,
              isCustom: true
            }
          ]
        : [];
      return {
        ...prev,
        [newDayNum]: [...loggedCatalogPills, ...existingCustom.map((p) => ({ ...p, taken: true })), ...extraCustom]
      };
    });
    setCheckInCustomPillName('');
    setCheckInCustomPillDose('');
    setDiaryDraft('');
    setDiaryError('');
    setSelectedDay(newDayNum);
    setShowCheckInModal(false);
    setPvtState('idle');
  };

  // Download helper
  const downloadJSON = (payload, filename) => {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export Health Telemetry as JSON (diary is NOT included)
  const handleExportHealth = () => {
    downloadJSON(
      {
        export_type: 'axomed_health',
        exported_at: new Date().toISOString(),
        astronaut_profile: ASTRONAUT_PROFILE,
        daily_telemetry_and_labs: missionData
      },
      `axomed_health_data_${missionData.length}d.json`
    );
    setExportMenuOpen(false);
  };

  // Export Private Diary as a separate JSON file
  const handleExportDiary = () => {
    downloadJSON(
      {
        export_type: 'axomed_diary',
        exported_at: new Date().toISOString(),
        diary_entries: diaryEntries
      },
      `axomed_private_diary_${diaryEntries.length}notes.json`
    );
    setExportMenuOpen(false);
  };

  // Import a previously exported Health or Diary JSON file (auto-detected)
  const handleImportFile = (e) => {
    const file = e.target.files && e.target.files[0];
    e.target.value = ''; // allow re-importing the same file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result));
        const isValidDay = (d) => d && typeof d === 'object' && Number.isFinite(Number(d.mission_day));

        if (Array.isArray(data.daily_telemetry_and_labs)) {
          const days = data.daily_telemetry_and_labs;
          if (days.length === 0 || !days.every((d) => isValidDay(d) && typeof d.alert_status === 'string')) {
            throw new Error('Health file has no valid daily records.');
          }
          const sorted = days
            .map((d) => ({ ...d, mission_day: Number(d.mission_day) }))
            .sort((a, b) => a.mission_day - b.mission_day);
          setMissionData(sorted);
          setSelectedDay(sorted[sorted.length - 1].mission_day);
          setImportStatus({ type: 'success', text: `Imported health data: ${sorted.length} mission days.` });
        } else if (Array.isArray(data.diary_entries)) {
          const notes = data.diary_entries;
          if (!notes.every((n) => isValidDay(n) && typeof n.note === 'string')) {
            throw new Error('Diary file contains invalid entries.');
          }
          const sorted = notes
            .map((n) => ({ mission_day: Number(n.mission_day), note: n.note }))
            .sort((a, b) => a.mission_day - b.mission_day);
          setDiaryEntries(sorted);
          setImportStatus({ type: 'success', text: `Imported private diary: ${sorted.length} notes.` });
        } else {
          throw new Error('Unrecognized file. Please choose an AxoMed health or diary export.');
        }
      } catch (err) {
        setImportStatus({
          type: 'error',
          text: err instanceof SyntaxError ? 'Could not read file: not valid JSON.' : err.message
        });
      }
    };
    reader.onerror = () => setImportStatus({ type: 'error', text: 'Could not read the selected file.' });
    reader.readAsText(file);
  };

  // Status Badge Helper
  const renderStatusPill = (status, text) => {
    const map = {
      Green: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      Yellow: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
      Red: 'bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/30 animate-pulse'
    };
    const Icon =
      status === 'Red' ? AlertOctagon : status === 'Yellow' ? AlertTriangle : CheckCircle2;
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
          map[status] || map.Green
        }`}
      >
        <Icon className="w-3.5 h-3.5" />
        {text || status}
      </span>
    );
  };

  const activeOrganConfig = BODY_SYSTEMS[selectedOrgan];
  const ActiveOrganIcon = activeOrganConfig.icon;

  return (
    <div className={`min-h-screen ${neuBg} transition-colors duration-300 font-sans pb-10`}>
      {/* ====================================================================
          TOP NAVIGATION & MISSION TIMELINE SCRUBBER
      ==================================================================== */}
      <header className="max-w-[1440px] mx-auto px-4 sm:px-6 pt-5 pb-3">
        <div className={`rounded-3xl p-4 sm:p-5 ${neuCard}`}>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Brand & Astronaut Profile */}
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${neuInset} text-sky-500`}
              >
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-extrabold tracking-tight">
                    AxoMed
                  </h1>
                  {renderStatusPill(
                    currentDayData.alert_status,
                    `Day ${currentDayData.mission_day}: ${
                      currentDayData.alert_status === 'Green'
                        ? 'Nominal'
                        : currentDayData.alert_status === 'Yellow'
                        ? 'Crew Attention'
                        : 'Flight Surgeon Emergency'
                    }`
                  )}
                </div>
                <p className="text-xs sm:text-sm opacity-75 mt-0.5">
                  Crew Member: <strong className="font-semibold">{ASTRONAUT_PROFILE.name}</strong> •
                  Activity:{' '}
                  <span className="font-semibold text-sky-500">
                    {currentDayData.activity_status.replace(/_/g, ' ')}
                  </span>{' '}
                  • Career BFO Radiation:{' '}
                  <span className="font-semibold">
                    {currentDayData.cumulative_career_bfo_mSv} / 600 mSv
                  </span>
                </p>
              </div>
            </div>

            {/* Right Controls: Daily Crew Check-In, Export, Dark Mode */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Open Daily Crew Check-In Modal Button */}
              <button
                onClick={() => setShowCheckInModal(true)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-sky-600 dark:text-sky-400 transition-all ${neuBtn}`}
              >
                <PlusCircle className="w-4 h-4" />
                <span>Log Day {nextMissionDay} Check-In</span>
              </button>

              {/* Import JSON (Health or Diary, auto-detected) */}
              <input
                ref={importInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleImportFile}
                className="hidden"
              />
              <button
                onClick={() => importInputRef.current && importInputRef.current.click()}
                title="Import Health Data or Diary (JSON)"
                className={`flex items-center gap-1.5 p-2.5 rounded-2xl text-xs font-bold transition-all ${neuBtn}`}
              >
                <Upload className="w-4 h-4" />
                <span className="hidden sm:inline">Import</span>
              </button>

              {/* Export JSON Menu: Health Data or Private Diary */}
              <div className="relative" ref={exportMenuRef}>
                <button
                  onClick={() => setExportMenuOpen((o) => !o)}
                  title="Export Health Data or Diary (JSON)"
                  aria-expanded={exportMenuOpen}
                  className={`flex items-center gap-1.5 p-2.5 rounded-2xl text-xs font-bold transition-all ${neuBtn}`}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Export</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${exportMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {exportMenuOpen && (
                  <div className={`absolute right-0 mt-2 w-64 z-40 rounded-2xl p-2 space-y-1.5 ${neuCard}`}>
                    <button
                      onClick={handleExportHealth}
                      className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${neuBtn}`}
                    >
                      <Activity className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-xs font-extrabold">Health Data</span>
                        <span className="block text-[10px] opacity-65">
                          {missionData.length} days of telemetry &amp; labs
                        </span>
                      </span>
                    </button>
                    <button
                      onClick={handleExportDiary}
                      className={`w-full flex items-start gap-2.5 p-2.5 rounded-xl text-left transition-all ${neuBtn}`}
                    >
                      <BookHeart className="w-4 h-4 text-pink-500 shrink-0 mt-0.5" />
                      <span>
                        <span className="block text-xs font-extrabold flex items-center gap-1">
                          Private Diary <Lock className="w-3 h-3 opacity-60" />
                        </span>
                        <span className="block text-[10px] opacity-65">
                          {diaryEntries.length} notes, separate file
                        </span>
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Soft UI Light / Dark Theme Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                title="Toggle Soft Alabaster / Deep-Space Dark Neumorphism"
                className={`p-2.5 rounded-2xl transition-all ${neuBtn}`}
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-amber-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mission Day Timeline Scrubber & Clinical Scenario Presets */}
          <div className="mt-4 pt-4 border-t border-slate-400/20 flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            {/* Day Slider */}
            <div className="flex items-center gap-3 flex-1">
              <button
                onClick={() => setSelectedDay((d) => Math.max(1, d - 1))}
                className={`p-2 rounded-xl ${neuBtn}`}
                aria-label="Previous Day"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex-1">
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span>Mission Timeline Scrubber (Day {selectedDay} of {missionData.length})</span>
                  <span className="opacity-75">
                    {currentDayData.exam_trigger_reason
                      ? `🔬 POC Lab: ${currentDayData.exam_trigger_reason.replace(/_/g, ' ')}`
                      : '⌚ Continuous Wearable Telemetry'}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={missionData.length}
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(Number(e.target.value))}
                  className="w-full accent-sky-500 cursor-pointer h-2 rounded-lg"
                />
              </div>

              <button
                onClick={() => setSelectedDay((d) => Math.min(missionData.length, d + 1))}
                className={`p-2 rounded-xl ${neuBtn}`}
                aria-label="Next Day"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Key Clinical Event Preset Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider opacity-60 mr-1">
                Key Events:
              </span>
              {SCENARIO_PRESETS.map((preset) => {
                const isActive = selectedDay === preset.day;
                const dotColor =
                  preset.badge === 'Red'
                    ? 'bg-red-500'
                    : preset.badge === 'Yellow'
                    ? 'bg-amber-500'
                    : 'bg-emerald-500';
                return (
                  <button
                    key={preset.day}
                    onClick={() => {
                      setSelectedDay(preset.day);
                      setSelectedOrgan(preset.organ);
                    }}
                    title={preset.desc}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? `${neuInset} text-sky-500 ring-1 ring-sky-500/40`
                        : `${neuBtn} opacity-85 hover:opacity-100`
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${dotColor}`} />
                    <span>{preset.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* ====================================================================
          MAIN 3-COLUMN NEUMORPHIC DASHBOARD GRID
      ==================================================================== */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 mt-2">
        {/* ------------------------------------------------------------------
            LEFT COLUMN (4 COLS): INTERACTIVE HUMAN BODY DIAGNOSTIC HUB
        ------------------------------------------------------------------ */}
        <section className={`lg:col-span-4 rounded-3xl p-5 flex flex-col justify-between ${neuCard}`}>
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-base sm:text-lg font-extrabold tracking-tight">
                  Interactive Biometric Body Hub
                </h2>
                <p className="text-xs opacity-70">
                  Click any organ system to inspect 30-day baseline deviations
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-xl text-xs font-bold ${neuInset}`}>
                Day {selectedDay}
              </span>
            </div>

            {/* Organ System Pill Selector Tabs */}
            <div className="grid grid-cols-5 gap-1.5 my-3">
              {Object.values(BODY_SYSTEMS).map((sys) => {
                const Icon = sys.icon;
                const st = organStatuses[sys.id];
                const active = selectedOrgan === sys.id;
                const badgeColor =
                  st === 'Red'
                    ? 'text-red-500'
                    : st === 'Yellow'
                    ? 'text-amber-500'
                    : 'text-emerald-500';
                return (
                  <button
                    key={sys.id}
                    onClick={() => setSelectedOrgan(sys.id)}
                    className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl text-[11px] font-bold transition-all ${
                      active ? `${neuInset} text-sky-500` : `${neuBtn}`
                    }`}
                  >
                    <Icon className={`w-4 h-4 mb-1 ${badgeColor}`} />
                    <span className="truncate max-w-full">{sys.shortName.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Interactive SVG Astronaut Anatomical Figure */}
            <div className={`rounded-3xl p-3 my-2 ${neuInset}`}>
              <InteractiveAstronautBody
                selectedOrgan={selectedOrgan}
                onSelectOrgan={setSelectedOrgan}
                organStatuses={organStatuses}
                dayData={currentDayData}
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Quick Day Vitals Strip Below Body */}
          <div className="grid grid-cols-3 gap-2.5 mt-3">
            <div className={`p-3 rounded-2xl ${neuCardSm}`}>
              <div className="flex items-center justify-between text-xs opacity-70">
                <span>Cabin CO2</span>
                <AlertTriangle
                  className={`w-3.5 h-3.5 ${
                    currentDayData.cabin_co2_mmHg >= 3.5 ? 'text-amber-500' : 'text-emerald-500'
                  }`}
                />
              </div>
              <p className="text-base font-extrabold mt-1">
                {currentDayData.cabin_co2_mmHg} <span className="text-xs font-normal">mmHg</span>
              </p>
              <p className="text-[10px] opacity-60">Limit &lt; 2.5 mmHg</p>
            </div>

            <div className={`p-3 rounded-2xl ${neuCardSm}`}>
              <div className="flex items-center justify-between text-xs opacity-70">
                <span>Exercise</span>
                <Dumbbell
                  className={`w-3.5 h-3.5 ${
                    currentDayData.exercise_minutes < 65 ? 'text-amber-500' : 'text-emerald-500'
                  }`}
                />
              </div>
              <p className="text-base font-extrabold mt-1">
                {currentDayData.exercise_minutes} <span className="text-xs font-normal">min</span>
              </p>
              <p className="text-[10px] opacity-60">Target 140 min/d</p>
            </div>

            <div className={`p-3 rounded-2xl ${neuCardSm}`}>
              <div className="flex items-center justify-between text-xs opacity-70">
                <span>SpO2 & Temp</span>
                <Thermometer
                  className={`w-3.5 h-3.5 ${
                    currentDayData.skin_temp_c >= 37.3 ? 'text-amber-500' : 'text-emerald-500'
                  }`}
                />
              </div>
              <p className="text-base font-extrabold mt-1">
                {currentDayData.spo2_percent}%{' '}
                <span className="text-xs font-semibold opacity-75">
                  | {currentDayData.skin_temp_c}°C
                </span>
              </p>
              <p className="text-[10px] opacity-60">Wearable Live</p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------
            CENTER-RIGHT COLUMN (8 COLS): DYNAMIC TREND CHARTS + DR. AXO MASCOT
        ------------------------------------------------------------------ */}
        <section className="lg:col-span-8 flex flex-col gap-6">
          {/* ================================================================
              PANEL A: DYNAMIC 30-DAY TREND CHART WITH BASELINE DEVIATIONS
          ================================================================ */}
          <div className={`rounded-3xl p-5 ${neuCard}`}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${neuInset} text-sky-500`}
                >
                  <ActiveOrganIcon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base sm:text-lg font-extrabold">
                      {activeOrganConfig.name} — 30-Day Telemetry & Baseline Deviation
                    </h2>
                    {renderStatusPill(
                      organStatuses[selectedOrgan],
                      `${organStatuses[selectedOrgan]} Status`
                    )}
                  </div>
                  <p className="text-xs opacity-75 mt-0.5">{activeOrganConfig.description}</p>
                </div>
              </div>

              {/* Sub-tab switch when Heart is selected */}
              {selectedOrgan === 'heart' && (
                <div className={`flex items-center p-1 rounded-2xl shrink-0 ${neuInset}`}>
                  <button
                    onClick={() => setHeartChartSubTab('hr_bp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      heartChartSubTab === 'hr_bp'
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    HR + Blood Pressure
                  </button>
                  <button
                    onClick={() => setHeartChartSubTab('hrv_spo2')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      heartChartSubTab === 'hrv_spo2'
                        ? 'bg-sky-500 text-white shadow-sm'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                  >
                    HRV + SpO2
                  </button>
                </div>
              )}
            </div>

            {/* Selected Day Snapshot Cards for the Active Organ */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              {selectedOrgan === 'heart' && (
                <>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Resting Heart Rate</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-rose-500">
                        {currentDayData.resting_hr_bpm} bpm
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">
                        Base: {ASTRONAUT_PROFILE.baseline_metrics.resting_hr_bpm}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Blood Pressure (POC)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-sky-500">
                        {currentDayData.bp_systolic
                          ? `${currentDayData.bp_systolic}/${currentDayData.bp_diastolic}`
                          : 'Not Scheduled'}
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Base: 116/74</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">HRV (Autonomic)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-purple-500">
                        {currentDayData.hrv_ms} ms
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">
                        Base: {ASTRONAUT_PROFILE.baseline_metrics.hrv_ms} ms
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">SpO2 Oxygenation</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-emerald-500">
                        {currentDayData.spo2_percent}%
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Nominal ≥97%</span>
                    </div>
                  </div>
                </>
              )}

              {selectedOrgan === 'brain' && (
                <>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">NASA Cognition PVT</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-amber-500">
                        {currentDayData.cognition_reaction_ms} ms
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Base: 245 ms</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Sleep Duration</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-indigo-500">
                        {currentDayData.sleep_duration_hrs} hrs
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Target: 7.5h+</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Cabin CO2 Partial P.</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-rose-500">
                        {currentDayData.cabin_co2_mmHg} mmHg
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Nominal &lt;2.5</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Crew Mood Score</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-emerald-500">
                        {currentDayData.mood_score} / 10
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Self-Report</span>
                    </div>
                  </div>
                </>
              )}

              {selectedOrgan === 'blood' && (
                <>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Hemoglobin (POC)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-rose-500">
                        {currentDayData.blood_hemoglobin_g_dL
                          ? `${currentDayData.blood_hemoglobin_g_dL} g/dL`
                          : 'Weekly Lab'}
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Base: 14.2</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Blood Glucose (POC)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-amber-500">
                        {currentDayData.blood_glucose_mg_dL
                          ? `${currentDayData.blood_glucose_mg_dL} mg/dL`
                          : 'Weekly Lab'}
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Base: 88</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Daily BFO Dose</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-purple-500">
                        {currentDayData.daily_dose_bfo_mSv} mSv
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">
                        Peak: {currentDayData.peak_dose_rate_mSv_hr} mSv/h
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Career BFO Total</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-sky-500">
                        {currentDayData.cumulative_career_bfo_mSv} mSv
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Limit: 600</span>
                    </div>
                  </div>
                </>
              )}

              {selectedOrgan === 'kidneys' && (
                <>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Urinary Calcium (POC)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-amber-500">
                        {currentDayData.urine_calcium_mg_dL
                          ? `${currentDayData.urine_calcium_mg_dL} mg/dL`
                          : 'Periodic Strip'}
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Nominal &lt;18</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Urine Spec. Gravity</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-sky-500">
                        {currentDayData.urine_specific_gravity || 'Periodic Strip'}
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">&lt;1.020</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Daily Hydration</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-emerald-500">
                        {currentDayData.water_intake_liters} L
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Target: 2.5L</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">ARED + Treadmill</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-indigo-500">
                        {currentDayData.exercise_minutes} min
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Target: 140m</span>
                    </div>
                  </div>
                </>
              )}

              {selectedOrgan === 'skin' && (
                <>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">EVARM Skin Dose</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-amber-500">
                        {currentDayData.daily_dose_skin_mSv} mSv
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">MOSFET Badge</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Skin Temperature</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-rose-500">
                        {currentDayData.skin_temp_c} °C
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">Base: 36.6°C</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">WBC Count (POC)</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-lg font-extrabold text-purple-500">
                        {currentDayData.blood_wbc_k_uL
                          ? `${currentDayData.blood_wbc_k_uL} k/uL`
                          : 'Periodic Lab'}
                      </span>
                      <span className="text-[11px] font-semibold opacity-75">4.5–8.0 k/uL</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-2xl ${neuInset}`}>
                    <span className="text-[11px] font-bold opacity-65">Dermal Barrier</span>
                    <div className="flex items-baseline justify-between mt-1">
                      <span className="text-sm font-extrabold text-sky-500 truncate">
                        {currentDayData.dermal_status.replace(/_/g, ' ')}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Interactive Recharts Time-Series Container */}
            <div className={`rounded-2xl p-3 sm:p-4 h-[290px] ${neuInset}`}>
              <ResponsiveContainer width="100%" height="100%">
                {selectedOrgan === 'heart' && heartChartSubTab === 'hr_bp' ? (
                  <ComposedChart
                    data={missionData}
                    onClick={(e) => {
                      if (e && e.activeLabel) setSelectedDay(Number(e.activeLabel));
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke={darkMode ? '#334155' : '#CBD5E1'}
                      opacity={0.6}
                    />
                    <XAxis
                      dataKey="mission_day"
                      tick={{ fontSize: 11, fill: darkMode ? '#94A3B8' : '#475569' }}
                      label={{
                        value: 'Mission Day (Click chart to jump day)',
                        position: 'insideBottom',
                        offset: -2,
                        fontSize: 10,
                        fill: darkMode ? '#94A3B8' : '#475569'
                      }}
                    />
                    <YAxis
                      domain={[50, 148]}
                      tick={{ fontSize: 11, fill: darkMode ? '#94A3B8' : '#475569' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1E222B' : '#E6E9EF',
                        borderRadius: '14px',
                        border: '1px solid rgba(148,163,184,0.3)',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />

                    {/* Selected Day Vertical Indicator */}
                    <ReferenceLine
                      x={selectedDay}
                      stroke="#0EA5E9"
                      strokeWidth={2}
                      label={{ value: `Day ${selectedDay}`, fill: '#0EA5E9', fontSize: 10 }}
                    />

                    {/* Baseline Reference Lines */}
                    <ReferenceLine
                      y={ASTRONAUT_PROFILE.baseline_metrics.resting_hr_bpm}
                      stroke="#F43F5E"
                      strokeDasharray="5 5"
                      label={{
                        value: 'HR Baseline (60 bpm)',
                        position: 'insideBottomRight',
                        fill: '#F43F5E',
                        fontSize: 10
                      }}
                    />
                    <ReferenceLine
                      y={ASTRONAUT_PROFILE.baseline_metrics.bp_systolic}
                      stroke="#0284C7"
                      strokeDasharray="4 4"
                      label={{
                        value: 'Sys BP Base (116)',
                        position: 'insideTopRight',
                        fill: '#0284C7',
                        fontSize: 10
                      }}
                    />

                    <Area
                      type="monotone"
                      dataKey="resting_hr_bpm"
                      name="Resting Heart Rate (bpm)"
                      stroke="#F43F5E"
                      fill="#F43F5E"
                      fillOpacity={0.14}
                      strokeWidth={2.5}
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        if (payload.resting_hr_bpm >= 74) {
                          return (
                            <circle
                              key={`hr-dev-${payload.mission_day}`}
                              cx={cx}
                              cy={cy}
                              r={5}
                              fill={payload.resting_hr_bpm >= 82 ? '#EF4444' : '#F59E0B'}
                              stroke="#fff"
                              strokeWidth={1.5}
                            />
                          );
                        }
                        return <circle key={`hr-${payload.mission_day}`} cx={cx} cy={cy} r={2} fill="#F43F5E" />;
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bp_systolic"
                      name="Systolic BP (mmHg - POC Cuff)"
                      stroke="#0284C7"
                      strokeWidth={2.5}
                      strokeDasharray="5 3"
                      connectNulls={true}
                      dot={{ r: 5, fill: '#0284C7', stroke: '#fff', strokeWidth: 1.5 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="bp_diastolic"
                      name="Diastolic BP (mmHg - POC Cuff)"
                      stroke="#10B981"
                      strokeWidth={2}
                      strokeDasharray="4 3"
                      connectNulls={true}
                      dot={{ r: 4, fill: '#10B981', stroke: '#fff', strokeWidth: 1.5 }}
                    />
                  </ComposedChart>
                ) : selectedOrgan === 'heart' && heartChartSubTab === 'hrv_spo2' ? (
                  <ComposedChart
                    data={missionData}
                    onClick={(e) => {
                      if (e && e.activeLabel) setSelectedDay(Number(e.activeLabel));
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#CBD5E1'} opacity={0.6} />
                    <XAxis dataKey="mission_day" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" domain={[25, 80]} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[94, 100]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1E222B' : '#E6E9EF',
                        borderRadius: '14px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <ReferenceLine x={selectedDay} yAxisId="left" stroke="#0EA5E9" strokeWidth={2} />
                    <ReferenceLine
                      y={68}
                      yAxisId="left"
                      stroke="#8B5CF6"
                      strokeDasharray="5 5"
                      label={{ value: 'HRV Baseline (68 ms)', fill: '#8B5CF6', fontSize: 10 }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="hrv_ms"
                      name="HRV Autonomic Recovery (ms)"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.16}
                      strokeWidth={2.5}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="spo2_percent"
                      name="SpO2 Oxygenation (%)"
                      stroke="#10B981"
                      strokeWidth={2.5}
                    />
                  </ComposedChart>
                ) : selectedOrgan === 'brain' ? (
                  <ComposedChart
                    data={missionData}
                    onClick={(e) => {
                      if (e && e.activeLabel) setSelectedDay(Number(e.activeLabel));
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#CBD5E1'} opacity={0.6} />
                    <XAxis dataKey="mission_day" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" domain={[220, 360]} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[1, 10]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1E222B' : '#E6E9EF',
                        borderRadius: '14px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <ReferenceLine x={selectedDay} yAxisId="left" stroke="#0EA5E9" strokeWidth={2} />
                    <ReferenceLine
                      yAxisId="left"
                      y={ASTRONAUT_PROFILE.baseline_metrics.cognition_reaction_ms}
                      stroke="#F59E0B"
                      strokeDasharray="5 5"
                      label={{ value: 'PVT Base (245 ms)', fill: '#F59E0B', fontSize: 10 }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="cognition_reaction_ms"
                      name="NASA Cognition Reaction Time (ms)"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.18}
                      strokeWidth={2.5}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="sleep_duration_hrs"
                      name="Sleep Duration (hrs)"
                      stroke="#6366F1"
                      strokeWidth={2.5}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="cabin_co2_mmHg"
                      name="Cabin CO2 (mmHg)"
                      stroke="#EF4444"
                      strokeWidth={2}
                      strokeDasharray="4 2"
                    />
                  </ComposedChart>
                ) : selectedOrgan === 'blood' ? (
                  <ComposedChart
                    data={missionData}
                    onClick={(e) => {
                      if (e && e.activeLabel) setSelectedDay(Number(e.activeLabel));
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#CBD5E1'} opacity={0.6} />
                    <XAxis dataKey="mission_day" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" domain={[10.5, 16]} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 125]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1E222B' : '#E6E9EF',
                        borderRadius: '14px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <ReferenceLine x={selectedDay} yAxisId="left" stroke="#0EA5E9" strokeWidth={2} />
                    <ReferenceLine
                      yAxisId="left"
                      y={ASTRONAUT_PROFILE.baseline_metrics.blood_hemoglobin_g_dL}
                      stroke="#EF4444"
                      strokeDasharray="5 5"
                      label={{ value: 'Hemoglobin Base (14.2 g/dL)', fill: '#EF4444', fontSize: 10 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="blood_hemoglobin_g_dL"
                      name="Hemoglobin (g/dL - OSD-569 Space Anemia)"
                      stroke="#EF4444"
                      strokeWidth={3}
                      connectNulls={true}
                      dot={{ r: 5, fill: '#EF4444', stroke: '#fff', strokeWidth: 1.5 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="blood_glucose_mg_dL"
                      name="Blood Glucose (mg/dL - POC)"
                      stroke="#F59E0B"
                      strokeWidth={2}
                      strokeDasharray="4 3"
                      connectNulls={true}
                      dot={{ r: 4, fill: '#F59E0B' }}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="daily_dose_bfo_mSv"
                      name="Daily BFO Radiation Dose (mSv)"
                      stroke="#8B5CF6"
                      fill="#8B5CF6"
                      fillOpacity={0.22}
                      strokeWidth={2}
                    />
                  </ComposedChart>
                ) : selectedOrgan === 'kidneys' ? (
                  <ComposedChart
                    data={missionData}
                    onClick={(e) => {
                      if (e && e.activeLabel) setSelectedDay(Number(e.activeLabel));
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#CBD5E1'} opacity={0.6} />
                    <XAxis dataKey="mission_day" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" domain={[0, 30]} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 170]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1E222B' : '#E6E9EF',
                        borderRadius: '14px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <ReferenceLine x={selectedDay} yAxisId="left" stroke="#0EA5E9" strokeWidth={2} />
                    <ReferenceLine
                      yAxisId="left"
                      y={18}
                      stroke="#F59E0B"
                      strokeDasharray="5 5"
                      label={{ value: 'Hypercalciuria Stone Threshold (18 mg/dL)', fill: '#F59E0B', fontSize: 10 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="urine_calcium_mg_dL"
                      name="Urinary Calcium (mg/dL - Stone Risk)"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      connectNulls={true}
                      dot={{ r: 5, fill: '#F59E0B', stroke: '#fff', strokeWidth: 1.5 }}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="water_intake_liters"
                      name="Water Intake (Liters)"
                      stroke="#0EA5E9"
                      strokeWidth={2.5}
                    />
                    <Area
                      yAxisId="right"
                      type="monotone"
                      dataKey="exercise_minutes"
                      name="ARED + Treadmill Exercise (mins)"
                      stroke="#10B981"
                      fill="#10B981"
                      fillOpacity={0.14}
                      strokeWidth={2}
                    />
                  </ComposedChart>
                ) : (
                  // Skin & Immune Chart
                  <ComposedChart
                    data={missionData}
                    onClick={(e) => {
                      if (e && e.activeLabel) setSelectedDay(Number(e.activeLabel));
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#334155' : '#CBD5E1'} opacity={0.6} />
                    <XAxis dataKey="mission_day" tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="left" domain={[0, 25]} tick={{ fontSize: 11 }} />
                    <YAxis yAxisId="right" orientation="right" domain={[36.0, 38.5]} tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: darkMode ? '#1E222B' : '#E6E9EF',
                        borderRadius: '14px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '11px' }} />
                    <ReferenceLine x={selectedDay} yAxisId="left" stroke="#0EA5E9" strokeWidth={2} />
                    <ReferenceLine
                      yAxisId="right"
                      y={36.6}
                      stroke="#F43F5E"
                      strokeDasharray="5 5"
                      label={{ value: 'Skin Temp Base (36.6°C)', fill: '#F43F5E', fontSize: 10 }}
                    />
                    <Area
                      yAxisId="left"
                      type="monotone"
                      dataKey="daily_dose_skin_mSv"
                      name="CSA EVARM/MOSFET Skin Dose (mSv)"
                      stroke="#F59E0B"
                      fill="#F59E0B"
                      fillOpacity={0.2}
                      strokeWidth={2.5}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="blood_wbc_k_uL"
                      name="WBC Immune Count (k/uL - OSD-570)"
                      stroke="#8B5CF6"
                      strokeWidth={2.5}
                      connectNulls={true}
                      dot={{ r: 5, fill: '#8B5CF6', stroke: '#fff', strokeWidth: 1.5 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="skin_temp_c"
                      name="Skin Temperature (°C)"
                      stroke="#F43F5E"
                      strokeWidth={2.5}
                    />
                  </ComposedChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* ================================================================
              PANEL B: CHIBI ASTRO-AXOLOTL ("DR. AXO") CLINICAL GUIDANCE & NASA LINKS
          ================================================================ */}
          <div className={`rounded-3xl p-5 ${neuCard}`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
              {/* Mascot Avatar Box */}
              <div className={`rounded-3xl p-3 flex flex-col items-center shrink-0 ${neuInset}`}>
                <ChibiAstroAxolotl
                  status={currentDayData.alert_status}
                  activity={currentDayData.activity_status}
                  darkMode={darkMode}
                />
                <span className="text-xs font-extrabold tracking-wide text-pink-500 mt-1">
                  Dr. Axo • Your Friendly Companion
                </span>
                <span className="text-[10px] font-semibold opacity-65">
                  On-Board Autonomous Triage
                </span>
              </div>

              {/* Clinical Narrative & Evidence-Based Treatment Steps */}
              <div className="flex-1 w-full">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-pink-500" />
                    <h3 className="text-base sm:text-lg font-extrabold">
                      {drAxoBriefing.headline}
                    </h3>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-xl bg-pink-500/15 text-pink-600 dark:text-pink-400">
                    🛰️ Fully Local • No Earth Link Required
                  </span>
                </div>

                {/* Why Exam Is Needed Box */}
                <div className={`p-3.5 rounded-2xl mb-3 text-xs sm:text-sm ${neuInset}`}>
                  <p className="font-bold text-sky-600 dark:text-sky-400 mb-1 flex items-center gap-1.5">
                    <Info className="w-4 h-4 shrink-0" />
                    Why This Assessment & Indicator Matter in Space:
                  </p>
                  <p className="opacity-85 leading-relaxed">{drAxoBriefing.whyExam}</p>
                </div>

                {/* Preventive & Corrective Treatment Steps */}
                <div className="space-y-2 mb-4">
                  <p className="text-xs font-extrabold uppercase tracking-wider opacity-70">
                    Recommended Countermeasures & Treatment Protocol:
                  </p>
                  {drAxoBriefing.protocolSteps.map((step, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-2xl flex items-start gap-2.5 text-xs sm:text-sm ${neuCardSm}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="font-medium leading-snug">{step}</span>
                    </div>
                  ))}
                </div>

                {/* Clickable NASA HRP, CSA & OSDR Investigation Citations */}
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider opacity-65 mb-2">
                    Backed by NASA HRP, CSA & OSDR (Inspiration4) Investigations:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {drAxoBriefing.references.map((ref) => (
                      <a
                        key={ref.id}
                        href={ref.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-sky-600 dark:text-sky-400 transition-all ${neuBtn}`}
                        title={ref.topic}
                      >
                        <span>{ref.title}</span>
                        <ExternalLink className="w-3 h-3 shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ====================================================================
          PRIVATE CREW DIARY (FOLDABLE, LOCAL-ONLY)
      ==================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-6">
        <div className={`rounded-3xl ${neuCard}`}>
          <button
            type="button"
            onClick={() => setDiaryPanelOpen((o) => !o)}
            className="w-full flex items-center justify-between gap-3 p-5 text-left"
            aria-expanded={diaryPanelOpen}
          >
            <div>
              <h3 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                <BookHeart className="w-4 h-4 text-pink-500" />
                Private Crew Diary
                <span className="text-xs font-bold px-2 py-0.5 rounded-lg bg-pink-500/15 text-pink-600 dark:text-pink-400">
                  {diaryEntries.length} notes
                </span>
              </h3>
              <p className="text-xs opacity-70 flex items-center gap-1 mt-0.5">
                <Lock className="w-3 h-3" />
                Stored on board only. Never included in the health data export.
              </p>
            </div>
            <ChevronDown
              className={`w-5 h-5 shrink-0 transition-transform ${diaryPanelOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {diaryPanelOpen && (
            <div className="px-5 pb-5">
              <div className="max-h-[420px] overflow-y-auto space-y-2.5 pr-1">
                {[...diaryEntries]
                  .sort((a, b) => b.mission_day - a.mission_day)
                  .map((entry) => {
                    const isSelected = entry.mission_day === selectedDay;
                    return (
                      <button
                        type="button"
                        key={entry.mission_day}
                        onClick={() => setSelectedDay(entry.mission_day)}
                        title={`Jump to Day ${entry.mission_day}`}
                        className={`w-full text-left p-3 rounded-2xl flex items-start gap-3 transition-all ${
                          isSelected ? `${neuInset} ring-2 ring-pink-400/60` : neuBtn
                        }`}
                      >
                        <span className="text-[11px] font-extrabold px-2 py-1 rounded-lg bg-pink-500/15 text-pink-600 dark:text-pink-400 shrink-0">
                          Day {entry.mission_day}
                        </span>
                        <span className="text-xs sm:text-sm leading-relaxed opacity-90 italic">
                          “{entry.note}”
                        </span>
                      </button>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ====================================================================
          PILLS & COUNTERMEASURE CALENDAR (FOLDABLE, 2-MONTH SLIDER + ALERTS)
      ==================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-6">
        <div className={`rounded-3xl ${neuCard}`}>
          {(() => {
            const activeDayPills = pillSchedule[selectedPillDay] || [];
            const urgentPills = activeDayPills.filter((p) => p.category !== 'baseline');
            const pendingCount = activeDayPills.filter((p) => !p.taken).length;
            const monthStart = pillCalendarMonth === 1 ? 1 : 31;
            const monthEnd = pillCalendarMonth === 1 ? 30 : 60;

            return (
              <>
                <button
                  type="button"
                  onClick={() => setPillsPanelOpen((o) => !o)}
                  className="w-full flex flex-wrap items-center justify-between gap-3 p-5 text-left"
                  aria-expanded={pillsPanelOpen}
                >
                  <div>
                    <h3 className="text-sm sm:text-base font-extrabold flex flex-wrap items-center gap-2">
                      <Pill className="w-4 h-4 text-emerald-500" />
                      <span>Pills &amp; Countermeasure Calendar</span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                        Day {selectedPillDay}: {activeDayPills.length} {activeDayPills.length === 1 ? 'pill' : 'pills'}
                      </span>
                      {urgentPills.length > 0 && (
                        <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <Bell className="w-3 h-3" />
                          {urgentPills.map((p) => p.name).join(' + ')}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs opacity-70 mt-0.5">
                      2-month interactive schedule (Days 1–30 &amp; Days 31–60) • Matches onboard medical protocols + custom crew pills
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 transition-transform ${pillsPanelOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {pillsPanelOpen && (
                  <div className="px-5 pb-5 space-y-4">
                    {/* EXPLICIT PILL ALERT BANNER: SAYS EXACTLY WHAT PILLS TO DRINK/TAKE */}
                    <div
                      className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        urgentPills.some((p) => p.category === 'emergency')
                          ? 'bg-rose-500/15 border-rose-500/40 text-rose-700 dark:text-rose-300'
                          : urgentPills.length > 0
                          ? 'bg-amber-500/15 border-amber-500/40 text-amber-800 dark:text-amber-300'
                          : 'bg-sky-500/10 border-sky-500/30 text-sky-800 dark:text-sky-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-xl bg-white/50 dark:bg-slate-900/50 shrink-0 mt-0.5">
                          <Bell className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-xs font-extrabold uppercase tracking-wider">
                              {urgentPills.length > 0
                                ? `Active Pill Alert — Mission Day ${selectedPillDay}`
                                : `Daily Supplement Reminder — Mission Day ${selectedPillDay}`}
                            </span>
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/60 dark:bg-slate-900/60">
                              {pendingCount === 0
                                ? '✓ All doses marked taken'
                                : `${pendingCount} ${pendingCount === 1 ? 'dose' : 'doses'} to drink`}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-bold mt-1 leading-relaxed">
                            {activeDayPills.length > 0 ? (
                              <>
                                Drink today:{' '}
                                {activeDayPills
                                  .map((p) => `${p.name} (${p.dose} — ${p.timing})`)
                                  .join('  •  ')}
                              </>
                            ) : (
                              'No pills scheduled for this day.'
                            )}
                          </p>
                        </div>
                      </div>
                      {pendingCount > 0 && (
                        <button
                          type="button"
                          onClick={() => handleMarkAllDayPillsTaken(selectedPillDay)}
                          className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm shrink-0 transition-all"
                        >
                          ✓ Mark All Day {selectedPillDay} Pills Taken
                        </button>
                      )}
                    </div>

                    {/* 3-COLUMN LAYOUT: (1) MONTH SLIDER CALENDAR, (2) DAY PILL CHECKLIST, (3) ADD CUSTOM PILL */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Column 1: 2-Month Slidable Calendar Grid (5 cols) */}
                      <div className={`lg:col-span-5 p-4 rounded-2xl ${neuInset}`}>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div>
                            <span className="text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
                              <Calendar className="w-4 h-4 text-sky-500" />
                              {pillCalendarMonth === 1
                                ? 'Month 1 (Days 1–30 • Current)'
                                : 'Month 2 (Days 31–60 • Next Month)'}
                            </span>
                            <span className="text-[11px] opacity-65 block">
                              Slide between months or click any day to inspect/add pills
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                setPillCalendarMonth(1);
                                if (selectedPillDay > 30) setSelectedPillDay(selectedDay <= 30 ? selectedDay : 30);
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                                pillCalendarMonth === 1 ? 'bg-sky-500 text-white shadow-sm' : neuBtn
                              }`}
                            >
                              M1 (1–30)
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPillCalendarMonth(2);
                                if (selectedPillDay <= 30) setSelectedPillDay(31);
                              }}
                              className={`px-2.5 py-1.5 rounded-xl text-xs font-extrabold transition-all ${
                                pillCalendarMonth === 2 ? 'bg-sky-500 text-white shadow-sm' : neuBtn
                              }`}
                            >
                              M2 (31–60)
                            </button>
                          </div>
                        </div>

                        {/* 6x5 30-Day Grid */}
                        <div className="grid grid-cols-6 gap-1.5">
                          {Array.from({ length: 30 }, (_, i) => monthStart + i).map((day) => {
                            const dayItems = pillSchedule[day] || [];
                            const hasEmergency = dayItems.some((p) => p.category === 'emergency');
                            const hasCountermeasure = dayItems.some((p) => p.category === 'countermeasure');
                            const hasCustom = dayItems.some((p) => p.isCustom);
                            const allTaken = dayItems.length > 0 && dayItems.every((p) => p.taken);
                            const isSelected = day === selectedPillDay;

                            return (
                              <button
                                type="button"
                                key={day}
                                onClick={() => {
                                  setSelectedPillDay(day);
                                  setNewPillForm((prev) => ({ ...prev, startDay: day }));
                                  if (day <= missionData.length) {
                                    setSelectedDay(day);
                                  }
                                }}
                                title={`Day ${day}: ${dayItems.map((p) => p.name).join(', ')}`}
                                className={`relative p-2 rounded-xl text-left transition-all flex flex-col justify-between min-h-[52px] ${
                                  isSelected ? `${neuInset} ring-2 ring-sky-500` : neuBtn
                                }`}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <span className="text-[11px] font-extrabold">D{day}</span>
                                  {allTaken ? (
                                    <span className="text-[9px] font-extrabold text-emerald-500">✓</span>
                                  ) : (
                                    <span className="text-[9px] font-bold opacity-60">{dayItems.length}p</span>
                                  )}
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-sky-400" title="Daily Baseline" />
                                  {hasCountermeasure && (
                                    <span className="w-2 h-2 rounded-full bg-amber-500" title="Medical Countermeasure" />
                                  )}
                                  {hasEmergency && (
                                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" title="Emergency Pack" />
                                  )}
                                  {hasCustom && (
                                    <span className="w-2 h-2 rounded-full bg-violet-500" title="Custom Crew Pill" />
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>

                        {/* Legend + Prev/Next Month Slider Controls */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2.5 border-t border-slate-400/20 text-[10px] font-bold">
                          <div className="flex flex-wrap items-center gap-2.5 opacity-80">
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-sky-400" /> Daily Vit D3
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-amber-500" /> Protocol Pack
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-rose-500" /> SPE Emergency
                            </span>
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 rounded-full bg-violet-500" /> Custom Pill
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              disabled={pillCalendarMonth === 1}
                              onClick={() => {
                                setPillCalendarMonth(1);
                                setSelectedPillDay(12);
                              }}
                              className={`p-1 rounded-lg ${pillCalendarMonth === 1 ? 'opacity-30' : neuBtn}`}
                              title="Previous Month (Days 1-30)"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>
                            <span className="px-1">Month {pillCalendarMonth}/2</span>
                            <button
                              type="button"
                              disabled={pillCalendarMonth === 2}
                              onClick={() => {
                                setPillCalendarMonth(2);
                                setSelectedPillDay(31);
                              }}
                              className={`p-1 rounded-lg ${pillCalendarMonth === 2 ? 'opacity-30' : neuBtn}`}
                              title="Next Month (Days 31-60)"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Selected Day Pill Regimen & Dose Checklist (4 cols) */}
                      <div className={`lg:col-span-4 p-4 rounded-2xl flex flex-col justify-between ${neuInset}`}>
                        <div>
                          <div className="flex items-center justify-between gap-2 mb-3">
                            <div>
                              <span className="text-xs font-extrabold uppercase tracking-wider text-sky-500">
                                Mission Day {selectedPillDay} Regimen
                              </span>
                              <p className="text-[11px] opacity-70">
                                {selectedPillDay <= missionData.length
                                  ? 'Synced with logged mission telemetry'
                                  : 'Planned schedule for upcoming month'}
                              </p>
                            </div>
                            <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-600 dark:text-sky-400">
                              {activeDayPills.filter((p) => p.taken).length} / {activeDayPills.length} Taken
                            </span>
                          </div>

                          <div className="space-y-2.5 max-h-[310px] overflow-y-auto pr-1">
                            {activeDayPills.map((item) => (
                              <div
                                key={item.uid}
                                className={`p-3 rounded-2xl transition-all ${neuCardSm} ${
                                  item.category === 'emergency'
                                    ? 'border-l-4 border-l-rose-500'
                                    : item.category === 'countermeasure'
                                    ? 'border-l-4 border-l-amber-500'
                                    : item.isCustom
                                    ? 'border-l-4 border-l-violet-500'
                                    : 'border-l-4 border-l-sky-400'
                                }`}
                              >
                                <div className="flex items-start justify-between gap-2">
                                  <button
                                    type="button"
                                    onClick={() => handleTogglePillTaken(selectedPillDay, item.uid)}
                                    className="flex items-start gap-2.5 text-left flex-1"
                                  >
                                    <span
                                      className={`w-5 h-5 rounded-lg flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 transition-all ${
                                        item.taken
                                          ? 'bg-emerald-500 text-white'
                                          : 'border-2 border-slate-400/50 text-transparent'
                                      }`}
                                    >
                                      ✓
                                    </span>
                                    <div>
                                      <p className={`text-xs font-extrabold ${item.taken ? 'line-through opacity-75' : ''}`}>
                                        {item.name}
                                      </p>
                                      <p className="text-[11px] font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                                        {item.dose} • {item.timing}
                                      </p>
                                      <p className="text-[10px] opacity-70 mt-0.5 leading-snug">{item.reason}</p>
                                    </div>
                                  </button>
                                  {item.isCustom && (
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteCustomPill(selectedPillDay, item.uid)}
                                      title="Remove custom pill"
                                      className="p-1 rounded-lg opacity-60 hover:opacity-100 text-rose-500"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Quick Jump to Key Protocol Days */}
                        <div className="mt-3 pt-2.5 border-t border-slate-400/20">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider opacity-65 block mb-1.5">
                            Jump to Triggered Protocol Days:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              { day: 12, label: 'D12–13 Potassium Citrate' },
                              { day: 19, label: 'D19 EVA Antioxidant' },
                              { day: 20, label: 'D20–22 Antiviral' },
                              { day: 21, label: 'D21 SPE Pack' },
                              { day: 28, label: 'D28–34 Folate/Iron' }
                            ].map((q) => (
                              <button
                                key={q.day}
                                type="button"
                                onClick={() => {
                                  setPillCalendarMonth(q.day > 30 ? 2 : 1);
                                  setSelectedPillDay(q.day);
                                  if (q.day <= missionData.length) setSelectedDay(q.day);
                                }}
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                                  selectedPillDay === q.day ? 'bg-sky-500 text-white' : neuBtn
                                }`}
                              >
                                {q.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Add Custom Pill to Month 1 or Month 2 (3 cols) */}
                      <div className={`lg:col-span-3 p-4 rounded-2xl ${neuInset}`}>
                        <span className="text-xs font-extrabold uppercase tracking-wider text-violet-500 block mb-1">
                          + Add Pill You Need
                        </span>
                        <p className="text-[11px] opacity-70 mb-2.5">
                          Schedule an extra medication or supplement for any day in Month 1 or Month 2
                        </p>

                        {/* Quick 1-Click Presets */}
                        <div className="mb-3">
                          <span className="text-[10px] font-bold opacity-65 block mb-1">Quick Presets:</span>
                          <div className="flex flex-wrap gap-1">
                            {QUICK_CUSTOM_PILL_PRESETS.map((preset) => (
                              <button
                                key={preset.name}
                                type="button"
                                onClick={() =>
                                  setNewPillForm((prev) => ({
                                    ...prev,
                                    name: preset.name,
                                    dose: preset.dose,
                                    timing: preset.timing,
                                    reason: preset.reason
                                  }))
                                }
                                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${neuBtn}`}
                              >
                                + {preset.name}
                              </button>
                            ))}
                          </div>
                        </div>

                        <form onSubmit={handleAddCustomPillToCalendar} className="space-y-2.5">
                          <div>
                            <label className="text-[10px] font-bold opacity-75 block mb-0.5">Pill / Medication Name *</label>
                            <input
                              type="text"
                              value={newPillForm.name}
                              onChange={(e) => setNewPillForm({ ...newPillForm, name: e.target.value })}
                              placeholder="e.g., Melatonin, Ibuprofen..."
                              className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-bold bg-transparent focus:outline-none ${neuCardSm}`}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold opacity-75 block mb-0.5">Dose</label>
                              <input
                                type="text"
                                value={newPillForm.dose}
                                onChange={(e) => setNewPillForm({ ...newPillForm, dose: e.target.value })}
                                placeholder="e.g., 3 mg"
                                className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-bold bg-transparent focus:outline-none ${neuCardSm}`}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold opacity-75 block mb-0.5">Start Day (1–60)</label>
                              <input
                                type="number"
                                min={1}
                                max={60}
                                value={newPillForm.startDay}
                                onChange={(e) => setNewPillForm({ ...newPillForm, startDay: Number(e.target.value) })}
                                className={`w-full px-2.5 py-1.5 rounded-xl text-xs font-extrabold bg-transparent focus:outline-none text-sky-500 ${neuCardSm}`}
                              />
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[10px] font-bold opacity-75 block mb-0.5">How to Drink</label>
                              <input
                                type="text"
                                value={newPillForm.timing}
                                onChange={(e) => setNewPillForm({ ...newPillForm, timing: e.target.value })}
                                className={`w-full px-2.5 py-1.5 rounded-xl text-xs bg-transparent focus:outline-none ${neuCardSm}`}
                              />
                            </div>
                            <div>
                              <label className="text-[10px] font-bold opacity-75 block mb-0.5">Duration (Days)</label>
                              <select
                                value={newPillForm.durationDays}
                                onChange={(e) => setNewPillForm({ ...newPillForm, durationDays: Number(e.target.value) })}
                                className={`w-full px-2 py-1.5 rounded-xl text-xs font-bold bg-transparent focus:outline-none ${neuCardSm}`}
                              >
                                <option value={1}>1 Day (Day {newPillForm.startDay})</option>
                                <option value={3}>3 Days</option>
                                <option value={5}>5 Days</option>
                                <option value={7}>7 Days</option>
                                <option value={14}>14 Days</option>
                                <option value={30}>30 Days (Full Month)</option>
                              </select>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="w-full py-2 rounded-xl text-xs font-extrabold bg-violet-500 hover:bg-violet-600 text-white shadow-sm transition-all"
                          >
                            + Add Pill to Day {newPillForm.startDay}
                            {newPillForm.durationDays > 1
                              ? `–${Math.min(60, Number(newPillForm.startDay) + Number(newPillForm.durationDays) - 1)}`
                              : ''}
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* ====================================================================
          SCIENTIFIC REFERENCE LIBRARY DRAWER (ALL 13 INVESTIGATIONS)
      ==================================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-6">
        <div className={`rounded-3xl p-5 ${neuCard}`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-sm sm:text-base font-extrabold flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-sky-500" />
                Integrated Space Medicine Evidence Library (NASA HRP, CSA & OSDR Inspiration4 Studies)
              </h3>
              <p className="text-xs opacity-70">
                Direct links to the spaceflight hazard, radiation dosimetry, and molecular omics studies powering this dashboard's thresholds
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.values(NASA_REFERENCES).map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 rounded-2xl flex flex-col justify-between transition-all ${neuBtn}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-sky-500/15 text-sky-600 dark:text-sky-400">
                      {item.agency}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-60" />
                  </div>
                  <p className="text-xs font-extrabold leading-snug mt-1">{item.title}</p>
                </div>
                <p className="text-[11px] opacity-70 mt-1.5 line-clamp-2">{item.topic}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          MANDATORY PROTOTYPE DISCLAIMER BADGE & FOOTER
      ==================================================================== */}
      <footer className="max-w-[1440px] mx-auto px-4 sm:px-6 mt-6">
        <div
          className={`rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 ${neuInset}`}
        >
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-extrabold uppercase tracking-wider shrink-0">
              Prototype Notice
            </span>
            <p className="text-xs sm:text-sm font-semibold opacity-90">
              Data shown uses synthetic time-series readings modeled after NASA OSDR Inspiration4 parameters. Alert thresholds are for prototype demonstration and are not clinically validated.
            </p>
          </div>
          <span className="text-xs font-bold opacity-60 shrink-0">
            NASA Space Apps Challenge • {missionData.length} Days Logged
          </span>
        </div>
      </footer>

      {/* Import Result Toast */}
      {importStatus && (
        <div
          role="status"
          className={`fixed bottom-5 right-5 z-[60] max-w-sm flex items-start gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white shadow-lg ${
            importStatus.type === 'success' ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
        >
          {importStatus.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          )}
          <span>{importStatus.text}</span>
          <button onClick={() => setImportStatus(null)} className="ml-2 opacity-80 hover:opacity-100">
            ✕
          </button>
        </div>
      )}

      {/* ====================================================================
          MODAL: "DAILY CREW CHECK-IN" INPUT SYSTEM (ADD DAY 31+)
      ==================================================================== */}
      {showCheckInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl p-6 ${neuCard} my-8`}>
            <div className="flex items-center justify-between pb-4 border-b border-slate-400/20">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${neuInset} text-sky-500`}>
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-extrabold">
                    Daily Crew Check-In — Log Mission Day {nextMissionDay}
                  </h2>
                  <p className="text-xs opacity-75">
                    Input subjective well-being, cognitive reaction speed, or Point-of-Care blood sugar/vitals
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowCheckInModal(false)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold ${neuBtn}`}
              >
                Close
              </button>
            </div>

            <form onSubmit={handleAddDailyCheckIn} className="mt-4 space-y-4">
              {/* Row 1: Interactive Mini NASA PVT Reaction Timer + Mood Slider */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Interactive PVT Reaction Speed Box */}
                <div className={`p-4 rounded-2xl ${neuInset}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-500" />
                      Cognitive Sharpness (PVT ms)
                    </label>
                    <span className="text-sm font-extrabold text-amber-500">
                      {checkInForm.cognition_reaction_ms} ms
                    </span>
                  </div>

                  {/* Mini Reaction Test Button */}
                  <div className="mb-2">
                    {pvtState === 'idle' && (
                      <button
                        type="button"
                        onClick={startPvtTest}
                        className={`w-full py-2 rounded-xl text-xs font-bold text-sky-500 ${neuBtn}`}
                      >
                        ⚡ Run 3-Second Live Reaction Test
                      </button>
                    )}
                    {pvtState === 'waiting' && (
                      <button
                        type="button"
                        onClick={handlePvtClick}
                        className="w-full py-2 rounded-xl text-xs font-bold bg-amber-500 text-white animate-pulse"
                      >
                        Wait for GREEN...
                      </button>
                    )}
                    {pvtState === 'ready' && (
                      <button
                        type="button"
                        onClick={handlePvtClick}
                        className="w-full py-2 rounded-xl text-xs font-extrabold bg-emerald-500 text-white shadow-lg"
                      >
                        CLICK NOW!
                      </button>
                    )}
                    {pvtState === 'done' && (
                      <button
                        type="button"
                        onClick={startPvtTest}
                        className={`w-full py-2 rounded-xl text-xs font-bold text-emerald-500 ${neuBtn}`}
                      >
                        ✓ Recorded {checkInForm.cognition_reaction_ms} ms (Click to Retest)
                      </button>
                    )}
                  </div>

                  <input
                    type="range"
                    min={190}
                    max={420}
                    value={checkInForm.cognition_reaction_ms}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, cognition_reaction_ms: Number(e.target.value) })
                    }
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] opacity-65 mt-1">
                    <span>Sharp (245 ms Base)</span>
                    <span>Fatigued (&gt;300 ms)</span>
                  </div>
                </div>

                {/* Subjective Mood Score (1-10) */}
                <div className={`p-4 rounded-2xl ${neuInset}`}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-extrabold">Daily Mood & Morale (1–10)</label>
                    <span className="text-sm font-extrabold text-emerald-500">
                      {checkInForm.mood_score} / 10
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={checkInForm.mood_score}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, mood_score: Number(e.target.value) })
                    }
                    className="w-full accent-emerald-500 cursor-pointer mt-3"
                  />
                  <div className="flex justify-between text-[10px] opacity-65 mt-2">
                    <span>1 (Isolated / Stressed)</span>
                    <span>10 (Optimal Cohesion)</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Point-of-Care Blood Glucose, Resting HR, Systolic/Diastolic BP */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Blood Sugar (mg/dL)
                  </label>
                  <input
                    type="number"
                    min={65}
                    max={220}
                    value={checkInForm.blood_glucose_mg_dL}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, blood_glucose_mg_dL: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-amber-500"
                  />
                  <span className="text-[10px] opacity-60">Base: 88 mg/dL</span>
                </div>

                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Resting HR (bpm)
                  </label>
                  <input
                    type="number"
                    min={45}
                    max={130}
                    value={checkInForm.resting_hr_bpm}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, resting_hr_bpm: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-rose-500"
                  />
                  <span className="text-[10px] opacity-60">Base: 60 bpm</span>
                </div>

                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Systolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    min={85}
                    max={180}
                    value={checkInForm.bp_systolic}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, bp_systolic: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-sky-500"
                  />
                  <span className="text-[10px] opacity-60">Base: 116 mmHg</span>
                </div>

                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Diastolic BP (mmHg)
                  </label>
                  <input
                    type="number"
                    min={50}
                    max={120}
                    value={checkInForm.bp_diastolic}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, bp_diastolic: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-emerald-500"
                  />
                  <span className="text-[10px] opacity-60">Base: 74 mmHg</span>
                </div>
              </div>

              {/* Row 3: Sleep, Hydration, Exercise, BFO Radiation Dose */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Sleep (Hours)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={2}
                    max={12}
                    value={checkInForm.sleep_duration_hrs}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, sleep_duration_hrs: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-indigo-500"
                  />
                </div>

                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Water Intake (L)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min={0.5}
                    max={5.0}
                    value={checkInForm.water_intake_liters}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, water_intake_liters: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-sky-500"
                  />
                </div>

                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    Exercise (Minutes)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={240}
                    value={checkInForm.exercise_minutes}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, exercise_minutes: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-emerald-500"
                  />
                </div>

                <div className={`p-3 rounded-2xl ${neuInset}`}>
                  <label className="text-[11px] font-bold opacity-75 block mb-1">
                    BFO Rad (mSv)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min={0.1}
                    max={30}
                    value={checkInForm.daily_dose_bfo_mSv}
                    onChange={(e) =>
                      setCheckInForm({ ...checkInForm, daily_dose_bfo_mSv: Number(e.target.value) })
                    }
                    className="w-full bg-transparent text-base font-extrabold focus:outline-none text-purple-500"
                  />
                </div>
              </div>

              {/* Row 4: Pills & Countermeasure Selector for Day {nextMissionDay} */}
              <div className={`rounded-2xl ${neuInset}`}>
                <button
                  type="button"
                  onClick={() => setCheckInPillsOpen((o) => !o)}
                  className="w-full flex items-center justify-between gap-2 p-3 text-left"
                  aria-expanded={checkInPillsOpen}
                >
                  <span className="text-xs font-extrabold flex items-center gap-1.5">
                    <Pill className="w-4 h-4 text-emerald-500" />
                    Pills &amp; Countermeasures — Day {nextMissionDay}
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      {checkInSelectedCatalogIds.length} selected
                    </span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${checkInPillsOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {checkInPillsOpen && (
                  <div className="px-3 pb-3 space-y-2.5">
                    {/* Live Pill Alert inside Check-In based on vitals & Month 2 schedule */}
                    <div className="p-2.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs flex items-start gap-2">
                      <Bell className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold block">
                          Recommended Pills to Drink on Day {nextMissionDay}:
                        </span>
                        <span className="opacity-90">
                          {checkInAutoRecommendedIds
                            .map((id) => `${PILL_CATALOG[id].name} (${PILL_CATALOG[id].dose})`)
                            .join(' • ')}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {Object.values(PILL_CATALOG).map((pill) => {
                        const checked = checkInSelectedCatalogIds.includes(pill.id);
                        const isRec = checkInAutoRecommendedIds.includes(pill.id);
                        return (
                          <label
                            key={pill.id}
                            className={`p-2.5 rounded-xl flex items-start gap-2.5 cursor-pointer text-xs transition-all ${
                              checked ? `${neuCardSm} ring-1 ring-emerald-500/50` : 'opacity-75 hover:opacity-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setCheckInSelectedCatalogIds((prev) =>
                                  prev.includes(pill.id)
                                    ? prev.filter((id) => id !== pill.id)
                                    : [...prev, pill.id]
                                )
                              }
                              className="mt-0.5 accent-emerald-500"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-extrabold">{pill.name}</span>
                                {isRec && (
                                  <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600 dark:text-amber-400">
                                    Recommended
                                  </span>
                                )}
                              </div>
                              <span className="block text-[10px] opacity-70">
                                {pill.dose} • {pill.timing}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    {/* Optional extra pill input inside Check-In */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <input
                        type="text"
                        value={checkInCustomPillName}
                        onChange={(e) => setCheckInCustomPillName(e.target.value)}
                        placeholder="+ Optional extra pill taken today..."
                        className={`sm:col-span-2 px-3 py-2 rounded-xl text-xs bg-transparent focus:outline-none ${neuCardSm}`}
                      />
                      <input
                        type="text"
                        value={checkInCustomPillDose}
                        onChange={(e) => setCheckInCustomPillDose(e.target.value)}
                        placeholder="Dose (e.g., 200 mg)"
                        className={`px-3 py-2 rounded-xl text-xs bg-transparent focus:outline-none ${neuCardSm}`}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Row 5: Private Daily Diary (Foldable, Required) */}
              <div className={`rounded-2xl ${neuInset}`}>
                <button
                  type="button"
                  onClick={() => setCheckInDiaryOpen((o) => !o)}
                  className="w-full flex items-center justify-between gap-2 p-3 text-left"
                  aria-expanded={checkInDiaryOpen}
                >
                  <span className="text-xs font-extrabold flex items-center gap-1.5">
                    <BookHeart className="w-4 h-4 text-pink-500" />
                    Private Diary — Day {nextMissionDay}
                    <span className="text-rose-500">*</span>
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="text-[10px] font-bold flex items-center gap-1 opacity-65">
                      <Lock className="w-3 h-3" />
                      Only you can see this
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${checkInDiaryOpen ? 'rotate-180' : ''}`}
                    />
                  </span>
                </button>
                {checkInDiaryOpen && (
                  <div className="px-3 pb-3">
                    <textarea
                      value={diaryDraft}
                      onChange={(e) => {
                        setDiaryDraft(e.target.value);
                        if (diaryError) setDiaryError('');
                      }}
                      maxLength={500}
                      rows={3}
                      placeholder="Anything on your mind today? A thought, a worry, a small win..."
                      className={`w-full p-3 rounded-xl text-sm bg-transparent resize-none focus:outline-none focus:ring-2 focus:ring-pink-400/50 ${neuCardSm}`}
                    />
                    <div className="flex justify-between text-[10px] mt-1">
                      <span className="text-rose-500 font-bold">{diaryError}</span>
                      <span className="opacity-60">{diaryDraft.length} / 500</span>
                    </div>
                  </div>
                )}
                {!checkInDiaryOpen && diaryError && (
                  <p className="px-3 pb-3 text-[10px] text-rose-500 font-bold">{diaryError}</p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowCheckInModal(false)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-bold ${neuBtn}`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold bg-sky-500 hover:bg-sky-600 text-white shadow-md transition-all"
                >
                  Append Day {nextMissionDay} to Mission Telemetry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}