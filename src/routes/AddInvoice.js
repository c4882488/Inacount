import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "./App.css";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaFileInvoiceDollar } from "react-icons/fa";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";

export default class AddInvoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //發票
      invoices: null,
      //收支金額
      price: null,
      //收支日期
      date: new Date().toLocaleDateString("zh-Hans-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      //收支描述
      description: null,
    };
  }

  // 變更發票
  handleChangeinvoice = (e) => {
    this.setState({
      invoices: e.target.value,
    });
  };

  //變更金額
  handleChangePrice = (e) => {
    this.setState({
      price: Number(e.target.value),
    });
  };

  //變更描述
  handleChangeDes = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  //變更日期
  handleChangeDate = (newValue) => {
    this.setState({
      date: newValue.toLocaleDateString("zh-Hans-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  };

  //新增按鈕按下後的事件
  handleAddPress = () => {
    console.log(this.state);
    this.props.handleAddInvoice(this.state);
  };

  render() {
    const { price, invoices, description } = this.state;
    const { onCloseModal, onClickButton } = this.props;
    return (
      <div className="screen">
        <div>
          <div className="record-title"></div>
          <div className="record-item">
            <div className="record-item-text">
              <TextField
                label="發票號碼"
                sx={{ width: "35ch" }}
                variant="standard"
                value={invoices || ""}
                onChange={this.handleChangeinvoice}
              />
            </div>

            {/* 日期選擇器 */}
            <div className="record-item-text">
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  label="請選擇日期"
                  value={this.state.date}
                  onChange={this.handleChangeDate}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "35ch" }} />
                  )}
                />
              </LocalizationProvider>
            </div>

            <div className="record-item-text">
              <TextField
                id="Price"
                label="請輸入金額"
                sx={{ width: "35ch" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AttachMoneyIcon />
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                value={price || ""}
                onChange={this.handleChangePrice}
              />
            </div>

            <div className="record-item-text">
              <TextField
                id="description"
                label="請輸入店家名稱"
                sx={{ width: "35ch" }}
                variant="standard"
                value={description || ""}
                onChange={this.handleChangeDes}
              />
            </div>
            <div className="record-item-text">
              <Button
                variant="contained"
                endIcon={<AddTaskIcon />}
                onClick={() => this.handleAddPress()}
              >
                新增
              </Button>
            </div>
            <div className={"record-block"} />
          </div>
        </div>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={4}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="添加發票"
              onClick={(e) => {
                onClickButton("addinvoice", e);
              }}
              icon={<FaFileInvoiceDollar size={20} />}
            />
            <BottomNavigationAction
              onClick={() => {
                onCloseModal();
              }}
              label="收支清單"
              icon={<ReceiptSharpIcon />}
            />
            <BottomNavigationAction
              onClick={(e) => {
                onClickButton("addrecord", e);
              }}
              label="其他收支"
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
      </div>
    );
  }
}
