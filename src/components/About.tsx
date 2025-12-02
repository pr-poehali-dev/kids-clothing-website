import Icon from '@/components/ui/icon';

const About = () => {
  const features = [
    {
      icon: 'Sparkles',
      title: 'Качество',
      description: 'Только сертифицированные материалы и проверенные производители'
    },
    {
      icon: 'Heart',
      title: 'Забота',
      description: 'Гипоаллергенные ткани, безопасные для нежной детской кожи'
    },
    {
      icon: 'Palette',
      title: 'Дизайн',
      description: 'Современные стильные модели, которые нравятся детям'
    },
    {
      icon: 'BadgeCheck',
      title: 'Гарантия',
      description: 'Возврат и обмен в течение 30 дней без вопросов'
    }
  ];

  return (
    <section id="about" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">О нас</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              КидсМода — это интернет-магазин детской одежды, который заботится о комфорте 
              и стиле вашего ребенка. Мы тщательно отбираем каждую модель, чтобы она была 
              не только красивой, но и удобной в носке.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Наша миссия — помочь родителям одевать своих детей качественно и стильно, 
              не тратя при этом целое состояние. Мы работаем напрямую с производителями, 
              поэтому можем предложить лучшие цены на рынке.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={feature.icon} size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
