if (!__DEF_DefaultIpAddress) {
	document.write("<script language=\"javascript\" src=\"/js/Definitions.js\"></script>");
	if(!__DEF_DefaultIpAddress)
		var __DEF_DefaultIpAddress = "192.168.2.1";
}
if (!__DEF_UsbHostMaxConnectionLimit)
	var __DEF_UsbHostMaxConnectionLimit = "3";

if (!__DEF_airtouch_text)
	var __DEF_airtouch_text = "AirTouch";
if (!__DEF_rezerved_vlanid)
	var __DEF_rezerved_vlanid = "";

var __ML_lang_code = "en";
var __ML_enabled = "Enabled";
var __ML_disabled = "Disabled";

var __ML_please_wait = "Please wait while page is loaded!";
var __ML_page_load_error = "Page timed out: ";
var __ML_user_name_password_login_error = "Please check your username and password!";
var __ML_password_login_error = "Please check your password!";
var __ML_nat_port_forwarding_max_rule_warning = "You can only add %maxRuleCount% rule!";
var __ML_firewall_access_control_max_rule_warning = "You can only add %maxRuleCount% rule!";
var __ML_firewall_access_control_max_application_warning = "You can only add %maxApplicationCount% application!";
var __ML_nat_port_forwarding_max_application_warning = "You can only add %maxApplicationCount% application!";
var __ML_fw_upgrade_warning = "Please do not turn off this device until upgrade has completed.";

//ADSL Page
var __ML_adsl_status = "DSL Status/Statistics";
var __ML_adsl_training_status = "Training Status:";
var __ML_adsl_mode = "Mode:";
var __ML_adsl_channel = "Channel:";
var __ML_adsl_trellis = "Trellis:";
var __ML_adsl_line_status = "Line Status:";
var __ML_adsl_downstream = "Downstream";
var __ML_adsl_upstream = "Upstream";
var __ML_adsl_max = "Attainable Rate(Kbps): ";
var __ML_adsl_snr = "SNR Margin(dB):";
var __ML_adsl_power = "Power(dB):";
var __ML_adsl_attn = "Attenuation(dB):";

var __ML_dns_intro = "DNS service provides web address to IP address translation. If your ISP provides DNS service, leave this setting empty. If you prefer to use another DNS server, enter its IP address in the DNS 3 field.";

var __ML_homepage = "HOMEPAGE";

var __ML_home_intro = "Thank you for choosing AirTies. Prior to using this device, please consult the user manual to learn about features, proper care and how to best use this product.<p>Some information on the operational status is listed below:</p>";
var __ML_internet_connection = "Internet Connection:";
var __ML_adsl_connection = "DSL Connection:";
var __ML_adsl_rate = "DSL Rate(Kb/s):";
var __ML_internet_ip = "Internet IP Address:";
var __ML_adsl_mac = "DSL MAC Address:";
var __ML_ethernet_connection = "WAN-Ethernet:";
var __ML_usb_connection = "USB";
var __ML_dhcp_server = "DHCP Server:";
var __ML_fwversion = "Firmware Version:";
var __ML_serial_no = "Serial Number:";
var __ML_uptime = "Uptime:";
var __ML_clock = "System Clock:";
var __ML_use_isp_dns = "Use ISP assigned DNS Servers";

var __ML_connected = "Connected";
var __ML_disconnected = "Disconnected";

var __ML_wan_setup = "DSL Setups";
var __ML_wan_intro = "You can create up to 8 Connections on your DSL connection.";
var __ML_edit = "Edit";
var __ML_delete = "Delete";
var __ML_new = "New";
var __ML_set_gw_status = "Set";
var __ML_save = "Save";
var __ML_cancel = "Cancel";

var __ML_pvc_name = "Connection Name";
var __ML_connection_stat = "Connection Status";
var __ML_ip_addr = "IP Address";
var __ML_protocol = "Protocol";

var __ML_pvc_settings = "Connection Settings";
var __ML_ppp_setup = "PPP Settings";
var __ML_pptp_setup = "PPTP Settings";

var __ML_vc1_caption = "";

if(window.__DEF_ptm_enabled != undefined && __DEF_ptm_enabled) {
	__ML_vc1_caption = "You can configure your DSL settings on this page. To set up your DSL connection, choose the protocol being used by your Internet Service Provider (PPPoE, DHCP etc.) and then enter connection data (such as DSL user name and password) given by your Internet Service Provider. On “ATM Parameters” section, enter ATM parameters required for ADSL and VDSL connections, on “PTM Parameters”section, enter PTM parameters required for VDSL connection. After completing all settings, press “Save” button.”";
} else {
	__ML_vc1_caption = "You can configure your DSL settings on this page. To set up your DSL connection, choose the protocol being used by your Internet Service Provider (PPPoE, DHCP etc.) and then enter connection data (such as DSL user name and password) given by your Internet Service Provider. On “ATM Parameters” section, enter ATM parameters required for ADSL connections. After completing all settings, press “Save” button.”";
}
var __ML_vc1_protocol = "Protocol";
var __ML_encapsulation = "Encapsulation";
var __ML_username = "DSL Username";
var __ML_eth_ppp_username = "Username";
var __ML_pptp_username = "PPTP Username";
var __ML_password = "DSL Password";
var __ML_eth_ppp_password = "Password";
var __ML_pptp_password = "PPTP Password";
var __ML_pptp_servername = "Server";
var __ML_static_mode = "Mode";
var __ML_static_bridged = "Bridged";
var __ML_static_routed = "Routed";
var __ML_mtu = "MTU";
var __ML_pvc_parameters = "ATM Parameters";
var __ML_service_category = "ATM QoS";
var __ML_pptp_usepeerdns = "usepeerdns";
var __ML_pptp_refuse_pap = "refuse-pap";
var __ML_pptp_refuse_eap = "refuse-eap";
var __ML_pptp_require_mppe_128 = "require-mppe-128";
var __ML_username_other = "other";

var __ML_adsl_settings = "DSL Settings";
var __ML_dns_setup = "<acronym>DNS</acronym> Setup";
var __ML_mode_setup = "Mode Setup";
var __ML_ip_setup = "<acronym>IP</acronym> and <acronym>DHCP</acronym> Settings";
var __ML_lan_clients = "<acronym>LAN</acronym> Clients";
var __ML_wireless = "WIRELESS";
var __ML_wireless_caption = "Wireless";
var __ML_wireless_setup = "Wireless Settings";
var __ML_wireless_security = "Wireless Security Settings";
var __ML_mac_filtering = "MAC Filtering";
var __ML_wireless_mac_filtering = "<acronym>MAC</acronym> Filtering";
var __ML_firewall_mac_filtering = "<acronym>MAC</acronym> Filtering";
var __ML_mesh = "MESH";
var __ML_firewall = "FIREWALL";
var __ML_access_control = "Access Control";
var __ML_applications = "Applications";
var __ML_web_filter = "WEB Filters";
var __ML_url_filter = "URL Filters";
var __ML_dmz = "<acronym>DMZ</acronym>";
var __ML_anti_dos = "<acronym>Anti-DOS</acronym>";
var __ML_vpn = "VPN";
var __ML_vpn_profiles = "VPN Profiles";
var __ML_nat = "NAT";
var __ML_port_forwarding = "PORT FORWARDING";
var __ML_port_forwarding_title = "Port Forwarding";
var __ML_igmp = "IGMP";
var __ML_routing = "ROUTING";
var __ML_routing_title = 'Routing';
var __ML_static_routing = "Static Routing";
var __ML_dynamic_routing = "Dynamic Routing";
var __ML_policy_routing = "Policy Routing";
var __ML_qos = "QoS";
var __ML_traffic_shaping = "Traffic Shaping";
var __ML_traffic_classification = "Traffic Classification";
var __ML_ddns = "<acronym>DDNS</acronym>";
var __ML_ddns_settings = "<acronym>DDNS</acronym> Settings";
var __ML_tools = "TOOLS";
var __ML_fw_update = "Firmware Update";
var __ML_password_setup = "Password Settings";
var __ML_time_setup = "Time Settings";
var __ML_report = "REPORT";
var __ML_system_logs = "System Logs";

var __ML_tr069_setup = "TR-069 Setup";

var __ML_tr069_intro = "TR-069 defines an application layer protocol for remote management of end-user devices.";
var __ML_tr069_enable = "Enable TR-069";
var __ML_tr069_url = "URL:";
var __ML_tr069_user = "Username:";
var __ML_tr069_pass = "Password:";
var __ML_tr069_inform_enabled = "Periodic Inform:";
var __ML_tr069_inform_interval = "Periodic Inform Interval:";
var __ML_tr069_conreq_url = "Connection Request URL:";
var __ML_tr069_conreq_user = "Connection Request Username:";
var __ML_tr069_conreq_pass = "Connection Request Password:";
var __ML_error_in_format = "Error in the format!";
var __ML_error_in_format_http= "Possible mistake is \"http://\" or \"https://\" is forgotten at the beginning of the URL.\nExample format= http://192.168.1.1:9999/tr069/";
var __ML_error_in_format_ip = "Not a valid IP address.\nExample format= http://192.168.1.1:9999/tr069/";
var __ML_error_in_format_port = "Port is not valid\nExample format= http://192.168.1.1:9999/tr069/";
var __ML_error_in_format_tr69 = "Error!\nThere should be \"/tr69/\" at the end of the URL.\nExample format= http://192.168.1.1:9999/tr069/";

var __ML_DDNS_intro = "Dynamic DNS is a system which allows the domain name data held in a name server to be updated in real time. The most common use for this is in allowing an Internet domain name to be assigned to a computer with a varying (dynamic) IP address. This makes it possible for other sites on the Internet to establish connections to the machine without needing to track the IP address themselves. A common use is for running server software on a computer that has a dynamic IP address, as is the case with many consumer Internet service providers.";
var __ML_DDNS_setup = "<acronym>DDNS</acronym> Settings";
var __ML_DDNS_setup_intro = "You must get an account, password, and your static Domain Name from a DDNS service provider.<br>Choose one of the DDNS services supported by your modem and enter the service information you will get from that service provider.";
var __ML_DDNS_user = "User name :";
var __ML_DDNS_pass = "Password :";
var __ML_DDNS_new_host = "You must get an account, password, and your static Domain Name from a DDNS service provider.<br>Choose one of the DDNS services supported by your modem and enter the service information you will get from that service provider.";
var __ML_DDNS_enabled = "Enable DDNS";
var __ML_NewDDNSPage = "New";
var __ML_DDNS_hostname = "Hostname";
var __ML_DDNS_service_name = "DDNS Service Name";
var __ML_DDNS_status = "Status";
var __ML_DDNS_is_active = "Activate";
var __ML_DDNS_configuration = "Configuration";

var __ML_reboot = "Reboot";
var __ML_reboot_info = "If you want to reboot the device you can use this button.&nbsp;<br>  Note: Connection will be lost while device reboots.";
var __ML_factory_defaults = "Reset Settings";
var __ML_factory_defaults_info = "If you want to reset all configuration to factory default use this button.<br>Device will be rebooted after the reset operation.<br>Note: Connection will be lost while device reboots.";
var __ML_rebooting = "Restarting...";
var __ML_wait = "Please Wait!";
var __ML_progress = "Progress";
var __ML_0percent = "0%";
var __ML_100percent = "100%";

var __ML_lan_ip_dhcp_title = "IP and DHCP Settings";
var __ML_lan_ip_dhcp_info = "LAN IP settings and DHCP settings can be configured on this page.";
var __ML_lan_ip_settings = "Local IP Settings";
var __ML_lan_ip_addr = "IP Address";
var __ML_lan_ip_netmask = "Netmask";
var __ML_lan_dhcp_settings = "DHCP Settings";
var __ML_lan_dhcp_enable_server = "Enable DHCP Server";
var __ML_lan_dhcp_start = "Start IP Address";
var __ML_lan_dhcp_end = "End IP Address";
var __ML_lan_dhcp_lease = "Lease time (sec)";
var __ML_lan_dhcp_enable_relay = "Enable Relay";
var __ML_lan_dhcp_client_enable="Enable DHCP Client";
var __ML_lan_dhcp_relay_ip = "Server IP Address";
var __ML_lan_dhcp_disable = "Disable DHCP";
var __ML_lan_ip_confirmation = "You are about to change your IP settings. If you choose to continue you may not be able to reach your device from this IP address. Would you like to continue?";
var __ML_invalid_lease_time = "Invalid Lease Time!";
var __ML_lan_dhcp_netmask_warrning = "Please check Subnet values that you entered.";

var __ML_lan_dhcp_client_add = "Add LAN Client";
var __ML_lan_dhcp_client_list = "<acronym>LAN</acronym> Client List";
var __ML_lan_dhcp_client_info = "All DHCP Clients can be viewed on this page.";
var __ML_lan_dhcp_client_mac = "MAC Address";
var __ML_lan_dhcp_client_ip = "IP Address";
var __ML_lan_dhcp_client_lease = "Remained Lease Time";
var __ML_lan_dhcp_client_lan = "LAN Group";
var __ML_lan_dhcp_static_dynamic = "Type";
var __ML_lan_dhcp_dynamic_ip = "Dynamic Addresses";
var __ML_lan_dhcp_static_ip = "Static Addresses";
var __ML_lan_dhcp_client_reserve = "Reserve";
var __ML_lan_dhcp_client_reserve_delete = "Delete";
var __ML_lan_dhcp_days = "Days";
var __ML_lan_dhcp_hours = "Hours";
var __ML_lan_dhcp_clients_no_have_dhcps_server_info = "You can not add any DHCP Client while DHCP Server is disabled.";

var __ML_LAN_NETMASK_254 = "Warning!\nNetmask is defined for more than 254 users although this product is designed for maximum 254 users.";
var __ML_LAN_ERROR_IP_VALUE = "Error in format of the IP addresses. Please correct them.";
var __ML_LAN_WARNING = "Warning!!!";
var __ML_LAN_START_ROUTER= "DHCP Start IP Address does not match with the device's IP Address.";
var __ML_LAN_END_ROUTER= "DHCP End IP Address does not match with the device's IP Address.";
var __ML_LAN_START_END= "DHCP Start IP Address is larger than the End IP Address.";
var __ML_LAN_CORRECT = "Correcting the mistakes";
var __ML_LAN_PROBLEM_STATES = "Config file error!!!\nPlease restart DHCP Server or Relay.";

var __ML_route_main_info = "Routing sets the rules which defines how IP packets moves to their destination in an IP network.  Static routing rules which defines the destination IP addresses may be defined or RIP dynamic routing protocol, which updates the rules automatically, may be used.";
var __ML_route_main_table = "Route Table";
var __ML_route_main_table_runtime = "Route Table Run-Time";

var __ML_route_static_routing = "Static Routing";
var __ML_route_static_routing_info = "On this page, you may enter the necessary destination IP information in order to set a static routing rule.";
var __ML_route_static_table_delete="Delete";
var __ML_route_static_table_connection="Connection";
var __ML_route_static_table_destination="Destination";
var __ML_route_static_table_gateway="Gateway";
var __ML_route_static_table_metric="Metric";
var __ML_route_static_table_netmask="Netmask";
var __ML_delete_saved_rule_confirm = "Are you really  sure about to delete the rule that you entered?";

var __ML_route_dynamic="Dynamic Routing";
var __ML_route_dynamic_info="In order to use dynamic routing, please choose the RIP protocol version, and enter a password if it is necessary.  For each interface define the direction of the routing.";
var __ML_route_dynamic_enable_rip="Enable RIP";
var __ML_route_dynamic_protocol="Protocol";
var __ML_route_dynamic_v1_compatible="RIP v1 compatible";
var __ML_route_dynamic_enable_password="Enable password";
var __ML_route_dynamic_password="Password";
var __ML_route_dynamic_interfaces="Interfaces";
var __ML_route_dynamic_direction="Direction";
var __ML_route_dynamic_direction_none="None";
var __ML_route_dynamic_direction_in="In";
var __ML_route_dynamic_direction_out="Out";
var __ML_route_dynamic_direction_both="Both Directions";
var __ML_gateway = "Gateway";
var __ML_destination = "Destination";
var __ML_netmask = "Netmask";
var __ML_metric = "Metric";

var __ML_tools_text = "Tools";
var __ML_restart_button = "Restart";
var __ML_system_restart_text = "Click this button to restart the system. Your connection to the device will be lost and then restored after a few seconds.";
var __ML_restore_factory_defaults = "Restore Factory Defaults";
var __ML_restore_factory_defaults_text = "Click this button to restore the factory default settings of the device. Your connection to the modem will be lost and then restored after a few seconds.";
var __ML_save_config_text = "Click this button to save your config to your computer.  You may restore your current settings later by choosing the saved config file and pressing the button below.";
var __ML_save_config = "Backup Config";
var __ML_restore_config= "Restore Config";
var __ML_Config_File_Alert = "You must select a config.bin file.";
var __ML_Restoring_Config = "Restoring Config...";

var __ML_str_caption = "Restarting System";

var __ML_fact_caption = "Restoring Factory Defaults";
var __ML_factory = "Restoring...";

var __ML_restarting_system0 = "Upgrading Firmware";
var __ML_prog_status = "Status";
var __ML_restarting_system1 = "Please wait while the device restarts...";

var __ML_snmp_settings = "SNMP Settings";
var __ML_snmp_intro = "SNMP allows to manage and monitor the device remotely.";
var __ML_snmp_enabled = "SNMP Enabled";
var __ML_community = "Community Name";
var __ML_right = "Access Right";
var __ML_read = "Read";
var __ML_read_write = "Read/Write";

var __ML_rm_remote_management = "Remote Management";
var __ML_rm_on_this_page = "On this page, you can enter settings to manage your device remotely. If you would like to manage your device remotely from a computer on the Internet, click the enable checkbox, select from a list of pre-recorded IP addresses or enter its IP address manually and click Add. To manage from any computer, click the 'Any IP' checkbox. When done, click Save.";
var __ML_rm_enable_remote_management = "Enable Remote Management";
var __ML_rm_any_ip = "Any IP";
var __ML_rm_service = "Service";
var __ML_rm_wan = "WAN";
var __ML_rm_ping = "Ping";
var __ML__rm_telnet = "Telnet";
var __ML_rm_web = "Web";
var __ML_rm_snmp_3 = "SNMP";
var __ML_rm_ip_access_list = "IP Access List : ";
var __ML_rm_select_ip_address = "Select IP Address";
var __ML_rm_delete_3 = "Delete";
var __ML_rm_new_ip_address = "New IP Address : ";
var __ML_rm_add = "Add";

var __ML_Firmware_Upgrade = "Firmware Upgrade";
var __ML_uiViewFileSelector = "Select File";
var __ML_FW_File_Alert = "You must select a file to update.";
var __ML_FW_UPG_TXT = "To update the running firmware on the modem, click the Browse button and then find the most recent firmware file in the window that will pop up. <BR>(You can get the most recent firmware from http://www.airties.com) Then click Update button.";
var __ML_uiUpgrade = "Upgrade";

//Port Forwarding Page
var __ML_rule_name = "Rule Name";
var __ML_new_ip_address = "New IP Address";
var __ML_new_app_name = "Application Name";
var __ML_pf_new_tcp_ports = "TCP Ports";
var __ML_pf_new_udp_ports = "UDP Ports";

