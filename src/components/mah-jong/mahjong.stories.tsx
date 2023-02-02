import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import MahJong from '@/components/mah-jong';

import { MahJong as MahJongEnum } from '@/types'

export default {
  title: 'UI/MahJong',
  component: MahJong,
} as ComponentMeta<typeof MahJong>;

const Template: ComponentStory<typeof MahJong> = (args) => <MahJong {...args}/>;

export const DŌNG_FĒNG = Template.bind({});
DŌNG_FĒNG.args = {
  value: MahJongEnum.DŌNG_FĒNG,
  className: 'w-fit h-32'
}

export const NÁN_FĒNG = Template.bind({});
NÁN_FĒNG.args = {
  value: MahJongEnum.NÁN_FĒNG,
  className: 'w-fit h-32'
}

export const XĪ_FĒNG = Template.bind({});
XĪ_FĒNG.args = {
  value: MahJongEnum.XĪ_FĒNG,
  className: 'w-fit h-32'
}

export const BĔĪ_FĒNG = Template.bind({});
BĔĪ_FĒNG.args = {
  value: MahJongEnum.BĔĪ_FĒNG,
  className: 'w-fit h-32'
}

export const BÁ_BĂN = Template.bind({});
BÁ_BĂN.args = {
  value: MahJongEnum.BÁ_BĂN,
  className: 'w-fit h-32'
}

export const HŌNG_ZHŌNG = Template.bind({});
HŌNG_ZHŌNG.args = {
  value: MahJongEnum.HŌNG_ZHŌNG,
  className: 'w-fit h-32'
}

export const FĀ_CÁİ = Template.bind({});
FĀ_CÁİ.args = {
  value: MahJongEnum.FĀ_CÁİ,
  className: 'w-fit h-32'
}
