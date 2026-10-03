#!/usr/bin/env python3
"""
Convert Markdown turnover packet to professional Word document with Will Motivates branding
"""
from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import requests
from io import BytesIO

# Will Motivates color palette
NAVY_DARK = RGBColor(7, 26, 48)      # #071a30
BLUE_SAPPHIRE = RGBColor(22, 79, 140) # #164f8c
CYAN_BRIGHT = RGBColor(0, 174, 239)   # #00aeef
GREY_MUTED = RGBColor(80, 97, 117)    # #506175

def add_horizontal_line(paragraph):
    """Add a horizontal line to a paragraph"""
    p = paragraph._element
    pPr = p.get_or_add_pPr()
    pBdr = OxmlElement('w:pBdr')
    bottom = OxmlElement('w:bottom')
    bottom.set(qn('w:val'), 'single')
    bottom.set(qn('w:sz'), '6')
    bottom.set(qn('w:space'), '1')
    bottom.set(qn('w:color'), '00AEEF')
    pBdr.append(bottom)
    pPr.append(pBdr)

# Create document
doc = Document()

# Set document margins
sections = doc.sections
for section in sections:
    section.top_margin = Inches(1)
    section.bottom_margin = Inches(1)
    section.left_margin = Inches(1)
    section.right_margin = Inches(1)

# Add logo (centered)
try:
    logo_url = "https://www.genspark.ai/api/files/s/FKlTEoa0"
    response = requests.get(logo_url)
    logo_stream = BytesIO(response.content)
    
    logo_paragraph = doc.add_paragraph()
    logo_paragraph.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = logo_paragraph.add_run()
    run.add_picture(logo_stream, width=Inches(4.5))
except Exception as e:
    print(f"Warning: Could not add logo: {e}")

# Add spacing after logo
doc.add_paragraph()

# Title
title = doc.add_heading('Digital Green Book - Turnover Packet', level=1)
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
title_run = title.runs[0]
title_run.font.color.rgb = NAVY_DARK
title_run.font.size = Pt(24)

# Subtitle
subtitle = doc.add_paragraph()
subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
subtitle_run = subtitle.add_run('William Powell Consulting')
subtitle_run.font.size = Pt(12)
subtitle_run.font.color.rgb = GREY_MUTED
subtitle.add_run('\n')
subtitle_run2 = subtitle.add_run('Contract #24-04398 and Contract #24-04372')
subtitle_run2.font.size = Pt(12)
subtitle_run2.font.color.rgb = GREY_MUTED
subtitle.add_run('\n')
subtitle_run3 = subtitle.add_run('Date: January 31, 2026')
subtitle_run3.font.size = Pt(12)
subtitle_run3.font.color.rgb = GREY_MUTED

# Horizontal line
hr = doc.add_paragraph()
add_horizontal_line(hr)

# Section I - Executive Summary
heading1 = doc.add_heading('I. Executive Summary', level=1)
heading1.runs[0].font.color.rgb = NAVY_DARK

p1 = doc.add_paragraph()
p1.add_run('This turnover packet contains all Work Product created by William Powell Consulting during the contract periods for the Greater Rochester Health Foundation (GRHF) Digital Green Book project under Contract #24-04398 and Contract #24-04372. All items listed in Section II were created as part of contractual deliverables and are being transferred to GRHF as required.')

p2 = doc.add_paragraph()
p2_run = p2.add_run('Meeting Notes: ')
p2_run.bold = True
p2_run.font.color.rgb = NAVY_DARK
p2.add_run('Meeting notes were maintained by the project coordinators and stored in the Digital Green Book Google Drive. Mrs. Juanita Lyde served as project coordinator and maintained all meeting notes until she stepped down from the project, at which point Mrs. Danette Campbell-Bell assumed responsibility for keeping updated notes and records of all meetings thereafter. These notes were not authored by William Powell Consulting and are not Work Product under the contracts.')

# Horizontal line
hr = doc.add_paragraph()
add_horizontal_line(hr)