//Page Validation strings
var __ML_Required_Field = " is a required field.";
var __ML_Regex_Msg = " format or the characters inside it must be such as eg:";
var __ML_Regex_wrong = "is not according to specs.";
var __ML_Uniqe_Name = "is used before by another instance as @replace";

var __ML_sntp_header = "Time Server (SNTP)";
var __ML_sntp_info = "Your device updates the date via Network Time Protocol (NTP) by using NTP servers in the Internet. Sometime servers are entered as factory defaults. In order to change the configurations related to NTP, this page should be used.";
var __ML_sntp_enable = "Enable Time Server";
var __ML_sntp_prim_server = "Primary Time Server";
var __ML_sntp_secn_server = "Secondary Time Server";
var __ML_sntp_tert_server = "Tertiary Time Server";
var __ML_sntp_poll_interval = "Update Interval";
var __ML_sntp_minutes = "Minutes";
var __ML_sntp_timezone = "Time Zone";
var __ML_sntp_daylight = "Daylight Saving";

var __ML_adsl_rate_up = "Upstream Rate(Kb/s):";
var __ML_adsl_rate_down = "Downstream Rate(Kb/s):";
var __ML_adsl_attn_up = "Upstream Attenuation(dB):";
var __ML_adsl_attn_down = "Downstream Attenuation(dB):";
var __ML_product_info = "Product Information";
var __ML_model_name = "Model Name:";
var __ML_hw_revision = "Hardware Revision:";
var __ML_eth_mac = "Ethernet MAC Address:";
var __ML_dsl_mac = "DSL MAC Address:";
var __ML_software_versions = "Software Versions";
var __ML_bootloader = "Bootloader Version:";
var __ML_report_intro = "On this page, a brief report is displayed about the device.";

var __ML_login_Copyright = "Copyright © 2005-2014 AirTies Wireless Networks. All rights reserved.";
var __ML_login_solubility = "Internet Explorer 7.0+ or Firefox 3.0+ with minimum 1024x768 resolution is recommended for the best view. ";

var __ML_Query_Error = "AJAX Query error: ";

var __ML_bridge_setup = "Bridge Settings";
var __ML_dhcp_setup = "DHCP Settings";
var __ML_static_setup = "Static Settings";
var __ML_dhcp_ip_address = "IP Address";
var __ML_dhcp_network_mask = "Network Mask";
var __ML_static_network_gateway = "Network Gateway";
var __ML_static_default_gateway = "Default Gateway";
var __ML_renew_button0 = "Renew";
var __ML_relase_button0 = "Release";
var __ML_error_inputs = "Error in input!!!";
var __ML_pptp_dhcp_renew_button = "Renew";
var __ML_pptp_dhcp_release_button = "Release";

var __ML_management = "MANAGEMENT";
var __ML_snmp = "SNMP";
var __ML_remote_access = "Remote Management";

var __ML_lan_dhcp_relay_connection = "Connection";
var __ML_dhcp_relay_ip_warning = "Error:\nThere is a problem in the IP address of DHCP Relay Server.\nPlease correct the mistakes.";

var __ML_dhcp_clients_error_ip = "Error in IP Address!\nExample Format: 192.168.2.1";
var __ML_dhcp_clients_error_mac = "Error in MAC Address!\n\nExample Formats:\n88:99:AA:BB:cc:dd or\n12.34.56.78.90.ab or\n12-34-56-78-90-AB";
var __ML_lan_dhcp_client_name= "Name";
var __ML_lan_dhcp_ip_empty="Warning!\nIP address to be given as static client is not defined.";
var __ML_lan_dhcp_mac_empty="Warning!\nMAC address to be given as static client is not defined.";
var __ML_lan_ip_will_be_released = "Warning!\nYour device will get an IP address from a DHCP server. When DHCP client gets the new IP address, you will not be able to access your device from this IP address. Until then your devices IP address will be 192.168.2.254!";

var __ML_route_static_warning_destination_netmask_mismatch = "Warning!\nYou have entered mismatching Destination IP and Netmask values.\nPlease check your configurations.";
var __ML_route_static_error_in_inputs = "Error in inputs!";

var __ML_pl_wait = "Please wait";

var __ML_reboot_title = "Restarting System";

var __ML_fact_title = "Restoring Factory Defaults";

var __ML_selected_client_ip = "Selected Client IP";

var __ML_Regex_wrong = "is not according to specs.";

var __ML_pf_rule_name = "Rule Name";
var __ML_pf_client_ip = "Client IP";
var __ML_pf_client_list = "Client List";
var __ML_pf_active_rules = "Active Applications";
var __ML_pf_is_active = "Activate";
var __ML_pf_configuration = "Configuration";

var __ML_log_settings = "Log Settings";
var __ML_instance_name = "Application Name";
var __ML_loglevel = "Log Level";
var __ML_emergency = "Emergency";
var __ML_alert = "Alert";
var __ML_critical = "Critical";
var __ML_error = "Error";
var __ML_warning = "Warning";
var __ML_notice = "Notice";
var __ML_info = "Information";
var __ML_debug = "Debug";
var __ML_set_all = "Set All";
var __ML_log_settings_intro = "You can select log level and define a remote logging location on this page.";
var __ML_syslog_enabled = "Syslog Enabled";
var __ML_syslog_level = "Syslog Log Level";
var __ML_klog_enabled = "Kernel Log Enabled";
var __ML_klog_level = "Kernel Log Level";
var __ML_remote_log_enabled = "Remote Log Enabled";
var __ML_logs = "LOGS";
var __ML_log_intro = "Kernel and application logs are printed here.";

var __ML_password_settings = "Password Settings";
var __ML_password_intro = "You can define a password to protect user interface.<br>It is recommended that you change the factory default password to your preference.";
var __ML_password_intro_mandatory = "You have to define a password to protect the user interface. It is mandatory to change the default password the first time you login to the user interface.";
var __ML_cur_password = "Current Password";
var __ML_new_password = "New Password";
var __ML_confirm_password = "Confirm Password";
var __ML_new_password_mismatch = "New passwords don't match.";
var __ML_cur_password_wrong = "Current Password is not correct.";

//Firewall
var __ML_firewall_caption = "Firewall";
var __ML_firewall_intro = "Firewall protects your computers and your network against harmful attacks from the Internet. Your modem's firewall has Stateful Packet Inspection (SPI) feature that will inspect every packet coming from the Internet to your modem and will not allow any that is not authorized to pass through. Using the Firewall menu, you can also define advanced rules to allow or prohibit local users in your network to access the Internet, to open certain ports that allow packets to reach applications running on local clients, and to forward all incoming traffic to a certain computer.";
var __ML_enable_firewall = "Enable Firewall";
var __ML_disable_firewall = "Disable Firewall";

//Firewall - Access Control
var __ML_access_control_caption = "Access Control";
var __ML_access_control_intro = "You can define rules that establish access rights to Internet for clients in your local network. The list of currently active rules is below. To add a new rule, click New.";
var __ML_enable_lan_access_control = "Enable LAN Access Control";

//Firewall - IP Filters
var __ML_ip_filters = "IP Filters";
var __ML_add_a_new_rule = "To add a new rule, enter rule name. To specify the LAN clients that the rule will be applied, enter the MAC addresses of the LAN client, or enter an IP address range, or select them from the existing client list and then click Add. When you have all the clients that the rule will be applied in the Client List, specify the applications that will be restricted.";
var __ML_add_a_new_url_rule = "To specify the LAN clients that the URL filters will be applied, enter the MAC addresses of the LAN client, or enter an IP address range, or select them from the existing client list and then click Add. When you have all the clients that the URL filter will be applied in the Client List, specify the filters that will be applied.";
var __ML_add_a_new_pf_rule = "To add a new rule, enter rule name. To specify the LAN client that the rule will be applied, enter an IP address, or select them from the existing client list and then click Add. When you have the client that the rule will be applied, specify the applications that port forwarding will be applied.";
var __ML_select_client = "SELECT CLIENT";
var __ML_restricted_client_list = "Restricted Client List";
var __ML_new_mac_address = "New MAC Address";
var __V_add_button0 = "Add >";
var __ML_new_ip_address_range = "New IP address range";
var __V_add_button1 = "Add >";
var __ML_existing_lan_clients = "Existing LAN clients";
var __ML_mac_address = "MAC ADDRESS";
var __ML_ip_address = "IP ADDRESS";
var __ML_name = "NAME";
var __V_add_button2 = "Add >";
var __V_remove_button0 = "< Remove";
var __ML_ip_fl_select_the_app = "Select the application(s) that will become restricted for the client(s) in the 'Restricted Client List'. If you want an application that is not present in the list to become restricted, you can define a new application by clicking the 'New' button. When you are done specifying applications click 'Save'.";
var __ML_ip_fl_select_app = "SELECT APPLICATIONS";
var __ML_ip_fl_block_all_traffic = "Block all traffic:";
var __ML_ip_fl_block_pings = "Block Pings:";
var __ML_ip_fl_existing_app = "Existing Applications";
var __ML_ip_fl_restricted_app = "Restricted Applications";
var __V_add_button3 = "Add >";
var __V_remove_button1 = "< Remove";
var __ML_new_button0 = "New";
var __ML_edit_button0 = "Edit";
var __ML_delete_button0 = "Delete";
var __ML_scheduling = "Scheduling: ";
var __ML_start = "Start";
var __ML_end = "End";
var __ML_days = "Days";
var __ML_mon = "Mon";
var __ML_Tue = "Tue";
var __ML_Wed = "Wed";
var __ML_Thu = "Thu";
var __ML_Fri = "Fri";
var __ML_Sat = "Sat";
var __ML_Sun = "Sun";
var __ML_not_add_client = "Can add maximum %maxCount% Clients";
var __ML_select_day = "Must be select a day or days!";
var __ML_colliding_ip_range = "The range you entered is colliding with an entry in the list : ";
var __ML_block_all_traffic = "Before adding, make sure the 'Block all traffic' button is unchecked and click the save button";
var __ML_select_valid_application = "Select a valid blocked application";

//Firewall Mac Filter
var __ML_mac_filtering_feature = "The MAC Filtering feature blocks the computers to access the network according to their MAC addresses. When this feature is enabled, users  whose MAC addresses are listed, are blocked from modem and Internet access. Enter a new MAC address and click Add or select from the existing clients listed.";
var __ML_mac_address_filtering = "<acronym>MAC</acronym> Address Filtering";
var __ML_enable_mac_filtering = "Enable MAC Filtering";
var __ML_existing_clients = "Existing LAN Clients";
var __ML_allowed_client_list = "Blocked Client List";
var __ML_add_button0 = "Add >";
var __ML_add_button1 = "Add >";
var __ML_remove_button0 = "< Delete";
var __ML_mac_filter_max_warning = "The maximum number of MAC filtering is @number@";

//NAT
var __ML_nat_caption = "<acronym>NAT</acronym> (Network Address Translation)";
var __ML_network_address_translation = "Network Address Translation (NAT) performs the necessary translations that allow the IP address given to you by your service provider (WAN IP address) to be shared by multiple clients in your local network.";
var __ML_enable_nat = "Enable NAT";
var __ML_disable_nat = "Disable NAT";
var __ML_port_routing = "Port Routing";
var __ML_port_routing_info = "To add a new rule, enter rule name. To specify the LAN client that the rule will be applied, enter an IP address, or select them from the existing client list and then click Add. When you have the client that the rule will be applied, specify the applications that port forwarding will be applied.";
var __ML_port_routing_info2 = "Your device can be configured as a virtual server, meaning that multiple clients on the Internet can access services such as web or FTP servers on your LAN. When doing this, they use real IP addresses forwarded to the local IP addresses of the servers. It can forward incoming packets to an IP address on the LAN based on the protocol and the port number. To forward a range of ports instead of a single port, use ‘:’ character in between. For example to forward all ports between 23 and 80, enter '23:80'.";
var __ML_rule_name = "Rule Name";
var __ML_lan_ip = "LAN IP";
var __ML_protocol_type = "Protocol Type";
var __ML_lan_port = "LAN Port";
var __ML_wan_port = "WAN Port";
var __ML_lan = "LAN";
var __ML_wan = "WAN";
var __ML_napt = "<acronym>NAPT</acronym>";
var __ML_protocol = "Protocol";
var __ML_org_source_ip_port = "Original Source IP:Port";
var __ML_org_dest_ip_port = "Original Dest. IP:Port";
var __ML_packets_bytes = "Packets / Bytes";
var __ML_replay_source_ip_port = "Reply Source IP:Port";
var __ML_replay_dest_ip_port = "Reply Dest. IP:Port";

//NAT Port Forwarding
var __ML_enable_port_fw = "Enable Port Forwarding";
var __ML_NewAccsCtrlRulePage = "New";

//NAT Port Forwarding Page
var __ML_port_routing = "Port Routing";
var __ML_lan_interface = "LAN Interface";
var __ML_wan_interface = "WAN Interface";
var __ML_modem_can_be_configured = "Your modem can be configured as a virtual server and clients on the Internet can access the services such as web or FTP servers on your LAN using real IP addresses that are forwarded to the local IP addresses of such servers. It can forward incoming packets to an IP address on the LAN based on the protocol and the port number. You can specify a port map using '-' character between two port numbers. Port Map example: 1060-1100";
var __ML_enter_a_name_for_port_forwarding = "Enter a name for the port forwarding rule you are to define in the Application field.";
var __ML_enter_the_local_ip_address = "Enter the local IP address of the machine that is going to be reached from Internet in the Target IP Address field.";
var __ML_please_select_the_protocol = "Please select the protocol that the requested application uses (If it is not known which protocol the application uses, it is recommended to select TCP&UDP).";
var __ML_enter_the_port_number_s0 = "Enter the port number(s) the application use(s) in the WAN ports field.";
var __ML_enter_the_port_number_s1 = "Enter the port number(s) that the application is going to use in the local network in the Target LAN Ports field (usually it is same as the real port(s)).";
var __ML_instead_of_forwarding = "Instead of forwarding a single port, you can forward multiples by specifying them as intervals seperated by ':'. For example to forward all ports between 23 and 80 enter 23:80 in this field.";
var __ML_app_name = "Application Name";
var __ML_app_wan_tcp_ports = "WAN TCP Ports";
var __ML_app_wan_udp_ports = "WAN UDP Ports";
var __ML_app_lan_tcp_ports = "LAN TCP Ports";
var __ML_app_lan_udp_ports = "LAN UDP Ports";
var __ML_delete_button = "Remove";

//NAT - DMZ
var __ML_dmz_settings = "<acronym>DMZ</acronym> Settings";
var __ML_dmz_feature = "Demilitarized Zone (DMZ) feature allows a LAN client's all ports to be accessible from the Internet.  To forward all Internet traffic to a certain LAN client,  select its IP address from the existing client list and then click Save. To define a new LAN client, click the link named LAN Clients.";
var __ML_enable_dmz = "Enable DMZ";
var __ML_write_an_ip = "IP Address : ";

//Management
var __ML_you_can_manage_modem = "You can manage your device using SNMP (Simple Network Management Protocol), telnet, or this web interface and also change your web interface password";
var __ML_you_can_manage_modem_without_snmp = "In this section you may configure remote access tools like telnet and you may manage this user interface's login password as well.";

var __ML_CompareFieldAlert = " condition must be provided.";
var __ML_RequiresReboot = "Some changes on this page requires reboot if submited successfully. Because of this you will be directed to the reboot page";

var __ML_per_second = "Per Second";
var __ML_per_minute = "Per Minute";
var __ML_per_hour = "Per Hour";
var __ML_vc1_name = "";
var __ML_pvc_vpi = "VPI";
var __ML_pvc_vci = "VCI";
var __ML_pvc_pcr = "PCR";
var __ML_pvc_scr = "SCR";
var __ML_pvc_mbs = "MBS";
var __ML_pvc_cdvt = "CDVT";
var __ML_traffic_class = "ATM QoS";
var __ML_login_password = "Password";
var __ML_login_username = "Username";
var __ML_login = "LOGIN";
var __ML_ok = "OK";
var __ML_anti_dos_enabled = "Anti-DOS Enabled";
var __ML_new_connections = "new connection";
var __ML_anti_dos_feature = "The Anti-DOS feature blocks Denial of Service attacks to your modem. In this page, you can determine the maximum number of allowed connections for discrete protocols over a certain time.";
var __ML_tcp = "TCP";
var __ML_udp = "UDP";
var __ML_icmp = "ICMP";

var __ML_OutOfBounds = "You cannot add more rules as you have reached the rule limit of @number. The names of the other rules are: @type_names ";
var __ML_VpiVciDuplicate = "This vpi, vci values are used together before. Please retry with different vpi vci values.";

var __ML_exit = "Exit";
var __ML_refresh = "Refresh";

var __ML_MissingPorts = "You must declare TCP or UDP ports.";
var __ML_MissingTCPInput = "You must declare LAN and WAN fields for TCP ports";
var __ML_MissingUDPInput = "You must declare LAN and WAN fields for UDP ports";
var __ML_TCPPortNumber = "You don't have same number of port entry for TCP Lan and Wan Ports";
var __ML_UDPPortNumber = "You don't have same number of port entry for UDP Lan and Wan Ports";
var __ML_TCPPortRange = "Each LAN TCP Port Range must be the same range for WAN TCP Port Range.";
var __ML_TCPPortEntries = "TCP LAN and WAN ports and port_ranges must be written in the same order.";
var __ML_UDPPortRange = "Each LAN UDP Port Range must be the same range for WAN UDP Port Range.";
var __ML_UDPPortEntries = "UDP LAN and WAN ports and port_ranges must be written in the same order.";
var __ML_RangeError = "When declaring port range such as a:b always b must be bigger than a.";

var __ML_enable_antidos = "Enabled Anti-DOS";
var __ML_dmz_lan_list = "Select";
var __ML_dmz_ip_address_error = "Select a client or enter a new IP address";
var __ML_dmz_select = "Select one : ";
var __ML_dmz_Ip = "IP Address";
var __ML_dmz_write = "Type in : ";

var __ML_wrong_ip_range = " : end ip address must be bigger than the start ip address";
var __ML_select_a_rule = "Select a rule in the client list for Delete";
var __ML_client_already = "This client is already in the list.";
var __ML_macaddr_client_empty = "MAC address of the client is empty!";
var __ML_keyword = "Keyword";
var __ML_block_access = "URL filters allow you to restrict access to pre-determined websites. On this page you can enter the URL addresses or some portion of the URL adresses of the websites that you want to block access to.";
var __ML_enable_url_filters = "Enabled Url Filter";

var __ML_wrong_schedlue_message = "Select day for scheduling";
var __ML__mac_list_full = "This MAC address is already client list";
var __ML_client_list = "This client is already list";
var __ML_invalid_ip = "Invalid IP Address";
var __ML_invalid_ipr = "Invalid IP Range";
var __ML_invalid_mac = "Invalid MAC address";
var __ML_app_already_list = "This application is already list";
var __ML_select_valid_app = "Select a valid application";
var __ML_select_valid_mac = "Select a MAC address";
var __ML_ip_list = "This IP Address is already in IP list.";
var __ML_wrong_time_message = "Start time must be smaller than end time";

