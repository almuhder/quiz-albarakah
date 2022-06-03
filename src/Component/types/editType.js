import React from 'react';
import { Edit, SimpleForm, TextInput } from 'react-admin';

const EditType = (props) => (
  <Edit {...props} title="Edit Type">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput multiline source="type_name" />
    </SimpleForm>
  </Edit>
);

export default EditType;
