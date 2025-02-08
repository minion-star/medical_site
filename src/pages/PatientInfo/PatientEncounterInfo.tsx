import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import * as React from 'react';
import {
  ListItemIcon,
  ListItemButton,
  Collapse,
  Chip,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
  ListItemText,
  Divider,
  SelectChangeEvent,  
  Paper,
  IconButton,
  FormControlLabel,
  FormControl,
  Checkbox,
  Avatar,
  Input,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Container,
  Badge,
  Modal,
  SpeedDialAction,
  SpeedDialIcon,
  SpeedDial,
  AppBar,
  Drawer,
  FormGroup,
} from "@mui/material";
import { ExpandLess, ExpandMore} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import BarChartIcon from '@mui/icons-material/BarChart';
import Appbar from "../../components/Appbar";
import { Link, useParams } from "react-router-dom";
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import '../../styles.css'
import Appbar_Patient from "../../components/Appbar_Patientlist";
import CalculateIcon from '@mui/icons-material/Calculate';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LockIcon from '@mui/icons-material/Lock';
import VitalSignsModal from "./VitalSignsModal";
import StickySpeedDial from "./StickySpeedDial"
import { useLocation } from 'react-router-dom';




// History of Present Illness

const location = [['All over', 'Ankle left', 'Ankle right', 'Arm left', 'Arm right', 'Back', 'Back lower', 'Back upper', 'Chest', 'Chest right side', 'Chest left side',
 'Elbow left', 'Elbow right', 'Epigastrium', 'Ears', 'Ear left', 'Ear right', 'Eyes', 'Eye left', 'Eye right', 'Face', 'Fingers', 'Fingers left hand', 'Fingers right hand', 
 'Forearm left', 'Forearm right', 'Feet', 'Foot left', 'Foot right', 'Genitals', 'Groin', 'Hands', 'Hand left', 'Hand right', 'Head', 'Head frontal', 'Head occipital', 'Head left side', 'Head right side', 'Hip', 'Jaw', 'Knees', 'Knees left', 'Knees right', 'Legs', 'Leg left',
 'Leg right', 'Mouth', 'Neck', 'Nose', 'Shoulders', 'Shoulders left', 'Shoulders right', 'Skin',
 'Stomach', 'Substemal', 'Suprapubic', 'Teeth', 'Testes', 'Thigh', 'Throat', 'Thumb', 'Toes', 'Tongue', 'Wrist',], ['bilateral', 'diffuse', 'fixed', 'generalized', 'localized', 'migratory', 'unilateral',
]];
const quality = [ ['Burning', 'Cramping', 'Crushing', 'Dull', 'Fullness', 'Pressure', 'Pressure sensation', 'Plusation', 'Radiating', 'Sharp',
 'Shooting', 'Stabbing', 'Tender', 'Throbbing', 'Vague',], ['acute', 'chronic', 'constant', 'deep', 'improving', 'intermittent', 'lessening', 'same as prior', 'stable', 'superficial', 'unchanged', 'worsening',
]];
const severity = ['1 on a scale of 1 to 5', '2 on a scale of 1 to 5', '3 on a scale of 1 to 5', '4 on a scale of 1 to 5', '5 on a scale of 1 to 5', 'Critical', 'Disabling', 'Intolerable', 'Life threatening', 'Mild', 'Mild severity', 'Mild to moderate severity', 'Moderate severity', 'High severity', 'Severe', 'Writhing in pain',
];
const duration = ['Continuous', 'Episodic', 'Few minutes', 'Few hours', 'Few days', 'Few months', 'Seasonal', 'Symptomatic < 1 minute', 'Symptomatic > 10 minutes', 'Symptomatic > 30 minutes', 'Symptomatic > 60 minutes', 'Symptomatic, few minutes', 'Symptomatic, few hours', 'Symptomatic, few days', 'Since yesterday', 'Since last night', 'Since last few hours', 'Since last few days', 'Since last 2 days', 'Since last 3 days', 'Since last week', 'Since last month', 'Since last year',
];
const onset = ['Abrupt', 'After meals', 'After standing for a while', 'At night', 'At rest', 'Daily', 'Diurnal', 'Gradual', 'Infrequent', 'Intermittent', 'Nocturnal', 'Resolved', 'Unexpected', 'Upon awakening', 'Upon rising',
];
const signs = ['Abdominal pain', 'Achiness', 'Anxiety', 'Back stiffness', 'Bladder complaints', 'Bleeding', 'Blurring vision',
 'Bowel complaints', 'Breast pain', 'Chills', 'Defecation', 'Diarrhea', 'Dizziness', 'Double vision', 'Emotional stress', 'Excessive ingestion of food', 'Excessive nighttime urination', 'Excessive thirst', 'Exhaustion', 'Fatigue', 'Fever and chills', 'Headaches', 'Heartbeat, irregularity', 'Heartburn',
 'Hunger pangs', 'Hypersensitivity', 'Indigestion', 'Instability', 'Intolerance', 'Joint pain', 'Joint pain and swelling', 'Leg cramps', 'Lethargy', 'Lightheadedness', 'Loss of appetite', 'Malaise', 'Mood change', 'Nasal discharge', 'Nausea and vomiting', 'Night sweats', 'Numbness', 'Numbness, face', 'Numbness, legs', 'Numbness, face and legs', 'Pain',
 'Reduced level of alertness', 'Shortness of breath', 'Skin rash', 'Sleep disturbance', 'Sweating', 'Swelling', 'Swelling and redness', 'Syncope', 'Tenderness', 'Tingling', 'Trauma', 'Weakness',
];
const modifying = ['Abates on its own', 'Abates with meds', 'Abates with OTC mdes', 'Aggravates with movement', 'Aggravates on eating', 'Aggravates on coughing', 'Aggravates on changing position', 'Aggravates on limb elevation', 'Aggravates on taking deep breath', 'Aggravates on touching', 'Increases with inspiration',
 'Relieves with rest', 'Relieves on food intake', 'Relieves on changing position', 'Relieves on lying down', 'Relieves on remaining still', 'Relieves on sitting up', 'Relieves on standing', 'Relieves on heat application',
];

