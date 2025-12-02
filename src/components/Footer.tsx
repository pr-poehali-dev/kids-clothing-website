import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const links = {
    catalog: [
      { name: 'Для мальчиков', href: '#' },
      { name: 'Для девочек', href: '#' },
      { name: 'Новинки', href: '#' },
      { name: 'Распродажа', href: '#' }
    ],
    info: [
      { name: 'О компании', href: '#about' },
      { name: 'Доставка', href: '#delivery' },
      { name: 'Оплата', href: '#' },
      { name: 'Возврат', href: '#' }
    ],
    help: [
      { name: 'Контакты', href: '#contacts' },
      { name: 'FAQ', href: '#' },
      { name: 'Размерная сетка', href: '#' },
      { name: 'Блог', href: '#blog' }
    ]
  };

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Icon name="Shirt" size={28} className="text-primary" />
              <span className="text-xl font-bold text-primary">КидсМода</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-sm">
              Интернет-магазин качественной детской одежды. Стильные модели для детей от 0 до 12 лет.
            </p>
            <div className="flex gap-3">
              {['Instagram', 'Facebook', 'Twitter', 'Youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  <Icon name={social} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Каталог</h3>
            <ul className="space-y-2">
              {links.catalog.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Информация</h3>
            <ul className="space-y-2">
              {links.info.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Помощь</h3>
            <ul className="space-y-2">
              {links.help.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 КидсМода. Все права защищены.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">
              Политика конфиденциальности
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              Условия использования
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