var __ML_adsl_user_name_text = "username@ispnetwork";
var __ML_adsl_user_name_text_smile = "newuser@smileadsl.net";
var __ML_adsl_user_name_text2 = "username";
var __ML_adsl_user_name_text_ttnet = "username@ttnet";
var __ML_adsl_user_name_text_ttnet_pppoe = "ttnetpppoe@ttnet";
var __ML_adsl_user_name_text_fibernet = "pppoe@fibernet";

var __ML_InvalidSubnetMask = "Invalid network mask.";

var __ML_new_password_success = "Password changed successfully.\nPlease keep a record of your new password!";

var __ML_at_least_one_item_must_be_chosen = "At least one item must be chosen.";

var __ML_adsl_username_regex_format = "'username@network'";
var __ML_adsl_username_regex_format_ttnet = "'username@ttnet'";
var __ML_adsl_username_regex_format_twain = "'username@'";
var __ML_adsl_username_regex_format_ttnet_meb = "'username@ttnet'";
var __ML_adsl_username_defaults_ttnet_meb = "username@ttnet";
var __ML_adsl_username_validate_warning_ttnet_meb = "Please check the Servis name you entered! You can find it in the document gave after your subscription, see it after @ in DSL username text  part.";
var __ML_adsl_username_validate_warning_ttnet_lowercase = "Please enter small characters.";

var __ML_nat_mac_address_is_empty = "MAC address of the client is empty!";
var __ML_nat_invalid_mac_address = "Invalid MAC address!";
var __ML_nat_invalid_ip_address = "Invalid IP address!";
var __ML_nat_you_have_not_selected_any_rule = "You have not selected any rule!";
var __ML_nat_rule_is_already_on_your_list = "Rule is already on your list";
var __ML_max_10_ports = "(max. 10 ports)";
var __ML_no_defect = "No defect";
var __ML_defect = "Defect";
var __ML_unknown = "Unknown";

var __ML_usb_mac="USB MAC Address";
var __ML_ddns_status_0 = "";
var __ML_ddns_status_1 = "Success";
var __ML_ddns_status_2 = "Success(No Change)";
var __ML_ddns_status_3 = "Unknown Error";
var __ML_ddns_status_4 = "Authentication Error";
var __ML_ddns_status_101 = "Invalid Service Parameter";
var __ML_ddns_status_102 = "Agent Blocked";
var __ML_ddns_status_103 = "Invalid Username/Password";
var __ML_ddns_status_104 = "Paid Service";
var __ML_ddns_status_105 = "Invalid Hostname";
var __ML_ddns_status_106 = "Hostname Doesn't Exist";
var __ML_ddns_status_107 = "Not Your Hostname";
var __ML_ddns_status_108 = "Unknown Error";
var __ML_ddns_status_109 = "Shutdown due to misuse/abuse";
var __ML_ddns_status_110 = "DynDNS Error";
var __ML_ddns_status_201 = "Invalid Hostname";
var __ML_ddns_status_202 = "Invalid Passwrod";
var __ML_ddns_status_203 = "Invalid Username";

var __ML_restricted_client_list_is_required = "Client list cannot be left empty. Please select a client to apply this rule.";

//QoS Pages
var __ML_qos = "QoS";
var __ML_qos_settings = "QoS (Quality of Service) Settings";
var __ML_qos_info = "QoS allows to classify and shape the IP traffic.";
var __ML_enable_qos = "QoS Enabled";
var __ML_disable_qos = "QoS Disabled";
var __ML_traffic_mapping = "Traffic Mapping";
var __ML_traffic_classification = "Traffic Classification";
var __ML_traffic_shaping = "Traffic Shaping";
var __ML_traffic_classification_info = "In this page, you can define a QoS Rule";
var __ML_traffic_shaping_info = "In this page, you can limit the bandwidth of each class of services.";
var __ML_traffic_mapping_info = "QoS utility at AirTies allows you to classify the incoming traffic and route it to selected service class according to required service quality. By the help of this page, you can describe the interested traffic and add it to the desired service class. CoS field determines the service class to which the described traffic will be assigned.";
var __ML_qos_source_interface = "Source Interface";
var __ML_qos_dest_interface = "Destination Interface";
var __ML_source = "Source";
var __ML_dest = "Destination";
var __ML_qos_ip_address = "IP Address";
var __ML_qos_ip_address_range = "IP Address Range";
var __ML_qos_mac_address = "MAC Address";
var __ML_port = "Port";
var __ML_port_range = "Port Range";
var __ML_qos_protocol = "Protocol";
var __ML_dscp_tos = "DSCP/TOS";
var __ML_qos_rule = "Rule";
var __ML_qos_cos = "CoS";
var __ML_configuration = "Configuration";
var __ML_qos_all = "ALL";
var __ML_qos_traffic_direction = "Direction of Traffic";
var __ML_qos_shaping_alg = "Shaping Algorithm";
var __ML_qos_total_max_bw = "Total Maximum Bandwidth (Kbps)";
var __ML_qos_cos_long = "Class of Service";
var __ML_qos_max_guaranteed_bw = "Maximum Guaranteed Bandwidth (%)";
var __ML_qos_min_guaranteed_bw = "Minimum Guaranteed Bandwidth (%)";
var __ML_qos_traffic_downstream = "Downstream";
var __ML_qos_shaping_htb = "HTB";
var __ML_qos_rule_mismatch = "This rule was selected for this source and destination interfaces previously.";
var __ML_qos_no_rule = "There is no rule. Please create one.";
var __ML_qos_no_rule_exist = "Please add a rule!";

var __ML_wireless_network = "Wireless Connections";
var __ML_wireless_status_intro = "You can view all wireless clients connected to your device on this page.";
var __ML_wireless_choose_ssid = "Choose a SSID to see the connected devices";
var __ML_wireless_signal_level = "Signal Level";
var __ML_wireless_rate = "Rate";
var __ML_blocked_wireless_clients = "Blocked Wireless Clients";
var __ML_no_wireless_client_connected = "No Wireless client connected";
var __ML_wireless_block = "Block";

var __ML_write_mac_address_format="Write MAC address in 00:23:45:67:89:AB format.";
var __ML_wireless_network_settings = "Wireless Settings";
var __ML_wireless_network_enabled_label = "Enable AP:";
var __ML_wireless_channel_label = "Channel:";
var __ML_wireless_rate_label = "Rate:";
var __ML_wireless_mode_label = "Mode:";
var __ML_wireless_output_power_label = "Output Power:";
var __ML_wireless_disabled = "Disabled";
var __ML_wireless_network_name = "Primary SSID";
var __ML_wireless_hide_ssid = "Hidden SSID";
var __ML_wireless_hidden = "hidden";
var __ML_wireless_vlan_id = "VLAN ID:";
var __ML_wireless_security_label = "Wireless Security";
var __ML_wireless_security_header = "Wireless Security";
var __ML_wireless_ssid1 = "SSID 1 (Main Network):";
var __ML_wireless_operation_mode = "Operation Mode";
var __ML_wireless_operation_mode_selection = "Operation Mode Selection";
var __ML_wireless_operation_mode_intro = "You can choose the operation mode of this device on this page. ";
var __ML_wireless_operation_mode_label = "Operation Mode:";
var __ML_access_point = "Access Point";
var __ML_wireless_mesh_settings = "Mesh Settings";
var __ML_wireless_mesh_settings_intro = "AirTies Mesh Networks Technology overcomes signal attenuation and service area limitation problems that may arise in multiple-storey or reinforced concrete buildings. Mesh enables you to widen your service area with AirTies access point/repeater devices without any need for cables. To create a Mesh, click 'Search AP' button. Your modem is going to begin looking for reachable access points.";
var __ML_wireless_mesh_connections_enabled_label = "Enable bridge/repeater connections :";
var __ML_wireless_mesh_max_wds_warning = "You can add maximum @max_wds_count@ MAC Addresses.";
var __ML_search_ap = "Search AP";
var __ML_status = "Status";
var __ML_wireless_connections_will_be_disconnected_for_a_while = "Connections will be disconnected for a while. Please wait...";
var __ML_wireless_mesh_connections = "Mesh Connections";
var __ML_wireless_add_connection_label = "Add Connection:";
var __ML_wireless_neighbouring_ap_list = "Neighbouring AP List";
var __ML_wireless_bssid_mac_address = "BSSID(MAC Address)";
var __ML_channel = "Channel";
var __ML_mode = "Mode";
var __ML_security = "Security";
var __ML_wireless_choose_ssid_to_apply_security = "Choose SSID to apply security ";
var __ML_wireless_security_mode_no_encryption = "No Encryption";
var __ML_wireless_security_type = "Security Type";
var __ML_wireless_security_info = "WEP is the most basic wireless security standard that can be used to provide secure data transmission. <br />In order to use WEP security, the same key should be configured on both ends of the wireless connection.";
var __ML_authentication_mode = "Authentication Mode";
var __ML_open = "Open";
var __ML_shared = "Shared";
var __ML_both = "WPA+WPA2";
var __ML_wep_security_type = "WEP Security Type";
var __ML_wep_security_type_64_bit_hex = "64 Bit(HEX): 10 Characters";
var __ML_wep_security_type_64_bit_ascii = "64 Bit(ASCII): 5 Characters";
var __ML_wep_security_type_128_bit_hex = "128 Bit(HEX): 26 Characters";
var __ML_wep_security_type_128_bit_ascii = "128 Bit(ASCII): 13 Characters";
var __ML_wep_security_type_256_bit_hex = "256 Bit(HEX): 58 Charecters";
var __ML_wep_security_type_256_bit_ascii = "256 Bit(ascii): 24 Charecters";
var __ML_wireless_access_control_intro = "If you want to restrict access to the wireless network you can use this feature.<br />Only allowed clients that are configured below can connect to wireless network if access control is enabled.<br />MAC address must be in 00:23:45:67:89:AB format.";
var __ML_please_choose_a_SSID = "Please choose a SSID";
var __ML_access_control_enabled = "Access Control Enabled";
var __ML_allowed_client_list = "Allowed Client List";
var __ML_blocked_client_list = "Blocked Client List";
var __ML_wireless_client_list = "Client List";

var __ML_connected_clients = "Connected Clients";
var __ML_no_client_connected = "No client connected.";
var __ML_active_key = "Active Key";
var __ML_choose = "Choose";
var __ML_key = "Key";
var __ML_characters = "characters";
var __ML_any_character = "any character";
var __ML_passphrase = "Password";
var __ML_rekey_intval = "Group rekey interval(s)";
var __ML_server_address = "Server Address";
var __ML_server_port = "Server Port";
var __ML_secret = "Secret";
var __ML_block = "Block";
var __ML_mac_address_lower_case = "MAC Address";
var __ML_wireless_settings_wpa_description = "WPA is a very secure protocol. On WPA encryption, the encyption key is refreshed periodically  and therefore it is very difficult to break. Enter a password from 8 up to 63 characters, and then click Save. You have to also enter this password on the wireless clients that will connect to the access point.<br/><br/>If you are interested in using Enterprise WPA (802.1x) authentication, visit our web site http://www.airties.com for more information.";
var __ML_wpa_personal_psk = "WPA/TKIP - Personal(PSK)";
var __ML_wpa_enterprise_802_1x = "WPA/TKIP - Enterprise(802.1X)";
var __ML_wpa2_personal_psk = "WPA2/AES - Personal(PSK)";
var __ML_wpa2_enterprise_802_1x = "WPA2/AES - Enterprise(802.1X)";
var __ML_preauth = "Preauth";
var __ML_wireless_security_info = "Enter at least one password for WEP encryption. Password length should be selected on Encryption Type. HEX type passwords should consist of hexadecimal characters (digits 0 through 9, a, b, c, d, e, f). The encryption supports two authentication modes: open and shared. It is recommended that you use open mode. You can enter up to 4 passwords and select any one of them. You must also enter this password on the wireless clients that will connect to your access point.";

var __ML_not_mesh_connection = "should not use WPA security for MESH";
var __ML_wrong_sec_mode_channel = "AP security and channel settings are different from first SSID settings, should be change this settings in wireless security page";

var __ML_wireless_security_no_encryption = "Wireless security is not required for the access point to operate and is Off by default. If you do not want unauthorized users to connect to your access point or eavesdrop on your wireless communications, it is recommended that you use one of WEP (Wired Equivalent Privacy) or WPA (WiFi Protected Access) wireless security protocols that encrypt your wireless communications. Your device supports both encryption standards. WPA is the most secure protocol and is very hard to break. All AirTies products and any wireless client that support 802.11g protocol also support WPA. If some of the wireless clients in your wireless network do not support WPA, then you should use the less secure WEP protocol.";
var __ML_wireless_network_status = "Wireless Network Status";
var __ML_allow = "Just Allow MAC Addresses in MAC List";
var __ML_deny = "Just Deny MAC Addresses in MAC List";
var __ML_delete_all = "Delete All";
var __ML_wrong_mac_address_format = "Wrong Mac Address.";
var __ML_mac_already_exists = "Mac Address already exists.";
var __ML_browse = "Browse";
var __ML_wireless_mesh_list = "MESH List";

var __ML_please_wait_for_process = "Searching APs. Please wait...";

var __ML_signal_excellent = "Excellent";
var __ML_signal_good = "Good";
var __ML_signal_average = "Average";
var __ML_signal_poor = "Poor";

var __ML_invalid_mac_address = "Invalid MAC Address, do not use these formats ['FF:FF:FF:FF:FF:FF','00:00:00:00:00:00','01:*']";
var __ML_mesh_status = "Status";
var __ML_mesh_already_mac = "This MAC address is already in MAC list";
var __ML_max_mac_count = "not add MAC in MAC List";
var __ML_max = "Max.";
var __ML_mac = "MAC";

var __ML_wireless_not_enabled = "Disabled Wireless";
var __ML_add = "Add";
var __ML_connected_clients = "Connected Clients";
var __ML_ssid_security = "SECURITY";
var __ML_ssid_status = "STATUS";
var __ML_ssid_active = "Activated";
var __ML_ssid_passive = "Deactivated";

//VOIP - status.html
var __ML_voip_status_caption = "SIP Status";
var __ML_voip_provisioning_status = "Provisioning Status";
var __ML_voip_user_name_smile = "User Code";
//"User Name";
var __ML_voip_user_name = "Number";
//"User Name";
var __ML_voip_phone_number = "User Code";
//"Phone Number: ";
var __ML_voip_server_name = "Server Name";
var __ML_server_ip = "Server IP";
var __ML_voip_server_port = "Server Port";
var __ML_voip_ADSL_phone_number = "Entered DSL phone number value is incorrect.";
var __ML_re_register = "Re-Register";
var __ML_re_register_confirm = "Register is in progress. It can take awhile. Use link on the page to update status.";
var __ML_re_register_refresh = "Click Here To Refresh";
var __ML_voip_error_1 = "Transport Error";
var __ML_voip_error_2 = "Invalid Address/Hostname";
var __ML_voip_error_300 = "Multiple Choices";
var __ML_voip_error_301 = "Moved Permanently";
var __ML_voip_error_302 = "Moved Temporarily";
var __ML_voip_error_305 = "Use Proxy";
var __ML_voip_error_380 = "Alternative Service";
var __ML_voip_error_400 = "BadRequest";
var __ML_voip_error_401 = "Unauthorised";
var __ML_voip_error_402 = "Payment Required";
var __ML_voip_error_403 = "Forbidden";
var __ML_voip_error_404 = "Not Found";
var __ML_voip_error_405 = "Method Not Allowed";
var __ML_voip_error_406 = "Not Acceptable";
var __ML_voip_error_407 = "Proxy Authentication Required";
var __ML_voip_error_408 = "Request Timeout";
var __ML_voip_error_409 = "Conflict";
var __ML_voip_error_410 = "Gone";
var __ML_voip_error_411 = "Length Required";
var __ML_voip_error_413 = "Request Entity Too Large";
var __ML_voip_error_414 = "Request URI Too Long";
var __ML_voip_error_415 = "Unsupported Media Type";
var __ML_voip_error_416 = "Unsupported URI Scheme";
var __ML_voip_error_420 = "Bad Extension";
var __ML_voip_error_421 = "Extension Required";
var __ML_voip_error_423 = "Interval Too Brief";
var __ML_voip_error_480 = "Temporarily Unavailable";
var __ML_voip_error_481 = "Call Leg/Transaction Does Not Exist";
var __ML_voip_error_482 = "Loop Detected";
var __ML_voip_error_483 = "Too Many Hops";
var __ML_voip_error_484 = "Address Incomplete";
var __ML_voip_error_485 = "Ambiguous";
var __ML_voip_error_486 = "Busy Here";
var __ML_voip_error_487 = "Request Terminated";
var __ML_voip_error_488 = "Not Acceptable Here";
var __ML_voip_error_489 = "Bad Event";
var __ML_voip_error_491 = "Request Pending";
var __ML_voip_error_493 = "Undecipherable";
var __ML_voip_error_500 = "Internal Server Error";
var __ML_voip_error_501 = "Not Implemented";
var __ML_voip_error_502 = "Bad Gateway";
var __ML_voip_error_503 = "Service Unavailable";
var __ML_voip_error_504 = "Server Time-out";
var __ML_voip_error_505 = "SIP Version Not Supported";
var __ML_voip_error_513 = "Message Too Large";
var __ML_voip_error_600 = "Busy Everywhere";
var __ML_voip_error_603 = "Decline";
var __ML_voip_error_604 = "Does Not Exist Anywhere";
var __ML_voip_error_606 = "Not Acceptable";

//setting.html
var __ML_voip_caption = "Settings";
var __ML_voip_info = "Telephony Application allows you to use telephony features over ip.";
var __ML_voip_enabled = "Voip Enabled";
var __ML_voip_disabled = "Voip Disabled";
var __ML_wireless_status = "wireless network is disabled! must be enabled from 'WIRELESS' page for wireless network";
var __ML_frequency = "Frequency :";
var __ML_freq_mode_caption = "Mode :";
var __ML_freq_channel_caption = "Channel :";
var __ML_freq_power_caption = "Power :";
var __ML_ssid_user_isolation = "User Isolation";
var __ML_ssid_vlanid = "VLAN ID";
var __ML_encryption = "Security";
var __ML_bandwith = "Bandwidth :";
var __ML_rates_caption = "Rate(Mb/s) :";
var __ML_touch_caption = __DEF_airtouch_text + " :";

var __ML_invalid_wpa_key = "Not use Turkish character or SpaceBar!";
var __ML_voip_advanced_settings_VOIPFailOver = "VoIP Fallback";
var __ML_voip_advanced_settings_PSTNFailOver = "PSTN Fallback";
var __ML_voip_advanced_settings_EchoCancellationEnable = "Echo Cancellation";
var __ML_voip_PSTN_Line_Status = "PSTN Line Status";
var __ML_voip_setting_warning = "NOTE: Below settings will be used for all telephone ports and VOIP lines.";
var __ML_voip_setting_description = "PSTN fallback and VoIP fallback features can be activated / deactivated on this menu";
var __ML_voip_setting_description_hidden = "Your calls will be routed via PSTN when there is an DSL or SIP account registration problem if the PSTN fallback option is selected (an active and working PSTN line is required to be plugged into the Line port of your IAD). The same applies for the VoIP fallback. If there is a problem on the PSTN line when the call is supposed to be routed via PSTN according to the dial plan, the IAD will route the call via VoIP when the VoIP fallback feature is activated.";

