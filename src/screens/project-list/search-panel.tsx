import { Input, Select, Form } from "antd";
import { Project } from "./list";
import { UserSelect } from "components/user-select";
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProps {
  users: User[];
  searchParam: Partial<Pick<Project, "name" | "personId">>;
  setSeachParam: (searchParam: SearchPanelProps["searchParam"]) => void;
}

export const SearchPanel = ({
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
        <UserSelect
          defaultOptionName={"负责人"}
          value={searchParam.personId}
          onChange={(value: number | undefined) =>
            setSeachParam({
              ...searchParam,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
