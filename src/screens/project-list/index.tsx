import React from "react";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useState, useEffect } from "react";
import qs from "qs";
import { cleanObject, useMount, useDebounce } from "utils";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [searchParam, setSeachParam] = useState({
    name: "",
    personId: "",
  });
  const [users, setUsers] = useState([]);
  const [list, setList] = useState([]);
  const debounceParam = useDebounce(searchParam, 1000);

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`
    ).then(async (response) => {
      if (response.ok) {
        setList(await response.json());
      }
    });
  }, [debounceParam]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
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