import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { MdFastfood, MdCardTravel } from "react-icons/md";
import { GiClothes, GiOpenBook, GiReceiveMoney } from "react-icons/gi";
import { BsFillHouseFill, BsAwardFill } from "react-icons/bs";
import { IoLogoGameControllerB } from "react-icons/io";
import { RiHomeSmileFill } from "react-icons/ri";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import { FaMoneyCheckAlt } from "react-icons/fa";
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

export default class AddRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //紀錄收支(支出/收入)
      record: "支出",
      //收支類別
      category_name: "食物",
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
  // 變更收入與支出
  handleChangeRecord = (value) => {
    this.setState({
      record: value,
    });
  };

  // 變更類型
  handleChangeType = (value) => {
    this.setState({
      category_name: value,
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
    this.props.handleAddRecord(this.state);
  };

  render() {
    const { record, price, description } = this.state;
    const { onCloseModal, onClickButton } = this.props;
    return (
      <div className="screen">
        <div>
          <div className="record-title"></div>
          <div className="record-item">
            <div className="record-item-button-revExp">
              {record === "支出" ? (
                <Button variant="outlined" disabled>
                  支出
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  onClick={() => this.handleChangeRecord("支出")}
                >
                  支出
                </Button>
              )}
              {record === "收入" ? (
                <Button variant="outlined" disabled>
                  收入
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  value={"revenue"}
                  onClick={() => this.handleChangeRecord("收入")}
                >
                  收入
                </Button>
              )}
            </div>
            {record === "支出" && (
              <div>
                <div className="record-item-button-type">
                  <Button
                    variant="outlined"
                    startIcon={<MdFastfood size={20} />}
                    onClick={() => this.handleChangeType("食物")}
                  >
                    食物
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GiClothes size={20} />}
                    onClick={() => this.handleChangeType("衣服")}
                  >
                    衣服
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<BsFillHouseFill size={20} />}
                    onClick={() => this.handleChangeType("居家")}
                  >
                    居家
                  </Button>
                </div>
                <div className="record-item-button-type">
                  <Button
                    variant="outlined"
                    startIcon={<MdCardTravel size={20} />}
                    onClick={() => this.handleChangeType("旅行")}
                  >
                    旅行
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<GiOpenBook size={20} />}
                    onClick={() => this.handleChangeType("教育")}
                  >
                    教育
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<IoLogoGameControllerB size={20} />}
                    onClick={() => this.handleChangeType("娛樂")}
                  >
                    娛樂
                  </Button>
                </div>
              </div>
            )}
            {/*-------------------------收入-----------------------------*/}
            {record === "收入" && (
              <div>
                <div className="record-item-button-type">
                  <Button
                    variant="outlined"
                    startIcon={<FaMoneyCheckAlt size={20} />}
                    onClick={() => this.handleChangeType("薪資")}
                  >
                    薪資
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<BsAwardFill size={20} />}
                    onClick={() => this.handleChangeType("獎金")}
                  >
                    獎金
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<CurrencyExchangeOutlinedIcon size={20} />}
                    onClick={() => this.handleChangeType("退款")}
                  >
                    退款
                  </Button>
                </div>
                <div className="record-item-button-type">
                  <Button
                    variant="outlined"
                    startIcon={<GiReceiveMoney size={20} />}
                    onClick={() => this.handleChangeType("捐贈")}
                  >
                    捐贈
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<RiHomeSmileFill size={20} />}
                    onClick={() => this.handleChangeType("租金")}
                  >
                    租金
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<LoyaltyIcon size={20} />}
                    onClick={() => this.handleChangeType("買賣")}
                  >
                    買賣
                  </Button>
                </div>
              </div>
            )}
            {/*-------------------------共同-----------------------------*/}
            {/* 日期選擇器 */}
            {
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
            }

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
                label="描述"
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