# Section II
heading2 = doc.add_heading('II. Items Included in This Turnover Packet (Contractual Work Product)', level=1)
heading2.runs[0].font.color.rgb = NAVY_DARK

doc.add_paragraph('These items were created during the contract periods and fall under Foreground IP / Work Product.')

# 1. Content Updates
h3_1 = doc.add_heading('1. Content Updates (Contractual Deliverable)', level=2)
h3_1.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('Text content manually written by William Powell Consulting:')
doc.add_paragraph('Organization descriptions for partner organizations', style='List Bullet')
doc.add_paragraph('Service area definitions', style='List Bullet')
doc.add_paragraph('Resource category descriptions', style='List Bullet')

# 2. Onboarding Lists
h3_2 = doc.add_heading('2. Onboarding Lists (Contractual Deliverable)', level=2)
h3_2.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('Lists of organizations onboarded and documented:')
doc.add_paragraph('54 partner organizations across multiple service categories', style='List Bullet')
doc.add_paragraph('Contact information for partner organizations', style='List Bullet')
doc.add_paragraph('Service area categorization', style='List Bullet')

doc.add_paragraph('\nOnboarding notes personally created:')
doc.add_paragraph('Organization verification documentation', style='List Bullet')
doc.add_paragraph('Partner contact lists', style='List Bullet')
doc.add_paragraph('Community focus categorization', style='List Bullet')

# 3. Meeting Notes
h3_3 = doc.add_heading('3. Meeting Notes & Governance Notes (NOT Work Product)', level=2)
h3_3.runs[0].font.color.rgb = BLUE_SAPPHIRE

p3 = doc.add_paragraph('Meeting notes were maintained by the project coordinators and stored in the Digital Green Book Google Drive. Mrs. Juanita Lyde served as project coordinator and maintained all meeting notes until she stepped down from the project, at which point Mrs. Danette Campbell-Bell assumed responsibility for keeping updated notes and records of all meetings thereafter. These notes were not authored by William Powell Consulting and are not Work Product under the contracts.')

# 4. Progress Updates
h3_4 = doc.add_heading('4. Weekly / Monthly Progress Updates (Contractual Deliverable)', level=2)
h3_4.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('All progress updates authored by William Powell Consulting have been provided to GRHF and are stored in the Digital Green Book Google Drive.')
doc.add_paragraph('Weekly status reports (2024 contract period)', style='List Bullet')
doc.add_paragraph('Monthly status reports (2025 contract period)', style='List Bullet')
p4 = doc.add_paragraph()
p4_run = p4.add_run('Location: ')
p4_run.bold = True
p4.add_run('Digital Green Book Google Drive (GRHF-managed)')

# 5. Maintenance Notes
h3_5 = doc.add_heading('5. Maintenance Notes (Contractual Deliverable)', level=2)
h3_5.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('Maintenance notes personally authored by William Powell Consulting documenting support activities performed during the contract period.')
p5 = doc.add_paragraph()
p5_run = p5.add_run('Location: ')
p5_run.bold = True
p5.add_run('Digital Green Book Google Drive (GRHF-managed)')

# 6. Reports
h3_6 = doc.add_heading('6. Reports Submitted (Contractual Deliverable)', level=2)
h3_6.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('Reports personally authored and submitted by William Powell Consulting during the contract engagement.')
p6 = doc.add_paragraph()
p6_run = p6.add_run('Location: ')
p6_run.bold = True
p6.add_run('Digital Green Book Google Drive (GRHF-managed)')

# 7. Marketing Materials
h3_7 = doc.add_heading('7. Marketing Materials & Strategy (Contractual Deliverable)', level=2)
h3_7.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('All marketing materials, strategy documents, and rollout plans have been provided to GRHF and are stored in the Digital Green Book Google Drive.')

h4_7a = doc.add_heading('Marketing Material', level=3)
h4_7a.runs[0].font.size = Pt(12)
doc.add_paragraph('Brand guidelines and visual identity documents', style='List Bullet')
doc.add_paragraph('Marketing collateral and promotional materials', style='List Bullet')
doc.add_paragraph('Social media content and templates', style='List Bullet')
doc.add_paragraph('Community outreach materials', style='List Bullet')
doc.add_paragraph('Presentation decks and pitch materials', style='List Bullet')
p7a = doc.add_paragraph()
p7a_run = p7a.add_run('Location: ')
p7a_run.bold = True
p7a.add_run('Digital Green Book Google Drive (GRHF-managed)')

