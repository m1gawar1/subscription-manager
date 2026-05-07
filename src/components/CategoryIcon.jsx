import React from 'react';
import { Tv, Music, Gamepad2, BookOpen, Cloud, Briefcase, Bot, ShoppingBag, Package } from 'lucide-react';

const ICON_MAP = {
  video:    Tv,
  music:    Music,
  game:     Gamepad2,
  reading:  BookOpen,
  cloud:    Cloud,
  work:     Briefcase,
  ai:       Bot,
  shopping: ShoppingBag,
  other:    Package,
};

const CategoryIcon = ({ id, size = 18, color = 'currentColor' }) => {
  const Icon = ICON_MAP[id] || Package;
  return <Icon size={size} color={color} />;
};

export default CategoryIcon;
