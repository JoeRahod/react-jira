import { SearchPanel } from "./search-panel";
import { List } from "screens/project-list/list";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParam } from "./util";
import { Row } from "components/lib";

export const ProjectListScreen = (props: {setProjectModalOpen: (isOpen: boolean) => void}) => {
  useDocumentTitle("Jira-Task 项目列表", false);

  const [param, setParam] = useProjectSearchParam();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 1000));
  const { data: users } = useUsers();

  console.log(useUrlQueryParam(["name"]));

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel
        users={users || []}
        searchParam={param}
        setSeachParam={setParam}
      />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
