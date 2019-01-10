import './js/rxjs';
import './scss/style.scss';
import gitPng from './images/github.png';
import refreshPng from './images/refresh.png';
import trashPng from './images/trash.png';
import lineUpPng from './images/line_up.png';
import lineDownPng from './images/line_down.png';

const gitImage = document.getElementById('gitImage');
gitImage.src = gitPng;

const refreshImage = document.getElementById('refreshImage');
refreshImage.src = refreshPng;

const trashImage = document.getElementById('trashImage');
trashImage.src = trashPng;

const lineUp = document.getElementsByClassName('lineUp');
lineUp.src = lineUpPng;

const lineDown = document.getElementsByClassName('lineDown');
lineDown.src = lineDownPng;
