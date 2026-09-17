import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ContactChannel {
  name: string;
  label: string;
  value: string;
  url: string;
  icon: string;
  isExternal: boolean;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  // Canais de contato direto organizados como dados
  contacts = signal<ContactChannel[]>([
    {
      name: 'E-mail',
      label: 'Enviar mensagem direta',
      value: 'eudesjoao411@gmail.com',
      url: 'mailto:eudesjoao411@gmail.com',
      icon: 'email',
      isExternal: false
    },
    {
      name: 'LinkedIn',
      label: 'Conectar na rede profissional',
      value: 'linkedin.com/in/joao-eudes-914699414',
      url: 'https://www.linkedin.com/in/joao-eudes-914699414',
      icon: 'linkedin',
      isExternal: true
    },
    {
      name: 'GitHub',
      label: 'Explorar repositórios e código',
      value: 'github.com/DevJoaoEudes',
      url: 'https://github.com/DevJoaoEudes',
      icon: 'github',
      isExternal: true
    }
  ]);

  currentYear = new Date().getFullYear();
}
