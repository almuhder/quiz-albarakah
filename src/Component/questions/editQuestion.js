import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
} from 'react-admin';

const EditQuestion = (props) => (
  <Edit {...props} title="Edit Question">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput
        multiline
        source="question_value"
        label="Question"
        validate={required(' ! يرجى ادخال السؤال')}
      />
      <ReferenceInput source="type_id" reference="type">
        <SelectInput
          optionText="type_name"
          validate={required(' ! يرجى اختيار النوع')}
        />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default EditQuestion;
