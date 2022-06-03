import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

const GeneratCode = (props) => (
  <Create {...props} title="Genertae New Code" redirect="list">
    <SimpleForm>
      <TextInput multiline source="student_code" />
    </SimpleForm>
  </Create>
);

export default GeneratCode;
