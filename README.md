## npm_template

ecmascript_template と開発環境に違いがあるために，npm library 用の開発環境をバックアップ

npm_template を利用して 別のプロジェクトで使用するための個人的な npm library 開発をできる．
基本的には，`yarn deploy` のみを提供する．

### Quick Overview

deploy npm library in dist direcotry.
exporting library main file is *dist/index.js* which is written in package.json

### TL; DR 主要ブランチ

主要ブランチとして，npm_templateブランチを使用している．
このブランチには，ライブラリ作成の時にコンフリクトをしないようにREADME.mdの内容を削除．
また，同様の理由でVagrantfileも存在しない．

#### hello world sample

* このテンプレートを使用して，好きな npm ライブラリを作成

```bash
# option: create git repository
# rename your favorite npm library name
mkdir path/to/<npm_name>
cd $_
git init
touch README.md
git add README.md && git commit -m "Initial commit"

git checkout -b feature/npm_template
git remote add template https://github.com/kuro-kuroite/npm_template.git
git pull template feature/npm_template --allow-unrelated-histories

git checkout -b feature/log_hello_world
yarn

# NOTE: escape backquote for bash
cat <<EOF >> src/js/index.js
const helloName = (name = 'template') => \`hello, ${name}!\`;

const logHelloName = (name = 'template') => {
  // eslint-disable-next-line no-console
  console.log(helloName(name));
};

// eslint-disable-next-line import/prefer-default-export
export { helloName, logHelloName };
EOF

# convert src/**/*.js into dist/**/*.js
yarn deploy
```

* option: 別のプロジェクト内で，上のライブラリをテスト

```bash
# start local test
cd path/to/<npm_name>
yarn link

# option: create sample project
mkdir -p path/to/project
cd $_
yarn add @babel/core @babel/preset-env @babel/register
cat <<EOF >> .babelrc.js
module.exports = {
  presets: ['@babel/preset-env'],
};
EOF

# test <npm_name>.logHelloName
yarn add <npm_name>

cat <<EOF >> index.js
import { logHelloName } from <npm_name>;

logHelloName('Tom!');
EOF

node --require @babel/register index.js

# stop local test
cd path/to/<npm_name>
yarn unlink
```

* git remote repository(例: [GitHub](https://github.com/)) に公開

```bash
git add src/ dist/ && git commit -m "feat: add logging hello template!"
# create new git remote url, and then
git remote add origin <new git remote url>

# option: merge feature/log_hello_world in local
git merge feature/log_hello_world master
git push origin master

git push origin feature/log_hello_world
# then, create pull request and merge this to master
```

* option: ライブラリ公開後に，別のプロジェクトでこのライブラリを使用

first, you create project directory, and then `yarn add <new git remote url>`.
you can use the created library for your project

```bash
cd <path/to/project/>

yarn add <new git remote url>

cat <<EOF >> src/index.js
const logHelloName = require('<npm name>').logHelloName;

logHelloName('world');
EOF
node src/index.js // => hello, world!
```

### usage

* `yarn deploy`

deploy src/**/*.js file to dist/**/*.js

```bash
yarn deploy
git add src/js/**/*.js && git commit -m "feat: create your commit"
git push
``` 

#### advanced usage


* `yarn .babel:all`

compile ES6 file like *.babel.js to ES5 like *.js in same directory

* `yarn .prettier:all`

format js files in project

* `yarn .lint:all`

lint js files in project

### TL; DR 開発環境

Vagrant and VirtualBox 環境を推奨する．Vagrant は，`yarn install` までの手順は，Windows 単体よりも煩雑である．
しかし一度，`yarn install` が出来てしまうと，その後の開発で引きおこる
Windows 固有のエラーの大半を防止することが可能で，無駄な時間が取られにくいためでもある.

あえて，Windows 環境を載せたのは，sample 用として気軽に使うことを想定したためである.
ただ，ちょっと複雑なことをしようとすると，たちまちエラーの嵐となりやすい．

* Ubuntu on Vagrant on VirtualBox on Windows 10

```
Ubuntu 16.04.4 LTS (ubuntu-xenial 4.4.0-139-generic)
Vagrant 2.0.4
VirtualBox 5.2.8 r121009 (Qt5.6.2)
Windows 10 version 1803
git version 2.19.2
nodenv 1.1.2-69-gced0e70
Node.js v8.11.4
Yarn 1.12.3
```

```bash
// 管理者権限で Git Bash or Powershell を起動 (symlink で落ちるため)
cd path/to/npm_template
vagrant up
vagrant ssh
cd /vagrant
yarn
```

特に，Windows と Vagrant 関係で，一発で yarn install が通ることはないので，
以下に参考としたリンクを載せておく

- [Windowsホスト上のVagrantのシンボリックリンクフォルダでyarn installできない問題の解決](https://qiita.com/maikya_gu/items/8e313dcd50c39f5a4b0b)
- [260文字のファイルパスの制限を解除（して node_modules 削除 : Windows 10](https://beachside.hatenablog.com/entry/2017/07/25/183000)

* Git Bash on Windows 10

```
Windows 10 version 1803
Git Bash git version 2.18.0.windows.1
Yarn 1.9.4
Node.js v8.11.3
scoop 133b4f99
```

```bash
scoop install node-lts
scoop install yarn
// Git Bash
cd path/to/npm_template
yarn
```
