import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { api, Product } from '@/lib/api';

const Catalog = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [selectedGender, selectedAge, priceRange]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const filters = {
        gender: selectedGender.join(','),
        ageGroup: selectedAge.join(','),
        minPrice: priceRange[0],
        maxPrice: priceRange[1]
      };
      const data = await api.getProducts(filters);
      setProducts(data);
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenderChange = (gender: string) => {
    setSelectedGender(prev =>
      prev.includes(gender) ? prev.filter(g => g !== gender) : [...prev, gender]
    );
  };

  const handleAgeChange = (age: string) => {
    setSelectedAge(prev =>
      prev.includes(age) ? prev.filter(a => a !== age) : [...prev, age]
    );
  };

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Цена</Label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={6000}
          step={100}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>{priceRange[0]} ₽</span>
          <span>{priceRange[1]} ₽</span>
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Пол</Label>
        <div className="space-y-2">
          {[
            { id: 'boy', label: 'Мальчики' },
            { id: 'girl', label: 'Девочки' },
            { id: 'unisex', label: 'Унисекс' }
          ].map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={option.id}
                checked={selectedGender.includes(option.id)}
                onCheckedChange={() => handleGenderChange(option.id)}
              />
              <label htmlFor={option.id} className="text-sm cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Возраст</Label>
        <div className="space-y-2">
          {[
            { id: '0-3', label: '0-3 года' },
            { id: '3-7', label: '3-7 лет' },
            { id: '7-12', label: '7-12 лет' }
          ].map(option => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`age-${option.id}`}
                checked={selectedAge.includes(option.id)}
                onCheckedChange={() => handleAgeChange(option.id)}
              />
              <label htmlFor={`age-${option.id}`} className="text-sm cursor-pointer">
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedGender([]);
          setSelectedAge([]);
          setPriceRange([0, 6000]);
        }}
      >
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <section id="catalog" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Каталог товаров</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Широкий выбор качественной детской одежды на любой вкус и возраст
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="gap-2 lg:hidden">
                  <Icon name="SlidersHorizontal" size={18} />
                  Фильтры
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px]">
                <SheetHeader>
                  <SheetTitle>Фильтры</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-sm text-muted-foreground">
              Найдено: {products.length} товаров
            </span>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Сортировка" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Популярные</SelectItem>
              <SelectItem value="price-asc">Дешевле</SelectItem>
              <SelectItem value="price-desc">Дороже</SelectItem>
              <SelectItem value="new">Новинки</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 bg-card rounded-xl p-6 border">
              <h3 className="text-lg font-semibold mb-6">Фильтры</h3>
              <FilterContent />
            </div>
          </aside>

          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <Icon name="Loader2" size={48} className="mx-auto text-primary animate-spin mb-4" />
                <p className="text-lg text-muted-foreground">Загрузка товаров...</p>
              </div>
            ) : (
              <>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>

                {products.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">Товары не найдены</p>
                    <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;