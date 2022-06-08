import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const CreatType = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput
        source="type_name"
        label="Type"
        validate={required(' ! يرجى ادخال النوع')}
      />
    </SimpleForm>
  </Create>
);

export default CreatType;
