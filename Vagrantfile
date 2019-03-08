# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure("2") do |config|
  # The most common configuration options are documented and commented below.
  # For a complete reference, please see the online documentation at
  # https://docs.vagrantup.com.

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "ubuntu/xenial64"

  # Disable automatic box update checking. If you disable this, then
  # boxes will only be checked for updates when the user runs
  # `vagrant box outdated`. This is not recommended.
  # config.vm.box_check_update = false

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # NOTE: This will enable public access to the opened port
  # config.vm.network "forwarded_port", guest: 80, host: 8080

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine and only allow access
  # via 127.0.0.1 to disable public access
  # config.vm.network "forwarded_port", guest: 80, host: 8080, host_ip: "127.0.0.1"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  # config.vm.network "private_network", ip: "192.168.33.10"

  # Create a public network, which generally matched to bridged network.
  # Bridged networks make the machine appear as another physical device on
  # your network.
  # config.vm.network "public_network"

  # Share an additional folder to the guest VM. The first argument is
  # the path on the host to the actual folder. The second argument is
  # the path on the guest to mount the folder. And the optional third
  # argument is a set of non-required options.
  # config.vm.synced_folder "../data", "/vagrant_data"

  # Provider-specific configuration so you can fine-tune various
  # backing providers for Vagrant. These expose provider-specific options.
  # Example for VirtualBox:
  #
  config.vm.provider :virtualbox do |vb|
    vb.customize ["setextradata", :id, "VBoxInternal2/SharedFoldersEnableSymlinksCreate/.","1"]
  end
  #
  # View the documentation for the provider you are using for more
  # information on available options.

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision :shell, privileged: false, inline: <<-SHELL
    # for gyp-node
    sudo apt install -y python-minimal

    sudo add-apt-repository ppa:git-core/ppa -y
    sudo apt update
    sudo apt upgrade
    sudo apt install -y build-essential git

    # install Node.js
    git clone https://github.com/nodenv/nodenv.git ~/.nodenv
    cd ~/.nodenv && src/configure && make -C src
    echo 'export PATH="$HOME/.nodenv/bin:$PATH"' >> ~/.bash_profile
    echo 'eval "$(nodenv init -)"' >> ~/.bash_profile
    source ~/.bash_profile
    curl -fsSL https://github.com/nodenv/nodenv-installer/raw/master/bin/nodenv-doctor | bash
    mkdir -p "$(nodenv root)"/plugins
    git clone https://github.com/nodenv/node-build.git "$(nodenv root)"/plugins/node-build
    nodenv install 8.11.4
    nodenv global $_
    mkdir -p "$(nodenv root)"/plugins
    git clone https://github.com/nodenv/nodenv-update.git "$(nodenv root)"/plugins/nodenv-update

    # install Yarn
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
    sudo apt update && sudo apt install --no-install-recommends yarn

    wget https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -O ~/.git-completion.bash
    chmod a+x ~/.git-completion.bash

    wget https://raw.githubusercontent.com/git/git/master/contrib/completion/git-prompt.sh -O ~/.git-prompt.sh
    chmod a+x ~/.git-prompt.sh
    source ~/.bashrc

    # add git completion
    cat <<EOF >> ~/.bash_profile
# スクリプト読み込み
source $HOME/.git-completion.bash
source $HOME/.git-prompt.sh

# プロンプトに各種情報を表示
GIT_PS1_SHOWDIRTYSTATE=1
GIT_PS1_SHOWUPSTREAM=1
GIT_PS1_SHOWUNTRACKEDFILES=
GIT_PS1_SHOWSTASHSTATE=1

############### ターミナルのコマンド受付状態の表示変更
# \\u ユーザ名
# \\h ホスト名
# \\W カレントディレクトリ
# \\w カレントディレクトリのパス
# \\n 改行
# \\d 日付
# \\[ 表示させない文字列の開始
# \\] 表示させない文字列の終了
# \\\\$ \\$

# HACK Ruby and SHELL の仕様で以下のような複雑なエスケープが必要となった
export PS1='\\[\\033[1;32m\\]\\u\\[\\033[00m\\]:\\[\\033[1;34m\\]\\w\\[\\033[1;31m\\]\\$(__git_ps1)\\[\\033[00m\\] \\\\$ '
##############
EOF

    source ~/.bash_profile

    git clone https://github.com/simonwhitaker/gibo.git ~/.gibo
    cd ~/.gibo && ./gibo update

    echo 'export PATH="$HOME/.gibo:$PATH"' >> ~/.bash_profile

    cp shell-completions/gibo-completion.bash ~/

    mv ~/gibo-completion.bash ~/.gibo-completion.bash
    echo 'source ~/.gibo-completion.bash' >> ~/.bash_profile
    source ~/.bash_profile

    cat <<EOF >> ~/.bash_profile
git config --global core.editor vim
EOF
    source ~/.bash_profile
  SHELL
end
