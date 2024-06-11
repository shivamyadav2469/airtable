import { mergeConfig } from 'vite';
import { defineConfig } from 'vite';

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config, { configType }) {
    return mergeConfig(config, defineConfig({
      // Add your custom Vite configuration here
    }));
  },
};

export default config;
