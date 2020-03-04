const express = require('express');
const soapRequest = require('easy-soap-request');
const url = 'http://www.dneonline.com/calculator.asmx';
const app = express();
const sampleHeaders = {
  'Content-Type': 'text/xml;charset=UTF-8',
  //'soapAction': 'https://graphical.weather.gov/xml/DWMLgen/wsdl/ndfdXML.wsdl#LatLonListZipCode',
};
const db = require('./app');

// eslint-disable-next-line no-magic-numbers
const PORT = process.env.PORT || 8000;

app.use(express.static('_dist'));

app.get('/belegTypes', async (req, res) => {
  try {
    const token = await anmelden();
    const belegTypes = JSON.parse(await getBelegtype(token));
    res.send(belegTypes);
  }
  catch {
    res.send('err')
  }

});
app.get ('/betrag', async (req, res) => {
  const type = req.query.type;
  const TestFall = await getTestFall();
  if (TestFall) {
    db(type, function (result){
      res.send(result)
    })
  }
  //const Ergebnis = await getErgebnis(token);
})

const anmelden = async () => {
  return '1';
  /*const xml = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <tem:Anmelden>\
        <tem:pin>2019</tem:pin>\
     </tem:Anmelden>\
  </soapenv:Body>\
</soapenv:Envelope>';

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { body } = response;
  return body;*/
};

const getBelegtype = async (token) => {
  return JSON.stringify([55, 2, 3, 4]);
/*const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">\
  <soapenv:Header/>\
  <soapenv:Body>\
     <tem:Belegtypen>\
        <!--Optional:-->\
        <tem:token>${token}</tem:token>\
     </tem:Belegtypen>\
  </soapenv:Body>\
</soapenv:Envelope>`;

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { body } = response;
  return body;*/
};

const getTestFall = async (token) => {
  return true;
  /*const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
  <soapenv:Header/>
  <soapenv:Body>
     <tem:Testfall>
        <!--Optional:-->
        <tem:token>${token}</tem:token>
     </tem:Testfall>
  </soapenv:Body>
</soapenv:Envelope>`;

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { body } = response;
  return body;*/
};

const getErgebnis = async (token, reisedatum, summe, pk) => {
  const xml = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
    <soapenv:Header/>
    <soapenv:Body>
       <tem:Ergebnis>
          <!--Optional:-->
          <tem:token>${token}</tem:token>
          <!--Optional:-->
          <tem:gruppiert>
             <!--Zero or more repetitions:-->
             <tem:proc_hole_belege_gruppiert_Result>
                <tem:reisedatum>${reisedatum}</tem:reisedatum>
                <tem:Summe>${summe}</tem:Summe>
                <tem:pk_belegtyp>${pk}</tem:pk_belegtyp>
             </tem:proc_hole_belege_gruppiert_Result>
          </tem:gruppiert>
       </tem:Ergebnis>
    </soapenv:Body>
 </soapenv:Envelope>`;

  const { response } = await soapRequest({ url: url, headers: sampleHeaders, xml: xml, timeout: 1000 }); // Optional timeout parameter(milliseconds)
  const { body } = response;
  return body;
};

app.listen(PORT, () => console.log('SERVER STARTED in port ' + PORT));