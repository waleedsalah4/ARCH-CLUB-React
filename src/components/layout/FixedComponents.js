import React from 'react';
import Add from '../utilities/Add';
import CenteredModal from '../modals/CenteredModal';
import FixedModal from '../modals/FixedModal';

function FixedComponents() {
  return (
    <>
        <div style={{position: 'fixed', bottom: '2rem', right: '1rem', zIndex: '2'}}>
          <Add />
          <CenteredModal />
        </div>
        <FixedModal />
    </>
  )
}

export default FixedComponents;