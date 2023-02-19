import { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

const Portal = ({ children }) => {
  const portalRef = useRef(document.createElement('div'));

  useEffect(() => {
    const portalNode = portalRef.current;
    document.body.appendChild(portalNode);
    return () => {
      document.body.removeChild(portalNode);
    };
  }, []);

  return ReactDOM.createPortal(children, portalRef.current);
};

export default Portal;
