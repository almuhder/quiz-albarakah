import React from 'react';
import {
  Edit,
  SimpleForm,
  ReferenceInput,
  SelectInput,
  TextInput,
  required,
  SaveButton,
  DeleteWithConfirmButton,
  Toolbar,
} from 'react-admin';

const PostEditToolbar = () => (
  <Toolbar className="row" sx={{ justifyContent: 'space-between' }}>
    <SaveButton className="col-2" label="edit question" icon={''} />
    <DeleteWithConfirmButton
      className="col-1"
      confirmTitle="Delete Qeustion"
      confirmContent="هل انت متأكد تريد الحذف ؟"
    />
  </Toolbar>
);
const EditQuestion = (props) => (
  <Edit {...props} title="Edit Question">
    <SimpleForm toolbar={<PostEditToolbar />}>
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