//dialplan.html
var __ML_voip_dialplan_caption = "Dial Plan";
var __ML_voip_dialplan_intro = "The dial plan installed on your device is shown on this menu.";
var __ML_voip_min_number__digit = "Minimum Prefix";
var __ML_voip_max_number__digit = "Maximum Prefix";
var __ML_voip_number__digit = "Number of Digits";
var __ML_voip_route = "Route";
var __ML_voip_number_digit_remove = "Number of Digits to Remove";
var __ML_voip_digit_add_prefix = "Digit add to Prefix";
var __ML_voip_prefix_range = "Prefix Range";
var __ML_voip_route_pstn = "PSTN";
var __ML_voip_route_voip = "VOIP";

//speeddial.html
var __ML_voip_sdialplan_caption = "SpeedDial";
var __ML_wireless_network_enabled = "Wireless Network Activated";
var __ML_eap_reauth_period = "EAP Reauth Period";
var __ML_wpa_auth_type = "Authentication Type";
var __ML_wpa_encryption_type = "Encryption Type";
var __ML_personal = "Personal";
var __ML_enterprise = "Enterprise";
var __ML_radius_server_ip_address = "Radius Server Ip Address";
var __ML_url_filters = "URL Filters";
var __ML_auto = "Auto";

//account_settings.html
var __ML_voip_account_settings = "Account Settings";
var __ML_voip_account = "VOIP Account";
var __ML_sip_proxy_address = "SIP Proxy Address";
var __ML_voip_account_port = "Port";
// var __ML_voip_account_username = "smiletalk Number";  //"User Name";
var __ML_voip_user_name_smile = "User Code ";
//"User Name";
var __ML_voip_user_name = "VoIP Phone Number ";
//"User Name";
var __ML_voip_account_password_smile = "Pin Code";
//"Password";
var __ML_voip_account_password = "Password";
//"Password";
var __ML_voip_account_auth_id_smile = "User Code(Again)";
var __ML_voip_account_auth_id = "User Name (Auth. ID)";
var __ML_voip_adsl_phone_number = "DSL Phone Number";
var __ML_adsl_phone_number_statement = "Please enter your DSL telephone number with a leading '0' as 11 digits. i.e. 02163186200. Also you can use # and * characters.";
var __ML_voip_account_settings_ProxyServer = "ProxyServer";
var __ML_voip_account_settings_ProxyServerPort = "ProxyServerPort";
var __ML_voip_account_settings_RegistrarServer = "RegistrarServer";
var __ML_voip_account_settings_RegistrarServerPort = "RegistrarServerPort";
var __ML_voip_account_settings_UserAgentDomain = "UserAgentDomain";
var __ML_voip_account_settings_UserAgentPort = "UserAgentPort";
var __ML_voip_account_settings_OutboundProxy = "OutboundProxy";
var __ML_voip_account_settings_OutboundProxyPort = "OutboundProxyPort";
var __ML_voip_account_settings_RegistrationPeriod = "RegistrationPeriod";
var __ML_voip_account_settings_RegisterRetryInterval = "RegisterRetryInterval";
var  __ML_voip_account_settings_InviteExpires = "InviteExpires";
var __ML_voip_account_settings_server = "ProxyServer";
var __ML_voip_speed_dial = "Speed Dial";

//internet/status.html
var __ML_link_type = "Link Type";
var __ML_line_mode = "Line Mode";
var __ML_internet_wan_status_statistics = "Internet (WAN) Status";
var __ML_advance_setup = "Advanced Setup";
var __ML_ethernet = "Ethernet";
var __ML_dsl = "DSL";

var __ML_link_type_eth = "Link type is Ethernet.";
var __ML_link_type_dsl = "Link type is DSL.";
var __ML_pptp_ip_assigment = "IP Assignment";
var __ML_pptp_static = "Static";

//acl_settings.html
var __ML_wireless_access_control_info = "Through this page you can determine which clients can access your wireless network and block unwanted clients. First enable this feature by selecting 'Enable MAC Filtering'. In order to create a list of blocked clients, select 'Only Block MAC Addresses in the List' checkbox. You can enter the MAC addresses of clients to be blocked either through the 'New MAC Adress' textbox or directly from the 'Existing LAN Clients' list. MAC Addresses should be entered in the '00:23:45:67:89:23' format. Finally save your settings by clicking on 'Save'.";
var __ML_wireless_access_control_info2 = "If you would like to create a list of only those clients that are allowed to the access the wireless network, make your entries with 'Only Allow MAC Addresses in the List' selected.";
var __ML_invalidSSID = " SSID is invalid! \n\n SSID format must be such as eg:['airties_wireless_life','AIRTIES_WIRELESS_LIFE','airties123','AIRTIES123']";
var __ML_invalidSSIDMaxLength = "Invalid SSID Length [1-32]";
var __ML_enable_mac_filter = "MAC filtering must be enabled!";

//internet
var __ML_internet_wan_setup = "Internet (WAN) Setup";
var __ML_vlan_name = "VLAN Name";
var __ML_internet_settings = "Internet Settings";
var __ML_igmp_settings = "IGMP Settings";
var __ML_igmp_intro = "To receive IGMP packets, your device should be in \"Router\" mode and the network interfaces that you plan to use must have IP addresses assigned to them.<br/><br/>If the \"Quick Leave\" option is enabled, the termination of membership to  the IGMP multicast group which you no longer want to be a part of  will be immediate. Enabling the \"Quick Leave\" option will increase the quality of IGMP broadcast.<br/><br/>The network interface that is defined as \"upstream\"  is the WAN interface through which your router receives IGMP packets. There should be at least one interface defined as \"upstream\".<br/><br/>The \"netbit\" value for the \"Allowed IP Block\" must be an integer between 1 and 32.<br/><br/>\"Rate Limit\" is used to control the rate of traffic on a network interface by setting a limit in KBits/s. \"Rate Limit\" value must be an integer between 0 and 32727.<br/><br/>\"TTL\" value is the number of hops between the network device that receives the IGMP multicast and the clients. In other words, it shows how many hops it will take for the IGMP packets to reach the clients. TTL value must be an integer between 1-255.<br/><br/>\"The downstream\" option allows you to configure settings for the local network that the clients which will receive IGMP packets are connected to.  The clients must obtain an IP address from the interface that is designated as downstream. There must be at least one interface defined as \"downstream\".";

var __ML_vlan_status_caption = "VLAN Status";

var __ML_vlan_name = "VLAN Name";
var __ML_vlan_id = "VLANID";
var __ML_vlan_members = "Members";

var __ML_vlan_configuration = "VLAN Configuration";

var __ML_vlan_id = "Vlan Id";

var __ML_reboot_confirm_message = "The device will be restarted.\nWould you like to continue with the operation?";
var __ML_factory_defaults_confirm_message = "Taking the device's configuration to factory defaults will cause it to restart.\nWould you like to continue with the operation?";

var __ML_port_information = "Port Information";
var __ML_enable_port_forwarding = "Enable Port Forwarding";
var __ML_disable_port_forwarding = "Disable Port Forwarding";

var __ML_upnp = "<acronym>UPnP</acronym>";
var __ML_upnp_settings = "<acronym>UPnP Settings</acronym>";

var __ML_upnp_status_intro = "(Universal Plug&Play) allows devices to connect easily and to simplify the implementation of networks. These network devices should support UPNP Protocol. Services in your local network uses UPNP protocol so it should be enabled.";
var __ML_upnp_intro = "Universal Plug&Play is a protocol that allows devices on the network to interoperate with each other automatically. To benefit from UPnP, devices on your network must support the UPnP protocol.";
var __ML_upnp_settings_intro = "Universal Plug&Play is a protocol that allows devices on the network to interoperate with each other automatically. Port Forwarding can be done through UPnP protocol. You can use this page to enable this feature. Click the “Flush Rules” button to clear the list of generated application ports.";
var __ML_enable_upnp = "Enable UPNP";
var __ML_disable_upnp = "Disable UPNP";
var __ML_upnp_status_caption = "<acronym>UPnP</acronym>";
var __ML_upnp_settings_caption = "<acronym>UPnP Settings</acronym>";
var __ML_flush_rules = "Flush Rules";

var __ML_annex_type = "Annex Type";
var __ML_internet_vlan_parameters = "VLAN Parameters";
var __ML_advanced = "Advanced";
var __ML_add_interface_to = "Add Interface to";
var __ML_wan_port = "WAN Port";
var __ML_vlan_settings = "VLAN Settings";
var __ML_vlan1_caption = "On this page, you can adjust the settings of your modem for its WAN connection over Ethernet. After entering the VLAN name and the protocol type, you can adust the settings of the chosen protocol.";
var __ML_internet_dns_intro = "On this page, you can adjust your modem’s DNS settings. You can use the DNS IP addresses as assigned by your service provider or you can set these addresses according to  your preferences.";
var __ML_error_bigger_than = '%name% named field not be bigger than %value%';
//don't translate %name% and %value%
var __ML_error_less_than = '%name% named field not be less than %value%';
//don't translate %name% and %value%
var __ML_voip_provision_status_0 = "Not provisioned";
var __ML_voip_provision_status_1 = "Registration failed";
var __ML_voip_provision_status_2 = "Registration time out";
var __ML_voip_provision_status_3 = "Registration success";
var __ML_voip_provision_status_5 = "Registration in Progress";
var __ML_ssid = "SSID";
var __ML_mesh_wpa_warning = "An activated mesh link cannot be set while WPA is enabled. Please modify the security settings prior to enabling a mesh link.";
var __ML_security_wpa_mesh_warning = "WPA cannot be selected when there is an activated mesh link. Please disable activated mesh links before enabling WPA.";

var __ML_mac_client_list_empty = "Client list is empty";
var __ML_router_ap_selection = "OPERATION MODE";
var __ML_router_ap = "Operation Mode";
var __ML_router_ap_selection_intro = "You can configure your device as Access Point or as Router using below settings. In Access Point mode, your device will automatically obtain an IP from LAN.";
var __ML_router_ap_selection_router_select_message = "You will lose connection with the device as its IP address will change. The new IP address will be %newip%";
//dont translate %newip%
var __ML_router_ap_selection_ap_select_message = "Your device will automatically obtain an IP address from LAN and you will lose your connection to it. Please check your IP address at your DHCP server  .";
var __ML_router_ap_selection_intro = "You can use your device in either Access Point or Router modes.<br/><br/>In Access Point mode, routing, firewall and NAT will be disabled. In this mode, connect your device to your gateway (modem, etc) from one of its LAN ports. In Access Point mode your device will obtain an IP address to its LAN ports as DHCP client. In the absence of a DHCP server, it will take acquire static IP address, 192.168.2.254.<br/><br/>In Router mode, firewall and NAT will be enabled. In this mode please make sure your device is connected to a gateway through its WAN port. In Router mode the LAN ports and the wireless interface will act as DHCP server. Default IP address will be " + __DEF_DefaultIpAddress + ".";
var __ML_new_altnet = "New Sub Network";
var __ML_altnet = "Sub Network";
var __ML_netbit = "Netbit";
var __ML_new_downstream = "New Downstream";
var __ML_downstream = "Downstream";
var __ML_ratelimit = "Rate Limit";
var __ML_ratelimit_kb = "Rate Limit (kb)";
var __ML_threshold = "TTL";
var __ML_iface = "Interface";
var __ML_quick_leave = "Quick Leave";

var __ML_vlan_id = "VLAN Id";
var __ML_vlan_members = "Members";
var __ML_vlan_member_ports = "Member Ports";
var __ML_vlan_status_intro = "On this screen, you can see the list of VLANs that you’ve created on your device.";
var __ML_vlan_configuration_intro = "Enter a \"<b>VLAN Name</b>\" (e.g. Accounting, Marketing, etc.) and a \"<b>VLANID</b>\" (e.g. 100, 102, 200, etc..) for the VLAN you would like to setup. Select the ports that will be members of the VLAN from the \"<b>Selectable Ports</b>\" list and use the \"<b>>></b>\" button to add them to the \"<b>Member Ports</b>\" list. To delete a port from the list, select it and click \"<b><<</b>\". Click \"<b>Save</b>\" to store the settings.";
var __ML_vlan_configuration = "VLAN Configuration";
var __ML_vlan_selectable_ports = "Selectable ports";
var __ML_idle = "Idle";
var __ML_vlan_config_used_vlan_warning = "The VLAN you are trying to delete is in use. Please make sure that the VLAN you would like to delete is removed from the LAN and DHCP Settings page under the LAN menu, before you delete it on the VLAN settings page.";

var __ML_second_short = "sec.";
var __ML_ondemand = "On Demand";

var __ML_wan_to_vlan_menu_entry = "WAN to VLAN Mapping";
var __ML_wan_to_vlan_table_title = "WAN to VLAN Mapping";
var __ML_wan_to_vlan_mapping_info = "";
var __ML_wan_to_vlan_mapping_name = "Mapping Name";
var __ML_wan_to_vlan_mapping_members = "Mapping Members";
var __ML_wan_to_vlan_mapping_type = "Mapping Type";
var __ML_wan_to_vlan_new_mapping_button = "New Mapping";
var __ML_wlan_to_vlan_new_button = "New Mapping";
var __ML_wan_to_vlan_routed = "Routed";
var __ML_wan_to_vlan_bridged = "Bridged";
var __ML_wan_to_vlan_wan = "WAN";
var __ML_wan_to_vlan_lan = "LAN";
var __ML_wan_to_vlan_setup_table_title = "WAN to VLAN Mapping Setup";
var __ML_wan_to_vlan_mapping_setup_info = "";
var __ML_wan_to_vlan_mapping_setup_info = "";
var __ML_wan_to_vlan_setup_table_title = "WAN to VLAN Mapping Setup";

var __ML_dhcps_enabled = "Enabled";
var __ML_dhcps_disabled = "Disabled";

var __ML_igmp_disabled = "Disabled";
var __ML_igmp_enabled = "Enabled";
var __ML_wireless_disabled = "Disabled";
var __ML_wireless_enabled = "Enabled";

var __ML_igmp_downstream_choise_interface = "";
var __ML_igmp_upstream_choise_interface = "";

var __ML_igmp_downstream_error_interface = "%name% için bir interface seçmelisiniz.";
// %name% -> downstream-1, downstream-2,...
var __ML_igmp_upstream_error_interface = "upstream için bir interface seçmelisiniz.";

var __ML_vlan_configuration_info = "On this \"VLAN Configuration\" screen, you can add a new VLAN definition using the \"New VLAN\" button, edit settings of an existing VLAN by clicking on the \"Edit\" button, or delete an existing VLAN with the \"Delete\" button. Click \"Save\" to store the settings.";
var __ML_new_vlan = "New VLAN";
var __ML_vlan_port_settings = "Port Configuration";
var __ML_vlan_port = "Port";
var __ML_vlan_port_name = "Port Name";
var __ML_vlan_table_title_pvid ="PVID";
var __ML_vlan_port_priority = "Port Priority";
var __ML_vlan_port_tagging = "Tagging";

var __ML_vlan_port_untag_all = "Untag all";
var __ML_vlan_port_tag_all = "Tag all";
var __ML_vlan_filter_untagged_frames = "Filter Untagged<br/>Frames";
var __ML_vlan_filter_unregistered_frames = "Filter Unregistered<br/>Frames";
var __ML_vlan_port_config_info = "With Port Configuration, you can configure Tag-based (IEEE 802.1Q) settings on your VLANs. Using tagging, you can decide on how the packets will be transferred based on port. This brings the flexibility of configuring VLANs that are appropriate for the applications you use.";

var __ML_wan_to_vlan_empty_name = __ML_wan_to_vlan_mapping_name + " can not be empty.";

var __ML_lan = "LAN";
var __ML_adsl = "DSL";
var __ML_voip_speeddial = "Speed Dial";
var __ML_wan_to_vlan_empty_vlan_list = "You can not blank LAN list";
var __ML_voip_setting = "VoIP Settings";
var __ML_voip = "VoIP";

/* ############################# */
var __ML_lan_ip_dhcp_settings_caption = "<acronym>IP</acronym> and <acronym>DHCP</acronym> Settings";
var __ML_lan_ip_dhcp_settings_intro = "";
var __ML_lan_ip_dhcp_settings_local_ip_configuration = "Local IP Configuration";
var __ML_lan_ip_dhcp_settings_ip_address = "IP Address";
var __ML_lan_ip_dhcp_settings_netmask = "Netmask";
var __ML_lan_ip_dhcp_settings_dhcp_server_name = "DHCP Server Name";
var __ML_lan_ip_dhcp_settings_dhcp = "DHCP";
var __ML_lan_ip_dhcp_settings_member_vlans = "Member VLANs";
var __ML_lan_ip_dhcp_settings_new_dhcp_server = "New DHCP Server";
var __ML_lan_dhcp_setup_caption = "DHCP Settings";
var __ML_lan_dhcp_setup_intro = "";
var __ML_lan_dhcp_setup_dhcp_type = "DHCP Type";
var __ML_lan_dhcp_setup_off = "Off";
var __ML_lan_dhcp_setup_dhcp_server = "DHCP Server";
var __ML_lan_dhcp_setup_dhcp_relay_agent = "DHCP Relay Agent";
var __ML_lan_dhcp_setup_dhcp_server_configuration = "DHCP Server Configuration";
var __ML_lan_dhcp_setup_dhcp_server_name = "DHCP Server Name";
var __ML_lan_dhcp_setup_start_ip_address = "Start IP Address";
var __ML_lan_dhcp_setup_end_ip_address = "End IP Address";
var __ML_lan_dhcp_setup_lease_time = "Lease Time (sec)";
var __ML_lan_dhcp_setup_dns_one = "DNS Address";
var __ML_lan_dhcprelay_server_address = "DHCP Server Address";
var __ML_lan_dhcp_setup_gw_address = "Gateway Address";
var __ML_lan_dhcp_setup_broadcast_interface = "Broadcast Address";
var __ML_lan_dhcprelay_name = "DHCP Server Name";
var __ML_lan_dhcprelay_wan_interfaces = "Wan interface";
var __ML_lan_dhcprelay_vlan_interfaces = "Broadcast Address";
var __ML_lan_dhcp_setup_dhcprelay_configuration ="DHCP Relay configuration";
var __ML_lan_dhcprelay_setup_dhcp_server_name  = "DHCP Server name";
var __ML_lan_dhcp_setup_client_configuration = "DHCP Client configuration";
var __ML_lan_dhcp_setup_dhcp_client_agent = "DHCP Client";
var __ML_lan_dhcpclient_vlan_interfaces = "Listening interface";
var __ML_lan_ip_dhcp_client_ip_address = "IP address";
var __ML_lan_ip_dhcp_client_netmask = "Netmask";
var __ML_lan_off_vlan_interface = "Broadcast Address";
var __ML_lan_dhcp_setup_addresses_control1 = "The Subnet mask you entered is not suitable.";
var __ML_lan_dhcp_setup_addresses_control2 = "The “Start IP address” you entered is not in the network range.";
var __ML_lan_dhcp_setup_addresses_control3 = "The “End IP address” you entered is not in the network range.";
var __ML_lan_dhcp_setup_addresses_control4 = "The “Start and End IP addresses” are not in the same network.";
var __ML_lan_dhcp_setup_addresses_control5 = "“The Start IP address” you entered is the same as Network Subnet ID.";
var __ML_lan_dhcp_setup_addresses_control6 = "“The End IP address” you entered is the same as Network ID.";
var __ML_lan_dhcp_setup_addresses_control7 = "Device IP adress is in the network pool.";
var __ML_lan_dhcp_setup_addresses_control8 = "Device IP address is same as Network ID.";
var __ML_lan_dhcp_setup_addresses_control9 = "Device IP address is same as Broadcast address.";

