// import React, { useEffect, useState } from 'react';
// import CarUnit from '../api/model/CarUnit';
// import Swal from 'sweetalert2';
// import ApiService from '../api/api';

// const CarUnitForm = ({ isEditMode, selected }: { isEditMode:Boolean; selected: number }) => {
//   const [id, setId] = useState<number|null>(null);
//   const [brand, setBrand] = useState('');
//   const [model, setModel] = useState('');
//   const [year, setYear] = useState(1);
//   const [color, setColor] = useState('');
//   const [plateNo, setPlateNo] = useState('');
//   const [image, setImage] = useState<File | null>(null);

//   useEffect(() => {
//     if(isEditMode){
//       ApiService.getCarUnit(selected)
//       .then((response) => {
//         setId(response.data.id);
//         setBrand(response.data.brand);
//         setModel(response.data.model);
//         setYear(response.data.year);
//         setColor(response.data.color);
//         setPlateNo(response.data.plateNo);
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
//     }else{
//       setId(null);
//       setBrand('');
//       setModel('');
//       setYear(1);
//       setColor('');
//       setPlateNo('');
//       setImage(null);
//     }
//   }, [isEditMode, selected]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const unitData: CarUnit = {
//       id,
//       brand,
//       model,
//       year,
//       color,
//       plateNo,
//       imagePath: null
//     }
    
//     if(!isEditMode){
//       ApiService.insertCarUnit(unitData)
//         .then(() => {
//           Swal.fire({
//             icon: 'success',
//             title: 'Car Unit added successfully!',
//           }).then(() => {
//             window.location.reload();
//           });
//         })
//         .catch((error) => {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: error,
//           });
//         });
//     }else{
//       ApiService.updateCarUnit(unitData)
//         .then(() => {
//           Swal.fire({
//             icon: 'success',
//             title: 'Car Unit updated successfully!',
//           }).then(() => {
//             window.location.reload();
//           });
//         })
//         .catch((error) => {
//           Swal.fire({
//             icon: 'error',
//             title: 'Oops...',
//             text: error,
//           });
//         });
//     }
//   };

//   const handleImageUpload = () => {
//     if (!image || !id) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Please select an image or make sure the car unit is selected.',
//       });
//       return;
//     }

//     const allowedExtensions = ['jpg', 'jpeg', 'png'];
//     const fileExtension = image.name.split('.').pop()?.toLowerCase();

//     if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid File',
//         text: 'Please upload a valid image file (.jpg, .jpeg, .png).',
//       });
//       return;
//     }

//     ApiService.uploadCarImage(id, image)
//       .then(() => {
//         Swal.fire({
//           icon: 'success',
//           title: 'Image uploaded successfully!',
//         });
//       })
//       .catch((error) => {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: error.message,
//         });
//       });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       setImage(e.target.files[0]); // Set the selected image
//     }
//   };


//   return (
//     <div className="card p-4">
//       <h3 className="mb-4">
//         {!isEditMode? "Add New Car Unit" : "Update Selected Car"}
//       </h3>
//       <form onSubmit={handleSubmit}>

//         {isEditMode && (
//           <div className="mb-3">
//             <label htmlFor="image" className="form-label">
//               Upload Image
//             </label>
//             <input
//               type="file"
//               id="image"
//               className="form-control"
//               accept="image/*"
//               onChange={handleImageChange}
//             />
//             <button
//               type="button"
//               className="btn btn-secondary mt-2"
//               onClick={handleImageUpload}
//             >
//               Upload
//             </button>
//           </div>
//         )}

//         <div className="mb-3">
//           <label htmlFor="brand" className="form-label">
//             Brand<span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             id="brand"
//             className="form-control"
//             value={brand}
//             onChange={(e) => setBrand(e.target.value)}
//             placeholder="Enter car's brand"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="model" className="form-label">
//             Model<span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             id="model"
//             className="form-control"
//             value={model}
//             onChange={(e) => setModel(e.target.value)}
//             placeholder="Enter car's model"
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="year" className="form-label">
//             Year<span className="text-danger">*</span>
//           </label>
//           <input
//             type="number"
//             id="year"
//             className="form-control"
//             value={year.toString().replace(/^0+/, '')}
//             onChange={(e) => setYear(Number(e.target.value))}
//             placeholder="Enter car's year"
//             min={1}
//             required
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="color" className="form-label">Color</label>
//           <input
//             type="text"
//             id="color"
//             className="form-control"
//             value={color}
//             onChange={(e) => setColor(e.target.value)}
//             placeholder="Enter car's color"
//           />
//         </div>

//         <div className="mb-3">
//           <label htmlFor="plateNo" className="form-label">
//             Plate Number<span className="text-danger">*</span>
//           </label>
//           <input
//             type="text"
//             id="plateNo"
//             className="form-control"
//             value={plateNo}
//             onChange={(e) => setPlateNo(e.target.value)}
//             placeholder="Enter car's Plate Number"
//             required
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-100">
//           {!isEditMode ? "Submit" : "Update"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CarUnitForm;
