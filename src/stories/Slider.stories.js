// Slider.stories.js
import React from 'react';
import Slider from './Slider';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Components/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['continuous', 'discreet'],
      },
    },
    subtype: {
      control: {
        type: 'select',
        options: ['single', 'range'],
      },
    },
    steps: {
      control: {
        type: 'number',
        min: 1,
        max: 10,
      },
    },
    handleSize: {
      control: {
        type: 'select',
        options: ['Size_24', 'Size_32'],
      },
    },
    color: { control: 'color' }, 
  },
args: { onChange: action('onChange') },
};

const Template = (args) => React.createElement(Slider, args);
export const ContinuousSingle = Template.bind({});
ContinuousSingle.args = {
  type: 'continuous',
  subtype: 'single',
  color: 'red', // Provide a default color
};

export const DiscreetSingle = Template.bind({});
DiscreetSingle.args = {
  type: 'discreet',
  subtype: 'single',
  steps: 5,
  color: 'red', // Provide a default color
};

export const CustomRange = Template.bind({});
CustomRange.args = {
  type: 'custom',
  subtype: 'range',
  steps: 5,
  color: 'red', // Provide a default color
};

// const Template = (args) => React.createElement(Slider, args);