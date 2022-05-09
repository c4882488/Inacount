import React from "react";
import CardListItem from "./CardListItem";
import { creditCards } from "./datas";
import "./App.css";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { FaFileInvoiceDollar } from "react-icons/fa";
import ReceiptSharpIcon from "@mui/icons-material/ReceiptSharp";
import CurrencyExchangeSharpIcon from "@mui/icons-material/CurrencyExchangeSharp";
import AddSharpIcon from "@mui/icons-material/AddSharp";

export default class CardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { creditCards: creditCards };
  }

  render() {
    const { creditCards } = this.state;
    return (
      <div className="screen">
        <div className="card-title">
          <span className="card-title-text">信用卡回饋資訊</span>
          {/* <span className="card-title-icon">
          <BiSearchAlt />
        </span> */}
        </div>

        {creditCards.map((creditCard) => (
          <CardListItem key={creditCard.seq} creditCard={creditCard} />
        ))}

        <div className="card-title"></div>
        <Paper
          sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
          elevation={4}
        >
          <BottomNavigation showLabels>
            <BottomNavigationAction
              label="添加發票"
              icon={<FaFileInvoiceDollar size={20} />}
            />
            <BottomNavigationAction
              component={Link}
              to="/"
              label="收支清單"
              icon={<ReceiptSharpIcon />}
            />
            <BottomNavigationAction
              component={Link}
              to="/addRecord"
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
