const gulp = require('gulp');
const imagemin = require('gulp-imagemin');   //图片压缩
const uglify = require("gulp-uglify");  //js压缩
const sass = require('gulp-sass');      //sass
const cleanCSS = require('gulp-clean-css');  //css压缩

 
//文件合并
function copyHtmls(){
    gulp.src("src/pages/*.html")
        .pipe(gulp.dest("dist"))  //把src目录中所有html格式的文件全部合并到dist目录中
}
 
//图片压缩
function imagemins() {
    gulp.src("src/images/*")   //所有src > images中的图片
        .pipe(imagemin()) // 图片压缩
        .pipe(gulp.dest("dist/images"))  //放入到dist目录下面的images文件
}
 
//js压缩
function uglifys() {
    gulp.src("src/js/*.js")
        .pipe(uglify()) //压缩js代码
        .pipe(gulp.dest("dist/js")) //通过gulp uglify命令，自动输出dist下面js文件
}
 
//css压缩并sass转换成css
function sasss() {
    gulp.src("src/sass/*.scss")  //手动创建
        .pipe(sass()) //将less文件编译成css文件
        .pipe(cleanCSS())  //压缩css
        .pipe(gulp.dest("./dist/css"))   //通过gulp sass 命令，自动输出dist/css文件
}
 
//监听文件是否有变化
gulp.task("default",function(){
    gulp.watch("src/pages/*.html",copyHtmls);
    gulp.watch("src/images/*",imagemins);
    gulp.watch("src/js/*.js",uglifys);
    gulp.watch("src/sass/*.scss",sasss)
})