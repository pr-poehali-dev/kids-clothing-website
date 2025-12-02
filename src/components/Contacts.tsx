import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';

const Contacts = () => {
  return (
    <section id="contacts" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Свяжитесь с нами любым удобным способом
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6">Наши контакты</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Телефон</p>
                    <a href="tel:+74951234567" className="text-muted-foreground hover:text-primary">
                      +7 (495) 123-45-67
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Email</p>
                    <a href="mailto:info@kidsmoda.ru" className="text-muted-foreground hover:text-primary">
                      info@kidsmoda.ru
                    </a>
                    <p className="text-sm text-muted-foreground mt-1">Ответим в течение часа</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Адрес</p>
                    <p className="text-muted-foreground">
                      г. Москва, ул. Примерная, д. 123
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">Пн-Пт: 10:00-20:00, Сб-Вс: 11:00-19:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Мы в соцсетях</h3>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'Twitter'].map((social) => (
                  <Button key={social} variant="outline" size="icon" className="rounded-full">
                    <Icon name={social} size={20} />
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6">Напишите нам</h3>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input id="name" placeholder="Ваше имя" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Сообщение</Label>
                <Textarea
                  id="message"
                  placeholder="Расскажите, чем мы можем помочь"
                  rows={4}
                />
              </div>
              <Button className="w-full" size="lg">
                Отправить сообщение
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
