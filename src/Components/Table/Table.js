import React, { useState } from "react"
import { Button, Modal } from "react-bootstrap"
import Footer from "./Footer"
import useTable from "./Pagination"
import PropTypes from "prop-types"

//css
import "./Table.scss"
import { useNavigate } from "react-router-dom"
import { formatDate, getTime } from "../../Helpers/Utils/Common"

function Table({
  type,
  tableData,
  rowsPerPage,
  headingColumns,
  breakOn = "small",
  givenClass,
  setFilter,
  link,
  render,
  setRender,
  date,
  setDate,
  highlightRow,
  setRows
}) {
  //PAGINATION
  const [page, setPage] = useState(1)
  const { slice, range } = useTable(tableData, page, rowsPerPage)

  //MODAL
  const [show, setShow] = useState(false);
  const [showAddNextAppointment, setShowAddNextAppointment] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddNextAppointmentClose = () => setShowAddNextAppointment(false);
  const handleAddNextAppointmentShow = () => setShowAddNextAppointment(true);

  let tableClass = "table-container__table"

  if (breakOn === "small") {
    tableClass += " table-container__table--break-sm"
  } else if (breakOn === "medium") {
    tableClass += " table-container_table--break-md"
  } else if (breakOn === "large") {
    tableClass += " table-container_table--break-lg"
  }

  const data = slice.map((row, index) => {
    let rowData = []
    let i = 0

    for (const key in row) {
      rowData.push({
        key: headingColumns[i],
        val: row[key]
      })
      i++
    }
    if (type === "activity") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                index == 0
                  ? "activity-cell blue-text"
                  : data.val + " activity-cell grey-text"
              }
            >
              {data.val}
            </td>
          ))}
        </tr>
      )
    } else if (type === "queue") {
      return (
        <tr key={row.id} className={highlightRow === row.token ? "highlight-row" : ""}>
            <td
              key={index}
              data-heading={row.id}
              className={
              " queue-cell grey-text"
              }
            >
              {index + 1}
            </td>
            <td
              key={index}
              data-heading={row.id}
              className={
              " queue-cell blue-text"
              }
            >
              {row.token}
            </td>
            <td
              key={index}
              data-heading={row.id}
              className={
              " queue-cell grey-text"
              }
            >
              {formatDate(row.appointment_date_time) + " " + getTime(row.appointment_date_time)}
            </td>
            <td
              key={index}
              data-heading={row.id}
              className={
              row.status + 
              " queue-cell grey-text"
              }
            >
              {row.status}
            </td>
        </tr>
      )
    } else if (type === "patients") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                index != rowData.length - 1
                  ? "text-left blue-text"
                  : data.val + "text-left grey-text"
              }
            >
              {index === 0 ? "" : data.val}
            </td>
          ))}
        </tr>
      )
    } else if (
      type === "approved-appointments" ||
      type === "pending-appointments"
    ) {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                index != rowData.length - 1
                  ? "text-left blue-text"
                  : data.val + "text-left grey-text"
              }
            >
              {index === 0 ? "" : data.val}
            </td>
          ))}
        </tr>
      )
    } else if (type === "treatment-history") {
      return (
        <tr key={row.id}>
          {rowData.map((data, index) => (
            <td
              key={index}
              data-heading={data.key}
              className={
                index != rowData.length - 1
                  ? "text-left blue-text"
                  : data.val + "text-left grey-text"
              }
            >
              {index === 0 ? "" : data.val}
            </td>
          ))}
        </tr>
      )
    }
  })

  if (type === "activity") {
    return (
      <div className="table-container">
        <div className="search-table-container row"></div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th
                  key={index}
                  className={
                    col == "Recent Activities" ? "activity-header" : ""
                  }
                >
                  {col}
                </th>
              ))}
              <th>
                <select
                  className={
                    date == "today"
                      ? "min-select table-date-filter"
                      : "table-date-filter"
                  }
                  onChange={(e) => setDate(e.target.value)}
                >
                  <option value={"today"} selected>
                    Today
                  </option>
                  <option value={"yesterday"}>Yesterday</option>
                  <option value={"other date"}>Other Date</option>
                </select>
              </th>
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <Footer
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
        />
      </div>
    )
  } else if (type === "queue") {
    return (
      <div className="table-container">
        {/* <div className="queue-table-header-cont">
          <span className="queue-table-label">Queue</span>
        </div> */}
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <Footer
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
        />
      </div>
    )
  } else if (
    type === "approved-appointments" ||
    type === "pending-appointments"
  ) {
    return (
      <div className="table-container  table-container-appt">
        <div className="queue-table-header-cont">
          <div className="row">
            <div className="col-sm-8">
              <span className="appointments-table-label">
                {type === "approved-appointments"
                  ? "Approved Appointments"
                  : "Pending Appointments"}
              </span>
            </div>
            <div className="col-sm-4 d-flex justify-content-end">
              <select
                className={
                  date === "today"
                    ? "min-select table-date-filter"
                    : "table-date-filter"
                }
                onChange={(e) => setDate(e.target.value)}
              >
                <option value={"today"} selected>
                  Today
                </option>
                <option value={"yesterday"}>Yesterday</option>
                <option value={"other date"}>Other Date</option>
              </select>
            </div>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{index === 0 ? "" : col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <Footer
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
        />
      </div>
    )
  } else if (
    type === "approved-appointments" ||
    type === "pending-appointments"
  ) {
    return (
      <div className="table-container  table-container-appt">
        <div className="queue-table-header-cont">
          <div className="row">
            <div className="col-sm-8">
              <span className="appointments-table-label">
                {type === "approved-appointments"
                  ? "Approved Appointments"
                  : "Pending Appointments"}
              </span>
            </div>
            <div className="col-sm-4 d-flex justify-content-end">
              <select
                className={
                  date === "today"
                    ? "min-select table-date-filter"
                    : "table-date-filter"
                }
                onChange={(e) => setDate(e.target.value)}
              >
                <option value={"today"} selected>
                  Today
                </option>
                <option value={"yesterday"}>Yesterday</option>
                <option value={"other date"}>Other Date</option>
              </select>
            </div>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{index === 0 ? "" : col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <Footer
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
        />
      </div>
    )
  } else if (type === "patients") {
    return (
      <div>
        <div className="filter-cont no-wrap">
          <span className="filter-label">FILTER </span>
          <span className="date-label">Date from: </span>
          <input data-testid="date-from" type="date" className="date-input" />
          <span className="date-label">Date to: </span>
          <input data-testid="date-to" type="date" className="date-input" />
        </div>
        <div className="table-container full-width">
          <table className={tableClass}>
            <thead>
              <tr>
                {headingColumns.map((col, index) => (
                  <th key={index}>{index === 0 ? "" : col}</th>
                ))}
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
          <Footer
            type={"manager"}
            range={range}
            slice={slice}
            setPage={setPage}
            page={page}
            footerClass={givenClass}
            rowsPerPage={rowsPerPage}
            setRows={setRows}
            dataSize={tableData.length}
          />
        </div>
      </div>
    )
  } else if (type === "treatment-history") {
    return (
      <div className="table-container table-container-treatment-hist">
        <div className="treatmentHistory-table-header-cont">
          <div className="row">
            <div className="col-sm-6">
              <span className="treatment-history-table-label">
                Treatment History
              </span>
            </div>
          </div>
        </div>
        <table className={tableClass}>
          <thead>
            <tr>
              {headingColumns.map((col, index) => (
                <th key={index}>{index === 0 ? "" : col}</th>
              ))}
            </tr>
          </thead>
          <tbody>{data}</tbody>
        </table>
        <Footer
          range={range}
          slice={slice}
          setPage={setPage}
          page={page}
          footerClass={givenClass}
        />
      </div>
    )
  }
}

Table.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  headingColumns: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  breakOn: PropTypes.oneOf(["small", "medium", "large"])
}

export default Table
