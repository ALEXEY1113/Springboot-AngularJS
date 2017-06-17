(function(){
  'use strict';

  var gulp = require('gulp');
  var runSequence = require('run-sequence').use(gulp);
  var wiredep = require('wiredep').stream;
  var browserSync = require('browser-sync').create();

  gulp.task('development', function() {
    runSequence('bower', 'serve');
  });

  gulp.task('serve', function() {
    browserSync.init({
      server: {
        // Configuramos que solo escuche a todo lo que hay en la carpeta src
        baseDir: './src',
        routes: {'/bower_components' : 'bower_components'}
      },
      // Configuramos que Inicie el Navegador que deseamos
      browser: 'chrome'
    });

    //Indicamos a GULP que escuche a todas las modificaciones dentro de la carpeta src
    gulp.watch('./src/**/*.*').on('change', function() {
      browserSync.reload();
    });
  });

  gulp.task('bower', function() {
    // Definir el archivo donde queremos inyectar las dependencias de bower
    gulp.src('./src/index.html')
        .pipe(wiredep({
          // Excluye Dependencias de JQuery y Bootstrap.js al momento de instalar Bootstrap
          exclude: ['jquery', 'bootstrap.js']
        }))
        .pipe(gulp.dest('./src'));
  });

  gulp.task('default', ['development']);

})();