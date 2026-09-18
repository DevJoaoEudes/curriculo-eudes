export type ExperienceType = 'Hackathon' | 'Projeto' | 'Formação';

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: ExperienceType;
  questStage: string;
  questBadge: string;
  description: string;
  technologies: string[];
}
