import { useEffect, useState } from "react";
import { ApiService } from "../api/ApiService";
import Swal from 'sweetalert2';

const ParentTable = ({ selected, onRowClick }) => {
  const [parents, setParents] = useState([]);

  useEffect(() => {
    ApiService.getParents()
      .then((response) => {
        setParents(Array.isArray(response.data) ? response.data : []);
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
    let data = parents.find(e => e.id === id);

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
          <th>Email</th>
          <th>Phone</th>
          <th>Adress</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {parents.map((data, idx) => (
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
            <td>{data.email}</td>
            <td>{data.phoneNumber}</td>
            <td>{data.address}</td>
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

export default ParentTable;