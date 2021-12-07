import { useEffect, useState } from "react";
import React from "react";
import { Input, Select, Form } from "antd";
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  searchParam: {
    name: string;
    personId: string;
  };
  setSeachParam: (searchParam: SearchPanelProps["searchParam"]) => void;
}

export const SearchPanel = ({
  users,
  searchParam,
  setSeachParam,
}: SearchPanelProps) => {
  return (
    <Form layout={"inline"} style={{ marginBottom: "2rem" }}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={searchParam.name}
          onChange={(evt) =>
            setSeachParam({
              ...searchParam,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Select
          value={searchParam.personId}
          onChange={(value) =>
            setSeachParam({
              ...searchParam,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>
    </Form>
  );
};