const context = ['At rest', 'At work', 'High altitude', 'In crowds', 'In the car', 'On exertion', 'On lifting weight', 'On taking medication', 'Outside',
 'While climbing stairs', 'While driving', 'While jogging', 'While laying down', 'While walking', 'When exposed to dust', 'When exposed to heat', 'When exposed to sun', 'When stressed', 'With activity',
];



//   Physical Examination  

const name1:string[] = ['Abdominal pain', 'Abnormal appearance of eyes', 'Allergy symptoms', 'Ankle symptoms', 'Anxiety / nervousness', 'Back symptoms', 'Bedwetting', 'Bite, animal', 'Bite, insect', 'Blisters', 'Blood pressure test', 'Boils', 'Burn / scald', 'Chest pain', 'Common cold / flu', 'Constipation', 'Cough', 'Cough, barking', 'Cuts and bruises', 'Depression', 'Diabetes mellitus', 'Discuss Test results', 'Earache / ear infection', 'Exposure to chemical', 'Fever']
const general_1:string[] = ['Acutely distressed', 'Anxious', 'Crying', 'Confused',  'Dehydrated', 'Distressed', 'Drowsy', 'Fatigued', 'Flat affect', 'Ill appearing', 'Malnourished', 'Pale complexion', 'Sarcastic', 'Tearful', 'Uncomfortable', 'Uncooperative', 'Unkempt', 'Withdrawn']
const conjunctivae_2:string[][] = [['Chalazion present', 'Discharge present', 'Foreign body present', 'Hemorrhage present', 'Nodule present', 'Pinguecula present', 'Pterygium present', 'Ptosis present', 'Rash present', 'Redness present', 'Stye present', 'Swelling present', 'Tenderness present'], ['both conjunctivae', 'left conjunctiva', 'right conjunctiva', 'both lids', 'left lid', 'right lid']]
const pupil_2:string[][] = [['Asymmetrical in color', 'Asymmetrical in size', 'Miosis present', 'Mydriasis present', 'Poor response to accommodation', 'Poor response to light', 'Poor response to light & accommodation'], ['both irises', 'left iris', 'right iris', 'both pupils', 'left pupil', 'right pupil']]
const optic_2:string[] = ['Cup to disc ratio increased', 'Edema present', 'EOM impaired', 'Exudates present', 'Hemorrhages present', 'Icterus present']
const external_3:string[][] = [['Bluging present', 'Lesings present', 'Traumatic injury'], ['both ears', 'left ear', 'right ear', 'nose']]
const canal_3:string[][] = [['Bluging present', 'Cerumen present', 'Discharge present', 'Effusion present', 'Foreign body present', 'Light reflex present', 'Mobility not present', 'Perforation present', 'Pus present', 'Redness present', 'Retraction present', 'Scar present', 'Swelling present'], ['both canals', 'left canal', 'right canal', 'both membranes', 'left membrane', 'right membrane']]
const hearing_3:string[] = ['Abnormal finter rub test', 'Abnormal tuning fork rinne test', 'Abnormal tuning fork weber test', 'Abnormal whispered voice test', 'Hearing impaired']
const mucosa_3:string[][] = [['Abnormal mucosa', 'Abnormal septum', 'Abnormal turbinates', 'Blockage present', 'Deviation present', 'Discharge present', 'Dryness present', 'Inflammation present', 'Tenderness present'], ['mucosa', 'septum', 'turbinates']]
const lips_3:string[][] = [['Abnormal gums', 'Abnormal lips', 'Abnormal teeth', 'Angular cheilosis noted', 'Bleeding present', 'Blisters present', 'Chapping present', 'Erosion present', 'Pigmentation present', 'Plaque present', 'Ulceration present'], ['gums', 'lips', 'teeth']]
const oroph_3:string[] = ['Abnormal oral mucosa', 'Abnormal salivary glands', 'Abnormal hard palate', 'Abnormal soft palate', 'Abnormal posterior pharynx', 'Abnormal tongue', 'Abnormal tonsils', 'Salivary calculus present', 'Tonsillar erythema present', 'Tonsillar exudate present', 'Tonsillar swelling present']
const neck_4:string[] = ['Asymmetrical', 'Brudzinski sign present', 'JVD present', 'JVP inceased', 'Kernig sign present', 'Mass present', 'ROM diminished', 'Stiffness present', 'Swelling present', 'Tenderness present', 'Trachea deviated', 'Warmth present']
const thyroid_4:string[] = ['Asymmetrical', 'Bruit present', 'Enlargement present', 'Goiter present', 'Nodules present', 'Swelling present', 'Tenderness present', 'Thyromegaly']
const respiratory_5:string[] = ['Diaphragmatic movement present', 'Intercostal retractions present', 'Tachypnea present', 'Use of accessory muscles noted']
const chestper_5:string[] = ['Dull note present', 'Resonance decreased', 'Resonance increased']
const chestpal_5:string[] = ['Fremitus decreased', 'Fremitus increased']
const lungs_5:string[] = ['Crepitations present', 'Pleural rub present', 'Rhonchi present', 'Wheezing present']
const heartpal_6:string[] = ['Apex beat displaced', 'Apex beat not palpable', 'Enlargement present', 'Thrill present']
const heartaus_6:string[] = ['Ejection click present', 'Murmur present', 'Murmur present, diastolic', 'Murmur present, systolic', 'Opening snap present', 'Rate and rhythm irregular', 'S1 and S2 abnormal', 'S3 gallop present', 'S4 gallop present']
const carotid_6:string[][] = [['Amplitude decreased', 'Amplitude increased', 'Bruit present'], ['bilaterally', 'left', 'right']]
const abdominal_6:string[] = ['Aneurysm present', 'Bruit present']
const femoral_6:string[][] = [['Amplitude decreased', 'Amplitude increased', 'Bruit present'], ['bilaterally', 'left', 'right']]
const pedal_6:string[][] = [['Amplitude decreased', 'Amplitude increased', 'Not palpable'], ['bilaterally', 'left', 'right']]
const extremities_6:string[] = ['Ary scales present', 'Edema present, non-pitting', 'Edema present, pitting', 'Trophic changes present', 'Varicose veins present', 'Varicose veins present, inflamed']
const breastsinspec_7:string[][] = [['Abnormal appearance', 'Asymmetrical in size', 'Erythema present', 'Nipple inversion present', 'Nipple discharge, bloody', 'Nipple discharge, milky', 'Nipple discharge, serous', 'Peau D orange', 'Surgical scar present'], ['bilaterally', 'left', 'right']]
const breastpal_7:string[][] = [['Axillary adenopathy', 'Induration present', 'Lump present', 'Mass present', 'Tenderness present', 'Warmth present'], ['bilaterally', 'left', 'right']]
const abodomen_8:string[] = ['Ascites present', 'Bowel sounds decreased', 'Bowel sounds increased', 'Distended appearance', 'Fluid thrill present', 'Mass present', 'Muscle guarding present', 'Muscle rigidity present', 'Scaphoid appearance', 'Shifting dullness present', 'Succussion splash present', 'Tenderness present', 'Tenderness present, direct', 'Tenderness present, rebound', 'Not palpable']
const liver_8:string[][] = [['Enlargement present',   'Mass present',   'Tenderness present',   'Not palpable'], ['liver', 'spleen']]
const hernia_8:string[][] = [['Femoral hernia present',   'Incisional hernia present',   'Inguinal hernia present',   'Umbilical hernia present',   'Ventral hernia present',   'Not reducible'], ['bilaterally', 'left', 'right']]
const anus_8:string[][] = [['Bleeding present', 'Fissure present', 'Fistula present', 'Hemorrhoids present', 'Mass present', 'Skin tags present', 'Sphincter tone decreased', 'Sphincter tone increased', 'Tenderness present', 'Warts present'], ['anus', 'perineum', 'rectum']]
const stool_8:string[] = ['Test or sample refused by patient', 'Occult blood test positive']
const genitalia_9:string[] = ['Abnormal appearance', 'Abnormal hair distribution', 'Abnormal pelvic support', 'Bartholins abscess present', 'Bartholins cyst present', 'Cystocele present', 'Estrogen effect on vagina noted', 'Lesions on external genitalia noted', 'Lesions on vagina noted', 'Rectocele present', 'Vaginal discharge, bloody', 'Vaginal discharge, white', 'Vaginal discharge, odorous', 'Vaginal discharge, yellow', 'Vaginal discharge, pus-like']
const urethra_9:string[] = ['Mass present', 'Scarring present', 'Tenderness present']
const bladder_9:string[] = ['Fullness present', 'Mass present', 'Tenderness present']
const cervix_9:string[] = ['Lesion present', 'Discharge present, bloody', 'Discharge present, pus-like']
const uterus_9:string[] = ['Abnormal consistency', 'Abnormal contour', 'Abnormal mobility', 'Enlargement present', 'Position anteverted', 'Position retroverted', 'Prolapse present', 'Tenderness present']
const adnexa_9:string[] = ['Enlargement present', 'Mass present', 'Nodule present', 'Tenderness present']
const scrotum_10:string[] = ['Erythema present', 'Hydrocele present', 'Mass present', 'Spermatocele present', 'Tenderness present', 'Varicocele present']
const penis_10:string[] = ['Abnormal appearance', 'Hypospadias present', 'Phimosis present', 'Rash present', 'Tenderness present', 'Ulcer present', 'Urethral discharge noted', 'Urethral meatus anomaly', 'Vesicles present']
const prostate_10:string[] = ['Asymmetrical', 'Enlargement present', 'Mass present', 'Nodule present', 'Tenderness present']
const necknode_11:string[] = ['Lymphadenopathy', 'Tenderness present']
const axillae_11:string[] = ['Lymphadenopathy', 'Tenderness present']
const groin_11:string[] = ['Lymphadenopathy', 'Tenderness present']
const generalized_11:string[] = ['Lymphadenopathy', 'Tenderness present']
const gait_12:string[] = ['Abnormal gait', 'Abnormal station', 'Antalgic gait', 'Ataxic gait', 'Discoordinated walk', 'Dysrhythmic walk', 'Shuffling gait', 'Spastic gait', 'Unstable walk', 'Unsteady walk']
const digits_12:string[][] = [['Bouchard nodes present', 'Clubbing present', 'Cyanosis present', 'Deformity present', 'Discoloration present', 'Dystrophy present', 'Edema present', 'Hammer toes noted', 'Heberden nodes present', 'Inflammation present', 'Infection present', 'Ingrowing nails noted', 'Ischemia present', 'Koilonychia present', 'Onycholysis present', 'Petechiae present', 'Subungual hematoma noted', 'Splinter hemorrhages', 'Tophus present'], ['digits', 'nails']]
const joints_12:string[][] = [['Abnormal appearance', 'Abnormal movements', 'Abnormal pronation', 'Abnormal supination', 'Atrophy present', 'Contracture present', 'Crepitus present', 'Deformity present', 'Dislocation present', 'Effusion present', 'Erythema present', 'Extension decreased', 'Flexion decreased', 'Ganglion cyst present', 'Laxity present', 'Mass present', 'ROM decreased', 'Subluxation present', 'Swelling present', 'Tone decreased', 'Tenderness present', 'Warmth present', 'Weakness present'], ['bones', 'joints', 'muscles']]
const skininspection_13:string[] = ['Abrasion present', 'Abscess present', 'Blisters present', 'Bullae present', 'Burn present', 'Cellulitus present', 'Cyanosis present', 'Chloasma present', 'Ecchymosis present', 'Erythema present', 'Eschar present', 'Fissure present', 'Hyperpigmentation noted', 'Hypopigmentation noted', 'Lichenification noted', 'Maceration present', 'Macule present', 'Pallor present', 'Papule present', 'Plaque present', 'Purpura present', 'Rash present', 'Scales present', 'Ulcer present', 'Vesicles present', 'Vitiligo present', 'Wheal present', 'Wounds present']
const skinpal_13:string[] = ['Cysts present', 'Induration present', 'Nodules present', 'Tenderness present', 'Tightness present', 'Warmth present']
const cranial_14:string[] = ['Abducens nerve deficit', 'Accessory nerve deficit', 'Acoustic nerve deficit', 'Facial nerve deficit', 'Glossopharyngeal nerve deficit', 'Hypoglossal nerve deficit', 'Oculomotor nerve deficit', 'Olfactory nerve deficit', 'Optic nerve deficit', 'Trigeminal nerve deficit', 'Trochlear nerve deficit', 'Vagus nerve deficit']
const dtr_14:string[] = ['Ankle reflex decreased', 'Ankle reflex increased', 'Babinski reflex present', 'Biceps reflex decreased', 'Biceps reflex increased', 'Brachioradialis decreased', 'Brachioradialis increased', 'Knee reflex decreased', 'Knee reflex increased', 'Triceps reflex decreased', 'Triceps reflex increased']
const sensory_14:string[] = ['Finger-to-nose test abnormal', 'Heel-to-shin test abnormal', 'Involuntary movements noted', 'Light touch abnormal', 'Motor strength decreased', 'Muscle bulk decreased', 'Muscle bulk increased', 'Muscle tone decreased', 'Muscle tone increased', 'Pinprick abnormal', 'Proprioception abnormal', 'Romberg test positive', 'Stereognosis abnormal', 'Temperature abnormal', 'Vibration abnormal']
const judgment_15:string[] = ['Judgment impaired', 'Insight not present']
const orientation_15:string[] = ['Disoriented to person', 'Disoriented to place', 'Disoriented to situation', 'Disoriented to time', 'Disoriented TPP']
const recent_15:string[] = ['Memory impaired', 'Recent memory impaired', 'Remote memory impaired']
const mood_15:string[] = ['Agitation present', 'Anhedonia present', 'Anxiety present', 'Anxiousness present', 'Depression present', 'Suicidal ideation noted']

