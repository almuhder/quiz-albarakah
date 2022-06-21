import React from 'react';
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  SaveButton,
  DeleteButton,
  Toolbar,
} from 'react-admin';

const PostEditToolbar = () => (
  <Toolbar className="row" sx={{ justifyContent: 'space-between' }}>
    <SaveButton className="col-2" label="edit student" icon={''} />
    <DeleteButton className="col-1" />
  </Toolbar>
);

const EditStudent = (props) => {
  // const hundleid = useRef();

  return (
    <Edit {...props} title="Edit Student Number">
      <SimpleForm toolbar={<PostEditToolbar />}>
        <TextInput source="id" disabled />
        <TextInput
          source="student_number"
          validate={required(' ! يرجى ادخال الرقم التدريبي ')}
        />
        {/* <TextInput source="status" disabled /> */}
        {/* <Editstatus id={hundleid} /> */}
      </SimpleForm>
    </Edit>
  );
};

export default EditStudent;