var __ML_voip_incoming_call_routing_caption = "Caption for this page";
var __ML_voip_incoming_call_routing_intro = "You can adjust the incoming call routing and Phone port / account mapping settings on this menu.";
var __ML_voip_incoming_call_routing_intro2 = "Also, you can enable/disable the Phone ports on this menu.";
var __ML_voip_incoming_call_routing_table1 = "You can select which port to be ringed for incoming PSTN calls on the table below. ";
var __ML_voip_incoming_call_routing_table2 = "You can select which Phone port to use which account on the table below. ";

var __ML_voip_incoming_call_routing_fxo = "FXO";
var __ML_voip_incoming_call_routing_sip_account = "SIP Account";
var __ML_voip_incoming_call_routing_ = "";
var __ML_voip_incoming_call_routing_ = "";

var __ML_voip_transmit_gain = "Transmit Gain";
var __ML_voip_receive_gain = "Receive Gain";
var __ML_voip_account = "Account";
var __ML_voip_call_routing_settings = "Phone Port Settings";
var __ML_voip_advanced_settings = "Advanced Settings";
var __ML_voip_status_intro = "You can find the status of your VoIP accounts in the table below.";
//" To change settings you can go to \"Account Settings\" menu.";
var __ML_voip_accounts_intro = "Click on the \"Edit\" button of the appropriate VoIP account in order to setup the account details.";
var __ML_voip_account_settings_intro_smile = "Please enter smiletalk VoIP account information that you have obtained from your VoIP service provider on this page in order to use the VoIP feature.";
var __ML_voip_account_settings_intro_generic = "Please enter your VoIP account information that you have obtained from your service VoIP provider on this page in order to use the VoIP feature.";
var __ML_voip_pstn = "PSTN";
var __ML_voip_call_notification_tone = "Call Notification Tone";
var __ML_voip_call_notification_tone_description = "You can use the Call Notification Tone selection below in order to distinguish between the call types, VoIP or PSTN. When one of the call types is selected, you will hear the notification tone (double beep).";
var __ML_voip_account2 = "Account #";
var __ML_voip_none = "None";
var __ML_voip_pstn_table_header = "Incoming PSTN Call Routing";
var __ML_voip_line_table_header = "Account/Phone Port Mapping";
var __ML_voip_duplicate_mapping = "Only one account should be selected per phone port.";
var __ML_voip_advanced_settings_intro = "You can adjust the volume by adjusting the gain parameters on this page for VoIP and PSTN calls.";
var __ML_voip_should_be_select_port = "At least one of the Phone ports should be enabled in order to make calls.";
var __ML_voip_the_phone_port_must_be_enabled = "The Phone port must be enabled when there is incoming PSTN call routing defined on the port. The incoming PSTN call routing should be first removed on Phone %phoneId% in order to disable the port.";
//do not translate %phoneId%
var __ML_voip_route_voip = "VOIP";
var __ML_voip_route_pstn = "PSTN";

var __ML_voip_call_history_caption = "Call History";
var __ML_voip_call_history_intro1 = "IMPORTANT NOTE: ";
var __ML_voip_call_history_intro2 = "The call history data shown on this page is for reference only. Please consult you operator for exact figures for billing. The logs are only valid since the device is turned on. Turning off the device resets the log system.";
var __ML_voip_call_history_call_direction = "Call Direction";
var __ML_voip_call_history_call_direction_outgoing_calls = "Outgoing Calls";
var __ML_voip_call_history_call_direction_incoming_calls = "Incoming Calls";
var __ML_voip_call_history_call_direction_missed_calls = "Missed Calls";
var __ML_voip_call_history_call_direction_all_calls = "All Calls";
var __ML_voip_call_history_maximum_number_of_calls_to_show = "Maximum number of calls to show";
var __ML_voip_call_history_maximum_number_of_calls_to_show_all = "All";
var __ML_voip_call_history_time = "Time";
var __ML_voip_call_history_duration = "Duration";
var __ML_voip_call_history_call_type = "Call Type";
var __ML_voip_call_history_destination = "Destination";
var __ML_voip_call_history_caller_id = "Caller ID";
var __ML_voip_call_history_status = "Status";
var __ML_voip_call_history_total_duration = "Total Duration (For VoIP calls only)";

var __ML_voip_call_history_call_type_0 = "PSTN";
var __ML_voip_call_history_call_type_1 = "Account #1";
var __ML_voip_call_history_call_type_2 = "Account #2";

var __ML_voip_call_history_status_0 = "Connected";
var __ML_voip_call_history_status_1 = "Busy";
var __ML_voip_call_history_status_2 = "No answer";
var __ML_voip_call_history_status_3 = "Failed";
var __ML_voip_call_history_status_4 = "Missed: No Answer";
var __ML_voip_call_history_status_5 = "Missed: Busy";
var __ML_voip_call_history_status_6 = "-";
var __ML_voip_call_history_all = "All";
var __ML_call_type_to_be_displayed = "Call Type To Be Displayed";
var __ML_sort = "Sort";
var __ML_increase = "Increase";
var __ML_decrease = "Decrease";
var __ML_voip_call_history_outgoing_call = "Outgoing Call";
var __ML_voip_call_history_incoming_call = "Incoming Call";
var __ML_lan_dhcp_setup_duplicate_ip_address = "The IP address is already in use by another VLAN. Please, enter a different IP address.";
var __ML_voip_incoming_outgoing_call_settings_fxo_attention = "Attention! Once incoming PSTN call routing is disabled for both Phone Ports, you will NOT be able to receive incoming PSTN calls for the telephones connected your device.";
var __ML_voip_incoming_outgoing_call_settings_line_port_attention = "Warning! You will NOT be able to use the VoIP service if there is no active VoIP account for the Phone Ports.";
var __ML_voip_incoming_outgoing_call_settings_port_line_limitation = "Attention! Only one VoIP account can be defined for a single Phone Port.";
var __ML_voip_incoming_outgoing_call_settings_line_port_limitation = "Attention! Only one Phone Port can be defined for a single VoIP account .";
var __ML_voip_menu = "TELEPHONE";
var __ML_voip_callforward_active = "Activate Unconditional Callforwarding";
var __ML_voip_callforward_number = "Call Forward Number";
var __ML_remote_management_blank_password_warning = "Security Warning! Please make sure that user interface password of your device is set when Remote Management is active.";
var __ML_active = "Active";
var __ML_voip_callforward_active = "Activate Unconditional Callforwarding";
var __ML_voip_callforward_number = "Call Forward Number";

var __ML_qos_download_downstream_rate = "Download Speed";

var __ML_next = "Next";
var __ML_back = "Back";

var __ML_dsl_down_intro = "No DSL signal is detected. First check your router’s cable connections. If you find no problems with the cabling, then please contact your Internet Service Provider (ISP) and have your DSL line checked.";
var __ML_wan_down_intro = "No INTERNET connection is present. If your Connection settings are correct, please call your Internet Service Provider (ISP) for assistance.";
var __ML_auto_wan_down_intro = "There is no internet connection. Please check your modem cable connections (DSL/Telephone, WAN, Splitter)  If all connections are correct please call your internet service provider.";
var __ML_wireless_security_mode_no_encryption_warning = "Are you sure to leave your wireless network unsecure?";
var __ML_save_and_next = "Save and continue";
var __ML_saved_success = "Your settings saved";
var __ML_wizard_adsl_intro = "On this page, you can configure your DSL settings.";
var __ML_wizard_adsl_wireless_intro = "On this page, you can configure your DSL and WIRELESS settings.";
var __ML_wizard_adsl_username = "DSL Username";
var __ML_wizard_adsl_password = "DSL Password";
var __ML_wizard_adsl_protocol = "Protocol";
var __ML_wizard_wireless_ssid = "Wireless Network Name (SSID)";
var __ML_wizard_wireless_password = "Wireless Password";
var __ML_wizard_connection_information = "Connection Information";
var __ML_wizard_wireless_intro = "On this page, you can configure your WIRELESS settings.";
var __ML_wizard_caption = "Quick Setup";
var __ML_quick_setup_menu = "QUICK SETUP";
var __ML_save_and_continue = "Save and Continue";
var __ML_continue = "Continue";
var __ML_wireless_security_mode_no_encryption_warning  = "Are you sure about to disable the wireless security on your device?";
var __ML_saved_success = "Your device settings have been saved.";
var __ML_new_password_not_be_same_with_old_password = "New password can not be same as the current password.";
var __ML_password_must_be_change_intro = "You must change the login password before configuring your device.";
var __ML_wizard_wireless_security = "Wireless Security Type";
var __ML_wizard_wireless_freq = "Wireless Frequency";
var __ML_wizard_adsl_not_pppox = "Unless DSL settings aren’t PPPoe or PPPoA, DSL settings at this part cannot be configured";

var __ML_internet_menu = "INTERNET";
var __ML_vlan_menu = "VLAN";
var __ML_igmp_menu = "IGMP";
var __ML_management_ui_password_default_password_warning = "You entered factory default password. Please change the new password and try again.";
var __ML_log_settings_tr069_syslog_server_enabled = "TR069 Syslog Server Enabled";
var __ML_log_settings_tr069_syslog_server_ip_address = "IP Address:";
var __ML_usb_network_and_access_settings = "Network and Access Settings";
var __ML_usb_device_settings = "Device Settings";
var __ML_usb_printer_device = "USB Printer";
var __ML_usb_disk_device  = "USB Disk";
var __ML_usbhost_table_info  = "USB DEVICES";
var __ML_usb_other_device  = "USB Device";
var __ML_usbhost_info  = "This page allows viewing and management of devices attached to the gateways USB Host port";
var __ML_usb_device_name  = "Device name";
var __ML_usb_disk_name = "USB Disk Name";
var __ML_usb_device_type  = "Device type";
var __ML_usb_device_status  = "Device status";
var __ML_usb_disk_status  = "USB Disk status";
var __ML_usb_device_mounted  = "Active";
var __ML_usb_device_unmounted  = "Inactive";
var __ML_usb_unmount_botton  = "Safely Remove";
var __ML_usb_mount_botton  = "Activate Disk";
var __ML_usb_device_prepare_to_mount = "Warming up..";
var __ML_usb_device_mount_failed = "Activation failed";
var __ML_usb_device_unmount_failed = "Deactivation failed";
var __ML_usb_device_prepare_to_unmount = "Prepare to deactivation";
var __ML_usb_device_removed = "Removed";
var __ML_usb_printer_ready = "Active";
var __ML_menu_usb_devices = "USB DEVICES";
var __ML_usb_host_workgroup_name = "Workgroup Name";
var __ML_usb_host_hostname = "Hostname";
var __ML_usb_host_description = "Description";
// var __ML_usb_host_Info1 = "Your AirTies device supports the USB Host controller function. You can easily plug in USB devices into your AirTies gateway, and share it over the network with other computers and people.<br/><br/>Your AirTies gateway device supports most common USB storage devices, and USB printers. You can connect up to a maximum of 2 USB storage devices and a printer at the same time via a USB hub.<br/><br/>For USB storage devices, FAT and FAT32 file systems are currently supported. First four partitions on your USB disk are supported and will be displayed on this page. One user/computer in total can connect to the file server at the same time. You can check this link for the USB supported devices.<br/><br/>This page shows the status of your USB devices, and enables you to control some basic functionality of the USB Host controller and your USB devices attached to your gateway.";
// var __ML_usb_host_info_top = "Your AirTies gateway device supports most common USB printers. You can connect one printer to your device via the USB port.";
var __ML_usb_host_info_top = "Your AirTies device supports the USB Host controller function. You can easily plug in USB devices into your AirTies gateway, and share it over the network with other computers and people.<br/><br/>Your AirTies gateway device supports most common USB printers. You can connect one printer to your device via the USB port. You can check this link for the USB supported printers.<br/><br/>This page shows the status of your USB printer.";
// var __ML_usb_host_info_printer = "Your AirTies gateway device supports LPD/LPR printer protocol that allows you to share printer(s) on your network.<br/><br/>In order to use the print server functionality, the printer should be defined on your operating system.  The connection port of the printer should be Standard TCP/IP Port, the protocol should be selected as LPR, the Queue Name should be entered as lpt1, and the LPR byte counting check box should be selected.<br/><br/>Please refer to your User Manual for further information and setup details.";
var __ML_usb_host_info_printer = "Your AirTies gateway device supports <strong>Raw</strong> printer protocol that allows you to share a printer on your network. In order to use the print server functionality, the printer should be defined on your operating system.  The connection port of the printer should be <strong>Standard TCP/IP Port</strong>, the protocol should be selected as <strong>Raw</strong>, and the Port Number should be  <strong>9100</strong>. Please refer to your User Manual for further information and setup details.";
var __ML_usb_usb_printers = "USB Printer(s)";
var __ML_usb_disks = "Disk(s)";
var __ML_usb_connection_status ="Not Connected";
var __ML_usb_printer_status = "Status";
var __ML_usb_lpr_queue_name = "LPR Queue Name";
var __ML_usb_connected = "Connected";
// var __ML_usb_host_info_led = "USB LED on your device will be ON when a printer is connected. If both the power LED and the USB LED is blinking at the same time, there is a problem the printer attached to your gateway. Please try unplugging and then re-plugging your printer.";
var __ML_usb_host_info_led = "USB LED on your device will be ON when a printer is connected.";
var __ML_usb_host_network_settings = "Network Settings";
var __ML_usb_device_status_0 = "Inactive";
var __ML_usb_device_status_1 = "Active";
var __ML_usb_device_status_2 = "Warming up..";
var __ML_usb_device_status_3 = "Activation failed";
var __ML_usb_device_status_4 = "Deactivation failed";
var __ML_usb_device_status_5 = "Prepare to deactivation";
var __ML_usb_device_status_6 = "Prepare to deactivation";
var __ML_usb_device_status_7 = "Çıkarıldı";
//gösterilmeyecek
var __ML_usb_device_status_8 = "In progress";
var __ML_usb_menu = "USB DEVICES";
var __ML_usb_eject = "Eject";

var __ML_usb_host_info_top_part1_rel1 = "Your AirTies device supports the USB Host controller function. You can easily plug in USB devices into your AirTies gateway, and share it over the network with other computers and people. Your AirTies gateway device supports most common USB printers. You can connect one printer to your device via the USB port. You can check <a href='http://www.airties.com/destek_doc/Desteklenen_usb_cihazlari.pdf' target='_blank'>this link</a> for the USB supported printers.";

var __ML_usb_host_printer_model_name = "Model Name";
var __ML_usb_host_info_top_part1_rel2 = "Your AirTies device supports the USB Host controller function. You can easily plug in USB devices into your AirTies gateway, and share it over the network with other computers and people.";
var __ML_usb_host_info_top_part1_rel2_for_status_page = "This page shows the status of your USB devices.";
var __ML_usb_host_info_top_part1_rel2_for_settings_page = "On this page, you can see the status of your USB devices and set up the basic properties of these devices.";
var __ML_usb_host_info_top_part1_more_rel2 = "<p>Your AirTies gateway device supports most common USB storage devices, and USB printer. You can connect up to a maximum of 1 USB storage devices and 1 USB printer at the same time via a USB hub.</p><p>For USB storage devices, FAT, FAT32, and NTFS file systems are currently supported. First four partitions on your USB disk are supported and will be displayed on this page. 3 user/computer in total can connect to the file server at the same time. You can check <a href='http://www.airties.com/destek_doc/Supported_USB_devices.pdf' class='underline' target='_blank'>this link</a> for the USB supported devices.</p>";
var __ML_usb_host_more = "More";
var __ML_usb_host_more_info = "More information";
var __ML_usb_host_info_workgroup = "Your disk shares will be displayed according to the Network Settings. These shares can be found under the Network Neighborhood in Windows operating systems, under the appropriate Workgroup as shown on the left.";
var __ML_usb_host_bottom_info_workgroup = "Once your USB storage media is ready and is also activated with share permissions on your AirTies gateway device, shared disks/partitions can be accessed from the links shown below:";
var __ML_usb_host_no_disk = "There is no USB disk attached to your AirTies gateway. If you attach a USB disk to the USB port of your device, it will be shared here automatically.";
var __ML_usb_host_global_access_rights = "Global Access Rights";
var __ML_usb_host_global_access_rights_info = "“When a USB storage media is connected, the root of the media will automatically be shared with <b>Full Access</b> rights. This will be valid for all storage media connected to the AirTies gateway, as long as they are ON and active.  The <b>Global Access Rights</b> configuration menu controls are applied to all connected USB storage media.  Globally, a maximum of " + __DEF_UsbHostMaxConnectionLimit + " connection can be made to the file server in total.”";
var __ML_usb_host_info_led_disk = "The USB LED on your device will blink when a connected disk is being activated or being deactivated/ejected. When the disk is activated, the LED turns on. If both the power LED and the USB LED is blinking at the same time there is a problem with one or more of the disks attached to your gateway.";
var __ML_usb_host_safe_remove_notification = "<b>ATTENTION:</b> Never physically disconnect a storage media without safely removing it. You should click on the <i><b>EJECT</b></i> button on the above table for the appropriate disk in order to safely remove your attached storage device. Once the device can be safely removed, you will be notified with a message on the status table. When the <i><b>EJECT</b></i> button is clicked in order to safely remove the USB storage media, the USB LED will keep blinking until the device is ready to be removed. AirTies cannot be held responsible for data losses and storage media damages if the above procedure is not followed.";
var __ML_usb_host_safe_remove_notification_attention = "<b>ATTENTION:</b> ";
var __ML_usb_host_safe_remove_notification_info = "Never physically disconnect a storage media without safely removing it. ";
var __ML_usb_host_safe_remove_notification_more_info = "You should click on the <i><b>EJECT</b></i> button on the above table for the appropriate disk in order to safely remove your attached storage device. Once the device can be safely removed, you will be notified with a message on the status table. When the <i><b>EJECT</b></i> button is clicked in order to safely remove the USB storage media, the USB LED will keep blinking until the device is ready to be removed. AirTies cannot be held responsible for data losses and storage media damages if the above procedure is not followed.";
var __ML_usb_host_status_active_tooltip = "%diskid% is attached and active. Please click on the EJECT button before removing the media physically.";
var __ML_usb_host_status_inactive_tooltip = "%partitionid% on %diskid% is attached but inactive. Please click on ACTIVATE button in order to use this device.";
var __ML_usb_host_safe_to_remove = "Safe to Remove";
var __ML_usb_host_unsupported_format = "Unsupported Format";
var __ML_usb_host_info_led_disk_more = "Led Descriptions";
var __ML_usb_host_hostname_of_the_gateway = "Hostname of the gateway";
var __ML_usb_host_ex = "Ex";
var __ML_usb_host_global_access_rights = "Global Access Rights";
var __ML_usb_host_read_only = "Read Only";
var __ML_usb_host_full_access = "Full Access";
var __ML_usb_host_not_shared = "Not Shared";
var __ML_usb_host_usb_storage_media = "USB Storage Media";
var __ML_usb_host_status = "Status";
var __ML_usb_host_file_system = "File System";
var __ML_usb_host_size = "Size";
var __ML_usb_host_disk = "Disk";
var __ML_usb_host_partition = "Partition";
var __ML_mac_cloning_mac_address = "MAC Address";
var __ML_mac_cloning = "MAC Cloning";
var __ML_mac_cloning_hostname = "Host Name";
var __ML_clone_your_pc_mac_address = "Clone your PC’s MAC Address";
var __ML_revert_orginal__mac_address = "Revert to Original MAC Adress";
var __ML_mac_cloning_intro = "In this page, MAC Address and Hostname can be set manualy and Mac address can be also cloned  automatically.";
var __ML_eth_user_name_text_tellcom = "fiber@fiber";
var __ML_eth_user_name_text_only_username = "username";
var __ML_adsl_user_name_text_tellcom = "tellcomadsl@tellcom";

