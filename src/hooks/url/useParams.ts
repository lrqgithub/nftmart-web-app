import { useLocation } from 'react-router-dom';

export const useParams = () => new URLSearchParams(useLocation().search);

export default {};
