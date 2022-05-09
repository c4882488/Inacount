import React, { useState } from "react";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import "./App.css";

import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
import UpdateRecord from "./UpdateRecord";
import UpdateInvoice from "./UpdateInvoice";

const handleUpdatePress = (item, setLgShow) => {
  // eslint-disable-next-line eqeqeq
  if (item.category_name === "雲端發票") {
    alert("雲端發票不可修改及刪除");
  } else {
    setLgShow(true);
  }
};

const InvoiceItem = (props) => {
  const {
    item,
    handleUpdateRecord,
    handleDeleteRecord,
    handleUpdateInvoice,
    handleDeleteInvoice,
  } = props;
  const [lgShow, setLgShow] = useState(false);
  const [invShow, setInvShow] = useState(false);
  return (
    <>
      <div
        className="invoice-item"
        onClick={() => handleUpdatePress(item, setLgShow)}
      >
        <div className="invoice-itemDetail">
          {/*發票編號 */}
          {item.invoice != null && (
            <ReceiptSharpIcon className="invoice-invoice-icon" />
          )}
          {item.invoice == null && (
            <RiMoneyDollarCircleFill className="invoice-invoice-icon" />
          )}

          <span className="invoice-invoice">{item.invoice}</span>

          {/*輸入日期 */}
          {item.invoice != null && (
            <span className="invoice-date">{item.date}</span>
          )}
          {item.invoice == null && (
            <span className="invoiceNull-date">{item.date}</span>
          )}
          {/*類別 */}
          <span className="invoice-type">{item.category_name}</span>
        </div>
        <div className="invoice-itemDetail">
          {/* {item.revexpdetail.length > 0 &&
          item.revexpdetail.map((one) => <div>{one}</div>)} */}
          {<span className="invoice-desc">{item.description}</span>}
          {<hr />}
        </div>
        <div className="invoice-price">TWD {item.price} 元</div>
      </div>
      <Modal show={lgShow} onHide={() => setLgShow(false)} fullscreen>
        <ModalHeader closeButton={true}>
          <ModalTitle className="record-title-text">
            {item.category_name === "手動輸入"
              ? "修改及刪除發票"
              : "修改及刪除類別"}
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          {item.category_name === "手動輸入" ? (
            <UpdateInvoice
              item={item}
              handleUpdateInvoice={handleUpdateInvoice}
              handleDeleteInvoice={handleDeleteInvoice}
            />
          ) : (
            <UpdateRecord
              item={item}
              handleUpdateRecord={handleUpdateRecord}
              handleDeleteRecord={handleDeleteRecord}
            />
          )}
        </ModalBody>
      </Modal>
    </>
  );
};
export default InvoiceItem;
