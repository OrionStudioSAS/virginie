import React from 'react';

export interface Workplace {
  id: number;
  name: string;
  address: string;
  description: string;
  imageUrl: string;
}

export interface ScheduleItem {
  day: string;
  hours: string;
  location?: string;
}

export interface NavItem {
  label: string;
  targetId: string;
}

export interface PriceItem {
  label: string;
  price: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SpecialtyItem {
  title: string;
  description: string;
  icon: React.ElementType;
}

export interface TestimonialItem {
  name: string;
  text: string;
  rating: number;
}