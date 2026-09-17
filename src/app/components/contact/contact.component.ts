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
      value: 'joaoeudes.dev@gmail.com',
      url: 'mailto:joaoeudes.dev@gmail.com',
      icon: 'email',
      isExternal: false
    },
    {
      name: 'LinkedIn',
      label: 'Conectar na rede profissional',
      value: 'linkedin.com/in/joaoeudes',
      url: 'https://linkedin.com',
      icon: 'linkedin',
      isExternal: true
    },
    {
      name: 'GitHub',
      label: 'Explorar repositórios e código',
      value: 'github.com/joaoeudes7',
      url: 'https://github.com',
      icon: 'github',
      isExternal: true
    }
  ]);

  currentYear = new Date().getFullYear();
}
