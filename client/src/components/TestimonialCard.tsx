import { Card, CardContent } from '@/components/ui/card';
import { Quote, Star } from 'lucide-react';

interface TestimonialCardProps {
  name: string;
  review: string;
  rating: number;
  imageUrl: string;
}

export default function TestimonialCard({ name, review, rating, imageUrl }: TestimonialCardProps) {
  return (
    <Card className="testimonial-card bg-background rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 min-h-[250px]" data-testid={`testimonial-card-${name.toLowerCase().replace(/\s+/g, '-')}`}>
      <CardContent className="p-0">
        <div className="flex items-center mb-6">
          <img 
            src={imageUrl} 
            alt={`${name} - happy customer`}
            className="w-16 h-16 rounded-full mr-4 object-cover"
            data-testid={`testimonial-avatar-${name.toLowerCase().replace(/\s+/g, '-')}`}
          />
          <div>
            <h4 className="font-semibold text-foreground" data-testid={`testimonial-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {name}
            </h4>
            <div className="flex text-accent" data-testid={`testimonial-rating-${name.toLowerCase().replace(/\s+/g, '-')}`}>
              {[...Array(rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground leading-relaxed mb-4" data-testid={`testimonial-review-${name.toLowerCase().replace(/\s+/g, '-')}`}>
          "{review}"
        </p>
        
        <div className="flex justify-end">
          <Quote className="w-6 h-6 text-accent/30" />
        </div>
      </CardContent>
    </Card>
  );
}