// static

const constitutional_1:string = 'NAD, well nourished & hydrated'
const eyes_1:string = 'Conjunctivae clear, no ptosis'
const eyes_2:string = 'PERRLA bilaterally, Irises normal'
const eyes_3:string = 'No edema or icterus, EOM intact'
const enmt_1:string = 'No bulging, lesions or trauma'
const enmt_2:string = 'Patent, no erythema or swelling'
const enmt_3:string = 'No apparent hearing impairment'
const enmt_4:string = 'Mucosa moist, Sept-Turb normal'
const enmt_5:string = 'No abnormality seen, no bleeding'
const enmt_6:string = 'Clear, no erythema or exudates'
const neck_1:string = 'Supple, full ROM, no JVD noted'
const neck_2:string = 'No thyromegaly or tenderness'
const respiratory_1:string = 'No distress, normal breathing'
const respiratory_2:string = 'Normal resonance on percussion'
const respiratory_3:string = 'Normal fremitus on palpation'
const respiratory_4:string = 'CTAB, normal respiratory sounds'
const cardiovascular_1:string = 'Apex beat in normal place, no thrill'
const cardiovascular_2:string = 'RRR, normal S1 S2, no murmurs'
const cardiovascular_3:string = 'Normal amplitude, no bruits'
const cardiovascular_4:string = 'No aneurysm present, no bruits'
const cardiovascular_5:string = 'Normal amplitude, no bruits'
const cardiovascular_6:string = 'Palpable with normal amplitude'
const cardiovascular_7:string = 'No cyanosis, varicosities or edema'
const breasts_1:string = 'No deformity or nipple discharge'
const breasts_2:string = 'No masses, lumps or tenderness'
const gastrointestinal_1:string = 'No masses or tenderness noted'
const gastrointestinal_2:string = 'Normal size with no tenderness'
const gastrointestinal_3:string = 'No palpable bulge or impulse'
const gastrointestinal_4:string = 'No abnormality detected'
const gastrointestinal_5:string = 'Test ordered or sample obtained'
const genitourinary_female_1:string = 'No abnormality detected'
const genitourinary_female_2:string = 'No masses, tenderness or scarring'
const genitourinary_female_3:string = 'No masses, tenderness or fullness'
const genitourinary_female_4:string = 'No lesions or discharge present'
const genitourinary_female_5:string = 'Normal size, position & consistency'
const genitourinary_female_6:string = 'Non-tender, no mass or nodularity'
const genitourinary_male_1:string = 'No mass, tenderness or hydrocele'
const genitourinary_male_2:string = 'Normal appearance, no discharge'
const genitourinary_male_3:string = 'Normal size, no mass or nodularity'
const lymphatic_1:string = 'Non-tender, no lymphadenopathy'
const lymphatic_2:string = 'Non-tender, no lymphadenopathy'
const lymphatic_3:string = 'Non-tender, no lymphadenopathy'
const lymphatic_4:string = 'Non-tender, no lymphadenopathy'
const musculoskeletal_1:string = 'Stable, coordinated & smooth'
const musculoskeletal_2:string = 'No clubbing, infection or cyanosis'
const musculoskeletal_3:string = 'No abnormality detected'
const skin_1:string = 'No rashes, lesions or ulcers'
const skin_2:string = 'No induration, nodules or tightness'
const neurologic_1:string = 'No cranial nerves deficits noted'
const neurologic_2:string = 'No hyporeflexia or hyperreflexia'
const neurologic_3:string = 'No sensory or motor deficits noted'
const psychiatric_1:string = 'Judgment intact, insight present'
const psychiatric_2:string = 'Oriented to time, place & person'
const psychiatric_3:string = 'No memory impairment noted'
const psychiatric_4:string = 'No mood disorders, calm affect'

