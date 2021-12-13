import { SearchPanel } from "./search-panel";
import { List } from "screens/project-list/list";
import { useState } from "react";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParam } from "./util";

export const ProjectListScreen = () => {
  useDocumentTitle("Jira-Task 项目列表", false);

  const [param, setParam] = useProjectSearchParam();
  const {
    isLoading,
    error,
    data: list,
  } = useProjects(useDebounce(param, 1000));
  const { data: users } = useUsers();

  console.log(useUrlQueryParam(["name"]));

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        searchParam={param}
        setSeachParam={setParam}
      />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
