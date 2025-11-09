import { Outlet } from 'react-router-dom';
import Header from './header';
import Menu from './menu';
import useIsShowMenu from '@/hooks/useIsShowMenu';
import useIsShowHeader from '@/hooks/useIsShowHeader';
function Layout(){
const isShowMenu = useIsShowMenu();
const isShowHeader = useIsShowHeader();
console.log('isShowMenu',isShowMenu);
    return(
<div className="layout">
    <div className="text-red-500">
{isShowHeader?(
    <Header />
):null}
    </div>
 {
    isShowMenu?(
        <div>
            <Menu/>
        </div>
    ):null
 }
    <div className="outlet_wrap">
        <Outlet />
    </div>
    </div>
  );
}
export default Layout;