const reviewGeneral:string[] = ["Fevers", "Sweats", "Weight loss", "Chills", "Appetite loss", "Fatigue"]
const reviewEyes:string[] = ["Vision loss", "Double vision", "Blurred vision", "Eye irritation", "Eye pain", "Light sensitivity"]
const reviewENMT:string[] = ["Earache", "Ear discharge", "Ringing in the ears", "Decreased hearing", "Frequent colds", "Nasal congestion", "Nosebleeds", "Bleeding gums", "Difficulty swallowing", "Hoarseness", "Sore throat"]
const reviewCardiovascular:string[] = ["Difficulty breathing at night", "Chest pain or discomfort", "Irregular heart beats", "Fatigue", "Lightheadedness", "Shortness of breath with exertion",
  "Palpitations", "Swelling of hands or feet", "Difficulty breathing while lying down", "Leg cramps with exertion", "Discoloration of lips or nails ", "Recent weight gain"
]
const reviewRespiratory:string[] = ["Sleep disturbances due to breathing", "Cough", "Coughing up blood", "Shortness of breath", "Chest discomfort", "Wheezing", "Excessive sputum", "Excessive snoring"]
const reviewGastrointestinal:string[] = ["Change in appetite", "Indigestion", "Heartburn", "Nausea", "Vomiting", "Excessive gas", "Abdominal pain", "Abdominal bloating", "Hemorrhoids", "Diarrhea", "Change in bowel habits", "Constipation", "Black or tarry stools", "Bloody stools"]
const reviewGenitourinaryMale:string[] = ["Frequent urination", "Blood in urine", "Foul urinary discharge", "Kidney pain", "Urinary urgency", "Trouble starting urinary stream", "Inability to empty bladder", "Burning or pain on urination", "Genital rashes or sores","Testicular pain or masses"]
const reviewGenitourinaryFemale:string[] = ["Inability to control bladder", "Unusual urinary color", "Missed periods", "Excessively heavy periods", "Lumps or sores", "Pelvic pain"]
const reviewMusculoskeletal:string[] = ["Joint pain ", "Joint stiffness or swelling", "Muscle cramps", "Muscle aches", "Loss of strength", "Back or neck pain", "Muscle weakness"]
const reviewSkin:string[] =["Suspicious lesions", "Excessive perspiration", "Dryness", "Rash", "Changes in hair or nails", "Night sweats", "Poor wound healing", "Itching", "Flushing", "Changes in color of skin"]
const reviewNeurologic:string[] = ["Headaches", "Weakness or numbness", "Tingling", "Faints or blackouts", "Tremors", "Memory loss", "Poor balance ", "Difficulty with speaking", "Difficulty with concentration", "Disturbances in coordination", "Brief paralysis", " Visual disturbances", "Seizures", "Sensation of room spinning", "Excessive daytime sleeping"]
const reviewPsychiatric:string[] = ["Anxiety", "Depression", "Nervousness", "Memory change", "Frightening visions or sounds", "Thoughts of suicide or violence"]
const reviewEndocrine:string[] = ["Heat or cold intolerance", "Weight change", "Excessive thirst or hunger", "Excessive sweating or urination"]
const reviewHematologicLymphatic:string[] = ["Skin discoloration", "Enlarged lymph nodes", "Bleeding", "Fevers", "Abnormal bruising"]
const reviewAllergicImmunologic:string[] = ["Seasonal allergies", "Persistent infections", "Hives or rash", "HIV exposure"]



