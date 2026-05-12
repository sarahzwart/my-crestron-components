import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import { Button } from './Button';
import { CH5Provider } from '../contexts/CH5Context';
import '../index.css';

const meta = {
  title: 'Example/Button',
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
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    shape: {
      control: 'select',
      options: ['rounded', 'square', 'pill'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom', 'center'],
    },
    activeClass: { control: 'text' },
    inactiveClass: { control: 'text' },
    glowColor: { control: 'color' },
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
    label: 'Button',
    onLabel: 'ON',
    offLabel: 'OFF',
  },
};

export const Toggle: Story = {
  args: {
    variant: 'toggle',
    label: 'Toggle Button',
    onLabel: 'Active',
    offLabel: 'Inactive',
  },
};

export const Momentary: Story = {
  args: {
    variant: 'momentary',
    label: 'Press Me',
    onLabel: 'Pressed',
    offLabel: 'Press',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    onLabel: 'Small',
    offLabel: 'Small',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    onLabel: 'Medium',
    offLabel: 'Medium',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    onLabel: 'Large',
    offLabel: 'Large',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    onLabel: 'Extra Large',
    offLabel: 'Extra Large',
  },
};

export const Pill: Story = {
  args: {
    shape: 'pill',
    onLabel: 'Pill Shape',
    offLabel: 'Pill Shape',
  },
};

export const Square: Story = {
  args: {
    shape: 'square',
    onLabel: 'Square',
    offLabel: 'Square',
  },
};

export const WithIcon: Story = {
  args: {
    icon: '🔔',
    iconPosition: 'left',
    onLabel: 'Notifications On',
    offLabel: 'Notifications Off',
  },
};

export const CustomColors: Story = {
  args: {
    activeClass: 'bg-green-600',
    inactiveClass: 'bg-red-600',
    activeTextClass: 'text-white',
    inactiveTextClass: 'text-white',
    onLabel: 'Active',
    offLabel: 'Inactive',
  },
};

export const NoGlow: Story = {
  args: {
    glow: false,
    onLabel: 'No Glow',
    offLabel: 'No Glow',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    onLabel: 'Disabled',
    offLabel: 'Disabled',
  },
};