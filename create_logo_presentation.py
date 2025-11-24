#!/usr/bin/env python3
"""
Create a professional PDF presentation of the three Dependable Home Improvement logo concepts
"""

from reportlab.lib.pagesizes import letter, landscape
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.colors import HexColor
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle, PageBreak
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
import os

# Page setup - Landscape orientation
pdf_file = "Dependable_Logo_Concepts_Presentation.pdf"
doc = SimpleDocTemplate(pdf_file, pagesize=landscape(letter), 
                       topMargin=0.5*inch, bottomMargin=0.5*inch,
                       leftMargin=0.5*inch, rightMargin=0.5*inch)

story = []

# Brand colors
BROWN = HexColor('#654321')
GOLD = HexColor('#B8860B')
CREAM = HexColor('#F5F5DC')
WHITE = colors.white
CHARCOAL = HexColor('#36454F')

# Styles
title_style = ParagraphStyle('Title', fontSize=36, textColor=BROWN, fontName='Helvetica-Bold', 
                             alignment=TA_CENTER, spaceAfter=10, leading=42)
subtitle_style = ParagraphStyle('Subtitle', fontSize=18, textColor=GOLD, fontName='Helvetica-Bold', 
                               alignment=TA_CENTER, spaceAfter=30, leading=22)
heading_style = ParagraphStyle('Heading', fontSize=16, textColor=BROWN, fontName='Helvetica-Bold', 
                              alignment=TA_CENTER, spaceAfter=10, leading=20)
body_style = ParagraphStyle('Body', fontSize=11, textColor=CHARCOAL, fontName='Helvetica', 
                           alignment=TA_CENTER, spaceAfter=12, leading=14)

# ============= COVER PAGE =============
story.append(Spacer(1, 1.5*inch))

# Cascadia logo at top
if os.path.exists('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg'):
    cascadia_width = 3*inch
    cascadia_height = cascadia_width / 1.294
    cascadia_logo = Image('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg', width=cascadia_width, height=cascadia_height)
    cascadia_logo.hAlign = 'CENTER'
    story.append(cascadia_logo)
    story.append(Spacer(1, 0.5*inch))

story.append(Paragraph("Logo Design Concepts", title_style))
story.append(Paragraph("Dependable Home Improvement", subtitle_style))
story.append(Spacer(1, 0.3*inch))
story.append(Paragraph("Three Modern Logo Concepts for Your Review", body_style))
story.append(Paragraph("November 2025", body_style))

story.append(PageBreak())

# ============= LOGO CONCEPTS PAGE =============
story.append(Spacer(1, 0.3*inch))
story.append(Paragraph("Logo Concept Options", title_style))
story.append(Spacer(1, 0.5*inch))

# Create table with three logos side by side
logo_data = []

# Row 1: Logo images with proper aspect ratios
logo_row = []
logo_specs = [
    (1, 1.79167, 3.2*inch),  # Concept 1: landscape, width=3.2"
    (2, 1.0, 2.5*inch),      # Concept 2: square, width=2.5"
    (3, 1.0, 2.5*inch)       # Concept 3: square, width=2.5"
]

for concept_num, aspect_ratio, width in logo_specs:
    logo_path = f'/home/ubuntu/dependable_premium/Dependable_Logo_Concept_{concept_num}.png'
    if os.path.exists(logo_path):
        height = width / aspect_ratio
        logo_img = Image(logo_path, width=width, height=height)
        logo_row.append(logo_img)
    else:
        logo_row.append(Paragraph("Logo not found", body_style))

logo_data.append(logo_row)

# Row 2: Concept labels
label_row = [
    Paragraph("<b>Concept 1</b><br/>Horizontal Layout", heading_style),
    Paragraph("<b>Concept 2</b><br/>Badge/Emblem Style", heading_style),
    Paragraph("<b>Concept 3</b><br/>Contemporary Geometric", heading_style)
]
logo_data.append(label_row)

# Row 3: Descriptions
desc_row = [
    Paragraph("Clean, professional design with elegant typography. Suitable for website headers and business cards.", body_style),
    Paragraph("Heritage-inspired badge design conveying 20+ years of trusted service and reliability.", body_style),
    Paragraph("Modern geometric mark that's memorable and works at any size. Contemporary sophistication.", body_style)
]
logo_data.append(desc_row)

# Create the table
logo_table = Table(logo_data, colWidths=[3.2*inch, 3.2*inch, 3.2*inch])
logo_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ('TOPPADDING', (0, 0), (-1, -1), 10),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 10),
]))

story.append(logo_table)

story.append(Spacer(1, 0.5*inch))

# Footer note
note_style = ParagraphStyle('Note', fontSize=10, textColor=CHARCOAL, fontName='Helvetica-Oblique', 
                           alignment=TA_CENTER, leading=14)
story.append(Paragraph(
    "All concepts use the Dependable Home Improvement brand colors (Brown #654321 and Gold #B8860B) "
    "with Playfair Display typography to align with your sophisticated brand identity.",
    note_style
))

story.append(Spacer(1, 0.3*inch))
story.append(Paragraph("Prepared by Cascadia Managing Brands", note_style))

# Build PDF
doc.build(story)
print(f"✓ Logo presentation created: {pdf_file}")