interface Head {
  date:string,
  type:string,
  attendBy:string,
}


interface ReviewOfSystems {
  general : {fevers:boolean, sweats:boolean, weightLoss:boolean, Chills:boolean, appetiteLoss:boolean, fatigue:boolean},
  eyes:{visionLoss:boolean, doubleVision:boolean, blurredVision:boolean, eyeIrritation:boolean, eyePain:boolean, lightSensitivity:boolean},
  eNMT:{earache:boolean, earDischarge:boolean, ringingInTheEars:boolean, decreasedHearing:boolean, frequentColds:boolean, nasalCongestion:boolean, nosebleeds:boolean, bleedingGums:boolean, difficultySwallowing:boolean, hoarseness:boolean, soreThroat:boolean},
  cardiovascular:{difficultyBreathingAtNight:boolean, chestPainOrDiscomfort:boolean, irregularHeartBeats:boolean, fatigue:boolean, lightheadedness:boolean, shortnessOfBreathWithExertion:boolean,
  palpitations:boolean, swellingOfHandsOrFeet:boolean, difficultyBreathingWhileLyingDown:boolean, legCrampsWithExertion:boolean, discolorationOfLipsOrNails:boolean, recentWeightGain:boolean
},
  respiratory:{sleepDisturbancesDueToBreathing:boolean, cough:boolean, coughingUpBlood:boolean, shortnessOfBreath:boolean, chestDiscomfort:boolean, wheezing:boolean, excessiveSputum:boolean, excessiveSnoring:boolean},
  gastrointestinal:{changeInAppetite:boolean, indigestion:boolean, heartburn:boolean, nausea:boolean, vomiting:boolean, excessiveGas:boolean, abdominalPain:boolean, abdominalBloating:boolean, hemorrhoids:boolean, diarrhea:boolean, changeInBowelHabits:boolean, constipation:boolean, blackOrTarryStools:boolean, bloodyStools:boolean},
  genitourinaryMale:{frequentUrination:boolean, bloodInUrine:boolean, foulUrinaryDischarge:boolean, kidneyPain:boolean, urinaryUrgency:boolean, troubleStartingUrinaryStream:boolean, inabilityToEmptyBladder:boolean, burningOrPainOnUrination:boolean, genitalRashesOrSores:boolean, testicularPainOrMasses:boolean},
  genitourinaryFemale:{inabilityToControlBladder:boolean, unusualUrinaryColor:boolean, missedPeriods:boolean, excessivelyHeavyPeriods:boolean, lumpsOrSores:boolean, pelvicPain:boolean},
  musculoskeletal:{jointPain:boolean, jointStiffnessOrSwelling:boolean, muscleCramps:boolean, muscleAches:boolean, lossOfStrength:boolean, backOrNeckPain:boolean, muscleWeakness:boolean},
  skin:{suspiciousLesions:boolean, excessivePerspiration:boolean, dryness:boolean, rash:boolean, changesInHairOrNails:boolean, nightSweats:boolean, poorWoundHealing:boolean, itching:boolean, flushing:boolean, changesInColorOfSkin:boolean},
  neurologic:{headaches:boolean, weaknessOrNumbness:boolean, tingling:boolean, faintsOrBlackouts:boolean, tremors:boolean, memoryLoss:boolean, poorBalance :boolean, difficultyWithSpeaking:boolean, difficultyWithConcentration:boolean, disturbancesInCoordination:boolean, briefParalysis:boolean, visualDisturbances:boolean, seizures:boolean, sensationOfRoomSpinning:boolean, excessiveDaytimeSleeping:boolean},
  psychiatric:{Anxiety:boolean, Depression:boolean, Nervousness:boolean, memoryChange:boolean, frighteningVisionsOrSounds:boolean, thoughtsOfSuicideOrViolence:boolean},
  endocrine:{heatOrColdIntolerance:boolean, weightChange:boolean, excessiveThirstOrHunger:boolean, excessiveSweatingOrUrination:boolean},
  hematologicLymphatic:{skinDiscoloration:boolean, enlargedLymphNodes:boolean, bleeding:boolean, fevers:boolean, abnormalBruising:boolean},
  allergicImmunologic:{seasonalAllergies:boolean, persistentInfections:boolean, hivesOrRash:boolean, hIVExposure:boolean},
  checkReview:{checkGeneral:boolean, checkEyes:boolean, checkENMT:boolean, checkCardiovascular:boolean, checkRespiratory:boolean, checkGastrointestinal:boolean, checkGenitourinaryMale:boolean, checkGenitourinaryFemale:boolean, checkMusculoskeletal:boolean, checkSkin:boolean, checkNeurologic:boolean, checkPsychiatric:boolean, checkEndocrine:boolean, checkHematologicLymphatic:boolean, checkAllergicImmunologic:boolean,}, 
}

