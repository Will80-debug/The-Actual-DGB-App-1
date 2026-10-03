#!/usr/bin/env python3
"""
Convert Markdown turnover packet to professional PDF with Will Motivates branding
"""
import markdown2
from weasyprint import HTML, CSS
from pathlib import Path
import base64
import requests

# Download and encode the Will Motivates logo
logo_url = "https://www.genspark.ai/api/files/s/FKlTEoa0"
try:
    response = requests.get(logo_url)
    logo_base64 = base64.b64encode(response.content).decode('utf-8')
    logo_data_uri = f"data:image/png;base64,{logo_base64}"
except Exception as e:
    print(f"Warning: Could not load logo: {e}")
    logo_data_uri = ""

# Read the markdown file
markdown_file = Path('/home/user/webapp/TURNOVER_PACKET.md')
markdown_content = markdown_file.read_text()

# Convert markdown to HTML
html_content = markdown2.markdown(
    markdown_content,
    extras=['tables', 'fenced-code-blocks', 'header-ids']
)

# Create professional HTML template with Will Motivates branding
html_template = f"""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Digital Green Book - Turnover Packet</title>
    <style>
        @page {{
            size: letter;
            margin: 1in;
            @top-center {{
                content: "Digital Green Book - Turnover Packet";
                font-size: 9pt;
                color: #506175;
            }}
            @bottom-center {{
                content: "Page " counter(page) " of " counter(pages);
                font-size: 9pt;
                color: #506175;
            }}
        }}
        
        body {{
            font-family: 'Georgia', 'Times New Roman', serif;
            font-size: 11pt;
            line-height: 1.6;
            color: #0b1a2c;
            max-width: 100%;
        }}
        
        .logo-header {{
            text-align: center;
            margin-bottom: 2em;
            padding-bottom: 1em;
            border-bottom: 3px solid #00aeef;
        }}
        
        .logo-header img {{
            max-width: 400px;
            height: auto;
            margin-bottom: 0.5em;
        }}
        
        h1 {{
            color: #071a30;
            font-size: 24pt;
            margin-top: 0;
            margin-bottom: 0.5em;
            page-break-after: avoid;
            border-bottom: 3px solid #00aeef;
            padding-bottom: 0.3em;
        }}
        
        h2 {{
            color: #164f8c;
            font-size: 18pt;
            margin-top: 1.5em;
            margin-bottom: 0.5em;
            page-break-after: avoid;
            border-bottom: 2px solid #29abe2;
            padding-bottom: 0.2em;
        }}
        
        h3 {{
            color: #1075bc;
            font-size: 14pt;
            margin-top: 1.2em;
            margin-bottom: 0.5em;
            page-break-after: avoid;
        }}
        
        h4 {{
            color: #164f8c;
            font-size: 12pt;
            margin-top: 1em;
            margin-bottom: 0.4em;
            page-break-after: avoid;
        }}
        
        p {{
            margin: 0.5em 0;
            text-align: justify;
        }}
        
        ul, ol {{
            margin: 0.5em 0;
            padding-left: 2em;
        }}
        
        li {{
            margin: 0.3em 0;
        }}
        
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 1em 0;
            font-size: 10pt;
        }}
        
        th {{
            background-color: #071a30;
            color: white;
            padding: 8px;
            text-align: left;
            font-weight: bold;
        }}
        
        td {{
            border: 1px solid #ddd;
            padding: 8px;
        }}
        
        tr:nth-child(even) {{
            background-color: #f9f9f9;
        }}
        
        code {{
            background-color: #f5f5f5;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 10pt;
        }}
        
        pre {{
            background-color: #f5f5f5;
            padding: 12px;
            border-radius: 5px;
            border-left: 4px solid #00aeef;
            overflow-x: auto;
            font-size: 9pt;
        }}
        
        pre code {{
            background-color: transparent;
            padding: 0;
        }}
        
        hr {{
            border: none;
            border-top: 2px solid #00aeef;
            margin: 2em 0;
        }}
        
        blockquote {{
            border-left: 4px solid #00aeef;
            padding-left: 1em;
            margin-left: 0;
            color: #506175;
            font-style: italic;
        }}
        
        .header-info {{
            color: #666;
            font-size: 10pt;
            margin-bottom: 2em;
        }}
        
        .section-note {{
            background-color: #fffdf0;
            border-left: 4px solid #f0ad4e;
            padding: 12px;
            margin: 1em 0;
            font-style: italic;
            color: #856404;
        }}
        
        strong {{
            color: #071a30;
        }}
        
        /* Prevent page breaks inside important elements */
        h1, h2, h3, h4 {{
            page-break-inside: avoid;
        }}
        
        table {{
            page-break-inside: avoid;
        }}
        
        ul, ol {{
            page-break-inside: avoid;
        }}
    </style>
</head>
<body>
    <div class="logo-header">
        <img src="{logo_data_uri}" alt="Will Motivates Logo">
    </div>
    {html_content}
</body>
</html>
"""

# Generate PDF
output_pdf = Path('/home/user/webapp/Digital_Green_Book_Turnover_Packet_2026-01-31.pdf')
HTML(string=html_template).write_pdf(output_pdf)

print(f"✅ PDF generated successfully: {output_pdf}")
print(f"📄 File size: {output_pdf.stat().st_size / 1024:.2f} KB")
