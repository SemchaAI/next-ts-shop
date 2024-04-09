import { Meta, StoryObj } from '@storybook/react';
import MainBtn from './MainBtn';
import '@/app/assets/main.scss';

import CloseIcon from '../icons/CloseIcon';

const meta: Meta<typeof MainBtn> = {
  title: 'Buttons/MainBtn',
  component: MainBtn,
};

export default meta;

type Story = StoryObj<typeof MainBtn>;

export const Basic: Story = {
  args: {
    children: 'кнопка',
  },
};

export const Contain: Story = {
  args: {
    children: 'кнопка',
    version: 'contain',
    type: 'button',
  },
};
export const Outline: Story = {
  args: {
    children: 'кнопка',
    version: 'outline',
    type: 'button',
  },
};

export const IconBtn: Story = {
  args: {
    children: (
      <CloseIcon
        width={24}
        height={24}
      />
    ),
    version: 'outline',
    type: 'button',
    icon: true,
  },
};
