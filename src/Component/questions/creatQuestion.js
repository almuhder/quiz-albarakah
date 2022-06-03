import React from 'react';
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
} from 'react-admin';

const CreatQuestion = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput multiline source="question_value" />
      <ReferenceInput source="type_id" reference="type">
        <SelectInput optionText="type_name" onChange={''} />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default CreatQuestion;