interface HistoryOfIllness {
  Location: string,
  Quality: string,
  Severity: string,
  Duration: string,
  OnsetTiming: string,
  Context: string,
  ModifyingFactors: string,
  SignsSymptoms: string,
}

interface VitalSigns {
  systolic: string,
  diastolic: string,
  temperature: string,
  weight: string,
  height: string,
  respiration: string,
  pulse: string,
  waist: string,
  spO2: string,

}

interface Checkbox_Textfield {
  frontCheck:boolean,
  backCheck:boolean,
  textfield:string,
}

interface PhysicalExamination {
  constitutional_1:Checkbox_Textfield,
  eyes_1:Checkbox_Textfield, eyes_2:Checkbox_Textfield, eyes_3:Checkbox_Textfield,
  enmt_1:Checkbox_Textfield, enmt_2:Checkbox_Textfield, enmt_3:Checkbox_Textfield, enmt_4:Checkbox_Textfield, enmt_5:Checkbox_Textfield, enmt_6:Checkbox_Textfield,
  neck_1:Checkbox_Textfield, neck_2:Checkbox_Textfield,
  respiratory_1:Checkbox_Textfield, respiratory_2:Checkbox_Textfield, respiratory_3:Checkbox_Textfield, respiratory_4:Checkbox_Textfield,
  cardiovascular_1:Checkbox_Textfield, cardiovascular_2:Checkbox_Textfield, cardiovascular_3:Checkbox_Textfield, cardiovascular_4:Checkbox_Textfield, cardiovascular_5:Checkbox_Textfield, cardiovascular_6:Checkbox_Textfield, cardiovascular_7:Checkbox_Textfield,
  breasts_1:Checkbox_Textfield, breasts_2:Checkbox_Textfield,
  gastrointestinal_1:Checkbox_Textfield, gastrointestinal_2:Checkbox_Textfield, gastrointestinal_3:Checkbox_Textfield, gastrointestinal_4:Checkbox_Textfield, gastrointestinal_5:Checkbox_Textfield,
  genitourinaryFemale_1:Checkbox_Textfield, genitourinaryFemale_2:Checkbox_Textfield, genitourinaryFemale_3:Checkbox_Textfield, genitourinaryFemale_4:Checkbox_Textfield, genitourinaryFemale_5:Checkbox_Textfield, genitourinaryFemale_6:Checkbox_Textfield,
  genitourinaryMale_1:Checkbox_Textfield, genitourinaryMale_2:Checkbox_Textfield,genitourinaryMale_3:Checkbox_Textfield,
  lymphatic_1:Checkbox_Textfield, lymphatic_2:Checkbox_Textfield, lymphatic_3:Checkbox_Textfield, lymphatic_4:Checkbox_Textfield,
  musculoskeletal_1:Checkbox_Textfield, musculoskeletal_2:Checkbox_Textfield, musculoskeletal_3:Checkbox_Textfield,
  skin_1:Checkbox_Textfield, skin_2:Checkbox_Textfield,
  neurologic_1:Checkbox_Textfield, neurologic_2:Checkbox_Textfield, neurologic_3:Checkbox_Textfield, 
  psychiatric_1:Checkbox_Textfield, psychiatric_2:Checkbox_Textfield, psychiatric_3:Checkbox_Textfield, psychiatric_4:Checkbox_Textfield,
}

