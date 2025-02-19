import React, { useState, useRef, useEffect } from "react";
import {
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Modal,
  Box,
  Typography,
  IconButton,
  Button,
  Container,
  Paper,
  Grid,
  TextField,
  Dialog,
  Tabs,
  Tab,
  FormControl,
  Checkbox,
  FormControlLabel,
  Input,
  InputAdornment,

} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";
import { useParams } from "react-router-dom";
import axios from "axios";
import Draggable from 'react-draggable';
import { CheckBox } from "@mui/icons-material";

function PaperComponent(props:any) {
    const nodeRef = React.useRef(null);
    return (
      <Draggable
        nodeRef={nodeRef}
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Box {...props} ref={nodeRef} />
      </Draggable>
    );
  }

  interface Patient {
    CSN: string;
    FIRST_NAME: string;
    LAST_NAME: string;
    PHOTO: string;
    AGE: string;
    INFORMATION: {
      personalInformation: PersonalInformation;
      contactInformation: ContactInformation;
      workInformation: WorkInformation;
      insurance: Insurance;
    };
  }
  
  interface PersonalInformation {
    id: string,
    mrn: string,
    dob: string,
    gender: string,
    marriage: string,
    siblings: string,
    race: string,
    pharamacy: string,
    other: string
  }
  
  interface ContactInformation {
    address: string,
    city: string,
    postcode: string,
    country: string,
    state: string,
    homeph: string,
    cellph: string,
    email: string,
    emergency: string
  }
  
  interface WorkInformation {
    status: string,
    workph: string,
    employer: string
  }
  
  interface Insurance {
    carrier: string,
    address: string,
    city: string,
    postcode: string,
    country: string,
    state: string,
    phone: string,
    facsimile: string,
    plan: string,
    expiry: string,
    idno: string,
    groupno: string,
    copay: string,
    authno: string,
    remarks: string,
    relation: string,
    homeph: string,
    lastname: string,
    firstname: string,
    mi: string,
    dob: string,
    gender: string
  }

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




