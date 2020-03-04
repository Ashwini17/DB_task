const express = require('express');
const soapRequest = require('easy-soap-request');

const app = express();

// eslint-disable-next-line no-magic-numbers
const PORT = process.env.PORT || 8000;

app.use(express.static('_dist'));

app.get('/soap', async (req, res) => {
  const response = await soap();
  res.send(response);
});

const soap = async () => {
  const url = 'http://www.dneonline.com/calculator.asmx';
  const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
    //'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
  };

  const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <tem:Add>\
        <tem:intA>2</tem:intA>\
        <tem:intB>2</tem:intB>\
     </tem:Add>\
  </soapenv:Body>\
</soapenv:Envelope>'

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { body } = response;
  return body;
};
const soap = async () => {
  const url = 'http://www.dneonline.com/calculator.asmx';
  const sampleHeaders = {
    'Content-Type': 'text/xml;charset=UTF-8',
    //'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
  };

  const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <tem:Add>\
        <tem:intA>2</tem:intA>\
        <tem:intB>2</tem:intB>\
     </tem:Add>\
  </soapenv:Body>\
</soapenv:Envelope>'

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { body } = response;
  return body;
};

app.listen(PORT, () => console.log('SERVER STARTED in port ' + PORT));