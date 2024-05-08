import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";

function HomeLayout() {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <div className='nav-container'>
        <Header />
        <Navbar />
        <div className='page-content'>
          {isPageLoading ? <Loading /> : <Outlet />}
        </div>
      </div>
    </>
  );
}
export default HomeLayout;