interface Meeting {

  emcode:string,
  emcodeEdit:string,
  codeBasis:string,
  codeBasisEdit:string,
  calculation:string,
  period:string,
  time:string,
}

// selected options and check box component  
interface NameProps {
  names?: string[] | string[][]; // Accepts either a 1D or 2D array
  checked1?: boolean;
  subname?: string;
  label?: string;
}

//  Chief Complaint / Encounter Reason

const chiefEncounter = ["Abdominal pain", "Abnormal appearance of eyes", "Allergy symptoms", "Ankle symptoms", "Anxiety / nervousness", "Back symptoms", "Bedwetting", "Bite, animal", "Bite, insect", "Blisters", "Blood pressure test", "Boils", "Burn / scald", "Chest pain", "Common cold / flu", "Constipation", "Cough", "Cough, barking", "Cuts and bruises", "Depression", "Diabetes mellitus", "Discuss Test results", "Earache / ear infection", "Exposure to chemical", "Fever", "Fever and chills", "Fever and cough", "Flu like symptoms", "Followup / Progress visit", "Foot / toe symptoms", "General medical examination, routine", "General well baby examination", "Head cold, upper respiratory infection", "Headache / pain in head", "Hypertension", "Knee symptoms", "Leg symptoms", "Low back symptoms", "Medication / refill", "Memory problems", "Mouth ulcers", "Nasal congestion", "Nausea / vomiting", "Neck symptoms", "Numbness / tingling of hands or feet", "Obtain Referral", "Pap smear", "Physical examination for school / employment", "Physical examination for sport participation", "Prenatal examination, routine", "Prophylactic inoculations", "Runny nose", "Severe tiredness", "Shoulder symptoms", "Sinus symptoms", "Skin rash", "Snoring, nasal voice", "Sore ear", "Sore throat", "Sore tongue", "Spots / acne", "Spots / blotchy rash", "Stomach and abdominal pain, cramps and spasms", "Stuffy nose, scratchy throat", "Throat symptoms", "Tiredness, exhaustion", "Tongue and throat swelling", "Weakness and tingling in lower extremities", "Wheezing", "Wheezing, coughing and breathlessness", "Wound", "Wound / cut", "Wound management"]

interface ChiefProps {
  value?:string,
  onValueChange?:(newValue:string)=>void,
  names?: string[] | string[][]; // Accepts either a 1D or 2D array
  checked1?: boolean;
}

