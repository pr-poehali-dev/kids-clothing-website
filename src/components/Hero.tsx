import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-secondary/20 via-background to-accent/20">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Стильная одежда <br />
              <span className="text-primary">для детей</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md">
              Качественная и удобная детская одежда для вашего малыша. 
              Современные дизайны, натуральные материалы, доступные цены.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="gap-2">
                Перейти в каталог
                <Icon name="ArrowRight" size={20} />
              </Button>
              <Button size="lg" variant="outline">
                Узнать больше
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Icon name="Truck" size={24} className="text-primary" />
                <span className="text-sm">Быстрая доставка</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Shield" size={24} className="text-primary" />
                <span className="text-sm">Гарантия качества</span>
              </div>
            </div>
          </div>

          <div className="relative h-[400px] md:h-[500px] animate-slide-up">
            <img
              src="https://cdn.poehali.dev/projects/81f0d978-6600-4494-9ff6-960c7f4f73bd/files/2727d0b5-1f68-4257-8c44-a50484a42959.jpg"
              alt="Детская одежда"
              className="rounded-2xl object-cover w-full h-full shadow-2xl"
            />
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-6 py-4 rounded-xl shadow-lg">
              <p className="text-3xl font-bold">-30%</p>
              <p className="text-sm">на первый заказ</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
