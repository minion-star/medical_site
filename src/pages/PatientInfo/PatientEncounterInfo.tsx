import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
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
  Modal
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
import CheckboxComGen from "../../components/Encounter/Checkbox/CheckboxGeneral";
import CheckboxAllergic from "../../components/Encounter/Checkbox/CheckboxAllergic";
import CheckboxCardiovascular from "../../components/Encounter/Checkbox/CheckboxCardiovascular";
import CheckboxENMT from "../../components/Encounter/Checkbox/CheckboxENMT";
import CheckboxEndocrine from "../../components/Encounter/Checkbox/CheckboxEndocrine";
import CheckboxEyes from "../../components/Encounter/Checkbox/CheckboxEyes";
import CheckboxGastrointestinal from "../../components/Encounter/Checkbox/CheckboxGastrointestinal";
import CheckboxGenitourianryFemale from "../../components/Encounter/Checkbox/CheckboxGenitourianryFemale";
import CheckboxGenitourinaryMale from "../../components/Encounter/Checkbox/CheckboxGenitourinaryMale";
import CheckboxHematologic from "../../components/Encounter/Checkbox/CheckboxHematologic";
import CheckboxMusculoskeletal from "../../components/Encounter/Checkbox/CheckboxMusculoskeletal";
import CheckboxNeurologic from "../../components/Encounter/Checkbox/CheckboxNeurologic";
import CheckboxPsychiatric from "../../components/Encounter/Checkbox/CheckboxPsychiatric";
import CheckboxRespiratory from "../../components/Encounter/Checkbox/CheckboxRespiratory";
import CheckboxSkin from "../../components/Encounter/Checkbox/CheckboxSkin";
import Appbar_Patient from "../../components/Appbar_Patientlist";
import { flexibleCompare } from "@fullcalendar/core/internal";
import ClickableAvatar from "../../components/ClickableAvatar";
import CalculateIcon from '@mui/icons-material/Calculate';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { link } from "fs";
import { Calendar } from "@fullcalendar/core";
import VitalSignsModal from "../../components/Encounter/VitalSignsModal";
import { string } from "yargs";



// History of Present Illness

const location = [['All over', 'Ankle, left', 'Ankle right', 'Arm, left', 'Arm, right', 'Back', 'Back, lower', 'Back, upper', 'Chest', 'Chest, right side', 'Chest, left side',
 'Elbow, left', 'Elbow, right', 'Epigastrium', 'Ears', 'Ear, left', 'Ear, right', 'Eyes', 'Eye, left', 'Eye, right', 'Face', 'Fingers', 'Fingers, left hand', 'Fingers, right hand', 
 'Forearm, left', 'Forearm, right', 'Feet', 'Foot, left', 'Foot, right', 'Genitals', 'Groin', 'Hands', 'Hand, left', 'Hand, right', 'Head', 'Head, frontal', 'Head, occipital', 'Head, left side', 'Head, right side', 'Hip', 'Jaw', 'Knees', 'Knees, left', 'Knees, right', 'Legs', 'Leg, left',
 'Leg, right', 'Mouth', 'Neck', 'Nose', 'Shoulders', 'Shoulders, left', 'Shoulders, right', 'Skin',
 'Stomach', 'Substemal', 'Suprapubic', 'Teeth', 'Testes', 'Thigh', 'Throat', 'Thumb', 'Toes', 'Tongue', 'Wrist',''], ['bilateral', 'diffuse', 'fixed', 'generalized', 'localized', 'migratory', 'unilateral',
]];
const quality = [ ['Burning', 'Cramping', 'Crushing', 'Dull', 'Fullness', 'Pressure', 'Pressure sensation', 'Plusation', 'Radiating', 'Sharp',
 'Shooting', 'Stabbing', 'Tender', 'Throbbing', 'Vague', ''], ['acute', 'chronic', 'constant', 'deep', 'improving', 'intermittent', 'lessening', 'same as prior', 'stable', 'superficial', 'unchanged', 'worsening',
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


// selected options and check box component  
interface NameProps {
  names?: string[] | string[][]; // Accepts either a 1D or 2D array
  checked1?: boolean;
  subname?: string;
  label?: string;
}

function Select_Checkbox({
  names = [["Option 1", "Option 2"], ["Option 3", "Option 4"]],
  checked1 = true,
}: NameProps) {
  const [textFieldValue, setTextFieldValue] = useState<string>("");
  const [dropdownValue, setDropdownValue] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const selectedValues = event.target.value as string[];
    const latestSelection = selectedValues[selectedValues.length - 1]; // Get the latest selected item
    if (latestSelection.trim() !== "") {
      setTextFieldValue((prev) =>
        prev.trim() === "" ? latestSelection : `${prev} | ${latestSelection}`
      );
    }
    setDropdownValue([]); // Reset dropdown value to prevent display of selected items
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextFieldValue(event.target.value);
  };

  // Normalize names into a 2D array
  const normalizedNames: string[][] =
    Array.isArray(names[0]) ? (names as string[][]) : [names as string[]];

  // Flatten names for dropdown processing
  const processedNames = normalizedNames.flat();

  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Grid container item xs={11} alignItems={"end"}>
        {/* TextField */}
        <Grid item xs={11} sx={{ }}>
          <TextField
            fullWidth
            variant="standard"
            multiline
            value={textFieldValue}
            onChange={handleTextFieldChange}
            disabled={!checked1} // Disable when unchecked
          />
        </Grid>

        {/* Select Dropdown */}
        <Grid item xs={1} sx={{ }}>
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
      </Grid>
    </Box>
  );
}
// new selected options and checkbox

