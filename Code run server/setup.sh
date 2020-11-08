#! /bin/bash
. /etc/os-release
DISTRO=$ID
user=$USER
echo $user
# Elevate script to sudo user
# if [ $EUID != 0 ]; then
#     sudo "$0" "$@"
#     exit $?
# fi

if [ $DISTRO == "manjaro" ] || [ $DISTRO == "arch" ]
then
    #VER=$VERSION_ID
    echo "OS Detected : "$DISTRO
    sudo pacman -S --needed docker
elif [ $DISTRO == "debian" ] || [ $DISTRO == "ubuntu" ] || [ $DISTRO == "mint" ] 
then
    echo $DISTRO
	sudo apt install docker
fi
sudo usermod -aG docker $user
sudo systemctl restart docker
pip install -r requirements.txt
exec su -l $user
