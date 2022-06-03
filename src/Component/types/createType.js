import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const CreatType = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput multiline source="type_name" />
    </SimpleForm>
  </Create>
);

export default CreatType;
