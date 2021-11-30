TOPDIR=$(shell cd ../../../..;pwd)
-include $(TOPDIR)/.config

ROOTFS_STYLE_DIR = $(ROOTFS_WEB_DIR)/blueprint/

all:

clean:

distclean:

# When new html files are added, don't forget to install them
# in the corresponding folder!!
install:
	@echo "---------------------------------------------------------"
	@echo "================= Installing style files ================="
#install directory first
	install -m 755 -d $(ROOTFS_STYLE_DIR)
#install other files
	install -m 644 ie.css		$(ROOTFS_STYLE_DIR)
	install -m 644 print.css	$(ROOTFS_STYLE_DIR)
	install -m 644 screen.css	$(ROOTFS_STYLE_DIR)
	@echo "========================================================="
	@echo "---------------------------------------------------------"

