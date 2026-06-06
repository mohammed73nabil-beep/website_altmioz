import os
import re

# Define the directory to search in
search_dir = r'd:\laravel projects\maintenance\maintenance\resources\js'

# Define replacements
replacements = {
    # Tailwind classes with specific hex codes
    'bg-[#f8f7f6]': 'bg-background-light',
    'dark:bg-[#022C22]': 'dark:bg-background-dark',
    'bg-[#022C22]': 'bg-background-dark',
    'bg-[#064E3B]': 'bg-surface-dark',
    'dark:bg-[#064E3B]': 'dark:bg-surface-dark',
    'text-[#16A34A]': 'text-primary',
    'bg-[#16A34A]': 'bg-primary',
    'border-[#16A34A]': 'border-primary',
    'text-[#064E3B]': 'text-slate-900',
    'from-[#16A34A]': 'from-primary',
    'to-[#16A34A]': 'to-primary',
    'from-[#064E3B]': 'from-surface-dark',
    'to-[#064E3B]': 'to-surface-dark',
    'green-gradient': 'decoration-gradient',
    
    # Raw hex codes
    '#16A34A': '#C5A059',
    '#064E3B': '#0B1120',
    '#022C22': '#0F172A',
    '#4ADE80': '#D4AF37',
    '#22C55E': '#C5A059',
    
    # RGBA values
    'rgba(6,78,59,0.5)': 'rgba(17, 24, 39, 0.5)',
    'rgba(2,44,34,0.95)': 'rgba(10, 15, 26, 0.95)',
    'rgba(34, 197, 94, 0.5)': 'rgba(197, 160, 89, 0.5)',
    'rgba(34, 197, 94, 0.8)': 'rgba(197, 160, 89, 0.8)',
    'rgba(201, 162, 39, 0.3)': 'rgba(197, 160, 89, 0.3)',
    'rgba(201, 162, 39, 0.4)': 'rgba(197, 160, 89, 0.4)',
    'rgba(201, 162, 39, 0.5)': 'rgba(197, 160, 89, 0.5)',
    'rgba(201, 162, 39, 0.6)': 'rgba(197, 160, 89, 0.6)',
    
    # Generic Tailwind green classes
    'text-green-600': 'text-primary',
    'text-green-500': 'text-primary',
    'text-green-400': 'text-primary',
    'dark:text-green-400': 'dark:text-primary',
    'bg-green-500': 'bg-primary',
    'border-green-500': 'border-primary',
    'bg-green-600': 'bg-primary',
    'bg-green-50': 'bg-primary/5',
    'border-green-200': 'border-primary/20',
    'selection:bg-green-500': 'selection:bg-primary',
    'selection:text-green-900': 'selection:text-slate-900',
}

def process_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    for old, new in replacements.items():
        content = content.replace(old, new)
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated: {file_path}")

for root, dirs, files in os.walk(search_dir):
    for file in files:
        if file.endswith('.jsx') or file.endswith('.js') or file.endswith('.css'):
            process_file(os.path.join(root, file))

print("Color rebranding complete.")