function New_Select_Checkbox ({names=name1, checked1=true, subname=constitutional_1} : NameProps) {

  const [check, setCheck] = useState<boolean>(false);
 
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheck(event.target.checked);
  };

  return (
    <Box sx={{display:'flex', gap:1}}>
      <Grid item xs={1}><Checkbox color="success" disabled={!checked1} checked={check&&checked1} onChange={handleCheckboxChange}/></Grid>
      <Grid item xs={10} >
        {check?<Select_Checkbox names={names} checked1={checked1}/>:<Box sx={{ display: "flex", gap: 2 }}>
        <Grid container item xs={11} alignItems={"end"}><Grid item xs={11}><TextField variant="standard" fullWidth disabled defaultValue={subname} multiline/></Grid><Grid item xs={1}><FormControl variant="standard"><Select disabled /></FormControl></Grid></Grid></Box>}
      </Grid>
    </Box>
  );
}

// selected options and checkbox switch component

function Select_Checkbox_Switch ({label='Constitutional', names=name1,subname=constitutional_1} : NameProps) {

  const [checked, setChecked] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return (
    <Box sx={{display:"flex", gap:1}}>
      <Grid item xs={1}>
        <Checkbox
          color="success"
          checked={checked}
          onChange={handleCheckboxChange}
        />
      </Grid>
      <Grid item xs={3} sx={{mt:1.2}}>
        <label>{label}</label>
      </Grid>
      <Grid item xs={9} >
        {checked?<New_Select_Checkbox names={names} subname={subname}/>:
          <Box sx={{display:'flex', gap:1}}>
            <Grid item xs={1}><Checkbox color="success" disabled /></Grid>
            <Grid item xs={10}>
              <FormControl variant="standard" fullWidth>
                <Select multiple disabled={true}/>
              </FormControl>
            </Grid>
          </Box>}
      </Grid>
    </Box>
  );
}

