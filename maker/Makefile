site 		= ''
DOMAIN 		= $(site)
DEPTH_LEVEL 	= 1
WGETKEYS.BAK  	= --no-clobber --convert-links --page-requisites --no-parent --recursive --level=$(DEPTH_LEVEL) --domains $(DOMAIN)
WGETKEYS  	= --no-clobber --convert-links --page-requisites --adjust-extension --no-parent

all:
	wget $(WGETKEYS) $(site)
