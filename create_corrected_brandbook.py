#!/usr/bin/env python3
"""
Create corrected comprehensive landscape brand book with all fixes:
- Proper page numbering
- Color swatches
- Font examples page
- Logo comparison (current + 3 new concepts)
- Fixed blocked text issues
- Removed HTML code from headers
"""

from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
from reportlab.platypus.flowables import Flowable
import os

# Define brand colors
BROWN = HexColor('#654321')
GOLD = HexColor('#B8860B')
CREAM = HexColor('#F5F5DC')
CHARCOAL = HexColor('#36454F')
WHITE = HexColor('#FFFFFF')

# Page size
PAGE_WIDTH, PAGE_HEIGHT = landscape(letter)
MARGIN = 0.75 * inch

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self._saved_page_states = []
        self.page_num = 0

    def showPage(self):
        self.page_num += 1
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_number(num_pages)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_page_number(self, page_count):
        if self.page_num > 1:  # Skip page number on cover
            self.setFont("Helvetica", 9)
            self.setFillColor(colors.grey)
            self.drawRightString(PAGE_WIDTH - MARGIN, 0.5*inch, f"Page {self.page_num} of {page_count}")

# Color swatch flowable
class ColorSwatch(Flowable):
    def __init__(self, color, width, height):
        Flowable.__init__(self)
        self.color = color
        self.width = width
        self.height = height

    def draw(self):
        self.canv.setFillColor(self.color)
        self.canv.setStrokeColor(colors.grey)
        self.canv.rect(0, 0, self.width, self.height, fill=1, stroke=1)

# PDF setup
pdf_file = "Dependable_Home_Improvement_Brand_Book.pdf"
doc = SimpleDocTemplate(pdf_file, pagesize=landscape(letter),
                       topMargin=MARGIN, bottomMargin=MARGIN,
                       leftMargin=MARGIN, rightMargin=MARGIN)

story = []

# Styles
styles = getSampleStyleSheet()

cover_title = ParagraphStyle('CoverTitle', fontSize=48, textColor=WHITE, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=58, spaceAfter=20)
cover_subtitle = ParagraphStyle('CoverSubtitle', fontSize=28, textColor=GOLD, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=34, spaceAfter=15)
cover_tagline = ParagraphStyle('CoverTagline', fontSize=20, textColor=BROWN, alignment=TA_CENTER, fontName='Helvetica-Oblique', leading=24)
h1_style = ParagraphStyle('H1', fontSize=32, textColor=BROWN, fontName='Helvetica-Bold', spaceAfter=20, spaceBefore=0, leading=38)
h2_style = ParagraphStyle('H2', fontSize=22, textColor=GOLD, fontName='Helvetica-Bold', spaceAfter=14, spaceBefore=20, leading=26)
h3_style = ParagraphStyle('H3', fontSize=16, textColor=BROWN, fontName='Helvetica-Bold', spaceAfter=6, spaceBefore=16, leading=19)
h4_style = ParagraphStyle('H4', fontSize=13, textColor=CHARCOAL, fontName='Helvetica-Bold', spaceAfter=8, spaceBefore=12, leading=16)
body_style = ParagraphStyle('Body', fontSize=11, textColor=CHARCOAL, fontName='Helvetica', alignment=TA_JUSTIFY, spaceAfter=12, leading=16)
bullet_style = ParagraphStyle('Bullet', fontSize=11, textColor=CHARCOAL, fontName='Helvetica', leftIndent=20, spaceAfter=10, leading=15)
box_style = ParagraphStyle('Box', fontSize=11, textColor=CHARCOAL, fontName='Helvetica', spaceAfter=14, spaceBefore=2, leading=15, backColor=CREAM, borderWidth=1, borderColor=BROWN, borderPadding=14, leftIndent=14, rightIndent=14)
note_style = ParagraphStyle('Note', fontSize=10, textColor=CHARCOAL, fontName='Helvetica', spaceAfter=12, leading=14, backColor=HexColor('#FFF9E6'), borderWidth=1, borderColor=GOLD, borderPadding=12, leftIndent=12, rightIndent=12)
footer_style = ParagraphStyle('Footer', fontSize=10, textColor=CHARCOAL, fontName='Helvetica', alignment=TA_CENTER)

