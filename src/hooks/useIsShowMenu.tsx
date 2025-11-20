import { useLocation } from 'react-router-dom';
import { routersData, type RoutersDataKeys } from '@/config';
function useIsShowMenu(): boolean {
    const location = useLocation();
    console.log(location);
    const key: RoutersDataKeys = location.pathname.split('/')[1] as RoutersDataKeys;
    if(!key){
        return false;
    }
    // 检查 key 是否存在于 routersData 中
    if(routersData[key] && routersData[key].hasMenu){
        return true;
    }
    return false;
}
export default useIsShowMenu;