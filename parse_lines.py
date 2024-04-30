with open("html.html","r") as f:
    html = f.readlines()
    out ='return "'
for line in html:
    out += line.strip()
out += '";'
with open("out.html","w") as f:
    f.write(out)