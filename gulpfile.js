'use strict';

/*
Для запуска, достаточно положить этот файл и package.json
в свой проект в корень.

Затем из консоли запустить npm i (должен быть установлен node.js и npm не ПК).

Как установить node и npm - http://bologer.ru/kak-ustanovit-node-js-i-npm-na-windows/

После команды npm i произойдёт установка библиотек.
Далее в консоле запускаете сборщик gulp build
он будет отслеживать все изменения в scss файлах
и генерировать index.css со всеми стилями с этих файлов,
добавляя автопрефиксы + ужимать css.

Если при запуске gulp build будет ошибка, то вам нужно дать права.
Как это сделать тут - https://clck.ru/ZP6Fo

*/
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');


/* Таска для стилей. */
gulp.task('style', function () {
    return gulp.src('./pages/index.scss') // главный файл со стилями
      .pipe(sass().on('error', sass.logError)) //сасс библиотека, если вы косячите в scss, выдаст ошибку в консоли
      .pipe(autoprefixer({browsers: ['last 3 versions'], cascade: false})) //автопрефиксы добавляет
     // .pipe(cleanCSS({compatibility: 'ie8'})) //сжимает css
      .pipe(gulp.dest('./pages/')); // финальная папка куда будем сохранять index.css
  });


/* Эта таска постоянно следит за изменениями
и если они есть, то запускает задачу style, так по кругу.
*/
gulp.task('watch', function(){
    gulp.watch('assets/styles/*.scss',  gulp.parallel('style'))
    gulp.watch('blocks/*.scss',  gulp.parallel('style'))
    gulp.watch('blocks/*/*.scss',  gulp.parallel('style'))
    gulp.watch('pages/*.scss',  gulp.parallel('style'))
})

gulp.task('build', gulp.parallel('style', 'watch')); // запуск галпа одновременно 2 задач.