h4_7b = doc.add_heading('Marketing Strategy', level=3)
h4_7b.runs[0].font.size = Pt(12)
doc.add_paragraph('Comprehensive marketing strategy documentation', style='List Bullet')
doc.add_paragraph('Target audience analysis and personas', style='List Bullet')
doc.add_paragraph('Channel strategy and tactics', style='List Bullet')
doc.add_paragraph('Content marketing plans', style='List Bullet')
doc.add_paragraph('Community engagement strategies', style='List Bullet')
p7b = doc.add_paragraph()
p7b_run = p7b.add_run('Location: ')
p7b_run.bold = True
p7b.add_run('Digital Green Book Google Drive (GRHF-managed)')

h4_7c = doc.add_heading('Rollout Plan', level=3)
h4_7c.runs[0].font.size = Pt(12)
doc.add_paragraph('Launch strategy and timeline', style='List Bullet')
doc.add_paragraph('Phase-by-phase rollout documentation', style='List Bullet')
doc.add_paragraph('Community partner engagement plans', style='List Bullet')
doc.add_paragraph('Success metrics and KPIs', style='List Bullet')
doc.add_paragraph('Implementation guidelines', style='List Bullet')
p7c = doc.add_paragraph()
p7c_run = p7c.add_run('Location: ')
p7c_run.bold = True
p7c.add_run('Digital Green Book Google Drive (GRHF-managed)')

# Horizontal line
hr = doc.add_paragraph()
add_horizontal_line(hr)

# Section III
heading3 = doc.add_heading('III. Items Not Included (Protected Background IP)', level=1)
heading3.runs[0].font.color.rgb = NAVY_DARK

doc.add_paragraph('These items are not Work Product and are not required under either contract.')

# A. Platform
h3_a = doc.add_heading('A. Digital Green Book Platform (Background IP)', level=2)
h3_a.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('The following items constitute Background Intellectual Property owned by William Powell Consulting and are NOT included in this turnover:')

doc.add_paragraph('Source Code: Core application architecture and proprietary code structures', style='List Bullet')
doc.add_paragraph('Architecture: System architecture design and integration patterns', style='List Bullet')
doc.add_paragraph('Database Schema: Database structure and data models', style='List Bullet')
doc.add_paragraph('UI/UX: Original user interface designs and interaction patterns', style='List Bullet')
doc.add_paragraph('Design Files: Original design mockups and brand guidelines', style='List Bullet')
doc.add_paragraph('Backend Structure: Server configuration and deployment scripts', style='List Bullet')
doc.add_paragraph('Hosting Accounts: Cloudflare and GitHub administrative access', style='List Bullet')
doc.add_paragraph('Administrative Access: Platform admin and database credentials', style='List Bullet')
doc.add_paragraph('Technical Documentation: Pre-contract specifications and architecture', style='List Bullet')
doc.add_paragraph('Any IP Created Outside Contract Scope', style='List Bullet')

# B. App Data
h3_b = doc.add_heading('B. App-Generated Data (Not Contractual Work Product)', level=2)
h3_b.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('Analytics: Website traffic and user behavior metrics', style='List Bullet')
doc.add_paragraph('Dashboard Data: System performance metrics', style='List Bullet')
doc.add_paragraph('User Data: User accounts and session data', style='List Bullet')
doc.add_paragraph('Platform Metrics: System health and API usage statistics', style='List Bullet')
doc.add_paragraph('Backend Logs: Application, error, and security logs', style='List Bullet')

