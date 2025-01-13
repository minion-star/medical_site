import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

interface CheckboxComponentProps {
    nameCheckbox: string; // Prop for checkbox name
  }


const CheckboxPsych: React.FC<CheckboxComponentProps> = ({ nameCheckbox }) => {
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
                  Anxiety
                </label>             
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Depression
                </label>
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Nerv ousness
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
                  Memory change
                </label>             
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Frightening visions or sounds
                </label>
              </Grid>
              <Grid item xs={12}>
                <label>
                    <input 
                      type="checkbox"               
                      onChange={handleCheckboxChange} 
                    />
                    Thoughts of suicide or violence
                </label>                
              </Grid>
            </Grid>
          </Grid>
        </div>
        
      )}
    </div>
  );
};

export default CheckboxPsych;