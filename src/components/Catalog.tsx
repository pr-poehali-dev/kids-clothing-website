import { useState } from 'react';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category: string;
  sizes: string[];
  isNew?: boolean;
  gender: string;
  ageGroup: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Летний комплект для мальчика',
    price: 2490,
    oldPrice: 3560,
    image: 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/626b9215-334f-4c88-86a2-705c9b06836d.jpg',
    category: 'Комплекты',
    sizes: ['92', '98', '104', '110'],
    isNew: true,
    gender: 'boy',
    ageGroup: '0-3'
  },
  {
    id: 2,
    name: 'Платье для девочки с рюшами',
    price: 3290,
    image: 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/c9ff5197-c89a-4430-9a1d-99f9630fd7c4.jpg',
    category: 'Платья',
    sizes: ['86', '92', '98', '104'],
    isNew: true,
    gender: 'girl',
    ageGroup: '0-3'
  },
  {
    id: 3,
    name: 'Футболка с принтом космос',
    price: 890,
    image: 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/626b9215-334f-4c88-86a2-705c9b06836d.jpg',
    category: 'Футболки',
    sizes: ['110', '116', '122', '128', '134'],
    gender: 'boy',
    ageGroup: '3-7'
  },
  {
    id: 4,
    name: 'Джинсовая куртка',
    price: 4200,
    oldPrice: 5600,
    image: 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/2727d0b5-1f68-4257-8c44-a50484a42959.jpg',
    category: 'Верхняя одежда',
    sizes: ['128', '134', '140', '146'],
    gender: 'unisex',
    ageGroup: '7-12'
  },
  {
    id: 5,
    name: 'Спортивный костюм',
    price: 2890,
    image: 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/626b9215-334f-4c88-86a2-705c9b06836d.jpg',
    category: 'Костюмы',
    sizes: ['110', '116', '122', '128'],
    gender: 'unisex',
    ageGroup: '3-7'
  },
  {
    id: 6,
    name: 'Теплая толстовка с капюшоном',
    price: 1990,
    image: 'https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/c9ff5197-c89a-4430-9a1d-99f9630fd7c4.jpg',
    category: 'Толстовки',
    sizes: ['92', '98', '104', '110', '116'],
    isNew: true,
    gender: 'girl',
    ageGroup: '0-3'
  }
];

const Catalog = () => {
  const [priceRange, setPriceRange] = useState([0, 6000]);
  const [selectedGender, setSelectedGender] = useState<string[]>([]);
  const [selectedAge, setSelectedAge] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('popular');

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

  const filteredProducts = products.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    const genderMatch = selectedGender.length === 0 || selectedGender.includes(product.gender) || product.gender === 'unisex';
    const ageMatch = selectedAge.length === 0 || selectedAge.includes(product.ageGroup);
    
    return priceMatch && genderMatch && ageMatch;
  });

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
              Найдено: {filteredProducts.length} товаров
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Icon name="SearchX" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground">Товары не найдены</p>
                <p className="text-sm text-muted-foreground mt-2">Попробуйте изменить фильтры</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
