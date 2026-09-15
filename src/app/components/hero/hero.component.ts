import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  // Signals: dados reativos do componente
  readonly name = signal('João Eudes');
  readonly role = signal('Estudante de Engenharia de Software');
  readonly bio = signal(
    'Estudante de Engenharia de Software com paixão especial por Bancos de Dados, modelagem de dados, arquitetura de sistemas e desenvolvimento de soluções robustas.'
  );
  readonly status = signal('Disponível para Projetos & Estágio');
}
