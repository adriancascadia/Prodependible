#!/usr/bin/env python3
"""
Create professional landscape brand book using ReportLab
"""

from reportlab.lib.pagesizes import landscape, letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_JUSTIFY
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle, Image, KeepTogether
from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor
import os

# Define brand colors
BROWN = HexColor('#654321')
GOLD = HexColor('#B8860B')
CREAM = HexColor('#F5F5DC')
CHARCOAL = HexColor('#36454F')
WHITE = HexColor('#FFFFFF')

# Page size
PAGE_WIDTH, PAGE_HEIGHT = landscape(letter)

class BrandBookCanvas(canvas.Canvas):
    """Custom canvas for page numbers and footers"""
    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self.pages = []
        
    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()
        
    def save(self):
        page_count = len(self.pages)
        for page_num, page in enumerate(self.pages, 1):
            self.__dict__.update(page)
            if page_num > 1:  # Skip page number on cover
                self.setFont('Helvetica', 9)
                self.setFillColor(colors.grey)
                self.drawRightString(PAGE_WIDTH - 0.75*inch, 0.5*inch, f"{page_num}")
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

# Create PDF
pdf_file = "Dependable_Home_Improvement_Brand_Book.pdf"
doc = SimpleDocTemplate(
    pdf_file,
    pagesize=landscape(letter),
    rightMargin=0.75*inch,
    leftMargin=0.75*inch,
    topMargin=0.75*inch,
    bottomMargin=0.75*inch
)

# Container for PDF elements
story = []

# Define styles
styles = getSampleStyleSheet()

# Custom styles
title_style = ParagraphStyle(
    'CustomTitle',
    parent=styles['Heading1'],
    fontSize=42,
    textColor=BROWN,
    spaceAfter=20,
    alignment=TA_CENTER,
    fontName='Helvetica-Bold'
)

heading1_style = ParagraphStyle(
    'CustomHeading1',
    parent=styles['Heading1'],
    fontSize=28,
    textColor=BROWN,
    spaceAfter=16,
    spaceBefore=20,
    fontName='Helvetica-Bold',
    borderWidth=2,
    borderColor=GOLD,
    borderPadding=8,
    backColor=CREAM
)

heading2_style = ParagraphStyle(
    'CustomHeading2',
    parent=styles['Heading2'],
    fontSize=20,
    textColor=GOLD,
    spaceAfter=12,
    spaceBefore=16,
    fontName='Helvetica-Bold'
)

heading3_style = ParagraphStyle(
    'CustomHeading3',
    parent=styles['Heading3'],
    fontSize=14,
    textColor=BROWN,
    spaceAfter=8,
    spaceBefore=12,
    fontName='Helvetica-Bold'
)

body_style = ParagraphStyle(
    'CustomBody',
    parent=styles['BodyText'],
    fontSize=10,
    textColor=CHARCOAL,
    alignment=TA_JUSTIFY,
    spaceAfter=8,
    leading=14,
    fontName='Helvetica'
)

box_style = ParagraphStyle(
    'BoxStyle',
    parent=styles['BodyText'],
    fontSize=10,
    textColor=CHARCOAL,
    spaceAfter=6,
    leading=13,
    fontName='Helvetica',
    backColor=CREAM,
    borderWidth=1,
    borderColor=BROWN,
    borderPadding=10,
    leftIndent=10,
    rightIndent=10
)

# COVER PAGE
story.append(Spacer(1, 1.5*inch))

# Add Cascadia logo at top
if os.path.exists('cascadia-logo.jpg'):
    cascadia_logo = Image('cascadia-logo.jpg', width=3*inch, height=1*inch)
    cascadia_logo.hAlign = 'CENTER'
    story.append(cascadia_logo)
    story.append(Spacer(1, 0.5*inch))

story.append(Paragraph("DEPENDABLE HOME IMPROVEMENT", title_style))
story.append(Spacer(1, 0.2*inch))

