import React, { useState } from 'react';


const useFlip = (initialBool = true) => {
  const [state, setState] = useState(initialBool);

  const flip = () => setState(state => !state);

  return [state, flip];
}


export { useFlip };