var __ML_internet_eth_rate = "Rate (Kb/s)";
var __ML_internet_eth_rate_without_unit = "Rate";
var __ML_wireless_wps_with_wep_error = "WEP security type cannot be selected for the primary wireless network (%SSID%) if Air Touch feature is enabled.";

var __ML_internet_settings_ac_name = "AC Name";
var __ML_internet_settings_service_name = "Service Name";
var __ML_homepage_usb_host_label = "USB Host";
var __ML_usb_host_details = "Details";
var __ML_usb_host_detailed_settings = "Detailed settings";
var __ML_usb_host_bottom_info_workgroup_details = "You can setup your file server step-by-step using the AirTies Utility Program provided, and you can easily access your files and view the status of your disks.";
var __ML_usb_host_ex_description = "(It is only compatible with Internet Explorer) Displays all shared disks/partitions on the gateway. Click<br/><br/>NOTE: if you have any problem for reaching your USB device, please ensure adding  “" + top.location.host + "” address to “Trusted sites” in your browser. ( In your browser, follow “Tools”->  “Internet options”-> “Security” -> “Trusted sites” -> “Sites”)";
var __ML_usb_host_ex_description2 = "Access methods to the file server and the disks / disk partitions are as below:<br/>1-File Server: \\\\&lt;Hostname&gt;, i.e. \\\\%workgroup% on Windows Explorer or Browser,<br/>2-Specific Partition on a specific disk: \\\\<Hostname>\\<Diskx_Partx>, i.e. \\\\%workgroup%\\Disk1_Part1 on Windows Explorer or Browser.<br/>3-Above locations can be accessed via the Network Neighborhood on Windows operating systems.<br/>4-If you use the AirTies Utility Program to setup the Disk Server and map drive letters to your share, then you can also access the disks and its partitions via the mapped drives in My Computer on Windows operating systems by clicking on the appropriate drive.”";
var __ML_usb_host_ex_description3 = "NOTE: If you have a problem reaching your USB device from a Windows PC, please add the “" + top.location.host + "” address to “Trusted sites” in your browser (In your browser, follow “Tools”-> “Internet options”-> “Security” -> “Trusted sites” -> “Sites”).";
var __ML_usb_host_partition_label_restriction_message = "Please use a-z, A-Z, 0-9, -, _, ~, and <space> only. Maximum length for the partition label is 32 characters for NTFS disks, 11 characters for FAT disks.";
var __ML_usb_host_printer_info_details = "You can automatically setup your printer and port settings by using the AirTies Utility Program provided. You can as well setup your printer manually by watching the visual animation on your CD and AirTies utility program.";
var __ML_usb_host_connected_users = "Connected Users";
var __ML_rescue_image = "RESCUE MODE";
var __ML_usb_host_free_space = "Free Space";
var __ML_voip_registration_expiry_time = "Registration Expiry Time";
var __ML_ddns_username_format_text = "username1";
var __ML_log_all = "All";
var __ML_wireless_couldnt_use_wep_with_11n = "“You can not use “11n only” mode while you have WEP security on your access point. WEP is a weak security protocol which can be hacked easily. If you would like to choose “11n only” mode on your device, you need to change security type to WPA2.”";
var __ML_wireless_freq_conflict = "“The Access Point you have choosen to setup a Mesh network uses a different frequency. If you want to setup Mesh network with this access point, click to “Wireless Settings” menu; change “Frequency” to @freq@ GHz, choose channel @channel@ in “Channel” section and click “Save”.";
//don't translate @freq@ and @channel@
var __ML_wireless_couldnt_use_wpa_only_with_11n = "“You can not use “11n only” mode while you have WPA security on your access point. WPA is a weak security protocol which can be hacked easily. If you would like to choose “11n only” mode on your device, you need to change security type to WPA2.”";
var __ML_voip_codec_settings = "Codec Settings";
var __ML_voip_codec_settings_intro = "Codecs can be selected and configured on this menu. You can enable / disable each codec, and set its priority";
var __ML_voip_codec_codec = "Codec";
var __ML_voip_codec_priority = "Priority";
var __ML_voip_codec_enabled = "Enabled";
var __ML_voip_voip_advanced_settings = "VoIP Advanced Settings";
var __ML_voip_voip_advanced_settings_intro = "You can enable or disable the advanced VoIP settings of the VoIP accounts on this menu.";
var __ML_voip_feature = "Feature";
var __ML_voip_feature_enabled = "Enabled";
var __ML_voip_echo_cancellation = "Echo Cancellation";
var __ML_voip_vad = "VAD (Voice Activity Detection)";
var __ML_codec_priority_conflict = "Same priority can not be used for more than one codec.";
var __ML_voip_packetization_settings = "Packetization Settings";
var __ML_voip_packetization_settings_intro = "Packetization perion can be adjusted on this page.";
var __ML_voip_please_enter_a_value_between_5_100_for_both_fields = "Please enter a value between 5-100 for both fields";
var __ML_voip_period = "Period";
var __ML_wireless_settings_radar_channel_warning = "The channel you would like to switch is a radar channel. Mesh and " + __DEF_airtouch_text + " do not work at radar channels. If you would like to switch to a radar channel, please first disable " + __DEF_airtouch_text + " and Mesh.";
var __ML_wireless_mesh_radar_channel_warning = "The access point is currently operating in radar channel. According to regulation policies access point has to change its channel in case of a radar detection. Therefore Mesh link will be broken. If you would like to setup Mesh, please first change wireless channel of your access point to one of the channels @mesh_free_channels@.";
var __ML_3g_connection = "3G Connection:";
var __ML_3g_usb_modem_connection = "USB MODEM CONNECTION";
var __ML_3g_active = "Connected";
var __ML_3g_passive = "Disconnected";
var __ML_3g_active2 = "Connected";
var __ML_3g_passive2 = "Disconnected";
var __ML_3g_pin_ok = "PIN OK";
var __ML_3g_sim_mounted = "SIM MOUNTED";
var __ML_3g_pin_failed = "PIN Failed";
var __ML_3g_puk_required = "PUK Required";
var __ML_3g_pin_required = "PIN Required";
var __ML_3g_simstatus = "SIM Status";
var __ML_3g_sim_failure = "SIM Failure";
var __ML_3g_info = "3G Status";
var __ML_3g_status = "3G:";
var __ML_3g_imei = "IMEI:";
var __ML_3g_pin_status = "PIN Status:";
var __ML_3g_conn_mode = "Connection mod:";
var __ML_3g_signal_strength = "Signal Strength:";
var __ML_3g_roaming = "Roaming:";
var __ML_3g_mode = "Mode :";
var __ML_3g_no_active = "Please insert your 3G dongle.!";
var __ML_3g_show_confirm_page = "Enable 3g confirm page";
var __ML_3g_fo_connection_info = "Attempted to connect. Please close your browser and wait for a few seconds to connect again.!";

var __ML_voip_account_settings_provision_menu = "Provisioning&nbsp;Settings";
var __ML_voip_account_settings_codec_menu = "Codec&nbsp;Settings";
var __ML_voip_account_settings_advanced_voip_menu = "Advanced&nbsp;Voip&nbsp;Settings";
var __ML_voip_account_settings_sound_setting = "Sound Settings";
var __ML_voip_account_settings_sound_setting_intro = "You can enable or disable the advanced VoIP settings of the VoIP accounts on this menu.";
var __ML_voip_account_setting_registration_settings = "Registration Settings";
var __ML_voip_account_setting_registration_settings_intro = "Please enter a value for the registration period and Registration Retry Interval. Registration Period is the the value that the device checks registration when the device is already registered, and Registration Retry Interval is the interval that the device tries to register when the registration is not done.";
var __ML_voip_account_setting_registration_settings_period = "Registration Period:";
var __ML_voip_account_setting_registration_settings_retry_interval = "Registration Retry Interval:";
var __ML_voip_packetization_settings_transmit = "Transmit";
var __ML_voip_packetization_settings_receive = "Receive";
var __ML_voip_advanced_setting_dscp_marking = "DSCP Marking";
var __ML_voip_advanced_setting_dscp_marking_intro = "Please enter SIP and RTP packet values for packet priotrization of the VoIP QoS function";
var __ML_voip_call_feature_settings = "Call Feature Settings";
var __ML_voip_call_feature_settings_caller_id_blocking = "Caller ID Blocking";
var __ML_voip_call_feature_settings_caller_id_blocking_account = "Block Caller ID on account";
var __ML_voip_call_feature_settings_caller_id_blocking_info = "Your Caller ID per VoIP account can be be blocked and thus not shown on the called party’s telephone by checking the option below";
var __ML_voip_call_feature_settings_caller_keypad_info = "The user can activate / deactivate the feature by dialing the numbers below on the telephone’s keypad:<br><br>To enable dial * - XX - #<br>To disable dial # - XX - #”<br><br>If the activation of the service is successful, then a confirmation tone will be heard. Otherwise, a reorder tone will be played.";
var __ML_voip_call_feature_settings_call_waiting = "Call Waiting";
var __ML_voip_call_feature_settings_call_waiting_check = "Call Waiting:";
var __ML_voip_call_feature_settings_call_waiting_info_hidden = "When a call is in progress, the user can be notified (by a short ringback alert) if there is another incoming call, if this feature is supported by the service provider. If the Call Waiting feature is also supported by the service provider, and if it is activated on the AirTies gateway, the user can switch to the new user by flashing and taking the current call to hold. Flashing back disconnects the new call and returns back to the previous held call.";
var __ML_voip_call_feature_settings_call_waiting_info = "The Call Waiting feature can be enabled / disabled by the below checkbox:";
var __ML_voip_call_feature_settings_call_forwarding = "Call Forwarding";
var __ML_voip_call_feature_settings_call_forwarding_info = "<strong>Call Forwarding</strong> can be used when the called party is unavailable at the originally called location, and the call is redirected to where the called person is located based on user’s entry.";
var __ML_voip_call_feature_settings_call_forwarding_info_hidden = " There are three types of Call Forwarding available on your AirTies device: <strong>Call Forward Unconditional, Call Forward Busy</strong>, and <strong>Call Forward No Answer</strong>. If <strong>Call Forwarding Unconditional</strong> is activated, all calls will be forwarded to the entered telephone number. If <strong>Call Forward Busy</strong> is active, calls will be forwarded to the entered telephone number when your line is busy. If <strong>Call Forward No Answer</strong> is selected, calls will be forwarded to the desired number after the phone rings for a specific number of times specified by the user.";
var __ML_voip_call_feature_settings_call_forwarding_unconditional_hidden = "<strong>Call Forward Unconditional</strong><br>The user can activate-store / deactivate the feature by dialing the numbers below on the telephone’s keypad:<br><br>To activate: * - XX – 0 ZZZ ZZZ ZZ ZZ #<br>To deactivate: # - XX - #";
var __ML_voip_call_feature_settings_call_forwarding_busy_hidden = "<strong>Call Forward Busy</strong><br>The user can activate-store / deactivate the feature by dialing the numbers below on the telephone’s keypad:<br><br>To activate: * - YY – 0 ZZZ ZZZ ZZ ZZ #<br>To deactivate: # - YY - #";
var __ML_voip_call_feature_settings_call_forwarding_no_answer_hidden = "<strong>Call Forward No Answer</strong>><br>The user can activate-store / deactivate the feature by dialing the numbers below on the telephone’s keypad:<br><br>To activate: * - WW - <No. times to ring> – 0 ZZZ ZZZ ZZ ZZ #<br>To deactivate: # - WW - #";
var __ML_voip_call_feature_settings_call_forwarding_hidden = "If the activation of the service is successful, then a confirmation tone will be heard. Otherwise, a reorder tone will be played.";
var __ML_voip_call_feature_settings_speed_dial = "Speed Dial";
var __ML_voip_call_feature_settings_speed_dial_entry_no = "Entry No.";
var __ML_voip_call_feature_settings_speed_dial_key = "Speed Dial Key";
var __ML_voip_call_feature_settings_speed_dial_no_to_dial = "No. To Dial";
var __ML_voip_call_feature_settings_speed_dial_info = "Speed dial feature lets you save the most frequently dialed numbers on your AirTies gateway’s memory and then enables you to call these numbers by just pressing two buttons on the keypad of your telephone. You can save up to ten numbers on this page.";
var __ML_voip_call_feature_settings_speed_dial_hidden = "  The user can store / delete a speed dial entry by dialing the below key combination from the telephone’s keypad:<br><br>To store: * - XX – <0-9: Speed dial key> - <Tel. No.: 3-23 digits> - #<br>To delete: # - XX – <0:9: Speed dial key> - #<br><br>If the activation of the service is successful, then a confirmation tone will be heard. Otherwise, a	reorder tone will be played.";
var __ML_voip_call_feature_settings_caller_id_bloking_menu = "Outgoing&nbsp;Caller&nbsp;ID&nbsp;Blocking";
var __ML_voip_call_feature_settings_call_waiting_menu = "Call&nbsp;Waiting";
var __ML_voip_call_feature_settings_call_forwarding_menu = "Call&nbsp;Forwarding";
var __ML_voip_call_feature_settings_speed_dial_menu = "Speed&nbsp;Dial";
var __ML_voip_call_feature_settings_call_forwarding_type = "Call Forward Type";
var __ML_voip_call_feature_settings_call_forwarding_tel = "Telephone No. To Forward To";
var __ML_voip_call_feature_settings_call_forwarding_unconditional = "Call Forward Unconditional";
var __ML_voip_call_feature_settings_call_forwarding_busy = "Call Forward Busy";
var __ML_voip_call_feature_settings_call_forwarding_no_answer = "Call Forward No Answer";
var __ML_voip_call_feature_settings_call_forwarding_ring_count = "No. of times to ring before forward";
var __ML_voip_advanced_settings_voip_feature_status = "VoIP Feature Enabled:";
var __ML_voip_advanced_settings_voip_feature_status_intro = "VoIP feature of your device can be enabled / disabled via the below setting.";
var __ML_voip_call_feature_settings_speed_dial_tooltip = "Please enter a telephone number here";
var __ML_voip_call_feature_settings_call_forwarding_no_tooltip = "Please enter the number in the following format including the area code: 02123186200.";
var __ML_voip_call_feature_settings_call_forwarding_ring_tooltip = "Please enter a number between 1-10.";
var __ML_default_voice_interface = "Default VoIP Gateway";

var __ML_media_server_menu = "MEDIA SERVER";
var __ML_media_server_page_info = "The Media Server allows for media to be shared from a connected USB drive to a UPnP AV or DLNA compatible Media Player.";
var __ML_media_server_status_enabled = "Enable Media Server";
var __ML_media_server_status_disabled = "Disable Media Server";

var __ML_wireless_settings_intro = "Wireless network is enabled with default settings. If you want to change the name of you wireless network please use the “Primary SSID” field. You can also check “Hidden SSID” to hide your wireless network.";
var __ML_wireless_settings_intro2_freq_2400 = "You can select a channel between @min_channel@-@max_channel@ for 2.4 GHz frequency. (Advised to use channels 1,6 and 11)";
var __ML_wireless_settings_intro2_freq_5000 = "You can select a channel between @min_channel@-@max_channel@ for 5 GHz frequency.";
var __ML_igmp_intro_for_TT = "IGMP v1, v2 and v3 protocols are supported.";
var __ML_3g_fo_button = "Connect to Internet using 3G";
var __ML_always_connect_via_3g_when_adsl_disconnects = "Always connect via 3G when WAN/DSL disconnects";
var __ML_3g_fo_intro = "";
var __ML_maxuser_info = "The maximum number of wireless client that can connect to the internet has been reached. If you still want to connect to the internet you can connect via Ethernet.";
var __ML_noencryption_info = "You can not reach the net without setting the wireless security.Please click <a href='/login.html?redirect=/wireless/settings.html'> here </a> to login web UI of the router to set wireless security.";
var __ML_redirect_to_modem = "<a href=\"javascript:void(0)\" onclick=\"top.location.href='/main.html'\">Click here for device settings.</a>";

var __ML_fw_upgrade_current_firmware_version = "Current firmware version";
var __ML_fw_upgrade_auto_firmware_update = "Enable auto firmware update";
var __ML_fw_upgrade_check_for_updates_now = "Check For Updates Now";
var __ML_fw_upgrade_confirm_auto_upgrade = "A new version (@version@) of firmware is available. Do you wish to upgrade your device?";
var __ML_fw_upgrade_no_new_firmware = "No new firmware available.";
var __ML_fw_upgrade_check_fail = "Check failed!";
var __ML_fw_upgrade_automatically_update_info = "AirTies devices support automatic firmware upgrade feature. Related configuration can be done in this section.";
var __ML_fw_upgrade_automatic_update = "Automatic update";
var __ML_fw_upgrade_manual_update = "Manual update";
var __ML_pvc_out_of_bounds = "You can only create @number@ Connection rule, not more. ";
var __ML_lan_dhcp_setup_redirect_confirm = "Would you like to be redirected to the new IP addresses?";
var __ML_access_control_all = "All Internet";