subtitle_style = ParagraphStyle('Subtitle', parent=title_style, fontSize=24, textColor=GOLD)
story.append(Paragraph("Brand Identity and Design Standards", subtitle_style))
story.append(Spacer(1, 0.3*inch))

tagline_style = ParagraphStyle('Tagline', parent=title_style, fontSize=18, textColor=CHARCOAL)
story.append(Paragraph("<i>Crafting Excellence. Building Trust.</i>", tagline_style))
story.append(Spacer(1, 0.5*inch))

footer_style = ParagraphStyle('Footer', parent=body_style, fontSize=10, alignment=TA_CENTER)
story.append(Paragraph("Prepared by Cascadia Managing Brands", footer_style))

story.append(PageBreak())

# TABLE OF CONTENTS
story.append(Paragraph("Table of Contents", heading1_style))
story.append(Spacer(1, 0.3*inch))

toc_data = [
    ["Introduction", "Brand overview, values, and positioning"],
    ["Brand Identity & Logo", "Logo usage, guidelines, and variations"],
    ["Color Palette", "Primary and secondary colors with specifications"],
    ["Typography System", "Complete font specifications for all applications"],
    ["Brand Voice & Messaging", "Tone, messaging pillars, and taglines"],
    ["Visual Identity", "Photography style and imagery guidelines"],
    ["Brand Applications", "Website, print, signage, and social media"],
]

toc_table = Table(toc_data, colWidths=[2.5*inch, 5*inch])
toc_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), CREAM),
    ('TEXTCOLOR', (0, 0), (0, -1), BROWN),
    ('TEXTCOLOR', (1, 0), (1, -1), CHARCOAL),
    ('FONTNAME', (0, 0), (0, -1), 'Helvetica-Bold'),
    ('FONTNAME', (1, 0), (1, -1), 'Helvetica'),
    ('FONTSIZE', (0, 0), (-1, -1), 11),
    ('PADDING', (0, 0), (-1, -1), 12),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('VALIGN', (0, 0), (-1, -1), 'TOP'),
]))

story.append(toc_table)
story.append(PageBreak())

