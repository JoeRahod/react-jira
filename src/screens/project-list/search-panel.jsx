import { useEffect, useState } from "react";
import React from "react";


export const SearchPanel = ({users, searchParam, setSeachParam}) => {

  return(
    <form action="">
      <div>
        {/* setSeachParam(Object.assign({}, searchParam, {name:evt.target.value})) */}
        <input type="text" value={searchParam.name} onChange={evt => setSeachParam({
          ...searchParam,
          name: evt.target.value,
        })} />
        {/* video1 at done*/}
        <select value={searchParam.personId} onChange={evt => setSeachParam({
          ...searchParam,
          personId: evt.target.value, 
        })}>
          <option value={''}>负责人</option>
          {
            users.map(user => 
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            )
          }
        </select>
      </div>
    </form>
  )
};