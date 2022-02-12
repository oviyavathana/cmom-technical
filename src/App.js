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
{ dataField: "symbol", text: "Symbol",  },
{ dataField: "current_price", text: "Current Price", className:"price-alignment" },
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
   <Modal.Header closeButton>
      
   <h2>{modalData?.name}</h2>

   </Modal.Header>
   <Modal.Body>
      <ul>
         <ol>Name : {modalData?.name}</ol>
         <ol>Symbol : {modalData?.symbol}</ol>
         <ol>Genesis Date : {modalData?.genesis_date}</ol>
         <ol>Hashing Algorithm : {modalData?.hashing_algorithm}</ol>
         <ol>Market cap in Euro : {modalData?.market_cap}</ol>
         <ol>Homepage : {modalData?.homepage}</ol>
         <ol></ol>
      </ul>
   </Modal.Body>
  
</Modal>
);
};
return (
<div className="data-page">
<div className="container">

   <h1>CoinGecko</h1>

  <h5>Test Objective :</h5>
   <p>This test should take no more than 1-2 hours to complete. It would be preferable to use
React, but vanilla JS is also acceptable. Please push your code to Github to review once
complete with any instructions needed to run the application.</p>
      <BootstrapTable
         keyField="name"
         data={datas}
         columns={columns}
         pagination={paginationFactory()}
         rowEvents={rowEvents}
         bordered={false}
         striped
         />
   </div>
   {show ? 
   <ModalContent />
   : null}
</div>
);
};
export default Pagination;