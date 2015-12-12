All: Sites Catcher

ResultDir:
	mkdir -p result
Sites: ResultDir
	find ./sites/*/script.py -exec python '{}' \;
Catcher: ResultDir
	python ./catcher/GenRedir.py
	touch ./result/data.txt
clean:
	rm -fr result
