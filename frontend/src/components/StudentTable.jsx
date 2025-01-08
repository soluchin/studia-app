import { useEffect, useState } from "react";
import { ApiService } from "../api/ApiService";
import Swal from 'sweetalert2';

const StudentTable = ({ selected, onRowClick }) => {
  const [students, setStudent] = useState([]);

  useEffect(() => {
    ApiService.getStudents()
      .then((response) => {
        setStudent(Array.isArray(response.data) ? response.data : []);
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
  }, []);

  const deleteRecord = (id) => {
    let data = students.find(e => e.id === id);

    Swal.fire({
      title: 'Are you sure?',
      text: 'You are deleting '+data?.name+'?',
      icon: 'warning',
      confirmButtonColor: '#d33',
      showCancelButton: true,
    }).then((result) => {

      if(result.isConfirmed){
        ApiService.deleteParent(id)
          .then(() => {
            Swal.fire({
              icon: 'success',
              title: 'Data deleted',
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

    });
  }

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {students.map((data, idx) => (
          <tr
          className={selected===data.id?'table-primary':''}
            key={data.id?.toString()}
            onClick={() => onRowClick(data.id)}
            style={{
              cursor: 'pointer'
            }}
          >
            <td>{idx+1}</td>
            <td>{data.name}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteRecord(data.id)} 
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentTable;