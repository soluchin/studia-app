import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { ApiService } from "../api/ApiService";

const ParentForm = ({ isEditMode, selected }) => {
  const [id, setId] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    if(isEditMode){
      ApiService.getParent(selected)
      .then((response) => {
        const r = response.data;
        setId(r.id);
        setName(r.name);
        setEmail(r.email);
        setPhoneNumber(r.phoneNumber);
        setAddress(r.address? r.address : '');
        setStudents(r.students);
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
        setEmail('');
        setPhoneNumber('');
        setAddress('');
        setStudents([]);
    }
  }, [isEditMode, selected]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
        id,
        name,
        email,
        phoneNumber,
        address
    }
    
    if(!isEditMode){
      ApiService.insertParent(data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Parent added successfully!',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
        });
    }else{
      ApiService.updateParent(data)
        .then(() => {
          Swal.fire({
            icon: 'success',
            title: 'Parent updated successfully!',
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error,
          });
        });
    }
  };

  return (
    <div className="card p-4">
      <h3 className="mb-4">
        {!isEditMode? "Insert Parent" : "Update Selected Parent"}
      </h3>
      <form onSubmit={handleSubmit}>

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

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter an email"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phoneNumber" className="form-label">
            Phone Number<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="phoneNumber"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            type="text"
            id="address"
            className="form-control"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter address"
          />
        </div>

        {isEditMode && (
          <div className="mb-3">
          <label htmlFor="students" className="form-label">Students</label>
          <ul className="list-group">
            {students && students.length > 0 ? (
              students.map((student) => (
                <li key={student.id} className="list-group-item">
                  {student.name}
                </li>
              ))
            ) : (
              <li className="list-group-item">No students found</li>
            )}
          </ul>
        </div>
        )}
        

        <button type="submit" className="btn btn-primary w-100">
          {!isEditMode ? "Submit" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default ParentForm;
