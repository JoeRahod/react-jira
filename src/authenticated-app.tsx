import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from "components/lib";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import { Dropdown, Menu, Button } from "antd";
import { Routes, Route } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import { ProjectScreen } from "screens/project";
import { resetRoute } from "utils";
import { useEffect, useState } from "react";
import { ProjectModal } from "screens/project-list/project-modal";
import { ProjectPopover } from "components/project-popover";

export const AuthenticatedApp = () => {
  // 问题1：prop drilling，props传参的下钻，太多层的传参，setProjectModalOpen的定义和使用的组件离的太远。
  // 问题2: 孙子调用爷爷，耦合在一起了。 https://zhuanlan.zhihu.com/p/60995312 控制反转
  // 解决方案1: 全局状态管理
  // 解决方案2: component composition组件组合方式 React高级指引-Context
  const [orojectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <PageHeader projectButton={<ButtonNoPadding onClick={() => setProjectModalOpen(true)} type="link">创建项目</ButtonNoPadding>} />
      <Main>
        <Router>
          <Routes>
            <Route path={"projects"} element={<ProjectListScreen projectButton={<ButtonNoPadding onClick={() => setProjectModalOpen(true)} type="link">创建项目</ButtonNoPadding>}/>} />
            <Route path={"projects/:projectId/*"} element={<ProjectScreen />} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={orojectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </Container>
  );
};

const PageHeader = (props: {projectButton: JSX.Element}) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} type={"link"} onClick={resetRoute}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132 255)"} />
        </ButtonNoPadding>
        <ProjectPopover {...props}/>
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { user, logout } = useAuth();

  return <Dropdown
    overlay={
      <Menu>
        <Menu.Item>
          <Button onClick={logout} type={"link"}>
            登出
          </Button>
        </Menu.Item>
      </Menu>
    }
  >
    <Button type={"link"} onClick={(e) => e.preventDefault()}>
      Hi, {user?.name}
    </Button>
  </Dropdown>
}

const Container = styled.header`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main``;
