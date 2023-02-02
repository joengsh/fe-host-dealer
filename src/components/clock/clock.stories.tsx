import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Clock from '@/components/clock';

export default {
  title: 'UI/Clock',
  component: Clock,
} as ComponentMeta<typeof Clock>;

const Template: ComponentStory<typeof Clock> = () => <Clock />;

export const Original = Template.bind({});
