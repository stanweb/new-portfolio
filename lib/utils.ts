import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { icons, LucideIcon } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



export const getIcon = (iconName: string): LucideIcon => {
  const Icon = icons[iconName as keyof typeof icons];
  return Icon || icons.Code;
};
