
import { observer } from "mobx-react";
import type { NextPage } from "next";
import LoginPageLogic from "../components/LoginPage/loginPageLogic";

const Home: NextPage = observer(() => {
  return (
    <LoginPageLogic/>
  );
});

export default Home;
