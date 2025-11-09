import { useLocation } from 'react-router-dom';
import { routersData, type RoutersDataKeys } from '@/config';
function useIsShowMenu(): boolean {
    const location = useLocation();
    console.log(location);
    const key: RoutersDataKeys = location.pathname.split('/')[1] as RoutersDataKeys;
if(!key){
    return false;
}
if(routersData[key].hasMenu){
    return true;
}
return false;
}
export default useIsShowMenu;