import { useInjection } from "inversify-react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import Footer from "./Footer/footer";
import Header from "./Header/header";
import { ReactNode } from "react";

const Layout = observer((props: {children: ReactNode}) => {
  const { children } = props;
  const userStore = useInjection(UserStore);
  const handleFirstClick = () =>{
    if(!userStore.isClicked) {
      userStore.handleClick()
    }
    
  }
    return (
      <div onClick={handleFirstClick}>
        {userStore.layout && <Header />}
        <main>{children}</main>
        {userStore.layout && <Footer />}
      </div>
    )

});
export default Layout;
