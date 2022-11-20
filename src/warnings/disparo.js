import React,{useState} from 'react';
import emailjs from 'emailjs-com';


function App() {

  const[remetente,setRemetente] = useState('');
  const[destinatario,setDestinatario] = useState('');
  const[destinatarioemail,setDestinatarioemail]=useState('');
  const[mensagem,setMensagem]=useState('');

  const handleRemetenteChange = (e) => {
    setRemetente(e.target.value);
  }

  //será executada pelo form
  const SendEmail = (e) => {
    e.preventDefault();

    var templateParams = {
      remetente: remetente,
      destinatario: destinatario,
      destinatarioemail: destinatarioemail,
      mensagem: mensagem
    };

    emailjs.send('service_6ap2rfc','template_6xh483m',templateParams, 'hIA2EHNk3NdSX8gwt')
    .then(function(response){
      console.log('Success!!!!', response.status, response.text);
    }, function(error){
      console.log('Failed...', error);
    });
    console.log(templateParams);
  }}