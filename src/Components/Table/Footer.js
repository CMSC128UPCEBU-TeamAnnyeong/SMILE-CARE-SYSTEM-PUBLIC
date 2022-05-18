import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "./Footer.css";

function Footer ({ type, range, setPage, page, slice, footerClass, rowsPerPage, setRows, dataSize}) {

  function nextPage() {
    var currentPage = page;
    //Within range
    if(page < range.length) {
      setPage(currentPage += 1);
    }
  }

  function backPage() {
    var currentPage = page;
    //Within range
    if(page > 1) {
      setPage(currentPage -= 1);
    }
  }

  if(type === "manager") {
    return (
      <div className={"table-container_table--break-md tableFooter " + footerClass}>
          {/**To be changed, just creating logic */}
          <div className="row">
            <div className="col-4 page-number">
              <span>DISPLAY <input type="number" className="display-input"  value={rowsPerPage} onChange={(e) => setRows(e.target.value)} /> out of {dataSize} </span>
            </div>
            <div className="col-8 d-flex justify-content-end">
                <span className="page-label"> PAGE {page} of {range.length}</span>
                <button className="navigation-btn margin-right-2" onClick={() => backPage()}>
                <FontAwesomeIcon
                    icon={'less-than'}
                    alt={'open'}
                    className={'navigation-icon'}
                    aria-hidden="true"
                />
                </button>
                <button className="navigation-btn" onClick={() => nextPage()}>
                <FontAwesomeIcon
                    icon={'greater-than'}
                    alt={'open'}
                    className={'navigation-icon'}
                    aria-hidden="true"
                />
                </button>
            </div>
  
          </div>
      </div>
    );
  } else {
    return (
      <div className={"table-container_table--break-md tableFooter " + footerClass}>
          {/**To be changed, just creating logic */}
          <div className="row">
            <div className="col-4 page-number">
              <span> PAGE {page} of {range.length}</span>
            </div>
            <div className="col-8 d-flex justify-content-end">
                <button className="navigation-btn margin-right-2" onClick={() => backPage()}>
                <FontAwesomeIcon
                    icon={'less-than'}
                    alt={'open'}
                    className={'navigation-icon'}
                    aria-hidden="true"
                />
                </button>
                <button className="navigation-btn" onClick={() => nextPage()}>
                <FontAwesomeIcon
                    icon={'greater-than'}
                    alt={'open'}
                    className={'navigation-icon'}
                    aria-hidden="true"
                />
                </button>
            </div>
  
          </div>
      </div>
    );
  }
};

export default Footer;