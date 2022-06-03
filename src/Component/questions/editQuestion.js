import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
} from 'react-admin';

const EditQuestion = (props) => (
  <Edit {...props} title="Edit Question">
    <SimpleForm>
      <TextInput source="id" disabled />
      <TextInput multiline source="question_value" />
      <ReferenceInput source="type_id" reference="type">
        <SelectInput optionText="type_name" />
      </ReferenceInput>
    </SimpleForm>
  </Edit>
);

export default EditQuestion;