# ============= COVER PAGE =============
story.append(Spacer(1, 1*inch))

# Dependable logo at top
if os.path.exists('/home/ubuntu/dependable_premium/current_logo.png'):
    logo_width = 4*inch
    logo_height = 1.5*inch
    logo = Image('/home/ubuntu/dependable_premium/current_logo.png', width=logo_width, height=logo_height)
    logo.hAlign = 'CENTER'
    story.append(logo)

story.append(Spacer(1, 0.5*inch))

# Brown background box for title
from reportlab.platypus import KeepTogether
title_box_data = [[Paragraph("Brand Identity and Design Standards", cover_title)]]
title_box = Table(title_box_data, colWidths=[9*inch])
title_box.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BROWN),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 30),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 30),
]))
story.append(title_box)

story.append(Spacer(1, 0.3*inch))
story.append(Paragraph("Crafting Excellence. Building Trust.", cover_tagline))
story.append(Spacer(1, 1*inch))

# Cascadia logo at bottom
if os.path.exists('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg'):
    cascadia_width = 3*inch
    cascadia_height = cascadia_width / 1.294
    cascadia_logo = Image('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg', width=cascadia_width, height=cascadia_height)
    cascadia_logo.hAlign = 'CENTER'
    story.append(cascadia_logo)

story.append(PageBreak())

print("Building brand book with all corrections...")

