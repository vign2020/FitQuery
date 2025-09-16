from PyPDF2 import PdfReader

reader = PdfReader("s40279-017-0762-7.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"


with open(f'../server/src/data/one.text', "w" , encoding="utf-8") as f:
    f.write(text)