# C. Voluntary Work
h3_c = doc.add_heading('C. Voluntary Work Not Required by Appendix A', level=2)
h3_c.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('Early Prototypes: Initial concept designs created before contract', style='List Bullet')
doc.add_paragraph('Strategy Documents: Long-term platform vision and planning', style='List Bullet')
doc.add_paragraph('Design Concepts: Alternative design directions explored', style='List Bullet')
doc.add_paragraph('Any Materials Not Tied to Contracted Support Work', style='List Bullet')

# Horizontal line
hr = doc.add_paragraph()
add_horizontal_line(hr)

# Section IV
heading4 = doc.add_heading('IV. Statement of Compliance', level=1)
heading4.runs[0].font.color.rgb = NAVY_DARK

# Work Product Transfer
h3_wptc = doc.add_heading('Work Product Transfer Confirmation', level=2)
h3_wptc.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('All Work Product created during the contract periods (Contract #24-04398 and Contract #24-04372) has been provided to the Greater Rochester Health Foundation through the following mechanisms:')

doc.add_paragraph()
p_dig = doc.add_paragraph()
p_dig_run = p_dig.add_run('1. Digital Green Book Google Drive (GRHF-managed and controlled):')
p_dig_run.bold = True
doc.add_paragraph('Weekly progress updates (2024 contract)', style='List Bullet 2')
doc.add_paragraph('Monthly progress updates (2025 contract)', style='List Bullet 2')
doc.add_paragraph('Formal reports and deliverable documentation', style='List Bullet 2')
doc.add_paragraph('Marketing materials and brand assets', style='List Bullet 2')
doc.add_paragraph('Marketing strategy documentation', style='List Bullet 2')
doc.add_paragraph('Rollout plan and implementation guides', style='List Bullet 2')
doc.add_paragraph('Maintenance notes', style='List Bullet 2')

p_note = doc.add_paragraph()
p_note_run = p_note.add_run('Note: ')
p_note_run.bold = True
p_note.add_run('Meeting notes were created by GRHF project coordinators (Mrs. Juanita Lyde, then Mrs. Danette Campbell-Bell), not by William Powell Consulting')

doc.add_paragraph()
p_tp = doc.add_paragraph()
p_tp_run = p_tp.add_run('2. In this turnover packet:')
p_tp_run.bold = True
doc.add_paragraph('Content update documentation', style='List Bullet 2')
doc.add_paragraph('Onboarding lists and partner organization documentation', style='List Bullet 2')
doc.add_paragraph('Summary of Work Product locations', style='List Bullet 2')

# No Additional
h3_nawp = doc.add_heading('No Additional Work Product', level=2)
h3_nawp.runs[0].font.color.rgb = BLUE_SAPPHIRE

p_cert = doc.add_paragraph()
p_cert_run = p_cert.add_run('William Powell Consulting hereby certifies that:')
p_cert_run.bold = True

doc.add_paragraph('All Work Product created under Contract #24-04398 and Contract #24-04372 has been provided to GRHF', style='List Bullet')
doc.add_paragraph('All contractually required deliverables have been transferred', style='List Bullet')
doc.add_paragraph('All content updates, progress reports, maintenance notes, and reports authored by William Powell Consulting have been provided', style='List Bullet')
doc.add_paragraph('All onboarding lists and organizational contact information have been provided', style='List Bullet')
doc.add_paragraph('All marketing materials, marketing strategy documents, and rollout plans have been provided', style='List Bullet')
doc.add_paragraph('GRHF has full access to all Work Product through the Digital Green Book Google Drive and this turnover packet', style='List Bullet')
doc.add_paragraph('Meeting notes were created and maintained by GRHF\'s project coordinators (Mrs. Juanita Lyde, then Mrs. Danette Campbell-Bell) and are not Work Product of William Powell Consulting', style='List Bullet')

# Background IP Retention
h3_bir = doc.add_heading('Background IP Retention', level=2)
h3_bir.runs[0].font.color.rgb = BLUE_SAPPHIRE

p_ret = doc.add_paragraph()
p_ret_run = p_ret.add_run('William Powell Consulting retains ownership of:')
p_ret_run.bold = True

doc.add_paragraph('All Background Intellectual Property as defined in Section 3 of Contract #24-04398 and Section 3 of Contract #24-04372')

