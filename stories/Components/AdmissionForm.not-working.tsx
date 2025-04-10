import { AdmissionForm } from '@/components/AdmissionForm';
import { StoryObj, Meta } from '@storybook/react';

const meta: Meta<typeof AdmissionForm> = {
  title: 'Components/Admission Form',
  component: AdmissionForm,
  args: {
    
  },
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof AdmissionForm>;

export const Desktop: Story = {
  render: (args) => <div style={{ width: '33vw'}}><AdmissionForm {...args} /></div>,
};