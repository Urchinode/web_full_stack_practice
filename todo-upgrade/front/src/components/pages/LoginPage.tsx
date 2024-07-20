import styled from "styled-components";
import KakaoLoginIcon from "@/assets/icons/kakaoLogin.svg?react";

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginButton = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  height: 45px;
  cursor: pointer;
`;

const LoginPage = () => {
  const onClick = () => {
    window.location.href = "http://localhost:8080/oauth/authorization/kakao";
  };
  return (
    <>
      <PageLayout>
        <h1>Login</h1>
        <LoginButton title="login" onClick={onClick}>
          <KakaoLoginIcon />
        </LoginButton>
      </PageLayout>
    </>
  );
};

export default LoginPage;
