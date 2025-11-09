import { useLocation } from 'react-router-dom';
function useIsShowHeader(){
    const location = useLocation();
    if(location.pathname==='/login'){
        return false;
    }
    return true;
}
export default useIsShowHeader;