import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento: any;
  
  constructor(public chatService: ChatService) { 
    
    this.chatService.loadMessages()
    .subscribe(() => {
        //move the scroll container to the end
        setTimeout( () =>{
          this.elemento.scrollTop = this.elemento.scrollHeight;
        },20);
    });
    
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
  }

  sendMessage(){
    console.log(this.mensaje);

    if (this.mensaje.length == 0){
      return;
    }
    
    this.chatService.addMessage(this.mensaje)
    .then(() => this.mensaje="") //if message sent, clear textbox
    .catch((err) => console.error('Error al enviar', err)); //if error occurs

  }

}
