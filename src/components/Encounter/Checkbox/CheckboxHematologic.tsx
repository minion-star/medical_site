import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface CheckboxComponentProps {
    nameCheckbox: string; // Prop for checkbox name
  }


const CheckboxHemato: React.FC<CheckboxComponentProps> = ({ nameCheckbox }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsVisible(event.target.checked);
  };

  return (
    <div>
      <label>
        <input 
          type="checkbox" 
          checked={isVisible} 
          onChange={handleCheckboxChange} 
        />
        {nameCheckbox}
      </label>
      

      {isVisible && (       
        <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <label>
                  <input 
                    type="checkbox"               
                    onChange={handleCheckboxChange} 
                  />
                  Skin discoloration
                </label>             
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Enlarged lymph nodes
                </label>
              </Grid>              
            </Grid>
            <Grid item xs={6}>
              <Grid item xs={12}>
                <label>
                  <input 
                    type="checkbox"               
                    onChange={handleCheckboxChange} 
                  />
                  Bleeding
                </label>             
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                   Fevers
                </label>
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Abnormal bruising
                </label>                
              </Grid>
            </Grid>
          </Grid>
        </div>
        
      )}
    </div>
  );
};

export default CheckboxHemato;