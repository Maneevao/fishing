site 		= ''
DOMAIN 		= $(site)
DEPTH_LEVEL 	= 1
WGETKEYS  	= --no-clobber --convert-links --page-requisites --adjust-extension --recursive --level=$(DEPTH_LEVEL)
WGETKEYS.bak  	= --no-clobber --convert-links --page-requisites --adjust-extension --no-parent

all:
	wget $(WGETKEYS) $(site)
