import { Navigate } from 'react-router-dom';

// CIPC verification is the registration entry point — redirect there
const SMMERegister = () => <Navigate to="/cipc-verification" replace />;

export default SMMERegister;
