import React from 'react';
import FormLayout from '../Layout/FormLayout';
import { useRoute } from '@react-navigation/native';

const ApplyForm = () => {
  const route = useRoute();
  const { formfields } = route.params; // Extract formfields from route params

  return <FormLayout fields={formfields} />;
};

export default ApplyForm;
