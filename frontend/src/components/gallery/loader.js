import React from 'react';
import { DotLoader } from 'react-spinners';

export default function Loader() {
  return (
    <div className="dotLoader">
      <DotLoader
        sizeUnit="px"
        size={50}
        loading={true}
      />
    </div>
  );
}