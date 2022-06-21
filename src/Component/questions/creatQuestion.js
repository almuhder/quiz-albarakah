import React from 'react';
import {
  Create,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  SaveButton,
  DeleteButton,
  Toolbar,
} from 'react-admin';

const PostEditToolbar = () => (
  <Toolbar>
    <SaveButton label="create question" icon={''} />
    <DeleteButton />
  </Toolbar>
);

const CreatQuestion = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm toolbar={<PostEditToolbar />}>
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