doc.add_paragraph('\nThis includes, but is not limited to:')
doc.add_paragraph('The Digital Green Book platform source code', style='List Bullet')
doc.add_paragraph('System architecture and design', style='List Bullet')
doc.add_paragraph('Database schemas and structures', style='List Bullet')
doc.add_paragraph('UI/UX designs and implementation', style='List Bullet')
doc.add_paragraph('Backend infrastructure', style='List Bullet')
doc.add_paragraph('Hosting and deployment configurations', style='List Bullet')
doc.add_paragraph('Administrative access and credentials', style='List Bullet')
doc.add_paragraph('All technical IP created outside the contract scope', style='List Bullet')
doc.add_paragraph('App-generated analytics and system data', style='List Bullet')
doc.add_paragraph('Any voluntary work not required by contract', style='List Bullet')

# Acknowledgment
h3_ack = doc.add_heading('Acknowledgment', level=2)
h3_ack.runs[0].font.color.rgb = BLUE_SAPPHIRE

doc.add_paragraph('This turnover packet, together with all materials previously provided in the Digital Green Book Google Drive, constitutes the complete transfer of all Work Product as required under Contract #24-04398 and Contract #24-04372.')

doc.add_paragraph('\nThe Greater Rochester Health Foundation receives full rights to use, modify, and distribute all items listed in Section II (Contractual Work Product) in accordance with the contract terms.')

doc.add_paragraph('\nAll items listed in Section III (Background IP and excluded items) remain the sole property of William Powell Consulting and are not transferred as part of this engagement.')

# Horizontal line
hr = doc.add_paragraph()
add_horizontal_line(hr)

# Section V
heading5 = doc.add_heading('V. Contact Information', level=1)
heading5.runs[0].font.color.rgb = NAVY_DARK

doc.add_paragraph('For questions regarding this turnover packet or any of the included Work Product:')
doc.add_paragraph()
p_contact = doc.add_paragraph()
p_contact_run = p_contact.add_run('William Powell Consulting')
p_contact_run.bold = True
doc.add_paragraph('[Contact information would be inserted here]')

# Footer
doc.add_paragraph()
hr = doc.add_paragraph()
add_horizontal_line(hr)

footer = doc.add_paragraph()
footer.alignment = WD_ALIGN_PARAGRAPH.CENTER
footer_run1 = footer.add_run('Document Prepared By: ')
footer_run1.font.size = Pt(10)
footer_run1.font.color.rgb = GREY_MUTED
footer_run2 = footer.add_run('William Powell Consulting')
footer_run2.font.size = Pt(10)
footer_run2.font.color.rgb = GREY_MUTED
footer_run2.bold = True

footer.add_run('\n')
footer_run3 = footer.add_run('Date Prepared: ')
footer_run3.font.size = Pt(10)
footer_run3.font.color.rgb = GREY_MUTED
footer_run4 = footer.add_run('January 31, 2026')
footer_run4.font.size = Pt(10)
footer_run4.font.color.rgb = GREY_MUTED

footer.add_run('\n')
footer_run5 = footer.add_run('Contract References: ')
footer_run5.font.size = Pt(10)
footer_run5.font.color.rgb = GREY_MUTED
footer_run6 = footer.add_run('Contract #24-04398, Contract #24-04372')
footer_run6.font.size = Pt(10)
footer_run6.font.color.rgb = GREY_MUTED

footer.add_run('\n')
footer_run7 = footer.add_run('Project: ')
footer_run7.font.size = Pt(10)
footer_run7.font.color.rgb = GREY_MUTED
footer_run8 = footer.add_run('Digital Green Book - Monroe County Community Resources Platform')
footer_run8.font.size = Pt(10)
footer_run8.font.color.rgb = GREY_MUTED

# Save document
output_path = '/home/user/webapp/Digital_Green_Book_Turnover_Packet_2026-01-31.docx'
doc.save(output_path)

print(f"✅ Word document generated successfully: {output_path}")
import os
file_size = os.path.getsize(output_path)
print(f"📄 File size: {file_size / 1024:.2f} KB")
