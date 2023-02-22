@echo off
echo Needs wget and zip for Windows in their default locations!
echo  wget:  http://gnuwin32.sourceforge.net/packages/wget.htm
echo  zip:   http://gnuwin32.sourceforge.net/packages/zip.htm
echo Download and zip up wifi firmware from Windows with internet access.
echo To be unpacked to /boot in Haiku then installed from the Terminal
echo by running install-wifi-firmwares.sh (which comes with Haiku OS)
@echo .

setlocal
path="C:\Program Files\GnuWin32\bin";%path%

rem Some useful variables
set SCRIPT_TOP=%cd%
set HAIKU_TEMP=system\cache\tmp\package_me\boot\system\data\firmware

rem Check if this is an older build, if so we need different directories
set /P a4=Is the target system post-Alpha-4 (y/n)?
if /i {%a4%}=={y} goto :yes
if /i {%a4%}=={yes} goto :yes
set HAIKU_TEMP=system\data\firmware
:yes
set baseURL=https://raw.githubusercontent.com/haiku/firmware/master/wifi
set haikuPortsURL=https://eu.hpkg.haiku-os.org/haikuports/master/x86_64/current/packages

rem Make the temp directories to store files
mkdir wifi-firmware\%HAIKU_TEMP%\iprowifi2100
mkdir wifi-firmware\%HAIKU_TEMP%\iprowifi2200
mkdir wifi-firmware\%HAIKU_TEMP%\broadcom43xx\b43-fwcutter
mkdir wifi-firmware\%HAIKU_TEMP%\marvell88w8335

cd wifi-firmware\%HAIKU_TEMP%\iprowifi2100
wget %baseURL%/intel/ipw2100-fw-1.3.tgz

cd wifi-firmware\%HAIKU_TEMP%\iprowifi2200
wget %baseURL%/intel/ipw2200-fw-3.1.tgz

cd wifi-firmware\%HAIKU_TEMP%\broadcom43xx
wget %baseURL%/b43/wl_apsta-3.130.20.0
cd b43-fwcutter
wget %haikuPortsURL%/packages/b43_fwcutter-019-2-x86_64.hpkg

cd %SCRIPT_TOP%\wifi-firmware\%HAIKU_TEMP%\marvell88w8335
wget %baseURL%/marvell/malo-firmware-1.4.tgz

cd %SCRIPT_TOP%\wifi-firmware

rem Zip it all up
zip -9r ../haiku-firmware-data.zip .
cd ..

rem Get rid of temp directories
rmdir wifi-firmware /S /Q
endlocal
@echo .
@echo Extract $archiveName to your Haiku's /boot
@echo Then run install-wifi-firmwares.sh
pause
