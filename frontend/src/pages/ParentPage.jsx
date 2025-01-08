import { useState } from "react";
import ParentTable from "../components/ParentTable";
import ParentForm from "../components/ParentForm";

const Parentpage = () => {
  const [selected, setSelected] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleRowClick = (id) => {
    if(selected!=id){
      setSelected(id);
      setIsEditMode(true);
    }else{
      setSelected(0);
      setIsEditMode(false);
    }
  };

  return (
    <div className="row mt-4">
      <div className="col-md-8" style={{ overflowY: 'auto' }}>
        <div style={{ maxHeight: 'calc(100vh - 50px)', overflowY: 'scroll' }}>
          <ParentTable selected={selected} onRowClick={handleRowClick} />
        </div>
      </div>

      <div className="col-md-4">
        <ParentForm isEditMode={isEditMode} selected={selected}/>
      </div>
    </div>
  );
};

export default Parentpage;