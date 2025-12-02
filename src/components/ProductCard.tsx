import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

const ProductCard = ({ id, name, price, oldPrice, image, category, sizes, isNew }: ProductCardProps) => {
  const [showSizeDialog, setShowSizeDialog] = useState(false);
  const [adding, setAdding] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = async (size: string) => {
    setAdding(true);
    try {
      await api.addToCart(id, size);
      toast({
        title: 'Товар добавлен в корзину',
        description: `${name} (размер ${size})`,
      });
      setShowSizeDialog(false);
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось добавить товар в корзину',
        variant: 'destructive',
      });
    } finally {
      setAdding(false);
    }
  };
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
        <Button size="sm" className="gap-1" onClick={() => setShowSizeDialog(true)}>
          <Icon name="ShoppingCart" size={16} />
          В корзину
        </Button>
      </CardFooter>

      <Dialog open={showSizeDialog} onOpenChange={setShowSizeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Выберите размер</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {sizes.map((size) => (
              <Button
                key={size}
                variant="outline"
                className="h-12"
                onClick={() => handleAddToCart(size)}
                disabled={adding}
              >
                {size}
              </Button>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default ProductCard;