import React from 'react';
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from 'react-admin';

const CreatQuestion = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput
        multiline
        source="question_value"
        label="Question"
        validate={required(' ! يرجى ادخال السؤال')}
      />
      <ReferenceInput source="type_id" reference="type">
        <SelectInput
          optionText="type_name"
          onChange={''}
          validate={required(' ! يرجى اختيار النوع')}
        />
      </ReferenceInput>
    </SimpleForm>
  </Create>
);

export default CreatQuestion;