// history of illness checkbox
function Select_History_Checkbox({
  names = name1,
  checked1 = true,
  label = ''
}: NameProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    setSelectedOptions(typeof value === "string" ? value.split(",") : value);
  };

  // Normalize names into a 2D array
  const normalizedNames: string[][] =
    Array.isArray(names[0]) ? (names as string[][]) : [names as string[]];

  return (
    <Box sx={{ display: "flex", gap: 2,}}>
      {/* label */}
      <Grid item xs={2} >
        <label>{label}:</label>
      </Grid>
      {/* Select Component */}
      <Grid item xs={10}>
        <FormControl variant="standard" fullWidth >
          <Select
            labelId="demo-simple-select-standard-label"
            id="select-checkbox"
            multiple
            disabled={!checked1}
            value={selectedOptions}
            onChange={handleSelectChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => {
                  // Determine chip color based on the array it belongs to
                  const isInFirstArray = normalizedNames[0].includes(value);
                  const chipColor = isInFirstArray ? "success" : "error";

                  return (
                    <Chip
                      key={value}
                      label={value}
                      color={chipColor}
                    />
                  );
                })}
              </Box>
            )}
          >
            {normalizedNames.map((array, arrayIndex) =>
              array.map((name) => (
                <MenuItem key={name} value={name}>
                  <Checkbox checked={selectedOptions.includes(name)} />
                  <ListItemText primary={name} />
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>
      </Grid>
    </Box>
  );
}


// Adding Procedures / Services

{/* Addable Component props */}
interface AddableComponentProps {
  id: number;
  place: number; // Add an order prop
  onDelete: (id: number) => void;
  disableDelete: boolean;
}

function Addable_Procedure_Service({
  id,
  place,
  onDelete,
  disableDelete,
}: AddableComponentProps) {
  return (
    <Paper elevation={1} style={{ padding: 16, margin: 8 }}>
          {/* Display the order number */}
      <div style={{ fontWeight: 'bold'}}>{place}</div>
      <Grid container spacing={1} alignItems="center">
        
        <Grid item xs={2}>
          <FormControl fullWidth variant="standard">
            <Input
              id={`procedures-services-code-${id}`}
              startAdornment={<InputAdornment position="start">Code:</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="standard">
            <Input
              id={`procedures-services-desc-${id}`}
              startAdornment={<InputAdornment position="start">Desc:</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="inherit"
            onClick={() => onDelete(id)}
            disabled={disableDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth variant="standard">
            <Input
              id={`procedures-services-note-${id}`}
              multiline
              startAdornment={<InputAdornment position="start">Note:</InputAdornment>}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Paper>
  );
}

function Procedures_Services() {
  const [components, setComponents] = useState<{ id: number }[]>([{ id: 1 }]);

  const handleAdd = () => {
    const nextId = components.length ? Math.max(...components.map((c) => c.id)) + 1 : 1;
    setComponents([...components, { id: nextId }]);
  };

  const handleDelete = (id: number) => {
    if (components.length > 1) {
      setComponents(components.filter((component) => component.id !== id));
    }
  };

  return (
    <Grid>
      {components.map((component, index) => (
        <Addable_Procedure_Service
          key={component.id}
          id={component.id}
          place={index + 1} // Pass the order number (index + 1)
          onDelete={handleDelete}
          disableDelete={components.length === 1} // Disable delete if only one item remains
        />
      ))}
      <IconButton onClick={handleAdd} color="success">
        <AddIcon />
      </IconButton>
    </Grid>
  );
}


// Add Order / Requistion

function Addable_Order_Requisition ({
  id,
  onDelete,
  disableDelete,
  place,
}:AddableComponentProps) 
{

  const [order, setOrder] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  }


  return (
    <Paper elevation={1} style={{ padding: 16, margin: 8 }}>
      <div style={{ fontWeight: 'bold'}}>{place}</div>
      <Grid container spacing={1} alignItems={'end'}>
        <Grid item xs={2}>
          <FormControl fullWidth variant="standard">
            <InputLabel id={`orders-requsition-order-${id}`}>Order</InputLabel>
            <Select
              labelId={`orders-requsition-order-select-${id}`}
              id={`orders-requsition-order-select-${id}`}
              value={order}
              onChange={handleChange}
              label="Order"
            >
              <MenuItem value={10}>Lab</MenuItem>
              <MenuItem value={20}>Rad</MenuItem>
              <MenuItem value={30}>Gen</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={9}>
          <FormControl fullWidth variant="standard">
            <Input
              id={`procedures-services-desc-${id}`}
              multiline
              startAdornment={<InputAdornment position="start">Requsition:</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="inherit"
            onClick={() => onDelete(id)}
            disabled={disableDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Paper>
  );
};

function Orders_Requisitions () {
  const [components, setComponents] = useState<{ id: number }[]>([{ id: 1 }]);

  const handleAdd = () => {
    const nextId = components.length ? Math.max(...components.map(c => c.id)) + 1 : 1;
    setComponents([...components, { id: nextId }]);
  };

  const handleDelete = (id: number) => {
    if (components.length > 1) {
      setComponents(components.filter((component) => component.id !== id));
    }
  };

  return (
    <Grid>
      {components.map((component, index) => (
        <Addable_Order_Requisition
          key={component.id}
          id={component.id}
          onDelete={handleDelete}
          place={index + 1}
          disableDelete={components.length === 1} // Disable delete if only one item remains
        />
      ))}
      <IconButton onClick={handleAdd} color="success">
        <AddIcon />
      </IconButton>
    </Grid>
  );
};

// Add Medications / Rx  


function Addable_Medication_Rx ({
  id,
  onDelete,
  disableDelete,
  place,
}:AddableComponentProps) 
{

  const [order, setOrder] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setOrder(event.target.value);
  }


  return (
    <Paper elevation={1} style={{ padding: 16, margin: 8 }}>
      <div style={{ fontWeight: 'bold'}}>{place}</div>
      <Grid container spacing={1} alignItems={'end'}>
        <Grid item xs={9}>
          <FormControl fullWidth variant="standard">
            <Input
              id={`medication-rx-${id}`}
              multiline
              startAdornment={<InputAdornment position="start">Rx:</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth variant="standard">
            <Select
              labelId={`medication-rx-unit-select-${id}`}
              id={`medication-rx-unit-select-${id}`}
              value={order}
              onChange={handleChange}
              label="unit"
            >
              <MenuItem value={10}>GEQ</MenuItem>
              <MenuItem value={20}>DAW</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            color="inherit"
            onClick={() => onDelete(id)}
            disabled={disableDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
        <Grid item xs={8}>
          <FormControl fullWidth variant="standard">
            <Input
              id={`medication-sig-${id}`}
              multiline
              startAdornment={<InputAdornment position="start">Sig:</InputAdornment>}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <SelectQty/>
        </Grid>
        <Grid item xs={2}>
          <SelectRefills/>
        </Grid>
      </Grid>
    </Paper>
  );
};

function Medications_Rx () {
  const [components, setComponents] = useState<{ id: number }[]>([{ id: 1 }]);

  const handleAdd = () => {
    const nextId = components.length ? Math.max(...components.map(c => c.id)) + 1 : 1;
    setComponents([...components, { id: nextId }]);
  };

  const handleDelete = (id: number) => {
    if (components.length > 1) {
      setComponents(components.filter((component) => component.id !== id));
    }
  };

  return (
    <Grid>
      {components.map((component, index) => (
        <Addable_Medication_Rx
          key={component.id}
          id={component.id}
          onDelete={handleDelete}
          place={index + 1}
          disableDelete={components.length === 1} // Disable delete if only one item remains
        />
      ))}
      <IconButton onClick={handleAdd} color="success">
        <AddIcon />
      </IconButton>
    </Grid>
  );
};


function SelectQty() {

  const options = [
    ...Array.from({ length: 120 }, (_, i) => i + 1), // Numbers 1 to 120
    125, 130, 135, 140, 145, 150, 160, 180, 220, 270, 360, 450, 540, 
    "1MO", "2MO", "3MO", // Monthly options
  ];
  const [qty, setQty] = useState<Number|String>('');

  const handleChange = (event: SelectChangeEvent<typeof qty>) => {
    setQty(event.target.value as Number|String);
  };

  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Qty</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={qty}
          onChange={handleChange}
          label="Status"
        >
          {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
      
    </div>
  );
}

function SelectRefills() {

  const options = [
    ...Array.from({ length: 12 }, (_, i) => i + 1)];
  const [refills, setRefills] = useState<Number|String>('');

  const handleChange = (event: SelectChangeEvent<typeof refills>) => {
    setRefills(event.target.value as Number);
  };

  return (
    <div>
      <FormControl variant="standard" fullWidth>
        <InputLabel id="demo-simple-select-standard-label">Refills</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={refills}
          onChange={handleChange}
          label="Status"
        >
          {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
        </Select>
      </FormControl>
      
    </div>
  );
}

// Select E/M Code:

function Select_Code () {

  const [code, setCode] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
      setCode(event.target.value);
    };
  return (
    <>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-standard-label">E/M Code:</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={code}
          onChange={handleChange}
          label="Code"
        >
          <MenuItem value={10}>90791 - Psychiatric diagnostic eval, no medical services</MenuItem>
          <MenuItem value={20}>90792 - Psychiatric diagnostic eval, w/medical services</MenuItem>
          <MenuItem value={30}>90832 - Psychotherapy, 30 min(actual time 16-37min)</MenuItem>
          <MenuItem value={40}>90834 - Psychotherapy, 45 min(actual time 38-52min)</MenuItem>
        </Select>
      </FormControl>
    </>
  );

}

// Select Code Basis

function Select_Code_Basis () {

  const [code, setCode] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
      setCode(event.target.value);
    };
  return (
    <>
      <FormControl fullWidth variant="standard">
        <InputLabel id="demo-simple-select-standard-label">Code Basis:</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={code}
          onChange={handleChange}
          label="Code Basis"
        >
          <MenuItem value={10}>Service</MenuItem>
          <MenuItem value={20}>Time</MenuItem>
        </Select>
      </FormControl>
    </>
  );


}

// Select Period

function Select_Period () {

  const [period, setPeriod] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
      setPeriod(event.target.value);
    };
  return (
    <>
      <FormControl fullWidth variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={period}
          onChange={handleChange}
          label="Follow-up Visit"
        >
          <MenuItem value={10}>PRN</MenuItem>
          <MenuItem value={20}>48 to 72 hours</MenuItem>
          <MenuItem value={30}>Tomorrow</MenuItem>
          <MenuItem value={40}>in 2 days</MenuItem>
          <MenuItem value={50}>after 2 days</MenuItem>
          <MenuItem value={60}>after 3 days</MenuItem>
          <MenuItem value={70}>after 4 days</MenuItem>
          <MenuItem value={80}>after 5 days</MenuItem>
          <MenuItem value={90}>after 6 days</MenuItem>
          <MenuItem value={100}>after 8 days</MenuItem>
          <MenuItem value={110}>after 10 days</MenuItem>
          <MenuItem value={120}>after 1 week</MenuItem>
          <MenuItem value={130}>after 2 weeks</MenuItem>
          <MenuItem value={140}>after 3 weeks</MenuItem>
          <MenuItem value={150}>after 6 weeks</MenuItem>
          <MenuItem value={160}>after 10 weeks</MenuItem>
          <MenuItem value={170}>after 1 month</MenuItem>
          <MenuItem value={180}>after 2 months</MenuItem>
          <MenuItem value={190}>after 3 months</MenuItem>
          <MenuItem value={200}>after 4 months</MenuItem>
          <MenuItem value={210}>after 6 months</MenuItem>
          <MenuItem value={220}>after 1 year</MenuItem>
          <MenuItem value={230}>if not improved</MenuItem>
          <MenuItem value={240}>if symptoms do not improve</MenuItem>
          <MenuItem value={250}>after testing</MenuItem>
          <MenuItem value={260}>after lab / xray</MenuItem>
          <MenuItem value={270}>by telephone</MenuItem>
          <MenuItem value={280}>call if not better</MenuItem>
          <MenuItem value={290}>no further followup needed</MenuItem>
          <MenuItem value={300}>as scheduled earlier</MenuItem>
        </Select>
      </FormControl>
    </>
  );


}

// Select Time
function Select_Time () {

  const [time, setTime] = useState<string>('');
  const handleChange = (event: SelectChangeEvent) => {
      setTime(event.target.value);
    };
  return (
    <>
      <FormControl fullWidth variant="standard">
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={time}
          onChange={handleChange}
          label="Join Work-School"
        >
          <MenuItem value={10}>after 2 days</MenuItem>
          <MenuItem value={20}>after 3 days</MenuItem>
          <MenuItem value={30}>after 4 days</MenuItem>
          <MenuItem value={40}>after 5 days</MenuItem>
          <MenuItem value={50}>after 6 days</MenuItem>
          <MenuItem value={60}>after 10 days</MenuItem>
          <MenuItem value={70}>after 1 week</MenuItem>
          <MenuItem value={80}>after 2 weeks</MenuItem>
          <MenuItem value={90}>after 3 weeks</MenuItem>
          <MenuItem value={100}>after 1 month</MenuItem>
          <MenuItem value={110}>after 2 months</MenuItem>
          <MenuItem value={120}>after 3 months</MenuItem>
        </Select>
      </FormControl>
    </>
  );


}












const PatientInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  phoneNumber: Yup.string()
    .required("Required")
    .matches(/^\d+$/, "Phone number must contain only digits"),
  email: Yup.string().email("Invalid email").required("Required"),
  age: Yup.number().required("Required").positive("Age must be positive"),
  bloodGroup: Yup.string().required("Required"),
  referredByDoctor: Yup.string().required("Required"),
  referredByDoctorEmail: Yup.string().email("Invalid email"),
  referredByDoctorPhoneNumber: Yup.string().matches(
    /^\d+$/,
    "Phone number must contain only digits"
  ),
  diseases: Yup.string().required("Required"),
  patientHistory: Yup.string(),
});

const PatientEncounterInfo = ({ patients }: any) => {
  const { id } = useParams<{ id: string }>();
  const patient = patients?.find(
    (patient: any) => patient.id === parseInt(id || "", 10)
  );

  const initialValues = {
    firstName: patient.firstName,
    lastName: patient.lastName,
    address: patient.address,
    phoneNumber: patient.phoneNumber,
    email: patient.email,
    age: patient.age,
    bloodGroup: patient.bloodGroup,
    referredByDoctor: patient.referredByDoctor,
    referredByDoctorEmail: patient.referredByDoctorEmail,
    referredByDoctorPhoneNumber: patient.referredByDoctorPhoneNumber,
    diseases: patient.diseases,
    patientHistory: patient.patientHistory,
  };
  const handleSubmit = (values: any, { resetForm }: any) => {
    console.log(values);
    //resetForm();
  };

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


  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({systolic:'', diastolic:'', temperature:'', weight:'', height:'', respiration:'', pulse:'',waist:'', spO2:''});

  const handleVitalSigns = (e: React.ChangeEvent<HTMLInputElement |  HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;
    if (name === "systolic") {
      setVitalSigns((prev) => ({
        ...prev,
        systolic: value as string,
      }));
    } else if (name === "diastolic") {
      setVitalSigns((prev) => ({
        ...prev,
        diastolic: value as string,
      }));
    } else if (name === "temperature") {
      setVitalSigns((prev) => ({
        ...prev,
        temperature: value as string,
      }));
    } else if (name === "weight") {
      setVitalSigns((prev) => ({
        ...prev,
        weight: value as string,
      }));
    } else if (name === "height") {
      setVitalSigns((prev) => ({
        ...prev,
        height: value as string,
      }));
    } else if (name === "respiration") {
      setVitalSigns((prev) => ({
        ...prev,
        respiration: value as string,
      }));
    } else if (name === "pulse") {
      setVitalSigns((prev) => ({
        ...prev,
        pulse: value as string,
      }));
    } else if (name === "spO2") {
      setVitalSigns((prev) => ({
        ...prev,
        spO2: value as string,
      }));
    } else if (name === "waist") {
      setVitalSigns((prev) => ({
        ...prev,
        waist: value as string,
      }))
    }
  };

  const bp1 = Array.from({ length: 221  }, (_, index) => index + 30);
  const bp2 = Array.from({ length: 131  }, (_, index) => index + 10);

  const tp: string[] = [];
  for (let i = 94; i <= 107; i += 0.1) {
    tp.push(i.toFixed(1)); // Convert to string with one decimal place
  }
  const pr = Array.from({ length: 161  }, (_, index) => index + 40);
  const rr = Array.from({ length: 64  }, (_, index) => index + 2);
  const sp02 = Array.from({ length: 91  }, (_, index) => index + 10);

  const ht: string[] = [];
  for (let i = 15; i <= 82; i += 0.5) {
    ht.push(i.toFixed(1)); // Convert to string with one decimal place
  }

  const wt: string[] = [];
  for (let i = 1; i <= 400; i += 0.5) {
    wt.push(i.toFixed(1)); // Convert to string with one decimal place
  }

  const waist: string[] = [];
  for (let i = 15; i <= 80; i += 0.5) {
    waist.push(i.toFixed(1)); // Convert to string with one decimal place
  }

  const general: string = "General";

  // nest list handle


  const [open, setOpen] = useState<Record<string, boolean>>({});

  const handleListClick = (section:string) => {
    setOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  }
  return (
    <Box sx={{ display: "flex" }}>
      <Appbar_Patient appBarTitle="ENCOUNTERS" id={patient.id} />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container sx={{ mt: 4, mb: 4 }}>
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Grid
              container
              spacing={2}
              sx={{ marginleft: "10px", padding: "20px" }}
            >           
              <Grid item xs={12}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={PatientInfoSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched }) => (
                    
                    <Form>
                      <Grid item xs={12} sm={12}>
                      <div className="setside">
                        <div className="left">
                          <IconButton component={Link} to="/patient-list" color="inherit">
                            <ArrowBackIcon />
                          </IconButton>
                        </div>                        
                      </div>
                        </Grid>  
                      
                     <Grid container rowSpacing={2} sx={{justifyContent: "space-between",alignItems: "center",}}>
                        <Grid item xs={12} sm={2}>
                          <Field
                            as={TextField}
                            name="id"
                            label="Chart"
                            fullWidth
                          />
                          
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="firstName"
                            label="First Name"
                            fullWidth
                            error={errors.firstName && touched.firstName}
                            helperText={touched.firstName && errors.firstName}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <Field
                            as={TextField}
                            name="lastName"
                            label="Last Name"
                            fullWidth
                            error={errors.lastName && touched.lastName}
                            helperText={touched.lastName && errors.lastName}
                          />
                        </Grid>                     
                        <Grid item xs={12} sm={1}>
                          <Field
                            as={TextField}
                            name="age"
                            label="Age"
                            fullWidth
                            error={touched.age && Boolean(errors.age)}
                            helperText={touched.age && errors.age}
                          />
                        </Grid>  
                        <Grid item xs={12} sm={2} style={{textAlign:'right', paddingRight:'0'}}>
                          <ClickableAvatar/>
                        </Grid>
                      
                      </Grid>                     
                      <Grid container spacing={2}>                        
                        <Grid item xs={6} sm={6}>
                        <div className="contact-information" style={styles.container}>
                            <Grid container rowSpacing={1} columnSpacing={1}>
                              <Grid item xs={4}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Encounter"
                                  multiline
                                  variant="standard"
                                  disabled
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                  <DatePicker label="Date"  slotProps={{ textField: { variant: 'standard', fullWidth: true } }} />
                                </LocalizationProvider>
                              </Grid>
                              <Grid item xs={4}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Type"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <TextField
                                  id="outlined-multiline-static"
                                  label="Attended by"
                                  multiline
                                  variant="standard"
                                  fullWidth
                                /> 
                              </Grid>                            
                            </Grid>                       
                          </div>
                          <div className="past-medical-history" style={styles.container} >
                            <h2>Chief Complaint / Encounter Reason</h2>
                              <Select_Checkbox />
                          </div>  
                          <div style={styles.container}>
                            <h2>History of Present Illness</h2>
                            <Grid container rowSpacing={2}>
                              <Grid item xs={12} sm={12}>
                                <TextField 
                                    id="past-medical-history"
                                    fullWidth
                                    InputProps={{
                                      style: {
                                        borderRadius: "0px",
                                      }
                                    }}
                                    multiline 
                                    rows={2}
                                    placeholder="Please write the past medical history" />
                              </Grid>
                              <Grid item xs={12} sm={12} sx={{mt:3}}>
                                <Select_History_Checkbox label="Location" names={location}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label='Quality' names={quality}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label="Severity" names={severity}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label="Duration" names={duration}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label="Onset - Timing" names={onset}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label="Context" names={context}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label="Modifying Factors" names={modifying}/>
                              </Grid>
                              <Grid item xs={12} sm={12}>
                                <Select_History_Checkbox label="Signs - Symptoms" names={signs}/>
                              </Grid>
                            </Grid>                            
                          </div>                         
                          <div style={styles.container}>
                            <Grid container spacing={1} sx={{display:"flex", alignItems:'end'}}>
                              <Grid item xs={11}>
                                <h2>Vital Signs</h2> 
                              </Grid>                
                              <Grid item xs={1} sx={{mb:2}}>
                                <VitalSignsModal />
                              </Grid>           
                              <Grid item container  xs={3}  sx={{display:"flex", alignItems:'end'}}>
                                <Grid item xs={5} >
                                  <FormControl variant="standard" fullWidth>
                                    <InputLabel id="vital-signs-bp-1">BP</InputLabel>
                                    <Select
                                        variant="standard"
                                        id="vital-signs-bp-2"
                                        IconComponent={() => null} 
                                        name="systolic"
                                        value={vitalSigns.systolic}
                                        onChange={handleVitalSigns}
                                      >
                                    
                                      {bp1.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                    </Select>
                                  </FormControl>
                                </Grid>
                                <Grid item xs={1} sx={{mt:2}}>
                                  <TextField variant="standard" id="vital-signs-bp-3" fullWidth disabled placeholder="/" />
                                </Grid>
                                <Grid item xs={5} >
                                  <FormControl variant="standard" fullWidth>
                                    <Select                                  
                                        id="vital-signs-bp-4"
                                        IconComponent={() => null} 
                                        name="diastolic"
                                        value={vitalSigns.diastolic}
                                        onChange={handleVitalSigns}
                                    >
                                        {bp2.map((name) => (
                                          <MenuItem key={name} value={name}>                                        
                                            <ListItemText primary={name} />
                                          </MenuItem>
                                        ))}                                    
                                    </Select>
                                  </FormControl>
                                </Grid>
                              </Grid>
                              <Grid item xs={3} >
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-tp-1">Tp</InputLabel>
                                  <Select
                                    id = 'vital-signs-tp-2'
                                    IconComponent={() => null} 
                                    value={vitalSigns.temperature}
                                    name="temperature"
                                    onChange={handleVitalSigns}
                                  >
                                    {tp.map((name) => (
                                      <MenuItem key={name} value={name}>                                        
                                        <ListItemText primary={name} />
                                      </MenuItem>
                                    ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>
                              <Grid item xs={3} >
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-pr-1">PR</InputLabel>
                                  <Select
                                      id="vital-signs-pr-2"
                                      IconComponent={() => null} 
                                      value={vitalSigns.pulse}
                                      name="pulse"
                                      onChange={handleVitalSigns}
                                    >
                                      {pr.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>     
                              <Grid item xs={3} >
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-rr-1">RR</InputLabel>
                                  <Select
                                      id="vital-signs-rr-2"
                                      IconComponent={() => null} 
                                      value={vitalSigns.respiration}
                                      name="respiration"
                                      onChange={handleVitalSigns}
                                    >
                                      {rr.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>                                                                      
                              <Grid item xs={3} >
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-ht-1">Ht</InputLabel>
                                  <Select
                                      id="vital-signs-ht-2"
                                      IconComponent={() => null} 
                                      value={vitalSigns.height}
                                      name="height"
                                      onChange={handleVitalSigns}
                                    >
                                      {ht.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>  
                              <Grid item xs={3}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-wt-1">Wt</InputLabel>
                                  <Select
                                      id="vital-signs-wt-2"
                                      IconComponent={() => null} 
                                      value={vitalSigns.weight}
                                      name="weight"
                                      onChange={handleVitalSigns}
                                    >
                                      {wt.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>  
                              <Grid item xs={3}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-waist-1">Waist</InputLabel>
                                  <Select
                                      id="vital-signs-waist-2"
                                      IconComponent={() => null} 
                                      value={vitalSigns.waist}
                                      onChange={handleVitalSigns}
                                      name="waist"
                                    >
                                      {waist.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>
                              <Grid item xs={3}>
                                <FormControl variant="standard" fullWidth>
                                  <InputLabel id="vital-signs-spo2-1">SpO2</InputLabel>
                                  <Select
                                      id="vital-signs-spo2-2"
                                      IconComponent={() => null} 
                                      value={vitalSigns.spO2}
                                      name="spO2"
                                      onChange={handleVitalSigns}
                                    >
                                      {sp02.map((name) => (
                                        <MenuItem key={name} value={name}>                                        
                                          <ListItemText primary={name} />
                                        </MenuItem>
                                      ))}                                    
                                  </Select>
                                </FormControl>                   
                              </Grid>                 
                            </Grid>
                          </div> 
                          <div style={styles.container}>
                            <h2>Review of Systems</h2>
                            <Grid item xs={12} sm={12}>
                              <CheckboxComGen nameCheckbox="General" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxEyes nameCheckbox="Eyes" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxENMT nameCheckbox="ENMT" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxCardiovascular nameCheckbox="Cardiovascular" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxRespiratory nameCheckbox="Respiratory" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxGastrointestinal nameCheckbox="Gastrointestinal" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxGenitourinaryMale nameCheckbox="Genitourinary Male" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxGenitourianryFemale nameCheckbox="Genitourinary Female" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxMusculoskeletal nameCheckbox="Musculoskeletal" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxSkin nameCheckbox="Skin" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxNeurologic nameCheckbox="Neurologic" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxPsychiatric nameCheckbox="Psychiatric" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxEndocrine nameCheckbox="Endocrine" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxHematologic nameCheckbox="Hematologic-Lymphatic" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <CheckboxAllergic nameCheckbox="Allergic-Immunologic" /> 
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <TextField fullWidth sx={{ m: 1 }} id="standard-basic"  variant="standard" />
                            </Grid> 
                                                                                          
                            
                          </div>
                          <div style={styles.container}>
                            <Grid container spacing={2}>                            
                              <Grid item xs={12} sm={12}>
                                <FormControlLabel control={<Checkbox  />} label="Reviewed Past, Family and Social History" />
                              </Grid> 
                              <Grid item xs={6} sm={6}>                              
                                  <FormControlLabel control={<Checkbox  />} label="Obtained old records" />
                                  <FormControlLabel control={<Checkbox  />} label="Interpreted tests data" />
                              </Grid>
                              <Grid item xs={6} sm={6}>
                                  <FormControlLabel control={<Checkbox  />} label="Summarized old records" />
                                  <FormControlLabel control={<Checkbox  />} label="Discussed / Reviewed tests" />                              
                              </Grid>
                            </Grid>
                          </div> 
                                                                         
                        </Grid>                          
                        <Grid item xs={6} sm={6}>
                          <div style={styles.container}>
                            <h2>Physical Examination</h2>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("constitutional")}}>
                                <ListItemText primary="Constitutional" />
                                {open.constitutional ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.constitutional} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="General Appearance" names={general_1} />
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("eyes")}}>
                                <ListItemText primary="Eyes" />
                                {open.eyes ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.eyes} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Conjunctivae-Lids" names={conjunctivae_2} subname={eyes_1}/>
                                  <Select_Checkbox_Switch label="Pupil-Iris Exam" names={pupil_2} subname={eyes_2}/>
                                  <Select_Checkbox_Switch label="Optic Disc Exam" names={optic_2} subname={eyes_3}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("enmt")}}>
                                <ListItemText primary="ENMT" />
                                {open.enmt ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.enmt} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="External Ears-Nose" names={external_3} subname={enmt_1}/>
                                  <Select_Checkbox_Switch label="Canals-TM Exam" names={canal_3} subname={enmt_2}/>
                                  <Select_Checkbox_Switch label="Hearing Assessment" names={hearing_3} subname={enmt_3}/>
                                  <Select_Checkbox_Switch label="Mucosa-Sept-Turb" names={mucosa_3} subname={enmt_4}/>
                                  <Select_Checkbox_Switch label="Lips-Teeth-Gums" names={lips_3} subname={enmt_5}/>
                                  <Select_Checkbox_Switch label="Oropharynx Exam" names={oroph_3} subname={enmt_6}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("neck")}}>
                                <ListItemText primary="Neck" />
                                {open.neck ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.neck} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Neck Exam" names={neck_4} subname={neck_1}/>
                                  <Select_Checkbox_Switch label="Thyroid Exam" names={thyroid_4} subname={neck_2}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("respiratory")}}>
                                <ListItemText primary="Respiratory" />
                                {open.respiratory ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.respiratory} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Respiratory Effort" names={respiratory_5} subname={respiratory_1}/>
                                  <Select_Checkbox_Switch label="Chest Percussion" names={chestper_5} subname={respiratory_2}/>
                                  <Select_Checkbox_Switch label="Chest Palpation" names={chestpal_5} subname={respiratory_3}/>
                                  <Select_Checkbox_Switch label="Lungs Auscultation" names={lungs_5} subname={respiratory_4}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("cardiovascular")}}>
                                <ListItemText primary="Cardiovascular" />
                                {open.cardiovascular ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.cardiovascular} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Heart Palpation" names={heartpal_6} subname={cardiovascular_1}/>
                                  <Select_Checkbox_Switch label="Heart Auscultation" names={heartaus_6} subname={cardiovascular_2}/>
                                  <Select_Checkbox_Switch label="Carotid Arteries" names={carotid_6} subname={cardiovascular_3}/>
                                  <Select_Checkbox_Switch label="Abdominal Aorta" names={abdominal_6} subname={cardiovascular_4}/>
                                  <Select_Checkbox_Switch label="Femoral Arteries" names={femoral_6} subname={cardiovascular_5}/>
                                  <Select_Checkbox_Switch label="Pedal Pulses" names={pedal_6} subname={cardiovascular_6}/>
                                  <Select_Checkbox_Switch label="Extremities" names={extremities_6} subname={cardiovascular_7}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("breasts")}}>
                                <ListItemText primary="Breasts" />
                                {open.breasts ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.breasts} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Breasts Inspection" names={breastsinspec_7} subname={breasts_1}/>
                                  <Select_Checkbox_Switch label="Breasts Palpation" names={breastpal_7} subname={breasts_2}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("gastrointestinal")}}>
                                <ListItemText primary="Gastrointestinal" />
                                {open.gastrointestinal ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.gastrointestinal} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Abdomen Exam" names={abodomen_8} subname={gastrointestinal_1}/>
                                  <Select_Checkbox_Switch label="Liver-Spleen" names={liver_8} subname={gastrointestinal_2}/>
                                  <Select_Checkbox_Switch label="Hernia" names={hernia_8} subname={gastrointestinal_3}/>
                                  <Select_Checkbox_Switch label="Anus-Perineum-Rectum" names={anus_8} subname={gastrointestinal_4}/>
                                  <Select_Checkbox_Switch label="Stool Occult" names={stool_8} subname={gastrointestinal_5}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("genitourinary_female")}}>
                                <ListItemText primary="Genitourinary Female" />
                                {open.genitourinary_female ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.genitourinary_female} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Genitalia" names={genitalia_9} subname={genitourinary_female_1}/>
                                  <Select_Checkbox_Switch label="Urethra" names={urethra_9} subname={genitourinary_female_2}/>
                                  <Select_Checkbox_Switch label="Bladder" names={bladder_9} subname={genitourinary_female_3}/>
                                  <Select_Checkbox_Switch label="Cervix" names={cervix_9} subname={genitourinary_female_4}/>
                                  <Select_Checkbox_Switch label="Uterus" names={uterus_9} subname={genitourinary_female_5}/>
                                  <Select_Checkbox_Switch label="Adnexa" names={adnexa_9} subname={genitourinary_female_6}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("genitourinary_male")}}>
                                <ListItemText primary="Genitourinary Male" />
                                {open.genitourinary_male ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.genitourinary_male} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Scrotum" names={scrotum_10} subname={genitourinary_male_1}/>
                                  <Select_Checkbox_Switch label="Penis" names={penis_10} subname={genitourinary_male_2}/>
                                  <Select_Checkbox_Switch label="Prostate" names={prostate_10} subname={genitourinary_male_3}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("lymphatic")}}>
                                <ListItemText primary="Lymphatic" />
                                {open.lymphatic ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.lymphatic} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Neck Nodes" names={necknode_11} subname={lymphatic_1}/>
                                  <Select_Checkbox_Switch label="Axillae Nodes" names={axillae_11} subname={lymphatic_2}/>
                                  <Select_Checkbox_Switch label="Groin Nodes" names={groin_11} subname={lymphatic_3}/>
                                  <Select_Checkbox_Switch label="Generalized" names={generalized_11} subname={lymphatic_4}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("musculoskeletal")}}>
                                <ListItemText primary="Musculoskeletal" />
                                {open.musculoskeletal ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.musculoskeletal} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Gait-Station" names={gait_12} subname={musculoskeletal_1}/>
                                  <Select_Checkbox_Switch label="Digits-Nails" names={digits_12} subname={musculoskeletal_2}/>
                                  <Select_Checkbox_Switch label="Joints-Bones-Muscles" names={joints_12} subname={musculoskeletal_3}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("skin")}}>
                                <ListItemText primary="Skin" />
                                {open.skin ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.skin} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Skin Inspection" names={skininspection_13} subname={skin_1}/>
                                  <Select_Checkbox_Switch label="Skin Palpation" names={skinpal_13} subname={skin_2}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("neurologic")}}>
                                <ListItemText primary="Neurologic" />
                                {open.neurologic ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.neurologic} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Cranial Nerves" names={cranial_14} subname={neurologic_1}/>
                                  <Select_Checkbox_Switch label="DTR Exam" names={dtr_14} subname={neurologic_2}/>
                                  <Select_Checkbox_Switch label="Sensory Exam" names={sensory_14} subname={neurologic_3}/>
                                </Grid>
                              </Collapse>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                              <ListItemButton onClick={()=>{handleListClick("psychiatric")}}>
                                <ListItemText primary="Psychiatric" />
                                {open.psychiatric ? <ExpandLess /> : <ExpandMore />}
                              </ListItemButton>
                              <Collapse in={open.psychiatric} timeout="auto" unmountOnExit>
                                <Grid sx={{pl:4}}>
                                  <Select_Checkbox_Switch label="Judgment-Insight" names={judgment_15} subname={psychiatric_1}/>
                                  <Select_Checkbox_Switch label="Orientation TPP" names={orientation_15} subname={psychiatric_2}/>
                                  <Select_Checkbox_Switch label="Recent Remote Memory" names={recent_15} subname={psychiatric_3}/>
                                  <Select_Checkbox_Switch label="Mood-Affect" names={mood_15} subname={psychiatric_4}/>
                                </Grid>
                              </Collapse>
                            </Grid>
            
                            <Grid item xs={12} sm={12}>
                              <TextField fullWidth sx={{ m: 1 }} id="standard-basic"  variant="standard" />
                            </Grid>                   
                          </div> 
                          <div style={styles.container}>
                            <h2>Order / Requistion</h2>
                            <Orders_Requisitions />                                          
                          </div>  
                          <div style={styles.container}>
                            <h2>Medications / Rx</h2>
                            <Medications_Rx />                                          
                          </div> 
                          <div style={styles.container}>
                            <Grid container spacing={1} >
                              <Grid container item xs={4} alignItems={'end'}>
                                <Grid item xs={9}>
                                  <Select_Code/>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={4} container alignItems={"end"}>
                                <Grid item xs={9}>
                                  <Select_Code_Basis/>
                                </Grid>
                                <Grid item xs={3}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                              </Grid>
                              <Grid item xs={4} container alignItems={"end"}>
                                <Grid item xs={9}>
                                  <TextField
                                    id="outlined-multiline-static"
                                    variant="standard"
                                    fullWidth
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <IconButton color="success">
                                    <CalculateIcon/>
                                  </IconButton>
                                </Grid>
                              </Grid>
                              <Grid item container xs={4} alignItems={'center'}>
                                <Grid item xs={3}>
                                  <IconButton color="success" component={Link} to="/calender" >
                                    <ScheduleIcon/>
                                  </IconButton>
                                </Grid>
                                <Grid item xs={9}>
                                  <label>Follow-up Visit:</label>
                                </Grid>
                              </Grid>
                              <Grid item xs={8}>
                                <Select_Period/>
                              </Grid>
                              <Grid item xs={4}>
                                <label>Join Work-School:</label>
                              </Grid>
                              <Grid item xs={8}>
                                <Select_Time/>
                              </Grid>
                            </Grid>
                          </div>
                          <div style={styles.container}>
                            <h2>Procedures / Services</h2>
                            <Grid container spacing={2}>                                                        
                              <Procedures_Services />                                                      
                            </Grid>
                          </div>
                          {/* Refer patient */}                    
                        </Grid>                      
                      </Grid>                     
                      <br />
                      <Grid container justifyContent="flex-end">
                        <Grid item xs={2} sm={1}>
                          <Button
                            component={Link}
                            to="/patient-list"
                            color="inherit"
                          >
                            Cancel
                          </Button>
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button type="submit" variant="contained">
                            Save
                          </Button>                          
                        </Grid>
                        <Grid item xs={2} sm={1}>
                          <Button 
                           component={Link}
                           to={`/patient-info-history/${patient.id}`}
                           color="warning"
                           variant="contained"
                           >
                            History
                          </Button>                          
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};


const styles = {
  container: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding: '20px',
    margin: 'auto',
    marginTop: '20px',
  },
  header: {
    textAlign: 'center',
  },
   subHeader: {
    marginTop: '20px',
  },
  field: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  label: {
    marginLeft: '10px',
    width:'20%',
  },
  input: {
    flex: 1,
    marginLeft: '10px',
    padding: '5px',
    border: '1px solid lightgray',
    borderRadius: '3px',
  },
 
};
export default PatientEncounterInfo;
