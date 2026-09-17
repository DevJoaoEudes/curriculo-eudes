import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Experience } from '../../models/experience.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent {
  // Lista reativa com os marcos da trajetória técnica
  experiences = signal<Experience[]>([
    {
      id: 'proenergia-2026',
      role: 'Participante & Desenvolvedor Full Stack',
      organization: 'Hackathon Proenergia Summit 2026',
      period: '2026',
      type: 'Hackathon',
      description: 'Desenvolvimento intensivo de soluções inovadoras para desafios do setor energético. Criação de arquitetura frontend moderna com Angular 22, componentização reativa via Signals, e integração com lógica de backend e modelagem em banco de dados.',
      technologies: ['Angular 22', 'TypeScript', 'SCSS', 'Python', 'SQL']
    },
    {
      id: 'projetos-praticos',
      role: 'Desenvolvedor Full Stack em Formação',
      organization: 'Projetos Práticos & Transição de Carreira',
      period: '2025 - 2026',
      type: 'Projeto',
      description: 'Construção contínua de aplicações web full stack, aprofundamento em lógica de programação, consumo e criação de APIs RESTful, POO com Python e Java, e modelagem relacional de dados com SQL.',
      technologies: ['Python', 'SQL', 'Java', 'Angular', 'Git & GitHub']
    },
    {
      id: 'formacao-continua',
      role: 'Capacitação Contínua & Fundamentos de Software',
      organization: 'Autodidatismo & Trilhas de Especialização',
      period: '2024 - Presente',
      type: 'Formação',
      description: 'Estudo dedicado de arquitetura de software, Clean Code, versionamento semântico com Git, modularização de código e melhores práticas de acessibilidade e performance web.',
      technologies: ['Estrutura de Dados', 'Clean Code', 'Bancos Relacionais', 'Metodologias Ágeis']
    }
  ]);
}
