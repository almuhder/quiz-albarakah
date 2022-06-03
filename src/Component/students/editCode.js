import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const EditCode = (props) => (
  <Edit {...props} title="Edit Code">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput source="student_code" />
    </SimpleForm>
  </Edit>
);

export default EditCode;
