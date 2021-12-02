import React from "react";
import { useArray, useMount } from "utils";

export const TsReactTest = () => {
  const persons: { name: string; age: number }[] = [{ name: "joe", age: 25 }];
  const { value, clear, add, removeIndex } = useArray(persons);
  useMount(() => {
    // console.log(value.notExist);
    // add({name: "invalid"});
    // removeIndex('123');
    console.log("test");
    console.log(value);
  });

  return (
    <div>
      <button onClick={() => add({ name: "john", age: 22 })}>add jhon</button>
      <button onClick={() => removeIndex(0)}>remove 0</button>
      <button style={{ marginBottom: "50px" }} onClick={() => clear()}>
        clear
      </button>
      {value.map((person: { age: number; name: string }, index: number) => (
        <div style={{ marginBottom: "30px" }}>
          <span style={{ color: "red" }}> {index} </span>
          <span>{person.name}</span>
          <span>{person.age}</span>
        </div>
      ))}
    </div>
  );
};
