All: Sites Catcher

ResultDir:
	mkdir -p result
Sites: ResultDir
	find ./sites/*/script.py -exec python '{}' \;
Catcher: ResultDir
	cp ./catcher/catcher.php ./result
	touch ./result/data.txt
clean:
	rm -fr result
