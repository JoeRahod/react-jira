import { useEffect, useState } from "react";

export const SearchPanel = () => {
  const [searchParam, setSeachParam] = useState({
    name: '',
    personId: ''
  });
  const [users, setUsers] = useState([])
  const [list, setList] = useState([])

  useEffect(() => {
    fetch('').then(async response => {
      if(response.ok) {
        setList(await response.json())
      }  
    })
  }, [searchParam])

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
            users.map(user => {
              <option value={user.id}>
                {user.name}
              </option>
            })
          }
        </select>
      </div>
    </form>
  )
};