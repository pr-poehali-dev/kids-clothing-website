import Icon from '@/components/ui/icon';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Delivery = () => {
  const deliveryOptions = [
    {
      icon: 'Truck',
      title: 'Курьерская доставка',
      description: 'По Москве и МО — 1-2 дня',
      price: 'от 300 ₽'
    },
    {
      icon: 'Package',
      title: 'Пункты выдачи',
      description: 'Более 5000 пунктов по России',
      price: 'от 200 ₽'
    },
    {
      icon: 'Home',
      title: 'Почта России',
      description: 'Доставка в любую точку страны',
      price: 'от 250 ₽'
    }
  ];

  return (
    <section id="delivery" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Доставка</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Быстрая и надежная доставка во все регионы России
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {deliveryOptions.map((option, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={option.icon} size={32} className="text-primary" />
                </div>
                <CardTitle className="text-xl">{option.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-muted-foreground">{option.description}</p>
                <p className="text-2xl font-bold text-primary">{option.price}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-card border rounded-xl p-8">
          <h3 className="text-2xl font-bold mb-6">Условия доставки</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Бесплатная доставка</p>
                  <p className="text-sm text-muted-foreground">
                    При заказе от 3000 ₽ по всей России
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Примерка перед оплатой</p>
                  <p className="text-sm text-muted-foreground">
                    Оплачивайте только понравившиеся вещи
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Возврат 30 дней</p>
                  <p className="text-sm text-muted-foreground">
                    Вернем деньги без лишних вопросов
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Отслеживание заказа</p>
                  <p className="text-sm text-muted-foreground">
                    SMS и email уведомления о статусе
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Упаковка в подарок</p>
                  <p className="text-sm text-muted-foreground">
                    Красивая упаковка бесплатно к каждому заказу
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Icon name="CheckCircle2" size={24} className="text-primary flex-shrink-0" />
                <div>
                  <p className="font-semibold mb-1">Гарантия качества</p>
                  <p className="text-sm text-muted-foreground">
                    Проверяем каждую вещь перед отправкой
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Delivery;
