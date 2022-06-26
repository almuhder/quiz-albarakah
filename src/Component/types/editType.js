import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  SaveButton,
  DeleteWithConfirmButton,
  Toolbar,
} from 'react-admin';

const PostEditToolbar = () => (
  <Toolbar className="row" sx={{ justifyContent: 'space-between' }}>
    <SaveButton className="col-2" label="edit type" icon={''} />

    <DeleteWithConfirmButton
      className="col-1"
      confirmTitle="Delete type"
      confirmContent="هل انت متأكد تريد الحذف ؟"
    />
  </Toolbar>
);
const EditType = (props) => (
  <Edit {...props} title="Edit Type">
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="id" disabled />
      <TextInput
        source="type_name"
        label="Type"
        validate={required(' ! يرجى ادخال النوع')}
      />
    </SimpleForm>
  </Edit>
);

export default EditType;
