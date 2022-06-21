import React from 'react';
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  SaveButton,
  DeleteButton,
  Toolbar,
} from 'react-admin';

const PostEditToolbar = () => (
  <Toolbar>
    <SaveButton label="create type" icon={''} />
    <DeleteButton />
  </Toolbar>
);
const CreatType = (props) => (
  <Create {...props} redirect="list">
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput
        source="type_name"
        label="Type"
        validate={required(' ! يرجى ادخال النوع')}
      />
    </SimpleForm>
  </Create>
);

export default CreatType;
