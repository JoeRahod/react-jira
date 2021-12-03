import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "screens/project-list/list";
import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils";
import { useHttp } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [searchParam, setSeachParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(searchParam, 1000);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel
        users={users}
        searchParam={searchParam}
        setSeachParam={setSeachParam}
      />
      <List users={users} list={list} />
    </div>
  );
};
