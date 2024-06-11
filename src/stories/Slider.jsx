// Slider.js
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './slider.css';

const Slider = ({ type, steps, onChange, handleSize, color }) => {
  const [value, setValue] = useState(50);
  
  const [lowerVal, setLowerVal] = useState(25);
  const [upperVal, setUpperVal] = useState(75);

  const handleSliderChange = (event, sliderType) => {
    const newValue = parseInt(event.target.value);
    if (sliderType === "lower") {
      setLowerVal(newValue);
      if (newValue > upperVal) {
        setUpperVal(newValue);
      }
    } else {
      setUpperVal(newValue);
      if (newValue < lowerVal) {
        setLowerVal(newValue);
      }
    }
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const lowerPos = (lowerVal / 100) * 100;
  const upperPos = (upperVal / 100) * 100;

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };

  const sliderStyle = {
    width: `${value}%`,
    background: color || 'red',
  };

  const getThumbSize = () => {
    if (handleSize === 'Size_24') {
      return '1.7em'; 
    } else if (handleSize === 'Size_32') {
      return '2.5em'; 
    }
    // Add more options if needed
  };

  const thumbStyle = {
    width: getThumbSize(),
    height: getThumbSize(),
  };

  useEffect(() => {
    const containers = document.querySelectorAll(".custom-range-slider");

    containers.forEach(container => {
      const slider = container.querySelector(".custom-slider");
      const thumb = container.querySelector(".custom-slider-thumb");
      const tooltip = container.querySelector(".custom-tooltip");
      const progress = container.querySelector(".custom-progress");

      function customSlider() {
        const val = slider.value;
        const snappedVal = Math.round(val / 10) * 10; // Snap to multiples of 10
        const maxVal = slider.getAttribute("max");
        const percentage = (snappedVal / maxVal) * 100 + "%";

        // Update thumb position and tooltip
        thumb.style.left = percentage;
        tooltip.innerHTML = snappedVal;

        // Update slider value to snapped value
        slider.value = snappedVal;

        // Update progress bar width
        progress.style.width = percentage;

        // Remove existing vertical lines
        container.querySelectorAll('.custom-vertical-line').forEach(line => {
          line.remove();
        });

        // Add vertical line at 10% mark
        for (let i = 10; i < 100; i += 10) {
          const verticalLine = document.createElement("div");
          verticalLine.className = "custom-vertical-line";
          verticalLine.style.left = i + "%"; // Position of the vertical line
          container.appendChild(verticalLine);
        }
      }

      customSlider();

      slider.addEventListener("input", () => {
        customSlider();
      });
    });
  }, []);
 

  return (
    <div>
    {type == "discreet" ? (
      <>
      <div className='dis-body'>
      <div className="discreet-range-slider">
      <input
        type="range"
        min="0"
        max="100"
        value={lowerVal}
        className="discreet-slider"
        id="discreet-lower"
        onChange={(e) => handleSliderChange(e, "lower")}
        
      />
      <input
        type="range"
        min="0"
        max="100"
        value={upperVal}
        className="discreet-slider"
        id="discreet-upper"
        onChange={(e) => handleSliderChange(e, "upper")}
      />
      <div
        className="discreet-slider-thumb"
        style={{ left: `${lowerPos}%` ,  ...thumbStyle, }}
      >
        <div className="discreet-tooltip">{lowerVal}</div>
      </div>
      <div
        className="discreet-slider-thumb"
        style={{ left: `${upperPos}%`,...thumbStyle}}
      >
        <div className="discreet-tooltip">{upperVal}</div>
      </div>
      <div
        className="discreet-progress"
        style={{ left: `${lowerPos}%`, width: `${upperPos - lowerPos}%` ,backgroundColor: sliderStyle.background,}}
      ></div>
    </div>
    </div>
      </>
     
    ) : type == 'continuous' ? (
      <>
      <div className="range-slider">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        className="slider"
        onChange={handleChange}
      />
      <div className="slider-thumb" style={{ ...thumbStyle, left: `${value}%` }}>
        <div className="tooltip">{value}</div>
      </div>
      <div className="progress" style={sliderStyle}></div>
    </div>
      </>

    ): (
      <>
      <div className="custom-range-slider">
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="50"
            step="10"
            className="custom-slider"
            onChange={handleChange}
          />
          <div className="custom-slider-thumb" style={{ ...thumbStyle, left: `${value}%` }}>
            <div className="custom-tooltip">{value}</div>
          </div>
          <div className="custom-progress" style={sliderStyle}></div>
          <div className="custom-vertical-line"></div>
        </div>
      </>
    ) }
   
    </div>
  );
};

Slider.propTypes = {
  type: PropTypes.oneOf(['continuous', 'discreet']),
  steps: PropTypes.number,
  onChange: PropTypes.func,
  handleSize: PropTypes.oneOf(['Size_24', 'Size_32']), 
  color: PropTypes.string,
};

Slider.defaultProps = {
  type: 'continuous',
  steps: 10,
  onChange: undefined,
  handleSize: 'Size_24', 
  color: 'red',
};

export default Slider;

