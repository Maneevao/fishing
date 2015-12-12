import os,shutil

topdir = '/home/lested/build/fishing/sites/vk.com/code/'
rezdir = '/home/lested/build/fishing/sites/vk.com/rezcode/'
formcode = '/home/lested/build/fishing/sites/vk.com/problems/Forms/FormCode.html'
exten = '.html'
 
def step(ext, dirname, names):
	ext = ext.lower()
	rdir= dirname.replace("code","rezcode")
	if not os.path.exists(rdir):
		os.mkdir(rdir)
		print(rdir)
	for name in names:
		path = os.path.join(dirname,name)
		if name.lower().endswith(ext):
			f = open(path,"rw")
			html = f.read()
			a1 = html.find("<form")
			if a1!=-1:
				b1 = html.find("Sign up</button>",a1)+len("Sign up</button>")
				a2 = html.find("var qinit = function() {",b1)+len("var qinit = function() {")
				b2 = a2+211 # html.find("}, 1);",a2)+len("}, 1);")
				print a1,b1,a2,b2
				f1 = open(path.replace("code","rezcode"),"w")
				f1.write(html[0:a1]+FormCode+html[b1:a2]+"return;"+html[b2:])
				f1.close()
			else:
				shutil.copy(os.path.join(dirname,name),os.path.join(rdir,name))
			f.close()
		else:
			if not os.path.isdir(path):
				shutil.copy(os.path.join(dirname,name),os.path.join(rdir,name))

f = open(formcode,"r")
FormCode = f.read()
f.close()
os.path.walk(topdir, step, exten)
