import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface CheckboxComponentProps {
    nameCheckbox: string; // Prop for checkbox name
  }


const CheckboxEndocrine: React.FC<CheckboxComponentProps> = ({ nameCheckbox }) => {
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
                  Heat or cold intolerance
                </label>             
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Weight change
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
                  Excessive thirst or hunger
                </label>             
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Excessive sweating or urination
                </label>
              </Grid>              
            </Grid>
          </Grid>
        </div>
        
      )}
    </div>
  );
};

export default CheckboxEndocrine;