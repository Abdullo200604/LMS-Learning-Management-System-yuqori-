from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import News, NewsCategory

@login_required
def news_list(request):
    """List all news"""
    categories = NewsCategory.objects.all()
    category_slug = request.GET.get('category')
    
    if category_slug:
        category = get_object_or_404(NewsCategory, slug=category_slug)
        news_list = News.objects.filter(category=category, is_published=True)
    else:
        news_list = News.objects.filter(is_published=True)
    
    return render(request, 'news/news_list.html', {
        'news_list': news_list,
        'categories': categories,
        'current_category': category_slug
    })

@login_required
def news_detail(request, slug):
    """View news detail"""
    news = get_object_or_404(News, slug=slug, is_published=True)
    return render(request, 'news/news_detail.html', {'news': news})
