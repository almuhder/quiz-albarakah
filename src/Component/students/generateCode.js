import React from 'react';
import { Create, SimpleForm, TextInput, required } from 'react-admin';

const GeneratCode = (props) => (
  <Create {...props} title="Genertae New Code" redirect="list">
    <SimpleForm>
      <TextInput
        source="student_code"
        validate={required(' ! يرجى ادخال الكود')}
      />
    </SimpleForm>
  </Create>
);

export default GeneratCode;
