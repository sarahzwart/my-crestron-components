import { fn } from "storybook/test";
import type { Meta, StoryObj } from '@storybook/react-vite';

import { Slider } from './Slider';

const meta = {
  component: Slider,
} satisfies Meta<typeof Slider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    "value": 0,
    "onChange": fn()
  },
};