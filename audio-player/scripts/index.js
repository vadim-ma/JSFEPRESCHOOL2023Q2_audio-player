console.log(`
1. Вёрстка +10
 + вёрстка аудиоплеера: есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека +5
 + в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5
2. Кнопка Play/Pause +10
 + есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека +5
 + внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек +5
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек. Аудиотреки пролистываются по кругу - после последнего идёт первый +10
4. При смене аудиотрека меняется изображение - обложка аудиотрека +10
5. Прогресс-бар отображает прогресс проигрывания текущего аудиотрека. При перемещении ползунка вручную меняется текущее время проигрывания аудиотрека +10
6. Отображается продолжительность аудиотрека и его текущее время проигрывания +10

Итого +60
`);

const tracks = [
    {mp3: "audio/Blondie-Call_Me.mp3",
    cover: "Blondie-Call_Me.jpg",
    artist: "Blondie",
    title: "Call Me"},

    {mp3: "audio/Sting_-_Shape_Of_My_Heart.mp3",
    cover: "Sting-Shape-Of-My-Heart.jpg",
    artist: "Sting",
    title: "Shape Of My Heart"},

    {mp3: "audio/Kong_-_Bad_Guy.mp3",
    cover: "Kong_-_Bad_Guy.jpg",
    artist: "Kong",
    title: "Bad Guy"},

    {mp3: "audio/Fools_Garden_-_Lemon_Tree.mp3",
    cover: "Fools_Garden_-_Lemon_Tree.jpg",
    artist: "Fools Garden",
    title: "Lemon Tree"},
    
    {mp3: "audio/Imagine_Dragons_-_Believer.mp3",
    cover: "Imagine_Dragons_-_Believer.jpg",
    artist: "Imagine Dragons",
    title: "Believer"},
    
    {mp3: "audio/Evanescence_-_Bring_Me_to_Life.mp3",
    cover: "Evanescence_-_Bring_Me_to_Life.jpg",
    artist: "Evanescence",
    title: "Bring Me to Life"},
]
let track = 0;

const audio = document.querySelector('.player__player-object');
const background = document.querySelector('.player__background');
const cover = document.querySelector('.player__cover');
const artist = document.querySelector('.player__track-info_artist');
const title = document.querySelector('.player__track-info_title');
const imgStartPause = btnStartPause.querySelector('img');
const trackTime = document.querySelector('.player__track-time');
const playTime = document.querySelector('.player__play-time');

function updateTrack(wasEnded){
    const paused = audio.paused;

    audio.src = tracks[track].mp3;
    audio.load();
    if (wasEnded || !paused) {
        audio.play();
    } else {
        audio.pause();
    }

    background.style.backgroundImage = `url("images/cover/${tracks[track].cover}")`;
    cover.src = `images/cover/${tracks[track].cover}`;
    artist.textContent = tracks[track].artist;
    title.textContent = tracks[track].title;
}

function updateStartBtn(){
    if (audio.paused) {
        imgStartPause.src = "images/play-circle.svg"
    } else {
        imgStartPause.src = "images/video-pause.svg"
    }
}
function startPause_Handler(){
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }

}
btnStartPause.addEventListener('click', startPause_Handler);
audio.addEventListener('play', () => updateStartBtn());
audio.addEventListener('pause', () => updateStartBtn());

function btnPrev_Handler(){
    if (track === 0) {
        track = tracks.length - 1;
    } else {
        track--;
    }
    updateTrack();
}
function btnNext_Handler(wasEnded){
    if (track === tracks.length - 1) {
        track = 0;
    } else {
        track++;
    }
    updateTrack(wasEnded);
}
function convertSeconds(time){
    seconds = time % 60;
    minutes = (time - seconds) / 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
function timeUpdate_Handler(){
    const curTime = parseInt(audio.currentTime);
    progress.value = curTime;
    playTime.textContent = convertSeconds(curTime);
}
function durationChange_Handler(){
    const duration = parseInt(audio.duration);
    progress.max = duration;
    trackTime.textContent = convertSeconds(duration);
}
function inputProgress_Handler(event){
    const time = parseInt(event.target.value);
    audio.currentTime = time;
}

btnPrev.addEventListener('click', btnPrev_Handler);
btnNext.addEventListener('click', () => btnNext_Handler());
audio.addEventListener("ended", () => btnNext_Handler(true));

audio.addEventListener('timeupdate', timeUpdate_Handler);
audio.addEventListener('durationchange', durationChange_Handler);
progress.addEventListener("input", inputProgress_Handler);

updateTrack();