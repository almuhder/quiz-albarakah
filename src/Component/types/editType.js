import React from 'react';
import { Edit, SimpleForm, TextInput, required } from 'react-admin';

const EditType = (props) => (
  <Edit {...props} title="Edit Type">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        source="type_name"
        label="Type"
        validate={required(' ! يرجى ادخال النوع')}
      />
    </SimpleForm>
  </Edit>
);

export default EditType;