# INTRODUCTION
story.append(Paragraph("Introduction", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("About Dependable Home Improvement", heading2_style))
story.append(Paragraph(
    "Dependable Home Improvement is a premier home improvement and handyman service serving Bergen County, New Jersey, "
    "and surrounding areas. Established in 2004, the company has built a reputation for exceptional craftsmanship, "
    "reliability, and customer service over more than 20 years of operation.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Core Services", heading3_style))
story.append(Paragraph(
    "<b>• General Handyman Services</b> - Repairs, installations, and maintenance<br/>"
    "<b>• Professional Carpentry</b> - Custom woodwork and structural projects<br/>"
    "<b>• Interior & Exterior Painting</b> - Complete painting solutions<br/>"
    "<b>• Complete Home Renovations</b> - Full-scale remodeling projects",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Service Area", heading3_style))
story.append(Paragraph(
    "Dependable Home Improvement serves a 25-mile radius around Bergen County, with dedicated presence in "
    "Hackensack, Teaneck, Fort Lee, Fair Lawn, Bergenfield, Paramus, Ridgewood, and Englewood.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Brand Overview", heading3_style))
story.append(Paragraph(
    "Dependable Home Improvement positions itself as a premium, trustworthy home improvement service that combines "
    "traditional craftsmanship with modern professionalism. The brand appeals to homeowners who value quality workmanship, "
    "transparent communication, and reliable service.",
    body_style
))

story.append(PageBreak())

# BRAND VALUES
story.append(Paragraph("Brand Values", heading2_style))
story.append(Spacer(1, 0.15*inch))

values = [
    ("Excellence in Craftsmanship", "We take pride in delivering superior workmanship on every project. Our team consists of skilled professionals who treat each home as if it were their own."),
    ("Reliability & Dependability", "Our name reflects our core commitment. Clients can count on us to show up on time, complete work as promised, and stand behind our results with a 100% satisfaction guarantee."),
    ("Transparency & Trust", "We believe in honest communication, fair pricing, and clear expectations. No hidden fees, no surprises—just straightforward, professional service."),
    ("Community Connection", "As a local Bergen County business, we're invested in our community. We serve our neighbors with the respect and care they deserve."),
    ("Continuous Improvement", "We stay current with industry best practices, materials, and techniques to provide our clients with the best possible solutions for their homes."),
]

for title, desc in values:
    story.append(Paragraph(f"<b>{title}</b>", heading3_style))
    story.append(Paragraph(desc, box_style))
    story.append(Spacer(1, 0.1*inch))

story.append(PageBreak())

# BRAND IDENTITY & LOGO
story.append(Paragraph("Brand Identity & Logo", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Logo", heading2_style))
story.append(Paragraph(
    "The Dependable Home Improvement logo is the company's existing brand mark, representing over 20 years of trusted "
    "service in Bergen County. The logo combines traditional craftsmanship imagery with professional aesthetics, "
    "representing stability, expertise, and quality construction.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Logo Usage Guidelines", heading3_style))
story.append(Paragraph(
    "<b>DO:</b> Use the logo on clean backgrounds • Maintain proper clear space • Use approved color variations • "
    "Ensure legibility at all sizes • Use high-resolution files for print<br/><br/>"
    "<b>DON'T:</b> Distort or stretch the logo • Place on busy backgrounds • Change colors outside approved palette • "
    "Add effects or shadows • Rotate at angles • Recreate or redraw",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Minimum Size Requirements", heading3_style))
story.append(Paragraph(
    "<b>• Print:</b> Minimum width of 2 inches<br/>"
    "<b>• Digital:</b> Minimum width of 200 pixels<br/>"
    "<b>• Navigation:</b> 96-115 pixels height for optimal visibility<br/>"
    "<b>• Business Cards:</b> Minimum 0.75 inches width<br/>"
    "<b>• Social Media Profile:</b> 400×400 pixels minimum",
    body_style
))

story.append(PageBreak())

# COLOR PALETTE
story.append(Paragraph("Color Palette", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Primary Brand Colors", heading2_style))
story.append(Paragraph(
    "The Dependable Home Improvement color palette was strategically selected to convey reliability, craftsmanship, "
    "and premium quality. The brown and gold combination creates a warm, professional, and trustworthy brand identity.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

color_data = [
    ["Color", "Hex", "RGB", "CMYK", "Usage"],
    ["Dependable Brown", "#654321", "101, 67, 33", "0, 34, 67, 60", "Primary backgrounds, headers, text"],
    ["Premium Gold", "#B8860B", "184, 134, 11", "0, 27, 94, 28", "Accents, CTAs, highlights"],
    ["Warm Cream", "#F5F5DC", "245, 245, 220", "0, 0, 10, 4", "Backgrounds, sections, cards"],
    ["Charcoal", "#36454F", "54, 69, 79", "32, 13, 0, 69", "Body text, secondary headings"],
]

color_table = Table(color_data, colWidths=[1.8*inch, 1.2*inch, 1.3*inch, 1.5*inch, 2.5*inch])
color_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(color_table)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Color Psychology", heading3_style))
story.append(Paragraph(
    "<b>Brown</b> represents earthiness, stability, natural materials, and traditional craftsmanship. It creates an "
    "immediate connection to wood, construction, and the foundation of quality work.<br/><br/>"
    "<b>Gold</b> conveys premium service, excellence, value, and achievement. It elevates the brand positioning from "
    "commodity contractor to premium service provider.",
    body_style
))

story.append(PageBreak())

# TYPOGRAPHY SYSTEM
story.append(Paragraph("Typography System", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Font Specifications", heading2_style))
story.append(Paragraph(
    "Dependable Home Improvement uses a sophisticated two-font system: <b>Playfair Display</b> (serif) for headlines "
    "and <b>Helvetica/Arial</b> (sans-serif) for body text. This pairing creates visual hierarchy while maintaining "
    "excellent readability across all applications.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Website & Digital Applications", heading3_style))

typo_data = [
    ["Element", "Font", "Size", "Weight", "Color", "Usage"],
    ["H1 Headlines", "Playfair Display", "48-64px", "Bold", "Brown/White", "Page titles, hero headlines"],
    ["H2 Headings", "Playfair Display", "36-48px", "Bold", "Brown/Gold", "Major section divisions"],
    ["H3 Subheadings", "Playfair Display", "24-32px", "Regular", "Brown/Charcoal", "Content subsections"],
    ["Body Text", "Helvetica/Arial", "16-18px", "Regular", "Charcoal", "Paragraphs, descriptions"],
    ["Navigation", "Helvetica/Arial", "16px", "Regular", "Brown/White", "Menu items, links"],
    ["Buttons", "Helvetica/Arial", "16-18px", "Bold", "White on Gold", "Call-to-action buttons"],
    ["Captions", "Helvetica/Arial", "14px", "Regular", "Charcoal", "Image captions, footnotes"],
]

typo_table = Table(typo_data, colWidths=[1.3*inch, 1.4*inch, 0.9*inch, 0.8*inch, 1*inch, 2.5*inch])
typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 8),
    ('PADDING', (0, 0), (-1, -1), 6),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(typo_table)
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Print Materials Typography", heading3_style))

print_typo_data = [
    ["Element", "Font", "Size", "Usage"],
    ["Business Card Name", "Playfair Display Bold", "18-24pt", "Company name on cards, letterhead"],
    ["Brochure Headlines", "Playfair Display Bold", "24-36pt", "Section titles in brochures"],
    ["Body Text", "Helvetica/Arial Regular", "10-12pt", "Descriptions, content blocks"],
    ["Contact Info", "Helvetica/Arial Regular", "9-11pt", "Phone, email, address details"],
]

print_table = Table(print_typo_data, colWidths=[2*inch, 2*inch, 1.2*inch, 3*inch])
print_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 8),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, CREAM]),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
]))

story.append(print_table)

story.append(PageBreak())

# BRAND VOICE & MESSAGING
story.append(Paragraph("Brand Voice & Messaging", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Tone of Voice", heading2_style))
story.append(Paragraph(
    "Dependable Home Improvement's brand voice is <b>professional yet approachable, confident yet humble, "
    "expert yet educational</b>. We communicate with expertise while remaining accessible to homeowners.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Brand Messaging Pillars", heading3_style))

messaging = [
    ("Craftsmanship Excellence", "We don't just complete projects—we craft solutions. Every detail matters, every corner is finished properly."),
    ("Reliability You Can Count On", "Our name says it all. When we commit to a timeline, we meet it. When we quote a price, we honor it."),
    ("Transparent Partnership", "No hidden fees. No surprise charges. Just honest communication, fair pricing, and straightforward service."),
    ("Local Community Connection", "We're your Bergen County neighbors. We live here, work here, and care about this community."),
    ("Experience That Shows", "Twenty years of transforming houses into homes. Over 1,500 completed projects. Hundreds of satisfied clients."),
]

for title, desc in messaging:
    story.append(Paragraph(f"<b>{title}:</b> {desc}", box_style))
    story.append(Spacer(1, 0.08*inch))

story.append(Spacer(1, 0.15*inch))
tagline_box = ParagraphStyle('TaglineBox', parent=box_style, fontSize=14, alignment=TA_CENTER, textColor=GOLD)
story.append(Paragraph("<b><i>Crafting Excellence. Building Trust.</i></b>", tagline_box))

story.append(PageBreak())

# VISUAL IDENTITY
story.append(Paragraph("Visual Identity", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Photography Style", heading2_style))
story.append(Paragraph(
    "Dependable Home Improvement's visual identity relies on authentic project photography that demonstrates real work, "
    "real results, and real craftsmanship. Use actual project photos rather than stock imagery.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Photography Principles", heading3_style))
story.append(Paragraph(
    "<b>• Authenticity Over Perfection:</b> Real before/after transformations build more credibility than staged photography<br/>"
    "<b>• Well-Lit & Clear:</b> All photos should be well-lit with natural or supplemental lighting<br/>"
    "<b>• Detail Shots:</b> Highlight craftsmanship details: clean corners, smooth finishes, precise cuts<br/>"
    "<b>• Context & Scale:</b> Show full room views that help prospects visualize transformations",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Before/After Presentations", heading3_style))
story.append(Paragraph(
    "Before/after galleries are the most powerful marketing tool. Present images side-by-side (not as sliders) for "
    "immediate visual comparison. Always label clearly as 'BEFORE' and 'AFTER' and include project details.",
    box_style
))

story.append(PageBreak())

# BRAND APPLICATIONS
story.append(Paragraph("Brand Applications", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Website & Digital", heading2_style))
story.append(Paragraph(
    "The website serves as the primary digital presence with video background hero section, left-aligned logo, "
    "sticky navigation, multi-language support (EN/RU/ES), before/after galleries, interactive service area map, "
    "and review platform integration.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Print Materials", heading3_style))
story.append(Paragraph(
    "<b>Business Cards:</b> Brown background, gold accents, white text, premium cardstock<br/>"
    "<b>Brochures:</b> Tri-fold format, brown and cream colors, high-quality project photos<br/>"
    "<b>Flyers:</b> Eye-catching Playfair Display headlines, before/after imagery<br/>"
    "<b>Estimates & Invoices:</b> Professional letterhead, clear itemized pricing",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Social Media", heading3_style))
story.append(Paragraph(
    "<b>Profile Images:</b> Dependable logo on white background<br/>"
    "<b>Cover Photos:</b> Project photography with brown overlay and gold text<br/>"
    "<b>Post Imagery:</b> Consistent brown/gold color treatment<br/>"
    "<b>Platforms:</b> Facebook (community engagement), Instagram (visual portfolio), LinkedIn (professional network)",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Vehicle Wraps & Signage", heading3_style))
story.append(Paragraph(
    "Use brown and gold on white background for maximum visibility. Company name minimum 6\" height, phone number "
    "minimum 3\" height for readability from 50+ feet. Keep design clean and uncluttered.",
    box_style
))

story.append(PageBreak())

# CONCLUSION
story.append(Paragraph("Maintaining Brand Consistency", heading1_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph(
    "The Dependable Home Improvement brand represents over 20 years of commitment to excellence, reliability, and "
    "customer satisfaction. These brand guidelines ensure that every interaction—whether digital, print, or in-person—"
    "reinforces the values and quality that have made Dependable Home Improvement a trusted name in Bergen County.",
    body_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "By maintaining consistency in visual identity, messaging, and customer experience, we strengthen brand recognition, "
    "build trust, and differentiate Dependable Home Improvement in a competitive marketplace.",
    body_style
))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("<b>Remember:</b> Every project is a brand ambassador. Every customer interaction is a brand experience. "
    "Every material we produce represents our commitment to excellence.", box_style))

story.append(Spacer(1, 0.5*inch))

# Cascadia footer
if os.path.exists('cascadia-logo.jpg'):
    cascadia_footer = Image('cascadia-logo.jpg', width=2.5*inch, height=0.8*inch)
    cascadia_footer.hAlign = 'CENTER'
    story.append(cascadia_footer)

story.append(Spacer(1, 0.15*inch))
story.append(Paragraph("Prepared by Cascadia Managing Brands", footer_style))
story.append(Spacer(1, 0.1*inch))
disclaimer_style = ParagraphStyle('Disclaimer', parent=body_style, fontSize=8, alignment=TA_CENTER, textColor=colors.grey)
story.append(Paragraph(
    "This brand book is proprietary and confidential. Provided for exclusive use of Dependable Home Improvement and authorized partners.",
    disclaimer_style
))

# Build PDF
print("Building professional landscape brand book...")
doc.build(story, canvasmaker=BrandBookCanvas)
print(f"Brand book created successfully: {pdf_file}")
