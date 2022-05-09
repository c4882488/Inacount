import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { data } from "./datas";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaFileInvoiceDollar } from "react-icons/fa";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import InvoiceItem from "./InvoiceItem";
import AddRecord from "./AddRecord";
import AddInvoice from "./AddInvoice";
import Modal from "react-bootstrap/Modal";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalBody from "react-bootstrap/ModalBody";
import ModalTitle from "react-bootstrap/ModalTitle";
export default class InvoiceList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //新增彈跳視窗
      openModal: false,
      //月份上下
      uMonth: 6,
      dMonth: 5,
      data: data,
      model: null,
    };
  }
  //其他收支彈跳視窗
  onClickButton = (name, e) => {
    e.preventDefault();
    console.log(name);
    this.setState({ openModal: true, model: name });
  };
  onCloseModal = () => {
    this.setState({ openModal: false, model: null });
  };
  //月份按鈕遞增
  handleAddMonth = () => {
    if ((this.state.uMonth < 12) & (this.state.dMonth < 11)) {
      this.setState({
        uMonth: this.state.uMonth + 2,
        dMonth: this.state.dMonth + 2,
      });
    }
  };
  //月份按鈕遞減
  handleReduceMonth = () => {
    if ((this.state.uMonth > 2) & (this.state.dMonth > 1)) {
      this.setState({
        uMonth: this.state.uMonth - 2,
        dMonth: this.state.dMonth - 2,
      });
    }
  };
  //計算當期收支餘額
  handleBalance = (revData, expData) => {
    if ((revData.length > 0) | (expData.length > 0)) {
      const rev = revData.reduce((a, b) => a + b);
      const exp = expData.reduce((a, b) => a + b);
      return rev - exp;
    } else {
      return 0;
    }
  };
  //做新增事件(手動輸入發票)
  handleAddInvoice = (invoice) => {
    this.setState({
      data: [
        ...this.state.data,
        {
          id: this.state.data.length + 1,
          category_id: null,
          category_name: "手動輸入",
          type: null,
          invoice: invoice.invoices,
          date: invoice.date,
          description: invoice.description,
          created_at: new Date(),
          updated_at: new Date(),
          price: invoice.price,
          record: "支出",
          revexpdetail: null,
        },
      ],
    });
    console.log(this.state.data);
    this.onCloseModal();
  };
  //做新增事件(收支)
  handleAddRecord = (record) => {
    this.setState({
      data: [
        ...this.state.data,
        {
          id: this.state.data.length + 1,
          category_id: null,
          category_name: record.category_name,
          type: null,
          invoice: null,
          date: record.date,
          description: record.description,
          created_at: new Date(),
          updated_at: new Date(),
          price: record.price,
          record: record.record,
          revexpdetail: null,
        },
      ],
    });
    console.log(this.state.data);
    this.onCloseModal();
  };

  //做修改事件(手動輸入發票)
  handleUpdateInvoice = (invoice) => {
    console.log("invoice", invoice);
    const newInvoices = this.state.data.map((Invoice) => {
      return Invoice.id === invoice.id
        ? {
            ...Invoice,
            invoice: invoice.invoice,
            date: invoice.date,
            description: invoice.description,
            price: invoice.price,
          }
        : Invoice;
    });
    console.log("newRecords", newInvoices);
    this.setState({
      data: newInvoices,
    });
  };

  //做修改事件(收支)
  handleUpdateRecord = (record) => {
    console.log("record", record);
    const newRecords = this.state.data.map((Record) => {
      return Record.id === record.id
        ? {
            ...Record,
            category_name: record.category_name,
            date: record.date,
            description: record.description,
            price: record.price,
            record: record.record,
          }
        : Record;
    });
    console.log("newRecords", newRecords);
    this.setState({
      data: newRecords,
    });
  };

  //做刪除事件(手動輸入發票)
  handleDeleteInvoice = (id) => {
    console.log("invoiceDelete", id);
    const { data } = this.state;
    const Deleteid = id - 1;
    console.log("Deleteid", Deleteid);
    data.map((Invoice) => {
      if (Invoice.id === id) {
        data.splice(Deleteid, 1, 0);
      }
    });
    console.log("after delete", data);
    this.setState({
      data: data,
    });
  };

  //做刪除事件(收支)
  handleDeleteRecord = (id) => {
    console.log("recordDelete", id);
    const { data } = this.state;
    const Deleteid = id - 1;
    console.log("Deleteid", Deleteid);
    data.map((Record) => {
      if (Record.id === id) {
        data.splice(Deleteid, 1, 0);
      }
    });
    console.log("after delete", data);
    this.setState({
      data: data,
    });
  };

  render() {
    const { data, uMonth, dMonth } = this.state;
    //顯示當期資料
    const thisMonthData = data.filter((Record) => {
      if (Record.date !== undefined) {
        return (
          (Number(Record.date.split("/")[1]) === uMonth) |
          (Number(Record.date.split("/")[1]) === dMonth)
        );
      }
    });
    //收入陣列
    const revData = thisMonthData.map((item) => {
      if (item.record === "收入") {
        return item.price;
      } else {
        return 0;
      }
    });
    //支出陣列
    const expData = thisMonthData.map((item) => {
      if (item.record === "支出") {
        return item.price;
      } else {
        return 0;
      }
    });
    //計算當期收支餘額
    const balance = this.handleBalance(revData, expData);
    return (
      <div className="content">
        <div className="screen">
          <div className="invoiceList-title">
            <span className="invoiceList-title-text">收入與支出</span>
          </div>
          <div className="invoiceList-item">
            <Button onClick={this.handleReduceMonth}>
              <ArrowLeftIcon fontSize="large" />
            </Button>
            <span className="invoiceList-text">
              110年 {dMonth} - {uMonth} 月
            </span>
            <Button onClick={this.handleAddMonth}>
              <ArrowRightIcon fontSize="large" />
            </Button>
          </div>
          <div className="invoiceList-text">
            <span>當期收支餘額 $ {balance} 元</span>
          </div>
          {thisMonthData.map((item) => (
            <InvoiceItem
              key={item.id}
              item={item}
              handleUpdateRecord={this.handleUpdateRecord}
              handleDeleteRecord={this.handleDeleteRecord}
              handleUpdateInvoice={this.handleUpdateInvoice}
              handleDeleteInvoice={this.handleDeleteInvoice}
            />
          ))}
          <div className={"invoice-block"}></div>
        </div>

        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={4}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="添加發票"
              onClick={(e) => {
                this.onClickButton("addinvoice", e);
              }}
              icon={<FaFileInvoiceDollar size={20} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/"
              label="收支清單"
              icon={<ReceiptSharpIcon />}
            />

            <BottomNavigationAction
              label="其他收支"
              onClick={(e) => {
                this.onClickButton("addrecord", e);
              }}
              icon={<AddSharpIcon />}
            />

            <BottomNavigationAction
              component={Link}
              to="/cardList"
              label="消費回饋"
              icon={<CurrencyExchangeSharpIcon />}
            />
          </BottomNavigation>
        </Paper>
        {/* <Outlet /> */}
        <Modal
          show={this.state.openModal}
          onHide={() => this.onCloseModal()}
          fullscreen
        >
          <ModalHeader closeButton={true}>
            <ModalTitle className="record-title-text">
              {this.state.model === "addrecord" ? "添加類別" : "添加發票"}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            {this.state.model === "addrecord" ? (
              <AddRecord
                handleAddRecord={this.handleAddRecord}
                onCloseModal={this.onCloseModal}
                onClickButton={this.onClickButton}
              />
            ) : (
              <AddInvoice
                handleAddInvoice={this.handleAddInvoice}
                onCloseModal={this.onCloseModal}
                onClickButton={this.onClickButton}
              />
            )}
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