var __ML_torrent_client_enable = "Enable";
var __ML_torrent_client_disable = "Disable";
var __ML_torrent_client_use_usb_disk = "Select USB disk to use for Torrent Client";
var __ML_web_ui = "Web UI";
var __ML_torrent_web_ui = "Torrent Web UI";
var __ML_disk_space = "Disk Space";
var __ML_disk_available_space_percent = "Available space is @percent@%";
var __ML_running = "Running";
var __ML_stopped = "Stopped";
var __ML_restarting = "Restarting";
var __ML_suspended = "Suspended";
var __ML_torrent_client_menu = "Torrent Client";
var __ML_torrent_no_disk = "No USB disk attached";
var __ML_torrent_client_space_limit_warning = "Available disk space is less than @percent@%. Torrent client has stopped running. Please remove files from disk so that available disk space is more than @percent@% for Torrent client to resume.";
var __ML_torrent_client_no_disk_attached = "The disk used for Torrent Client has been removed. Torrent client is not working";
var __ML_special_features = "Special Features";
var __ML_voip_phone_number1 = "Phone Number";
var __ML_lan_dhcp_setup_auto_dhcp_detection_is_enabled = "Auto DHCP Detection";
var __ML_wireless_certification_validation_msg1 = __DEF_airtouch_text + " and WEP security type can not be used together. Disable " + __DEF_airtouch_text + " or choose a security type other than WEP.";
var __ML_wireless_certification_validation_msg1_confirm = __DEF_airtouch_text + " and @sec_mode@ security type can not be used together. Proceeding will disable " + __DEF_airtouch_text;
var __ML_wireless_certification_validation_msg2 = __DEF_airtouch_text + " and WPA-Enterprise security type can not be used together. Disable " + __DEF_airtouch_text + " or choose security type as WPA-Personal at Wireless Security Settings page.";
var __ML_wireless_certification_validation_mode_security_msg = "You can not use @mode@ mode while you have @security@ security on your device.";
var __ML_wireless_certification_validation_msg3 = "You can not use 802.11n mode while you have WEP security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only.";
var __ML_wireless_certification_validation_msg4 = "You can not use 802.11n mode while you have WPA security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only.";
var __ML_wireless_certification_validation_msg5 = "You can not use 802.11n mode while you have WPA+WPA2 common mode security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only.";
var __ML_wireless_certification_validation_msg6 = __DEF_airtouch_text + " and WEP security type can not be used together. Disable " + __DEF_airtouch_text + " at Wireless Settings page or choose a security type other than WEP.";
var __ML_wireless_certification_validation_msg7 = __DEF_airtouch_text + " and WPA-Enterprise security type can not be used together. Disable " + __DEF_airtouch_text + " at Wireless Settings page or choose security type as WPA-Personal.";
var __ML_wireless_certification_validation_msg8 = "You can not use 802.11n mode while you have WEP security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only. If you want, you can change the communication mode at Wireless Settings page.";
var __ML_wireless_certification_validation_msg9 = "You can not use 802.11n mode while you have WPA security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only. If you want, you can change the communication mode at Wireless Settings page.";
var __ML_wireless_certification_validation_msg10 = "You can not use 802.11n mode while you have WPA+WPA2 common mode security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only. If you want, you can change the communication mode at Wireless Settings page.";
var __ML_wireless_certification_validation_msg11 = __DEF_airtouch_text + " and WEP security type can not be used together. Disable " + __DEF_airtouch_text + " at Wireless Settings page or choose a security type other than WEP.";
var __ML_wireless_certification_validation_msg12 = __DEF_airtouch_text + " and WPA-Enterprise security type can not be used together. Disable " + __DEF_airtouch_text + " at Wireless Settings page or choose security type as WPA-Personal at Wireless Security Settings page.";
var __ML_wireless_certification_validation_msg13 = "You can not use 802.11n mode while you have WEP security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only. If you want, you can change the communication mode at Wireless Settings page.";
var __ML_wireless_certification_validation_msg14 = "You can not use 802.11n mode while you have WPA security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only. If you want, you can change the communication mode at Wireless Settings page.";
var __ML_wireless_certification_validation_msg15 = "You can not use 802.11n mode while you have WPA+WPA2 common mode security on your device. This security type is a weak security protocol and can be hacked easily. If you would like to choose 802.11n mode on your device, you need to change security type to WPA2 only. If you want, you can change the communication mode at Wireless Settings page.";
var __ML_internet_settings_dsl_ptm_parameters = "PTM Parameters";
var __ML_internet_settings_dsl_atm_parameters = "ATM Parameters";
var __ML_internet_settings_dsl_vlan_id = "VLAN Id";
var __ML_lan_ip = "LAN IP";
var __ML_nat_port_forwarding_port_validation_msg1 = "For one rule, you have to enter same number of port values for LAN and WAN ports.";
var __ML_nat_port_forwarding_port_validation_msg2 = "For one rule, number of ports in a port range has to be same for LAN and WAN ports.";
var __ML_nat_port_forwarding_port_validation_msg3 = "For one rule, ports and port ranges for LAN and WAN have to be in same order.";
var __ML_nat_port_forwarding_port_validation_msg4 = "When creating port range like 'a:b', number 'b' has to be greater than number 'a'.";
var __ML_port_forwarding_enabled = "Port Forwarding Enabled";
var __ML_Config_File_Not_Exist = "Device is in default settings, there is no need to backup the settings.";
var __ML_vlan_id_conflict_message = "The VLAN ID you have entered is matched with one of the current VLAN IDs. Please increase the value of your VLAN ID by 1 and try again.";
var __ML_nat_port_fw_delete = "Delete";
var __ML_bridge_vlan_you_must_select_at_least_one_member_port = "You must select at least one member port.";
var __ML_port_fw_advanced_mode = "Advanced Mode";
var __ML_vlan_configuration_no_bridge_intro = "Enter a \"VLAN Name\" (e.g. Accounting, Marketing, etc.) and a \"VLANID\" (e.g. 100, 102, 200, etc..) for the VLAN you would like to setup. Select the ports that will be members of the VLAN from the \"Selectable Ports\" list and use the \">>\" button to add them to the \"Member Ports\" list. To delete a port from the list, select it and click \"<<\". For IPSTB port configuration, please enter \"IPTV\" in field \"VLAN name\", \"2\" in \"VLAN Id\" and check \"Bridge\" box. Click \"Save\" to store the settings.";
var __ML_vlan_no_bridge = "Bridge";

var __ML_wireless_operating_mode_description = "Wireless operating mode for the device.";
var __ML_wireless_operating_mode = "Operating Mode:";
var __ML_wireless_operating_mode_access_point_description = "<strong>Access Point –</strong> The device will function as a wireless point and can be configured as part of a MESH network.";
var __ML_wireless_operating_mode_bridge_description = "<strong>Bridge –</strong> Device will bridge Ethernet ports to selected Wireless Access Point. Note that Access Point operation on the device will be disabled when bridge mode is selected.";
var __ML_wireless_operating_mode_repeater_description = "<strong>Universal Repeater –</strong> Device will repeat the signal of selected Wireless Access Point to improve coverage and speed. Ethernet port will also be bridged to selected Wireless Access Point.";
var __ML_wireless_operating_mode_ap_searching_message = "Searching Neighbouring Access Points<br />Please Wait";
var __ML_wireless_operating_mode_select_ap_to_connect_to = "Select AP to connect to";
var __ML_wireless_operating_mode_refresh_ap_list = "Refresh AP List";
var __ML_wireless_operating_mode_station_mode_ap_password = "Password";
var __ML_wireless_operating_mode_station_mode_ap_connect = "Connect";
var __ML_wireless_operating_mode_station_mode_ap_cancel = "Cancel";
var __ML_wireless_operating_mode_bridge_mode_warning = "Bridge mode will disable Access Point mode and you will not be able to connect to this device as a wireless Access Point. Please connect to this device using an Ethernet cable if you are currently connected wirelessly. Note that the IP address of the device may also change.";
var __ML_wireless_operating_mode_repeater_mode_warning = "In Universal Repeater mode, you will not be able to connect to this device with the current “Wireless Network Name (SSID) and Password” network credentials. However, you can connect to selected network by using its “Wireless Network Name (SSID) and Password” network credentials. Note that the IP address of the device may also change.";
var __ML_wireless_operating_mode_manual_configuration = "Manual Configuration";
var __ML_wireless_operating_mode_manual_ssid = "SSID";
var __ML_wireless_operating_mode_manual_security = "Security";
var __ML_wireless_operating_mode_ap = "Access Point";
var __ML_wireless_operating_mode_sta = "Bridge";
var __ML_wireless_operating_mode_repeater = "Universal Repeater";
var __ML_wireless_operating_mode_workgroup_sta = "Workgroup Bridge";
var __ML_wireless_operating_mode_sta_connected = "Connected";
var __ML_wireless_operating_mode_sta_connecting = "Connecting";
var __ML_wireless_operating_mode_password_error_wpa = "This is not valid WPA pass phrase key. It should be at least 8 characters.";
var __ML_wireless_operating_mode_password_error_web = "This is not valid WEP pass phrase key.";
var __ML_wireless_operating_mode_configure = "Configure";
var __ML_wireless_operating_mode_bridge_mode_no_access_warning = "You cannot configure these settings in Client Bridge Mode.";
var __ML_wireless_operating_mode_repeater_mode_no_access_warning = "You cannot configure these settings in Universal Repeater Mode.";
var __ML_wireless_security_mode_off = "No Encryption";
var __ML_wireless_security_mode_wpa = "WPA";
var __ML_wireless_security_mode_wpa2 = "WPA2";
var __ML_wireless_security_mode_wep = "WEP";
var __ML_wireless_security_mode_wpa_both = "WPA+WPA2";

var __ML_3g_correct_pin_is_already_set_are_you_sure_update_it = "The correct SIM PIN is already set. Are you sure you wish to update the SIM PIN?\nThe new PIN will not be used until the device is rebooted or the 3 dongle is reinserted into the USB port.";
var __ML_wireless_mac = "Wireless MAC Address";

var __ML_protocol_type_pppoe = "PPPoE";
var __ML_protocol_type_pppoa = "PPPoA";
var __ML_protocol_type_vpn = "PPTP";
var __ML_protocol_type_russian_pppoe = "Russian PPPoE";
var __ML_protocol_type_bridge = "Bridge";
var __ML_protocol_type_static = "Static";
var __ML_protocol_type_dhcp = "DHCP";
var __ML_protocol_type_l2tp = "L2TP";

var __ML_l2tp_setup = "L2TP Settings";
var __ML_l2tp_username = "L2TP Username";
var __ML_l2tp_password = "L2TP Password";
var __ML_l2tp_servername = "Server";
var __ML_l2tp_usepeerdns = "usepeerdns";
var __ML_l2tp_refuse_pap = "refuse-pap";
var __ML_l2tp_refuse_eap = "refuse-eap";
var __ML_l2tp_require_mppe_128 = "require-mppe-128";

var __ML_lan_operation_mode = "Operation Mode";
var __ML_lan_operation_mode_description = "Please choose operation mode:";
var __ML_lan_operation_mode_router_description = "On router mode, device operates as Router management will be possible only over WiFi, Ethernet port will be used for Internet connection.";
var __ML_lan_operation_mode_ap_description = "In AP mode device operate as Access Point and able to connect Wireless clients with wired connection.";
var __ML_lan_operation_mode_access_point = "Access Point";
var __ML_lan_operation_mode_router_mode = "Router Mode";
var __ML_lan_operation_mode_router_mode_warning = "You have chosen Router Mode. After reboot, the device can only be configured through WiFi. LAN port will be used as WAN for Internet connection.";
var __ML_lan_operation_mode_ap_mode_warning = "You have chosen Access point mode. After reboot you will be able to connect to device over Wireless and wired connection.";

var __ML_vlan_ipstb_connection_port = "IPSTB Connection Port";
var __ML_vlan_ipstb_connection_ports_alert = "All ports can not be used for IPSTB connection. Please leave at least one port for Ethernet connection.";

var __ML_lan_operation_mode_ap_mode_no_access_warning = "The tab is not available since device in Access Point mode. To enable the tab please switch device to Router mode.";

var __ML_wireless_network_band = "Band";
var __ML_wireless_network_lan = "WLAN";
var __ML_wireless_settings_tab_change_confirm_message = "Moving to this tab will all changes to be lost. Do you wish to continue?";
var __ML_wireless_mesh_bridge_mode_warning = "Your device is currently configured to be in bridge mode. MESH cannot be created for devices that are in bridge mode.";

var __ML_lan_dhcp_dynamic_clients = "Dynamic Addresses";
var __ML_lan_dhcp_static_clients = "Static Addresses";
var __ML_wireless_password_alert_message = "The password format is not correct. There must be at least 8 to 63 characters. For example zce.439-QGE";
var __ML_new_password_is_required = "A new password is required.";

var __ML_you_can_manage_modem_without_snmp_and_telnet = "In this section you may manage this user interface's login password as well.";
var __ML_WPS_PIN = "WPS PIN :";

var __ML_wireless_WPS = "Wi-Fi Protected Setup";
var __ML_wireless_WPS_info = "Devices can be easily added to the wireless network using Wi-Fi Protected Setup.";
var __ML_wireless_WPS_medhod1 = "Method 1 – Push Button";
var __ML_wireless_WPS_medhod1_info = "If your client device has a WPS button you can add it to the wireless network by pressing the button and then clicking the soft button below (note that WPS will run for two minutes):";
var __ML_wireless_WPS_medhod1_info_enroll = "If your access point has a WPS button you can join the wireless network by pressing the button and then clicking the soft button below (note that WPS will run for two minutes):";
var __ML_wireless_WPS_medhod2 = "Method 2 – Enter PIN";
var __ML_wireless_WPS_medhod2_info = "If your client device requests you to enter a Wi-Fi Protected PIN then you can enter it below and click Register (note that WPS will run for two minutes):";
var __ML_wireless_WPS_medhod2_enrollee = "Method 2 – Provide PIN to Access Point";
var __ML_wireless_WPS_medhod2_info_enroll = "If your access point requests a PIN then enter the PIN below:";
var __ML_wireless_WPS_medhod3 = "Method 3 – Provide PIN to Client";
var __ML_wireless_WPS_medhod3_info = "If your client requests a PIN then enter the PIN below:";
var __ML_wireless_WPS_soft_button = "WPS Soft Button";
var __ML_wireless_WPS_status_running = "WPS Running";
var __ML_wireless_WPS_status_successful = "Successful";
var __ML_wireless_WPS_status_timeout = "Timeout";
var __ML_wireless_WPS_status_overlap = "Overlap Detected";
var __ML_wireless_WPS_client_pin = "Client PIN:";
var __ML_wireless_WPS_register = "Register";
var __ML_wireless_WPS_pin_validation_message ="The PIN you entered is not valid. Please check the PIN and try again.";
var __ML_wireless_WPS_activate_pin_info_enroll = "You can activate PIN mode by clicking below (note that WPS will run for two minutes, within this time you should enter the PIN to your Access Point):";
var __ML_wireless_WPS_activate_pin_button = "Activate PIN Mode";
var __ML_wireless_WPS_warning_hidden_ssid = "You cannot hide your SSID if Wireless Protected Setup (WPS) is enabled. Do you wish to disable WPS and hide your SSID?";
var __ML_wireless_WPS_warning_no_security = "Warning. You have disabled security and Wireless Protected Setup (WPS) is enabled. Your device can be accessed without any security credentials.";
var __ML_wireless_WPS_warning_wpa_only = "You cannot select WPA Only if Wireless Protected Setup (WPS) is enabled. Do you wish to disable WPS and set security to WPA Only?";

var __ML_ttnet_uppercase_warning = "Domain name part of the username field contains upper case letter(s). Please make sure the domain name entered is correct.";
var __ML_ttnet_username_desc_row_span_text_ttnet = "To use your device with an internet service provider other than TTNET,";
var __ML_ttnet_username_desc_row_span_text_telekom = "To use your device with an internet service provider other than Turk Telekom,";
var __ML_ttnet_username_desc_row_button_text = "click here";
var __ML_ttnet_username_desc_row_span_text2 = "Please enter your username as explained in your agreement (";
var __ML_ttnet_username_desc_row_span_text3 = "ex : jamesbrown@internet_service_provider";
var __ML_ttnet_username_desc_row_span_text3_ttnet = "ex : jamesbrown@internet_service_provider";
var __ML_ttnet_username_desc_row_span_text4 = ") If you don’t know your username, please call your internet service provider customer service.";

var __ML_configuration_advanced = "Advanced configuration";
var __ML_login_admin_by_default = "by default your modem password is \"admin\"";
var __ML_login_enter_password_to_continue = "Please enter your modem password to continue";
var __ML_quick_setup_enter_your_login_and_password = "enter your connection login and password.";
var __ML_quick_setup_connection_login = "connection login";
var __ML_quick_setup_connection_password = "connection password";
var __ML_quick_setup_connection_help = "your login and password are available in the welcome letter";
var __ML_quick_setup_connection_title = "internet connection";
var __ML_quick_setup_connection_adsl_line = "ADSL line";
var __ML_quick_setup_connection_internet = "internet";
var __ML_quick_setup_connection_synchronised = "synchronised";
var __ML_quick_setup_connection_not_synchronised = "not synchronised";
var __ML_quick_setup_connection_disconnected = "disconnected";
var __ML_quick_setup_connection_connected = "connected";
var __ML_quick_setup_connection_status_ongoing = "authentication in progres";
var __ML_quick_setup_connection_status_fail = "authentication error, verify your connection login and password";
var __ML_quick_setup_connection_status_success = "connected";
var __ML_error_dsl_down_page_title = "no <acronym>ADSL</acronym> synchronisation";
var __ML_error_dsl_down_page_message = "verify the connection of the ADSL cable between the modem and the ADSL filter<br><br>verify the connection of the ADSL filter";
var __ML_error_dsl_down_page_access_message = "access to the modem user interface";
var __ML_error_wan_down_page_title = "no internet connection";
var __ML_error_wan_down_page_message = "enter your connection login and password<br>or<br>verify your connection login and password";
var __ML_error_wan_down_page_access_message = "access to the modem user interface";

var __ML_file_is_too_big = "This file is not a valid Config file.\nFile size is too big";
var __ML_file_is_too_small = "This file is not a valid Config file.\nFile size is too small";

var __ML_wireless_status_ssid = "SSID";
var __ML_upgrade_warning_intro = "";

var __ML_modulation_settings_title = "DSL Settings";
var __ML_modulation_settings_profiles = "profiles";

var __ML_nat_multi_nat_title = "Multi-NAT";
var __ML_nat_multi_nat_table_interface = "Interface";
var __ML_nat_multi_nat_table_type = "Type";
var __ML_nat_multi_nat_table_local_start_ip = "Local Start IP";
var __ML_nat_multi_nat_table_local_end_ip = "Local End IP";
var __ML_nat_multi_nat_table_common_start_ip = "Common Start IP";
var __ML_nat_multi_nat_table_common_end_ip = "Common End IP";
var __ML_nat_multi_nat_table_enable = "Enable";
var __ML_nat_multi_nat_table_remove = "Remove";
var __ML_nat_multi_nat_table_settings = "Settings";

var __ML_vpn_server_address = "Server Address";
var __ML_vpn_username = "Username";
var __ML_vpn_password = "Password";
var __ML_vpn_status = "Status";
var __ML_vpn_enabled = "Enabled";
var __ML_vpn_host_name = "Host Name";
var __ML_vpn_idle_disconnect_time = "Idle Disconnect Time";
var __ML_vpn_get_wan_ip_automatically = "Gat WAN IP Automatically";
var __ML_vpn_dns_server = "DNS Server";
var __ML_vpn_get_dns_automatically = "Get DNS Automatically";
var __ML_vpn_status_text = {
	"0" : "Not connected",
	"1" : "Connecting",
	"2" : "Connected"
};
var __ML_vpn_enabled_text = {
	"false" : "Disabled",
	"true" : "Enabled"
};
var __ML_vpn_settings_title = "VPN Settings";
var __ML_vpn_settings_info = "Please input your VPN server information (shown below) to connect to the VPN network. ";
var __ML_vpn_settings_modify = "Modify";
var __ML_vpn_status_title = "VPN";
var __ML_vpn_status_info = "VPN (Virtual Private Network) is an access method that connects your client devices (PC computers, mobile phones, etc) to your remote network. You can connect your client devices to your VPN network via your router.";
var __ML_vpn_status_info_note = "Note: VPN networks to be connected shouldn’t have the same ip block.";
var __ML_vpn_edit_title = "VPN Connection Settings";

