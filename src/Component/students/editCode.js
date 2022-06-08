import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const EditCode = (props) => (
  <Edit {...props} title="Edit Code">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="student_code"
        validate={required(' ! يرجى ادخال الكود')}
      />
    </SimpleForm>
  </Edit>
);

export default EditCode;
