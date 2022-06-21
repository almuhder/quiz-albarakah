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
    <SaveButton label="create student" icon={''} />
    <DeleteButton />
  </Toolbar>
);

const GeneratCode = (props) => (
  <Create {...props} title="Genertae New Code" redirect="list">
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput
        source="student_number"
        validate={required(' ! يرجى ادخال الكود')}
      />
    </SimpleForm>
  </Create>
);

export default GeneratCode;
