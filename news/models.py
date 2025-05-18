from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.urls import reverse

class NewsCategory(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(max_length=100, unique=True)
    
    class Meta:
        verbose_name_plural = 'News Categories'
    
    def __str__(self):
        return self.name
    
    def get_absolute_url(self):
        return reverse('news_category', args=[self.slug])

class News(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    content = models.TextField()
    image = models.ImageField(upload_to='news/', blank=True, null=True)
    published_date = models.DateTimeField(default=timezone.now)
    created_date = models.DateTimeField(auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True)
    category = models.ForeignKey(NewsCategory, on_delete=models.CASCADE, related_name='news')
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='news')
    is_published = models.BooleanField(default=True)
    
    class Meta:
        verbose_name_plural = 'News'
        ordering = ['-published_date']
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('news_detail', args=[self.slug])
