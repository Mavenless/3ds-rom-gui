#!/bin/bash

# Download and extract 3DS ROM wrapper
wget "https://github.com/NarumiLy/3ds-rom-gui/releases/download/Brrrrr/3dsgui-1.0.0-fixed.zip"
unzip "3dsgui-1.0.0-fixed.zip" -d "$HOME/Documents/3DSgui"
rm "3dsgui-1.0.0-fixed.zip"
name=""
# Run wrapper script
cd "$HOME/Documents/3DSgui"
if [[ $(uname -m) == "aarch64" ]]; then
    chmod +x "3dsgui-linux_arm64"
    name="3dsgui-linux_arm64"
elif [[ $(uname -m) == "armv7l" ]]; then
    chmod +x "3dsgui-linux_armhf"
    name="3dsgui-linux_armhf"
elif [[ $(uname) == "Darwin" ]]; then
    chmod +x "3dsgui-mac_universal"
    name="3dsgui-mac_universal"
else
    chmod +x "3dsgui-linux_x64"
    name="3dsgui-linux_x64"
fi
ln -s "$(pwd)/$name" "$(xdg-user-dir DESKTOP)/3DSgui"
chmod +x "$(xdg-user-dir DESKTOP)/3DSgui"
