import React, { useState } from 'react'
import Table from '../Components/Table/Table'

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

  const [you, setYou] = useState("patient-ad3rgjk");

  return (
    <div>
      <div className='queue-table-cont'>
      <div className='greeting-cont'>
        <h1 className='greeting-hello'>Hey!</h1>
        <h2 className='greeting-priority'>You're on priority no. 3</h2>
      </div>
      <Table
        type={"queue"}
        tableData={mockData}
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
    </div>
  )
}

export default ViewQueueTable