import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Dice from '@/components/dice';

export default {
  title: 'UI/Dice',
  component: Dice,
} as ComponentMeta<typeof Dice>;

const Template: ComponentStory<typeof Dice> = (arg) => <Dice {...arg}/>;

export const One = Template.bind({});
One.args = {
  value:1,
  className:'w-5 h-5'
}

export const Two = Template.bind({});
Two.args = {
  value:2,
  className:'w-10 h-10'
}

export const Three = Template.bind({});
Three.args = {
  value:3,
  className:'w-16 h-16'
}

export const Four = Template.bind({});
Four.args = {
  value:4,
  className:'w-32 h-32'
}

export const Five = Template.bind({});
Five.args = {
  value:5,
  className:'w-32 h-32'
}

export const Six = Template.bind({});
Six.args = {
  value:6,
  className:'w-32 h-32'
}

export const Empty = Template.bind({});