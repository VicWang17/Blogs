- 普通模式下：开始写指令，：q是退出，：w是保存，：wq保存并推出
- split分屏，vsplit左右分屏，q推出
- ：e 找一个文件开始编辑

## 普通模式进入写入模式
- i（insert）和a（append）进入写入模式
- shift+a，冲到行尾加入，shift+i反之
- o,open a new line,在下一行，加shift插在上一行
- s，删除一个字符并且进入写入（在配置中取消了）
-------------------
- hjkl 移动
- u 也就是undo,撤销
- x 普通模式删除光标字符
- d 加方向控制方向剪切
- p paste粘贴
- y 复制带方向
- c 当d一样删完进入写入模式
- ￥ 切换到行末
- w 切换到下一个词
- b 上一个词
- e 到词语的结尾
- f 找单词（yf：一直复制到：）
- / 搜索
- v开始选中
- shift+v选中行，ctrl+v选块，选完shift+i进入写入模式，对一个操作等于对刚才所有被选中的操作
## 配置编辑
- 在home文件夹下sudo建立.vim,然后在此文件夹中新建一个叫vimrc
- noremap a,b 按a等于按b,修改键盘映射，只在普通模式生效
- map S :wq<CR> 一系列按键绑定,<CR>就是回车键，<nop>映射到空
- syntax on 语法高亮
- set number 显示行号
- set wrap 自动换行
- set showcmd 显示自己打了什么字
- set wildmenu 命令自动补全
- set hlsearch 搜索高亮
- set incsearch 边输入边高亮
- ignorecase 搜索忽略大小写
- smartcase 如果搜全大写就出大写，智能模式
配置文件：
```lua
syntax on
set number
set cursorline
set wrap
set showcmd
set wildmenu
set hlsearch
set incsearch
set ignorecase
set smartcase
set nocompatible
filetype on
filetype indent on
filetype plugin on
filetype plugin indent on
set mouse=a 
set encoding=utf-8
let mapleader=" "
let &t_ut='' 
let &t_SI = "\<Esc>]50;CursorShape=1\x7"
let &t_SR = "\<Esc>]50;CursorShape=2\x7"
let &t_EI = "\<Esc>]50;CursorShape=0\x7"
noremap E 5k
noremap Q 5j
noremap h i
noremap i k
noremap j h
noremap k j
noremap <leader>y "+y
map s <nop>
map R :source $MYVIMRC<CR>
map sd :set splitright<CR>:vsplit<CR>
map sa :set nosplitleft<CR>:vsplit<CR>
map sw :set nosplitbelow<CR>:split<CR>
map sx :set splitbelow<CR>:split<CR>
map<C-w><CR> :res +5
map<C-s><CR> :res -5
map<C-a><CR> :vertical resize -5
map<C-d><CR> :vertical resize +5
call plug#begin('~/.vim/plugged')
Plug 'vim-airline/vim-airline'
Plug 'connorholyday/vim-snazzy'
Plug 'scrooloose/nerdtree', { 'on': 'NERDTreeToggle' }
Plug 'Xuyuanp/nerdtree-git-plugin'
Plug 'vim-python/python-syntax' 
nnoremap  <C-t> :NERDTree<CR>
Plug 'Valloric/YouCompleteMe'
Plug 'majutsushi/tagbar', { 'on': 'TagbarOpenAutoClose' }
call plug#end()
let g:SnazzyTransparent = 1
colorscheme  snazzy
let g:python_highlight_all = 1
```