const PrintDialog = (props:{open:boolean; handleClose:any;}) => {
  const {id, encounterID} = useParams<{id:string; encounterID:string}>();

    const [requisition, setRequisition] = useState("");
    const [selectedTab, setSelectedTab] = useState(0);
    const [tel, setTel] = useState("");
    const [fax, setFax] = useState("");
    const [labOrders, setLabOrders] = useState<{ id: number; orderType: string; requisition: string }[]>([
        { id: 1, orderType: '', requisition: '' },
      ]);
    const [radOrders, setRadOrders] = useState<{ id: number; orderType: string; requisition: string }[]>([
        { id: 1, orderType: '', requisition: '' },
      ]);
    const [genOrders, setGenOrders] = useState<{ id: number; orderType: string; requisition: string }[]>([
        { id: 1, orderType: '', requisition: '' },
      ]);
    const printRef = useRef<HTMLDivElement>(null);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [personalInformation, setPersonalInformation] = useState<PersonalInformation>({id:"", mrn:"", dob:"", gender:"", marriage:"", siblings:"", race:"", pharamacy:"", other:""});
    const [contactInformation, setContactInformation] = useState<ContactInformation>({address: "",city: "",postcode: "",country: "",state: "",homeph: "",cellph: "",email: "",emergency: ""});
    const [insurance, setInsurance] = useState<Insurance>({carrier: "",address: "",city: "",postcode: "", country: "",state: "",phone: "",facsimile: "",plan: "",expiry: "",idno: "",groupno: "",copay: "",authno: "",remarks: "",relation: "",homeph: "",lastname: "",firstname: "",mi: "",dob: "",gender: ""});
    const [workInformation, setWorkInformation] = useState<WorkInformation>({status:"", workph:"",employer:""});

    const [head, setHead] = useState<Head>({date:"", type:"", attendBy:""});
    const [reviewOfSystems, setReviewOfSystems] = useState<ReviewOfSystems>({
    general: {fevers: false, sweats: false, weightLoss: false, Chills: false, appetiteLoss: false, fatigue: false },
    eyes: {visionLoss: false, doubleVision: false, blurredVision: false, eyeIrritation: false, eyePain: false, lightSensitivity: false },
    eNMT: {earache: false, earDischarge: false, ringingInTheEars: false, decreasedHearing: false, frequentColds: false, nasalCongestion: false, nosebleeds: false, bleedingGums: false, difficultySwallowing: false, hoarseness: false, soreThroat: false },
    cardiovascular: {difficultyBreathingAtNight: false, chestPainOrDiscomfort: false, irregularHeartBeats: false, fatigue: false, lightheadedness: false, shortnessOfBreathWithExertion: false, palpitations: false, swellingOfHandsOrFeet: false, difficultyBreathingWhileLyingDown: false, legCrampsWithExertion: false, discolorationOfLipsOrNails: false, recentWeightGain: false },
    respiratory: {sleepDisturbancesDueToBreathing: false, cough: false, coughingUpBlood: false, shortnessOfBreath: false, chestDiscomfort: false, wheezing: false, excessiveSputum: false, excessiveSnoring: false },
    gastrointestinal: {changeInAppetite: false, indigestion: false, heartburn: false, nausea: false, vomiting: false, excessiveGas: false, abdominalPain: false, abdominalBloating: false, hemorrhoids: false, diarrhea: false, changeInBowelHabits: false, constipation: false, blackOrTarryStools: false, bloodyStools: false },
    genitourinaryMale: {frequentUrination: false, bloodInUrine: false, foulUrinaryDischarge: false, kidneyPain: false, urinaryUrgency: false, troubleStartingUrinaryStream: false, inabilityToEmptyBladder: false, burningOrPainOnUrination: false, genitalRashesOrSores: false, testicularPainOrMasses: false },
    genitourinaryFemale: {inabilityToControlBladder: false, unusualUrinaryColor: false, missedPeriods: false, excessivelyHeavyPeriods: false, lumpsOrSores: false, pelvicPain: false },
    musculoskeletal: {jointPain: false, jointStiffnessOrSwelling: false, muscleCramps: false, muscleAches: false, lossOfStrength: false, backOrNeckPain: false, muscleWeakness: false },
    skin: {suspiciousLesions: false, excessivePerspiration: false, dryness: false, rash: false, changesInHairOrNails: false, nightSweats: false, poorWoundHealing: false, itching: false, flushing: false, changesInColorOfSkin: false },
    neurologic: {headaches: false, weaknessOrNumbness: false, tingling: false, faintsOrBlackouts: false, tremors: false, memoryLoss: false, poorBalance: false, difficultyWithSpeaking: false, difficultyWithConcentration: false, disturbancesInCoordination: false, briefParalysis: false, visualDisturbances: false, seizures: false, sensationOfRoomSpinning: false, excessiveDaytimeSleeping: false },
    psychiatric: {Anxiety: false, Depression: false, Nervousness: false, memoryChange: false, frighteningVisionsOrSounds: false, thoughtsOfSuicideOrViolence: false },
    endocrine: {heatOrColdIntolerance: false, weightChange: false, excessiveThirstOrHunger: false, excessiveSweatingOrUrination: false },
    hematologicLymphatic: {skinDiscoloration: false, enlargedLymphNodes: false, bleeding: false, fevers: false, abnormalBruising: false },
    allergicImmunologic: {seasonalAllergies: false, persistentInfections: false, hivesOrRash: false, hIVExposure: false },
    checkReview:{checkGeneral:false, checkEyes:false, checkENMT:false, checkCardiovascular:false, checkRespiratory:false, checkGastrointestinal:false, checkGenitourinaryMale:false, checkGenitourinaryFemale:false, checkMusculoskeletal:false, checkSkin:false, checkNeurologic:false, checkPsychiatric:false, checkEndocrine:false, checkHematologicLymphatic:false, checkAllergicImmunologic:false,},
  });
  const [chief, setChief] = useState<string>("");
  const [historyOfIllness, setHistoryOfIllness] = useState<HistoryOfIllness>({Location:"", Quality:"", Severity:"", Duration:"", OnsetTiming:"", Context:"", ModifyingFactors:"", SignsSymptoms:"",})
  const [vitalSigns, setVitalSigns] = useState<VitalSigns>({systolic:"", diastolic:"", temperature:"", weight:"", height:"", respiration:"", pulse:"", spO2:"", waist:"",})
  const [physicalExamination, setPhysicalExamination] = useState<PhysicalExamination>({constitutional_1:{ frontCheck: false, backCheck: false, textfield: "" },
    eyes_1:{ frontCheck: false, backCheck: false, textfield: "" }, eyes_2:{ frontCheck: false, backCheck: false, textfield: "" }, eyes_3:{ frontCheck: false, backCheck: false, textfield: "" },
    enmt_1:{ frontCheck: false, backCheck: false, textfield: "" }, enmt_2:{ frontCheck: false, backCheck: false, textfield: "" }, enmt_3:{ frontCheck: false, backCheck: false, textfield: "" }, enmt_4:{ frontCheck: false, backCheck: false, textfield: "" }, enmt_5:{ frontCheck: false, backCheck: false, textfield: "" }, enmt_6:{ frontCheck: false, backCheck: false, textfield: "" },
    neck_1:{ frontCheck: false, backCheck: false, textfield: "" }, neck_2:{ frontCheck: false, backCheck: false, textfield: "" },
    respiratory_1:{ frontCheck: false, backCheck: false, textfield: "" }, respiratory_2:{ frontCheck: false, backCheck: false, textfield: "" }, respiratory_3:{ frontCheck: false, backCheck: false, textfield: "" }, respiratory_4:{ frontCheck: false, backCheck: false, textfield: "" },
    cardiovascular_1:{ frontCheck: false, backCheck: false, textfield: "" }, cardiovascular_2:{ frontCheck: false, backCheck: false, textfield: "" }, cardiovascular_3:{ frontCheck: false, backCheck: false, textfield: "" }, cardiovascular_4:{ frontCheck: false, backCheck: false, textfield: "" }, cardiovascular_5:{ frontCheck: false, backCheck: false, textfield: "" }, cardiovascular_6:{ frontCheck: false, backCheck: false, textfield: "" }, cardiovascular_7:{ frontCheck: false, backCheck: false, textfield: "" },
    breasts_1:{ frontCheck: false, backCheck: false, textfield: "" }, breasts_2:{ frontCheck: false, backCheck: false, textfield: "" },
    gastrointestinal_1:{ frontCheck: false, backCheck: false, textfield: "" }, gastrointestinal_2:{ frontCheck: false, backCheck: false, textfield: "" }, gastrointestinal_3:{ frontCheck: false, backCheck: false, textfield: "" }, gastrointestinal_4:{ frontCheck: false, backCheck: false, textfield: "" }, gastrointestinal_5:{ frontCheck: false, backCheck: false, textfield: "" },
    genitourinaryFemale_1:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryFemale_2:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryFemale_3:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryFemale_4:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryFemale_5:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryFemale_6:{ frontCheck: false, backCheck: false, textfield: "" },
    genitourinaryMale_1:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryMale_2:{ frontCheck: false, backCheck: false, textfield: "" }, genitourinaryMale_3:{ frontCheck: false, backCheck: false, textfield: "" },
    lymphatic_1:{ frontCheck: false, backCheck: false, textfield: "" }, lymphatic_2:{ frontCheck: false, backCheck: false, textfield: "" }, lymphatic_3:{ frontCheck: false, backCheck: false, textfield: "" }, lymphatic_4:{ frontCheck: false, backCheck: false, textfield: "" },
    musculoskeletal_1:{ frontCheck: false, backCheck: false, textfield: "" }, musculoskeletal_2:{ frontCheck: false, backCheck: false, textfield: "" }, musculoskeletal_3:{ frontCheck: false, backCheck: false, textfield: "" },
    skin_1:{ frontCheck: false, backCheck: false, textfield: "" }, skin_2:{ frontCheck: false, backCheck: false, textfield: "" },
    neurologic_1:{ frontCheck: false, backCheck: false, textfield: "" }, neurologic_2:{ frontCheck: false, backCheck: false, textfield: "" }, neurologic_3:{ frontCheck: false, backCheck: false, textfield: "" }, 
    psychiatric_1:{ frontCheck: false, backCheck: false, textfield: "" }, psychiatric_2:{ frontCheck: false, backCheck: false, textfield: "" }, psychiatric_3:{ frontCheck: false, backCheck: false, textfield: "" }, psychiatric_4:{ frontCheck: false, backCheck: false, textfield: "" },});
    const [open, setOpen] = useState<Record<string, boolean>>({});  
    const [presentIllness, setPresentIllness] = useState<string>("");
    
    const [medications, setMedications] = useState<{ id: number; unit: string; qty: string; refills:string; sig: string; rx: string }[]>([
      { id: 1, unit: '', qty: '', refills: '', sig: '', rx: '' },
    ]);
    const [orders, setOrders] = useState<{ id: number; orderType: string; requisition: string }[]>([
      { id: 1, orderType: '', requisition: '' },
    ]);
    const [assessments, setAssessments] = useState<{id: number; code: string; onset: string; nature:string; desc:string; note:string}[]>([
      { id: 1, code: '', onset: '', nature: '', desc: '', note: ''}
    ]);
    const [procedures, setProcedures] = useState<{ id: number; code: string; description: string; note: string }[]>([
      { id: 1, code: '', description: '', note: '' },
    ]);
    const [ongoings, setOngoings] = useState<{id: number; code: string; onset: string; status:string; desc:string; note:string}[]>([
      { id: 1, code: '', onset: '', status: '', desc: '', note: ''}
    ]);
    const [meeting, setMeeting] = useState<Meeting>({emcode:"", emcodeEdit:"", codeBasis:"", codeBasisEdit:"", calculation:"", period:"", time:"",})
    const cleanString = (str:string) => {
      return str.replace(/\\{1,}/g, '').replace(/^"|"$/g, '');  // Removes all escape characters
    };


    useEffect(()=>{
        const fetchData = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/encounter/${id}/${encounterID}`);
            const data = response.data;
            setHead(JSON.parse(data.head || '{}'));
            setReviewOfSystems(JSON.parse(data.reviewOfSystems || '{}'));
            setChief(cleanString(data.chief || ''));
            setHistoryOfIllness(JSON.parse(data.historyOfIllness || '{}'));
            setVitalSigns(JSON.parse(data.vitalSigns || '{}'));
            setPhysicalExamination(JSON.parse(data.physicalExamination || '{}'));
            setMeeting(JSON.parse(data.meeting || '{}'));
            setOpen(JSON.parse(data.open || '{}'));
            setPresentIllness(JSON.parse(data.presentIllness || ""));
              // 
            if (data.medications && data.medications.length > 0) {
              // Update medications state with the fetched data
              setMedications(data.medications.map((med:any) => ({
                id: med.id, order: med.unit, qty: med.qty, refills: med.refills, sig: med.sig, rx: med.rx
              })));
            }
    
            // Set orders data if available
            if (data.orders && data.orders.length > 0) {
                // Update the orders state first
                setOrders(data.orders.map((order: any) => ({
                    id: order.id,
                    orderType: order.orderType,
                    requisition: order.requisition
                })));
            
                // Then filter the orders that match "Lab" after the state update
                const labOrders = data.orders.filter((order: any) => order.orderType == "Lab");
                // Set the lab orders state
                setLabOrders(labOrders);
                const genOrders = data.orders.filter((order:any)=>order.orderType == "Gen")
                setGenOrders(genOrders);
                const radOrders = data.orders.filter((order:any)=>order.orderType == "Rad");
                setRadOrders(radOrders);
            }
            console.log(orders);
            // Set procedures data if available
            if (data.procedures && data.procedures.length > 0) {
              setProcedures(data.procedures.map((procedure:any) => ({
                id: procedure.id, code: procedure.code, description: procedure.description, note: procedure.note
              })));
            }
    
            // Set assess,emts data of available
            if (data.assessments && data.assessments.length > 0) {
              setAssessments(data.assessments.map((assessment:any) => ({
                id: assessment.id, code: assessment.mastercode, desc: assessment.description, note: assessment.note, onset:assessment.onset, nature:assessment.nature
              })));
            }

          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
        fetchData();
      },[id, encounterID]);

      useEffect(() => {
        const fetchPatient = async () => {
          try {
            const response = await axios.get(`http://localhost:5000/api/general/${id}`);
            const patientData = response.data;

            setFirstName(patientData.FIRST_NAME || "");
            setLastName(patientData.LAST_NAME || "");
            setPersonalInformation(patientData.INFORMATION.personalInformation || {});
            setContactInformation(patientData.INFORMATION.contactInformation || {});
            setInsurance(patientData.INFORMATION.insurance || {});
            setWorkInformation(patientData.INFORMATION.workInformation || {});

          } catch (err) {
            console.error("Error fetching patient data:", err);
          } 
    
        };
        fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/history/${id}`);
        const data = response.data;
        if (data.masterProblemLists && data.masterProblemLists.length > 0) {
          setOngoings(data.masterProblemLists.map((med:any) => ({
            id: med.id, status: med.masterstatus, code: med.mastercode, onset: med.onset, desc: med.description,
          })));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [id]);

  const handlePrint = () => {
    if (printRef.current) {
      const printContent = printRef.current.outerHTML;
  
      // Create an iframe
      const printWindow = document.createElement("iframe");
      printWindow.style.position = "absolute";
      printWindow.style.top = "-10000px"; // Hide the iframe offscreen
      document.body.appendChild(printWindow);
  
      const doc = printWindow.contentDocument || printWindow.contentWindow?.document;
  
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <title>Print</title>
              <style>
                /* Add any styles you want to apply to the printed content */
                body { font-family: Arial, sans-serif; margin: 20px; }
                h2, h4 { margin: 0; }
                .print-container { padding: 16px; border: 1px solid #ccc; }
              </style>
            </head>
            <body>
              ${printContent}
            </body>
          </html>
        `);
        doc.close();
      }
  
      // Wait for the iframe to load the content
      printWindow.onload = () => {
        printWindow.contentWindow?.focus();
        printWindow.contentWindow?.print();
  
        // Cleanup: Remove the iframe after printing
        setTimeout(() => {
          document.body.removeChild(printWindow);
        }, 1000);
      };
    }
  };
  
  const handleTabChange = (event: React.SyntheticEvent, newValue: string | number) => {
    setSelectedTab(newValue as number);
  };
  const renderTabContent = () => {
    switch (selectedTab) {
      case 0:
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
                <label>REQUISITION</label>
            </div>

            <div>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>

            <div>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label style={labelStyle}>Tel</label>
                    <input 
                    type="text" 
                    value={tel}
                    onChange={(e:any) => setTel(e.target.value)} 
                    style={inputStyle} 
                    />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label style={labelStyle}>Fax</label>
                    <input 
                        type="text" 
                        value={fax}
                        onChange={(e:any) => setFax(e.target.value)} 
                        style={inputStyle} 
                    />
                    
                </div>
            </div>

            <div>
            <h4>This is a request for laboratory services for:</h4>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
                <input 
                type="text" 
                placeholder="Name"
                value={lastName+" "+firstName}
                style={inputStyle} 
                />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>DOB:</label>
                    <input 
                        type="text" 
                        value={personalInformation.dob}
                        onChange={(e) => setPersonalInformation({ ...personalInformation, dob: e.target.value })} 
                        style={inputStyle} 
                    />
                </div>
            </div>
            </div>

            

            <div>
                {labOrders.map((labOrder, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                    <input 
                        type="text" 
                        value={labOrder.requisition} 
                        readOnly
                        style={inputStyle} 
                    />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={labelStyle}>ICDs:</label>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>

            <div>
            {ongoings.map((ongoing, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                <input 
                    type="text" 
                    value={`${ongoing.code} ${ongoing.desc}`} 
                    readOnly
                    style={inputStyle} 
                />
                </div>
            ))}
            </div>

            <div>
            <h4>Thank you,</h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <label style={labelStyle}>Signed</label>
                <input 
                type="text" 
                style={inputStyle} 
                />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <input 
                type="text" 
                value={head.date}
                readOnly
                style={inputStyle} 
                />
            </div>
            </div>
            </div>
        );
      case 1:
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
                <label>REQUISITION</label>
            </div>

            <div>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>

            <div>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label style={labelStyle}>Tel</label>
                    <input 
                    type="text" 
                    value={tel}
                    onChange={(e:any) => setTel(e.target.value)} 
                    style={inputStyle} 
                    />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label style={labelStyle}>Fax</label>
                    <input 
                        type="text" 
                        value={fax}
                        onChange={(e:any) => setFax(e.target.value)} 
                        style={inputStyle} 
                    />
                    
                </div>
            </div>

            <div>
            <h4>This is a request for radiology services for:</h4>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
                <input 
                type="text" 
                placeholder="Name"
                value={lastName+" "+firstName}
                style={inputStyle} 
                />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>DOB:</label>
                    <input 
                        type="text" 
                        value={personalInformation.dob}
                        onChange={(e) => setPersonalInformation({ ...personalInformation, dob: e.target.value })} 
                        style={inputStyle} 
                    />
                </div>
            </div>
            </div>

            

            <div>
                {radOrders.map((radOrder, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                    <input 
                        type="text" 
                        value={radOrder.requisition} 
                        readOnly
                        style={inputStyle} 
                    />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={labelStyle}>ICDs:</label>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>

            <div>
            {ongoings.map((ongoing, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                <input 
                    type="text" 
                    value={`${ongoing.code} ${ongoing.desc}`} 
                    readOnly
                    style={inputStyle} 
                />
                </div>
            ))}
            </div>

            <div>
            <h4>Thank you,</h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <label style={labelStyle}>Signed</label>
                <input 
                type="text" 
                style={inputStyle} 
                />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <input 
                type="text" 
                value={head.date}
                readOnly
                style={inputStyle} 
                />
            </div>
            </div>
            </div>
        );
      case 2:
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
                <label>REQUISITION</label>
            </div>

            <div>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>

            <div>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label style={labelStyle}>Tel</label>
                    <input 
                    type="text" 
                    value={tel}
                    onChange={(e:any) => setTel(e.target.value)} 
                    style={inputStyle} 
                    />
                </div>
                <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                    <label style={labelStyle}>Fax</label>
                    <input 
                        type="text" 
                        value={fax}
                        onChange={(e:any) => setFax(e.target.value)} 
                        style={inputStyle} 
                    />
                    
                </div>
            </div>

            <div>
            <h4>This is a request for general services for:</h4>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
            <div style={{ flex: 1 }}>
                <input 
                type="text" 
                placeholder="Name"
                value={lastName+" "+firstName}
                style={inputStyle} 
                />
            </div>
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <label>DOB:</label>
                    <input 
                        type="text" 
                        value={personalInformation.dob}
                        onChange={(e) => setPersonalInformation({ ...personalInformation, dob: e.target.value })} 
                        style={inputStyle} 
                    />
                </div>
            </div>
            </div>

            

            <div>
                {genOrders.map((genOrder, index) => (
                    <div key={index} style={{ marginBottom: '16px' }}>
                    <input 
                        type="text" 
                        value={genOrder.requisition} 
                        readOnly
                        style={inputStyle} 
                    />
                    </div>
                ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center' }}>
                <label style={labelStyle}>ICDs:</label>
                <input 
                    type="text" 
                    style={inputStyle} 
                />
            </div>

            <div>
            {ongoings.map((ongoing, index) => (
                <div key={index} style={{ marginBottom: '16px' }}>
                <input 
                    type="text" 
                    value={`${ongoing.code} ${ongoing.desc}`} 
                    readOnly
                    style={inputStyle} 
                />
                </div>
            ))}
            </div>

            <div>
            <h4>Thank you,</h4>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '16px' }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <label style={labelStyle}>Signed</label>
                <input 
                type="text" 
                style={inputStyle} 
                />
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <input 
                type="text" 
                value={head.date}
                readOnly
                style={inputStyle} 
                />
            </div>
            </div>
            </div>
        );
      case 3:
        return <h4>Content for Referral Letter</h4>; // Replace with your content
      case 4:
        return <h4>Content for Consultation Note</h4>; // Replace with your content
      case 5:
        return <h4>Content for Encounter Form</h4>; // Replace with your content
      case 6:
        return <h4>Content for Encounter Note</h4>; // Replace with your content
      case 7:
        return <h4>Content for Patient Invoice</h4>; // Replace with your content
      case 8:
        return <h4>Content for Excuse Letter</h4>; // Replace with your content
      case 9:
        return <h4>Content for Face Sheet</h4>; // Replace with your content
      case 10:
        return <h4>Content for Face Label</h4>; // Replace with your content
      default:
        return <h4>No Content Available</h4>;
    }
  };
  
  return (

      <Dialog open={props.open} onClose={()=>{}} PaperComponent={PaperComponent} maxWidth="xl" PaperProps={{style: {overflow: "auto",},}}>
        <Box sx={{display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: "green",
            color: "white",
            padding: "8px 8px",
            borderTopLeftRadius: "4px",
            borderTopRightRadius: "4px",
            cursor:"move"
            }}
            id="draggable-dialog-title"
        >
                <Typography variant="h6">Print / Fax Encounter Related Document</Typography>
                <Box>
                    <IconButton aria-label="close" color="inherit" onClick={handlePrint}>
                        <PrintIcon />
                    </IconButton>
                    <IconButton aria-label="close" color="inherit" onClick={props.handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
        </Box>
        <Box

            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              overflow: "scroll",
              padding: "8px",
              display:"flex"
            }}
            
          > 
            <Tabs orientation="vertical" sx={{borderRight: 1, borderColor: "divider", width:210, height:"1000px"}} variant="scrollable" value={selectedTab} onChange={handleTabChange}>
                <Tab label="Laboratory Order"/>
                <Tab label="Radiology Order "/>
                <Tab label="General Order" sx={{borderBottom:1, borderColor:"divider"}}/>
                <Tab label="Referral Letter" />
                <Tab label="Consultation Note"  sx={{borderBottom:1, borderColor:"divider"}}/>
                <Tab label="Encounter Form" />
                <Tab label="Encounter Note"  sx={{borderBottom:1, borderColor:"divider"}}/>
                <Tab label="Patient Invoice"/>
                <Tab label="Excuse Letter" sx={{borderBottom:1, borderColor:"divider"}} /> 
                <Tab label="Face Sheet" />
                <Tab label="Face Label" sx={{borderBottom:1, borderColor:"divider"}} />
            {/* <Tab label={<FormControlLabel control={<Checkbox/>} label="Signature Stamp" />} /> */}
            </Tabs>
            <Container sx={{ mt: 4, mb: 10 }} className="print-container" >
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column", textAlign: "center", maxWidth:600, minWidth:300 }} id="print-content" ref={printRef}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Clinique Sante Pour Tous</h2>
                    <h4>1000, Fairwaywoods Dr. Chester ST 223344</h4>
                    <h4>Tel: (804)123-4567 Fax: (804)123-4569</h4>
                </div>
                {renderTabContent()}
                
              </Paper>
            </Container>
          </Box>
      </Dialog>
  );
};


const inputStyle = {
    width: '100%',
    padding: '8px',
    border: 'none',
    borderBottom: '2px solid #000', // border-bottom only
    marginBottom: '8px',
    outline: 'none', // remove the outline on focus
    display:"inline",
  };
const labelStyle = {
    marginRight: '8px',
    fontWeight: 'bold',
    display: 'inline-block',
    width: '60px', // Give enough space for the label to sit next to the input
  };


export default PrintDialog;