# ============= INTRODUCTION =============
story.append(Paragraph("Introduction", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("About Dependable Home Improvement", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement is a premier home services provider specializing in handyman services, carpentry, painting, and complete home renovations throughout Bergen County, New Jersey "
    "and surrounding areas. Established in 2004, the company has built an exceptional reputation for craftsmanship, "
    "reliability, and customer service over more than 20 years of operation. With over 1,500 completed projects and "
    "500+ satisfied clients, Dependable Home Improvement has become a trusted name in Bergen County home services.",
    body_style
))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Core Services", h3_style))
story.append(Paragraph("• <b>General Handyman Services</b> – Comprehensive repairs, installations, and ongoing maintenance for residential properties", bullet_style))
story.append(Paragraph("• <b>Professional Carpentry</b> – Custom woodwork, trim installation, deck construction, and structural carpentry projects", bullet_style))
story.append(Paragraph("• <b>Interior & Exterior Painting</b> – Complete painting solutions including surface preparation, priming, and finishing", bullet_style))
story.append(Paragraph("• <b>Complete Home Renovations</b> – Full-scale remodeling projects including kitchens, bathrooms, and whole-home transformations", bullet_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Service Area", h3_style))
story.append(Paragraph(
    "Dependable Home Improvement serves a 25-mile radius around Bergen County, New Jersey, with dedicated presence in "
    "Hackensack, Teaneck, Fort Lee, Fair Lawn, Bergenfield, Paramus, Ridgewood, Englewood, and surrounding communities. "
    "This focused service area allows for rapid response times and personalized local service.",
    body_style
))

story.append(PageBreak())

# ============= BRAND OVERVIEW =============
story.append(Paragraph("Brand Overview", h2_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("<b>Brand Essence:</b> Dependable Home Improvement transforms houses into homes through expert craftsmanship and unwavering commitment to customer satisfaction.", box_style))
story.append(Spacer(1, 0.15*inch))
story.append(Paragraph("<b>Brand Promise:</b> Every project, regardless of size, receives the same level of attention, expertise, and dedication. We don't just complete projects—we build lasting relationships with our clients.", box_style))

story.append(PageBreak())

# ============= BRAND VALUES - PAGE 1 =============
story.append(Paragraph("Brand Values", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Excellence in Craftsmanship</font></b><br/><br/>We take pride in delivering superior workmanship on every project. Our team consists of skilled professionals who treat each home as if it were their own. Every detail matters—from precise measurements to clean finishes to proper material selection. We don't cut corners, and we don't compromise on quality.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Reliability & Dependability</font></b><br/><br/>Our name reflects our core commitment. Clients can count on us to show up on time, complete work as promised, and stand behind our results with a 100% satisfaction guarantee. We return phone calls promptly, provide accurate estimates, and meet agreed-upon timelines. When we commit to something, we deliver.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Transparency & Trust</font></b><br/><br/>We believe in honest communication, fair pricing, and clear expectations. No hidden fees, no surprise charges, no confusing contracts—just straightforward, professional service from start to finish. We explain what we're doing, why we're doing it, and how much it will cost before we begin work.",
    box_style
))

story.append(PageBreak())

# ============= BRAND VALUES - PAGE 2 =============
story.append(Paragraph("Brand Values (continued)", h2_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Community Connection</font></b><br/><br/>As a local Bergen County business, we're invested in our community. We serve our neighbors with the respect and care they deserve. We're not a national franchise or out-of-state contractor—we live here, work here, and care about this community. Your home is our community, and we treat it accordingly.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Continuous Improvement</font></b><br/><br/>We stay current with industry best practices, materials, and techniques to provide our clients with the best possible solutions for their homes. We invest in ongoing training, quality tools, and professional development. The home improvement industry evolves, and we evolve with it to serve our clients better.",
    box_style
))

story.append(PageBreak())

# ============= LOGO COMPARISON PAGE =============
story.append(Paragraph("Logo Evolution", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Current Logo & New Concepts", h2_style))
story.append(Paragraph(
    "The Dependable Home Improvement logo represents the company's identity. Below is the current logo that has served the business for 20+ years, followed by three modern concept designs that align with the elevated brand positioning.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

# Current logo
story.append(Paragraph("Current Logo", h3_style))
if os.path.exists('/home/ubuntu/dependable_premium/current_logo.png'):
    current_logo_img = Image('/home/ubuntu/dependable_premium/current_logo.png', width=4*inch, height=1.5*inch)
    current_logo_img.hAlign = 'CENTER'
    story.append(current_logo_img)
story.append(Spacer(1, 0.4*inch))

# New logo concepts
story.append(Paragraph("Proposed New Logo Concepts", h3_style))
story.append(Spacer(1, 0.2*inch))

# Table with 3 new logos
new_logo_data = []
logo_row = []
for i in range(1, 4):
    logo_path = f'/home/ubuntu/dependable_premium/Dependable_Logo_Concept_{i}.png'
    if os.path.exists(logo_path):
        if i == 1:
            logo_img = Image(logo_path, width=2.8*inch, height=2.8*inch/1.79167)
        else:
            logo_img = Image(logo_path, width=2.2*inch, height=2.2*inch)
        logo_row.append(logo_img)

new_logo_data.append(logo_row)

label_row = [
    Paragraph("<b>Concept 1:</b> Horizontal", body_style),
    Paragraph("<b>Concept 2:</b> Badge", body_style),
    Paragraph("<b>Concept 3:</b> Geometric", body_style)
]
new_logo_data.append(label_row)

new_logo_table = Table(new_logo_data, colWidths=[2.9*inch, 2.9*inch, 2.9*inch])
new_logo_table.setStyle(TableStyle([
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
    ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
    ('LEFTPADDING', (0, 0), (-1, -1), 10),
    ('RIGHTPADDING', (0, 0), (-1, -1), 10),
]))

story.append(new_logo_table)

story.append(PageBreak())

# ============= LOGO GUIDELINES =============
story.append(Paragraph("Logo Usage Guidelines", h2_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Minimum Size Requirements", h3_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("• <b>Print:</b> Minimum 1.5 inches wide to ensure legibility", bullet_style))
story.append(Paragraph("• <b>Digital:</b> Minimum 150 pixels wide for web and social media applications", bullet_style))
story.append(Paragraph("• <b>Business Cards:</b> Recommended 2-3 inches wide for optimal impact", bullet_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Clear Space Requirements", h3_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph(
    "Maintain clear space around the logo equal to the height of the letter 'D' in Dependable. "
    "This ensures the logo has breathing room and maximum visual impact. No text, graphics, or other elements "
    "should appear within this protected zone.",
    body_style
))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Logo Do's and Don'ts", h3_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("✓ Use approved logo files provided by Cascadia Managing Brands", bullet_style))
story.append(Paragraph("✓ Maintain proper aspect ratio when resizing", bullet_style))
story.append(Paragraph("✓ Use on backgrounds that provide sufficient contrast", bullet_style))
story.append(Paragraph("✗ Do not stretch, distort, or alter logo proportions", bullet_style))
story.append(Paragraph("✗ Do not change logo colors outside approved palette", bullet_style))
story.append(Paragraph("✗ Do not add effects (shadows, glows, gradients) to the logo", bullet_style))
story.append(Paragraph("✗ Do not place logo on busy or low-contrast backgrounds", bullet_style))

story.append(PageBreak())

# ============= COLOR PALETTE WITH SWATCHES =============
story.append(Paragraph("Color Palette", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Primary Brand Colors", h2_style))
story.append(Paragraph(
    "The Dependable Home Improvement color palette was strategically selected to convey reliability, craftsmanship, "
    "and premium quality. The brown and gold combination creates a warm, professional, and trustworthy brand identity "
    "that differentiates from competitors who typically use blue or green color schemes.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

# Color table with swatches
color_data = [
    ["Color Swatch", "Color Name", "Hex", "RGB", "CMYK", "Usage"],
]

# Add color rows with swatches
colors_info = [
    (BROWN, "Dependable Brown", "#654321", "101, 67, 33", "0, 34, 67, 60", "Primary backgrounds, headers"),
    (GOLD, "Premium Gold", "#B8860B", "184, 134, 11", "0, 27, 94, 28", "Accents, CTAs, highlights"),
    (CREAM, "Warm Cream", "#F5F5DC", "245, 245, 220", "0, 0, 10, 4", "Backgrounds, sections"),
    (CHARCOAL, "Charcoal", "#36454F", "54, 69, 79", "32, 13, 0, 69", "Body text, secondary"),
    (WHITE, "White", "#FFFFFF", "255, 255, 255", "0, 0, 0, 0", "Backgrounds, text"),
]

for color, name, hex_code, rgb, cmyk, usage in colors_info:
    swatch = ColorSwatch(color, 0.8*inch, 0.4*inch)
    color_data.append([swatch, name, hex_code, rgb, cmyk, usage])

color_table = Table(color_data, colWidths=[0.9*inch, 1.3*inch, 0.8*inch, 1*inch, 1.1*inch, 3.1*inch])
color_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 12),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F9F9F9')]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(color_table)

story.append(PageBreak())

# Continue with rest of content...
# (Typography, Brand Voice, etc. - keeping the existing content from the previous version)

print("Brand book structure complete, building PDF...")

# Build the PDF with custom canvas
doc.build(story, canvasmaker=NumberedCanvas)
print(f"✓ Corrected brand book created: {pdf_file}")

# ============= TYPOGRAPHY WITH FONT EXAMPLES =============
story.append(Paragraph("Typography System", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Font Hierarchy & Examples", h2_style))
story.append(Spacer(1, 0.2*inch))

# Primary Font - Playfair Display
story.append(Paragraph("Primary Typeface: Playfair Display (Serif)", h3_style))
story.append(Paragraph(
    "Playfair Display is our primary display typeface, used for all headlines, hero text, and section headings. "
    "This elegant transitional serif conveys sophistication, heritage, and quality craftsmanship.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

# Playfair examples - simulate with Helvetica-Bold since ReportLab doesn't have Playfair
playfair_example = ParagraphStyle('PlayfairExample', fontSize=36, textColor=BROWN, fontName='Helvetica-Bold', 
                                  spaceAfter=10, leading=42, alignment=TA_CENTER)
story.append(Paragraph("Dependable Home Improvement", playfair_example))
story.append(Paragraph("<i>(Example: Playfair Display Bold, 36pt)</i>", body_style))
story.append(Spacer(1, 0.2*inch))

# Secondary Font - Helvetica/Arial
story.append(Paragraph("Secondary Typeface: Helvetica / Arial (Sans-Serif)", h3_style))
story.append(Paragraph(
    "Helvetica (or Arial as fallback) serves as our body text typeface. Clean, modern, and highly readable, "
    "it provides excellent legibility across all applications from print to digital.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

helvetica_example = ParagraphStyle('HelveticaExample', fontSize=16, textColor=CHARCOAL, fontName='Helvetica', 
                                   spaceAfter=10, leading=22, alignment=TA_CENTER)
story.append(Paragraph("We transform houses into homes through expert craftsmanship, reliable service, and unwavering commitment to customer satisfaction.", helvetica_example))
story.append(Paragraph("<i>(Example: Helvetica Regular, 16pt)</i>", body_style))

story.append(PageBreak())

# ============= TYPOGRAPHY SPECIFICATIONS =============
story.append(Paragraph("Typography Specifications", h2_style))
story.append(Spacer(1, 0.3*inch))

# Web Typography Table
story.append(Paragraph("Website & Digital Typography", h3_style))
story.append(Spacer(1, 0.15*inch))

web_typo_data = [
    ["Element", "Font", "Size", "Weight", "Color", "Usage"],
    ["H1 Headlines", "Playfair Display", "48-64px", "Bold", "Brown/White", "Page titles, hero headlines"],
    ["H2 Headings", "Playfair Display", "36-48px", "Bold", "Brown/Gold", "Major section divisions"],
    ["H3 Subheadings", "Playfair Display", "24-32px", "Regular", "Brown/Charcoal", "Content subsections"],
    ["Body Text", "Helvetica/Arial", "16-18px", "Regular", "Charcoal", "Paragraphs, descriptions"],
    ["Navigation", "Helvetica/Arial", "16px", "Regular", "Brown/White", "Menu items, links"],
    ["Buttons", "Helvetica/Arial", "16-18px", "Bold", "White on Gold", "Call-to-action buttons"],
]

web_typo_table = Table(web_typo_data, colWidths=[1.4*inch, 1.4*inch, 0.9*inch, 0.9*inch, 1.1*inch, 2.5*inch])
web_typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 12),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F9F9F9')]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(web_typo_table)
story.append(Spacer(1, 0.3*inch))

# Print Typography Table
story.append(Paragraph("Print Materials Typography", h3_style))
story.append(Spacer(1, 0.15*inch))

print_typo_data = [
    ["Element", "Font", "Size", "Weight", "Usage"],
    ["Business Card Name", "Playfair Display", "18-24pt", "Bold", "Company name on cards"],
    ["Brochure Headlines", "Playfair Display", "24-36pt", "Bold", "Front cover, section titles"],
    ["Brochure Body", "Helvetica/Arial", "10-12pt", "Regular", "Descriptions, service details"],
    ["Flyer Headlines", "Playfair Display", "36-48pt", "Bold", "Primary promotional message"],
    ["Estimate/Invoice", "Helvetica/Arial", "10-11pt", "Regular", "Item descriptions, pricing"],
]

print_typo_table = Table(print_typo_data, colWidths=[2*inch, 1.6*inch, 1*inch, 0.9*inch, 2.7*inch])
print_typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 12),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F9F9F9')]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(print_typo_table)

story.append(PageBreak())

# ============= BRAND VOICE =============
story.append(Paragraph("Brand Voice & Messaging", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Tone of Voice", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement's brand voice is <b>professional yet approachable, confident yet humble, "
    "expert yet educational</b>. We communicate with expertise while remaining accessible to homeowners.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Brand Messaging Pillars", h3_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("<b>1. Craftsmanship Excellence:</b> We don't just complete projects—we craft solutions. Every detail matters, every corner is finished properly.", box_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>2. Reliability You Can Count On:</b> Our name says it all. When we commit to a timeline, we meet it. When we quote a price, we honor it.", box_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>3. Transparent Partnership:</b> No hidden fees. No surprise charges. Just honest communication, fair pricing, and straightforward service.", box_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>4. Local Community Connection:</b> We're your Bergen County neighbors. We live here, work here, and care about this community.", box_style))
story.append(Spacer(1, 0.1*inch))

story.append(Paragraph("<b>5. Experience That Shows:</b> Twenty years of transforming houses into homes. Over 1,500 completed projects. Hundreds of satisfied clients.", box_style))

story.append(PageBreak())

# ============= VISUAL IDENTITY =============
story.append(Paragraph("Visual Identity", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Photography Style", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement's visual identity relies on authentic project photography that demonstrates real work, "
    "real results, and real craftsmanship. Use actual project photos rather than stock imagery.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Photography Principles", h3_style))
story.append(Paragraph("• <b>Authenticity Over Perfection:</b> Real before/after transformations build more credibility than staged photography", bullet_style))
story.append(Paragraph("• <b>Well-Lit & Clear:</b> All photos should be well-lit with natural or supplemental lighting", bullet_style))
story.append(Paragraph("• <b>Detail Shots:</b> Highlight craftsmanship details: clean corners, smooth finishes, precise cuts", bullet_style))
story.append(Paragraph("• <b>Context & Scale:</b> Show full room views that help prospects visualize transformations", bullet_style))

story.append(PageBreak())

# ============= BRAND APPLICATIONS =============
story.append(Paragraph("Brand Applications", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Website & Digital", h2_style))
story.append(Paragraph(
    "The website serves as the primary digital presence with video background hero section, left-aligned logo, "
    "sticky navigation, multi-language support (EN/RU/ES), before/after galleries, interactive service area map, "
    "and review platform integration.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Print Materials", h3_style))
story.append(Paragraph("• <b>Business Cards:</b> Brown background, gold accents, white text, premium cardstock", bullet_style))
story.append(Paragraph("• <b>Brochures:</b> Tri-fold format, brown and cream colors, high-quality project photos", bullet_style))
story.append(Paragraph("• <b>Flyers:</b> Eye-catching Playfair Display headlines, before/after imagery", bullet_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Social Media", h3_style))
story.append(Paragraph("• <b>Platforms:</b> Facebook (community), Instagram (visual portfolio), LinkedIn (professional)", bullet_style))
story.append(Paragraph("• <b>Profile Images:</b> Dependable logo on white background", bullet_style))
story.append(Paragraph("• <b>Cover Photos:</b> Project photography with brown overlay and gold text", bullet_style))

story.append(PageBreak())

# ============= CONCLUSION =============
story.append(Paragraph("Maintaining Brand Consistency", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "The Dependable Home Improvement brand represents over 20 years of commitment to excellence, reliability, and "
    "customer satisfaction. These brand guidelines ensure that every interaction—whether digital, print, or in-person—"
    "reinforces the values and quality that have made Dependable Home Improvement a trusted name in Bergen County.",
    body_style
))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph(
    "By maintaining consistency in visual identity, messaging, and customer experience, we strengthen brand recognition, "
    "build trust, and differentiate Dependable Home Improvement in a competitive marketplace.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("<b>Remember:</b> Every project is a brand ambassador. Every customer interaction is a brand experience. "
    "Every material we produce represents our commitment to excellence.", box_style))

story.append(Spacer(1, 0.8*inch))

# Cascadia footer
if os.path.exists('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg'):
    footer_logo_width = 3*inch
    footer_logo_height = footer_logo_width / 1.294
    cascadia_footer = Image('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg', width=footer_logo_width, height=footer_logo_height)
    cascadia_footer.hAlign = 'CENTER'
    story.append(cascadia_footer)

story.append(Spacer(1, 0.2*inch))
story.append(Paragraph("Prepared by Cascadia Managing Brands", footer_style))
