import React from 'react';
import { TextInput, SimpleForm, Show } from 'react-admin';
import { Button } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
const Editstatus = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem('tokenA');
  const { id } = useParams();

  const editStatus = async () => {
    await axios({
      method: 'put',
      url: `http://127.0.0.1:8000/api/student-code/edit-status/${id}`,

      headers: { Authorization: `Bearer ${token}` },
    }).then((res) => {
      navigate('/admin/student-code');
    });
  };

  return (
    <Show>
      <SimpleForm toolbar={<div></div>}>
        <div className="row " style={{ justifyContent: 'space-around' }}>
          <TextInput source="id" disabled className="col-5" />
          <TextInput source="student_number" disabled className="col-5" />
          <TextInput source="status" disabled className="col-5" />
          <div className="col-5 ">
            <Button
              type="primary"
              style={{
                backgroundColor: '#E1901E',
                border: 'none',
                width: '200px',
                marginTop: '20px',
              }}
              onClick={editStatus}
            >
              edit status
            </Button>
          </div>
        </div>
      </SimpleForm>
    </Show>
  );
};

export default Editstatus;
