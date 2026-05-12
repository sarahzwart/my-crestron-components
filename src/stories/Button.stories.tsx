import type { Meta, StoryObj } from '@storybook/react';

import { fn } from 'storybook/test';
import React from 'react';
import { Button } from './Button';
import { CH5Provider } from '../contexts/CH5Context';
import '../index.css';

const meta = {
  title: 'Components/Button',
  component: Button,
  decorators: [
    (Story) => (
      <CH5Provider>
        <Story />
      </CH5Provider>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['toggle', 'momentary'],
      description: 'Button behavior type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Button size',
    },
    shape: {
      control: 'select',
      options: ['rectangle', 'rounded-rectangle', 'square', 'rounded-square', 'pill', 'circle'],
      description: 'Button shape',
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom', 'center'],
      description: 'Icon position relative to text',
    },
    activeClass: { 
      control: 'color',
      description: 'Background color when active (Tailwind class or hex)',
    },
    inactiveClass: { 
      control: 'color',
      description: 'Background color when inactive (Tailwind class or hex)',
    },
    activeTextClass: { 
      control: 'color',
      description: 'Text color when active (Tailwind class or hex)',
    },
    inactiveTextClass: { 
      control: 'color',
      description: 'Text color when inactive (Tailwind class or hex)',
    },
    glowColor: { 
      control: 'color',
      description: 'Custom glow color (hex or CSS color)',
    },
  },
  args: {
    commandSignal: 'button_press',
    feedbackSignal: 'button_state',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onLabel: 'ON',
    offLabel: 'OFF',
  },
};

export const Toggle: Story = {
  args: {
    variant: 'toggle',
    onLabel: 'Active',
    offLabel: 'Inactive',
  },
};

export const Momentary: Story = {
  args: {
    variant: 'momentary',
    onLabel: 'Pressed',
    offLabel: 'Press',
  },
};

// Rectangle Shape Variations
export const Rectangle: Story = {
  args: {
    shape: 'rectangle',
    onLabel: 'Rectangle',
    offLabel: 'Rectangle',
  },
};

export const RoundedRectangle: Story = {
  args: {
    shape: 'rounded-rectangle',
    onLabel: 'Rounded Rectangle',
    offLabel: 'Rounded Rectangle',
  },
};

// Square Shape Variations
export const Square: Story = {
  args: {
    shape: 'square',
    size: 'lg',
    icon: '⏹',
    onLabel: '',
    offLabel: '',
  },
};

export const RoundedSquare: Story = {
  args: {
    shape: 'rounded-square',
    size: 'lg',
    icon: '⏹',
    onLabel: '',
    offLabel: '',
  },
};

export const PillButton: Story = {
  args: {
    shape: 'pill',
    onLabel: 'Pill Shape',
    offLabel: 'Pill Shape',
  },
};

export const CircleButton: Story = {
  args: {
    shape: 'circle',
    size: 'lg',
    icon: '▶️',
    onLabel: '',
    offLabel: '',
  },
};
