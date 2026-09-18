import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
  inject,
  ElementRef,
  ViewChild,
  NgZone
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HeroSkill {
  id: string;
  name: string;
  category: string;
  level: string; // Nível variado estilo jogo retrô (todos abaixo de 50)
  svgRaw: string;
}

interface PixelParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  targetX: number;
  targetY: number;
  faceX: number;
  faceY: number;
  faceColor: string;
  size: number;
  alpha: number;
  targetAlpha: number;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('pixelCanvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private ngZone = inject(NgZone);

  // Informações do Jogador / Desenvolvedor
  readonly name = signal('João Eudes');
  readonly role = signal('Estudante de Engenharia de Software');
  readonly bio = signal(
    'Estudante de Engenharia de Software com paixão especial por Bancos de Dados, modelagem de dados, arquitetura de sistemas e desenvolvimento de soluções robustas.'
  );
  readonly status = signal('ONLINE // READY FOR QUESTS');

  // Estado do display retro-futurista
  readonly currentMode = signal<'face' | 'skill'>('face');
  readonly currentSkillIndex = signal<number>(0);
  readonly isPaused = signal<boolean>(false);

  // 9 Tecnologias do Eudes (Níveis variados e todos ESTRITAMENTE ABAIXO DE 50)
  readonly heroSkills: HeroSkill[] = [
    {
      id: 'python',
      name: 'Python',
      category: 'Backend & Automação',
      level: 'LVL.42',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <path d="M12 2C6.5 2 7 4.5 7 4.5V7H12V8H5C3 8 2 9.5 2 12C2 14.5 3.5 15 5 15H7V13.5C7 12 8 11 9.5 11H14.5C16 11 17 10 17 8.5V4.5C17 4.5 17.5 2 12 2Z" stroke="#00f3ff"/>
          <circle cx="9" cy="4.5" r="0.9" fill="#00f3ff"/>
          <path d="M12 22C17.5 22 17 19.5 17 19.5V17H12V16H19C21 16 22 14.5 22 12C22 9.5 20.5 9 19 9H17V10.5C17 12 16 13 14.5 13H9.5C8 13 7 14 7 15.5V19.5C7 19.5 6.5 22 12 22Z" stroke="#38bdf8"/>
          <circle cx="15" cy="19.5" r="0.9" fill="#38bdf8"/>
        </svg>
      `
    },
    {
      id: 'sql',
      name: 'SQL & Modelagem',
      category: 'Dados & Banco',
      level: 'LVL.48',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <ellipse cx="12" cy="5" rx="8.5" ry="3" stroke="#00f3ff"/>
          <path d="M3.5 5V12C3.5 13.66 7.3 15 12 15C16.7 15 20.5 13.66 20.5 12V5" stroke="#00f3ff"/>
          <path d="M3.5 12V19C3.5 20.66 7.3 22 12 22C16.7 22 20.5 20.66 20.5 19V12" stroke="#38bdf8"/>
          <path d="M12 8V12M12 15V19" stroke="#38bdf8" stroke-dasharray="2 2"/>
        </svg>
      `
    },
    {
      id: 'angular',
      name: 'Angular (v17 - v22)',
      category: 'Frontend Moderno',
      level: 'LVL.45',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <polygon points="12 2 2 6 3.5 17.5 12 22 20.5 17.5 22 6 12 2" stroke="#00f3ff"/>
          <path d="M12 5.5L7 16H9.2L10.3 13.3H13.7L14.8 16H17L12 5.5Z" stroke="#38bdf8"/>
          <line x1="11" y1="11.5" x2="13" y2="11.5" stroke="#00f3ff"/>
        </svg>
      `
    },
    {
      id: 'typescript',
      name: 'TypeScript',
      category: 'Frontend & Backend',
      level: 'LVL.40',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <rect x="3" y="3" width="18" height="18" rx="4" stroke="#00f3ff"/>
          <path d="M7 8H13M10 8V17" stroke="#38bdf8"/>
          <path d="M14.5 15C15 16 16 16.5 17 16.5C18 16.5 19 15.8 19 14.8C19 13.5 17.5 13 16 12.5C14.5 12 14.5 11 14.5 10.2C14.5 9.2 15.5 8.5 16.8 8.5C17.8 8.5 18.5 9 19 9.8" stroke="#38bdf8"/>
        </svg>
      `
    },
    {
      id: 'java',
      name: 'Java & Spring',
      category: 'Backend Corporativo',
      level: 'LVL.28',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <path d="M18 8H6C4.9 8 4 8.9 4 10V16C4 18.2 5.8 20 8 20H14C16.2 20 18 18.2 18 16V14" stroke="#00f3ff"/>
          <path d="M18 10H20C21.1 10 22 10.9 22 12C22 13.1 21.1 14 20 14H18V10Z" stroke="#38bdf8"/>
          <path d="M8 5C8 5 9 4 9 3M12 5C12 5 13 4 13 3M15 5C15 5 16 4 16 3" stroke="#38bdf8" stroke-linecap="round"/>
        </svg>
      `
    },
    {
      id: 'scss',
      name: 'SCSS & CSS3',
      category: 'Design & Tokens',
      level: 'LVL.36',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" stroke="#00f3ff"/>
          <path d="M7.5 10.5C7.5 9 8.5 8 10.5 8C12 8 13.5 8.8 14 10C14.5 11.2 13.8 12.2 12.5 12.8C10.5 13.5 9.5 14.2 9.5 15.5C9.5 17 11 17.5 12.5 17.5C14 17.5 15.5 16.8 16.5 15.5" stroke="#38bdf8"/>
        </svg>
      `
    },
    {
      id: 'postgresql',
      name: 'PostgreSQL',
      category: 'Dados & Banco',
      level: 'LVL.44',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <path d="M12 3C8 3 5 5 5 8C5 10 6.5 11.5 8.5 12.5L7 19H10L11 15C11.3 15 11.7 15 12 15C12.3 15 12.7 15 13 15L14 19H17L15.5 12.5C17.5 11.5 19 10 19 8C19 5 16 3 12 3Z" stroke="#00f3ff"/>
          <circle cx="9.5" cy="7.5" r="1.1" fill="#38bdf8"/>
          <circle cx="14.5" cy="7.5" r="1.1" fill="#38bdf8"/>
        </svg>
      `
    },
    {
      id: 'docker',
      name: 'Docker',
      category: 'DevOps & Containers',
      level: 'LVL.32',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <rect x="5" y="10" width="3" height="3" stroke="#00f3ff"/>
          <rect x="9" y="10" width="3" height="3" stroke="#00f3ff"/>
          <rect x="13" y="10" width="3" height="3" stroke="#00f3ff"/>
          <rect x="9" y="6" width="3" height="3" stroke="#00f3ff"/>
          <rect x="13" y="6" width="3" height="3" stroke="#00f3ff"/>
          <path d="M2 14.5C3.5 14.5 4.5 16 7 16C9.5 16 11 14.5 13.5 14.5C16 14.5 17.5 16 20 16C21.5 16 22 15 22 14C22 10.5 18 10 18 10C17.5 8 16 7 14 7V13H2.5C2.2 13.5 2 14 2 14.5Z" stroke="#38bdf8"/>
        </svg>
      `
    },
    {
      id: 'git',
      name: 'Git & GitHub',
      category: 'DevOps & Versionamento',
      level: 'LVL.39',
      svgRaw: `
        <svg viewBox="0 0 24 24" width="46" height="46" fill="none" stroke-width="1.8">
          <circle cx="6" cy="6" r="3" stroke="#00f3ff"/>
          <circle cx="6" cy="18" r="3" stroke="#00f3ff"/>
          <circle cx="18" cy="9" r="3" stroke="#38bdf8"/>
          <path d="M6 9V15M6 9C6 11.5 8.5 13.5 11 13.5H13C14.5 13.5 16.5 12 17 10.5" stroke="#38bdf8"/>
        </svg>
      `
    }
  ];

  // Informações calculadas para o HUD de jogo
  readonly currentSkill = computed(() => this.heroSkills[this.currentSkillIndex()]);
  readonly skillSlotNumber = computed(() => `0${this.currentSkillIndex() + 1}/0${this.heroSkills.length}`);

  private particles: PixelParticle[] = [];
  private skillTargetsMap = new Map<string, { x: number; y: number }[]>();
  private animId: number | null = null;
  private autoCycleTimer: any = null;

  ngOnInit(): void {
    this.precomputeSkillTargets();
  }

  ngAfterViewInit(): void {
    if (this.canvasRef?.nativeElement) {
      this.initPixelEngine(this.canvasRef.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this.animId) {
      cancelAnimationFrame(this.animId);
    }
    if (this.autoCycleTimer) {
      clearInterval(this.autoCycleTimer);
    }
  }

  // Prepara os pixels-alvo de cada SVG de skill
  private precomputeSkillTargets(): void {
    for (const skill of this.heroSkills) {
      let svgStr = skill.svgRaw.trim();
      if (!svgStr.includes('xmlns=')) {
        svgStr = svgStr.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }
      const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = 48;
        offCanvas.height = 48;
        const offCtx = offCanvas.getContext('2d', { willReadFrequently: true })!;
        offCtx.drawImage(img, 6, 6, 36, 36);
        const imgData = offCtx.getImageData(0, 0, 48, 48).data;
        const pts: { x: number; y: number }[] = [];

        for (let y = 0; y < 48; y++) {
          for (let x = 0; x < 48; x++) {
            const idx = (y * 48 + x) * 4;
            const a = imgData[idx + 3];
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            if (a > 40 && (r > 30 || g > 30 || b > 30)) {
              pts.push({ x: x * 5, y: y * 5 });
            }
          }
        }
        this.skillTargetsMap.set(skill.id, pts);
        URL.revokeObjectURL(url);
      };
      img.src = url;
    }
  }

  // Inicializa o motor de partículas no Canvas
  private initPixelEngine(canvas: HTMLCanvasElement): void {
    const faceImg = new Image();
    faceImg.src = typeof document !== 'undefined' ? new URL('eudes-neon-face.jpg', document.baseURI).href : 'eudes-neon-face.jpg';
    faceImg.onload = () => {
      const offCanvas = document.createElement('canvas');
      offCanvas.width = 48;
      offCanvas.height = 48;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true })!;
      offCtx.drawImage(faceImg, 0, 0, 48, 48);
      const imgData = offCtx.getImageData(0, 0, 48, 48).data;

      const facePoints: { x: number; y: number; color: string }[] = [];
      for (let y = 0; y < 48; y++) {
        for (let x = 0; x < 48; x++) {
          const idx = (y * 48 + x) * 4;
          const r = imgData[idx];
          const g = imgData[idx + 1];
          const b = imgData[idx + 2];
          const a = imgData[idx + 3];

          if (a > 60 && (r > 30 || g > 30 || b > 30)) {
            facePoints.push({
              x: x * 5,
              y: y * 5,
              color: `rgb(${r},${g},${b})`
            });
          }
        }
      }

      // Cria partículas convergindo para o rosto na abertura
      this.particles = facePoints.map(pt => {
        const spreadAngle = Math.random() * Math.PI * 2;
        const spreadDist = 40 + Math.random() * 80;
        return {
          x: 120 + Math.cos(spreadAngle) * spreadDist,
          y: 120 + Math.sin(spreadAngle) * spreadDist,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          targetX: pt.x,
          targetY: pt.y,
          faceX: pt.x,
          faceY: pt.y,
          faceColor: pt.color,
          size: 4.4,
          alpha: 1,
          targetAlpha: 1
        };
      });

      // Inicia renderização em 60fps
      this.startAnimationLoop(canvas);

      // Inicia o ciclo: Rosto passa UMA VEZ na abertura, depois cicla SOMENTE as skills
      this.startSequentialGameCycle();
    };
  }

  // Loop de renderização fluida 60fps fora da zona Angular
  private startAnimationLoop(canvas: HTMLCanvasElement): void {
    const ctx = canvas.getContext('2d')!;
    const spring = 0.088;
    const friction = 0.81;

    const animate = () => {
      this.animId = requestAnimationFrame(animate);

      const isFace = this.currentMode() === 'face';

      // Atualização física das partículas
      for (const p of this.particles) {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        p.vx = (p.vx + dx * spring) * friction;
        p.vy = (p.vy + dy * spring) * friction;
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += (p.targetAlpha - p.alpha) * 0.12;
      }

      ctx.clearRect(0, 0, 240, 240);

      // Glow cibernético no fundo do canvas
      const grad = ctx.createRadialGradient(120, 120, 10, 120, 120, 120);
      grad.addColorStop(0, 'rgba(0, 243, 255, 0.07)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 240, 240);

      // Desenho dos blocos de pixel nítidos
      for (const p of this.particles) {
        if (p.alpha <= 0.04) continue;
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = isFace ? p.faceColor : '#00f3ff';
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      }
      ctx.globalAlpha = 1.0;
    };

    this.ngZone.runOutsideAngular(() => {
      this.animId = requestAnimationFrame(animate);
    });
  }

  // Ciclo: Rosto aparece UMA ÚNICA VEZ na abertura e depois o loop cicla exclusivamente entre as skills
  private startSequentialGameCycle(): void {
    // Exibe o rosto durante 4.2 segundos iniciais
    setTimeout(() => {
      // Transiciona do rosto para a primeira skill
      this.morphToSkill(0);

      // A partir de agora, cicla SOMENTE entre as skills (Python -> SQL -> Angular -> ...)
      this.autoCycleTimer = setInterval(() => {
        if (this.isPaused()) return;
        this.nextSkill();
      }, 3800);
    }, 4200);
  }

  // Morfar partículas para uma skill específica
  morphToSkill(index: number): void {
    if (this.particles.length === 0) return;

    this.currentMode.set('skill');
    this.currentSkillIndex.set(index);

    const skill = this.heroSkills[index];
    const targetPoints = this.skillTargetsMap.get(skill.id) || [];
    const numTargets = targetPoints.length;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      if (numTargets > 0 && i < numTargets) {
        p.targetX = targetPoints[i].x;
        p.targetY = targetPoints[i].y;
        p.targetAlpha = 1.0;
      } else if (numTargets > 0) {
        // Partículas excedentes formam o anel orbital holográfico ao redor do ícone
        const angle = (i / (this.particles.length - numTargets + 1)) * Math.PI * 2;
        const radius = 95 + (i % 6) * 3;
        p.targetX = 120 + Math.cos(angle) * radius;
        p.targetY = 120 + Math.sin(angle) * radius;
        p.targetAlpha = 0.35;
      }

      // Impulso de dispersão com física retrô
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.0;
      p.vx += Math.cos(angle) * speed;
      p.vy += Math.sin(angle) * speed;
    }
  }

  // Avança para a próxima skill
  nextSkill(event?: Event): void {
    if (event) event.stopPropagation();

    if (this.currentMode() === 'face') {
      this.morphToSkill(0);
      return;
    }

    const nextIdx = (this.currentSkillIndex() + 1) % this.heroSkills.length;
    this.morphToSkill(nextIdx);
  }

  // Retorna para a skill anterior
  prevSkill(event?: Event): void {
    if (event) event.stopPropagation();

    if (this.currentMode() === 'face') {
      this.morphToSkill(this.heroSkills.length - 1);
      return;
    }

    const prevIdx = (this.currentSkillIndex() - 1 + this.heroSkills.length) % this.heroSkills.length;
    this.morphToSkill(prevIdx);
  }

  // Ação manual: Permite rever o rosto do jogador se desejar
  showPlayerFace(event?: Event): void {
    if (event) event.stopPropagation();
    if (this.particles.length === 0) return;

    this.currentMode.set('face');

    for (const p of this.particles) {
      p.targetX = p.faceX;
      p.targetY = p.faceY;
      p.targetAlpha = 1.0;

      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 5.0;
      p.vx += Math.cos(angle) * speed;
      p.vy += Math.sin(angle) * speed;
    }
  }

  // Pausa ao passar o mouse
  pauseCycle(): void {
    this.isPaused.set(true);
  }

  resumeCycle(): void {
    this.isPaused.set(false);
  }
}
