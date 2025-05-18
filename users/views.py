from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import authenticate, login
from django.contrib import messages
from .forms import LoginForm, UserProfileForm, StudentProfileForm, TeacherProfileForm

def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    
    if request.method == 'POST':
        form = LoginForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                messages.success(request, f"Xush kelibsiz, {user.get_full_name()}!")
                return redirect('dashboard')
    else:
        form = LoginForm()
    
    return render(request, 'users/login.html', {'form': form})

@login_required
def dashboard(request):
    if hasattr(request.user, 'teacher_profile'):
        return render(request, 'users/teacher_dashboard.html')
    else:
        return render(request, 'users/dashboard.html')

@login_required
def profile(request):
    if request.method == 'POST':
        user_form = UserProfileForm(request.POST, instance=request.user)
        
        if hasattr(request.user, 'student_profile'):
            profile_form = StudentProfileForm(request.POST, instance=request.user.student_profile)
        else:
            profile_form = TeacherProfileForm(request.POST, instance=request.user.teacher_profile)
        
        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()
            messages.success(request, "Profil muvaffaqiyatli yangilandi!")
            return redirect('profile')
    else:
        user_form = UserProfileForm(instance=request.user)
        
        if hasattr(request.user, 'student_profile'):
            profile_form = StudentProfileForm(instance=request.user.student_profile)
        else:
            profile_form = TeacherProfileForm(instance=request.user.teacher_profile)
    
    return render(request, 'users/profile.html', {
        'user_form': user_form,
        'profile_form': profile_form
    })
