// import React, { useState } from 'react';
// import CarUnitTable from '../components/CarUnitTable';
// import CarUnitForm from '../components/CarUnitForm';

// const CarUnitPage = () => {
//   const [selected, setSelected] = useState<number>(0);
//   const [isEditMode, setIsEditMode] = useState<Boolean>(false);

//   const handleRowClick = (id: number) => {
//     if(selected!=id){
//       setSelected(id);
//       setIsEditMode(true);
//     }else{
//       setSelected(0);
//       setIsEditMode(false);
//     }
//   };

//   return (
//     <div className="container row mt-4">
//       <div className="col-md-8" style={{ overflowY: 'auto' }}>
//         <div style={{ maxHeight: 'calc(100vh - 50px)', overflowY: 'scroll' }}>
//           <CarUnitTable selected={selected} onRowClick={handleRowClick} />
//         </div>
//       </div>

//       <div className="col-md-4">
//         <CarUnitForm isEditMode={isEditMode} selected={selected}/>
//       </div>
//     </div>
//   );
// };

// export default CarUnitPage;
// export {};