function ChiefEncounter({
  names = [["Option 1", "Option 2"], ["Option 3", "Option 4"]],
  checked1 = true,
  value,
  onValueChange,
}: ChiefProps) {

  const [dropdownValue, setDropdownValue] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    const latestSelection = selectedValues[selectedValues.length - 1]; // Get the latest selected item
    if (latestSelection.trim() !== "") {
      if (onValueChange) {  // Check if onValueChange is defined
        onValueChange(
          value?.trim() === "" ? latestSelection : `${value} | ${latestSelection}`
        );
      }
    }
    setDropdownValue([]); // Reset dropdown value to prevent display of selected items
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {  // Check if onValueChange is defined
      onValueChange(event.target.value);
    }
  };

  // Normalize names into a 2D array
  const normalizedNames: string[][] =
    Array.isArray(names[0]) ? (names as string[][]) : [names as string[]];

  // Flatten names for dropdown processing
  const processedNames = normalizedNames.flat();

  return (
    <Box sx={{ display: "flex",alignItems:"end"}}>
        {/* TextField */}
        <Grid item xs={11}>
          <TextField
            fullWidth
            variant="standard"
            multiline
            value={value}
            onChange={handleTextFieldChange}
            disabled={!checked1} // Disable when unchecked
          />
        </Grid>

        {/* Select Dropdown */}
        <Grid item xs={1}>
          <FormControl variant="standard">
            <Select
              labelId="select-quality-label"
              id="multi-select"
              multiple
              value={dropdownValue} // Dropdown value must be an array
              onChange={handleSelectChange}
              renderValue={() => null} // Prevent displaying values in the dropdown
              disabled={!checked1} // Disable when unchecked
              displayEmpty
            >
              {processedNames.map((name, index) =>
                name === "" ? (
                  <MenuItem key={`separator-${index}`} disabled>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      <>&nbsp;</>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      
    </Box>
  );
}
 // select checkbox
function Select_Checkbox({
  names,
  checked1,
  textfield,
  onTextFieldChange,
}: {
  names: string[] | string[][];
  checked1: boolean;
  textfield: string;
  onTextFieldChange: (value: string) => void;
}) {
  const [dropdownValue, setDropdownValue] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    const latestSelection = selectedValues[selectedValues.length - 1];

    if (latestSelection.trim() !== "") {
      if (onTextFieldChange) {
        onTextFieldChange(
        textfield.trim() === "" ? latestSelection : `${textfield} | ${latestSelection}`
      );
      }
    }
    setDropdownValue([]); // Reset dropdown value to prevent display of selected items
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onTextFieldChange) {
      onTextFieldChange(event.target.value);
    }
  };

  const normalizedNames: string[][] = Array.isArray(names[0])
    ? (names as string[][])
    : [names as string[]];

  const processedNames = normalizedNames.flat();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Grid container item xs={11} alignItems={"end"}>
        {/* TextField */}
        <Grid item xs={11}>
          <TextField
            fullWidth
            variant="standard"
            multiline
            value={textfield}
            onChange={handleTextFieldChange}
            disabled={!checked1}
          />
        </Grid>

        {/* Select Dropdown */}
        <Grid item xs={1}>
          <FormControl variant="standard">
            <Select
              multiple
              value={dropdownValue}
              onChange={handleSelectChange}
              renderValue={() => null}
              disabled={!checked1}
              displayEmpty
            >
              {processedNames.map((name, index) =>
                name === "" ? (
                  <MenuItem key={`separator-${index}`} disabled>
                    <Typography variant="body2" sx={{ color: "gray" }}>
                      <>&nbsp;</>
                    </Typography>
                  </MenuItem>
                ) : (
                  <MenuItem key={name} value={name}>
                    {name}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
}

// new selected options and checkbox

function New_Select_Checkbox({
  names,
  backCheck,
  onBackCheckChange,
  textfield,
  onTextFieldChange,
}: {
  names: string[] | string[][];
  backCheck: boolean;
  onBackCheckChange: (checked: boolean) => void;
  textfield: string;
  onTextFieldChange: (value: string) => void;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {/* Checkbox for backCheck */}
      <Grid item xs={1}>
        <Checkbox
          color="success"
          checked={backCheck}
          onChange={(event) => onBackCheckChange(event.target.checked)}
        />
      </Grid>

      {/* Select and TextField */}
      <Grid item xs={10}>
        <Select_Checkbox
          names={names}
          checked1={backCheck}
          textfield={textfield}
          onTextFieldChange={onTextFieldChange}
        />
      </Grid>
    </Box>
  );
}

// selected options and checkbox switch component

function Select_Checkbox_Switch({
  label = "Constitutional",
  names,
  frontCheck,
  onFrontCheckChange,
  backCheck,
  onBackCheckChange,
  textfield,
  onTextFieldChange,
}: {
  label: string;
  names: string[] | string[][];
  frontCheck: boolean;
  onFrontCheckChange: (checked: boolean) => void;
  backCheck: boolean;
  onBackCheckChange: (checked: boolean) => void;
  textfield: string;
  onTextFieldChange: (value: string) => void;
}) {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {/* Checkbox for frontCheck */}
      <Grid item xs={1}>
        <Checkbox
          color="success"
          checked={frontCheck}
          onChange={(event) => onFrontCheckChange(event.target.checked)}
        />
      </Grid>