var __ML_vpn_usepeerdns = "Use peer DNS";
var __ML_vpn_refuse_pap = "Refuse PAP Authentication";
var __ML_vpn_refuse_eap = "Refuse EAP Authentication";
var __ML_vpn_require_mppe_128 = "Require MPPE-128 Encryption Algorhytm";

var __ML_showPassword = "Show password";

var __ML_wireless_quick_setup = "WIRELESS QUICK SETUP";
var __ML_wireless_quick_setup_title = "Wireless Quick Setup";

var __ML_remote_nas_menu = "REMOTE NAS";
var __ML_remote_nas_title = "Remote NAS";
var __ML_remote_nas_info = "";
var __ML_remote_nas_status_enabled = "Enable Remote NAS";
var __ML_remote_nas_status_disabled = "Disable Remote NAS";
var __ML_config_restore_invalid_file_size = "Invalid configuration file. <a href='/tools/tools.html' target='mainFrame'>Click here</a> to return to config restore menu.";
var __ML_wireless_invalid_wpa_password_alert = "Password format or the characters inside are wrong!\nIt must be such as eg: (abc.1234) with at least 8 and at most 63 characters long.\n#invalid_value# is invalid according to specs.";
var __ML_wireless_invalid_wpa_secret_alert = "Secret format or the characters inside are wrong!\nIt must be such as eg: (abc.1234) with at least 8 and at most 64 characters long.\n#invalid_value# is invalid according to specs.";
var __ML_wireless_connected_sta_ssid = "Connected Primary SSID";
var __ML_wireless_connected_repeater_ssid = "Repeated Primary SSID";
var __ML_wps_will_be_disabled_if_mac_filtering_is_enabled_confirm = "Wi-Fi Protected Setup (WPS) is already enabled. If MAC Filtering is selected, WPS will be disabled. Do you wish to continue?";
var __ML_mac_filtering_will_be_disabled_if_wps_is_enabled_confirm = "MAC Filtering is already enabled. If Wi-Fi Protected Setup (WPS) is selected, MAC Filtering will be disabled. Do you wish to continue?";

var __ML_dsl_down_message_with_call_center_info = "No DSL signal is detected. First check your router’s cable connections. If you find no problems with the cabling, then please contact your Internet Service Provider <font style='color: red'>(#isp_name# Call Center - #isp_call_center_phone_number#)</font> and have your DSL line checked.";
var __ML_wan_down_message_with_call_center_info = "No INTERNET connection is present. If your Connection settings are correct, please call your Internet Service Provider <font style='color: red'>(#isp_name# Call Center - #isp_call_center_phone_number#)</font> for assistance.";
var __ML_auto_wan_down_message_with_call_center_info = "There is no internet connection. Please check your modem cable connections (DSL/Telephone, WAN, Splitter)  If all connections are correct please call your internet service provider <font style='color: red'>(#isp_name# Call Center - #isp_call_center_phone_number#)</font>.";
var __ML_bittorrent_client = "BitTorrent&trade; Client";
var __ML_bittorrent_client_link_label = "BitTorrent&trade; Client can be accessed from here:";
var __ML_bittorrent_please_insert_usb_disk_warning = "Please insert USB disk to activate BitTorrent&trade; client";
var __ML_downstream_crc_errors = "Downstream CRC Errors:";
var __ML_upstream_crc_errors = "Upstream CRC Errors:";
var __ML_internet_wan_default_gateway_can_not_be_disabled = "Default gateway can not be disabled.";
var __ML_wireless_status_WPS_warning_wpa_only = "You cannot enable WPS when WPA Only security mode is selected. You can change security mode in the security settings page.";
var __ML_wireless_status_WPS_confirm_hidden_ssid = "You cannot enable WPS if there are any hidden SSIDs. Do you wish to show all SSIDs and enable WPS?";
var __ML_vpn_edit_route_all_internet_traffic_through_vpn = "Route all internet traffic through VPN";
var __ML_bittorrent_status_info = "Enable/Disable the BitTorrent&trade; application embedded";
var __ML_bittorrent_is_disabled = "BitTorrent&trade; is disabled. You can enable it on the BitTorrent&trade; menu.";
var __ML_wireless_settings_radar_active_channel_warning = "Your wireless channel is currently channel <channel>. This has been selected because Radar was recently detected on a higher powered channel.";
var __ML_wireless_settings_auto_channel_active_channel_warning = "Your wireless channel is currently channel <channel>. This has been selected because the device selected this as the highest performing channel.";
var __ML_wireless_timer = "Timer";
var __ML_wireless_timer_enable_label = "Enable AirTies Wireless Timer";
var __ML_wireless_timer_info = "AirTies Wireless Timer allows for the wireless operation of your device to be turned off at a pre-defined schedule of your choice. This reduces the power that your device uses at times when you will not be using the wireless network.";
var __ML_wireless_timer_table_caption = "Wireless On / Off Hour";

var __ML_days = {
	"mon" : "Monday",
	"tue" : "Tuesday",
	"wed" : "Wednesday",
	"thu" : "Thursday",
	"fri" : "Friday",
	"sat" : "Saturday",
	"sun" : "Sunday",
	"workdays" : "Work Days"
};

var __ML_wireless_timer_selectall = "Select All"
var __ML_wireless_timer_repeat_daily = "Repeat Daily";
var __ML_wireless_timer_repeat_work_days = "Repeat Work Days";
var __ML_wireless_timer_configure_individual_days = "Configure Individual Days";
var __ML_internet_settings_dsl_vlan_tag = "VLAN Tag enable";
////////////////////////////////////////////////////////////////////
var __ML_wireless_op_mode_low_rssi_confirm_message = "The signal strength to the Access Point that you selected is low. To improve performance, consider moving this device closer to your Access Point.";

var __ML_wireless_op_mode_will_be_disconnected_message = "<div>Please wait while your WLAN Repeater is connecting to the chosen network #sta_ssid#.</div><div>In approximately 30 seconds the connection will be established and the wireless setup page opens again.</div><div>If you remain on this page for 2 minutes, start the quick setup again.</div>";

var __ML_wireless_need_to_configure_wireless_warning = "When you save these wireless settings you will need to configure your client to connect to the new wireless network name using the password you just entered.";

var __ML_wireless_operating_mode_select_wlan_network_which_has_to_be_repeated = "Select WLAN-network which has to be repeated";
var __ML_wireless_operating_mode_sta_disconnected_wrong_password = "Error: Wrong password entered";
var __ML_wireless_operating_mode_sta_disconnected = "Error: Could not connect";

var __ML_wireless_operating_mode_sta_disconnected_not_found = "Error:  WLAN - network could not be found";
var __ML_wireless_operating_mode_sta_disconnected_wrong_sec_type = "Error: Security mismatched";

var __ML_wireless_operating_mode_sta_wlan_password = "WLAN Password";
var __ML_select_wlan_network = "Select WLAN - network";

var __ML_internet_settings_untag_vlanid_warning =  "Vlan id " + __DEF_rezerved_vlanid + " is reserved to be untagged.";
var __ML_media_server_reset_db = "Re-Index";
var __ML_media_server_reset_db_info = "If you cannot find all your content on your disc, the index may not be up to date. To solve this problem please re index your disc by the pressing the “Re-Index” button.";
var __ML_media_server_reset_db_warning = "It will take several minutes to re-index your disc. You will not be able to see your contents on your players while this running."
var __ML_usb_host_netbiosname = "NetBIOS Name";
var __ML_generateWpaPassword = "Generate Password";

var __ML_passwordWeak = "Weak";
var __ML_passwordMiddle = "Middle";
var __ML_passwordStrong = "Strong";
var __ML_pppConnection = "PPP Connection";
var __ML_adsl_username_regex_format_fibernet = "'username@fibernet'";
var __ML_ttnet_username_desc_row_span_text_fibernet = "To use your device with an internet service provider other than Turk Telekom,";
var __ML_ttnet_username_desc_row_span_text3_fibernet = "ex : internet@fibernet_service_provider";
var __ML_wireless_security_password_has_been_changed_warning = "Wireless security password has been changed, please use the new password to connect your modem.";
var __ML_ttnet_username_desc_row_span_text_fibernet = "Please enter your user credentials as shown on the contract given by your ISP. If you don't know your user credentials, please make a call to your ISP's customer service.";
var __ML_ttnet_username_desc_row_span_text_fibernet = "Please enter your user credentials as shown on the contract given by your ISP (ex: username@fibernet_service_provider). If you don't know your user credentials, please make a call to your ISP's customer service.";


var __ML_wireless_repeater_setup_complete = "Setup Complete";



var __ML_hotspot_connected_clients = "Connected Clients";
var __ML_hotspot_connection_state_0 = "Not Connected";
var __ML_hotspot_connection_state_1 = "Connected";
var __ML_hotspot_connection_type = "Connection Type";
var __ML_hotspot_ssid = "Hotspot SSID";
var __ML_hotspot_authentication_radius_server = "Authentication RADIUS Server";
var __ML_hotspot_radius_port = "Port";
var __ML_hotspot_radius_ip_address = "IP Address";
var __ML_hotspot_radius_password = "Password";
var __ML_hotspot_remote_ip = "Remote IP";
var __ML_hotspot_vlan_tag = "VLAN Tag";
var __ML_hotspot_wan_interface = "WAN Interface";
var __ML_hotspot_choose_hotspot = "Choose a hotspot";
var __ML_hotspot_connection_state_unknown = "Unknown";
var __ML_hotspot_ssid_is_not_unique = "SSID is not unique!";
var __ML_hotspot_name = "Hotspot Name";
var __ML_hotspot_connection_state = "Connection state";
var __ML_hotspot_connected_client_count = "Connected client count";
var __ML_wireless_please_select_a_security_type_for_secure_wireless_connection = "Please select a Security Type for secure wireless connection.";
var __ML_ppp_username_domain_cannot_be_empty_message = "Domain name field cannot be saved empty. Please enter your user credentials as shown on the contract given by your ISP (ex: username@fibernet_service_provider). If you don't know your user credentials, please make a call to your ISP's customer service.";
var __ML_example = "Example";

var __ML_easy_installation = "EASY INSTALLATION";
var __ML_wireless_select_the_wireless_network_to_connect = "Select the wireless network to connect";
var __ML_wireless_ap_list_refresh = "Refresh";
var __ML_my_wireless_network_is_not_in_the_list = "My wireless network is not in the list!";
var __ML_wireless_password = "Wireless Password";


var __ML_wireless_location_of_the_device_is_good = "Location of the device is good";
var __ML_wireless_location_of_the_device_is_bad = "Location of the wireless range extender is not optimal. Please take it closer to your existing wireless device.";
var __ML_wireless_bridge_setup_location_of_the_device_is_bad = "Location of the wireless bridge is not optimal. Please take it closer to your existing wireless device.";
var __ML_wireless_ssid_with_fon_word_is_not_valid = "Belirlediğiniz kablosuz ağ adı  içinde “fon” ifadesi geçmektedir. Lütfen “fon” ifadesi geçmeyen başka bir kablosuz ağ adı belirleyin!!";


var __ML_wireless_operating_mode_sta_congratulations_connected = "Congratulations! Connected.";
var __ML_wireless_operating_mode_sta_easy_setup_completed = "Easy installation is completed.";
var __ML_wireless_operating_mode_sta_wrong_password = "Wrong password.";
var __ML_wireless_operating_mode_sta_wrong_security_type = "Security mismatch.";
var __ML_wireless_location_of_the_device_is_bad_refresh = "You should position the wireless range extender closer to your router and restart the installation.";
var __ML_wireless_bridge_setup_location_of_the_device_is_bad_refresh = "You should position the wireless bridge closer to your router and restart the installation.";
var __ML_wireless_operating_mode_sta_ssid_cannot_be_found_p1 = "\"";
var __ML_wireless_operating_mode_sta_ssid_cannot_be_found_p2 = "\" WLAN – network could not be found..";
var __ML_wireless_operating_mode_sta_ssid_cannot_be_found_check_your_modem1 = "Make sure your modem is turned on.";
var __ML_wireless_operating_mode_sta_ssid_cannot_be_found_check_your_modem2 = "If it is turned on :";
var __ML_wireless_operating_mode_sta_close = "If it is turned on :";
var __ML_wireless_repeater_setup_advanced_setup_p1 = "Click ";
var __ML_wireless_repeater_setup_advanced_setup_link = "Advanced Settings";
var __ML_wireless_repeater_setup_advanced_setup_p2 = " to skip easy installation.";
var __ML_wireless_repeater_setup_click_here_for_connecting_internet = "Connect to Internet";
var __ML_wireless_repeater_setup_check_wireless_password_of_your_device_p1 = "Check wireless password of your device with ssid \"";
var __ML_wireless_repeater_setup_check_wireless_password_of_your_device_p2 = "\" and re-enter.";
var __ML_wireless_repeater_wlan_name = "Wireless Network Name:";
var __ML_wireless_settings_manual_connect_info = "If the gateway’s WLAN name (SSID) is hidden, fill below and click Connect.";





var __ML_quick_setup_close = "Close";
var __ML_quick_setup_physical_connections = "CABLE CONNECTIONS";
var __ML_quick_setup_physical_connections_instruction = "Please be sure about the splitter connections of your gateway.";
var __ML_quick_setup_wireless_reconnect_required_header = "WARNING!";
var __ML_quick_setup_wireless_reconnect_required_p1 = "Please re-connect your device with new \"Wireless SSID\" ya da \"Password\".";
var __ML_quick_setup_wireless_reconnect_required_p2 = "After connected to gateway press \"Next »\" button.";
var __ML_quick_setup_internet_connection_fail_message_p1 = "There might be a problem with your cable connections. Please be sure about about your splitter connections are correct.";
var __ML_quick_setup_internet_connection_fail_message_p2 = "If problem stil occurs please contact with your Internet Service Provider.";
var __ML_quick_setup_internet_connection_authentication_fail_message1 = "There might be a problem with your Username or password. Please re-try.";
var __ML_quick_setup_internet_connection_authentication_fail_message2 = "If problem still occurs please contact with your Internet Service Provider.";
var __ML_quick_setup_congratulations_p1 = "Congratulations!";
var __ML_quick_setup_congratulations_p2 = "You successfully completed your gateway settings.";
var __ML_quick_setup_connect_to_internet = "Connect to internet";
var __ML_quick_setup_connecting = "Connecting...";
var __ML_quick_setup_retry = "Re-Try";
var __ML_quick_setup_internet = "INTERNET";

var __ML_wireless_WPS_disabled_message = "To use WPS feature, both Wireless Network and AirTouch/WPS options must be enabled. Please check “WIRELESS” menu and “Wireless Network Settings” menu to enable them.";



var __ML_repeater_setup_wrong_password_please_try_again = "Wrong password, please try again.";

var __ML_repeater_setup_cannot_establish_connection_to_selected_device_with_ssid = "Cannot establish connection to the selected device with SSID \"{{ssid}}\".";


var __ML_repeater_setup_welcome_to_our_installation_wizard =  "Welcome to Installation Wizard";
var __ML_repeater_setup_could_not_find_any_network = "We could not find any network to connect to, please relocate the device closer to your wireless router and try again.";
var __ML_repeater_setup_press_rescan_to_scan_again_for_available_networks = "Press <b>“Rescan”</b> to scan again for available networks.";
var __ML_repeater_setup_rescan = "Rescan";
var __ML_repeater_setup_this_installation_wizard_will_help_you_install_the_our_device = "This installation wizard will help you install the {{product_name}} Wireless Range Extender.";
var __ML_repeater_setup_our_device_will_be_added_to_your_wireless_network_and_extender_the_wireless_signal_range = "The {{product_name}} will be added to your wireless network and extender the wireless signal range.";
var __ML_repeater_setup_it_is_important_to_locate_our_device_within_the_reach_of_the_current_wireless_network_hence_it_will_extend_the_best_signal = "It is important to locate the {{product_name}} within the reach of the current wireless network hence it will extend the best signal.";
var __ML_repeater_setup_click_next_to_see_the_availabled_scanned_networks = "Click “Next” to see the available scanned networks.";
var __ML_repeater_setup_searching_neighboring_access_points = "Searching Neighboring Access Points";
var __ML_repeater_setup_please_wait = "Please wait...";
var __ML_repeater_setup_if_your_wireLess_network_is_not_in_the_list_please_take_the_wireless_range_extender_close_to_your_wireless_router_and_click_rescan = "If your wireless network is not in the list, please take the wireless range extender close to your wireless router.";
var __ML_bridge_setup_if_your_wireLess_network_is_not_in_the_list_please_take_the_wireless_range_extender_close_to_your_wireless_router_and_click_rescan = "If your wireless network is not in the list, please take the wireless bridge close to your wireless router.";
var __ML_repeater_setup_guide = "Signal Guide";
var __ML_repeater_setup_good_connection = "Good Connection";
var __ML_repeater_setup_bad_connection = "Weak Connection";
var __ML_repeater_setup_start_browsing = "Start Browsing";
var __ML_repeater_setup_start_over = "Start Over";
var __ML_repeater_setup_select_your_wireless_network_from_the_list_by_clicking_the_network_name_ssid = "Select your wireless network from the list by clicking the network name (SSID).";
var __ML_repeater_setup_introduction_message = "This installation wizard will help you install the Wireless Range Extender.";
var __ML_bridge_setup_introduction_message = "This installation wizard will help you install the Wireless Bridge.";
var __ML_repeater_setup_connect = "Connect";
var __ML_repeater_setup_connecting = "Connecting...";

var __ML_repeater_setup_advanced_settings = "Advanced Settings";

var __ML_repeater_setup_one_step_to_the_connect_the_internet  = "One step to connect the internet:";
var __ML_repeater_setup_reconnect_introduction = "Open the \"Wireless Network Connections\" on your mobile device (laptop, smartphone, tablet etc.) that you are doing installation and connect to the router with SSID \"{{ssid}}\".";
var __ML_repeater_setup_connected_to_gateway = "I connected to the gateway with SSID \"{{ssid}}\".";
var __ML_repeater_setup_failed = "Your wireless range extender can not be reached!<p>Start the installation again after reset your device to factory defaults by pressing 10 seconds to the \"Reset\" button located on the back of your device and make sure the following items to be true.</p><p>1. Password you entered may be incorrect. Please check the password of device that you want to connect and start the installation again.</p><p>2. Make sure that the device you want to connect is opened.</p>";
var __ML_bridge_setup_failed = "Your wireless bridge can not be reached!<p>Start the installation again after reset your device to factory defaults by pressing 10 seconds to the \"Reset\" button located on the back of your device and make sure the following items to be true.</p><p>1. Password you entered may be incorrect. Please check the password of device that you want to connect and start the installation again.</p><p>2. Make sure that the device you want to connect is opened.</p>";
var __ML_repeater_setup_wireless_password = "Wireless Password";
var __ML_internet_wan_please_select_at_least_one_default_gateway = "Please select at least one gateway to connect to internet.";
var __ML_license = "License";
var __ML_the_license_information_could_not_be_found = "The license information could not be found";
var __ML_lease_time_should_be_at_least_message = "Lease time should be at least %minLeaseTime%.";
var __ML_home_intro = "Thank you for choosing Dstv Wi-Fi Connector. Prior to using this device, please consult the user manual to learn about features, proper care and how to best use this product.<p>Some information on the operational status is listed below:</p>";
