// import React, { useEffect, useState } from 'react';
// import CarUnit from '../api/model/CarUnit';
// import ApiService from '../api/api';
// import Swal from 'sweetalert2';

// const CarUnitTable = ({ selected, onRowClick }: { selected: number; onRowClick: (id: number) => void }) => {
//   const [units, setUnits] = useState<CarUnit[]>([]);
//   const [images, setImages] = useState<{ [id: number]: string }>({});

//   useEffect(() => {
//     ApiService.getCarUnits()
//       .then((response) => {
//         setUnits(response.data);

//         const imageRequests = response.data
//           .filter((unit: CarUnit) => unit.imagePath !== null)
//           .map((unit: CarUnit) =>
//             ApiService.getCarImage(unit.id!).then((url) => ({ id: unit.id, url: url.data }))
//           );

//         Promise.all(imageRequests).then((results) => {
//           const imageMap = results.reduce((acc, { id, url }) => {
//             acc[id] = URL.createObjectURL(url);
//             return acc;
//           }, {} as { [id: number]: any });
//           setImages(imageMap);
//         });
//       })
//       .catch((error) => {
//         if(error){
//           Swal.fire({
//             icon: 'error',
//             title: 'Something went error',
//             text: error,
//           });
//         }
//       });
//   }, []);

//   const deleteRecord = (id: number) => {
//     let data = units.find(e => e.id === id);

//     Swal.fire({
//       title: 'Are you sure?',
//       text: 'You are deleting '+data?.brand+'-'+data?.model+' ('+data?.plateNo+')?',
//       icon: 'warning',
//       confirmButtonColor: '#d33',
//       showCancelButton: true,
//     }).then((result) => {

//       if(result.isConfirmed){
//         ApiService.deleteCarUnit(id)
//           .then(() => {
//             Swal.fire({
//               icon: 'success',
//               title: 'Unit Deleted',
//             }).then(() => {
//               window.location.reload();
//             });
//           })
//           .catch((error) => {
//             Swal.fire({
//               icon: 'error',
//               title: 'Oops...',
//               text: error,
//             });
//           });
//       }

//     });
//   }

//   return (
//     <table className="table table-striped table-hover">
//       <thead>
//         <tr>
//           <th>No</th>
//           <th>Brand</th>
//           <th>Model</th>
//           <th>Year</th>
//           <th>Color</th>
//           <th>Plate No</th>
//           <th>Action</th>
//         </tr>
//       </thead>
//       <tbody>
//         {units.map((unit, idx) => (
//           <tr
//           className={selected===unit.id?'table-primary':''}
//             key={unit.id?.toString()}
//             onClick={() => onRowClick(unit.id!)}
//             style={{
//               cursor: 'pointer'
//             }}
//           >
//             <td>{idx+1}</td>
//             <td>
//               {
//                 images[unit.id!] ? (
//                   <a href={images[unit.id!]} target="_blank" rel="noopener noreferrer">
//                     <img
//                       src={images[unit.id!]}
//                       style={{ maxWidth: '100px', maxHeight: '100px', cursor: 'pointer' }}
//                       alt="Car"
//                     />
//                   </a>
//                 ) : (
//                   unit.imagePath !== null ? 'Loading...': 'No image'
//                 )
//               }
//             </td>
//             <td>{unit.brand}</td>
//             <td>{unit.model}</td>
//             <td>{Number(unit.year)}</td>
//             <td>{unit.color}</td>
//             <td>{unit.plateNo}</td>
//             <td>
//               <button
//                 className="btn btn-danger btn-sm"
//                 onClick={() => deleteRecord(unit.id!)} 
//               >
//                 X
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default CarUnitTable;
// export {};