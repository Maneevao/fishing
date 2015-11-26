import requests

page = requests.get("http://google.com")
print page.content

f = open("site.html","w")
f.write(page.content)#.encode("utf-8"))
f.close()
