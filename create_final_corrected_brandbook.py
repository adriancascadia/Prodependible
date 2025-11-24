#!/usr/bin/env python3
"""
Final corrected brand book with:
- Proper logo aspect ratios
- Cascadia logo on page 1 (smaller, at bottom)
- Comprehensive font examples with multiple sizes
- Competitive analysis / USP page
- All previous fixes maintained
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

print("Building final corrected brand book...")

# ============= COVER PAGE WITH INTRODUCTION =============
story.append(Spacer(1, 0.3*inch))

# Dependable logo at top (correct aspect ratio 0.7765)
if os.path.exists('/home/ubuntu/dependable_premium/actual_logo.png'):
    logo_width = 1.8*inch
    logo_height = logo_width / 0.7765  # Correct aspect ratio
    logo = Image('/home/ubuntu/dependable_premium/actual_logo.png', width=logo_width, height=logo_height)
    logo.hAlign = 'CENTER'
    story.append(logo)

story.append(Spacer(1, 0.15*inch))

# Brown background box for title
cover_title_compact = ParagraphStyle('CoverTitleCompact', fontSize=42, textColor=WHITE, alignment=TA_CENTER, fontName='Helvetica-Bold', leading=50, spaceAfter=0)
title_box_data = [[Paragraph("Brand Identity and Design Standards", cover_title_compact)]]
title_box = Table(title_box_data, colWidths=[9*inch])
title_box.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, -1), BROWN),
    ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
    ('TOPPADDING', (0, 0), (-1, -1), 15),
    ('BOTTOMPADDING', (0, 0), (-1, -1), 15),
]))
story.append(title_box)

story.append(Spacer(1, 0.1*inch))
cover_tagline_compact = ParagraphStyle('CoverTaglineCompact', fontSize=18, textColor=BROWN, alignment=TA_CENTER, fontName='Helvetica-Oblique', leading=22)
story.append(Paragraph("Crafting Excellence. Building Trust.", cover_tagline_compact))
story.append(Spacer(1, 0.15*inch))

# Introduction on same page
intro_style = ParagraphStyle('Intro', fontSize=10, textColor=CHARCOAL, fontName='Helvetica', alignment=TA_CENTER, spaceAfter=0, leading=14)
story.append(Paragraph(
    "Dependable Home Improvement is a premier home services provider specializing in handyman services, carpentry, "
    "painting, and complete home renovations throughout Bergen County, New Jersey. Established in 2004, the company has "
    "built an exceptional reputation for craftsmanship, reliability, and customer service over more than 20 years.",
    intro_style
))

story.append(Spacer(1, 0.2*inch))

# Cascadia text only (no logo image)
cascadia_text_style = ParagraphStyle('CascadiaText', fontSize=10, textColor=CHARCOAL, fontName='Helvetica', alignment=TA_CENTER)
story.append(Paragraph("Prepared by Cascadia Managing Brands", cascadia_text_style))

story.append(PageBreak())

# ============= COMPETITIVE ADVANTAGE / USP =============
story.append(Paragraph("Why Dependable Home Improvement?", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Our Unique Selling Proposition", h2_style))
story.append(Paragraph(
    "In a crowded home improvement marketplace, Dependable Home Improvement stands apart through a combination of "
    "proven expertise, transparent business practices, and unwavering commitment to customer satisfaction.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>20+ Years of Proven Excellence</font></b><br/><br/>"
    "Unlike fly-by-night contractors or newly established businesses, Dependable Home Improvement has served Bergen County "
    "continuously since 2004. This longevity demonstrates financial stability, consistent quality, and a track record that "
    "speaks for itself. Over 1,500 completed projects provide proof of capability across every type of home improvement need.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Licensed, Insured & Accountable</font></b><br/><br/>"
    "Many handyman services operate without proper licensing or insurance, putting homeowners at significant risk. Dependable "
    "Home Improvement maintains full licensing, comprehensive liability insurance, and workers' compensation coverage. This "
    "protects clients from liability and ensures professional accountability for every project.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Transparent Pricing & Written Estimates</font></b><br/><br/>"
    "No hidden fees. No surprise charges. No vague verbal quotes. Every project begins with a detailed written estimate that "
    "clearly outlines scope, materials, timeline, and total cost. This transparency eliminates the anxiety and uncertainty "
    "that often accompanies home improvement projects.",
    box_style
))

story.append(PageBreak())

story.append(Paragraph("The Risks of Working with Lesser-Known Contractors", h2_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Homeowners who choose unlicensed or inexperienced contractors face significant risks:", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("• <b>Liability Exposure:</b> Without proper insurance, homeowners may be liable for injuries or property damage", bullet_style))
story.append(Paragraph("• <b>No Recourse:</b> Unlicensed contractors often disappear when problems arise, leaving homeowners with no legal recourse", bullet_style))
story.append(Paragraph("• <b>Code Violations:</b> Improper work can result in failed inspections, fines, and costly corrections", bullet_style))
story.append(Paragraph("• <b>Poor Workmanship:</b> Inexperienced contractors may lack the skills to deliver quality results", bullet_style))
story.append(Paragraph("• <b>Project Abandonment:</b> Financially unstable contractors may abandon projects mid-completion", bullet_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph(
    "<b>Dependable Home Improvement eliminates these risks.</b> Our established reputation, proper licensing, comprehensive "
    "insurance, and 20+ year track record provide peace of mind that your home improvement investment is protected.",
    note_style
))

story.append(PageBreak())

# ============= BRAND VALUES =============
story.append(Paragraph("Brand Values", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Excellence in Craftsmanship</font></b><br/><br/>"
    "We take pride in delivering superior workmanship on every project. Our team consists of skilled professionals who treat "
    "each home as if it were their own. Every detail matters—from precise measurements to clean finishes to proper material selection.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Reliability & Dependability</font></b><br/><br/>"
    "Our name reflects our core commitment. Clients can count on us to show up on time, complete work as promised, and stand "
    "behind our results with a 100% satisfaction guarantee. When we commit to something, we deliver.",
    box_style
))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph(
    "<b><font size=14 color='#654321'>Transparency & Trust</font></b><br/><br/>"
    "We believe in honest communication, fair pricing, and clear expectations. No hidden fees, no surprise charges, no confusing "
    "contracts—just straightforward, professional service from start to finish.",
    box_style
))

story.append(PageBreak())

# ============= LOGO COMPARISON =============
story.append(Paragraph("Logo Evolution", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Current Logo & New Concepts", h2_style))
story.append(Paragraph(
    "The Dependable Home Improvement logo represents the company's identity. Below is the current logo that has served the "
    "business for 20+ years, followed by three modern concept designs that align with the elevated brand positioning.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

# Current logo (correct aspect ratio)
story.append(Paragraph("Current Logo", h3_style))
if os.path.exists('/home/ubuntu/dependable_premium/actual_logo.png'):
    current_logo_width = 3*inch
    current_logo_height = current_logo_width / 0.7765
    current_logo_img = Image('/home/ubuntu/dependable_premium/actual_logo.png', width=current_logo_width, height=current_logo_height)
    current_logo_img.hAlign = 'CENTER'
    story.append(current_logo_img)
story.append(Spacer(1, 0.4*inch))

# New logo concepts
story.append(Paragraph("Proposed New Logo Concepts", h3_style))
story.append(Spacer(1, 0.2*inch))

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
]))

story.append(new_logo_table)

story.append(PageBreak())

# ============= LOGO GUIDELINES =============
story.append(Paragraph("Logo Usage Guidelines", h2_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Minimum Size Requirements", h3_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("• <b>Print:</b> Minimum 1.5 inches wide", bullet_style))
story.append(Paragraph("• <b>Digital:</b> Minimum 150 pixels wide", bullet_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Clear Space Requirements", h3_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph(
    "Maintain clear space around the logo equal to the height of the letter 'D' in Dependable. "
    "No text, graphics, or other elements should appear within this protected zone.",
    body_style
))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph("Logo Do's and Don'ts", h3_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("✓ Use approved logo files", bullet_style))
story.append(Paragraph("✓ Maintain proper aspect ratio", bullet_style))
story.append(Paragraph("✗ Do not stretch or distort", bullet_style))
story.append(Paragraph("✗ Do not change colors", bullet_style))

story.append(PageBreak())

# ============= COLOR PALETTE WITH SWATCHES =============
story.append(Paragraph("Color Palette", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Primary Brand Colors", h2_style))
story.append(Paragraph(
    "The Dependable Home Improvement color palette was strategically selected to convey reliability, craftsmanship, "
    "and premium quality.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

# Color table with swatches
color_data = [["Color Swatch", "Color Name", "Hex", "RGB", "CMYK", "Usage"]]

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

# ============= TYPOGRAPHY - FONT SPECIFICATIONS WITH EXAMPLES =============
story.append(Paragraph("Typography System", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Exclusive Brand Fonts", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement uses <b>two exclusive typefaces</b> for all brand communications. "
    "Consistency in typography strengthens brand recognition and maintains professional appearance across all materials.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

# PRIMARY FONT - Playfair Display with size examples
story.append(Paragraph("Primary Font: Playfair Display (Serif)", h3_style))
story.append(Paragraph(
    "<b>Usage:</b> Headlines, hero text, section headings, taglines, and any display typography",
    body_style
))
story.append(Spacer(1, 0.2*inch))

# Playfair examples at different sizes (simulated with Helvetica-Bold)
playfair_48 = ParagraphStyle('P48', fontSize=48, textColor=BROWN, fontName='Helvetica-Bold', leading=54, alignment=TA_CENTER)
playfair_36 = ParagraphStyle('P36', fontSize=36, textColor=BROWN, fontName='Helvetica-Bold', leading=42, alignment=TA_CENTER)
playfair_24 = ParagraphStyle('P24', fontSize=24, textColor=BROWN, fontName='Helvetica-Bold', leading=28, alignment=TA_CENTER)
playfair_18 = ParagraphStyle('P18', fontSize=18, textColor=BROWN, fontName='Helvetica-Bold', leading=22, alignment=TA_CENTER)

story.append(Paragraph("Dependable Home Improvement", playfair_48))
story.append(Paragraph("<i>48pt Bold - Main Headlines</i>", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Crafting Excellence, Building Trust", playfair_36))
story.append(Paragraph("<i>36pt Bold - Section Headlines</i>", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Your Trusted Bergen County Partner", playfair_24))
story.append(Paragraph("<i>24pt Regular - Subheadings</i>", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Over 20 Years of Excellence", playfair_18))
story.append(Paragraph("<i>18pt Italic - Taglines & Pull Quotes</i>", body_style))

story.append(PageBreak())

# SECONDARY FONT - Helvetica/Arial with size examples
story.append(Paragraph("Secondary Font: Helvetica / Arial (Sans-Serif)", h3_style))
story.append(Paragraph(
    "<b>Usage:</b> Body text, descriptions, navigation, buttons, captions, and all functional typography",
    body_style
))
story.append(Spacer(1, 0.2*inch))

# Helvetica examples at different sizes
helv_18 = ParagraphStyle('H18', fontSize=18, textColor=CHARCOAL, fontName='Helvetica', leading=24, alignment=TA_CENTER)
helv_16 = ParagraphStyle('H16', fontSize=16, textColor=CHARCOAL, fontName='Helvetica', leading=22, alignment=TA_CENTER)
helv_14 = ParagraphStyle('H14', fontSize=14, textColor=CHARCOAL, fontName='Helvetica', leading=20, alignment=TA_CENTER)
helv_11 = ParagraphStyle('H11', fontSize=11, textColor=CHARCOAL, fontName='Helvetica', leading=16, alignment=TA_CENTER)

story.append(Paragraph("We transform houses into homes through expert craftsmanship", helv_18))
story.append(Paragraph("<i>18pt Regular - Large Body Text</i>", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Professional handyman services, carpentry, painting, and renovations", helv_16))
story.append(Paragraph("<i>16pt Regular - Standard Body Text / Navigation</i>", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Serving Bergen County with pride for over 20 years", helv_14))
story.append(Paragraph("<i>14pt Regular - Small Body Text / Captions</i>", body_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("Licensed • Insured • Trusted • Local", helv_11))
story.append(Paragraph("<i>11pt Regular - Fine Print / Footnotes</i>", body_style))
story.append(Spacer(1, 0.2*inch))

story.append(Paragraph(
    "<b>Important:</b> These are the ONLY two typefaces approved for Dependable Home Improvement brand materials. "
    "Never substitute with other fonts, even if they appear similar.",
    note_style
))

story.append(PageBreak())

# ============= TYPOGRAPHY SPECIFICATIONS TABLE =============
story.append(Paragraph("Typography Specifications by Medium", h2_style))
story.append(Spacer(1, 0.3*inch))

# Web Typography
story.append(Paragraph("Website & Digital", h3_style))
story.append(Spacer(1, 0.15*inch))

web_typo_data = [
    ["Element", "Font", "Size", "Weight", "Color"],
    ["H1 Headlines", "Playfair Display", "48-64px", "Bold", "Brown/White"],
    ["H2 Headings", "Playfair Display", "36-48px", "Bold", "Brown/Gold"],
    ["Body Text", "Helvetica/Arial", "16-18px", "Regular", "Charcoal"],
    ["Navigation", "Helvetica/Arial", "16px", "Regular", "Brown"],
    ["Buttons", "Helvetica/Arial", "16-18px", "Bold", "White on Gold"],
]

web_typo_table = Table(web_typo_data, colWidths=[1.8*inch, 1.6*inch, 1*inch, 1*inch, 1.8*inch])
web_typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 12),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F9F9F9')]),
]))

story.append(web_typo_table)
story.append(Spacer(1, 0.3*inch))

# Print Typography
story.append(Paragraph("Print Materials", h3_style))
story.append(Spacer(1, 0.15*inch))

print_typo_data = [
    ["Element", "Font", "Size", "Weight"],
    ["Business Card Name", "Playfair Display", "18-24pt", "Bold"],
    ["Brochure Headlines", "Playfair Display", "24-36pt", "Bold"],
    ["Brochure Body", "Helvetica/Arial", "10-12pt", "Regular"],
    ["Flyer Headlines", "Playfair Display", "36-48pt", "Bold"],
]

print_typo_table = Table(print_typo_data, colWidths=[2.2*inch, 1.8*inch, 1.2*inch, 1*inch])
print_typo_table.setStyle(TableStyle([
    ('BACKGROUND', (0, 0), (-1, 0), BROWN),
    ('TEXTCOLOR', (0, 0), (-1, 0), WHITE),
    ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
    ('FONTSIZE', (0, 0), (-1, -1), 9),
    ('PADDING', (0, 0), (-1, -1), 12),
    ('GRID', (0, 0), (-1, -1), 1, GOLD),
    ('ROWBACKGROUNDS', (0, 1), (-1, -1), [WHITE, HexColor('#F9F9F9')]),
]))

story.append(print_typo_table)

story.append(PageBreak())

# ============= BRAND VOICE =============
story.append(Paragraph("Brand Voice & Messaging", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Tone of Voice", h2_style))
story.append(Paragraph(
    "Dependable Home Improvement's brand voice is <b>professional yet approachable, confident yet humble, "
    "expert yet educational</b>.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph("Brand Messaging Pillars", h3_style))
story.append(Spacer(1, 0.15*inch))

story.append(Paragraph("<b>1. Craftsmanship Excellence:</b> We craft solutions. Every detail matters.", box_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("<b>2. Reliability You Can Count On:</b> When we commit, we deliver.", box_style))
story.append(Spacer(1, 0.1*inch))
story.append(Paragraph("<b>3. Transparent Partnership:</b> No hidden fees. No surprises.", box_style))

story.append(PageBreak())

# ============= CONCLUSION =============
story.append(Paragraph("Maintaining Brand Consistency", h1_style))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "The Dependable Home Improvement brand represents over 20 years of commitment to excellence, reliability, and "
    "customer satisfaction. These brand guidelines ensure that every interaction reinforces the values and quality "
    "that have made Dependable Home Improvement a trusted name in Bergen County.",
    body_style
))
story.append(Spacer(1, 0.3*inch))

story.append(Paragraph(
    "<b>Remember:</b> Every project is a brand ambassador. Every customer interaction is a brand experience. "
    "Every material we produce represents our commitment to excellence.",
    box_style
))

story.append(Spacer(1, 0.8*inch))

# Cascadia footer
if os.path.exists('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg'):
    footer_logo_width = 2.5*inch
    footer_logo_height = footer_logo_width / 1.294
    cascadia_footer = Image('/home/ubuntu/upload/LOGOCASCADIA2025.jpg.jpeg', width=footer_logo_width, height=footer_logo_height)
    cascadia_footer.hAlign = 'CENTER'
    story.append(cascadia_footer)

story.append(Spacer(1, 0.15*inch))
story.append(Paragraph("© 2025 Cascadia Managing Brands. All Rights Reserved.", footer_style))

# Build PDF
print("Building PDF with custom canvas...")
doc.build(story, canvasmaker=NumberedCanvas)
print(f"✓ Final corrected brand book created: {pdf_file}")
