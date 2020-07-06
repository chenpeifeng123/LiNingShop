var gulp = require('gulp')

var concat = require('gulp-concat')
var htmlmin = require('gulp-htmlmin')
var uglify = require('gulp-uglify')
var sass = require('gulp-sass')
var minifyCss = require('gulp-minify-css')
var imagemin = require('gulp-imagemin')
var rename = require('gulp-rename')
var gutil=require("gulp-util");
var babel = require('gulp-babel');



//压缩 主页 html文件
gulp.task('html', function () {
    return gulp.src('./src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS:true,
            removeComments: true,
            removeSciptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('./dist/'))
})

//压缩子页面的html
gulp.task('pages', function () {
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS:true,
            removeComments: true,
            removeSciptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true
        }))
        .pipe(gulp.dest('./dist/pages/'))
})



//压缩less文件
gulp.task('sass', function(){
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'))
})

//压缩css文件
gulp.task('css', ['sass'], function(){
    return gulp.src('./src/css/*.css')
        .pipe(concat('build.css'))//合并到临时文件
        .pipe(gulp.dest('./dist/js/'))//生成到目标文件夹
        .pipe(rename({
            dirname: "index",    // 路径名
            basename: "index",   // 主文件名
            prefix: "cs-",        // 前缀
            suffix: "-min",      // 后缀
            extname: ".css"       // 扩展名
        }))
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css/'))
})

//压缩图片
// gulp.task('img', function(){
//     return gulp.src('./src/images/*.*')
//         .pipe(imagemin({progressive: true}))
//         .pipe(gulp.dest('./dist/images/'))
// })

gulp.task("babel", function () {
    return gulp.src("./src/js/*.js")// ES6 源码存放的路径
      .pipe(babel()) 
      .pipe(gulp.dest("dist/js/es5")); //转换成 ES5 存放的路径
  });
// //压缩js文件
gulp.task('js', function(){
    return gulp.src('./src/js/*.js')
        .pipe(concat('build.js')) //合并到临时文件
        .pipe(gulp.dest('./dist/js/')) //生成到目标文件夹
        .pipe(rename({
            dirname: "index",    // 路径名
            basename: "index",   // 主文件名
            prefix: "cs-",        // 前缀
            suffix: "-min",      // 后缀
            extname: ".js"       // 扩展名
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js/'))
        /* 
         .on('error', function (err) {
            gutil.log(gutil.colors.red('[Error]'), err.toString());
        })
        */
})
//注册一个默认的任务
gulp.task('default', ['html', 'pages', 'css', 'sass','babel'])


// , 'img', 'js','babel'
