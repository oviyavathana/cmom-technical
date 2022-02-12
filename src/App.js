import React, { useState, useEffect } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
const Pagination = () => {
const [datas, setData] = useState([]);
const [modalInfo, setModalInfo] = useState([]);
const [showModal, setShowModal] = useState(false);
const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const getPlayerData = async () => {
try {
const data = await axios.get(
"https://api.coingecko.com/api/v3/coins/markets?vs_currency=EUR&order=market_cap_desc&per_page=100&page=1&sparkline=false");
setData(data.data);
} catch (e) {
console.log(e);
}
};
useEffect(() => {
getPlayerData();
}, []);
const columns = [
{ dataField: "img-url", text: "Image" , 
formatter: (image, data, get) => (
<div className="checkbox disabled">
   <label>
   <img className="data-image" src={`${data.image}`} />
   </label>
</div>
)  },
{ dataField: "name", text: "Name" },
{ dataField: "symbol", text: "Symbol" },
{ dataField: "current_price", text: "Current Price" },
{ dataField: "high_24h", text: "High 24 hour Price" },
{ dataField: "low_24h", text: "Low 24 hour Price" },
];
const rowEvents = {
onClick: (e, row) => {
console.log(row);
setModalInfo(row);
toggleTrueFalse();
},
};
const toggleTrueFalse = () => {
setShowModal(handleShow);
};
const ModalContent = () => {
const [modalData, setModalData] = useState({});
useEffect(() => {
getData();
}, [modalInfo]);
const getData = async () => {
try {
const res = await axios.get(
`https://api.coingecko.com/api/v3/coins/${modalInfo?.id}`
);
console.log("datadatadata", res?.data);
setModalData(res?.data);
// setData(data.data);
} catch (e) {
console.log(e);
}
};
return (
<Modal show={show} onHide={handleClose}>
   <Modal.Header closeButton></Modal.Header>
   <Modal.Body>
      <ul>
         <ol>{modalData?.name}</ol>
         <ol>{modalData?.symbol}</ol>
         <ol>{modalData?.hashing_algorithm}</ol>
         <ol>{modalData?.market_cap}</ol>
         <ol>{modalData?.homepage}</ol>
         <ol>{modalData?.genesis_date}</ol>
      </ul>
   </Modal.Body>
</Modal>
);
};
return (
<div className="data-page">
   <h1>CoinGecko</h1>
   <div className="container-fluid">
      <BootstrapTable
         keyField="name"
         data={datas}
         columns={columns}
         pagination={paginationFactory()}
         rowEvents={rowEvents}
         condensed
         />
   </div>
   {show ? 
   <ModalContent />
   : null}
</div>
);
};
export default Pagination;