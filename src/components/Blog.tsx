import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: 'Как выбрать размер детской одежды',
      excerpt: 'Полное руководство по выбору правильного размера для вашего ребенка',
      date: '15 ноября 2024',
      category: 'Советы',
      readTime: '5 мин'
    },
    {
      id: 2,
      title: 'Тренды детской моды 2024',
      excerpt: 'Актуальные цвета, принты и стили в детской одежде этого сезона',
      date: '10 ноября 2024',
      category: 'Мода',
      readTime: '7 мин'
    },
    {
      id: 3,
      title: 'Уход за детской одеждой',
      excerpt: 'Простые правила, которые помогут сохранить вещи в идеальном состоянии',
      date: '5 ноября 2024',
      category: 'Уход',
      readTime: '4 мин'
    }
  ];

  return (
    <section id="blog" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Блог</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Полезные статьи о детской моде, советы по выбору и уходу за одеждой
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map(post => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-xl overflow-hidden">
                <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform">
                  <Icon name="Newspaper" size={48} className="text-primary/40" />
                </div>
              </div>
              <CardHeader className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {post.readTime}
                  </div>
                </div>
                <h3 className="font-semibold text-xl group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Icon name="Calendar" size={14} />
                  {post.date}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
