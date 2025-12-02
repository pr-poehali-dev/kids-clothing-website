import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import { api } from '@/lib/api';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    loadCartCount();
    const interval = setInterval(loadCartCount, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadCartCount = async () => {
    try {
      const cart = await api.getCart();
      setCartCount(cart.count);
    } catch (error) {
      console.error('Failed to load cart:', error);
    }
  };

  const navLinks = [
    { name: 'Главная', href: '#home' },
    { name: 'Каталог', href: '#catalog' },
    { name: 'О нас', href: '#about' },
    { name: 'Блог', href: '#blog' },
    { name: 'Доставка', href: '#delivery' },
    { name: 'Контакты', href: '#contacts' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shirt" size={28} className="text-primary" />
            <span className="text-xl font-bold text-primary">КидсМода</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Icon name="Search" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Icon name="ShoppingCart" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-[10px] text-primary-foreground flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Icon name="Menu" size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      {link.name}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;