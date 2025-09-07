import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface MenuCardProps {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  onAddToCart: () => void;
}

export default function MenuCard({ name, description, price, imageUrl, onAddToCart }: MenuCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="menu-card bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl group transition-all duration-400 transform-gpu"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-testid={`menu-card-${name.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={`${name} - premium coffee served in elegant cup`}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          data-testid={`menu-image-${name.toLowerCase().replace(/\s+/g, '-')}`}
        />
        <div className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-2xl font-bold text-card-foreground" data-testid={`menu-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {name}
          </h3>
          <span className="text-2xl font-bold text-primary" data-testid={`menu-price-${name.toLowerCase().replace(/\s+/g, '-')}`}>
            {price}
          </span>
        </div>
        
        <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`menu-description-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          {description}
        </p>
        
        <Button 
          onClick={onAddToCart}
          className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors group-hover:animate-pulse"
          data-testid={`button-add-to-cart-${name.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add to Order
        </Button>
      </CardContent>
    </Card>
  );
}
