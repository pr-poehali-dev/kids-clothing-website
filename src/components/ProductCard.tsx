import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  isNew?: boolean;
}

const ProductCard = ({ name, price, oldPrice, image, category, sizes, isNew }: ProductCardProps) => {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-border/50">
      <div className="relative overflow-hidden aspect-[3/4] bg-muted">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {isNew && (
          <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
            Новинка
          </Badge>
        )}
        {oldPrice && (
          <Badge className="absolute top-3 right-3 bg-destructive text-destructive-foreground">
            Скидка
          </Badge>
        )}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Icon name="Heart" size={18} />
        </Button>
      </div>
      <CardContent className="pt-4 space-y-2">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">{category}</p>
        <h3 className="font-semibold text-lg leading-tight line-clamp-2">{name}</h3>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground">Размеры:</span>
          {sizes.slice(0, 3).map((size) => (
            <Badge key={size} variant="outline" className="text-xs">
              {size}
            </Badge>
          ))}
          {sizes.length > 3 && (
            <span className="text-xs text-muted-foreground">+{sizes.length - 3}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-0">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{price} ₽</span>
          {oldPrice && (
            <span className="text-sm text-muted-foreground line-through">{oldPrice} ₽</span>
          )}
        </div>
        <Button size="sm" className="gap-1">
          <Icon name="ShoppingCart" size={16} />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
