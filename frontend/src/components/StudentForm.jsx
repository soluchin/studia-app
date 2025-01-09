import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ApiService } from "../api/ApiService";

const StudentForm = ({ isEditMode, selected }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [parentId, setParentId] = useState(null);
  const [parentsDropdown, setParentsDropdown] = useState([]);

  useEffect(() => {
    ApiService.getParentsDropdown()
      .then((response) => {
        setParentsDropdown(response.data);
      })
      .catch((error) => {
        if(error){
          Swal.fire({
            icon: 'error',
            title: 'Something went error',
            text: error,
          });
        }
      });

    if(isEditMode){
      ApiService.getStudent(selected)
      .then((response) => {
        const r = response.data;
        setId(r.id);
        setName(r.name);
        setParentId(r.parent.id);
      })
      .catch((error) => {
        if(error){
          Swal.fire({
            icon: 'error',
            title: 'Something went error',
            text: error,
          });
        }
      });
    }else{
        setId(null);
        setName('');
        setParentId(null);
    }
  }, [isEditMode, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        id,
        name,
        parentId
    }
    
    if(!isEditMode){
      ApiService.insertStudent(data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Student added successfully!',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        });
    }else{
      ApiService.updateStudent(data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Student updated successfully!',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          });
        });
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">
        {!isEditMode? "Insert Student" : "Update Selected Student"}
      </h3>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="parent" className="form-label">
            Select Parent<span className="text-danger">*</span>
          </label>
          <select
            id="parent"
            className="form-select"
            value={Number(parentId)}
            onChange={(e) => setParentId(Number(e.target.value))}
            required
          >
            <option value={''}>--Select Parent--</option>
            {parentsDropdown.map((d) => (
              <option key={d.id?.toString()} value={Number(d.id)}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          {!isEditMode ? "Submit" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
