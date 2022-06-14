import React, { useState } from 'react'
import Table from '../components/Table/Table'
import { getQueue } from '../Helpers/apiCalls/queueApi';
import { formatDate, getTime, getToken } from '../Helpers/Utils/Common';
import logoSmileCareSystem from "../../src/Assets/logo.png"

var mockData = [
  {
    id: "1",
    username: "patient-ad3rgsdf",
    date: "May 18, 2022",
    status: "ongoing",
  },
  {
    id: "2",
    username: "patient-ad3rdf",
    date: "May 18, 2022",
    status: "canceled",
  },
  {
    id: "3",
    username: "patient-ad3rgjk",
    date: "May 18, 2022",
    status: "upcoming",
  },
  {
    id: "4",
    username: "patient-ad4rdf",
    date: "May 18, 2022",
    status: "upcoming",
  },
]

function ViewQueueTable() {

  const [you, setYou] = useState(getToken().replace(/['"]+/g, ''));
  const [queue, setQueue] = useState([]);
  const [priority, setPriority] = useState("");


  async function fetchQueue()  {
    const response = await getQueue();
    console.log(response);
    setQueue(response.data.data.data);

    response.data.data.data.map((data, index) => {
      console.log(data.token);
      console.log(getToken())
      if(getToken().replace(/['"]+/g, '') == data.token) {
        setPriority(index + 1);
      }
    })
  }

  React.useEffect(() => {

    fetchQueue();
  },[]);

  function PoweredBy() {
    return (
      <div className="footer">
        <div className="poweredby-text-table">POWERED BY</div>
        <img src={logoSmileCareSystem} className="poweredby-logo" />
      </div>
    )
  }

  return (
    <div>
      <div className='queue-table-cont'>
      {priority !== "" && (
      <div className='greeting-cont'>
        <h1 className='greeting-hello'>Hey!</h1>
        <h2 className='greeting-priority'>You're on priority no. {priority}</h2>
      </div>
      )}
      {priority === "" && (
      <div className='greeting-cont'>
        <h1 className='greeting-hello'>Hey!</h1>
        <h2 className='greeting-priority'>Here's the queue today</h2>
      </div>
      )}
      <Table
        type={"queue"}
        tableData={queue}
        headingColumns={[
          "Priority",
          "Username",
          "Appointment Date",
          "Status",
        ]}
        highlightRow={you}
        rowsPerPage={10}
      />
      </div>
      <PoweredBy/>
    </div>
  )
}

export default ViewQueueTable